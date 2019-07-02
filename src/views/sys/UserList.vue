<template>
	<div id='userlist'>
		<el-form class='search' inline size="small">
			<el-form-item label="登陆账户">
				<el-input size='small' v-model="userName"></el-input>
			</el-form-item>
			<el-form-item label="真实姓名">
				<el-input v-model="realName" size="small" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="search" size="small">搜索</el-button>
			</el-form-item>
		</el-form>
		<el-row class='conrow'>
			<el-col :span='8'>
				<el-button type="add" @click="dialogVisible=true" size="small">新增用户</el-button>
				<!-- <el-button type="warning" plain size="small">编辑</el-button> -->
				<!-- <el-button type="danger" plain size="small">删除</el-button> -->
				<!-- 			</el-col>
			<el-col :span='8' :push="8"> -->
				<el-button v-if="plcz" type="danger" icon="el-icon-refresh" @click="dllrefreshpassword" size="small">重置密码</el-button>
				<el-button v-if="!plcz" type="warning" icon="el-icon-more" @click="plcz=!plcz" size="small">批量操作</el-button>
				<el-button v-if="plcz" type="warning" @click="plcz=!plcz" size="small">取消批量操作</el-button>
			</el-col>
		</el-row>
		<el-table @selection-change="handleSelectionChange" :data="pageInfo.list" style="width: 100%;">
			<el-table-column v-if="plcz" type="selection" width="48"></el-table-column>
			<el-table-column prop="userName" label="登陆账户" min-width="100px"></el-table-column>
			<el-table-column prop="realName" label="真实姓名" min-width="100px"></el-table-column>
			<el-table-column prop="email" label="电子邮箱" align='center' min-width="180px"></el-table-column>
			<el-table-column prop="phone" label="联系电话" align='center' min-width="180px"></el-table-column>
			<el-table-column prop="enabled" label="状态" align='center'>
				<template slot-scope="scope">
					<el-tag v-if="scope.row.enabled==1" type="success" size="mini">已激活</el-tag>
					<el-tag v-else type="danger" size="mini">未激活</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="action" label="操作" min-width="400px" align='center'>
				<template slot-scope="scope">
					<el-button type="edit" size="mini" @click="editButtonChick(scope.row)">编辑</el-button>
					<el-button v-if="scope.row.enabled==1" type="danger" plain size="mini" @click="enableButtonChick(scope.row.id,0)">失效</el-button>
					<el-button v-else type="success" size="mini" @click="enableButtonChick(scope.row.id,1)">激活</el-button>
					<el-button type="primary" size="mini" @click="cdqxButtonChick(scope.row)">菜单权限</el-button>
					<el-dropdown size="mini" split-button type="primary" @command="handleCommand">
						更多配置
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item :command="{type:1,row:scope.row}">机构配置</el-dropdown-item>
							<el-dropdown-item :command="{type:2,row:scope.row}">角色配置</el-dropdown-item>
							<el-dropdown-item :command="{type:3,row:scope.row}">组织配置</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>
		<div class="elpagination">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum"
			 :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
			</el-pagination>
		</div>

		<el-dialog :close-on-click-modal="false" title="新增用户" :visible.sync="dialogVisible" width="30%" :before-close="addhandleClose">
			<span>
				<AddUser ref="addUser" :dialogVisible="dialogVisible" v-on:visibleChanged="visibleChanged1"></AddUser>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addDialogOkClick">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog :close-on-click-modal="false" title="修改用户信息" :visible.sync="dialogVisible2" width="30%" :before-close="updatehandleClose">
			<span>
				<UpdateUser :oldUserInfo="oldUserInfo" ref="updateUser" :dialogVisible="dialogVisible2" v-on:visibleChanged="dialogVisible2=!dialogVisible2"></UpdateUser>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="updateDialogOkClick">确 定</el-button>
			</span>
		</el-dialog>

		<MenuTransfer :row-id="mrowId" :dialogVisible="dialogVisible3" :close="mtAfterClose" />
		<OrgTransfer :row-id="orowId" :dialogVisible="dialogVisible4" :close="jgpzAfterClose" />
		<RoleUserTransfer :row-id="jrowId" :dialogVisible="dialogVisible5" :close="jspzAfterClose" />
		<GroupTransfer :row-id="growId" :dialogVisible="dialogVisible6" :close="zzpzAfterClose" />
	</div>
</template>

