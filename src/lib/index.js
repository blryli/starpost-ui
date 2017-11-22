import SpImgDetails from './sp-img/sp-img-details.vue'
import SpTree from './sp-tree/sp-tree.vue'
import SpCheckbox from './sp-checkbox/sp-checkbox.vue'
import SpCheckboxButton from './sp-checkbox/sp-checkbox-button.vue'
import SpCheckboxGroup from './sp-checkbox/sp-checkbox-group.vue'

const starpost = {
	install (Vue, options) {
		Vue.component( SpImgDetails.name, SpImgDetails )
		Vue.component( SpTree.name, SpTree )
		Vue.component( SpCheckbox.name, SpCheckbox )
		Vue.component( SpCheckboxButton.name, SpCheckboxButton )
		Vue.component( SpCheckboxGroup.name, SpCheckboxGroup )
		// vuePayKeyboard.name 组件的name属性
        // 类似通过 this.$xxx 方式调用插件的 其实只是挂载到原型上而已
        // Vue.prototype.$xxx  // 最终可以在任何地方通过 this.$xxx 调用
        // 虽然没有明确规定用$开头  但是大家都默认遵守这个规定
	}
}

if (typeof window !== 'undefind' && window.Vue) {
	window.Vue.use(starpost);
}

export default starpost
