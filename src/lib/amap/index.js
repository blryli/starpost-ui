/* jshint esversion: 6 */
import Amap from './amap.vue';

/* istanbul ignore next */
Amap.install = function(Vue) {
  Vue.component(Amap.name, Amap);
};

export default Amap;