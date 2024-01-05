<script setup>
// 下面2個有全局註冊，所以不用引入
// import ImageView from '@/components/ImageView/index.vue'
// import XtxSku from '@/components/XtxSku/index.vue'

// 引入子組件
import DetailHot from '@/views/Detail/components/DetailHot.vue';
// 引入主要方法
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { onBeforeRouteUpdate } from 'vue-router'
// 引入API
import { getDetail } from '@/apis/detail.js';
// 引入pinia
import { useCartStore } from '@/stores/cartStore.js';
// 導入element-plus彈框
import { ElMessage } from 'element-plus';

// 基礎數據渲染
const goods = ref({});
const route = useRoute();
const getGoods = async () => {
  const res = await getDetail(route.params.id);
  goods.value = res.result;
};
onMounted(() => getGoods());

//  sku操作函数
let skuObj = {};
const changeSku = (sku) => {
  skuObj = sku;
};

// 数量count操作
const count = ref(1);

// 添加購物車
const cartStore = useCartStore();
const addCart = () => {
  if (skuObj.skuId) {
    // 規則已選擇，觸發action
    cartStore.addCart({
      id: goods.value.id, // 商品id
      name: goods.value.name, // 商品名稱
      picture: goods.value.mainPictures[0], // 圖片
      price: goods.value.price, // 最新價格
      count: count.value, // 商品數量
      skuId: skuObj.skuId, // skuId
      attrsText: skuObj.specsText, // 商品規格文本
      selected: true // 商品是否選中
    });
  } else {
    // 規則沒有選擇，提示用戶
    ElMessage.warning('請選擇規格');
    console.log("沒選擇");
  }
};
// 路由緩存優化方法2:路由參數變化的時候，可以把分類數據重新發送
onBeforeRouteUpdate(async (to) => {
  const res = await getDetail(to.params.id);
  goods.value = res.result;
});

</script>

