// 引入主要方法
import { ref } from "vue";
import { defineStore } from "pinia";
// 引入API
import { getCategoryAPI } from "@/apis/layout.js";
// 定義pinia
export const useCategoryStore = defineStore("category", () => {
  // 導航列表數據管理
  const categoryList = ref([]);
  const getCategory = async () => {
    const res = await getCategoryAPI();
    console.log(res);
    categoryList.value = res.result;
  };
  return {
    categoryList,
    getCategory,
  };
});

// Layout母頁面調用
// Layout.LayoutHeader調用
// Layout.LayoutFixed調用
// Home.HomeCategory調用
