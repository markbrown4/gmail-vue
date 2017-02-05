
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    threads: [],
    selectedThreadIds: [],
    thread: null,
    flashes: [],
    query: '',
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
    THREADS_SELECT_THREAD: (state, id) => {
      const index = state.selectedThreadIds.indexOf(id)
      if (index > -1) {
        state.selectedThreadIds.splice(index, 1)
      } else {
        state.selectedThreadIds.push(id)
      }
    },
    THREADS_SELECT_ALL: (state) => {
      state.selectedThreadIds = state.threads.map(t => t.id)
    },
    THREADS_SELECT_NONE: (state) => {
      state.selectedThreadIds = []
    },
    THREADS_SELECT_READ: (state) => {
      state.selectedThreadIds = state.threads.filter(t => t.unread).map(t => t.id)
    },
    THREADS_SELECT_UNREAD: (state) => {
      state.selectedThreadIds = state.threads.filter(t => !t.unread).map(t => t.id)
    },
    THREAD_FETCHING: (state) => {
      state.thread = null
    },
    THREAD_FETCHED: (state, thread) => {
      state.thread = thread
    },
    SEARCH_QUERY: (state, query) => {
      state.query = query
    },
    FLASH_SHOW: (state, message) => {
      state.flashes.push(message)
    },
    FLASH_HIDE: (state, message) => {
      const index = state.flashes.indexOf(message)
      if (index > -1) {
        state.flashes.splice(message, 1)
      }
    }
  },
  actions
})

export default store
