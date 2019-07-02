<template>
	<el-dialog :visible.sync="visible" :title='"修改"+form.dicName+"的值"' :before-close="handleClose" width="30%"
	 :close-on-click-modal=false>
		<el-form ref="form" :model="form" :rules="formRules" label-width="100px">
			<el-form-item label='代码描述' prop='dicKey'>
				<el-input v-model='form.dicKey'></el-input>
			</el-form-item>
			<el-form-item label='代码' prop='dicValue'>
				<el-input v-model='form.dicValue'></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click='submitForm("form")'>确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					dicKey: null,
					dicValue: null,
				},
				formRules: {
					dicKey: [{
						required: true,
						message: '代码描述不为空',
						trigger: 'blur'
					}],
					dicValue: [{
						required: true,
						message: '代码不为空',
						trigger: 'blur'
					}]
				}
			}
		},
		props: ['visible', 'item'],
		methods: {
			handleClose() {
				this.resetForm('form');
				this.$emit('close');
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$http.post("/dictionary/updatekv", this.form, true).then(
							(data) => {
								if (data > 0) {
									this.$message({
										message: "修改成功",
										type: 'success',
										duration: 2000
									})
									this.$emit('close');
									this.$emit('submit', this.form);
								} else {
									this.$message({
										message: "修改失败，请联系管理员",
										type: 'error',
										duration: 2000
									})
								}
							}
						)
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
		},
		watch: {
			'item'(newValue, oldValue) {
				this.form = { ...this.form,
					...newValue
				}
			}
		},
	}
</script>

<style>
	.el-form {
		padding-right: 30px;
	}

	.el-form .el-select {
		width: 100%;
	}
</style>
