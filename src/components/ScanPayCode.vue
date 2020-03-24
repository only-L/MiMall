<template>
  <div class="scan">
    <!-- 遮罩层 -->
    <div class="mask"></div>
    <!-- 内容 -->
    <div class="item-wrap">
      <!-- 左边图片 -->
      <div class="img-scan"></div>
      <div class="img-pay">
        <div class="title">
          微信支付
          <em @click="close"></em>
        </div>
        <div class="qrcode">
          <img :src="img" />
        </div>
        <div class="tip">
          <p>
            请使用
            <span class="theme-color">微信</span>扫一扫
          </p>
          <p>二维码完成支付</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scan-pay-code',
  props: ['img'],
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
.scan {
  position: absolute;
  z-index: 10;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.6;
    background-color: #000000;
  }
  .item-wrap {
    position: fixed;
    width: 670px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    .img-scan {
      @include bgImg(296px, 485px, '/imgs/pay/icon-scan.png');
    }
    .img-pay {
      width: 370px;
      height: 440px;
      background: rgba(255, 255, 255, 1);
      display: inline-block;
      .title {
        position: relative;
        width: 370px;
        height: 60px;
        line-height: 60px;
        background: rgba(245, 245, 245, 1);
        font-size: 20px;
        color: #333333;
        padding: 0 18px;
        box-sizing: border-box;
        em {
          position: absolute;
          top: 24px;
          right: 20px;
          @include bgImg(13px, 13px, '/imgs/icon-close.png');
          cursor: pointer;
        }
      }
      .qrcode {
        text-align: center;
        padding: 44px 0 26px;
        img {
          height: 240px;
          width: 237px;
        }
      }
      .tip {
        text-align: center;
        font-size: 14px;
        color: #333333;
      }
    }
  }
}
</style>
