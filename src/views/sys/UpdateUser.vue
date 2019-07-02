<template>
	<div id='updateuser'>
		<el-form ref="userForm" :rules="formRules" :model="form" label-width="100px">
			<el-form-item label="登录账户" prop="userName">
				<el-input :disabled="true" v-model="form.userName"></el-input>
			</el-form-item>
			<el-form-item label="真实姓名" prop="realName">
				<el-input v-model="form.realName"></el-input>
			</el-form-item>
			<el-form-item label="电子邮箱" prop="email">
				<el-input v-model="form.email"></el-input>
			</el-form-item>
			<el-form-item label="联系电话">
				<el-input v-model="form.phone"></el-input>
			</el-form-item>
<!-- 			<el-form-item label="是否激活">
			<el-switch v-model="form.enabled"></el-switch>
			</el-form-item> -->
			</el-form>
	</div>
</template>

<script>
	export default {
	props:['oldUserInfo'],	
	data() {
	var validatePass2 = (rule, value, callback) => {
	 if (value !== this.form.password) {
		    callback(new Error('两次输入密码不一致!'));
		  } else {
		    callback();
		  }
		};
	  return {

			form: {
			  userName: null,
			  password: null,
			  password2:null,
			  realName: null,
			  email: null,
			  phone: null,
			  enabled:true
			},
			formRules: {
				userName:[
					{ required: true, message: '登录账户不能为空', trigger: 'blur' }
				],
				password:[
					{ required: true, message: '密码不能为空', trigger: 'blur' },
					{ min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
				],
				realName: [{
					required: true,
					message: '真实姓名不能为空',
					trigger: 'blur'
				}],
				email: [
							{ type:"email",required: false, message: '电子邮箱格式不正确', trigger: 'blur' }
					],
				password2:[{ required: true, message: '两次输入密码不一致!', trigger: 'blur' },{validator: validatePass2, trigger: 'blur'}]
				}
	  }
	},
	methods: {
		cleanForm(){
			//console.log("cleanForm")
			this.form={
			  id:null,
			  userName: null,
			  password: null,
			  password2:null,
			  realName: null,
			  email: null,
			  phone: null,
			  enabled:true
			};
			this.oldUserInfo = null;
		},
		submit() {
			this.$refs.userForm.validate((valid)=>{
				if (valid) {
						const data = {...this.form};
						data.enabled = data.enabled?1:0;
						this.$http.post("/sys/updateuserinfo",data,true).then((data)=>{
							if(data===1){
								this.$message({
									message: "用户信息更新成功",
									type: 'success',
									duration:2000})
							}else{
									this.$message({
										message: "用户信息更新失败",
										type: 'error',
										duration:2000})
							}
						});
				}
			});
		},
	},
	watch: {
		"oldUserInfo":function(newValue, oldValue) {
			//debugger;
			this.form = {...this.form,...this.oldUserInfo};
		}
	},
	created(){
		this.form = {...this.form,...this.oldUserInfo};
	},
	computed:{
	
	}
}
</script>

<style>
	#updateuser{
		padding-right: 20px;
	}
</style>
