// import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
// npm i pinia-plugin-persistedstate
// https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


import App from "./App.vue";
import router from "./router";

// 引入初始化樣式文件
import "@/styles/common.scss";
// 引入懶加載指令插件且註冊
import { lazyPlugin } from "@/directives";
// 引入全局組件插件
import { componentsPlugin } from "@/components";
// 測試接口函數
// import { getCategory } from "./apis/testAPI";
// getCategory().then((res) => {
//   console.log(res);
// });

const app = createApp(App);
const pinia = createPinia();
// 註冊持久化插件
pinia.use(piniaPluginPersistedstate)
// app.use(createPinia());
app.use(pinia);
app.use(router);
app.use(lazyPlugin);
app.use(componentsPlugin);
app.mount("#app");
