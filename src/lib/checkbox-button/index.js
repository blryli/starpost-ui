/* jshint esversion: 6 */
import CheckButton from '../checkbox/checkbox-button.vue';

/* istanbul ignore next */
CheckButton.install = function(Vue) {
  Vue.component(CheckButton.name, CheckButton);
};

export default CheckButton;