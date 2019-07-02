// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
import store from './vuex/store'
import Axios from 'axios'
import Qs from 'qs'
import http from './http'
import dictionary from './utils/dictionary.js'
import messageUtils from './utils/messageUtils.js'
import '@/assets/icons/iconfont.css'
import moment from 'moment'
import ICSUI from '@/components/ui'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
Vue.use(ICSUI)
Vue.prototype.$axios = Axios;
Vue.prototype.$qs = Qs;
Vue.prototype.$http = http;
Vue.prototype.$mm = messageUtils;
Vue.prototype.$dic = dictionary;
Vue.prototype.$moment = moment;
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
	return dataStr ? moment(dataStr).format(pattern) : null
});
Vue.filter('getEditor', (value, type = 'text') => {
	return value && JSON.parse(value)[type] || ""
})
Vue.filter('getSexStr', (value) => {
	return value == 1 && '男' || value == 2 && '女' || ''
})
Vue.filter('yesorno', (value) => {
	return value ? "是" : "否";
})
Vue.filter('getSub', (value, len = 10) => {
	if (value && value.length > len) {
		value = value.slice(0, len) + '...';
	}
	return value;
})
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
