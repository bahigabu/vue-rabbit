<script setup>
// 引入子組件
import GoodsItem from '@/views/Home/components/GoodsItem.vue';

// 導入2個自己的組合式函數

// 獲取分類數據 + 路由緩存優化
import { useCategory } from './composables/useCategory.js'
// 利用解構賦值提取返回對象裡的對象
const { categoryData } = useCategory()
// 獲取banner
import { useBanner } from './composables/useBanner.js'
// 利用解構賦值提取返回對象裡的數組
const { bannerList } = useBanner()
</script>

<template>
  <div class="top-category">
    <div class="container">
      <!-- 麵包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item to="/">首頁</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 輪播圖-->
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.imgUrl" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 全部分類-->
      <div class="sub-list">
        <h3>全部分類</h3>
        <!-- flex母元素 -->
        <ul>
          <li v-for="item in categoryData.children" :key="item.id">
            <RouterLink :to="`/category/sub/${item.id}`">
              <img v-img-lazy="item.picture" />
              <p>{{ item.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <!-- 各分類商品 -->
      <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
        <div class="head">
          <h3>-{{ item.name }}-</h3>
        </div>
        <!-- flex母元素 -->
        <div class="body">
          <!-- 二次v-for -->
          <GoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-category {
  // 因為有2個h3，所以樣式設定在最外層
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .bread-container {
    padding: 25px 0;
  }

  .home-banner {
    width: 1240px;
    height: 500px;

    img {
      width: 100%;
      height: 500px;
    }
  }
}

.sub-list {
  margin-top: 20px;
  background-color: #fff;



  ul {
    display: flex;
    padding: 0 32px;
    flex-wrap: wrap;

    li {
      width: 168px;
      height: 160px;

      a {
        text-align: center;
        display: block;
        font-size: 16px;

        img {
          width: 100px;
          height: 100px;
        }

        p {
          line-height: 40px;
        }

        &:hover {
          color: $xtxColor;
        }
      }
    }
  }
}

.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;

  // .head {}

  .body {
    display: flex;
    justify-content: space-around;
    padding: 0 40px 30px;
  }
}
</style>