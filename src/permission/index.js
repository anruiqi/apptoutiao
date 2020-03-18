/****
 *  在此文件中做 导航守卫
 * *****/
import router from '@/router' // 引入路由实例
import store from '@/store' // 引入store对象
// 前置守卫
//  每当路由发生变化时 前置守卫就会执行
router.beforeEach(function (to, from, next) {
//   需要判断你的请求地址 和你的token
// 如果是 /user为起始 说明 需要进行token的判断
  if (to.path.startsWith('/user') && !store.state.user.token) {
    //   需要拦截请求 让它去登录
    next({
      // 要跳转的地址
      path: '/login',
      query: {
        redirectUrl: to.fullPath
      }
    })
  } else {
    // 直接放行
    next()
  }
})
