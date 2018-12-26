import Vue from 'vue'
import Vuex from 'vuex';

import { CHANGEMENUCOLLAPSE, MENUCHANGETITLE } from './actions';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapsed: false,
    title: 'Home'
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapsed = !state.isCollapsed;
    },
    changeTitle(state, newTitle) {
      state.title = newTitle;
    }
  },
  actions: {
    [CHANGEMENUCOLLAPSE]({ commit }) {
      commit('collapseMenu');
    },
    [MENUCHANGETITLE]({ commit }, str) {
      commit('changeTitle', str);
    }
  }
});
