<script setup>
// 引入子組件
import HomePanel from './HomePanel.vue';
import GoodsItem from '@/views/Home/components/GoodsItem.vue';
// 引入主要方法
import { onMounted, ref } from 'vue';
// 引入API
import { getGoodsAPI } from '@/apis/home.js';

const goodsProduct = ref([]);
const getGoods = async () => {
  const res = await getGoodsAPI();
  goodsProduct.value = res.result;
};

onMounted(() => getGoods());
</script>

<template>
  <div class="home-product">
    <HomePanel :title="cate.name" v-for="cate in goodsProduct" :key="cate.id" sub-title="">
      <!-- flex母元素 -->
      <div class="box">
        <RouterLink class="cover" :to="`/category/${cate.id}`">
          <img v-img-lazy="cate.picture" />
          <!-- flex母元素 -->
          <strong class="label">
            <span>{{ cate.name }}館</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <!-- flex母元素 -->
        <ul class="goods-list">
          <!-- 二次v-for -->
          <li v-for="good in cate.goods" :key="good.id">
            <GoodsItem :good="good" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<style scoped lang="scss">
.home-product {
  background: #fff;
  margin-top: 10px;

  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: $xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 350px;
      height: 550px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        // 防止圖片拉伸
        object-fit: cover;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1 1 auto;
            background: rgba(0, 0, 0, 0.7);
            overflow: hidden;
            // 文本溢出時顯示省略號...
            text-overflow: ellipsis;
            // 防止文本換行
            white-space: nowrap;
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 220px;
        height: 220px;
        margin-right: 9px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
