// 定義懶加載插件
// 定義全局指令
// https://vueuse.org/core/useIntersectionObserver/
import { useIntersectionObserver } from "@vueuse/core";
export const lazyPlugin = {
  install(app) {
    // 懶加載邏輯
    app.directive("img-lazy", {
      mounted(el, binding) {
        // 對象解構賦值
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 進入視口區域
            el.src = binding.value;
            stop();
          }
        });
      },
    });
  },
};
