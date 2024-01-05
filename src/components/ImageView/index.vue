<script setup>
// 引入主要方法
import { ref, watch } from 'vue';
// https://vueuse.org/core/useMouseInElement/#usemouseinelement
import { useMouseInElement } from '@vueuse/core';

// props適配圖片列表
defineProps({
  imageList: {
    type: Array,
    default: () => []
  }
});
// 小圖對應大圖
const activeIndex = ref(0);
const enterHandler = (i) => {
  activeIndex.value = i;
};
// 獲取滑鼠相對位置
const target = ref(null);
const left = ref(0);
const top = ref(0);
// 放大鏡定位值
const positionX = ref(0);
const positionY = ref(0);
// 使用useMouseInElement控制蒙層滑塊
const { elementX, elementY, isOutside } = useMouseInElement(target);
// watch
watch([elementX, elementY, isOutside], () => {
  // 滑鼠没有移入盒子，直接返回，不執行後面邏輯
  if (isOutside.value) return;
  // 有效範圍内控制滑塊距離
  // 橫向
  if (elementX.value > 100 && elementX.value < 300) {
    left.value = elementX.value - 100;
  }
  // 縱向
  if (elementY.value > 100 && elementY.value < 300) {
    top.value = elementY.value - 100;
  }
  // 處理邊界
  if (elementX.value > 300) {
    left.value = 200;
  }
  if (elementX.value < 100) {
    left.value = 0;
  }
  if (elementY.value > 300) {
    top.value = 200;
  }
  if (elementY.value < 100) {
    top.value = 0;
  }

  //  控制大圖顯示
  //  仔細觀察可發現，蒙層滑塊和放大鏡移動方向相反
  positionX.value = -left.value * 2;
  positionY.value = -top.value * 2;
});
</script>

<template>
  <div class="goods-image">
    <!-- 左側大圖-->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙層小滑塊 -->
      <div class="layer" v-show="!isOutside" :style="{ left: `${left}px`, top: `${top}px` }"></div>
    </div>
    <!-- 小圖列表 -->
    <ul class="small">
      <li v-for="(img, i) in imageList" :key="i" @mouseenter="enterHandler(i)" :class="{ active: activeIndex === i }">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大鏡大圖 -->
    <div class="large" :style="[
      {
        backgroundImage: `url(${imageList[activeIndex]})`,
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`
      }
    ]" v-show="!isOutside"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  // 左側大圖
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  // 蒙層小滑塊
  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 絕對定位 然後跟隨滑鼠控制left和top屬性就可以讓滑塊移動起来
    left: 0;
    top: 0;
    position: absolute;
  }

  // 小圖列表
  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }

  // 放大鏡大圖
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景圖:盒子的大小 = 2:1
    // 將來控制背景圖的移動来實現放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
}</style>
