<template>
	<el-container id="layout">
		<Aside :menu="menu" />
		<el-container>
			<el-header height='76px'>
				<Header />
			</el-header>
			<el-main id="sysmaincontainer">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<template v-for='(value,key) in breads' v-if='isbread'>
						<el-breadcrumb-item :key='key'>{{value}}</el-breadcrumb-item>
					</template>
				</el-breadcrumb>
				<router-view />
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import Aside from '../components/Aside.vue'
	import Header from '../components/Header.vue'
	import menu from '@/utils/menu'
	import router from '../router'
	export default {
		name: 'Layout',
		components: {
			Aside,
			Header
		},
		data() {
			return {
				menu: [],
				menuIcons: {
					'1': 'i-shezhi'
				},
				breads: this.$store.state.breads,
				isbread: true
			}
		},
		beforeCreate() {


			// 			this.$http.get("/sys/init", null, true).then(data => {
			// 				console.log(data.userInfo);
			// 				this.$store.dispatch("setUserInfo", data.userInfo);
			// 				this.menu = this.formatMenu(data.menulist);
			// 				this.$store.dispatch("setMenu", data.menulist);
			// 				this.$dic.setDic2(data.dic);
			// 				this.$store.dispatch("setDic", data.dic);
			// 			}).catch(error => {
			// 
			// 			})
		},
		created() {
			// 			this.$http.get("/sys/getmenubyloginuser").then(data => {
			// 				this.menu = this.formatMenu(data);
			// 			})
			// 			this.$dic.setDic();
			var storage = window.sessionStorage;
			var initData = JSON.parse(storage.getItem('initData'));
			this.$store.dispatch("setUserInfo", initData.userInfo);
			this.menu = menu.formatMenu(initData.menulist);
			this.$dic.setDic2(initData.dic);
      // this.$http.ws.init(initData.userInfo.username,initData.wsToken);
			console.log("layout created")
		},
		beforeRouteEnter(to, from, next) {
			if (!window.sessionStorage.getItem('initData')) {
				console.log("layout beforeCreate")
				router.push("/sysinit");
			} else {
				next();
			}

		},
		methods: {

		},
		watch: {
			'$store.state.breads': function(breads) {
				this.breads = breads;
			}
		},
		updated() {
			if (this.$route.path === '/index') {
				this.isbread = false;
			} else {
				this.isbread = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	#layout {
		height: 100%;
	}

	#layout .el-header,
	#layout .el-footer {
		line-height: 60px;
		padding: 0, 20px, 0, 10px;
	}

	#layout .el-header {
		line-height: 76px;
		background: linear-gradient(to right, #409eff, #1486ff);
	}

	#layout .el-main {}

	#layout .el-container {
		height: 100%;
	}

	#sysmaincontainer {
		border: solid 20px #f3f6fb;
		border-top: 0;
		padding: 0 20px;
		min-height: 600px;
	}

	#sysmaincontainer>.el-breadcrumb {
		margin-left: -20px;
		margin-right: -20px;
		margin-bottom: 20px;
		height: 50px;
		background: #f3f6fb;
		line-height: 50px;
	}
</style>
