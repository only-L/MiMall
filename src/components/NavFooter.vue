<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt />
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href>小米商城<span>|</span></a>
      <a href>MIUI<span>|</span></a>
      <a href>米家<span>|</span></a>
      <a href>米聊<span>|</span></a>
      <a href>多看<span>|</span></a>
      <a href>游戏</a>
    </div>
    <div
      class="copyright"
    >© mi.com 京ICP证110507号 京ICP备10046444号 京公网安备11010802020134号 京网文[2017]1530-131号</div>
  </div>
</template>

<script>
export default {
  name: 'nav-footer'
}
</script>

<style lang="scss">
@import './../assets/scss/config.scss';
.footer {
  height: 234px;
  border-top: 4px solid $colorA;
  font-size: $fontI;
  background-color: #333333;
  color: #999999;
  text-align: center;
  .footer-logo{
    margin-top: 46px;
    margin-bottom: 13px;
    img{
      height: 36px;
      width: 53px;
    }
  }
  .footer-link{
    margin-top: 31px;
    a{
      color: #999999;
      span{
        margin: 0 10px;
      }
    }
  }
  .copyright{
    margin-top: 13px;
  }
}
</style>
