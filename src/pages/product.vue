<template>
  <div class="product">
    <product-param :title="product.name">
      <template v-slot:buy>
        <button class="btn" @click="buy">立即购买</button>
      </template>
    </product-param>
    <!-- 内容 -->
    <div class="content">
      <div class="item-bg">
        <h2>{{product.name}}</h2>
        <h3>{{product.subtitle}}</h3>
        <p>
          <a href id>全球首款双频 GP</a>
          <span>|</span>
          <a href id>骁龙845</a>
          <span>|</span>
          <a href id>AI 变焦双摄</a>
          <span>|</span>
          <a href id>红外人脸识别</a>
        </p>
        <div class="price">
          <span>
            ￥
            <em>{{product.price}}</em>
          </span>
        </div>
      </div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>
      <!-- 轮播图 -->
      <div class="item-swiper">
        <swiper :options="swiperOption">
          <swiper-slide>
            <img src="/imgs/product/gallery-2.png" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-3.png" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-4.png" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-5.jpg" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-6.jpg" alt />
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
      <!-- 轮播图end -->
      <!-- video -->
      <div class="item-video">
        <h2>
          60帧超慢动作摄影
          <br />慢慢回味每一瞬间的精彩
        </h2>
        <p>
          后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！
          <br />更能AI 精准分析视频内容，15个场景智能匹配背景音效。
        </p>
        <div class="video-bg" @click="videoPlay"></div>
        <!-- 弹框视频 -->
        <div class="video-box" v-show="showSlide">
          <!-- 遮罩层 -->
          <div class="overlay"></div>
          <div class="video" :class="showSlide">
            <span class="icon-close" @click="closeVideo">x</span>
            <video src="/imgs/product/video.mp4" controls="controls" id="videoPlay"></video>
          </div>
        </div>
      </div>
      <!-- video-end -->
    </div>
  </div>
</template>

<script>
import ProductParam from '../components/ProductParam'
// swiper轮播图插件
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'product',
  components: {
    swiper,
    swiperSlide,
    ProductParam
  },
  data() {
    return {
      showSlide: '', // 控制动画效果
      product: {}, // 商品信息
      // 所有的参数同 swiper 官方 api 参数
      swiperOption: {
        autoplay: true,
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        // 循环
        loop: true
      }
    }
  },
  mounted() {
    this.getProductInfo()
  },
  methods: {
    // 获取当前id数据
    getProductInfo() {
      let id = this.$route.params.id
      this.axios.get(`/products/${id}`).then(res => {
        this.product = res
        console.log(this.product)
      })
    },
    // 跳转当前商品详情页
    buy() {
      let id = this.$route.params.id
      this.$router.push(`/detail/${id}`)
    },
    // 播放视频
    videoPlay() {
      this.showSlide = 'slideDown'
      var video = document.getElementById('videoPlay')
      video.play()
    },
    // 关闭视频
    closeVideo() {
      var video = document.getElementById('videoPlay')
      video.pause()
      this.showSlide = 'slideUp'
      setTimeout(() => {
        this.showSlide = ''
      }, 600)
    }
  }
}
</script>

<style lang="scss">
// 产品站
@import './../assets/scss/mixin.scss';
.product {
  .content {
    .item-bg {
      background: url('/imgs/product/product-bg-1.png') no-repeat center;
      height: 718px;
      text-align: center;
      h2 {
        font-size: 80px;
        padding-top: 56px;
      }
      h3 {
        font-size: 24px;
        // 字距10px
        letter-spacing: 10px;
      }
      p {
        margin-top: 21px;
        a {
          font-size: 16px;
          color: #333333;
        }
        span {
          margin: 0 15px;
        }
      }
      .price {
        margin-top: 40px;
        span {
          font-size: 30px;
          color: #333333;
          em {
            font-style: normal;
            font-size: 38px;
          }
        }
      }
    }
    .item-bg-2 {
      background: url(/imgs/product/product-bg-2.png) no-repeat center;
      height: 480px;
      background-size: 1226px 397px;
    }
    .item-bg-3 {
      background: url(/imgs/product/product-bg-3.png) no-repeat center;
      height: 638px;
      background-size: cover;
    }
    .item-swiper {
      margin: 36px auto 52px;
      .desc {
        font-size: 18px;
        color: #333333;
        text-align: center;
      }
      img {
        width: 100%;
      }
    }
    .item-video {
      height: 1044px;
      background-color: #070708;
      margin-bottom: 76px;
      color: #ffffff;
      text-align: center;
      h2 {
        font-size: 60px;
        padding: 82px 0 47px;
      }
      p {
        font-size: 24px;
        margin-bottom: 58px;
      }
      .video-bg {
        background: url('/imgs/product/gallery-1.png') no-repeat center;
        width: 1226px;
        height: 540px;
        margin: 0 auto 120px;
        background-size: cover;
        cursor: pointer;
      }
      .video-box {
        .overlay {
          @include position(fixed);
          background-color: #333333;
          opacity: 0.4;
          z-index: 11;
        }
        @keyframes slideDown {
          from {
            top: -50%;
            opacity: 0;
          }
          to {
            top: 50%;
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            top: 50%;
            opacity: 1;
          }
          to {
            top: -50%;
            opacity: 0;
          }
        }
        .video {
          position: fixed;
          top: -50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 11;
          width: 1000px;
          height: 536px;
          opacity: 1;
          &.slideDown {
            animation: slideDown 0.6s linear;
            top: 50%;
          }
          &.slideUp {
            animation: slideUp 0.6s linear;
          }
          video {
            width: 100%;
            height: 100%;
            // 被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框
            object-fit: cover;
            outline: none;
          }
          .icon-close {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 14px;
            cursor: pointer;
            z-index: 11;
            height: 30px;
            width: 30px;
            display: block;
            line-height: 30px;
            border-radius: 15px;
            transition: all 0.2s;
            color: #757575;
            &:hover {
              color: #fff;
              background-color: #e53935;
            }
          }
        }
      }
    }
  }

  button {
    margin-left: 10px;
  }
}
</style>
