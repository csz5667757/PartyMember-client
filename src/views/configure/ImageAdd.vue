<template>
	<el-dialog :visible.sync="visible" title='添加' :before-close="handleClose" width="50%" :close-on-click-modal='false'>
		<el-form ref="form" :model="form" :rules="formRules" label-width="100px">
			<el-row>
				<el-col :span='24'>
					<el-form-item label="图片上传" prop='image' style='vertical-align: top;'>
						<el-upload class="avatar-uploader" action="/api/fileupload/imageupload" :show-file-list="false" :on-success="handleAvatarSuccess"
						 :on-error="handleAvatarError" :before-upload="beforeAvatarUpload" style='margin:0px 0 -8px 30px;'>
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='12'>
					<el-form-item label="图片类型" prop='imgType'>
						<dic-select :allow-null='false' keyword="lbttype" v-model="form.imgType"></dic-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='18'>
					<el-form-item label="跳转链接" prop="url">
						<el-input v-model="form.url"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='24'>
					<el-form-item label="图片描述" prop="content">
						<el-input v-model="form.content"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

		</el-form>
		{{form}}
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
				imageUrl:null,
				form: {
					image:null,
					libraryId: sessionStorage.getItem("libraryId"),
					imgType:null,
					url:null,
					content:null,
				},
				formRules: {
					image: [{
						required: true,
						message: '轮播图不能为空',
						trigger: 'blur'
					}],
					imgType: [{
						required: true,
						message: '图片类型不能为空',
						trigger: 'blur'
					}],
					content: [{
						required: true,
						message: '图片描述不能为空',
						trigger: 'blur'
					}],
				}
			}
		},
		props: ['visible'],
		methods: {
			handleClose() {
				this.$emit('close');
			},
			clearForm() {
				this.form = {
					image:null,
					imgType:null,
					url:null,
					content:null,
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
						this.$http.post("/image/add", this.form, true).then(
							(data) => {
								if (data > 0) {
									this.$message({
										message: "添加成功",
										type: 'success',
										duration: 2000
									})
									this.$emit('submit');
									this.$emit('close');
									this.clearForm();
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
		},
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
