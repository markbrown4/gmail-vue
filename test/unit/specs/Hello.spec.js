
import Vue from 'vue'
import Hello from 'src/components/Hello'

global.describe('Hello.vue', () => {
  global.it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Hello)
    })
    global.expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
