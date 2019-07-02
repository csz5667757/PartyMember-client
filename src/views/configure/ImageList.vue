<template>
	<div id='list'>
		<el-form class='search' inline size="small">
			<el-form-item label="图片类型">
				<dic-select :allow-null='false' keyword="lbttype" v-model="search.imgType" size='small'></dic-select>
			</el-form-item>
			<el-form-item>
				<el-button type='primary' icon="el-icon-search" size="small" @click='searchList'>搜索</el-button>
			</el-form-item>
		</el-form>
		<div class="contr">
			<el-button type='add' size="small" @click='dialog1=true'>新增</el-button>
			<el-button type='del' size="mini" @click='del()'>删除</el-button>
		</div>
		<el-table :data="pageInfo.list" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="imgType" label="图片类型" :formatter="$dic.formatter.bind($dic,'lbttype')">
			</el-table-column>
			<el-table-column label="图片描述">
				<template slot-scope="scope">
					<el-popover trigger="hover" placement="top">
						<div style="width: 400px;height: 400px;">
							<el-image :src="'/api/fileupload/getimage?image='+scope.row.image" style="width: 400px;height: 400px;"></el-image>
						</div>
						<div slot="reference" class="name-wrapper">
							<el-tag size="medium">{{ scope.row.content }}</el-tag>
						</div>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column prop="url" label="跳转链接">
			</el-table-column>
			<el-table-column label="操作" align="center" width="230px" sortable>
				<template slot-scope='scope'>
					<el-button type='login' size="mini" @click='upTop(scope.row.id)' v-if='!scope.row.isShow'>上首页</el-button>
					<el-button type='del' size="mini" @click='downTop(scope.row.id)' v-else>下首页</el-button>
					<el-button @click="edit(scope.row)" size="mini" style="background-color: aquamarine; ">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="elpagination">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum"
			 :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="pageInfo.total">
			</el-pagination>
		</div>
		<!-- {{pageInfo.list}} -->
		<Add :visible.sync='dialog1' @close='dialog1=false' @submit='getList'></Add>
		<Edit :visible.sync='dialog2' :item='item' @close='dialog2=false;item={}' @submit='getList'></Edit>
	</div>
</template>

<script>
	import Add from './ImageAdd.vue'
	import Edit from './ImageEdit.vue'
	export default {
		components: {
			Add,
			Edit,
			// Item
		},
		data() {
			return {
				search: { //查询条件
					imgType: null
				},
				dialog1: false, //新增
				dialog2: false, //编辑
				pageInfo: { //分页
					pageNum: 1,
					pageSize: 10,
					total: 0,
					list: []
				},
				item: {}, //选择项
				multipleSelection: [],
			}
		},
		methods: {
			getList() {
				this.$http.get("/image/select", {
					pageNum: this.pageInfo.pageNum,
					pageSize: this.pageInfo.pageSize,
					...this.search
				}, true).then((data) => {
					this.pageInfo = data;
				}).catch((err) => {})
			},
			handleSizeChange(val) {
				this.pageInfo.pageSize = val;
				this.getList();
			},
			handleCurrentChange(val) {
				this.pageInfo.pageNum = val;
				this.getList();
			},
			searchList() {
				this.pageInfo.pageNum = 1;
				this.getList();
			},
			edit(item) {
				this.dialog2 = true;
				this.item = item;
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			del() {
				if (this.multipleSelection.length < 1) {
					this.$mm.error('至少选择一项')
				} else if (this.multipleSelection.length > 1) {
					this.$mm.error('只能选择一项')
				} else {
					this.$mm.delete(() => {
						this.$http.post("/image/delete", {
							'id': this.multipleSelection[0].id,
						}, true).then(
							(data) => {
								if (data > 0) {
									this.$message({
										message: "删除成功",
										type: 'success',
										duration: 2000
									})
									this.getList();
								} else {
									this.$message({
										message: "删除失败，请联系管理员",
										type: 'error',
										duration: 2000
									})
								}
							}
						)
					})
				}
			},
			upTop(item) {
				this.$http.post("/image/show", {
					'id': item,
					'libraryId': parseInt(sessionStorage.getItem("libraryId"))
				}, true).then(
					(data) => {
						if (data > 0) {
							this.$message({
								message: "修改成功",
								type: 'success',
								duration: 2000
							})
							this.getList();
						} else {
							this.$message({
								message: "修改失败，请联系管理员",
								type: 'error',
								duration: 2000
							})
						}
					}
				)
			},
			downTop(item) {
				this.$http.post("/image/notshow", {
					'id': item
				}, true).then(
					(data) => {
						if (data > 0) {
							this.$message({
								message: "修改成功",
								type: 'success',
								duration: 2000
							})
							this.getList();
						} else {
							this.$message({
								message: "修改失败，请联系管理员",
								type: 'error',
								duration: 2000
							})
						}
					}
				)
			}
		},
		watch: {},
		mounted() {
			this.getList();
		}
	}
</script>

<style>
	#list .demo-table-expand {
		font-size: 0;
	}

	#list .demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	#list .demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}

	#list .el-dialog {
		padding-right: 30px;
	}

	#list .el-input-number {
		width: 100%;
	}

	#list .el-date-editor.el-input {
		width: 100%;
	}

	#piclist {
		font-size: 0;
	}

	#piclist li {
		display: inline-block;
		width: 20%;
		padding: 0.15% 0.5%;
		text-align: center;
		vertical-align: top;
		cursor: pointer;
	}

	#piclist li img+p {
		padding: 0.3125rem;
		padding-top: 0.625rem;
		width: 100%;
		font-size: 0.875rem;
		font-weight: bold;
	}

	#piclist img {
		max-width: 100%;
		width: 260px;
		height: 280px;
	}

	#piclist li img+p+p {
		font-size: 0.75rem;
		color: #909399;
	}
</style>
