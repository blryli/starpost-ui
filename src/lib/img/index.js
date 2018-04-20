import Img from './img.vue';

/* istanbul ignore next */
Img.install = function(Vue) {
  Vue.component(Img.name, Img);
};

export default Img;