<template>
	<el-dialog :visible.sync="visible" title='新增' :before-close="handleClose" width="50%" :close-on-click-modal='false'>
		<el-form ref="form" :model="form" :rules="formRules" label-width="100px">
			<el-row>
				<el-col :span='12'>
					<el-form-item label="姓名" prop="name">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="性别" prop='sex'>
						<!-- 单选框 -->
						<el-radio-group v-model="form.sex">
							<el-radio :label="1">男</el-radio>
							<el-radio :label="2">女</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="户口性质" prop="hkType">
						<!-- 数据字典下拉框 -->
						<dic-select :allow-null='false' keyword="hkxz" v-model="form.hkType"></dic-select>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="出生日期" prop="birthday">
						<!-- 日期选择框 -->
						<el-date-picker v-model="form.birthday" type="date" placeholder="请选择日期"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="年龄" prop="age">
						<!-- 数字选择框 -->
						<el-input-number :min='18' v-model="form.age"></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="籍贯" prop='nativePlace'>
						<!-- 行政区域 -->
						<area3-cascader v-model="form.nativePlace"></area3-cascader>
					</el-form-item>
				</el-col>
				<!-- <el-col :span='12'>
					<el-form-item label="房屋名称">
						<house-search v-model='form.houseId'></house-search>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="居民选择">
						<person-search v-model='form.personId'></person-search>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label='居民姓名'>
						<person-input v-model='form.person' :valueType='2'></person-input>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label='工作类型'>
						<jobs-cascader v-model='form.jobs'></jobs-cascader>
					</el-form-item>
				</el-col> -->
				<el-col :span='24'>
					<el-form-item label='内容'>
						<text-editor v-model='form.content'></text-editor>
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
					name: null,
					sex: null,
					hkType: null,
					birthday: null,
					age: null,
					nativePlace: null,
					houseId: null,
					personId: null,
					person: null,
					content: null, //{html:'',text:''}
					jobs: null,
				},
				formRules: {
					name: [{
						required: true,
						message: '姓名不能为空',
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
					name: null,
					sex: null,
					hkType: null,
					birthday: null,
					age: null,
					nativePlace: null,
					houseId: null,
					personId: null,
					person: null,
					content: null, //{html:'',text:''}
					jobs: null,
				}
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$notify({
							message: JSON.stringify(this.form)
						})
						/* this.$http.post("/community/add", this.form, true).then(
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
						) */
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
</style>
