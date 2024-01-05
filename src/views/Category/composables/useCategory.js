// 封裝分類數據業務相關代碼

// 引入主要方法
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'; // 注意沒有r
import { onBeforeRouteUpdate } from 'vue-router'
// 引入API
import { getCategoryAPI } from '@/apis/category.js';

export function useCategory() {
  const categoryData = ref({});
  const route = useRoute();
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id);
    categoryData.value = res.result;
  };
  onMounted(() => getCategory());
  // 路由緩存優化方法2:路由參數變化的時候，可以把分類數據重新發送
  // 比方法1強的地方:不會重複請求banner(輪播圖)
  onBeforeRouteUpdate((to) => {
    console.log(to); // 拿到主要對象
    getCategory(to.params.id);
  });
  return {
    categoryData
  }
}
