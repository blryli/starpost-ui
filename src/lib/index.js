import SpImg from './sp-img/sp-img.vue'
import SpDialog from './sp-dialog.vue'
import spImgContent from './sp-img/sp-img-content.vue'
import SpMenu from './sp-menu/sp-menu.vue'
import SpMenuGroup from './sp-menu/sp-menu-group.vue'
import SpAmap from './sp-amap/sp-amap.vue'
import SpCheckbox from './sp-checkbox/sp-checkbox.vue'
import SpCheckboxButton from './sp-checkbox/sp-checkbox-button.vue'
import SpCheckboxGroup from './sp-checkbox/sp-checkbox-group.vue'
import SpCollapseTransition from './sp-collapse-transition.js'

import VueAMap from 'vue-amap'

const starpost = {
    install(Vue, options) {
        Vue.component(SpImg.name, SpImg)
        Vue.component(SpDialog.name, SpDialog)
        Vue.component(spImgContent.name, spImgContent)
        Vue.component(SpMenu.name, SpMenu)
        Vue.component(SpMenuGroup.name, SpMenuGroup)
        Vue.component(SpAmap.name, SpAmap)
        Vue.component(SpCheckbox.name, SpCheckbox)
        Vue.component(SpCheckboxButton.name, SpCheckboxButton)
        Vue.component(SpCheckboxGroup.name, SpCheckboxGroup)
        Vue.component(SpCollapseTransition.name, SpCollapseTransition)

        VueAMap.initAMapApiLoader({
            key: '67cbf25aaeeb270f65bf66afaa028cb5',
            plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation', 'Geocoder']
        })

        Vue.use(VueAMap)

        //定义方法
        Vue.prototype.checkUserName = (value) => {
            if (/^\w{6,11}$/.test(value)) { //匹配6-20位数字字母下划线
                return true;
            } else {
                return false;
            }
        }
        
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

        //定义指令
        Vue.directive("uname", {
            bind() {
                console.log("bind"); // 只会调用一次
            },
            update(el, binding, vnode) {
                console.log(el);
                console.log(binding);
                console.log(vnode);
            },
        })
        Vue.directive('bgColor', function (el, binding) {
            el.style.backgroundColor = binding.value
        })
    }
}

if (typeof window !== 'undefind' && window.Vue) {
    window.Vue.use(starpost);
}

export default starpost