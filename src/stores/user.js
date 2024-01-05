// 管理用戶數據

// 引入主要方法
import { defineStore } from "pinia";
import { ref } from "vue";
// 引入API
import { loginAPI } from "@/apis/user.js";
import { mergeCartAPI } from "@/apis/cart.js";
// 引入pinia檔案
import { useCartStore } from "./cartStore";

// 定義pinia
export const useUserStore = defineStore(
  "user",
  () => {
    const cartStore = useCartStore();
    // 定義管理用戶數據的state
    const userInfo = ref({});
    // 定義獲取接口數據的action函數
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password });
      console.log(res);
      userInfo.value = res.result;
      // 合併購物車的操作
      await mergeCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count,
          };
        })
      );
      cartStore.updateNewList();
    };
    // 退出時清除用戶信息
    const clearUserInfo = () => {
      userInfo.value = {};
      // 執行清除購物車的action
      cartStore.clearCart();
    };
    // 以對象的格式把state和action return
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    };
  },
  {
    // https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/
    // 已在main.js註冊持久化插件
    // 直接實現帳密本地存儲功能
    persist: true,
  }
);

// Layout.LayoutNav調用