<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="goods.details">
      <!-- 麵包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
          <!-- 錯誤原因:goods一開始是空對象，{}.categories 下一步 undefined 下一步 undefined[1] -->
          <!-- 解決方法1:使用可選鏈語法?. -->
          <!-- 解決方法2:v-if手動控制渲染時機 -->
          <el-breadcrumb-item :to="{ path: `/category/sub/${goods.categories?.[1].id}` }">{{ goods.categories?.[1].name}}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/sub/${goods.categories?.[0].id}` }">{{ goods.categories?.[0].name}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ goods.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品訊息 -->
      <div class="info-container">
        <div>
          <!-- flex母元素 -->
          <div class="goods-info">
            <div class="media">
              <!-- 圖片預覽區 -->
              <XtxImageView :imageList="goods.mainPictures" />
              <!-- 統計數量 -->
              <!-- flex母元素 -->
              <ul class="goods-sales">
                <li>
                  <p>銷量人氣</p>
                  <p>{{ goods.salesCount }}+</p>
                  <p><i class="iconfont icon-task-filling"></i>銷量人氣</p>
                </li>
                <li>
                  <p>商品評價</p>
                  <p>{{ goods.commentCount }}+</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看評價</p>
                </li>
                <li>
                  <p>收藏人氣</p>
                  <p>{{ goods.collectCount }}+</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌訊息</p>
                  <p>{{ goods.brand.name }}</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主頁</p>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品訊息區 -->
          <div class="spec">
            <p class="g-name">{{ goods.name }}</p>
            <p class="g-desc">{{ goods.desc }}</p>
            <p class="g-price">
              <span>{{ goods.price }}</span>
              <span v-show="goods.price < goods.oldPrice">{{ goods.oldPrice }}</span>
            </p>
            <div class="g-service">
              <dl>
                <dt>促銷</dt>
                <dd>12月好物放送，App領卷購買直降120元</dd>
              </dl>
              <dl>
                <dt>服務</dt>
                <dd>
                  <span>無擾退貨</span>
                  <span>快速退款</span>
                  <span>免費郵寄</span>
                  <a href="javascript:;">了解詳情</a>
                </dd>
              </dl>
            </div>
            <!-- sku组件 -->
            <XtxSku :goods="goods" @change="changeSku" />
            <!-- 數據组件 -->
            <el-input-number v-model="count" :min="1" />
            <!-- 按鈕组件 -->
            <div>
              <el-button size="large" class="btn" @click="addCart">加入購物車</el-button>
            </div>
          </div>
          <!-- 網站下半部 -->
          <!-- flex母元素 -->
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品詳情 -->
              <div class="goods-tabs">
                <nav>
                  <a>商品詳情</a>
                </nav>
                <div class="goods-detail">
                  <!-- 屬性 -->
                  <ul class="attrs">
                    <li v-for="item in goods.details.properties" :key="item.value">
                      <span class="dt">{{ item.name }}</span>
                      <span class="dd">{{ item.value }}</span>
                    </li>
                  </ul>
                  <!-- 圖片 -->
                  <img v-for="img in goods.details.pictures" :src="img" :key="img" :alt="img" />
                </div>
              </div>
            </div>
            <!-- 24熱榜+專題推薦 -->
            <div class="goods-aside">
              <!--  24小時  -->
              <!-- 註1 -->
              <DetailHot :type="1" />
              <!--  周榜  -->
              <!-- 註1 -->
              <DetailHot :type="2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 註1 -->
  <!-- 具體而言，<DetailHot :type="1" /> 中的 :type 表示將父組件中的數據 1 綁定到子组件的 type 屬性上。
    這樣的綁定使得當父组件中的數據發生變化時，子组件中的對應屬性也會隨之更新。
    如果你使用 <DetailHot type="1" />，那麼Vue會將 1 視為字符串傳遞給子组件的 type 屬性。
    這樣的綁定方式是靜態的，子组件的 type 屬性不會隨著父组件中的數據變化而更新。
    因此，使用 : 或 v-bind 是為了告訴Vue你正在進行屬性綁定，而不僅僅是傳遞一個字符串。 -->
</template>

<style scoped lang="scss">
.xtx-goods-page {
  .bread-container {
    padding: 25px 0;
  }

  // 商品訊息第2、3層盒子
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;

      // 統計數量
      .goods-sales {
        display: flex;
        width: 400px;
        align-items: center;
        text-align: center;
        height: 140px;

        li {
          flex: 1;
          position: relative;

          ~li::after {
            position: absolute;
            top: 10px;
            left: 0;
            height: 60px;
            border-left: 1px solid #e4e4e4;
            content: '';
          }

          p {
            &:first-child {
              color: #999;
            }

            &:nth-child(2) {
              color: $priceColor;
              margin-top: 10px;
            }

            &:last-child {
              color: #666;
              margin-top: 10px;

              i {
                color: $xtxColor;
                font-size: 14px;
                margin-right: 2px;
              }

              &:hover {
                color: $xtxColor;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }

  // 商品訊息區定位
  .spec {
    position: absolute;
    top: 135px;
    left: 615px;
    padding: 30px 30px 30px 0;

    .g-name {
      font-size: 22px;
    }

    .g-desc {
      color: #999;
      margin-top: 10px;
    }

    .g-price {
      margin-top: 10px;

      span {
        &::before {
          content: '¥';
          font-size: 14px;
        }

        &:first-child {
          color: $priceColor;
          margin-right: 10px;
          font-size: 22px;
        }

        &:last-child {
          color: #999;
          text-decoration: line-through;
          font-size: 16px;
        }
      }
    }

    .g-service {
      background: #f5f5f5;
      width: 500px;
      padding: 20px 10px 0 10px;
      margin-top: 10px;

      dl {
        padding-bottom: 20px;
        display: flex;
        align-items: center;

        dt {
          width: 50px;
          color: #999;
        }

        dd {
          color: #666;

          &:last-child {
            span {
              margin-right: 10px;

              &::before {
                content: '•';
                color: $xtxColor;
                margin-right: 2px;
              }
            }

            a {
              color: $xtxColor;
            }
          }
        }
      }
    }
  }

  // 網站下半部
  // 第1層盒子
  .goods-footer {
    display: flex;
    margin-top: 20px;

    // 第2層盒子
    .goods-article {
      width: 940px;
      margin-right: 20px;

      // 商品詳情
      .goods-tabs {
        min-height: 600px;
        background: #fff;

        nav {
          height: 70px;
          line-height: 70px;
          display: flex;
          border-bottom: 1px solid #f5f5f5;

          a {
            padding: 0 40px;
            font-size: 18px;
            position: relative;

            >span {
              color: $priceColor;
              font-size: 16px;
              margin-left: 10px;
            }
          }
        }

        // 商品詳情的內容
        .goods-detail {
          padding: 40px;

          .attrs {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 30px;

            li {
              display: flex;
              margin-bottom: 10px;
              width: 50%;

              .dt {
                width: 100px;
                color: #999;
              }

              .dd {
                flex: 1;
                color: #666;
              }
            }
          }

          >img {
            width: 100%;
          }
        }
      }
    }
    // 24熱榜+專題推薦
    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }
}
.btn {
  margin-top: 20px;
}
</style>
