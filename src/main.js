import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import store from './store'
// import env from './env'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// mock开关
const mock = false
if (mock) {
  // 从上到下执行时再加载，import编译时就会加载再内存中
  require('./mock/api')
}
// 根据前端的跨域方式做调整 /a/b  :  /api/a/b => /a/b
axios.defaults.baseURL = '/api'
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5e391476f35d4261222b2fd6/example'
// 超时时间
axios.defaults.timeout = 8000
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL

// 接口错误拦截
axios.interceptors.response.use(function (response) {
  let res = response.data
  let path = location.hash
  if (res.status === 0) {
    return res.data
  } else if (res.status === 10) {
    if (path !== '#/index') {
      window.location.href = '/#/login'
    }
    Message.warning('亲，请先登录哦！')
    // 抛出错误，未登录时不让代码进栈，避免执行，点击购物车跳转到购物车页面
    return Promise.reject(res)
  } else {
    // alert(res.msg)
    Message.warning(res.msg)
    // 抛出异常，不让数据进入login中
    return Promise.reject(res)
  }
})

Vue.use(VueAxios, axios)
Vue.use(VueCookie)
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})
Vue.config.productionTip = false
// element ui message
Vue.prototype.$message = Message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
