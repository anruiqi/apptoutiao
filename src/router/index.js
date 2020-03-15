import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 一级路由
const Layout = () => import('@/views/layout')
// 二级路由
const home = () => import('@/views/home')
const question = () => import('@/views/question')
const video = () => import('@/views/video')
const user = () => import('@/views/user')
// 其他一级路由
const chat = () => import('@/views/user/chat')
const login = () => import('@/views/login')
const profile = () => import('@/views/user/profile')
const search = () => import('@/views/search')
const searchresult = () => import('@/views/search/result')
const article = () => import('@/views/article')
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    children: [
      { // 默认二级组件
        path: '',
        component: home
      },
      { // 问答组件
        path: '/question',
        component: question
      },
      { // 视频组件
        path: '/video',
        component: video
      },
      { // 用户组件
        path: '/user',
        component: user
      }
    ]
  },
  { // 小智同学 一级
    path: '/user/chat',
    component: chat
  },
  { // 登录 一级
    path: '/login',
    component: login
  },
  { // 编辑资料 一级
    path: '/user/profile',
    component: profile
  },
  { // 搜索 一级
    path: '/search',
    component: search
  },
  { // 搜索结果 一级
    path: '/search/result',
    component: searchresult
  },
  { // 文章详情 一级
    path: '/article',
    component: article
  }
]

const router = new VueRouter({
  routes
})

export default router
