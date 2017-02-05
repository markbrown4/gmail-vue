
import _ from 'lodash'

const fetchThreads = ({ commit }) => {
  window.fetch('/static/api/threads/index.json')
    .then(resp => resp.json())
    .then(threads => {
      commit('THREADS_FETCHED', threads)
    })
}

const fetchThread = ({ commit }, id) => {
  commit('THREAD_FETCHING')
  window.fetch(`/static/api/threads/${id}.json`)
    .then(resp => resp.json())
    .then(thread => {
      commit('THREAD_FETCHED', thread)
    })
}

const search = _.debounce(({ commit }, query) => {
  commit('SEARCH_QUERY', query)
}, 300)

const flash = ({ commit }, message, timeout = 3000) => {
  commit('FLASH_SHOW', message)
  setTimeout(() => {
    commit('FLASH_HIDE', message)
  }, timeout)
}

export default {
  fetchThreads,
  fetchThread,
  search,
  flash
}
