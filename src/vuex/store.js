import Vue from 'vue'
import Vuex from 'vuex';

import { CHANGEMENUCOLLAPSE, MENUCHANGETITLE, OPTIONCHANGEPAT } from './actions';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapsed: false,
    title: 'Home',
    path: '/'
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapsed = !state.isCollapsed;
    },
    changeTitle(state, newTitle) {
      state.title = newTitle;
    },
    changePath(state, newPath) {
      state.path = newPath;
    }
  },
  actions: {
    [CHANGEMENUCOLLAPSE]({ commit }) {
      commit('collapseMenu');
    },
    [MENUCHANGETITLE]({ commit }, str) {
      commit('changeTitle', str);
    },
    [OPTIONCHANGEPAT]({ commit }, pathname) {
      commit('changePath', pathname);
    }
  }
});
