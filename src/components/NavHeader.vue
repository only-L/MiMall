<template>
  <div class="header">
    <!-- 灰色头部 -->
    <div class="nav-topbar">
      <div class="container">
        <!-- 左边部分 -->
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MIUI</a>
          <a href="javascript:;">IoT</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">金融</a>
          <a href="javascript:;">小爱开放平台</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <!-- 右边部分 -->
        <div class="topbar-user">
          <a href="javascript:;">登录</a>
          <a href="javascript:;">注册</a>
          <a href="javascript:;" class="my-cart">
            <span class="icon-cart"></span>购物车
          </a>
        </div>
      </div>
    </div>
    <!-- 灰色头部--end -->

    <div class="nav-header"></div>
  </div>
</template>

<script>
export default {
  name: 'nav-header'
}
</script>

<style lang="scss">
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333333;

    .container {
      width: 1226px;
      margin-left: auto;
      margin-right: auto;
      // 两边对齐
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }
      .my-cart {
        width: 110px;
        background-color: #ff6600;
        text-align: center;
        color: #ffffff;
        .icon-cart {
          display: inline-block;
          width: 16px;
          height: 12px;
          background: url('/imgs/icon-cart-checked.png') no-repeat center;
          // 把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域
          background-size: contain;
          margin-right: 4px;
        }
      }
    }
  }
}
</style>
