<script setup>
// 引入子組件
import HeaderCart from '@/views/Layout/components/HeaderCart.vue';
// 引入pinia檔案
import { useCategoryStore } from '@/stores/category.js';
// 使用pinia中的數據
const categoryStore = useCategoryStore();
// pinia裡面有一個數組和一個異步請求
// 只在父組件發請求，這樣數組裡面會有數據
// 子組件只需拿數組來賦值，就不再調用異步請求
</script>

<template>
  <header class="app-header">
    <!-- flex母元素 -->
    <div class="container">
      <h1 class="logo">
        <!-- 這其實是一張圖片 -->
        <RouterLink to="/">小兔鮮</RouterLink>
      </h1>
      <!-- flex母元素 -->
      <ul class="app-header-nav">
        <li class="home">
          <RouterLink to="/">首頁</RouterLink>
        </li>
        <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
          <!-- active-class是vue特殊語法，可以在a標籤選中時套用類名 -->
          <RouterLink active-class="active" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        </li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜" />
      </div>
      <!-- 頭部購物車 -->
      <HeaderCart />
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  background: #fff;

  .container {
    display: flex;
    // justify-content: center;
    align-items: center;
  }

  .logo {
    width: 200px;
    a {
      display: block;
      height: 132px;
      width: 100%;
      // 將'小兔鮮'三個字超出螢幕外看不到，但還是存在
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    }
  }
  .app-header-nav{
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;

    li{
      margin-right: 40px;
      width: 38px;
      text-align: center;

      a{
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;

        &:hover{
          color:$xtxColor;
          border-bottom: 1px solid $xtxColor;
        }
      }

      .active{
        color:$xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }
  }
  .search {
    width: 170px;
    height: 32px;
    // margin-left: 80px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;

    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }

    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }
}
</style>
