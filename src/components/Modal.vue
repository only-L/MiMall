<template>
  <transition name="slide">
    <div class="modal" v-show="showModal">
      <!-- 遮罩层 -->
      <div class="mask"></div>
      <!-- dialog -->
      <div class="modal-dialog">
        <div class="modal-header">
          <span>{{title}}</span>
          <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
        </div>
        <div class="modal-body">
          <!-- 动态传入 -->
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <!--
                子组件点击后，传递到父组件
                    - 父子传递使用$emit
                    - 调用父组件的@submit
                    - 在父组件定义@submit
          -->
          <a href="javascript:;" class="btn" v-if="btnType==1" @click="$emit('submit')">{{sureText}}</a>
          <a href="javascript:;" class="btn" v-if="btnType==2" >{{cancelText}}</a>
          <div class="btn-group" v-if="btnType==3">
            <a href="javascript:;" class="btn">{{sureText}}</a>
            <a href="javascript:;" class="btn btn-default">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  // props是子组件访问父组件数据的唯一接口
  props: {
    // 弹框类型：小small、中middle、大large、表单form
    modalType: {
      type: String,
      default: 'form'
    },
    // 弹框标题
    title: String,
    // 按钮类型: 1:确定按钮 2：取消按钮 3：确定取消
    btnType: String,
    sureText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showModal: Boolean
  }
}
</script>

<style lang="scss">
@import './../assets/scss/mixin.scss';
@import './../assets/scss/config.scss';
@import './../assets/scss/modal.scss';
</style>
