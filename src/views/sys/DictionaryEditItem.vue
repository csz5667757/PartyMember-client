<template>
	<el-dialog :visible.sync="visible" title='修改字典项' :before-close="handleClose" width="30%" :close-on-click-modal=false>
		<el-form ref="form" :model="form" :rules="formRules" label-width="100px">
			<el-form-item label='字典名称' prop='dicName'>
				<el-input v-model='form.dicName'></el-input>
			</el-form-item>
			<el-form-item label='字典关键字' prop='dicKeyword'>
				<el-input v-model='form.dicKeyword'></el-input>
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
					id: null,
					dicName: null,
					dicKeyword: null
				},
				formRules: {
					dicName: [{
						required: true,
						message: '字典项名称不为空',
						trigger: 'blur'
					}],
					dicKeyword: [{
						required: true,
						message: '字典项关键字不为空',
						trigger: 'blur'
					}]
				}
			}
		},
		props: ['visible', 'itemData'],
		methods: {
			handleClose() {
				this.resetForm('form');
				this.$emit('close');
			},
			clearform() {
				this.form = {
					id: null,
					dicName: null,
					dicKeyword: null
				}
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$http.post("/dictionary/updatedic", this.form, true).then(
							(data) => {
								if (data > 0) {
									this.$message({
										message: "修改成功",
										type: 'success',
										duration: 2000
									})
									this.resetForm('form');
									this.$emit('submit');
									this.$emit('close');
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
			'itemData': function(value) {
				this.form = { ...this.form,
					...value
				};
			}
		}
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
