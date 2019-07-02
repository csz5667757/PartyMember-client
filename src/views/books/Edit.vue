<template>
	<el-dialog :visible.sync="visible" title='信息修改' :before-close="handleClose" width=50% :close-on-click-modal='false'>
		<el-form ref="form" :model="form" :rules="formRules" label-width="100px">
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
			
			<el-tab-pane label="图片修改" name="image">
				<el-row>
					<el-col>
						<el-form-item label="图书图片" prop='image' style='vertical-align: top;'>
							<el-upload class="avatar-uploader" action="/api/fileupload/imageupload" :show-file-list="false" :on-success="handleAvatarSuccess"
							 :before-upload="beforeAvatarUpload">
								<img v-if="imageUrl||form.image" :src="imageUrl||'/api/fileupload/getbook?image='+form.image" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
			
						</el-form-item>
					</el-col>
				</el-row>
			</el-tab-pane>
			</el-tabs>
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
				activeName: "first",
				imageUrl: null,
				form: {
					image: null,
					seriesName: null,
					isbn: null,
					author: null,
					summary: null,
					publicationTime: null,
					pageNum: null,
					themeWords: null,
					booksType: null,
					address: null,
					press: null,
					classification: null,
					
				},
				formRules: {
					bookName: [{
						required: true,
						message: '书名不能为空',
						trigger: 'blur'
					}],
					authorName: [{
						required: true,
						message: '作者不能为空',
						trigger: 'blur'
					}],
					isbn: [{
						required: true,
						message: 'ISBN不能为空',
						trigger: 'blur'
					}],
					summary: [{
						required: true,
						message: '图书简介不能为空',
						trigger: 'blur'
					}],
					ISBN: [{
						required: true,
						message: 'ISBN不能为空',
						trigger: 'blur'
					}],
					ISBN: [{
						required: true,
						message: 'ISBN不能为空',
						trigger: 'blur'
					}],
				},
			}
		},
		props: ['visible','item'],
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
					publicationTime: null,
					pageNum: null,
					themeWords: null,
					booksType: null,
					address: null,
					press: null,
					classification: null,
					
				}
				this.imageUrl = null;
				this.activeName = "first";
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$http.post("/books/update", this.form, true).then(
							(data) => {
								if (data > 0) {
									this.$message({
										message: "修改成功",
										type: 'success',
										duration: 2000
									})
									this.handleClose();
									this.$emit('submit');
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
			resetForm(formName) {
				this.clearForm();
				this.$refs[formName].resetFields();
			}
		},watch: {
			item(val) {
				this.form = { ...this.form,
					...this.item
				};
			}
		},
	}
</script>

<style>
</style>
