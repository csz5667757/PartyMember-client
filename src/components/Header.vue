<template>
	<div id="header">
		<!-- <el-dropdown class="user-action" @command="handleCommand">
			<span class="el-dropdown-link">
				{{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item :command="1">修改密码</el-dropdown-item>
				<el-dropdown-item :command="2">安全退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
		<UpdatePassword :dialog-visible="dialogVisible" @close="dialogVisible=false"></UpdatePassword> -->
		<span v-text="title"></span>
		
		<span>
			<i class='icon i-diannao'></i>
			<i class='icon i-laba-'></i>
			<el-badge :value="100" :max="10" class="item"></el-badge>
			<el-dropdown @command="handleCommand">
				<i class='dy el-icon-switch-button'></i>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item :command="1"><i class="el-icon-lock"></i>修改密码</el-dropdown-item>
					<el-dropdown-item :command="2"><i class ="el-icon-switch-button"></i>安全退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>

		</span>
		<UpdatePassword :dialog-visible="dialogVisible" @close="dialogVisible=false"></UpdatePassword>
	</div>
</template>

<script>
	import UpdatePassword from '@/views/sys/UpdatePassword'
	export default {
		components: {
			UpdatePassword
		},
		name: 'Header',
		data() {
			return {
				isCollapse: true,
				userName: "",
				dialogVisible: false,
				title: ''
			}
		},
		created: function() {
			this.$data.userName = this.$store.state.userInfo.username;
		},
		mounted() {
			this.title = document.title;
		},
		watch: {
			'$store.state.userInfo': function(userInfo, oldVar) {
				this.$data.userName = userInfo.username;
			}
		},
		methods: {
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
						window.sessionStorage.removeItem("initData");
						this.$store.commit("setBreads", {});
						this.$store.dispatch("setUserInfo", {});
						this.$mm.success("已安全退出");
						this.$router.push('/login');
					})
				}
			}
		}
	}
</script>

<style>
	#header>span:first-child {
		font-size: 20px;
		color: white;
	}

	#header>span:nth-of-type(2) {
		float: right;
	}

	#header .icon {
		margin-left: 20px;
		font-size: 20px;
		color: #FFFFFF;
		cursor: pointer;
	}
	#header .dy{
		margin-left: 20px;
		font-size: 20px;
		color: #FFFFFF;
	}
	#header .i-laba-{
		font-size: 24px;
	}

	#header .item {
		margin-top: -25px;
		margin-left: -10px;
	}
</style>
