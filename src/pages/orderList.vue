<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order" v-for="(order,index) in list" :key="index">
            <!-- 头部 -->
            <div class="order-title clearfix">
              <div class="item-info fl">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号: {{order.orderNo}}
                <span>|</span>
                在线支付
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <!-- 内容 -->
            <div class="order-content">
              <div class="good-box">
                <div class="good-list" v-for="(item,i) in order.orderItemVoList" :key="i">
                  <div class="good-img">
                    <img :src="item.productImage" alt />
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.currentUnitPrice + ' X ' + item.quantity}}</div>
                  </div>
                </div>
              </div>
              <div class="good-state" v-if="order.status === 20">
                <a href="javascript:;">{{order.statusDesc}}</a>
              </div>
              <div class="good-state" v-if="order.status !== 20">
                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}} ></a>
              </div>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            v-if="!loading&&list.length!==0"
            class="pagination"
            background
            layout="prev, pager, next"
            :pageSize="pageSize"
            :total="total"
            @current-change="handleChange"
          ></el-pagination>
          <no-data v-if="!loading&&list.length===0"></no-data>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import Loading from './../components/Loading'
import NoData from './../components/NoData'
import { Pagination } from 'element-ui'
export default {
  name: 'order-list',
  components: {
    OrderHeader,
    Loading,
    NoData,
    [Pagination.name]: Pagination
  },
  data() {
    return {
      loading: false,
      list: [],
      pageSize: 10,
      pageNum: 1,
      total: 0
    }
  },
  mounted() {
    this.getOrderList()
  },
  methods: {
    getOrderList() {
      this.loading = true
      this.axios
        .get('/orders', {
          params: {
            pageSize: 10,
            pageNum: this.pageNum
          }
        })
        .then(res => {
          // this.list = this.list.concat(res.list)
          this.loading = false
          // this.list = [] || res.list
          this.list = res.list
          this.total = res.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 如果没有付款，可以跳转到支付页面
    goPay(orderNo) {
      // 三种路由跳转方式
      // this.$router.push('/order/pay')
      /* this.$router.push({
          name:'order-pay',
          query:{
            orderNo
          }
        }) */
      this.$router.push({
        path: '/order/pay',
        // 传递该用户的订单号
        query: {
          orderNo: orderNo
        }
      })
    },
    // 第一种方法：分页器
    handleChange(pageNum) {
      this.pageNum = pageNum
      this.getOrderList()
    }
  }
}
</script>

<style lang="scss">
// 订单页面
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order {
        @include border();
        background-color: $colorG;
        margin-bottom: 30px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          @include height(74px);
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .item-money {
            .money {
              font-size: 26px;
              color: $colorB;
            }
          }
        }
        .order-content {
          background-color: #ffffff;
          padding: 0 43px;
          display: flex;
          justify-content: space-between;
          width: 90%;
          .good-box {
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
        }
        .good-state {
          @include height(145px);
          font-size: 26px;
          color: $colorA;
          a {
            color: $colorA;
          }
        }
      }
      .pagination {
        text-align: right;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ff6600;
      }
    }
  }
}
</style>
