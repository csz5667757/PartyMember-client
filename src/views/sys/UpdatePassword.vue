<template>
	<div id='updatepassword'>
		<el-dialog :close-on-click-modal="false" title="修改密码" :visible.sync="visible" width="30%" :before-close="handleClose"
		 v-loading="loading">
			<el-form ref="form" :rules="formRules" :model="form" label-width="100px">
				<el-form-item label="旧密码" prop="oldPassword">
					<el-input type="password" v-model="form.oldPassword"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="newPassword">
					<el-input type="password" v-model="form.newPassword"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="rNewPassword">
					<el-input type="password" v-model="form.rNewPassword"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogOkClick">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: ['dialogVisible', 'close'],
		data: function() {
			var validatePass2 = (rule, value, callback) => {
				if (value !== this.form.newPassword) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				loading: false,
				form: {
					oldPassword: null,
					newPassword: null,
					rNewPassword: null
				},
				formRules: {
					oldPassword: [{
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
					newPassword: [{
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
					rNewPassword: [{
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
			handleClose(done) {
				this.form = {
					oldPassword: null,
					newPassword: null,
					rNewPassword: null
				};
				this.$refs.form.clearValidate();
				this.$emit('close');
			},
			dialogOkClick() {

				this.$refs.form.validate(valid => {
					if (valid) {
						this.loading = true;
						this.$http.post("/sys/updatepassword", this.form, false).then(res => {
							if (res >= 1) {
								this.$mm.success("密码修改成功");
								this.loading = false;
								this.handleClose();
							}
						}).catch(err => {
							this.loading = false;

						})

					}
				})
			}
		},
		computed: {
			visible: function() {
				return this.dialogVisible;
			}
		}
	}
</script>

<style>
	#updatepassword .el-dialog {
		padding-right: 20px;
	}
</style>
