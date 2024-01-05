<script setup>
// 引入子組件
import LayoutNav from './components/LayoutNav.vue';
import LayoutFixed from './components/LayoutFixed.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutFooter from './components/LayoutFooter.vue';
// 引入主要方法
import { onMounted } from 'vue';

// 觸發獲取導航列表的action
// pinia裡面有一個數組和一個異步請求
// 只在父組件發請求，這樣數組裡面會有數據
// 子組件只需拿數組來賦值，就不再調用異步請求
import { useCategoryStore } from '@/stores/category.js'
const categoryStore = useCategoryStore();
onMounted(() => categoryStore.getCategory());
</script>

<template>
  <LayoutNav />
  <LayoutFixed />
  <LayoutHeader />
  <!-- 二級路由出口 -->
  <!-- 路由緩存優化方法1:添加key 破壞複用機制 強制銷毀重建 -->
  <!-- <RouterView :key="$route.fullPath" /> -->
  <!-- 路由緩存優化方法2在src/views/Category/composables/useCategory.js -->
  <RouterView />
  <LayoutFooter />
</template>

<style scoped></style>
