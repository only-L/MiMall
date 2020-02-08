<template>
  <div class="index">
    <div class="container">
      <!-- 轮播图盒子 -->
      <div class="swiper-box">
        <!-- 菜单 -->
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item,i) in menuList" v-bind:key="i">
                  <li v-for="(sub,j) in item" v-bind:key="j">
                    <a v-bind:href="sub?'/#/product/'+sub.id:''">
                      <img v-lazy="sub?sub.img:'/imgs/item-box-1.png'" alt />
                      {{sub?sub.name:'小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
              <div class="children">
                <ul v-for="(item,i) in menuList" v-bind:key="i">
                  <li v-for="(sub,j) in item" v-bind:key="j">
                    <a v-bind:href="sub?'/#/product/'+sub.id:''">
                      <img v-lazy="sub?sub.img:'/imgs/item-box-5.webp'" alt />
                      {{sub?sub.name:'小米电视5 55英寸'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 显示器 平板</a>
              <div class="children">
                <ul v-for="(item,i) in menuList" v-bind:key="i">
                  <li v-for="(sub,j) in item" v-bind:key="j">
                    <a v-bind:href="sub?'/#/product/'+sub.id:''">
                      <img v-lazy="sub?sub.img:'/imgs/item-box-6.webp'" alt />
                      {{sub?sub.name:'RedmiBook 13'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
              <div class="children">
                <ul v-for="(item,i) in menuList" v-bind:key="i">
                  <li v-for="(sub,j) in item" v-bind:key="j">
                    <a v-bind:href="sub?'/#/product/'+sub.id:''">
                      <img v-lazy="sub?sub.img:'/imgs/item-box-1.png'" alt />
                      {{sub?sub.name:'小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
              <div class="children">
                <ul v-for="(item,i) in menuList" v-bind:key="i">
                  <li v-for="(sub,j) in item" v-bind:key="j">
                    <a v-bind:href="sub?'/#/product/'+sub.id:''">
                      <img v-lazy="sub?sub.img:'/imgs/item-box-1.png'" alt />
                      {{sub?sub.name:'小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
              <div class="children">
                <ul v-for="(item,i) in menuList" v-bind:key="i">
                  <li v-for="(sub,j) in item" v-bind:key="j">
                    <a v-bind:href="sub?'/#/product/'+sub.id:''">
                      <img v-lazy="sub?sub.img:'/imgs/item-box-1.png'" alt />
                      {{sub?sub.name:'小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
              <div class="children">
                <ul v-for="(item,i) in menuList" v-bind:key="i">
                  <li v-for="(sub,j) in item" v-bind:key="j">
                    <a v-bind:href="sub?'/#/product/'+sub.id:''">
                      <img v-lazy="sub?sub.img:'/imgs/item-box-1.png'" alt />
                      {{sub?sub.name:'小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">健康 儿童</a>
              <div class="children">
                <ul v-for="(item,i) in menuList" v-bind:key="i">
                  <li v-for="(sub,j) in item" v-bind:key="j">
                    <a v-bind:href="sub?'/#/product/'+sub.id:''">
                      <img v-lazy="sub?sub.img:'/imgs/item-box-1.png'" alt />
                      {{sub?sub.name:'小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <!-- 轮播图 -->
        <swiper :options="swiperOption">
          <swiper-slide :key="index" v-for="(item,index) in slideList">
            <a :href="'/#/product/'+item.id">
              <img :src="item.img" />
            </a>
          </swiper-slide>
          <!-- 分页器 -->
          <div class="swiper-pagination" slot="pagination"></div>
          <!-- 导航按钮 -->
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!-- 四个图 -->
      <div class="ads-box">
        <a v-bind:href="'/#/product/'+item.id" v-for="(item,index) in adsList" v-bind:key="index">
          <img v-lazy="item.img" alt />
        </a>
      </div>
      <!-- 一张图 -->
      <div class="banner">
        <a :href="'/#/product/30'">
          <img v-lazy="'/imgs/banner-1.png'" alt />
        </a>
      </div>
    </div>
    <!-- 手机列表 -->
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <!-- 左边大图 -->
          <div class="banner-left">
            <a href="/#/product/35">
              <img v-lazy="'/imgs/mix-alpha.jpg'" alt />
            </a>
          </div>
          <!-- 右边列表 -->
          <div class="list-box">
            <div class="list" :key="index" v-for="(item,index) in phoneList">
              <div class="item" :key="index2" v-for="(item2,index2) in item">
                <span :class="{'new-pro':index2%2==0}">新品</span>
                <!-- 图片 -->
                <div class="item-img">
                  <img v-lazy="item2.mainImage" alt />
                </div>
                <!-- 描述 -->
                <div class="item-info">
                  <h3>{{item2.name}}</h3>
                  <p>{{item2.subtitle}}</p>
                  <p class="price" @click="addCart(item.id)">{{item2.price}}元</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ServiceBar></ServiceBar>
    <Modal
      title="提示！"
      sureText="查看购物车"
      btnType="1"
      modalType="middle"
      :showModal="showModal"
      @submit="goCart"
      @cancel="showModal=false"
    >
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </Modal>
  </div>
</template>

<script>
// 添加组件
import ServiceBar from './../components/ServiceBar'
// 弹出组件
import Modal from './../components/Modal'
// swiper轮播图插件
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'index',
  components: {
    swiper,
    swiperSlide,
    ServiceBar,
    Modal
  },
  data() {
    return {
      // 所有的参数同 swiper 官方 api 参数
      swiperOption: {
        // 自动播放
        autoplay: {
          disableOnInteraction: false,
          delay: 2500
        },
        // 循环
        loop: true,
        // 切换效果
        effect: 'cube',
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        // 上下一页
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      // 轮播图片的数组
      slideList: [
        {
          id: '42',
          img: '/imgs/slider/slide-1.jpg'
        },
        {
          id: '45',
          img: '/imgs/slider/slide-2.jpg'
        },
        {
          id: '46',
          img: '/imgs/slider/slide-3.jpg'
        },
        {
          id: '',
          img: '/imgs/slider/slide-4.jpg'
        },
        {
          id: '',
          img: '/imgs/slider/slide-5.jpg'
        }
      ],
      menuList: [
        [
          {
            id: 30,
            img: '/imgs/item-box-1.png',
            name: '小米CC9'
          },
          {
            id: 31,
            img: '/imgs/item-box-2.png',
            name: '小米8青春版'
          },
          {
            id: 32,
            img: '/imgs/item-box-3.jpg',
            name: 'Redmi k20 Pro'
          },
          {
            id: 33,
            img: '/imgs/item-box-4.jpg',
            name: '移动4G专区'
          }
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      adsList: [
        {
          id: 33,
          img: '/imgs/ads/ads-1.png'
        },
        {
          id: 48,
          img: '/imgs/ads/ads-2.jpg'
        },
        {
          id: 45,
          img: '/imgs/ads/ads-3.png'
        },
        {
          id: 47,
          img: '/imgs/ads/ads-4.jpg'
        }
      ],
      phoneList: [],
      // 弹出层的显示与隐藏
      showModal: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.axios
        .get('products', {
          params: {
            categoryId: '100012',
            pageSize: 8
          }
        })
        .then(res => {
          this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)]
        })
    },
    // 加入购物车
    addCart(id) {
      /* this.axios
        .post('/carts', {
          productId: id,
          selected: true
        })
        .then(() => {})
        .catch(() => {
          this.showModal = true
        }) */
      this.showModal = true
      // eslint-disable-next-line no-useless-return
      return
    },
    // 跳转购物车
    goCart() {
      this.$router.push('/cart')
    }
  }
}
</script>

<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
.index {
  .swiper-box {
    // 左列表
    .nav-menu {
      position: absolute;
      width: 264px;
      height: 451px;
      z-index: 9;
      background: rgba(105, 101, 101, 0.6);
      padding: 26px 0;
      // 使盒子模型不受padding影响
      box-sizing: border-box;
      .menu-wrap {
        // padding: 26px 0;
        .menu-item {
          height: 50px;
          line-height: 50px;
          a {
            font-size: 16px;
            color: #ffffff;
            font-weight: bold;
            padding: 0 0 0 30px;
            position: relative;
            display: block;
            &:after {
              content: '';
              @include bgImg(10px, 15px, '/imgs/icon-arrow.png');
              position: absolute;
              top: 17.5px;
              right: 20px;
              color: #e0e0e0;
            }
          }
          &:hover {
            background-color: #ff6600;
            .children {
              display: block;
            }
          }
          .children {
            display: none;
            width: 962px;
            height: 449px;
            background-color: $colorG;
            position: absolute;
            top: 0;
            left: 264px;
            border: 1px solid #e5e5e5;
            ul {
              display: flex;
              justify-content: space-between;
              height: 75px;
              li {
                height: 75px;
                line-height: 75px;
                flex: 1;
                padding-left: 23px;
                a {
                  color: $colorB;
                  font-size: 14px;
                }
                img {
                  width: 42px;
                  height: 35px;
                  vertical-align: middle;
                  margin-right: 15px;
                }
                &:hover {
                  a {
                    color: $colorA;
                  }
                }
              }
            }
          }
        }
      }
    }
    // 轮播
    .swiper-container {
      height: 451px;
      .swiper-button-prev {
        left: 274px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .ads-box {
    @include flex();
    margin-top: 14px;
    margin-bottom: 31px;
    a {
      width: 296px;
      height: 167px;
    }
  }
  .banner {
    margin-bottom: 50px;
  }
  .product-box {
    background-color: #f5f5f5;
    height: 740px;
    padding: 30px 0 50px 0;
    box-sizing: border-box;
    h2 {
      font-size: $fontF;
      height: 21px;
      line-height: 21px;
      color: $colorB;
      margin-bottom: 20px;
    }
    .wrapper {
      display: flex;
      .banner-left {
        margin-right: 16px;
        img {
          height: 619px;
          width: 224px;
        }
      }
      .list-box {
        .list {
          @include flex();
          width: 986px;
          margin-bottom: 14px;
          &:last-child {
            margin-bottom: 0;
          }
          .item {
            height: 302px;
            width: 236px;
            background-color: #ffffff;
            text-align: center;
            transition: all 0.3s;
            &:hover {
              // transform: translate3d(0, -2px, 0);
              margin-top: -4px;
              box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            }
            span {
              display: inline-block;
              width: 67px;
              height: 24px;
              font-size: 14px;
              line-height: 24px;
              color: $colorG;
              margin-bottom: 8px;
              &.new-pro {
                background-color: #7ecf68;
              }
              &.kill-pro {
                background-color: #e82626;
              }
            }
            .item-img {
              img {
                height: 150px;
                width: auto;
                margin: 0 auto 18px;
              }
            }
            .item-info {
              h3 {
                font-size: 14px;
                height: 13px;
                line-height: 13px;
                margin-bottom: 6px;
                font-weight: bold;
              }
              p {
                color: $colorD;
                line-height: 13px;
                margin: 6px auto 13px;
              }
              .price {
                font-size: 14px;
                color: #f20a0a;
                font-weight: bold;
                margin-bottom: 30px;
                cursor: pointer;
                &:after {
                  @include bgImg(22px, 22px, '/imgs/icon-cart-hover.png');
                  content: ' ';
                  margin-left: 5px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
