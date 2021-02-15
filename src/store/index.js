import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    squad: '',
    no: '',
  },
  getters: {},
  mutations: {
    setInfo(state, info) {
      state.name = info.name
      state.squad = info.squad
      state.no = info.no
    },
  },
  actions: {},
  modules: {}
})
