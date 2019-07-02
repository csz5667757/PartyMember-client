<template>
	<div id='menuedit'>
		<el-dialog :close-on-click-modal="false" title="编辑菜单" :visible.sync="visible" width="30%" :before-close="handleClose">
			<el-form ref="form" :model="form" label-width="100px">
				<el-form-item label="菜单名称">
					<el-input v-model="form.menuName"></el-input>
				</el-form-item>
				<el-form-item label="菜单层级">
					<el-radio-group v-model="form.menuType" @change="menuTypeChange">
						<el-radio label="1">一级</el-radio>
						<el-radio label="2">二级</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="跳转路径">
					<el-input v-model="form.menuPath"></el-input>
				</el-form-item>
				<el-form-item label="排序">
					<el-input-number :min="1" v-model="form.menuSequence"></el-input-number>
				</el-form-item>
				<el-form-item label="图标">
					<el-select v-model="form.menuIcon" placeholder="请选择图标" :disabled="menuIconDisabled" :clearable="true">
						<el-option v-for="(item) in $dic.getKV('iconlist')" :value="item.value" :key='item.value' :label="item.label">
							<span style="margin-right: 10px;"><i :class="item.value"></i></span>
							<span>{{item.label}}</span>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="上级菜单">
					<el-select clearable v-model="form.pid" placeholder="请选择上级菜单" :disabled="pidDisabled">
						<template v-for="(item1) in menuSelect">
							<el-option :label="item1.menuName" :value="item1.id" :key='item1.id'></el-option>
						</template>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogOkClick">确 定</el-button>
			</span>
		</el-dialog>
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
				}
			}
		},
		props: ['menuSelect', 'dialogVisible', 'close', 'formData'],
		methods: {
			dialogOkClick() {
				this.$http.post("/sys/updatemenuinfo", this.form, true).then(res => {
					this.$mm.success("菜单信息修改成功");
					this.close(true);
				})
			},
			handleClose(done) {
				this.close();
			},
			menuTypeChange(value) {
				if (value == 1) {
					this.pidDisabled = true;
					this.form.pid = null;
				} else {
					this.pidDisabled = false;
					this.form.pid = this.formData.pid;
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
						} else {
							this.$message({
								message: "菜单添加失败，请联系管理员",
								type: 'error',
								duration: 2000
							})
						}
					}
				)
			}
		},
		created() {
			this.form.menuSequence = this.defaultMenuSequence;
		},

		watch: {
			'defaultMenuSequence': function(defaultMenuSequence, old) {
				this.form.menuSequence = defaultMenuSequence;
			},
			'formData': function(n, o) {
				if (n) {
					this.form = { ...this.form,
						...n
					};
					this.menuTypeChange(this.form.menuType);
				}
			}
		},
		computed: {
			visible: function() {
				return this.dialogVisible;
			}

		},

	}
</script>

<style>
	#menuedit {
		padding-right: 20px;
	}

	#menuedit .el-select {
		width: 100%;
	}
</style>
