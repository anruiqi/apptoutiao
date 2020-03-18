<template>
 <div class='container'>
    <!-- 导航 显示返回箭头-->
    <van-nav-bar title='登录'  left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 登录布局 -->
    <!-- 外层需要用cell-group组件来包裹提供 边框 -->
    <van-cell-group>
          <!-- 登录手机号 -->
          <van-field @blur="checkMobile" :error-message="errorMessage.mobile" v-model.trim="loginForm.mobile" label="手机号"  placeholder="请输入手机号"></van-field>
          <!-- 验证码 -->
          <van-field @blur="checkCode" :error-message="errorMessage.code"  v-model.trim="loginForm.code" label="验证码"  placeholder="请输入验证码">
              <!-- 插槽内容 -->
              <van-button slot="button" size="small" type="primary">发送验证码</van-button>
          </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class='login-box'>
      <van-button @click="login" type="info" round size="small" block>登录</van-button>
    </div>
 </div>
</template>

<script>
// 引入 login方法
// import * as user from '@/api/user'
// user.login
import { login } from '@/api/user'
// 辅助函数 把mutations方法映射到methods方法中
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      // 表单数据
      loginForm: {
        // 手机号
        mobile: '13911111111',
        // 验证码
        code: '246810'
      },
      // 此对象专门放置消息
      errorMessage: {
        // 手机的错误消息
        mobile: '',
        // 验证码的错误消息
        code: ''
      }
    }
  },
  methods: {
    ...mapMutations(['updateUser']),
    // 定义检查手机号方法
    checkMobile () {
    //  获取手机号 判断 是否为空  满足手机号的格式
      if (!this.loginForm.mobile) {
        // 表示为空
        this.errorMessage.mobile = '手机号不能为空'
        return false
      }
      // 第二轮 手机号格式
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        // 如果手机号不满足正则
        this.errorMessage.mobile = '手机号格式不正确'
        return false
      }
      // 如果到了这个位置说明校验通过
      this.errorMessage.mobile = ''
      return true
    },
    // 检查验证码
    checkCode () {
      if (!this.loginForm.code) {
        this.errorMessage.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errorMessage.code = '验证码必须为6位数字'
        return false
      }
      this.errorMessage.code = ''
      return true
    },
    // 登录校验
    async login () {
      //  校验手机号和验证码
      if (this.checkMobile() && this.checkCode()) {
        // 如果两个检查都是true 就表示通过了校验
        try {
          const result = await login(this.loginForm)
          this.updateUser({ user: result })
          const { redirectUrl } = this.$route.query
          // redirectUrl有值的话 跳到该地址 没值的话 跳到 主页
          this.$router.push(redirectUrl || '/')
        } catch (error) {
          // 提示消息 提示用户登录失败
          this.$notify({ message: '用户名或者验证码错误', duration: 800 })
        }
      }
    }
  }
}
</script>

<style>
.login-box {
  padding: 20px
}
</style>
