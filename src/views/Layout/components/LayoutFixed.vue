<script setup>
// 導入一個包
// npm i @vueuse/core
import { useScroll } from '@vueuse/core';
// 使用包裡面的功能
const { y } = useScroll(window);
// 引入pinia檔案
import { useCategoryStore } from '@/stores/category.js';
// 使用pinia中的數據
const categoryStore = useCategoryStore();
// pinia裡面有一個數組和一個異步請求
// 只在父組件發請求，這樣數組裡面會有數據
// 子組件只需拿數組來賦值，就不再調用異步請求
</script>

<template>
  <div class="app-header-sticky" :class="{ show: y > 78 }">
    <!-- flex母元素 -->
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!-- 導航區域 -->
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
    </div>
  </div>
</template>

<style scoped lang="scss">
// 最大框
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 此處為關鍵樣式!!!
  // 狀態一：往上平移自身高度 + 完全透明
  transform: translateY(-100%);
  opacity: 0;

  // 狀態二：移除平移 + 完全不透明
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }

  // 二級框
  .container {
    display: flex;
    align-items: center;
  }

  // 圖片
  .logo {
    width: 200px;
    height: 80px;
    background: url('@/assets/images/logo.png') no-repeat right 2px;
    background-size: 160px auto;
  }

  // 小分類區塊
  .app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;

    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;

      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;

        &:hover {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;
        }
      }

      // 選中觸發樣式
      .active {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }
  }
}
</style>
