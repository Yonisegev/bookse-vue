import Vue from 'vue'
import Vuex from 'vuex'
import bookModule from './modules/book.module'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  state: {
    userMsg: null,
  },
  getters: {
    userMsg(state) {
      return state.userMsg
    },
  },
  mutations: {
    setMsg(state, { msg }) {
      state.userMsg = msg
    },
  },
  actions: {
    setMsg({ commit }, { msg }) {
      commit({ type: 'setMsg', msg })
      setTimeout(() => {
        commit({ type: 'setMsg', msg: null })
      }, 2500)
    },
  },
  modules: {
    bookModule,
  },
})
