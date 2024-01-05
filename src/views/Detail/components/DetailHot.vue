<script setup>
// 引入主要方法
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
// 引入API
import { getHotGoodsAPI } from '@/apis/detail.js';

// 設計props參數 適配不同的title和數據
const props = defineProps({
  type: Number
});

const TYPEMAP = {
  1: '24小時熱銷榜',
  2: '周熱銷榜'
};
// 不使用computed()的話，數據只會在組件初始化時計算一次，而不會隨著props.type的變化而更新。
// 如果你需要在props.type變化時動態更新title，你仍然需要使用computed。
const title = computed(() => TYPEMAP[props.type]);

const hotList = ref([]);

const route = useRoute();
const getHotList = async () => {
  const res = await getHotGoodsAPI({
    id: route.params.id,
    type: props.type
  });
  hotList.value = res.result;

};
onMounted(() => getHotList());

</script>

<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品區塊 -->
    <RouterLink :to="`/detail/${item.id}`" class="goods-item" v-for="item in hotList" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>
