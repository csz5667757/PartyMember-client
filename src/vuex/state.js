const iconList = [
	'icon i-shezhi',
	'icon i-icon',
	'icon i-chuangyerichang',
	'icon i-wechat',
	'icon i-tongji',
	'icon i-wj-dwj',
]
export const state = {
	isCollapse: false, //导航栏是否收起
	userInfo: {},
	dic:{},
	menu:[],
	iconList,
	breads: sessionStorage.breads && JSON.parse(sessionStorage.breads) || {}
}
