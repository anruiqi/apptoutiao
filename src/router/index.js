import Vue from 'vue'
import Router from 'vue-router'

const Layout = () => import('@/views/layout') // 布局组件
const Home = () => import('@/views/home') // 主页组件
const Question = () => import('@/views/question') // 问答组件
const Video = () => import('@/views/video') // 视频组件
const User = () => import('@/views/user') // 个人中心
const Profile = () => import('@/views/user/profile') // 编辑资料
const Chat = () => import('@/views/user/chat') // 小智同学
const Login = () => import('@/views/login') // 登录组件
const Article = () => import('@/views/article') // 文章详情
const Search = () => import('@/views/search') // 搜索中心
const SearchResult = () => import('@/views/search/result') // 搜索结果
Vue.use(Router)
// 一级路由
const routes = [
  { // 一级路由
    path: '/',
    name: 'home',
    component: Layout,
    children: [{
      path: '/',
      // 二级路由 首页
      component: Home
    },
    { // 二级路由 问答组件
      path: '/question',
      component: Question
    },
    { // 二级路由 视频组件
      path: '/video',
      component: Video
    },
    { // 二级路由 个人中心
      path: '/user',
      component: User
    }]
  },
  { // 编辑资料
    path: '/user/profile',
    component: Profile
  },
  { // 小智同学
    path: '/user/chat',
    component: Chat
  },
  { // 登录组件
    path: '/login',
    component: Login
  },
  { // 文章详情
    path: '/article',
    component: Article
  },
  { // 搜索中心
    path: '/search',
    component: Search
  },
  { // 搜索结果
    path: '/search/result',
    component: SearchResult
  }
]

const router = new Router({
  routes
})

export default router
