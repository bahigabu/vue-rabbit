// createRouter:創建router實例對象
// createWebHistory:創建History模式的路由
import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/Layout/index.vue";
import Home from "@/views/Home/index.vue";
import Category from "@/views/Category/index.vue";
import SubCategory from "@/views/SubCategory/index.vue";
import Detail from "@/views/Detail/index.vue";
import CartList from "@/views/CartList/index.vue";
import Checkout from "@/views/Checkout/index.vue";
import Pay from "@/views/Pay/index.vue";
import PayBack from "@/views/Pay/PayBack.vue";
import Member from "@/views/Member/index.vue";
import UserInfo from "@/views/Member/components/UserInfo.vue";
import UserOrder from "@/views/Member/components/UserOrder.vue";
import Login from "@/views/Login/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        // 首頁
        {
          path: "",
          component: Home,
        },
        // 一級分類
        {
          path: "category/:id",
          component: Category,
        },
        // 二級分類
        {
          path: "category/sub/:id",
          component: SubCategory,
        },
        // 商品詳情頁
        {
          path: "detail/:id",
          component: Detail,
        },
        // 購物車詳情
        {
          path: "cartlist",
          component: CartList,
        },
        // 付款資訊
        {
          path: "checkout",
          component: Checkout,
        },
        // 訂單提交成功
        {
          path: "pay",
          component: Pay,
        },
        // 付款成功
        {
          path: "paycallback",
          component: PayBack,
        },
        {
          path: "member",
          component: Member,
          children: [
            {
              path: "",
              component: UserInfo,
            },
            {
              path: "order",
              component: UserOrder,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      component: Login,
    },
  ],
  // 路由滾動行為配置
  // 切到其他頁面後滾動條返回頂部
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

export default router;
