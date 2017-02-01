
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

export default {
  fetchThreads,
  fetchThread
}
