<script setup>
// 引入pinia檔案
import { useCartStore } from '@/stores/cartStore.js';
const cartStore = useCartStore();

// 單選回調
const singleCheck = (item, selected) => {
  cartStore.singleCheck(item.skuId, selected);
};
// 全選
const allCheck = (selected) => {
  cartStore.allCheck(selected)
}
</script>

<template>
  <div class="xtx-cart-page">
    <div class="container">
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <!-- 全選框 -->
                <!-- v-model可拆成model-value和@change -->
                <el-checkbox :model-value="cartStore.isAll" @change="allCheck" />
              </th>
              <th width="400">商品訊息</th>
              <th width="220">單價</th>
              <th width="180">數量</th>
              <th width="180">小計</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 商品列表 -->
          <tbody>
            <tr v-for="item in cartStore.cartList" :key="item.id">
              <!-- 單選框 -->
              <td>
                <!-- v-model可拆成model-value和@change -->
                <el-checkbox :model-value="item.selected" @change="(selected) => singleCheck(item, selected)" />
              </td>
              <!-- 商品訊息 -->
              <td>
                <div class="goods">
                  <RouterLink to="/"><img :src="item.picture" alt="" /></RouterLink>
                  <div><p class="name ellipsis">{{ item.name }}</p></div>
                </div>
              </td>
              <!-- 單價 -->
              <td class="tc"><p>&yen;{{ item.price }}</p></td>
              <!-- 數量 -->
              <td class="tc"><el-input-number :min="1" v-model="item.count" /></td>
              <!-- 小計 -->
              <td class="tc"><p class="f16 red">&yen;{{ (item.price * item.count).toFixed(2) }}</p></td>
              <!-- 操作 -->
              <td class="tc">
                <p>
                  <el-popconfirm title="確認刪除嗎?" confirm-button-text="確認" cancel-button-text="取消" @confirm="cartStore.delCart(item.skuId)">
                    <template #reference><a href="javascript:;">删除</a></template>
                  </el-popconfirm>
                </p>
              </td>
            </tr>
            <!-- 如果購物車為空 -->
            <tr v-if="cartStore.cartList.length === 0">
              <td colspan="6">
                <div class="cart-none">
                  <el-empty description="購物車列表為空">
                    <el-button type="primary">隨便逛逛</el-button>
                  </el-empty>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作欄 -->
      <div class="action">
        <div class="batch">
          共 {{ cartStore.allCount }} 件商品，已選擇 {{ cartStore.selectedCount }} 件，商品合計：
          <span class="red">¥ {{ cartStore.selectedPrice.toFixed(2) }}</span>
        </div>
        <div class="total">
          <el-button size="large" type="primary" @click="$router.push('/checkout')">下單結算</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 全局樣式
.red {
  color: $priceColor;
}

.f16 {
  font-size: 16px;
}

// 最外層
.xtx-cart-page {
  margin-top: 20px;

  .cart {
    background: #fff;
    color: #666;

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }

      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }

  // 商品訊息
  .goods {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      height: 100px;
    }

    >div {
      width: 280px;
      font-size: 16px;
      padding-left: 10px;
    }
  }

  // 單價、數量、小計、操作
  .tc {
    text-align: center;

    a {
      color: $xtxColor;
    }
  }

  // 如果購物車為空
  .cart-none {
    text-align: center;
    padding: 120px 0;
    background: #fff;

    p {
      color: #999;
      padding: 20px 0;
    }
  }

  // 操作欄
  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;

    .batch {
      a {
        margin-left: 20px;
      }
    }

    .red {
      font-size: 18px;
      margin-right: 20px;
      font-weight: bold;
    }
  }
}
</style>
