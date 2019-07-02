<template>
	<div id='orgadd'>
		<el-form ref="form" :rules="formRules" :model="form" label-width="100px">
			<el-form-item label="机构名称" prop="roleName">
				<el-input v-model="form.orgName"></el-input>
			</el-form-item>
			<el-form-item label="上级机构" prop="pid">
				<el-cascader v-model="form.pid" :options="orgoptions" :change-on-select="true"></el-cascader>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		components: {},
		props: ['allorg'],
		data: function() {
			return {
				form: {
					roleName: null,
					orgName: null
				},
				formRules: {
					roleName: [{
						required: true,
						message: '机构名称不能为空',
						trigger: 'blur'
					}]
				},
				orgoptions: []
			}
		},
		methods: {
			cleanForm() {
				this.form = {
					roleName: null,
					orgName: null
				}
			},
			submit() {
				var pid = null;
				if (this.form.pid && this.form.pid.length > 0) {
					pid = this.form.pid[this.form.pid.length - 1];
				}
				this.$http.post("/sys/addorg", {
					orgName: this.form.orgName,
					pid,
					enabled: true,
					locked: false
				}, true).then(res => {
					if (res == 1) {
						this.$message({
							message: "机构添加成功",
							type: 'success',
							duration: 2000
						})
						this.cleanForm();
						this.$emit("visibleChanged");
					} else {
						this.$message({
							message: "机构添加失败",
							type: 'error',
							duration: 2000
						})
					}
				})
			},
			formatOrg() {
				var orgs = [];
				var result = [];
				this.allorg.forEach((item) => {
					var org = { ...item
					};
					org.value = item.id;
					org.label = item.orgName;
					orgs.push(org);
				})
				orgs.forEach((item) => {
					item.children = this.getChildren(orgs, item);
				})
				orgs.forEach((item) => {
					if (!item.notop)
						result.push(item);
				})
				this.orgoptions = result;
			},
			getChildren(orgs, org) {
				var children = null;
				orgs.forEach((item) => {
					if (item.pid === org.id) {
						if (!children)
							children = [];
						item.notop = true;
						children.push(item);
					}
				})
				return children;
			},

		},
		computed: {
			lvlOrg: function() {
				//console.log(this.allorg);
				return null;
			}
		},
		created() {
			this.formatOrg();
		}
	}
</script>

<style>
	#orgadd {
		padding-right: 30px;
	}
	#orgadd .el-cascader{
		width: 100%;
	}
</style>
