/***********
 请求管理工具
 *
 */
import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'
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
  function (error) {
    //   直接返回失败失败
    return Promise.reject(error)
  }
)
export default instance
