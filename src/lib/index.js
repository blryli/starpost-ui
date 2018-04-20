import Img from './img/index.js'
import ImgContent from './img-content/index.js'
import Dialog from './dialog/index.js'
import Menu from './menu/index.js'
import MenuGroup from './menu-group/index.js'
import Amap from './amap/index.js'
import Transfer from './transfer/index.js'
import CheckBox from './checkbox/index.js'
import CheckButton from './checkbox-button/index.js'
import CheckboxGroup from './checkbox-group/index.js'
import CollapseTransition from './collapse-transition/index.js'

const components = [
  Img,
  ImgContent,
  Dialog,
  Menu,
  MenuGroup,
  Amap,
  Transfer,
  CheckBox,
  CheckButton,
  CheckboxGroup,
  CollapseTransition
]

const starpost = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });

  Vue.prototype.spMuneSetId = function (menus, id) {
    for (let i = 0; i < menus.length; i++) {
      id ? this.$set(menus[i], "uid", id + "-" + (i + 1)) : this.$set(menus[i], "uid", '' + parseInt(i + 1));
      if (menus[i].url && menus[i].children) {
        this.$set(menus[i], "checked", false);
        this.$set(menus[i], "configs", menus[i].children);
        menus[i].children = [];
      }
      menus[i].children && this.spMuneSetId(menus[i].children, menus[i].uid);
    }
  }
  //菜单组件初始化
  Vue.prototype.spMuneInit = function (menus, id) {
    //菜单设置ID
    this.spMuneSetId(menus, id);
    //激活菜单展开  高亮
    if (this.selectId && sessionStorage.selectId && menus) {
      this.selectId = sessionStorage.selectId
      let activeArr = sessionStorage.selectId.split('-'),
        this_menu;
      for (let i = 0; i < activeArr.length - 1; i++) {
        if (this_menu) {
          this_menu.children[activeArr[i] - 1].active = true;
          this_menu = this_menu.children[activeArr[i] - 1];
        } else {
          menus[activeArr[i] - 1].active = true
          this_menu = menus[activeArr[i] - 1];
        }
      }
    }
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  starpost(window.Vue);
}

export default starpost
