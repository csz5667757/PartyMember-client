<template>
	<div id='rolelist'>
		<div>
			<el-button type="add" :disabled='addStatus' @click="addButtonClick" size="mini">新增角色</el-button>
		</div>
		<el-table :data="tableData">
			<el-table-column prop="id" label="角色编号" align="center" width="180px"></el-table-column>
			<el-table-column prop="roleName" label="角色名称" align="center">
				<template slot-scope="scope">
					<el-input v-model="addData.roleName" v-if="scope.row.action&&scope.row.action==2" />
					<el-input v-model="updateData.roleName" v-else-if="scope.row.id==updateData.id&&updateStatus" />
					<span v-else> {{scope.row.roleName}} </span>
				</template>
			</el-table-column>
			<el-table-column prop="action" label="操作"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.action&&scope.row.action==2">
						<el-button type="primary" size="mini" @click="qdAdd">确定</el-button>
						<el-button size="mini" @click="qxAdd">取消</el-button>
					</template>
					<template v-else-if="!updateStatus">
						<el-button type="edit" size="mini"  @click="dkUpdate(scope.row)">修改</el-button>
						<el-button type="del" size="mini"  @click="dkDelete(scope.row)">删除</el-button>
						<el-button type="primary" size="mini" @click="cdqxButtonChick(scope.row)">菜单权限</el-button>
					</template>
					<template v-else-if="scope.row.id==updateData.id">
						<el-button type="primary" size="mini" @click="qdUpdate">确定</el-button>
						<el-button size="mini" @click="qxUpdate">取消</el-button>
					</template>
				</template>
			</el-table-column>
		</el-table>

		<MenuRoleTransfer :row-id="mrowId" :dialogVisible="dialogVisible" :close="mtAfterClose" />
	</div>
</template>

<script>
	import MenuRoleTransfer from './MenuRoleTransfer.vue';
	export default {
		components: {
			MenuRoleTransfer
		},
		data() {
			return {
				mrowId: null,
				dialogVisible: false,
				addStatus: false,
				updateStatus: false,
				rolelist: [],
				tableData: [],
				addData: {
					id: null,
					roleName: null,
					enabled: true,
					locked: false
				},
				updateData: {
					id: null,
					roleName: null,
					enabled: true,
					locked: false
				}
			}
		},
		created() {
			this.getRole();
		},
		methods: {
			getRole() {
				this.$http.get("/sys/getallrole", null, true).then((data) => {
					this.rolelist = data;
					this.tableData = this.rolelist.slice();
				}).catch((err) => {})
			},
			addButtonClick() {
				if (!this.addStatus) {
					this.addStatus = true;
					this.tableData.push({
						id: null,
						roleName: null,
						action: 2
					});
				}
			},
			qxAdd() {
				this.tableData = this.rolelist.slice();
				this.addStatus = false;
				this.addData = {
					id: null,
					roleName: null
				};
			},
			qdAdd() {
				this.$http.post("/sys/addrole", this.addData, true).then((data) => {
					if (data == 1) {
						this.addData = {
							id: null,
							roleName: null,
							enabled: true,
							locked: false
						};
						this.$mm.success("角色添加成功");
						this.addStatus = false;
						this.getRole();
					}
				}).catch((err) => {

				});
			},
			dkUpdate(row) {
				this.updateStatus = true;
				this.updateData.id = row.id;
				this.updateData.roleName = row.roleName;
			},
			qxUpdate() {
				this.updateStatus = false;
				this.updateData.id = null;
				this.updateData.roleName = null;

			},
			qdUpdate() {
				this.$http.post("/sys/updaterole", this.updateData, true).then((data) => {
					if (data == 1) {
						this.updateData = {
							id: null,
							roleName: null,
							enabled: true,
							locked: false
						};
						this.$mm.success("角色修改成功");
						this.updateStatus = false;
						this.getRole();
					}
				}).catch((err) => {

				});
			},
			dkDelete(row) {
				this.$http.post('/sys/delrole', row, true).then(res => {
					if (res == 1) {
						this.$mm.success("角色删除成功");
						this.getRole();
					}
				})
			},
			mtAfterClose() {
				this.dialogVisible = false;
				this.mrowId = null;
			},
			cdqxButtonChick(row) {
				this.dialogVisible = true;
				this.mrowId = row.id;
			}
		}
	}
</script>

<style>
	#rolelist>div:first-child {
		margin-bottom: 20px;
	}
	#rolelist>el-table .el-table-column{
		min-width: 200px;
	}
</style>
