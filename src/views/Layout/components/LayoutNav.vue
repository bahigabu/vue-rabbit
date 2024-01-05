<script setup>
// 引入主要方法
import { useRouter } from 'vue-router';
const router = useRouter();
// 引入pinia檔案
import { useUserStore } from '@/stores/user.js';
const userStore = useUserStore();

// 登出操作
const confirm = () => {
  // 清除用戶信息
  userStore.clearUserInfo();
  // 跳轉到登錄頁
  router.push('/login');
};
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <!-- flex母元素 -->
      <ul>
        <!-- 多模版渲染，區分登入與未登入 -->
        <!-- 登陸時顯示第一塊  非登錄時顯示第二塊  看是否有token -->
        <template v-if="userStore.userInfo.token">
          <li>
            <a href="javascript:;">
              <i class="iconfont icon-user"></i>
              {{ userStore.userInfo.account }}
            </a>
          </li>
          <li>
            <!-- https://element-plus.org/zh-CN/component/popconfirm.html -->
            <el-popconfirm @confirm="confirm" title="確認退出嗎?" confirm-button-text="確認" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登錄</a>
              </template>
            </el-popconfirm>
          </li>
          <li><RouterLink to="/member/order">我的訂單</RouterLink></li>
          <li><RouterLink to="/member">會員中心</RouterLink></li>
        </template>
        <!-- 未登入模版 -->
        <template v-else>
          <li>
            <a href="javascript:;" @click="$router.push('/login')">請先登入</a>
          </li>
          <li><a href="javascript:;">幫助中心</a></li>
          <li><a href="javascript:;">關於我們</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        // font-size: 14px;
        line-height: 1;
        // 可避免二次使用flex
        display: inline-block;
        // 字體圖標大小
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          // 定義位在var.scss
          color: $xtxColor;
        }
      }
      // 其他同級兄弟的樣式
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>