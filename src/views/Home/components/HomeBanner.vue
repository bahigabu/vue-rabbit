<script setup>
// 引入主要方法
import { onMounted, ref } from 'vue';
// 引入API
import { getBannerAPI } from '@/apis/home.js';
const bannerList = ref([]);
const getBanner = async () => {
  const res = await getBannerAPI();
  bannerList.value = res.result;
};
onMounted(() => { getBanner() });
</script>

<template>
  <!-- 使用樣式庫 -->
  <!-- https://element-plus.org/zh-CN/component/carousel.html -->
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
