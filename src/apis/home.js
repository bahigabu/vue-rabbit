import request from "@/utils/http.js";
// 獲取banner
export function getBannerAPI(params = {}) {
  // Query參數就是params
  // 接口文檔提供一個Query參數distributionSite
  // 接口文檔要求參數只有等於1和等於2
  // 使用解構賦值，不傳東西(默認值)會得到1
  const { distributionSite = "1" } = params;
  // 不用解構賦值可這樣寫
  // const distributionSite = params.distributionSite || "1";
  return request({
    url: "/home/banner",
    params: {
      distributionSite,
    },
  });
}
/**
 *@description: 獲取新鮮好物
 *@param {*}
 *@return {*}
 */
export const findNewAPI = () => {
  return request({
    url: "/home/new",
  });
};

/**
 *@description: 獲取人氣推薦
 *@param {*}
 *@return {*}
 */

export const getHotAPI = () => {
  return request({
    url: "/home/hot",
  });
};

/**
 *@description: 獲取所有商品模塊
 *@param {*}
 *@return {*}
 */

export const getGoodsAPI = () => {
  return request({
    url: "/home/goods",
  });
};

// Home.HomeProduct調用
// Home.HomeHot調用
// Home.HomeNew調用
// Home.HomeBanner調用
// Category母頁面的js檔調用