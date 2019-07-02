<template>
	<el-dialog :visible.sync="visible" title='新增' :before-close="handleClose" width=50% :close-on-click-modal='false'>
		<el-form ref="form" :model="form" :rules="formRules" label-width="120px">
			<el-tabs v-model="activeName">
				<el-tab-pane label="图书信息" name="first">
					<el-row>
						<el-col :span='12'>
							<el-form-item label="书名" prop="seriesName">
								<el-input v-model="form.seriesName" placeholder="请输入内容"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='12'>
							<el-form-item label="作者" prop="author">
								<el-input v-model="form.author" placeholder="请输入内容"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='12'>
							<el-form-item label="标准书号" prop="isbn">
								<el-input v-model="form.isbn" placeholder="请输入内容"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='12'>
							<el-form-item label="出版日期" prop="publicationTime">
								<!-- <el-input v-model="form.publicationTime" placeholder="请输入内容"></el-input> -->
								<el-date-picker v-model="form.publicationTime" type="date" placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span='12'>
							<el-form-item label="页码" prop="pageNum">
								<el-input v-model="form.pageNum" placeholder="请输入内容"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='12'>
							<el-form-item label="出版社" prop="press">
								<el-input v-model="form.press" placeholder="请输入内容"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='12'>
							<el-form-item label="分类" prop="classification">
								<el-input v-model="form.classification" placeholder="请输入内容"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='12'>
							<el-form-item label="中图分类" prop="booksType">
								<el-input v-model="form.booksType" placeholder="请输入内容"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='12'>
							<el-form-item label="图书地址" prop="address">
								<el-input v-model="form.address" placeholder="请输入内容"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='12'>
							<el-form-item label="主题词" prop="themeWords">
								<el-input v-model="form.themeWords" placeholder="请输入内容"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='24'>
							<el-form-item label="图书摘要" prop="summary">
								<el-input v-model="form.summary" placeholder="请输入内容"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="图片上传" name="image">
					<el-row>
						<el-col>
							<el-form-item label="图书图片" prop='image' style='vertical-align: top;'>
								<!-- <el-upload class="avatar-uploader" action="/api/fileupload/imageupload" :show-file-list="false" :on-success="handleAvatarSuccess"
								 :on-error="handleAvatarError" :before-upload="beforeAvatarUpload" style='margin:0px 0 -8px 30px;'>
									<img v-if="imageUrl2||form.image" :src="imageUrl2||'/api/fileupload/getpartyimage?image='+form.image" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload> -->
								<el-upload class="avatar-uploader" action="/api/fileupload/imageupload" :show-file-list="false" :on-success="handleAvatarSuccess"
								 :before-upload="beforeAvatarUpload">
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

				activeName: "first",
				imageUrl: null,
				form: {
					image: null,
					seriesName: null,
					isbn: null,
					author: null,
					summary: null,
					publicationTime: '',
					pageNum: null,
					themeWords: null,
					booksType: null,
					address: null,
					press: null,
					classification: null,
					libraryId:sessionStorage.getItem("libraryId"),
				},


				formRules: {
					seriesName: [{
						required: true,
						message: '书名不能为空',
						trigger: 'blur'
					}],
					author: [{
						required: true,
						message: '作者不能为空',
						trigger: 'blur'
					}],
					publicationTime: [{
						required: true,
						message: '出版日期不能为空',
						trigger: 'blur'
					}],
					summary: [{
						required: true,
						message: '图书摘要不能为空',
						trigger: 'blur'
					}],
					isbn: [{
						required: true,
						message: 'ISBN不能为空',
						trigger: 'blur'
					}],
					image: [{
						required: true,
						message: '图书图片不能为空',
						trigger: 'blur'
					}],
					// 										ISBN: [{
					// 											required: true,
					// 											message: 'ISBN不能为空',
					// 											trigger: 'blur'
					// 										}],
					// 										ISBN: [{
					// 											required: true,
					// 											message: 'ISBN不能为空',
					// 											trigger: 'blur'
					// 										}],

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
					image: null,
					seriesName: null,
					isbn: null,
					author: null,
					summary: null,
					publicationTime: '',
					pageNum: null,
					themeWords: null,
					booksType: null,
					address: null,
					press: null,
					classification: null,
					libraryId:sessionStorage.getItem("libraryId"),
				}
				this.imageUrl = null;
				this.activeName = "first";
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$http.post("/books/add", this.form, true).then(
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
