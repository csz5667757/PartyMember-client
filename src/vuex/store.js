import Vue from 'vue'
import Vuex from 'vuex'
import {
	state
} from "./state";
import axios from 'axios'
// 告诉 vue “使用” vuex
Vue.use(Vuex);

export default new Vuex.Store({
	state,
	mutations: {
		setUserInfo(state, userInfo) {
			state.userInfo = { ...state.userInfo,
				...userInfo
			};
		},
		setIsCollapse(state) {
			state.isCollapse = !state.isCollapse
		},
		setBreads(state, breads) {
			state.breads = breads;
			sessionStorage.setItem('breads', JSON.stringify(breads));
		},
		setDic(state, dic) {
			state.dic = { ...state.dic,
				...dic
			};
		},
		setMenu(state, menu) {
			state.menu = menu;
		}
	},
	actions: {
		setUserInfo(context, userInfo) {
			context.commit('setUserInfo', userInfo)
		},
		login(context, data, router) {
			return axios({
					method: 'post',
					url: '/api/user/login',
					data,
					headers: {
						'content-type': 'application/x-www-form-urlencoded'
					}
				}).then((response) => {
					//console.log(response);
					if (response.data && response.data.status == 200) {
						//context.commit('setUserInfo',response.data.Data)
						sessionStorage.userInfo = JSON.stringify(response.data.data.user);
						return 1;
					}
					return 0;
				})
				.catch((error) => {
					//console.log(error);
					return -1;
				})
		},
		getDic(context, obj) {
			axios({
				method: 'get',
				url: '/api/dictionary/kvlist?dicKeyword=' + obj.dicKeyword
			}).then((res) => {
				obj.callback(res.data.data)
			}).catch((err) => {})
		},
		setDic(context, dic) {
			context.commit('setDic', dic)
		},
		setMenu(context, menu) {
			context.commit('setMenu', menu)
		},
	}
})
