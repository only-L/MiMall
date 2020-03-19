<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {}
  },
  mounted() {
    this.getUser()
    this.getCartCount()
  },
  methods: {
    // 登录后获取username
    getUser() {
      // res={},未登录时为空undefined,避免报错
      this.axios.get('/user').then((res = {}) => {
        this.$store.dispatch('saveUserName', res.username)
      })
    },
    getCartCount() {
      // res=0,未登录时为零，避免为空undefined
      this.axios.get('/carts/products/sum').then((res = 0) => {
        this.$store.dispatch('saveCartCount', res)
      })
    }
  }
}
</script>

<style  lang="scss">
/* 全局样式 */
@import './assets/scss/reset';
@import './assets/scss/config';
// 全局按钮样式
@import './assets/scss/button';
</style>
