<template>
	<div id='menulist'>
		<el-row>
			<el-col :span='8'>
				<el-button type="add" @click="dialogVisible=true" size="small">新增菜单</el-button>
			</el-col>
		</el-row>
		<el-table :data="parents" style="width: 100%" row-key="id" :load="load">
			<el-table-column prop="menuName" label="菜单名称" width="180px" header-align='center'>
				<template slot-scope="scope">
					<i :class="scope.row.menuIcon"></i>
					<span style="margin-left: 10px,margin-right: 5px">{{ scope.row.menuName }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="menuPath" label="跳转路径" align='center'></el-table-column>
			<el-table-column prop="menuSequence" label="排序" width="100px" align='center'></el-table-column>
			<el-table-column label="图标" align='center' width="100px">
				<template slot-scope="scope">
					<i :class="scope.row.menuIcon"></i>
				</template>
			</el-table-column>
			<el-table-column prop="action" label="操作" align='center'>
				<template slot-scope="scope">
					<el-button type="edit" size="mini" @click="editButtonChick(scope.row)">编辑</el-button>
					<el-button type="del" size="mini" @click="delButtonChick(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :close-on-click-modal="false" title="新增菜单" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<span>
				<AddMenu ref="addMenu" :menulist="menulist" :defaultMenuSequence="menuCount+1" :close="closeAddDialog"></AddMenu>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addDialogOkClick">确 定</el-button>
			</span>
		</el-dialog>
		<MenuEdit :menu-select="menulist" :form-data="formData" :dialog-visible="dialogVisible2" :close="menuEditClose"></MenuEdit>
	</div>
</template>

<script>
	import AddMenu from '@/views/sys/AddMenu'
	import MenuEdit from '@/views/sys/MenuEdit'
	import {
		Loading
	} from 'element-ui';
	export default {
		components: {
			AddMenu,
			MenuEdit
		},
		data() {
			return {
				eldialog: '',
				dialogVisible: false,
				dialogVisible2: false,
				tableData: [],
				menulist: [],
				menuCount: 0,
				formData: null,
				parents: [],
				result: ''
			}
		},
		created() {
			this.getAllMenu();
		},
		methods: {
			/*点击删除按钮*/
			delButtonChick(row) {
				//alert(row.id);
				this.$http.post("/sys/delmenu", row, true).then(res => {
					this.$mm.success("菜单删除成功")
					this.getAllMenu()
				})
			},
			editButtonChick(row) {
				this.formData = row;
				this.dialogVisible2 = true;
			},
			menuEditClose(refash) {
				this.formData = null;
				this.dialogVisible2 = false;
				if (refash)
					this.getAllMenu();
			},
			closeAddDialog() {
				this.dialogVisible = false;
				this.getAllMenu();
			},
			getAllMenu() {
				const that = this;
				this.$http.get("/sys/getallmenu", null, true).then((data) => {
					this.menuCount = data.length;
					//this.menulist = this.formatMenuData(data);
					/* this.tableData = this.menulist = this.formatMenu(data);
					console.log(this.formatMenu(data)); */
					this.parents = this.menulist = this.getParents(data);
				})
			},
			handleClose(done) {
				done();
			},
			addDialogOkClick() {
				this.$refs.addMenu.addDialogOkClick(this.dialogVisible);
			},
			clickPMenu(row) {
				let newtableData = [];
				this.menulist.forEach((currentValue) => {
					newtableData.push(currentValue);
					if (row.id == currentValue.id) {
						currentValue.unflod = currentValue.unflod ? false : true;
					}
					if (currentValue.unflod) {
						currentValue.children.forEach((item) => {
							newtableData.push(item);
						});
					}
				});
				this.tableData = newtableData;
			},
			formatMenu(data) {
				var orgs = [];
				var result = [];
				data.forEach((item) => {
					var org = { ...item
					};
					//org.value = item.id;
					//org.label = item.orgName;
					org.submenu = org.menuPath ? false : true;
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
			getParents(data) {
				const parents = data.filter((item) => {
					item.children = [];
					return !item.pid;
				})
				const childrens = data.filter((item) => {
					return !!item.pid;
				})
				childrens.forEach((item) => {
					parents.forEach((f) => {
						if (item.pid === f.id) {
							f.hasChildren = true;
							f.children.push(item);
						}
					})
				})
				return parents;
			},
			load(tree, treeNode, resolve) {
				resolve(tree.children);
			}
		}
	}
</script>
<style>
	#menulist>.el-row {
		margin-bottom: 20px;
	}

	#menulist .el-table-column {
		min-width: 180px;
	}

	#menulist i {
		font-size: 18px;
		vertical-align: -2px;
	}

	#menulist .el-table .el-table__expand-icon {
		float: left;
		margin-left: 20px;
		margin-top: -2px;
		margin-right: 10px;
	}
</style>
