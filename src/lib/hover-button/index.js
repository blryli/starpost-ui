/* jshint esversion: 6 */
import HoverButton from './hover-button.vue';

/* istanbul ignore next */
HoverButton.install = function(Vue) {
  Vue.component(HoverButton.name, HoverButton);
};

export default HoverButton;