<script>
	import AddUser from './addUser.vue';
	import UpdateUser from './UpdateUser.vue';
	import MenuTransfer from './MenuUserTransfer.vue';
	import OrgTransfer from './OrgTransfer.vue';
	import RoleUserTransfer from './RoleUserTransfer.vue';
	import GroupTransfer from './GroupTransfer.vue';
	export default {
		components: {
			AddUser,
			UpdateUser,
			MenuTransfer,
			OrgTransfer,
			RoleUserTransfer,
			GroupTransfer
		},
		data() {
			return {
				mrowId: -1,
				orowId: -1,
				jrowId: -1,
				growId: -1,
				dialogVisible: false,
				dialogVisible2: false,
				dialogVisible3: false,
				dialogVisible4: false,
				dialogVisible5: false,
				dialogVisible6: false,
				plcz: false,
				pageInfo: {},
				userName: null,
				realName: null,
				pageSize: 10,
				queryCache: {
					userName: null,
					realName: null,
				},
				oldUserInfo: {
					id: null,
					userName: null,
					password: null,
					password2: null,
					realName: null,
					email: null,
					phone: null,
					enabled: true,
				},
				multipleSelection: [],
			}
		},
		created() {
			this.getUsers(1, 10);
		},
		methods: {

			visibleChanged1() {
				this.dialogVisible = !this.dialogVisible;
				this.getUsers(1, 10);
			},
			/**
			 * 批量重置密码
			 */
			dllrefreshpassword() {
				var ids = [];
				this.multipleSelection.forEach((item) => {
					ids.push(item.id);
				})
				this.$http.post("/sys/dllinitializationpassword", ids, true).then((data) => {
					if (data == 1) {
						this.$message({
							message: '重置成功',
							type: 'success',
							duration: 2000
						})
					}
				}).catch((err) => {

				})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			enableButtonChick(id, enabled) {
				var data = {
					id,
					enabled
				};
				this.$http.post("/sys/setuserenabled", data, true).then((data) => {
					if (data == 1) {
						this.getUsers(this.pageInfo.pageNum, this.pageSize, this.queryCache.userName, this.queryCache.realName)
					}
				}).catch((err) => {

				})
			},
			/*编辑按钮点击事件*/
			editButtonChick(row) {
				this.oldUserInfo = row;
				this.oldUserInfo.enabled = row.enabled == 1 ? true : false;
				this.dialogVisible2 = true;

			},
			/*新增用户窗口关闭前监听事件*/
			addhandleClose(done) {
				//console.log("handleClose")
				this.$refs.addUser.cleanForm();
				done();
			},
			/*修改用户窗口关闭前监听事件*/
			updatehandleClose(done) {
				this.$refs.updateUser.cleanForm();
				done();
			},
			/*新增用户窗口点击确定事件*/
			addDialogOkClick() {
				this.$refs.addUser.submit();
			},
			/*修改用户窗口点击确定事件*/
			updateDialogOkClick() {
				this.$refs.updateUser.submit();
			},
			search() {
				const {
					userName,
					realName,
					pageSize
				} = this;
				this.queryCache.userName = userName;
				this.queryCache.realName = realName;
				this.getUsers(1, pageSize, userName, realName);
			},
			handleSizeChange(val) {
				this.pageSize = val;
				const {
					userName,
					realName
				} = this.queryCache;
				this.getUsers(this.pageInfo.pageNum, val, userName, realName);
			},
			handleCurrentChange(val) {
				const {
					userName,
					realName
				} = this.queryCache;
				this.getUsers(val, this.pageInfo.pageSize, this.userName, this.realName);
			},
			getUsers(pageNum, pageSize, userName, realName) {
				this.$http.get("/sys/getuser", {
					pageNum,
					pageSize,
					userName,
					realName
				}, true).then((data) => {
					this.pageInfo = data;
				}).catch((err) => {})
			},
			cdqxButtonChick(row) {
				this.dialogVisible3 = true;
				this.mrowId = row.id;
			},
			mtAfterClose() {
				this.dialogVisible3 = false;
				this.mrowId = null;
			},
			jgpzButtonChick(row) {
				this.dialogVisible4 = true;
				this.orowId = row.id;
			},
			jgpzAfterClose() {
				this.dialogVisible4 = false;
				this.orowId = null;
			},
			jspzAfterClose() {
				this.dialogVisible5 = false;
				this.jrowId = null;
			},
			zzpzAfterClose() {
				this.dialogVisible6 = false;
				this.growId = null;
			},
			handleCommand(com) {
				if (com.type === 1) {
					this.jgpzButtonChick(com.row);
				}
				if (com.type === 2) {
					this.dialogVisible5 = true;
					this.jrowId = com.row.id;
				}
				if (com.type === 3) {
					this.dialogVisible6 = true;
					this.growId = com.row.id;
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	#userlist {
		font-size: 14px;
	}

	#userlist>div:first-child {
		padding-bottom: 18px;
		border-bottom: dotted 2px #dadada;
	}

	#userlist>div:first-child .el-input {
		margin: 0 10px 0 5px;
		width: 150px;
	}

	#userlist>.el-row {
		margin: 20px 0;
	}

	.elpagination {
		margin-top: 10px;
	}

	.actionbox {
		/* padding: 8px 16px; */
		background-color: #ecf8ff;
		border-radius: 4px;
		border-left: 5px solid #50bfff;
		/* margin: 20px 0; */
	}
</style>
