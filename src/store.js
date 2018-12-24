import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapsed: false
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapsed = !state.isCollapsed;
    }
  },
  actions: {

  }
})
