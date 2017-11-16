import Vue from 'vue'
import App from './App.vue'
import StarpostUI from './lib/index.js'

Vue.use(StarpostUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
