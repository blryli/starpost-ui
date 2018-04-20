import Vue from 'vue'
import App from './App.vue'
import StarpostUI from './lib/index.js'
import VueAMap from 'vue-amap'

VueAMap.initAMapApiLoader({
  key: '67cbf25aaeeb270f65bf66afaa028cb5',
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation', 'Geocoder']
})
Vue.use(VueAMap)
Vue.use(StarpostUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
