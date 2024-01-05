import request from "@/utils/http.js";

export const getDetail = (id) => {
  return request({
    url: "/goods",
    params: { id },
  });
};
/**
 * 獲取熱榜商品
 * @param {Number} id 商品id 
 * @param {Number} type 1代表24小時熱榜 2代表周熱榜 
 * @param {Number} limit 獲取個數 
 */
export const getHotGoodsAPI = ({ id, type, limit = 3 }) => {
  return request({
    url: "/goods/hot",
    params: {
      id,
      type,
      limit
    }
  })
}

// Detail母頁面調用
// Detail.DetailHot調用