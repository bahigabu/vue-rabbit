import request from "@/utils/http.js";

// 獲取詳情接口
export const getCheckInfoAPI = () => {
  return request({
    url:'/member/order/pre'
  });
};
// 創建訂單
export const createOrderAPI = (data) => {
  return request({
    url: '/member/order',
    method: 'POST',
    data
  })
}

// checkout母頁面調用