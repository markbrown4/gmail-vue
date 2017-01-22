
import Vue from 'vue'

import router from './router'
import filters from './filters'
import store from './store'
import App from './components/app'

new Vue({
  el: '#root',
  template: '<App/>',
  store,
  router,
  filters,
  components: { App }
})
