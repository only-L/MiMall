<template>
  <div class="login">
    <div class="container">
      <a href="/#/index">
        <img src="/imgs/login-logo.png" alt />
      </a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <a href="javascript:;" :class="{checked:tabLoginShow}" @click="tabLogin">帐号登录</a>
            <span class="sep-line">|</span>
            <a href="javascript:;" @click="tabScan" :class="{checked:tabScanShow}">扫码登录</a>
          </h3>

          <div class="tab" v-show="tabLoginShow">
            <div class="input">
              <input type="text" placeholder="请输入帐号" v-model="username" />
            </div>
            <div class="input">
              <input type="password" placeholder="请输入密码" v-model="password" />
            </div>
            <div class="btn-box">
              <a href="javascript:;" class="btn" @click="login">登录</a>
            </div>
            <div class="tips">
              <div class="sms" @click="register">手机短信登录/注册</div>
              <div class="reg">
                立即注册
                <span>|</span>忘记密码？
              </div>
            </div>
          </div>

          <div class="scanBox" v-show="tabScanShow">
            <div class="scan-img">
              <img src="/imgs/miCode.png" alt />
            </div>
            <div class="scan-txt">
              <p>
                使用
                <span class="checked">小米商城APP</span> 扫一扫
              </p>
              <p>小米手机可打开「设置」>「小米帐号」扫码登录</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href>
          简体
          <span>|</span>
        </a>
        <a href>
          繁体
          <span>|</span>
        </a>
        <a href>
          English
          <span>|</span>
        </a>
        <a href>
          常见问题
          <span>|</span>
        </a>
        <a href>隐私政策</a>
      </div>
      <p class="copyright">小米公司版权所有-京ICP备10046444-京公网安备11010802020134号-京ICP证110507号</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      tabLoginShow: true,
      tabScanShow: false,
      username: '',
      password: '',
      userId: ''
    }
  },
  methods: {
    tabLogin() {
      this.tabScanShow = false
      this.tabLoginShow = true
    },
    tabScan() {
      this.tabScanShow = true
      this.tabLoginShow = false
    },
    login() {
      let { username, password } = this
      this.axios
        .post('/user/login', {
          username,
          password
        })
        .then(res => {
          // cookie存放了用户信息
          this.$cookie.set('userId', res.id, { expires: '1M' })
          // vex action 保存用户名
          this.$store.dispatch('saveUserName', res.username)
          this.$router.push('/index')
        })
    },
    register() {
      this.axios
        .post('/user/register', {
          username: 'admin1',
          password: 'admin1',
          email: 'admin1@163.com'
        })
        .then(() => {
          alert('注册成功')
        })
    }
  }
}
</script>
<style lang="scss">
.login {
  & > .container {
    height: 113px;
    img {
      width: auto;
      height: 100%;
    }
  }
  .wrapper {
    background: url('/imgs/login-bg.jpg') no-repeat center;
    .container {
      height: 576px;
      .login-form {
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width: 410px;
        height: 510px;
        background-color: #ffffff;
        position: absolute;
        bottom: 29px;
        right: 0;
        h3 {
          line-height: 23px;
          font-size: 24px;
          text-align: center;
          margin: 40px auto 49px;
          a {
            color: #666;
          }
          .sep-line {
            margin: 0 32px;
          }
        }
        .input {
          display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;
          input {
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
            box-sizing: border-box;
          }
        }
        .btn {
          width: 100%;
          line-height: 50px;
          height: 50px;
          margin-top: 10px;
          font-size: 16px;
        }
        .tips {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          cursor: pointer;
          .sms {
            color: #ff6600;
          }
          .reg {
            color: #999999;
            span {
              margin: 0 7px;
            }
          }
        }
        .scanBox {
          height: 300px;
          .scan-img {
            img {
              height: 180px;
              width: 180px;
              margin: 60px 84px 0;
            }
          }
          .scan-txt {
            p {
              text-align: center;
              font-size: 14px;
              height: 19px;
              line-height: 19px;
              &:first-child {
                margin-top: 10px;
              }
            }
          }
        }
      }
    }
  }
  .footer {
    height: 100px;
    padding-top: 60px;
    color: #999999;
    font-size: 16px;
    text-align: center;
    background-color: #ffffff;
    border-top: none;
    .footer-link {
      margin: 0;
      a {
        color: #999999;
        display: inline-block;
      }
      span {
        margin: 0 10px;
      }
    }
    .copyright {
      margin-top: 13px;
    }
  }
}
.checked {
  color: #ff6600 !important;
}
</style>
