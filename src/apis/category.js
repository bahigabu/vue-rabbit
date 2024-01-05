import request from "@/utils/http.js";

export function getCategoryAPI(id) {
  return request({
    url: "/category",
    params: {
      id,
    },
  });
}

/**
 *@description: 獲取二級分類列表數據(麵包屑)
 *@param {*} id 分類id
 *@return {*}
 */
export const getCategoryFilterAPI = (id) => {
  return request({
    url: "/category/sub/filter",
    params: {
      id,
    },
  });
};

/**
 *@description: 獲取導航數據
 *@data {
    categoryId:1005000,
    page:1,
    pageSize:20,
    sortField:'publishTime' | 'orderNum' | 'evaluateNum'
  }
 *@return {*}
 */
export const getSubCategoryAPI = (data) => {
  return request({
    url: '/category/goods/temporary',
    method: 'post',
    data
  })
}

// Category母頁面的js檔調用
// SubCategory母頁面調用