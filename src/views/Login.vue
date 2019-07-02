<template>
	<div id="loginpage">
		<el-card class="login-card">
			<h2>党员信息后台管理平台</h2>
			<el-form ref="form" :model="form" label-width="80px" :rules="formRules">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="form.username" ></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="form.password" type="password" ></el-input>
				</el-form-item>
				<el-form-item class='small'>
					<el-checkbox label="记住我" v-model="form.rememberMe" size="mini"></el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit" :loading='loeading'>{{loginButtonText}}</el-button>
				</el-form-item>
			</el-form>
		</el-card>
    <!--{{env}}-->
	</div>

</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
        loeading:false,
        loginButtonText:'登录',
				form: {
					username: "",
					password: "",
					rememberMe: false,
          env:"",

				},
        formRules:{
          username:[
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            ],
          password:[
            { required: true, message: '密码不能为空', trigger: 'blur' },
          ]
        }
			}
		},
		methods: {
			onSubmit() {
				let _this = this;
        this.$refs.form.validate((valid)=>{
          if(valid){
            this.loading = true;
            this.loginButtonText = "登录中";
            let data = "username=" + _this.$data.form.username + "&password=" + _this.$data.form.password;
            if (_this.$data.form.rememberMe) {
              data = data + "&remember-me=on";
            }
            _this.$store.dispatch("login", data).then((res) => {
              this.loading = false;
              this.loginButtonText = "登录";
              if (res == 1) {
                window.sessionStorage.removeItem("initData");
                _this.$router.push('/index')
              }else{
                _this.$mm.error("用户名不存在或密码不正确");
              }
            });
          }
        })


				// 		this.$axios(
				// 		{
				// 		  method: 'post',
				// 		  url: '/user/login',
				// 		  data,
				// 		  headers: {'content-type': 'application/x-www-form-urlencoded'}
				// 		   }).then( (response)=> {
				// 			console.log(response);
				// 			if(response.data&&response.data.status==1){
				// 				//console.log(response.data)
				// 				this.$store.dispatch("setUser","55555555")
				// 				//this.$store.commit("setUserName","6666");
				// 				this.$router.push('/sys/index')
				// 			}
				// 		  })
				// 		  .catch( (error)=> {
				// 			console.log(error);
				// 		  })
			}
		},
		mounted() {
			document.body.setAttribute('class', 'login');
			document.querySelector('[type=password]').onkeydown = (e) => {
				if (e.keyCode === 13) {
					this.onSubmit();
				}
			}
		},
		beforeDestroy() {
			document.body.setAttribute('class', '');
		},
    created() {
		  this.env = process.env;
    }
  }
</script>

<style>
	body.login {
		background: url("../assets/login_bg.jpg") center center no-repeat;
		background-size: cover;
		background-attachment: fixed;
	}

	#loginpage {
		width: 100%;
		padding-top: 14%;
		padding-bottom: 10%;
	}

	#loginpage .login-card {
		margin: 0 auto;
		width: 500px;
		height: 350px;
		background-color: gold;
		border-radius: 20px;
	}

	#loginpage .login-card h2 {
		margin-bottom: 20px;
		text-align: center;
	}

	#loginpage .el-form {
		padding-right: 30px;
	}

	#loginpage .small {
		margin-top: -10px;
		margin-bottom: 10px;
	}

	#loginpage .el-checkbox {
		float: right;
	}

	#loginpage .el-button {
		width: 100%;
		margin-left: -20px;
	}
</style>
