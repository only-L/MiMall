<template>
  <div class="order-header">
    <div class="container clearfix">
      <div class="header-logo fl">
        <a href="/#/index"></a>
      </div>
      <div class="title fl">
        <h2>
          {{title}}
          <slot name="tip"></slot>
        </h2>
      </div>
      <div class="username fr">
        <a href="javascript:;">{{username}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'order-header',
  props: {
    title: String
  },
  computed: {
    ...mapState(['username'])
  }
}
</script>

<style lang="scss">
.order-header {
  padding: 30px 0;
  border-bottom: 2px solid #ff6600;
  .container {
    .title,
    .username {
      display: inline-block;
      height: 55px;
      line-height: 55px;
    }
    .title {
      font-size: 28px;
      color: #333333;
      margin-left: 54px;
      h2{
        font-size: 24px;
      }
      span {
        font-size: 14px;
        margin-left: 17px;
        color: #999999;
      }
    }
    .username {
      a {
        color: #666666;
        font-size: 16px;
      }
    }
  }
}
</style>
