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
      this.axios.get('/user').then((res = {}) => {
        this.$store.dispatch('saveUserName', res.username)
      })
    },
    getCartCount() {
      this.axios.get('/carts/products/sum').then(res => {
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
