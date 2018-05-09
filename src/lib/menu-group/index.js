/* jshint esversion: 6 */
import MenuGroup from '../menu/menu-group.vue';

/* istanbul ignore next */
MenuGroup.install = function(Vue) {
  Vue.component(MenuGroup.name, MenuGroup);
};

export default MenuGroup;