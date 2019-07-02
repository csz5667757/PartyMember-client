<template>
	<span id='aside'>
		<el-row height="75px">
			<el-col :span="6" v-if="!isCollapse" style='text-align: center;'>
				<i class="icon i-02"></i>
			</el-col>
			<el-col :span="12" v-if="!isCollapse" style='text-align: center;'>
				<span v-text="realName"></span>
			</el-col>
			<el-col :span="6">
				<i class='icon i-weibiaoti12' v-on:click="onChick"></i>
			</el-col>
		</el-row>
		<el-menu router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" text-color="#333333"
		 active-text-color="#1486ff" :collapse="isCollapse" :default-active='defaultActive' unique-opened>
			<template v-for="(item1) in menu">
				<el-submenu v-if="item1.submenu" :index="item1.id.toString()" :key='item1.id'>
					<template slot="title">
						<i :class="item1.menuIcon"></i>
						<span>{{item1.menuName}}</span>
					</template>
					<template v-for="(item2) in item1.children">
						<el-menu-item :index="item2.menuPath" :key='item2.menuPath' @click='breadcrumb(item1.menuName,item2.menuName)'>{{item2.menuName}}</el-menu-item>
					</template>
				</el-submenu>
			</template>
		</el-menu>
	</span>
</template>

<script>
	import UpdatePassword from '@/views/sys/UpdatePassword'
	export default {
		name: 'Aside',
		props: ['menu'],
		components: {
			UpdatePassword
		},
		data() {
			return {
				defaultActive: "",
				isCollapse: this.$store.state.isCollapse,
				menuData: [
					// 					{
					// 						submenu:true,
					// 						index:"/xtgl",
					// 						icon:"el-icon-menu",
					// 						title:"系统管理",
					// 						children:[
					// 							{index:"/xtgl/yhgl",title:"用户管理"},
					// 							{index:"/xtgl/jggl",title:"机构管理"},
					// 							{index:"/xtgl/jsgl",title:"角色管理"},
					// 							{index:"/xtgl/zzgl",title:"组织管理"},
					// 							{index:"/xtgl/dhlgl",title:"菜单管理"},
					// 						]
					// 					},
				],
				realName: "",
				dialogVisible: false
			}
		},
		beforeCreate() {
			//console.log(this.$router.history.current.fullPath);
			//console.log(this)
		},
		created: function() {
			this.defaultActive = this.$router.history.current.fullPath;
			this.$data.realName = this.$store.state.userInfo.realName||this.$store.state.userInfo.username;
			//this.$data.menuData = formatMenuData(this.$store.state.userInfo.authorities);
		},
		watch: {
			'$store.state.isCollapse': function(isCollapse, old) {
				this.$data.isCollapse = isCollapse;
			},
			'$store.state.userInfo': function(userInfo, oldVar) {
				this.$data.realName = userInfo.realName||this.$store.state.userInfo.username;
				//this.$data.menuData = formatMenuData(userInfo.menuInfos);
			}
		},
		methods: {
			handleOpen() {

			},
			handleClose() {

			},
			onChick() {
				this.$store.commit("setIsCollapse");
			},
			handleCommand(command) {
				console.log(command)
				if (command === 1) {
					this.dialogVisible = true;
				}
				if (command === 2) {
					this.$http.get("/logout", null, true).then(res => {
						this.$mm.success("已安全退出");
						this.$router.push('/login');
					})
				}
			},
			breadcrumb(submenu,item){
				const bread={
					submenu,
					item
				}
				this.$store.commit('setBreads',bread);
			}
		}
	}
</script>

<style>
	#aside .el-menu-vertical-demo {
		float: left;
	}

	#aside .el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 220px;
	}

	#aside .el-row {
		border-bottom: solid 1px #EBEEF5;
		font-size: 14px;
		line-height: 75px;
	}

	#aside .el-row .i-02 {
		margin-left: 20px;
	}

	#aside .el-row .i-weibiaoti12 {
		margin-left: 22px;
		color: #1486ff;
		cursor: pointer;
	}

	#aside .el-menu {
		border-right: 0;
	}

	#aside .el-menu-item.is-active {
		background: #f3f6fb;
	}

	#aside .el-menu .el-submenu span {
		margin-left: 20px;
	}

	#aside .el-menu .el-menu-item {
		margin-left: 20px;
	}

	#aside .el-menu i {
		font-size: 18px;
	}
</style>
