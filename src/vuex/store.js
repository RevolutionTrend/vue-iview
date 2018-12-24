import Vue from 'vue'
import Vuex from 'vuex';

import { CHANGEMENUCOLLAPSE } from './actions';

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
    [CHANGEMENUCOLLAPSE](context) {
      context.commit('collapseMenu');
    }
  }
});
