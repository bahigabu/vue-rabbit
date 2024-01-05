// 封裝banner輪播圖相關的業務代碼

// 引入主要方法
import { ref, onMounted } from "vue";
// 引入API
import { getBannerAPI } from "@/apis/home.js";

export function useBanner() {
  const bannerList = ref([]);
  const getBanner = async () => {
    // 1為首頁，2為分類商品頁
    const res = await getBannerAPI({ distributionSite: "2" });
    bannerList.value = res.result;
  };
  onMounted(() => {
    getBanner();
  });
  return {
    bannerList
  }
}