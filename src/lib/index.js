import SpImgDetails from './sp-img/sp-img-details.vue'
import SpMenu from './sp-menu/sp-menu.vue'
import SpMenuGroup from './sp-menu/sp-menu-group.vue'
import SpCheckbox from './sp-checkbox/sp-checkbox.vue'
import SpCheckboxButton from './sp-checkbox/sp-checkbox-button.vue'
import SpCheckboxGroup from './sp-checkbox/sp-checkbox-group.vue'
import SpCollapseTransition from './sp-collapse-transition.js'

const starpost = {
	install (Vue, options) {
		Vue.component( SpImgDetails.name, SpImgDetails )
        Vue.component( SpMenu.name, SpMenu )
        Vue.component( SpMenuGroup.name, SpMenuGroup )
        Vue.component( SpCheckbox.name, SpCheckbox )
		Vue.component( SpCheckboxButton.name, SpCheckboxButton )
        Vue.component( SpCheckboxGroup.name, SpCheckboxGroup )
        Vue.component( SpCollapseTransition.name, SpCollapseTransition )
		Vue.component( SpCollapseTransition.name, SpCollapseTransition )
		// vuePayKeyboard.name 组件的name属性
        // 类似通过 this.$xxx 方式调用插件的 其实只是挂载到原型上而已
        // Vue.prototype.$xxx  // 最终可以在任何地方通过 this.$xxx 调用
        // 虽然没有明确规定用$开头  但是大家都默认遵守这个规定
        
        // 定义属性
        Vue.prototype.$pagePermissions = [];

        //定义方法
        Vue.prototype.checkUserName = (value) => {
			if(/^\w{6,11}$/.test(value)){//匹配6-20位数字字母下划线
				return true;
			}else{
				return false;
			}
		}
        Vue.prototype.menuSelectNode = function(data) {
            if(!this.selectId && !sessionStorage.selectId && !data) return;
            this.selectId = sessionStorage.selectId
            let activeArr = sessionStorage.selectId.split('-'),
              this_menu;
            for (let i = 0; i < activeArr.length - 1; i++) {
                if(this_menu){
                    this_menu.children[activeArr[i] - 1].active = true;
                    this_menu = this_menu.children[activeArr[i] - 1];
                }else{
                    data[activeArr[i] - 1].active = true
                    this_menu = data[activeArr[i] - 1];
                }
            }
		}

		//定义指令
		Vue.directive("uname",{
            bind(){
                console.log("bind"); // 只会调用一次
            },
            update(el,binding,vnode){
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
