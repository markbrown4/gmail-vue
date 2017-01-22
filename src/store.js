import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    threads: [],
    thread: null,
    loading: false,
    page: {
      from: 1,
      to: 1,
      count: 1
    }
  },
  mutations: {
    THREADS_FETCHED: (state, threads) => {
      state.threads = threads
      state.page = {
        ...state.page,
        to: threads.length,
        count: threads.length
      }
    },
    THREAD_FETCHING: (state) => {
      state.thread = null
    },
    THREAD_FETCHED: (state, thread) => {
      state.thread = thread
    }
  },
  actions
})

export default store
