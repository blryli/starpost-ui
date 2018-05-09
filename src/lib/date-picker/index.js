/* jshint esversion: 6 */
import DatePicker from './date-picker.vue';

/* istanbul ignore next */
DatePicker.install = function(Vue) {
  Vue.component(DatePicker.name, DatePicker);
};

export default DatePicker;