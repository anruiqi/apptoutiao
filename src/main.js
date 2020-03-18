import Vue from 'vue'
import App from './App.vue'
import '@/permission'
import plugin from '@/utils/plugin'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.less'
import '@/styles/index.less'
import 'amfe-flexible'
// 全局注册
Vue.use(Vant)
// 注册组件需要放置在Vue.use(vant) 之后 因为我们要在 plugin中用vant的内置函数,必须等到vant注册完
Vue.use(plugin)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
