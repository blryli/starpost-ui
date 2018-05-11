/* jshint esversion: 6 */
import Img from './img/index.js';
import ImgContent from './img-content/index.js';
import Dialog from './dialog/index.js';
import Menu from './menu/index.js';
import MenuGroup from './menu-group/index.js';
import Amap from './amap/index.js';
import Transfer from './transfer/index.js';
import CheckBox from './checkbox/index.js';
import CheckButton from './checkbox-button/index.js';
import CheckboxGroup from './checkbox-group/index.js';
import CollapseTransition from './collapse-transition/index.js';
import DatePicker from './date-picker/index.js';
import HoverButton from './hover-button/index.js';

const components = [
  Img,
  ImgContent,
  Dialog,
  Menu,
  DatePicker,
  MenuGroup,
  Amap,
  Transfer,
  CheckBox,
  CheckButton,
  CheckboxGroup,
  CollapseTransition,
  HoverButton
];

const starpost = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  starpost(window.Vue);
}

export default starpost;