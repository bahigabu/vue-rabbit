<script setup>
// 引入子組件
import HomePanel from '@/views/Home/components/HomePanel.vue';
// 引入主要方法
import { onMounted, ref } from 'vue';
// 引入API
import { findNewAPI } from '@/apis/home.js';

const newList = ref([]);
const getNewList = async () => {
  const res = await findNewAPI();
  newList.value = res.result;
};

onMounted(() => getNewList());
</script>

<template>
  <HomePanel title="新鮮好物" sub-title="每日推薦 新鮮出爐 品質保證">
    <!-- flex母元素 -->
    <ul class="goods-list">
      <li v-for="item in newList" :key="item.id">
        <RouterLink :to="`/detail/${item.id}`">
          <img v-img-lazy="item.picture" alt="" />
          <p class="name">{{ item.name }}</p>
          <!-- &yen;只是一個字符實體 -->
          <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all 0.5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      overflow: hidden;
      // 文本溢出時顯示省略號...
      text-overflow: ellipsis;
      // 防止文本換行
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>
