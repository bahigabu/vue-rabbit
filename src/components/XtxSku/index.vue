<template>
  <div class="goods-sku">
    <!-- 第一層遍歷 -->
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <!-- 第二層遍歷 -->
        <template v-for="val in item.values" :key="val.name">
          <!-- 圖片類規格 -->
          <img
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="clickSpecs(item, val)"
            v-if="val.picture"
            :src="val.picture"
          />
          <!-- 文字類規格 -->
          <span 
            :class="{ selected: val.selected, disabled: val.disabled }" 
            @click="clickSpecs(item, val)" 
            v-else>
            {{ val.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import { watchEffect } from 'vue';
import getPowerSet from './power-set.js';

// 聲明分割符號
const spliter = '★';
// 根據skus數據得到路徑字典對象
const getPathMap = (skus) => {
  const pathMap = {};
  // 先判定後端資料庫存在且數量大於0
  if (skus && skus.length > 0) {
    // 有效數據拿來做子集算法[1,2]=>[[1],[2],[1,2]]
    skus.forEach((sku) => {
      // 1. 過濾出有庫存有效的sku
      if (sku.inventory) {
        // 2. 得到sku屬性值數組
        const specs = sku.specs.map((spec) => spec.valueName);
        // 3. 使用算法得到sku屬性值數組的子集
        const powerSet = getPowerSet(specs);
        // 4. 把得到子集生成最終的路徑字典對象
        powerSet.forEach((set) => {
          // 數組轉字符串
          const key = set.join(spliter);
          // 如果對象裡没有東西就先初始化一個空數組
          if (!pathMap[key]) {
            pathMap[key] = [];
          }
          // 如果已經存在當前key了，就往數組添加skuId
          pathMap[key].push(sku.id);
        });
      }
    });
  }
  return pathMap;
};

// 初始化禁用狀態
// specs:一坨規格
function initDisabledStatus(specs, pathMap) {
  // 先判定後端資料庫存在且數量大於0
  if (specs && specs.length > 0) {
    // spec:一排一排的規格
    specs.forEach((spec) => {
      // val:一個一個的規格
      spec.values.forEach((val) => {
        // 設置禁用狀態
        val.disabled = !pathMap[val.name];
      });
    });
  }
}

// 獲取選中項目的匹配數組
const getSelectedArr = (specs) => {
  const selectedArr = [];
  specs.forEach((spec, index) => {
    // 目標:找到選中的那一個規格，把它的名字放到數組裡
    const selectedVal = spec.values.find((val) => val.selected);
    if (selectedVal) {
      selectedArr[index] = selectedVal.name;
    } else {
      selectedArr[index] = undefined;
    }
  });
  return selectedArr;
};

// 切換時更新禁用狀態
// specs:一坨規格
const updateDisabledStatus = (specs, pathMap) => {
  // 遍歷每一種規格
  // item:一排一排的規格
  specs.forEach((item, i) => {
    // 拿到當前選擇的項目
    const selectedArr = getSelectedArr(specs);
    // 遍歷每一個按鈕
    item.values.forEach((val) => {
      if (!val.selected) {
        selectedArr[i] = val.name;
        // 去掉undefined之後組合成key
        const key = selectedArr.filter((value) => value).join(spliter);
        val.disabled = !pathMap[key];
      }
    });
  });
};

export default {
  name: 'XtxGoodSku',
  props: {
    // specs:所有的規格訊息  skus:所有的sku組合
    goods: {
      type: Object,
      default: () => ({ specs: [], skus: [] })
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    let pathMap = {};
    watchEffect(() => {
      // 得到所有字典集合
      pathMap = getPathMap(props.goods.skus);
      // 组件初始化的時候更新禁用狀態
      initDisabledStatus(props.goods.specs, pathMap);
    });


    // 選中與取消選中
    const clickSpecs = (item, val) => {
      // item:當前這一排
      // val:當前點擊的對象
      if (val.disabled) return false;
      // 選中改成不選中
      if (val.selected) {
        val.selected = false;
      } else {
        // 先把同排其它項目選中狀態取消
        item.values.forEach((bv) => {
          bv.selected = false;
        });
        // 再把當前點擊的項目選中
        val.selected = true;
      }

      // 點擊之後再次更新選中狀態
      updateDisabledStatus(props.goods.specs, pathMap);
      // 把選擇的sku訊息傳出去給父組件
      // 觸發change事件將sku數據傳遞出去
      const selectedArr = getSelectedArr(props.goods.specs).filter((value) => value);
      // 如果選中的規格數量和傳入的規格總數相等則傳出完整訊息(都選擇了)
      // 否則傳出空對象
      if (selectedArr.length === props.goods.specs.length) {
        // 從路徑字典中得到skuId
        const skuId = pathMap[selectedArr.join(spliter)][0];
        const sku = props.goods.skus.find((sku) => sku.id === skuId);
        // 傳遞數據給父組件
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').trim()
        });
      } else {
        emit('change', {});
      }
    };
    return { clickSpecs };
  }
};
</script>

<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  // 選中狀態的類名
  &.selected {
    border-color: $xtxColor;
  }
  // 禁用狀態的類名
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    overflow: auto;
    width: 600px;
    height: 75px;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      overflow: auto;
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>
