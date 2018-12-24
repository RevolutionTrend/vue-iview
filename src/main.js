import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './vuex/store';

import 'iview/dist/styles/iview.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
