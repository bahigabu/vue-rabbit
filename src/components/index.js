// 把components中的所有組件進行全局化註冊
// 通過插件的方式
import ImageView from './ImageView/index.vue';
import Sku from './XtxSku/index.vue';
// import { App } from 'vue';

export const componentsPlugin = {
  install(app) {
    // app.component('組件名字', 組件配置對象);
    // '組件名字':自己取，使用場景的html標籤名為這個
    // 組件配置對象:本文件上面import的東西
    app.component('XtxImageView', ImageView);
    app.component('XtxSku', Sku);
  }
};
