import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
// 參考文檔
// https://element-plus.org/zh-CN/guide/quickstart.html
// npm install element-plus --save
// npm install -D unplugin-vue-components unplugin-auto-import
// 下面3個是ElementPlus
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// 上面3個是ElementPlus
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  // 配置插件
  plugins: [
    vue(),
    // 下面2個是ElementPlus
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // npm i sass -D
      // 採用sass配色系統
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自動導入定製化樣式文件
        // 第一條是將ElementPlus預設主要5色改成我們要的顏色
        // 第二條只是顏色變量全局配置
        additionalData: `
        @use "@/styles/element/index.scss" as *; 
        @use "@/styles/var.scss" as *;
        `
      }
    }
  },
  base: '/vue-rabbit-gh-pages'
});
