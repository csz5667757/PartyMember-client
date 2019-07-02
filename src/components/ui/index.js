import MyDicSelect from './DicSelect.vue'
import Area3Cascader from './Area3Cascader.vue'
import PropGroup from './PropGroup.vue'
import TextEditor from './TextEditor.vue'
// 这里是重点
const ICSUI = {
	install: function(Vue) {
		Vue.component('dic-select', MyDicSelect)
		Vue.component('area3-cascader', Area3Cascader)
		Vue.component('prop-group', PropGroup)
		Vue.component('text-editor', TextEditor)
	}
}

// 导出组件
export default ICSUI
