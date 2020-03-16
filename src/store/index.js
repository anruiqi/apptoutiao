import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: auth.getUser
  },
  // 修改state
  mutations: {
    // 修改token
    upladteUser (state, payload) {
      state.user = payload.user
      // 保持vuex和本地储存同步
      auth.setUser(payload.user)
    },
    // 删除token
    delUser (state) {
      state.user = {}
      // 更新缓存数据
      // 删除本地缓存的token
      auth.delUser()
    }
  },
  actions: {
  },
  modules: {
  }
})
