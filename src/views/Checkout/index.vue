<script setup>
// 引入主要方法
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
// 引入API
import { getCheckInfoAPI, createOrderAPI } from '@/apis/checkout.js';
// 引入pinia檔案
import { useCartStore } from '@/stores/cartStore.js';
const cartStore = useCartStore();

const checkInfo = ref({}); // 訂單對象
const defaultAddress = ref({}); // 地址對象
const toggleFlag = ref(false); // 控制顯示地址切換彈窗
const addFlag = ref(false); // 控制顯示添加地址彈窗

const getCheckInfo = async () => {
  const res = await getCheckInfoAPI();
  checkInfo.value = res.result;
  // 篩選預設地址
  defaultAddress.value = checkInfo.value.userAddresses.find(item => item.isDefault === 0);
};

// 切換地址
const activeAddress = ref({}); // 當前選擇的地址
const switchAddress = (address) => {
  activeAddress.value = address;
};
const confirm = () => {
  defaultAddress.value = activeAddress.value;
  toggleFlag.value = false;
  activeAddress.value = {}
};

// 創建訂單

const createOrder = async () => {
  const res = await createOrderAPI({
    deliveryTimeType: 1,
    payType: 1,
    payChannel: 1,
    buyerMessage: '',
    goods: checkInfo.value.goods.map((item) => {
      return {
        skuId: item.skuId,
        count: item.count
      };
    }),
    addressId: defaultAddress.value.id
  });
  const orderId = res.result.id;
  router.push({
    path: '/pay',
    query: {
      id: orderId
    }
  });
  // 更新購物車
  await cartStore.updateNewList();
};
onMounted(() => getCheckInfo());
</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收貨地址 -->
        <h3 class="box-title">收貨地址</h3>
        <div class="box-body">
          <!-- flex母元素 -->
          <div class="address">
            <!-- flex母元素 -->
            <div class="text">
              <div class="none" v-if="!defaultAddress">您需要先添加收貨地址才可提交訂單。</div>
              <ul v-else>
                <li><span>收<i/>貨<i/>人：</span>{{ defaultAddress.receiver }}</li>
                <li><span>聯繫方式：</span>{{ defaultAddress.contact }}</li>
                <li><span>收貨地址：</span>{{ defaultAddress.fullLocation }} {{ defaultAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="toggleFlag = true">切換地址</el-button>
              <el-button size="large" @click="addFlag = true">添加地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品訊息 -->
        <h3 class="box-title">商品訊息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品訊息</th>
                <th width="170">單價</th>
                <th width="170">數量</th>
                <th width="170">小計</th>
                <th width="170">實付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in checkInfo.goods" :key="i.id">
                <td>
                  <!-- flex母元素 -->
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="" />
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.count }}</td>
                <td>&yen;{{ i.totalPrice }}</td>
                <td>&yen;{{ i.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送時間 -->
        <h3 class="box-title">配送時間</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送貨時間：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送貨：周一至周五</a>
          <a class="my-btn" href="javascript:;">雙休日、假日送貨：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">線上支付</a>
          <a class="my-btn" href="javascript:;">貨到付款</a>
          <span style="color: #999">貨到付款需付5元手續費</span>
        </div>
        <!-- 金額明細 -->
        <h3 class="box-title">金額明細</h3>
        <div class="box-body">
          <div class="total">
            <dl><dt>商品件數：</dt><dd>{{ checkInfo.summary?.goodsCount }}件</dd></dl>
            <dl><dt>商品總價：</dt><dd>¥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd></dl>
            <dl><dt>運<i/>費：</dt><dd>¥{{ checkInfo.summary?.postFee.toFixed(2) }}</dd></dl>
            <dl><dt>應付總額：</dt><dd class="price">{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</dd></dl>
          </div>
        </div>
        <!-- 提交訂單 -->
        <div class="submit">
          <el-button type="primary" size="large" @click="createOrder">提交訂單</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切換地址彈框 -->
  <el-dialog title="切換收貨地址" width="30%" center v-model="toggleFlag">
    <div class="addressWrapper">
      <div class="text item" :class="{ active: activeAddress.id === item.id }" v-for="item in checkInfo.userAddresses"
        :key="item.id" @click="switchAddress(item)">
        <ul>
          <li><span>收<i/>貨<i/>人：</span>{{ item.receiver }}</li>
          <li><span>聯絡方式：</span>{{ item.contact }}</li>
          <li><span>收貨地址：</span>{{ item.fullLocation + item.address }}</li>
        </ul>
      </div>
    </div>
    <!-- 具名插槽 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="toggleFlag = false">取消</el-button>
        <el-button type="primary" @click="confirm">確定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 添加地址 -->
</template>

<style scoped lang="scss">
// 大外框
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    // 中外框
    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

// 收貨地址
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
  }

  .action {
    width: 420px;
    text-align: center;
  }
}

// 商品訊息
.goods {
  width: 100%;
  // 相鄰的單元格邊框合併成單一邊框
  border-collapse: collapse;
  border-spacing: 0;

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
}

// 配送時間and支付方式
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

// 金額明細
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

// 提交訂單
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

// 切換地址彈框
.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}</style>
