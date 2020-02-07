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
          <div class="app">
            <a href="javascript:;">下载app</a>
            <div class="active">
              <div class="act-img">
                <img src="/imgs/miCode.png" alt />
              </div>
              <div class="act-app">小米商城APP</div>
            </div>
          </div>
        </div>
        <!-- 右边部分 -->
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;">我的订单</a>
          <a href="javascript:;" class="my-cart" @click="goToCart">
            <span class="icon-cart"></span>购物车
          </a>
        </div>
      </div>
    </div>
    <!-- 灰色头部--end -->

    <!-- 导航菜单 -->
    <div class="nav-header">
      <!-- 容器 -->
      <div class="container">
        <!-- logo -->
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <!-- 菜单 -->
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li :key="index" v-for="(item,index) in phoneList" class="product">
                  <!-- 使用指令后""里面是变量 -->
                  <a :href="'/#/product/'+item.id" target="_blank">
                    <div class="pro-img">
                      <img :src="item.mainImage" :alt="item.name" />
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price|currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
            <div class="children"></div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-1.jpg" alt />
                    </div>
                    <div class="pro-name">小米壁画电视 65英寸</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-2.jpg" alt />
                    </div>
                    <div class="pro-name">小米全面屏电视E55A</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-3.png" alt />
                    </div>
                    <div class="pro-name">小米电视4A 32英寸</div>
                    <div class="pro-price">699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-4.jpg" alt />
                    </div>
                    <div class="pro-name">小米电视4A 55英寸</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-5.jpg" alt />
                    </div>
                    <div class="pro-name">小米电视4A 65英寸</div>
                    <div class="pro-price">2699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-6.png" alt />
                    </div>
                    <div class="pro-name">查看全部</div>
                    <div class="pro-price">查看全部</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 搜索框 -->
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-header',
  data() {
    return {
      // 用户名称
      username: '',
      phoneList: []
    }
  },
  mounted() {
    this.getProductList()
  },
  filters: {
    currency(val) {
      if (!val) return '0.00'
      return '￥' + val.toFixed(2) + '元'
    }
  },
  methods: {
    login() {
      this.$router.push('/login')
    },
    getProductList() {
      this.axios
        .get('products', {
          params: {
            categoryId: '100012'
            // pageSize:6
          }
        })
        .then(res => {
          // Math.max(res.list, 6)
          // 取出6条数据
          if (res.list.length > 6) {
            this.phoneList = res.list.slice(0, 6)
          }
        })
    },
    goToCart() {
      // 路由跳转到指定页面
      this.$router.push('/cart')
    }
  }
}
</script>

<style lang="scss">
@import './../assets/scss/base.scss';
@import './../assets/scss/mixin.scss';
@import './../assets/scss/config.scss';
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333333;
    .container {
      // 两边对齐
      @include flex();
      .app {
        display: inline-block;
        position: relative;
        &:hover {
          a {
            color: #ffff;
          }
          .active {
            height: 148px;
            opacity: 1;
            overflow:visible;
          }
        }
        .active {
          position: absolute;
          top: 39px;
          left: -30px;
          width: 124px;
          background-color: #ffffff;
          box-shadow: 0 1px 5px #aaa;
          z-index: 11;
          font-size: 12px;
          line-height: 12px;
          text-align: center;
          height: 0px;
          opacity: 0;
          overflow: hidden;
          transition: all 0.5s;
          .act-img {
            display: inline-block;
            height: 121px;
            img {
              height: 90px;
              width: 90px;
              margin: 18px 17px 12px;
            }
          }
          .act-app {
            display: block;
          }
        }
        // 绘制三角形
        .active:before {
          content: '';
          position: absolute;
          left: 50%;
          top: -8px;
          width: 0;
          height: 0;
          margin-left: -8px;
          border-width: 0 8px 8px;
          border-style: solid;
          border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #ffffff;
          margin: 0 0 0 -8px;
        }
      }
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
          @include bgImg(16px, 12px, '/imgs/icon-cart-checked.png');
          /* display: inline-block;
          width: 16px;
          height: 12px;
          background: url('/imgs/icon-cart-checked.png') no-repeat center;
          // 把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域
          background-size: contain; */
          margin-right: 4px;
        }
      }
    }
  }
  .nav-header {
    .container {
      height: 112px;
      @include flex();
      position: relative;
      .header-logo {
        display: inline-block;
        width: 55px;
        height: 55px;
        background-color: #ff6600;
        a {
          display: inline-block;
          width: 110px;
          height: 55px;
          // scss伪类选择器
          &:before {
            content: '';
            @include bgImg(55px, 55px, '/imgs/mi-logo.png', 55px);
            /* display: inline-block;
            width: 55px;
            height: 55px;
            background: url('/imgs/mi-logo.png') no-repeat center;
            background-size: 55px; */
            transition: margin 0.2s;
          }
          &:after {
            content: '';
            @include bgImg(55px, 55px, '/imgs/mi-home.png', 55px);
            /* display: inline-block;
            width: 55px;
            height: 55px;
            background: url('/imgs/mi-home.png') no-repeat center;
            background-size: 55px; */
          }
          &:hover:before {
            margin-left: -55px;
            transition: margin 0.2s;
          }
        }
      }
      .header-menu {
        display: inline-block;
        width: 643px;
        padding-left: 209px;
        .item-menu {
          display: inline-block;
          color: #333333;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          span {
            cursor: pointer;
            padding: 0 10px;
          }
          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              opacity: 1;
            }
          }
          .children {
            position: absolute;
            top: 112px;
            left: 0;
            width: 1226px;
            height: 0px;
            opacity: 0;
            background-color: #ffffff;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            z-index: 10;
            overflow: hidden;
            transition: all 0.5s;
            .product {
              position: relative;
              float: left;
              width: 16.6%;
              height: 220px;
              font-size: 12px;
              line-height: 12px;
              text-align: center;
              a {
                display: inline-block;
              }
              .pro-img {
                height: 137px;
                img {
                  width: auto;
                  height: 111px;
                  margin-top: 26px;
                }
              }
              .pro-name {
                font-weight: bold;
                margin-top: 19px;
                margin-bottom: 8px;
                color: $colorB;
              }
              .pro-price {
                color: $colorA;
              }
              &:before {
                content: '';
                position: absolute;
                top: 28px;
                right: 0;
                border-left: 1px solid $colorF;
                height: 99px;
                width: 1px;
              }
              &:last-child:before {
                display: none;
              }
            }
          }
        }
      }
      .header-search {
        width: 319px;
        .wrapper {
          height: 50px;
          border: 1px solid #E0E0E0;
          display: flex;
          align-items: center;
          input {
            border: none;
            // 为input指定宽度和高度
            box-sizing: border-box;
            border-right: 1px solid #E0E0E0;
            width: 264px;
            height: 50px;
            padding: 0 14px;
          }
          a {
            @include bgImg(18px, 18px, '/imgs/icon-search.png');
            /* display: inline-block;
            width: 18px;
            height: 18px;
            background: url('/imgs/icon-search.png') no-repeat center;
            background-size: contain; */
            margin-left: 17px;
          }
        }
      }
    }
  }
}
</style>
