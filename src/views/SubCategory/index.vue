<script setup>
// 引入子組件
import GoodsItem from '@/views/Home/components/GoodsItem.vue';
// 引入主要方法
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
// 引入API
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category.js';

// 獲取麵包屑導航數據
const categoryData = ref({});
const getCategoryData = async () => {
  const res = await getCategoryFilterAPI(route.params.id);
  categoryData.value = res.result;
};
onMounted(() => getCategoryData());

// 獲取基礎列表數據渲染
const goodList = ref([]);
// 請求參數
const reqData = ref({
  categoryId: route.params.id,
  page: 2,
  pageSize: 20,
  sortField: 'publishTime'
});
// 請求數據函數
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value);
  goodList.value = res.result.items;
};
onMounted(() => getGoodList());

// 定義切換事件
const tabChange = () => {
  if (reqData.value.sortField === "publishTime") {
    reqData.value.page = 2;
  } else if (reqData.value.sortField === "orderNum") {
    reqData.value.page = 3;
  } else {
    reqData.value.page = 4;
  }
  getGoodList();
};

// 無限加載功能
const disabled = ref(false)
const load = async () => {
  // 獲取下一頁數據
  reqData.value.page++;
  const res = await getSubCategoryAPI(reqData.value);
  // 展開運算符，可在不改變原始數組的情況下將數組連接起來
  goodList.value = [...goodList.value, ...res.result.items];
  // 加載完畢，停止監聽
  if (res.result.items.length === 0) {
    disabled.value = true;
    return;
  }
};
</script>

<template>
  <div class="container">
    <!-- 麵包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{
          categoryData.parentName }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <!-- tab-change是elementUI規定的事件，可查說明文檔 -->
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <!-- label裡放的是網頁顯示文字，name裡放的是接口文檔sortField規定名稱 -->
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人氣" name="orderNum"></el-tab-pane>
        <el-tab-pane label="評論最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <!-- v-infinite-scroll="load"是ElementPlus內建語法 -->
      <!-- :infinite-scroll-disabled="disabled"是ElementPlus規定語法 -->
      <!-- flex母元素 -->
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <GoodsItem v-for="good in goodList" :good="good" :key="good.id"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    // 子元素換行
    flex-wrap: wrap;
    padding: 0 10px;
  }

  // 子組件樣式覆蓋
  // GoodsItem
  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>
