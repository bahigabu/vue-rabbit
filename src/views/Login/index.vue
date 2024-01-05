<script setup>
// 帳號:xiaotuxian001
// 密碼:123456

// 如果使用 unplugin-element-plus 並且只使用组件 API，你需要手動導入樣式。
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';

// 引入主要方法
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 不用引入API
// import { loginAPI } from '@/apis/user.js'

// 引入pinia檔案
import { useUserStore } from '@/stores/user.js';
const userStore = useUserStore();

// 使用Element Plus 提供的表單校驗功能
// https://element-plus.org/zh-CN/component/form.html

// 準備登入表單對象
const form = ref({
  account: '',
  password: '',
  agree: true
});

// 準備規則對象
const rules = {
  account: [{ required: true, message: '用戶名不能為空', trigger: 'blur' }],
  password: [
    { required: true, message: '密碼不能為空', trigger: 'blur' },
    { min: 6, max: 14, message: '密碼長度為6~14', trigger: 'blur' }
  ],
  agree: [
    {
      // 使用自定義校驗
      validator: (rule, value, callback) => {
        // 參數1:自定義校驗邏輯
        // 參數2:當前輸入的數據
        // 參數3:校驗處理函數，校驗通過調用
        if (value) {
          callback();
        } else {
          callback(new Error('請勾選協議'));
        }
      }
    }
  ]
};

// 綁定表單DOM元素 
const formRef = ref(null);
const router = useRouter();

// 統一校驗方法
const doLogin = () => {
  // 記得要解構賦值，等等才能傳參
  const { account, password } = form.value;
  // validate官方文擋封裝的專屬事件
  formRef.value.validate(async (vaild) => {
    // valid:所有表單都通過校驗才為true
    if (vaild) {
      // const res = await loginAPI({ account, password });
      // console.log(res);
      await userStore.getUserInfo({ account, password });
      // 1. 提示用户
      ElMessage({ type: 'success', message: '登入成功' });
      // 登入失敗功能寫在@/utils/http.js
      // 2. 跳轉首頁
      await router.replace({ path: '/' });
    }
  });
};
</script>

<template>
  <div>帳號:xiaotuxian001</div>
  <div>密碼:123456</div>
  <div>
    <header class="login-header">
      <!-- flex母元素 -->
      <div class="container m-top-20">
        <h1 class="logo"><RouterLink to="/">小兔鮮</RouterLink></h1>
        <RouterLink class="entry" to="/">進入網站首頁<i class="iconfont icon-angle-right"></i><i class="iconfont icon-angle-right"></i></RouterLink>
      </div>
    </header>
    <!-- 這是背景圖 -->
    <section class="login-section">
      <div class="wrapper">
        <nav><a href="javascript:;">帳號登入</a></nav>
        <!-- 輸入區域 -->
        <div class="account-box">
          <div class="form">
            <el-form :model="form" :rules="rules" label-position="right" label-width="60px" status-icon ref="formRef">
              <!-- 帳號 -->
              <el-form-item prop="account" label="帳號"><el-input v-model="form.account" /></el-form-item>
              <!-- 密碼 -->
              <el-form-item prop="password" label="密碼"><el-input v-model="form.password" /></el-form-item>
              <!-- 打勾 -->
              <el-form-item prop="agree" label-width="22px"><el-checkbox v-model="form.agree" size="large">我已同意隱私條款和服務條款</el-checkbox></el-form-item>
              <!-- 登入按鈕 -->
              <el-button size="large" class="subBtn" @click="doLogin">點擊登入</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <!-- flex母元素 -->
      <div class="container">
        <p>
          <a href="javascript:;">關於我們</a>
          <a href="javascript:;">幫助中心</a>
          <a href="javascript:;">售後服務</a>
          <a href="javascript:;">配送與驗收</a>
          <a href="javascript:;">商務合作</a>
          <a href="javascript:;">搜尋推薦</a>
          <a href="javascript:;">友情連結</a>
        </p>
        <p>CopyRight &copy; 小兔鮮兒</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    }
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}
// 這是背景圖
.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 650px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

// 輸入區域
  .form {
    padding: 0 20px 20px 20px;

}
// 登入按鈕
.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~a {
        border-left: 1px solid #ccc;
      }
    }
  }
}
</style>
