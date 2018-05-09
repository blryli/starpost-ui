/* jshint esversion: 6 */
import CheckboxGroup from '../checkbox/checkbox-group.vue';

/* istanbul ignore next */
CheckboxGroup.install = function(Vue) {
  Vue.component(CheckboxGroup.name, CheckboxGroup);
};

export default CheckboxGroup;