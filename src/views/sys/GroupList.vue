<template>
	<div id='grouplist'>
		<div class="contr">
			<el-button type="add" :disabled='addStatus' @click="addButtonClick" size="small">新增组织</el-button>
		</div>
		<el-table :data="tableData">
			<el-table-column prop="id" label="组织编号" width="180px" align="center"></el-table-column>
			<el-table-column prop="groupName" label="组织名称" align="center">
				<template slot-scope="scope">
					<el-input v-model="addData.groupName" v-if="scope.row.action&&scope.row.action==2" />
					<el-input v-model="updateData.groupName" v-else-if="scope.row.id==updateData.id&&updateStatus" />
					<span v-else> {{scope.row.groupName}} </span>
				</template>
			</el-table-column>
			<el-table-column prop="action" label="操作"  align="center">
				<template slot-scope="scope">
					<template v-if="scope.row.action&&scope.row.action==2">
						<el-button type="primary" size="mini" @click="qdAdd">确定</el-button>
						<el-button size="mini" @click="qxAdd">取消</el-button>
					</template>
					<template v-else-if="!updateStatus">
						<el-button type="edit" size="mini" @click="dkUpdate(scope.row)">修改</el-button>
						<el-button type="del" size="mini" @click="dkDelete(scope.row)">删除</el-button>
						<el-button type="primary" size="mini" @click="cdqxButtonChick(scope.row)">菜单权限</el-button>
					</template>
					<template v-else-if="scope.row.id==updateData.id">
						<el-button type="primary"  size="mini" @click="qdUpdate">确定</el-button>
						<el-button size="mini" @click="qxUpdate">取消</el-button>
					</template>
				</template>
			</el-table-column>
		</el-table>

		<MenuGroupTransfer :row-id="mrowId" :dialogVisible="dialogVisible" :close="mtAfterClose" />
	</div>
</template>

<script>
	import MenuGroupTransfer from './MenuGroupTransfer.vue'
	export default {
		components: {
			MenuGroupTransfer
		},
		data() {
			return {
				mrowId: null,
				dialogVisible: false,
				addStatus: false,
				updateStatus: false,
				grouplist: [],
				tableData: [],
				addData: {
					id: null,
					groupName: null,
					enabled: true,
					locked: false
				},
				updateData: {
					id: null,
					groupName: null,
					enabled: true,
					locked: false
				}
			}
		},
		created() {
			this.getGroup();
		},
		methods: {
			getGroup() {
				this.$http.get("/sys/getallgroup", null, true).then((data) => {
					this.grouplist = data;
					this.tableData = this.grouplist.slice();
				}).catch((err) => {})
			},
			addButtonClick() {
				if (!this.addStatus) {
					this.addStatus = true;
					this.tableData.push({
						id: null,
						groupName: null,
						action: 2
					});
				}
			},
			qxAdd() {
				this.tableData = this.grouplist.slice();
				this.addStatus = false;
				this.addData = {
					id: null,
					groupName: null
				};
			},
			qdAdd() {
				this.$http.post("/sys/addgroup", this.addData, true).then((data) => {
					if (data == 1) {
						this.addData = {
							id: null,
							groupName: null,
							enabled: true,
							locked: false
						};
						this.$message({
							message: "组织添加成功",
							type: 'success',
							duration: 2000
						})
						this.addStatus = false;
						this.getGroup();
					}
				}).catch((err) => {

				});
			},
			dkUpdate(row) {
				this.updateStatus = true;
				this.updateData.id = row.id;
				this.updateData.groupName = row.groupName;
			},
			qxUpdate() {
				this.updateStatus = false;
				this.updateData.id = null;
				this.updateData.groupName = null;

			},
			qdUpdate() {
				this.$http.post("/sys/updategroup", this.updateData, true).then((data) => {
					if (data == 1) {
						this.updateData = {
							id: null,
							groupName: null,
							enabled: true,
							locked: false
						};
						this.$message({
							message: "组织修改成功",
							type: 'success',
							duration: 2000
						})
						this.updateStatus = false;
						this.getGroup();
					}
				}).catch((err) => {

				});
			},
			dkDelete(row) {
				this.$http.post('/sys/delgroup', row, true).then(res => {
					if (res == 1) {
						this.$mm.success("删除成功");
						this.getGroup();
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

	#grouplist>.el-table-column{
		min-width: 180px;
	}
</style>
