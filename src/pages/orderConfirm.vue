<template>
  <div class="order-confirm">
    <order-header title="订单确认">
      <template v-slot:tip>
        <span>请认真填写信息</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <!-- 收货地址部分 -->
          <div class="item-address">
            <h2 class="item-title">收货地址</h2>
            <!-- 用户信息 -->
            <div class="addr-list clearfix">
              <div
                class="addr-info"
                :class="{checked:index==checkIndex}"
                @click="checkIndex=index"
                v-for="(item,index) in list"
                :key="index"
              >
                <h2>{{item.receiverName}}</h2>
                <div class="phone">{{item.receiverMobile}}</div>
                <div
                  class="street"
                >{{item.receiverProvince+' '+item.receiverCity+' '+item.receiverDistrict+' '+item.receiverAddress}}</div>
                <div class="action">
                  <a href="javascript:;" class="fl" @click="delAddress(item)">
                    <i class="el-icon-delete"></i>
                  </a>
                  <a href="javascript:;" class="fr" @click="editAddressModal(item)">
                    <i class="el-icon-edit"></i>
                  </a>
                </div>
              </div>
              <div class="addr-add" @click="openAddressModal">
                <div class="icon-add"></div>
                <div>添加新地址</div>
              </div>
            </div>
            <!-- 用户信息end -->
          </div>
          <!-- 收货地址部分end -->
          <!-- 商品列表 -->
          <div class="item-good">
            <h2>商品</h2>
            <ul>
              <li v-for="(item,index) in cartList" :key="index">
                <div class="good-name">
                  <img v-lazy="item.productMainImage" alt />
                  <span>{{item.productName+' '+item.productSubtitle}}小米8 6GB 全息幻彩紫 64GB</span>
                </div>
                <div class="good-price">{{item.productPrice+'元'+' '+item.productStatus}}元 x2</div>
                <div class="good-total">{{item.productTotalPrice+'元'}}</div>
              </li>
            </ul>
          </div>
          <!-- 商品列表end -->
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>
          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:;">电子发票</a>
            <a href="javascript:;">个人</a>
          </div>
          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{count}}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
            <div class="item">
              <span class="item-name">优惠活动：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
          </div>
          <div class="btn-group">
            <a href="/#/cart" class="btn btn-default btn-large">返回购物车</a>
            <a href="javascript:;" class="btn btn-large" @click="orderSubmit()">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 头部 设置按钮 是否显示 关闭 -->
    <modal
      title="新增确认"
      btnType="1"
      :showModal="showEditModal"
      @cancel="showEditModal=false"
      @submit="submitAddress"
    >
      <template v-slot:body>
        <div class="edit-wrap">
          <div class="item">
            <input type="text" class="input" placeholder="姓名" v-model="checkedItem.receiverName" />
            <input type="text" class="input" placeholder="手机号" v-model="checkedItem.receiverMobile" />
          </div>
          <div class="item">
            <select name="province" v-model="checkedItem.receiverProvince">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">河北</option>
            </select>
            <select name="city" v-model="checkedItem.receiverCity">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">石家庄</option>
            </select>
            <select name="district" v-model="checkedItem.receiverDistrict">
              <option value="北京">昌平区</option>
              <option value="天津">海淀区</option>
              <option value="河北">东城区</option>
              <option value="天津">西城区</option>
              <option value="河北">顺义区</option>
              <option value="天津">房山区</option>
            </select>
          </div>
          <div class="item">
            <textarea name="street" v-model="checkedItem.receiverAddress"></textarea>
          </div>
          <div class="item">
            <input type="text" class="input" placeholder="邮编" v-model="checkedItem.receiverZip" />
          </div>
        </div>
      </template>
    </modal>
    <modal
      title="删除确认"
      btnType="1"
      :showModal="showDelModal"
      @cancel="showDelModal=false"
      @submit="submitAddress"
    >
      <template v-slot:body>
        <p>您确认要删除此地址吗？</p>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from './../components/Modal'
