<template>
	<el-dialog :visible.sync="visible" title='修改' :before-close="handleClose" width="50%" :close-on-click-modal='false'>
		<el-form ref="form" :model="form" :rules="formRules" label-width="100px">
			<el-tabs v-model="activeName">
				<el-tab-pane label="活动信息" name="first">
					<el-row>
						<el-col :span='20'>
							<el-form-item label="活动名称" prop="title">
								<el-input v-model="form.title"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='20'>
							<el-form-item label="活动地址" prop="address">
								<el-input v-model="form.address"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="16">
							<el-form-item label="活动时间" prop="time" >
								<el-date-picker v-model="form.time" type="datetimerange" range-separator="至" start-placeholder="开始日期"
								 end-placeholder="结束日期"  @change="setTime(form.time)">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="活动状态" prop='actStatus'>
								<dic-select :allow-null='false' keyword="hdzt" v-model="form.actStatus"></dic-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col>
							<el-form-item label="活动简介" prop='content'>
								<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.content">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="宣传图片" name="image">
					<el-row>
						<el-col>
							<el-form-item label="宣传图片" prop='image' style='vertical-align: top;'>
								<el-upload class="avatar-uploader" action="/api/fileupload/imageupload" :show-file-list="false" :on-success="handleAvatarSuccess"
								 :on-error="handleAvatarError" :before-upload="beforeAvatarUpload" style='margin:0px 0 -8px 30px;'>
									<img v-if="imageUrl||form.image" :src="imageUrl||'/api/fileupload/getactivity?image='+form.image" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="活动详情" name="details">
					<el-row>
						<el-col :span='24'>
							<el-form-item label='活动内容' prop="details">
								<text-editor v-model='form.details' style="height: 300px;"></text-editor>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</el-form>
		{{form}}
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click='submitForm("form")'>确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first',
				imageUrl: '',
				form: {
					time: [],
					title: null,
					address: null,
					startTime: null,
					endTime: null,
					actStatus: null,
					content: null,
					image: null,
					details: null,
				},
				formRules: {
					title: [{
						required: true,
						message: '活动名称不能为空',
						trigger: 'blur'
					}],
					address: [{
						required: true,
						message: '活动地址不能为空',
						trigger: 'blur'
					}],
					time: [{
						required: true,
						message: '请选择日期',
						trigger: 'blur'
					}],
					actStatus: [{
						required: true,
						message: '活动状态不能为空',
						trigger: 'blur'
					}],
					content: [{
						required: true,
						message: '活动简介不能为空',
						trigger: 'blur'
					}],
					image: [{
						required: true,
						message: '宣传图片不能为空',
						trigger: 'blur'
					}],
					details: [{
						required: true,
						message: '活动详情不能为空',
						trigger: 'blur'
					}],
				}
			}
		},
		props: ['visible', 'item'],
		methods: {
			setTime(item){
				this.form.startTime = item[0];
				this.form.endTime = item[1];
			},
			handleClose() {
				this.$emit('close');
			},
			clearForm() {
				this.form = {
					time: [],
					title: null,
					address: null,
					startTime: null,
					endTime: null,
					actStatus: null,
					content: null,
					image: null,
					details: null,
				}
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
						this.$http.post("/activity/update", this.form, true).then(
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
				this.form.time = [this.form.startTime, this.form.endTime];
			},
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
