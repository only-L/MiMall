<template>
  <div class="ali-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <loading v-if="loading"></loading>
    <div class="form" v-html="content"></div>
  </div>
</template>

<script>
import Loading from './../components/Loading'
import OrderHeader from './../components/OrderHeader'

export default {
  name: 'alipay',
  components: {
    OrderHeader,
    Loading
  },
  data() {
    return {
      orderId: this.$route.query.orderId,
      // 支付宝http地址
      content: '',
      // 控制加载组件是否显示
      loading: true
    }
  },
  mounted() {
    this.paySubmit()
  },
  methods: {
    // 支付宝支付
    paySubmit() {
      this.axios
        .post('/pay', {
          orderId: this.orderId,
          orderName: 'Vue小米商城', // 扫码支付时订单名称
          amount: 0.01, // 单位元
          payType: 1 // 1支付宝，2微信
        })
        .then(res => {
          this.content = res.content
          // 延迟0.1s,提交表单
          setTimeout(() => {
            document.forms[0].submit()
          }, 100)
        })
    }
  }
}
</script>

<style lang="scss">
// 支付宝中转页面
</style>
