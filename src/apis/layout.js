import request from "@/utils/http.js";
export function getCategoryAPI() {
  return request({
    url: "/home/category/head",
    // 這是發起get請求，語法上get可省略
  });
}

// 被pinia調用category.js