import OrderHeader from './../components/OrderHeader'

export default {
  name: 'order-confirm',
  data() {
    return {
      list: [], // 收货地址列表
      cartList: [], // 购物车中需要结算的商品列表
      cartTotalPrice: 0, // 商品总金额
      count: 0, // 商品结算数量
      checkedItem: {}, // 选中的商品对象
      userAction: '', // 用户行为 0：新增 1：编辑 2：删除
      showDelModal: false, // 是否显示删除弹框
      showEditModal: false, // 是否显示新增或者编辑弹框
      checkIndex: 0 // 收货地址的索引
    }
  },
  components: {
    OrderHeader,
    Modal
  },
  mounted() {
    this.getAddressList()
    this.getCartList()
  },
  methods: {
    // 获取收货地址
    getAddressList() {
      this.axios.get('/shippings').then(res => {
        this.list = res.list
      })
    },
    // 打开新增地址弹框
    openAddressModal() {
      this.userAction = 0
      this.checkedItem = {}
      this.showEditModal = true
    },
    // 打开编辑地址弹框
    editAddressModal(item) {
      this.userAction = 1
      this.checkedItem = item
      this.showEditModal = true
    },
    // 删除
    delAddress(item) {
      // 获取需要被删除的数据
      this.checkedItem = item
      // 值设置为2表示需要删除
      this.userAction = 2
      this.showDelModal = true
    },
    // 地址删除、编辑、新增功能
    submitAddress() {
      let { checkedItem, userAction } = this
      // 请求方法，请地址,需要传递的参数
      let method
      let url
      let params = {}
      // 新增
      if (userAction === 0) {
        method = 'post'
        url = '/shippings'
      } else if (userAction === 1) {
        // 编辑
        method = 'put'
        url = `/shippings/${checkedItem.id}`
      } else {
        // 删除
        method = 'delete'
        url = `/shippings/${checkedItem.id}`
      }
      if (userAction === 0 || userAction === 1) {
        let {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip
        } = checkedItem
        // 值为''，等于false
        let errMsg = ''
        // 判断填入值是否正确
        if (!receiverName) {
          errMsg = '请输入收货人名称'
        } else if (!receiverMobile || !/\d{11}/.test(receiverMobile)) {
          errMsg = '请输入正确格式的手机号'
        } else if (!receiverProvince) {
          errMsg = '请选择省份'
        } else if (!receiverCity) {
          errMsg = '请选择对应的城市'
        } else if (!receiverAddress || !receiverDistrict) {
          errMsg = '请输入收货地址'
        } else if (!/\d{6}/.test(receiverZip)) {
          errMsg = '请输入六位邮编'
        }
        // 输出错误信息
        if (errMsg) {
          this.$message.error(errMsg)
          return
        }
        params = {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip
        }
      }
      // this.axios.get() 等同
      this.axios[method](url, params).then(() => {
        this.closeModal()
        this.getAddressList()
        this.$message.success('操作成功')
      })
    },
    // 控制关闭添加弹框和关闭删除弹框
    closeModal() {
      this.checkedItem = {}
      this.userAction = ''
      this.showDelModal = false
      this.showEditModal = false
    },
    // 获取需要结算的商品
    getCartList() {
      this.axios.get('/carts').then(res => {
        // 获取购物策划所有的商品数据
        let list = res.cartProductVoList
        // 获取商品总金额
        this.cartTotalPrice = res.cartTotalPrice
        // 获取被选中的商品
        this.cartList = list.filter(item => item.productSelected)
        // 商品总件数
        this.cartList.map(item => {
          this.count += item.quantity
        })
      })
    },
    // 订单提交
    orderSubmit() {
      let item = this.list[this.checkIndex]
      // 如果没有这个地址，为undefined(false)
      if (!item) {
        this.$message.error('请选择一个收货地址')
        return
      }
      // 根据购物地址的ID，创建订单号(shippingId)
      this.axios
        .post('/orders', {
          shippingId: item.id
        })
        .then(res => {
          this.$router.push({
            path: '/order/pay',
            // 传递该用户的订单号
            query: {
              orderNo: res.orderNo
            }
          })
        })
    }
  }
}
</script>

