<script setup></script>

<template>
  <!-- flex母元素 -->
  <div class="container">
    <div class="xtx-member-aside">
      <div class="user-manage">
        <!-- 一 -->
        <h4>我的帳號</h4>
        <div class="links"><RouterLink to="/member">個人中心</RouterLink></div>
        <!-- 二 -->
        <h4>交易管理</h4>
        <div class="links"><RouterLink to="/member/order">我的訂單</RouterLink></div>
      </div>
    </div>
    <div class="article">
      <!-- 三级路由的掛載點 -->
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
// 第一層
.container {
  display: flex;
  padding-top: 20px;
// 第二層
  .xtx-member-aside {
    width: 220px;
    margin-right: 20px;
    border-radius: 2px;
    background-color: #fff;
// 第三層
    .user-manage {
      // 一、二共用樣式
      h4 {
        font-size: 18px;
        font-weight: 400;
        padding: 20px 52px 5px;
        border-top: 1px solid #f6f6f6;
      }

      .links {
        padding: 0 52px 10px;
      }

      a {
        display: block;
        line-height: 1;
        padding: 15px 0;
        font-size: 14px;
        color: #666;
        position: relative;

        &:hover {
          color: $xtxColor;
        }
        // 都是RouterLink內置類名，編輯vue看不到，要看原始碼才有
        &.active,
        &.router-link-exact-active {
          color: $xtxColor;
          // 小圓點顯現
          &:before {
            display: block;
          }
        }
        // 只是小圓點
        &:before {
          content: '';
          display: none;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          position: absolute;
          top: 19px;
          left: -16px;
          background-color: $xtxColor;
        }
      }
    }
  }
  // 三级路由
  .article {
    width: 1000px;
    background-color: #fff;
  }
}
</style>
