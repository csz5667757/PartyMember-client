<template>
	<div id='addMenu'>
		<el-form ref="form" :model="form" :rules="formRules" label-width="100px">
			<el-form-item label="菜单名称" prop="menuName">
				<el-input v-model="form.menuName"></el-input>
			</el-form-item>
			<el-form-item label="菜单层级" prop="menuType">
				<el-radio-group v-model="form.menuType" @change="menuTypeChange">
					<el-radio :label="1">一级</el-radio>
					<el-radio :label="2">二级</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="跳转路径">
				<el-input v-model="form.menuPath"></el-input>
			</el-form-item>
			<el-form-item label="排序">
				<el-input-number :min="1" v-model="form.menuSequence"></el-input-number>
			</el-form-item>
			<el-form-item label="图标" prop="menuIcon">
				<el-select v-model="form.menuIcon" placeholder="请选择图标" :disabled="menuIconDisabled" :clearable="true">
					<el-option v-for="(item) in $dic.getKV('iconlist')" :value="item.value" :key='item.value' :label="item.label">
						<span style="margin-right: 10px;"><i :class="item.value"></i></span>
						<span>{{item.label}}</span>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="上级菜单">
				<!-- <el-input-number :min="1" v-model="form.resourceSequence"></el-input-number> -->
				<el-select clearable v-model="form.pid" placeholder="请选择上级菜单" :disabled="pidDisabled">
					<el-option v-for="(item1) in menulist" :label="item1.menuName" :value="item1.id" :key='item1.id'></el-option>
				</el-select>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				menuIconDisabled: false,
				pidDisabled: true,
				form: {
					menuName: null,
					menuType: null,
					menuSequence: 0,
					menuIcon: null,
					pid: null,
				},
				formRules: {
					menuName: [{
						required: true,
						message: '菜单名不能为空',
						trigger: 'blur'
					}]
				}
			}
		},
		props: ['menulist', 'defaultMenuSequence', 'close'],
		methods: {
			menuTypeChange(value) {
				if (value == 1) {
					this.pidDisabled = true;
					this.form.pid = null;
				} else {
					this.pidDisabled = false;
					this.form.pid = null;
				}
			},
			addDialogOkClick(dialogVisible) {
				var data = { ...this.form
				};
				this.$http.post("/sys/addmenu", data, true).then(
					(data) => {
						if (data > 0) {
							this.$message({
								message: "菜单添加成功",
								type: 'success',
								duration: 2000
							})
							window.location.reload();
							this.clearform();
							this.close();
						} else {
							this.$message({
								message: "菜单添加失败，请联系管理员",
								type: 'error',
								duration: 2000
							})
						}
					}
				)
			},
			clearform() {
				this.form = {
					menuName: null,
					menuType: null,
					menuSequence: 0,
					menuIcon: null,
					pid: null,
				}
			}
		},
		created() {
			this.form.menuSequence = this.defaultMenuSequence;
		},

		watch: {
			'defaultMenuSequence': function(defaultMenuSequence, old) {
				this.form.menuSequence = defaultMenuSequence;
			}
		}
	}
</script>

<style>
	#addMenu {
		padding-right: 20px;
	}

	#addMenu i {
		color: #333333;
		margin-right: 10px;
	}

	#addMenu .el-select {
		width: 100%;
	}
</style>
