// 倒計時函數

import { computed, onUnmounted, ref } from 'vue';
import  dayjs from 'dayjs';

export const useCountDown = () => {
  let timer=null;
  // 響應式數據
  const time = ref(0);
  // 格式化時間
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'));
  // 開啟倒計時的函數
  const start = (currentTime) => {
    time.value = currentTime;
    // 核心邏輯:每隔1s就減1
    timer = setInterval(() => {
      time.value--;
    }, 1000);
  };
  // 組件銷毀時清除定時器
  onUnmounted(() => {
    timer && clearInterval(timer);
  });
  return {
    formatTime,
    start
  };
};
