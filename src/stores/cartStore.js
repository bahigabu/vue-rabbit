// 封裝購物車模塊

// 引入主要方法
import { computed, ref } from "vue";
import { defineStore } from "pinia";
// 引入pinia檔案
import { useUserStore } from "./user.js";
// 引入API
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart.js";

export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);

    // 1.定義state
    const cartList = ref([]);
    // 獲取最新購物車列表action
    const updateNewList = async () => {
      const res = await findNewCartListAPI();
      cartList.value = res.result;
    };
    // 2.定義action
    const addCart = async (goods) => {
      const { skuId, count } = goods;
      if (isLogin.value) {
        // 登入後的購物車邏輯
        // post請求
        await insertCartAPI({ skuId, count });
        // get請求
        // const res = await findNewCartListAPI();
        // cartList.value = res.result;
        updateNewList()
      } else {
        // 添加購物車操作
        // 已添加過 count + 1
        // 沒有添加過 直接push
        const item = cartList.value.find((item) => {
          return goods.skuId === item.skuId;
        });
        if (item) {
          // 找到了
          console.log("找到了");
          item.count++;
        } else {
          // 沒找到
          cartList.value.push(goods);
        }
      }
    };
    // 刪除購物車
    const delCart = async (skuId) => {
      if (isLogin.value) {
        // 調用接口實現接口購物車刪除功能
        await delCartAPI([skuId]);
        // get請求
        // const res = await findNewCartListAPI();
        // cartList.value = res.result;
        updateNewList()
      } else {
        // 思路
        // 1.找到要刪除的下標值  splice
        const idx = cartList.value.findIndex((item) => {
          skuId === item.skuId;
        });
        cartList.value.splice(idx, 1);
        // 2.使用數組的過濾方法  filter
      }
    };

    // 清除購物車
    const clearCart = () => {
      cartList.value = [];
    }

    // 單選功能
    const singleCheck = (skuId, selected) => {
      // 通過skuId找到要修改的那一項，然後把他的selected修改為true或false
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };
    // 全選功能
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected));
    };
    // 計算屬性
    // 1.總的數量:所有項的count之和
    const allCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0)
    );
    // 2.總價:所有項的count*price之和
    const allPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    );
    // 3.已選擇數量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0)
    );
    // 4.已選擇商品價錢合計
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0)
    );
    // 是否全選
    const isAll = computed(() => cartList.value.every((item) => item.selected));
    return {
      cartList,
      allCount,
      allPrice,
      isAll,
      selectedCount,
      selectedPrice,
      clearCart,
      addCart,
      delCart,
      singleCheck,
      allCheck,
      updateNewList
    };
  },
  {
    // https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/
    // 已在main.js註冊持久化插件
    // 直接實現購物車本地存儲功能
    persist: true,
  }
);

// Layout.HeaderCart調用
// Home.HomeCategory調用
// Detail母頁面調用
// CartList母頁面調用
// checkout母頁面調用
// 被pinia調用user.js