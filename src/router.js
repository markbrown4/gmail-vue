import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Threads from './components/threads'
import Thread from './components/thread'

export default new VueRouter({
  routes: [
    { path: '/', name: 'inbox', component: Threads },
    { path: '/threads/:id', name: 'thread', component: Thread }
  ],
  mode: 'history'
})
