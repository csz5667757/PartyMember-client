<template>
	<div id='orgupdate'>
		<el-dialog :close-on-click-modal="false" title="编辑机构" :visible.sync="visible" width="30%" :before-close="handleClose">
			<el-form ref="form" :rules="formRules" :model="form" label-width="100px">
				<el-form-item label="机构名称" prop="roleName">
					<el-input v-model="form.orgName"></el-input>
				</el-form-item>
				<el-form-item label="上级机构" prop="pid">
					<el-cascader v-model="form.pid" :options="orgoptions" :change-on-select="true"></el-cascader>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogOkClick">保 存</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: ['orgInfo', 'dialogVisible', 'allOrg'],
		components: {


		},
		data: function() {
			return {
				form: {
					id: null,
					orgName: null,
					pid: []
				},
				formRules: {
					roleName: [{
						required: true,
						message: '机构名称不能为空'
					}]
				},
				orgoptions: []
			}
		},
		created() {

		},
		watch: {
			'allOrg': function(n, o) {
				this.orgoptions = this.formatOrg();
			},
			'orgInfo': function(n, o) {
				if (this.dialogVisible) {
					//this.form = {...this.form,...n};
					this.form.id = n.id;
					this.form.orgName = n.orgName;
					if (n.pid != null) {
						var pids = [];
						pids.push(n.pid);
						this.getPids(this.allOrg, n.pid, pids)
						pids.reverse()
						this.form.pid = pids;
					}
				}
			}
		},
		computed: {
			visible: function() {
				return this.dialogVisible;
			},
			// 			orgoptions:function(){
			// 				if(this.dialogVisible){
			// 					return this.formatOrg();
			// 				}
			// 				return [];
			// 			}
		},
		methods: {
			handleClose(done) {
				this.$emit('close');
			},
			dialogOkClick() {
				var pid = null;
				if (this.form.pid && this.form.pid.length > 0) {
					pid = this.form.pid[this.form.pid.length - 1];
				}
				this.$http.post("/sys/updateorg", {
					orgName: this.form.orgName,
					pid,
					enabled: true,
					locked: false,
					id: this.form.id
				}, true).then(res => {
					if (res >= 1) {
						this.$mm.success("机构修改成功");
						this.$emit('close', true);
					} else {
						this.$mm.error("机构修改失败");
					}
				})
			},
			formatOrg() {
				//console.log(this.allOrg)
				var orgs = [];
				var result = [];
				if (!this.allOrg)
					return [];
				this.allOrg.forEach((item) => {
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
				return result;
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
			getPids(orgs, pid, pids) {
				orgs.forEach(org => {
					if (org.id == pid && org.pid != null) {
						pids.push(org.pid);
						this.getPids(orgs, org.pid, pids);
					}
				})
			}
		}
	}
</script>

<style>
	#orgupdate .el-dialog{
		padding-right: 30px;
	}

	#orgupdate .el-cascader {
		width: 100%;
	}
</style>
