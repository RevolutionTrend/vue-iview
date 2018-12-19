import Vue from 'vue'
import Router from 'vue-router'

import routes from './views/routes';

Vue.use(Router);

const getRoutes = function (list) {
  let arr = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].hasOwnProperty('children')) {
      arr = [...arr, ...getRoutes(list[i].children)];
    } else {
      arr.push(list[i]);
    }
  }
  return arr;
}

let pageRoutes = getRoutes(routes);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: pageRoutes
})
