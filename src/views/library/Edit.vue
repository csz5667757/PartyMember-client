<template>
	<el-dialog :visible.sync="visible" title='修改' :before-close="handleClose" width="50%" :close-on-click-modal='false'>
		<el-form ref="form" :model="form" :rules="formRules" label-width="100px">
			<el-tabs v-model="activeName" >
				<el-tab-pane label="基本信息" name="first">
					<el-row>
						<el-col :span='12'>
							<el-form-item label="图书馆名称" prop="libraryName">
								<el-input v-model="form.libraryName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='12'>
							<el-form-item label="图书馆编号" prop='libraryNo'>
								<el-input v-model="form.libraryNo"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='12'>
							<el-form-item label="权限代码" prop="authorityNo">
								<el-input v-model="form.authorityNo"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='12'>
							<el-form-item label="所属行政区" prop="areaId">
								<!-- 行政区域 -->
								<area3-cascader v-model="form.areaId"></area3-cascader>
							</el-form-item>
						</el-col>
						<el-col :span='18'>
							<el-form-item label="地址" prop="address">
								<el-input v-model="form.address"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='24'>
							<el-form-item label="图书馆简介" prop='content'>
								<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.content"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="图片上传" name="second">
					<el-row>
						<el-col :span="12">
							<el-form-item label="宣传图片" prop='image' style='vertical-align: top;'>
								<el-upload class="avatar-uploader" action="/api/fileupload/imageupload" :show-file-list="false" :on-success="handleAvatarSuccess"
								 :on-error="handleAvatarError" :before-upload="beforeAvatarUpload" style='margin:0px 0 -8px 30px;'>
									<img v-if="imageUrl||form.image" :src="imageUrl||'/api/fileupload/getlibrary?image='+form.image" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="图书馆logo" prop='logo' style='vertical-align: top;'>
								<el-upload class="avatar-uploader" action="/api/fileupload/imageupload" :show-file-list="false" :on-success="handleAvatarSuccess2"
								 :on-error="handleAvatarError" :before-upload="beforeAvatarUpload" style='margin:0px 0 -8px 30px;'>
									<img v-if="imageUrl2||form.logo" :src="imageUrl2||'/api/fileupload/getlibrary?image='+form.logo" class="avatar">
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
		</span>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				activeName: "first",
				form: {
					libraryName:null,
					libraryNo:null,
					authorityNo:null,
					areaId:null,
					address:null,
					content:null,
					image:null,
					logo:null,
				},
				formRules: {
					libraryName: [{
						required: true,
						message: '名称不能为空',
						trigger: 'blur'
					}],
					libraryNo: [{
						required: true,
						message: '编号不能为空',
						trigger: 'blur'
					}],
					authorityNo: [{
						required: true,
						message: '权限代码不能为空',
						trigger: 'blur'
					}],
					areaId: [{
						required: true,
						message: '行政区不能为空',
						trigger: 'blur'
					}],
					address: [{
						required: true,
						message: '地址不能为空',
						trigger: 'blur'
					}],
				},
				imageUrl:null,
				imageUrl2:null,
			}
		},
		props: ['visible', 'item'],
		methods: {
			handleClose() {
				this.$emit('close');
			},
			clearForm() {
				this.form = {
					libraryName:null,
					libraryNo:null,
					authorityNo:null,
					areaId:null,
					address:null,
					content:null,
					image:null,
					logo:null,
				}
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
			handleAvatarSuccess2(res, file, fileList) {
				if (res.status === 200 && res.data) {
					this.imageUrl2 = URL.createObjectURL(file.raw);
					this.form.logo = res.data;
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
						this.$http.post("/library/update", this.form, true).then(
							(data) => {
								if (data > 0) {
									this.$message({
										message: "修改成功",
										type: 'success',
										duration: 2000
									})
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
				this.clearForm();
				this.$refs[formName].resetFields();
			}
		},
		watch: {
			item(val) {
				this.form = { ...this.form,
					...this.item
				};
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
