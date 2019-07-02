<template>
	<div id="orglist">
		<el-row :gutter="20">
			<el-col :span="6">
				<div>
					<el-tree :data="treeData" node-key="id" default-expand-all :expand-on-click-node="false" @current-change="treeCheckChange">
						<span slot-scope="{ node, data }">{{data.orgName}}</span>
					</el-tree>
				</div>
			</el-col>
			<el-col :span="18">
				<div>
					<el-button type="add" @click="dialogVisible=true" size="small">新增机构</el-button>
					<el-button type="primary" plain @click="refarsh" size="small">刷新</el-button>
				</div>
				<el-table :data="tableData" row-key="id">
					<el-table-column prop="id" label="ID" min-width="50" align="center"></el-table-column>
					<el-table-column prop="orgName" label="机构名称" align="center"></el-table-column>
					<el-table-column prop="pid" label="上级机构ID" align="center"></el-table-column>
					<el-table-column prop="pOrgName" label="上级机构" width="180" align="center"></el-table-column>
					<el-table-column prop="action" label="操作" min-width="240" align="center">
						<template slot-scope="scope">
							<el-button type="edit" size="small" @click="editButtonChick(scope.row)">编辑</el-button>
							<el-button type="del" size="small" @click="delButtonChick(scope.row)">删除</el-button>
							<el-button type="primary" size="small" @click="cdqxButtonChick(scope.row)">菜单权限</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<el-dialog :close-on-click-modal="false" title="新增机构" :visible.sync="dialogVisible" width="30%" :before-close="addhandleClose">
			<span>
				<OrgAdd ref="OrgAdd" :allorg="allOrg" v-on:visibleChanged="visibleChanged"></OrgAdd>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addDialogOkClick">确 定</el-button>
			</span>
		</el-dialog>
		<MenuOrgTransfer :row-id="mrowId" :dialogVisible="dialogVisible2" :close="mtAfterClose" />
		<OrgUpdate :dialogVisible="dialogVisible3" :org-info="orgInfo" @close="orgUpdateClose" :all-org="allOrg" />
	</div>
</template>

<script>
	import OrgAdd from './OrgAdd.vue';
	import OrgUpdate from './OrgUpdate.vue';
	import MenuOrgTransfer from './MenuOrgTransfer.vue';
	export default {
		components: {
			OrgAdd,
			OrgUpdate,
			MenuOrgTransfer
		},
		data: function() {
			return {
				mrowId: null,
				dialogVisible: false,
				dialogVisible2: false,
				dialogVisible3: false,
				orgInfo: null,
				allOrg: [],
				tableData: [],
				treeData: []
			}
		},
		methods: {
			addhandleClose(done) {
				done();
			},
			addhandleClose2(done) {
				done();
			},
			visibleChanged() {
				this.dialogVisible = !this.dialogVisible;
				this.getAllOrg();
			},
			addDialogOkClick() {
				//this.dialogVisible = !this.$refs.OrgAdd.submit();
				this.$refs.OrgAdd.submit();
			},
			addDialogOkClick2() {},
			/**
			 * 角色配置按钮点击事件
			 */
			jspzButtonChick(row) {
				this.dialogVisible2 = true;
			},
			formatOrg(data) {
				var orgs = [];
				var result = [];
				data.forEach((item) => {
					var org = { ...item
					};
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
						item.pOrgName = org.orgName;
						children.push(item);
					}
				})
				return children;
			},
			getAllOrg() {
				this.$http.get("/sys/getallorg", null, true).then(res => {
					this.allOrg = res;
					this.treeData = this.formatOrg(res);
					//this.tableData = JSON.parse(JSON.stringify(this.treeData));
				})
			},
			mtAfterClose() {
				this.dialogVisible2 = false;
				this.mrowId = null;
			},
			cdqxButtonChick(row) {
				this.dialogVisible2 = true;
				this.mrowId = row.id;
			},
			treeCheckChange(data, node) {
				this.tableData = JSON.parse(JSON.stringify(data.children));
				console.log(this.tableData);
			},
			refarsh() {
				this.getAllOrg();
			},
			editButtonChick(row) {
				this.dialogVisible3 = true;
				this.orgInfo = row;
			},
			orgUpdateClose(a) {
				this.dialogVisible3 = false;
				this.orgInfo = null;
				if (a)
					this.getAllOrg();

			},
			delButtonChick(row) {
				this.$http.post("/sys/delorg", row, true).then(res => {
					if (res >= 1) {
						this.$mm.success("删除成功");
						this.getAllOrg();
					} else {
						this.$mm.error("删除失败");
					}
				}).catch(err => {

				})
			}
		},
		created() {
			this.getAllOrg();
		}
	}
</script>

<style>
	#orglist .el-row>.el-col:first-child>div {
		padding: 10px;
		border: solid 1px #dadada;
		min-height: 500px;
	}

	#orglist .el-tree-node__content {
		height: 30px;
	}

	#orglist .el-table-column {
		min-width: 180px;
	}

	#orglist .el-table {
		margin-top: 20px;
	}
</style>