<style lang="scss">
// 订单确认
.order-confirm {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 84px;
    .order-box {
      background-color: #ffffff;
      padding: 38px 82px 90px 63px;
      .item-address {
        .item-title {
          margin-bottom: 21px;
        }
        h2 {
          font-size: 20px;
          color: #333333;
          font-weight: 200;
        }
        .addr-list {
          margin-bottom: 49px;
          .addr-info,
          .addr-add {
            box-sizing: border-box;
            float: left;
            width: 271px;
            height: 180px;
            border: 1px solid #e5e5e5;
            margin: 0 80px 15px 0;
            padding: 15px 24px;
            font-size: 14px;
            color: #757575;
          }
          .addr-info {
            cursor: pointer;
            h2 {
              height: 27px;
              font-size: 18px;
              font-weight: 300;
              color: #333;
              margin-bottom: 10px;
            }
            .street {
              height: 50px;
            }
            .action {
              height: 50px;
              line-height: 50px;
              a {
                .el-icon-edit,
                .el-icon-delete {
                  cursor: pointer;
                  font-size: 25px;
                  color: #666666;
                  vertical-align: middle;
                  &:hover {
                    color: #ff6700;
                  }
                }
              }
            }
            &.checked {
              border: 1px solid #ff6700;
            }
          }
          .addr-add {
            text-align: center;
            color: #999999;
            cursor: pointer;
            .icon-add {
              height: 30px;
              width: 30px;
              border-radius: 15px;
              background: url('/imgs/icon-add.png') #e0e0e0 no-repeat center;
              background-size: 14px;
              margin: 0 auto;
              margin-top: 45px;
              margin-bottom: 10px;
            }
          }
        }
      }
      .item-good {
        margin-top: 34px;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 12px;
        h2 {
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 5px;
        }
        li {
          display: flex;
          align-items: center;
          height: 40px;
          line-height: 40px;
          margin-top: 10px;
          font-size: 16px;
          color: #333333;
          .good-name {
            flex: 5;
            img {
              width: 30px;
              height: 30px;
              vertical-align: middle;
            }
          }
          .good-price {
            flex: 2;
          }
          .good-total {
            flex: 1;
            color: #ff6600;
          }
        }
      }
      .item-shipping,
      .item-invoice {
        margin-top: 31px;
        line-height: 20px;
        h2 {
          display: inline-block;
          margin-right: 71px;
          font-size: 20px;
          width: 80px;
        }
        span,
        a {
          font-size: 16px;
          color: #ff6700;
          margin-right: 23px;
        }
      }
      .detail {
        padding: 50px 44px 33px 0;
        border-bottom: 1px solid #f5f5f5;
        text-align: right;
        font-size: 16px;
        color: #666666;
        .item-val {
          color: #ff6700;
        }
        .item {
          line-height: 15px;
          margin-bottom: 12px;
        }
        .item-val {
          display: inline-block;
          width: 130px;
        }
        .item-total {
          .item-val {
            font-size: 28px;
          }
        }
      }
      .btn-group {
        margin-top: 37px;
        text-align: right;
      }
    }
  }
  .edit-wrap {
    font-size: 14px;
    .item {
      margin-bottom: 15px;
      .input {
        display: inline-block;
        width: 283px;
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        border: 1px solid #e5e5e5;
        & + .input {
          margin-left: 14px;
        }
      }
      select {
        height: 40px;
        line-height: 40px;
        border: 1px solid #e5e5e5;
        margin-right: 15px;
      }
      textarea {
        width: 100%;
        padding: 13px 15px;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
        max-width: 100%;
        max-height: 62px;
      }
    }
  }
}
</style>
