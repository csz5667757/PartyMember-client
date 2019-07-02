<template>
	<el-dialog :visible.sync="visible" title='新增模板' :before-close="handleClose" width="50%" :close-on-click-modal='false'>
		<el-form ref="form" :model="form" :rules="formRules" label-width="100px">
			<el-row>
				<el-col :span='12'>
					<el-form-item label="模板名称" prop="moduleName">
						<el-input v-model="form.moduleName"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="链接URL" prop="url">
						<el-input v-model="form.url"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="模板页面" prop="templatePage">
						<el-input v-model="form.templatePage"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="备注" prop="remarks">
						<el-input type='textarea' v-model="form.remarks"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span='24'>
					<el-form-item label="模板图标" prop="moduleIcon">
						<el-upload class="avatar-uploader" action="/api/fileupload/imageupload" :show-file-list="false" :on-success="handleAvatarSuccess"
						 :on-error="handleAvatarError" :before-upload="beforeAvatarUpload" style='margin:0px 0 0px 0px;'>
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!-- {{form}} -->
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click='submitForm("form")'>确 定</el-button>
			<el-button @click="resetForm('form')">重置</el-button>
		</span>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					moduleName: null,
					url: null,
					templatePage: null,
					remarks: null,
					moduleIcon: null,
				},
				formRules: {
					moduleName: [{
						required: true,
						message: '模板名称不能为空',
						trigger: 'blur'
					}],
					url: [{
						required: true,
						message: '链接URL不能为空',
						trigger: 'blur'
					}],
					moduleIcon: [{
						required: true,
						message: '模板图标不能为空',
						trigger: 'change'
					}],
				},
				imageUrl: '',
			}
		},
		props: ['visible'],
		methods: {
			handleClose() {
				this.clearForm();
				this.resetForm('form');
				this.$emit('close');
			},
			clearForm() {
				this.form = {
					moduleName: null,
					url: null,
					templatePage: null,
					remarks: null,
					moduleIcon: null,
				}
				this.imageUrl = '';
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$http.post("/template/add", this.form, true,true).then(
							(data) => {
								if (data > 0) {
									this.$message({
										message: "添加成功",
										type: 'success',
										duration: 2000
									})
									this.handleClose();
									this.$emit('submit');
								} else {
									this.$message({
										message: "添加失败，请联系管理员",
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
				this.clearForm();
				this.$refs[formName].resetFields();
			},
			handleAvatarSuccess(res, file, fileList) {
				if (res.status === 200 && res.data) {
					this.imageUrl = URL.createObjectURL(file.raw);
					this.form.moduleIcon = res.data;
				} else {
					this.$mm.error("文件上传失败");
				}
			},
			handleAvatarError(err, file, fileList) {
				this.$mm.error("文件上传失败");
			},
			beforeAvatarUpload(file) {
				const isJPGPNG = file.type === 'image/jpeg' || file.type === 'image/png';
				const isLt1M = file.size / 1024 / 1024 < 1;
				if (!isJPGPNG) {
					this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
				}
				if (!isLt1M) {
					this.$message.error('上传头像图片大小不能超过 1MB!');
				}
				return isJPGPNG && isLt1M;
			},
		}
	}
</script>

<style>
</style>
