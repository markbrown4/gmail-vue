
import Vue from 'vue'
import VueRouter from 'vue-router'
import Threads from './components/threads'
import Thread from './components/thread'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', name: 'inbox', component: Threads },
    { path: '/threads/:id', name: 'thread', component: Thread }
  ],
  mode: 'history'
})
