<template>
	<div id='adduser'>
		<el-form ref="userForm" :rules="formRules" :model="form" label-width="100px">
			<el-form-item label="登录账户" prop="userName">
				<el-input v-model="form.userName"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="form.password"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="password2">
				<el-input type="password" v-model="form.password2"></el-input>
			</el-form-item>
			<el-form-item label="所属图书馆" prop="libraryId">
				<el-select v-model="form.libraryId" placeholder="请选择">
					<el-option v-for="item in librarys" :key="item.id" :label="item.library_name" :value="item.id">
					</el-option>
				</el-select>
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
			<el-form-item label="是否激活">
				<el-switch v-model="form.enabled"></el-switch>
			</el-form-item>
		</el-form>
		<!-- {{librarys}} -->
	</div>
</template>

<script>
	export default {
		data() {
			var validatePass2 = (rule, value, callback) => {
				if (value !== this.form.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				librarys:[],
				form: {
					libraryId:null,
					userName: null,
					password: null,
					password2: null,
					realName: null,
					email: null,
					phone: null,
					enabled: true
				},
				formRules: {
					userName: [{
						required: true,
						message: '登录账户不能为空',
						trigger: 'blur'
					}],
					password: [{
							required: true,
							message: '密码不能为空',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 18,
							message: '长度在 6 到 18 个字符',
							trigger: 'blur'
						}
					],
					libraryId: [{
						required: true,
						message: '登录账户不能为空',
						trigger: 'blur'
					}],
					realName: [{
						required: true,
						message: '真实姓名不能为空',
						trigger: 'blur'
					}],
					email: [{
						type: "email",
						required: false,
						message: '电子邮箱格式不正确',
						trigger: 'blur'
					}],
					password2: [{
						required: true,
						message: '两次输入密码不一致!',
						trigger: 'blur'
					}, {
						validator: validatePass2,
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			cleanForm() {
				//console.log("cleanForm")
				this.form = {
					libraryId:null,
					userName: null,
					password: null,
					password2: null,
					realName: null,
					email: null,
					phone: null,
					enabled: true
				};
				this.$refs.userForm.clearValidate();
			},
			submit() {

				this.$refs.userForm.validate((valid) => {
					if (valid) {
						//alert('submit!');
						const data = { ...this.form
						};
						data.enabled = data.enabled ? 1 : 0;
						data.locked = 0;
						this.$http.post("/sys/adduser", data, true).then((data) => {
							if (data === -1) {
								this.$message({
									message: "登录账户已存在",
									type: 'error',
									duration: 2000
								})
							} else if (data != 1) {
								this.$message({
									message: "用户添加失败，请联系管理员",
									type: 'error',
									duration: 2000
								})
							} else {
								this.$message({
									message: "用户添加成功",
									type: 'success',
									duration: 2000
								})
								this.$emit("visibleChanged");
								this.cleanForm();
							}
						})
					} else {
						//console.log(valid);
						this.$message({
							message: "表单验证不通过",
							type: 'error',
							duration: 2000
						})
						return false;
					}
				})
			}
		},
		mounted() {
			this.$http.get("/library/selectall", true).then((data) => {
				this.librarys = data
			}).catch((err) => {})
		}
	}
</script>

<style>
	#adduser .el-form-item {
		margin-bottom: 18px;
		padding-right: 20px;
	}
</style>
