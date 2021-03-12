import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    type: '',
    name: '',
    squad: '',
    no: '',
  },
  getters: {},
  mutations: {
    setType(state, type) {
      state.type = type
    },
    setInfo(state, info) {
      state.name = info.name
      state.squad = info.squad
      state.no = info.no
    },
  },
  actions: {},
  modules: {}
})
