// axios基礎封裝
import axios from "axios";
// 導入路徑
// 這邊是因為不能在setup外使用vue-router
import router from '@/router/index.js'
// 導入管理用戶數據pinia
import { useUserStore } from "@/stores/user.js";
// 依照官方規定import兩個東西
// 如果使用 unplugin-element-plus 并且只使用组件 API，你需要手动导入样式。
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";

const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net/",
  timeout: 5000,
});
// 攔截器

// 請求攔截器
httpInstance.interceptors.request.use(
  (config) => {
    // 從pinia獲取token數據
    const userStore = useUserStore();
    // 按照後端要求拼接token數據
    const token = userStore.userInfo.token;
    if (token) {
      // 直接在所有異步請求的請求頭裡添加名為Authorization的數據
      // 記得拼接token那邊一定要有空格
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e)
);

// 響應攔截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const userStore = useUserStore();
    // 統一錯誤提示
    ElMessage({
      type: "warning",
      message: e.response.data.message,
    });
    // 401token失效處理
    if (e.response.status === 401) {
      // 清除本地用戶數據
      userStore.clearUserInfo()
      // 跳轉到登錄頁
      router.push('/login')
    }
    return Promise.reject(e);
  }
);

export default httpInstance;
