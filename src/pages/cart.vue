<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <!-- 购物列表 -->
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1">
              <span class="checkbox" :class="{'checked':allChecked}" @click="toggleAll"></span>全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" :key="index" v-for="(item,index) in list">
              <div class="item-check">
                <span
                  class="checkbox"
                  :class="{'checked':item.productSelected}"
                  @click="updateCart(item)"
                ></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.productMainImage" alt />
                <span>{{item.productName}} {{item.productSubtitle}}</span>
              </div>
              <div class="item-price">{{item.productPrice}}元</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item,'-')">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;" @click="updateCart(item,'+')">+</a>
                </div>
              </div>
              <div class="item-total">{{item.productTotalPrice}}元</div>
              <div class="item-del" @click="delProduct(item)"></div>
            </li>
          </ul>
        </div>
        <!-- 购物部分 -->
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/">继续购物</a>
            共
            <span>{{list.length}}</span>件商品，已选择
            <span>{{checkedNum}}</span>件
          </div>
          <div class="total fr">
            合计：
            <span>{{cartTotalPrice}}</span>元
            <a href="javascript:;" class="btn btn-large" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import NavFooter from './../components/NavFooter'
import ServiceBar from './../components/ServiceBar'
export default {
  name: 'cart',
  components: {
    OrderHeader,
    NavFooter,
    ServiceBar
  },
  data() {
    return {
      list: [], // 商品列表
      allChecked: false, // 是否全选
      cartTotalPrice: 0, // 商品总金额
      checkedNum: 0 // 选中商品数量
    }
  },
  mounted() {
    this.getCartList()
  },
  methods: {
    // 获取购物车列表
    getCartList() {
      this.axios.get('/carts').then(res => {
        this.renderData(res)
      })
    },
    // 更新购物车数量和购物车单选状态
    updateCart(item, type) {
      // 当前需要购买商品的数量
      let quantity = item.quantity
      // 商品选中状态(true false)
      let selected = item.productSelected
      if (type === '-') {
        // 商品至少要保留一件
        if (quantity === 1) {
          return this.$message.warning('商品至少要保留一件')
        }
        // 线自减，再赋值
        --quantity
      } else if (type === '+') {
        // 商品购买数量不能大于库存
        if (quantity > item.productStock) {
          return this.$message.warning('购买数量不能超过库存数量')
        }
        --quantity
      } else {
        selected = !item.productSelected
      }
      this.axios
        .put(`/carts/${item.productId}`, {
          quantity,
          selected
        })
        .then(res => {
          this.renderData(res)
        })
    },
    // 删除购物车商品
    delProduct(item) {
      let productId = item.productId
      this.axios
        .delete(`/carts/${productId}`, {
          productId
        })
        .then(res => {
          this.$message.success('删除成功！')
          this.renderData(res)
        })
    },
    // 控制全选功能
    toggleAll() {
      let url = this.allChecked ? '/carts/unSelectAll' : '/carts/selectAll'
      this.axios.put(url).then(res => {
        this.renderData(res)
      })
    },
    // 公共赋值
    renderData(res) {
      this.list = res.cartProductVoList || []
      // 是否全选
      this.allChecked = res.selectedAll
      // 商品总金额
      this.cartTotalPrice = res.cartTotalPrice
      // 商品选中的数量(使用的过滤器)
      this.checkedNum = this.list.filter(item => item.productSelected).length
    },
    // 购物车下单
    order() {
      // every循环数组，如果所有商品都没有选中，不能提交(返回true false)
      let isCheck = this.list.every(item => !item.productSelected)
      if (isCheck) {
        this.$message.warning('请选择一件商品')
      } else {
        this.$router.push('/order/confirm')
      }
    }
  }
}
</script>

<style lang="scss">
// 购物车
.cart {
  .wrapper {
    background-color: #f5f5f5;
    padding-bottom: 114px;
    padding-top: 30px;
    .cart-box {
      background-color: #fff;
      font-size: 14px;
      color: #999999;
      text-align: center;
      padding: 0 43px;
      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #e5e5e5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked {
          background: url('/imgs/icon-gou.png') #ff6600 no-repeat center;
          background-size: 16px 12px;
          border: 1px solid #ff6600;
        }
      }
      .cart-item-head {
        display: flex;
        height: 79px;
        line-height: 79px;
        .col-1 {
          flex: 1;
        }
        .col-2 {
          flex: 2;
        }
        .col-3 {
          flex: 3;
        }
      }
      .cart-item-list {
        .cart-item {
          display: flex;
          align-items: center;
          height: 125px;
          border-top: 1px solid #e5e5e5;
          font-size: 16px;
          .item-check {
            // flex: 1;
            .checkbox {
              margin: 0 74px 0 29px;
            }
          }
          .item-name {
            flex: 3;
            font-size: 18px;
            color: #333333;
            display: flex;
            align-items: center;
            img {
              width: 80px;
              height: auto;
              vertical-align: middle;
            }
            span {
              margin-left: 30px;
            }
          }
          .item-price {
            flex: 1;
            color: #333333;
          }
          .item-num {
            flex: 2;
            .num-box {
              display: inline-block;
              width: 150px;
              height: 40px;
              line-height: 40px;
              border: 1px solid #e5e5e5;
              font-size: 14px;
              a {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
              span {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
            }
          }
          .item-total {
            flex: 1;
            color: #ff6600;
          }
          .item-del {
            flex: 1;
            width: 14px;
            height: 12px;
            background: url('/imgs/icon-close.png') no-repeat center;
            background-size: contain;
            cursor: pointer;
          }
        }
      }
    }
    .order-wrap {
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      color: #666666;
      .cart-tip {
        a {
          color: #666666;
          margin-right: 37px;
        }
        span {
          color: #ff6600;
        }
      }
      .total {
        font-size: 14px;
        color: #ff6600;
        span {
          font-weight: bold;
          font-size: 24px;
        }
        a {
          margin-left: 31px;
        }
      }
    }
  }
}
</style>
