<template>
	<el-dialog :visible.sync="visible" title='新增' :before-close="handleClose" width="50%" :close-on-click-modal='false'>
		<el-form ref="form" :model="form" :rules="formRules" label-width="100px">
			<el-tabs v-model="activeName" >
				<el-tab-pane label="基本信息" name="first">
					<el-row>
						<el-col :span='18'>
							<el-form-item label="标题" prop="theme">
								<el-input v-model="form.theme"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='9'>
							<el-form-item label="类型" prop='type'>
								<dic-select :allow-null='false' keyword="mrtype" v-model="form.type"></dic-select>
							</el-form-item>
						</el-col>
						<el-col :span='9'>
							<el-form-item label="状态" prop="status">
								<!-- 数据字典下拉框 -->
								<dic-select :allow-null='false' keyword="mrstatus" v-model="form.status"></dic-select>
							</el-form-item>
						</el-col>
						<el-col :span='18'>
							<el-form-item label="链接" prop="url">
								<el-input v-model="form.url"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='24'>
							<el-form-item label="摘要" prop='summary'>
								<el-input v-model="form.summary"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='24'>
							<el-form-item label='内容' prop='content'>
								<text-editor v-model='form.content'></text-editor>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="图片上传" name="second">
					<el-row>
						<el-col>
							<el-form-item prop='image' style='vertical-align: top;'>
								<el-upload class="avatar-uploader" action="/api/fileupload/imageupload" :show-file-list="false" :on-success="handleAvatarSuccess"
								 :on-error="handleAvatarError" :before-upload="beforeAvatarUpload" style='margin:0px 0 -8px 30px;'>
									<img v-if="imageUrl" :src="imageUrl" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
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
				activeName:"first",
				form: {
					theme: null,
					type: null,
					status: null,
					image: null,
					url: null,
					summary: null,
					content: null,
					libraryId: sessionStorage.getItem("libraryId"),
				},
				imageUrl:null,
				formRules: {
					theme: [{
						required: true,
						message: '标题不能为空',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '类型不能为空',
						trigger: 'blur'
					}],
					status: [{
						required: true,
						message: '状态不能为空',
						trigger: 'blur'
					}],
					image: [{
						required: true,
						message: '图片不能为空',
						trigger: 'blur'
					}],
				},
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
					theme: null,
					type: null,
					status: null,
					image: null,
					url: null,
					summary: null,
					content: null,
					libraryId:sessionStorage.getItem("libraryId"),
				};
				this.imageUrl = null;
			},
			handleAvatarSuccess(res, file, fileList) {
				if (res.status === 200 && res.data) {
					this.imageUrl = URL.createObjectURL(file.raw);
					this.form.image = res.data;
				} else {
					this.$mm.error("文件上传失败");
				}

				//console.log(res);
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
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$http.post("/micro/read/add", this.form, true).then(
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
			}
		}
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
