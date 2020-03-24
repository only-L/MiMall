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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import Loading from './../components/Loading'
export default {
  name: 'order-list',
  components: {
    OrderHeader,
    Loading
  },
  data() {
    return {
      loading: true
    }
  }
}
</script>

<style lang="scss">
// 订单页面
</style>
