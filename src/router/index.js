import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout'
import Login from '@/views/Login'
import SysInit from '@/views/SysInit'
import NotFoundComponent from '@/components/404'
import sys from '@/router/sys.js'
import demo from '@/router/demo.js'
import activity from '@/router/activity.js'
import books from '@/router/books.js'
import microreading from '@/router/microreading.js'
import user from '@/router/user.js'
import department from '@/router/department.js'
import partymember from '@/router/partymember.js'
import configure from '@/router/configure.js'


Vue.use(Router)
var getLayoutChildren = function() {
	var children = [];
	children = children
		.concat(sys)
		.concat(demo)
		.concat(activity)
		.concat(books)
		.concat(microreading)
		.concat(user)
		.concat(department)
		.concat(partymember)
		.concat(configure)
	return children;
}

const router = new Router({
	routes: [{
			path: '*',
			component: NotFoundComponent
		},
		{
			path: '/',
			name: 'layout',
			component: Layout,
			redirect: '/index',
			children: getLayoutChildren()
		}, {
			path: '/login',
			name: 'signin',
			component: Login
		}, {
			path: '/sysinit',
			name: 'sysinit',
			component: SysInit
		}
	]
})
router.beforeEach((to, from, next) => {
	//console.log(beforeEach);
	next();
})


export default router;
