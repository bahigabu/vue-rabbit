<script setup>
// 引入子組件
import GoodsItem from '@/views/Home/components/GoodsItem.vue';
// 引入主要方法
import { onMounted, ref } from 'vue';
// 引入API
import { getLikeListAPI } from '@/apis/user.js';
// 引入pinia檔案
import { useUserStore } from '@/stores/user.js';
const userStore = useUserStore();

const likeList = ref([]);

const getLikeList = async () => {
  const res = await getLikeListAPI({ limit: 4 });
  likeList.value = res.result;
  console.log(res);
};
onMounted(() => getLikeList());
</script>

<template>
  <!-- flex母元素 -->
  <div class="home-overview">
    <!-- 用户訊息 -->
    <!-- flex母元素 -->
    <div class="user-meta">
      <div class="avatar"><img :src="userStore.userInfo?.avatar" alt="" /></div>
      <h4>{{ userStore.userInfo?.account }}</h4>
    </div>
    <!-- flex母元素 -->
    <div class="item">
      <a href="javascript:"><span class="iconfont icon-hy"></span><p>會員中心</p></a>
      <a href="javascript:"><span class="iconfont icon-aq"></span><p>安全設置</p></a>
      <a href="javascript:"><span class="iconfont icon-dw"></span><p>地址管理</p></a>
    </div>
  </div>
  <!-- 猜你喜歡 -->
  <div class="like-container">
    <div class="home-panel">
      <!-- flex母元素 -->
      <div class="header"><h4 data-v-bcb266e0="">猜你喜歡</h4></div>
      <!-- flex母元素 -->
      <div class="goods-list"><GoodsItem v-for="good in likeList" :key="good.id" :good="good" /></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-overview {
  height: 132px;
  background: url(@/assets/images/center-bg.png) no-repeat center / cover;
  display: flex;

  // 用户訊息
  .user-meta {
    flex: 1;
    display: flex;
    align-items: center;

    .avatar {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 60px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    h4 {
      padding-left: 26px;
      font-size: 18px;
      font-weight: normal;
      color: white;
    }
  }

  .item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;

    a {
      color: white;
      font-size: 16px;
      text-align: center;

      .iconfont {
        font-size: 32px;
      }

      p {
        line-height: 32px;
      }
    }
  }
}

// 猜你喜歡
.like-container {
  margin-top: 20px;
  border-radius: 4px;
  background-color: #fff;
}

.home-panel {
  background-color: #fff;
  padding: 0 20px;
  margin-top: 20px;
  height: 400px;

  .header {
    height: 66px;
    border-bottom: 1px solid #f5f5f5;
    padding: 18px 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    h4 {
      font-size: 22px;
      font-weight: 400;
    }
  }

  .goods-list {
    display: flex;
    justify-content: space-around;
  }
}
</style>
