/***********
 请求管理工具
 *
 */
import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'
import router from '@/router'
// 创建一个新实例
const instance = axios.create({
  // 构造函数 可以传入一些配置
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0',
  transformResponse: [function (data) {
    // data就是后端相应传回来的字符串
    return data ? JSONBig.parsse(data) : {}
  }]
})
// token注入 应该在请求之前
instance.interceptors.request.use(
  function (config) {
    // 成功
    // 将token注入 到headers中
    if (store.state.user.token) {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    // 返回值
    return config
  },
  function (error) {
    //   失败
    //   直接返回错误
    return Promise.reject(error)
  })
//   响应拦截器处理返回结果的数据
instance.interceptors.response.use(
  function (response) {
    //   成功
    try {
    //   成功则返回
      return response.data.data
    } catch (error) {
      // 失败
      return response.data
    }
  },
  async function (error) {
    // 如果状态是401的话 就说明to就失效了
    if (error.response && error.response.status === 401) {
      const path = {
        // 地址
        oath: '/login',
        query: {
          // 需要传递的query参数
          redirectUrl: router.currentRoute.fullPath
        }
      }
      if (store.state.user.refresh_token) {
        try {
          const result = await axios({
            method: 'put', // 请求类型
            url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations', // 完成的url地址
            headers: { Authorization: `Bearer ${store.state.user.refresh_token}` } // 在请求头中注入refresh_token
          })
          //   await 后面就是 promise成功执行完成的逻辑
          // 新token
          // 如果成功了 应该更新失效的token
          // 直接更新vuex中的数据
          store.commit('updateUser', {
            //   载荷数据
            user: {
              // token
              token: result.data.data.token, // 最新的token
              refresh_token: store.state.user.refresh_token // 还是原来的refresh_token 14天之后过期
            }
          }) // 提交mutations 更新vuex数据
          //   你之所以会到这个位置 是因为  401, 也就意味着你之前的请求 是错误的
          //  需要把之前错误的请求再次发送出去 用axios 还是 instance呢
          // A =>  B  => C  =>  D
          return instance(error.config) // 相当于 执行之前出现401错误的请求  返回这个请求的目的 是继续执行这个请求执行链下面的内容
        } catch (error) {
          //   如果失败意味着 你尝试去续命 可是续命失败
          // 重新登录 重新登录之前 需要  删除掉 token 因为此时 token失效 refesh_token也失效
          store.commit('delUser')
          // 重新跳到登录页面
          router.push(path)
        }
      } else {
        //   直接跳转到登录
        store.commit('delUser') // 也要删除token  因为token失效了
        router.push(path)
      }
    }
    //   直接返回失败失败
    return Promise.reject(error)
  }
)
export default instance
