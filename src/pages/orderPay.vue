<template>
  <div class="order-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <!-- 内容 -->
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>
                请在
                <span>30分</span>内完成支付, 超时后将取消订单
              </p>
              <p>收货信息：{{addressInfo}}</p>
            </div>
            <div class="order-total">
              <p>
                应付总额：
                <span>{{payment}}</span>元
              </p>
              <p>
                订单详情
                <em
                  class="icon-down"
                  :class="{'up':showDetail}"
                  @click="showDetail=!showDetail"
                ></em>
              </p>
            </div>
          </div>
          <div class="item-detail" v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{orderId}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{addressInfo}}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item,index) in orderDetail" :key="index">
                    <img v-lazy="item.productImage" alt />
                    {{item.productName}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <!-- 支付方式 -->
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" :class="{'checked':payType===1}" @click="paySubmit(1)"></div>
            <div class="pay pay-wechat" :class="{'checked':payType===2}" @click="paySubmit(2)"></div>
          </div>
        </div>
        <!-- 支付方式-end -->
      </div>
    </div>
    <!-- 微信支付时，弹出的弹框 -->
    <scan-pay-code v-if="showPay" @close="closePayModal" :img="payImg"></scan-pay-code>
    <modal
      title="支付确认"
      btnType="3"
      :showModal="showPayModal"
      sureText="查看订单"
      cancelText="未支付"
      @cancel="showPayModal=false"
      @submit="goOrderList"
    >
      <template v-slot:body>
        <p>您确认是否完成支付？</p>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from './../components/Modal'
import ScanPayCode from './../components/ScanPayCode'
import OrderHeader from './../components/OrderHeader'

// 生成二维码插件
import QRcode from 'qrcode'
export default {
  name: 'order-pay',
  components: {
    OrderHeader,
    Modal,
    ScanPayCode
  },
  data() {
    return {
      // 路由传过来的订单号
      orderId: this.$route.query.orderNo,
      addressInfo: '', // 收货人地址
      orderDetail: [], // 订单详情，包含商品列表
      payment: 0, // 订单总金额
      showDetail: false, // 是否显示订单详情
      payType: 1, // 支付类型
      payImg: '', // 微信支付的二维码地址
      showPay: false, // 是否显示微信支付确认弹框
      showPayModal: false, // 是否弹出对话框
      T: '' // //定时器ID
    }
  },
  mounted() {
    this.getOrderDetail()
  },
  methods: {
    // 订单详情
    getOrderDetail() {
      this.axios.get(`/orders/${this.orderId}`).then(res => {
        let item = res.shippingVo
        this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict}`
        this.orderDetail = res.orderItemVoList
        this.payment = res.payment
      })
    },
    // 支付方式
    paySubmit(payType) {
      this.payType = payType
      if (payType === 1) {
        // 重新打开一个页页面(拼接地址，跳转到alipay页面)
        window.open('/#/order/alipay?orderId=' + this.orderId, '_blank')
      } else {
        this.axios
          .post('/pay', {
            orderId: this.orderId,
            orderName: 'Vue小米商城', // 扫码支付时订单名称
            amount: 0.01, // 单位元
            payType: 2 // 1支付宝，2微信
          })
          .then(res => {
            // 生成二维码(把支付链接转换为图片地址)
            QRcode.toDataURL(res.content)
              .then(url => {
                this.showPay = true
                this.payImg = url
                // 一张调用，成功后直接跳转到订单列表页
                this.loopOrderState()
              })
              .catch(() => {
                this.$message.error('微信支付二维码生成失败，请稍后重试')
              })
          })
      }
    },
    // 关闭微信弹框
    closePayModal() {
      this.showPay = false
      this.showPayModal = true
      clearInterval(this.T)
    },
    loopOrderState() {
      this.T = setInterval(() => {
        this.axios.get(`/orders/${this.orderId}`).then(res => {
          // 查看订单状态(20为已支付)   停止定时器
          if (res.status === 20) {
            this.goOrderList()
            clearInterval(this.T)
          }
        })
      }, 1000)
    },
    // 跳转到订单列表页
    goOrderList() {
      this.$router.push('/order/list')
    }
  }
}
</script>

<style lang="scss">
// 订单支付
.order-pay {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 61px;
    .order-wrap {
      padding: 62px 50px;
      background-color: #fff;
      font-size: 14px;
      margin-bottom: 30px;
      .item-order {
        display: flex;
        align-items: center;
        .icon-succ {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: url('/imgs/icon-gou.png') #80c58a no-repeat center;
          background-size: 60px;
          margin-right: 40px;
        }
        .order-info {
          margin-right: 248px;
          h2 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
          }
          p {
            color: #666666;
            span {
              color: #ff6700;
            }
          }
        }
        .order-total {
          & > p:first-child {
            margin-bottom: 30px;
          }
          span {
            font-size: 28px;
            color: #ff6700;
          }
          .icon-down {
            display: inline-block;
            width: 14px;
            height: 10px;
            background: url('/imgs/icon-down.png') no-repeat center;
            background-size: contain;
            margin-left: 9px;
            transition: all 0.5s;
            cursor: pointer;
            &.up {
              transform: rotate(180deg);
            }
          }
          .icon-up {
            transform: rotate(180deg);
          }
        }
      }
      .item-detail {
        border-top: 1px solid #d7d7d7;
        padding-top: 47px;
        padding-left: 130px;
        font-size: 14px;
        margin-top: 45px;
        .item {
          margin-bottom: 19px;
          .detail-title {
            float: left;
            width: 100px;
          }
          .detail-info {
            display: inline-block;
            img {
              width: 30px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .item-pay {
      padding: 26px 50px 72px;
      background-color: #ffffff;
      color: #333333;
      h3 {
        font-size: 20px;
        font-weight: 200;
        color: #333333;
        padding-bottom: 24px;
        border-bottom: 1px solid #d7d7d7;
        margin-bottom: 26px;
      }
      .pay-way {
        font-size: 18px;
        .pay {
          display: inline-block;
          width: 188px;
          height: 64px;
          border: 1px solid #d7d7d7;
          cursor: pointer;
          &:last-child {
            margin-left: 20px;
          }
          &.checked {
            border: 1px solid #ff6700;
          }
        }
        .pay-ali {
          background: url('/imgs/pay/icon-ali.png') no-repeat center;
          background-size: 103px 38px;
          margin-top: 19px;
        }
        .pay-wechat {
          background: url('/imgs/pay/icon-wechat.png') no-repeat center;
          background-size: 103px 38px;
        }
      }
    }
  }
}
</style>
