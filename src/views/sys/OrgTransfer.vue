<template>
	<div id='orgtransfer'>
		<el-dialog :close-on-click-modal="false" title="机构配置" :visible.sync="visible" width="30%" :before-close="handleClose">
			<el-tree :data="treeData" show-checkbox default-expand-all node-key="id" ref="tree" :check-strictly="true"
			 highlight-current :props="defaultProps"></el-tree>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogOkClick">保 存</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: ['dialogVisible', 'close', 'rowId'],
		data: function() {
			return {
				treeData: [],
				defaultProps: {
					children: 'children',
					label: 'orgName',
					id: 'id'
				}
			}
		},
		methods: {
			handleClose(done) {
				this.close();
			},
			dialogOkClick() {
				this.$http.post("/sys/setorgbyuserid", {
					userId: this.rowId,
					orgId: this.$refs.tree.getCheckedKeys()
				}, true).then(res => {
					console.log(res);
					this.$mm.success("保存成功");
				})
			},
			getData(id) {
				this.$http.all([{
						methods: 'get',
						url: '/sys/getallorg'
					},
					{
						methods: 'get',
						url: '/sys/getorgbyuserId',
						params: {
							id: id
						}
					},
				], true).then(res => {
					//console.log(res);
					if (res[0].status == 200 && res[0].data && res[0].data.status == 200) {
						this.treeData = this.formatMenu(res[0].data.data);
						//console.log(this.treeData);
					}
					if (res[1].status == 200 && res[1].data && res[1].data.status == 200 && res[1].data.data) {
						var orgIds = [];
						res[1].data.data.forEach((item) => {
							orgIds.push(item.id);
						})
						this.$refs.tree.setCheckedKeys(orgIds);
					}
				}).catch(err => {
					console.log(err);
				})

			},
			formatMenu(data) {
				var orgs = [];
				var result = [];
				data.forEach((item) => {
					var org = { ...item
					};
					//var org = {};

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
			}
		},
		watch: {
			'rowId': function(n, o) {
				if (this.rowId)
					this.getData(n);
			}
		},
		computed: {
			visible() {
				return this.dialogVisible;
			}

		},
		created() {},

	}
</script>

<style>
	/* #orgtransfer .el-tree {
		margin: 0 auto;
		width: 500px;
	} */
</style>
