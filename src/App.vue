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
  mounted() {}
}
</script>

<style  lang="scss">
/* 全局样式 */
@import './assets/scss/reset';
@import './assets/scss/config';
// 全局按钮样式
@import './assets/scss/button';
</style>
