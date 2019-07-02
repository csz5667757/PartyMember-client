<template>
	<div id='list'>
		<el-form class='search' inline size="small">
			<el-form-item label="标题">
				<el-input size='small' v-model="search.theme"></el-input>
			</el-form-item>
			<el-form-item label="显示">
				<el-select v-model="search.isShow" placeholder="请选择" clearable>
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type='primary' icon="el-icon-search" size="small" @click='searchList'>搜索</el-button>
			</el-form-item>
		</el-form>

		<div class="contr">
			<el-button type='edit' size="mini" @click='show()'>显示</el-button>
			<el-button type='edit' size="mini" @click='notShow()'>不显示</el-button>
		</div>
		<el-table :data="pageInfo.list" style="width: 100%" stripe @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="expand" width="35">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="评论内容">
							<span>{{ props.row.comment }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column label="标题" prop="theme" sortable width="250px" align="center"></el-table-column>
			<el-table-column label="评论人" prop="nickName" sortable align="center"></el-table-column>
			<el-table-column label="评论时间" sortable align="center">
				<template slot-scope='scope'>{{scope.row.createTime|dateformat('YYYY-MM-DD HH:mm:ss')}}</template>
			</el-table-column>
			<el-table-column label="状态" prop="isShow" sortable align="center" >
				<template slot-scope='scope'>
					<span>{{getType(scope.row.isShow)}}</span>
				</template>
			</el-table-column>
			<!-- 单选框value={1,2} -->
			<el-table-column label="评论内容" prop="comment" width="600px" header-align="center" align="center"
			 show-overflow-tooltip></el-table-column>
			<el-table-column label="操作" prop="action" width="180px" align="center">
				<template slot-scope='scope'>
					<el-button type='del' size="mini" @click='del(scope.row.id)'>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="elpagination">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum"
			 :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="pageInfo.total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				search: { //查询条件
					theme: null, //查询属性
					isShow: null,
				},
				pageInfo: { //分页
					pageNum: 1,
					pageSize: 10,
					total: 0,
					list: []
				},
				options: [{
					value: 1,
					label: '已显示'
				}, {
					value: 0,
					label: '未显示'
				}],
				multipleSelection: [],
			}
		},
		methods: {
			getList() {
				this.$http.get("/mr/comment/select", {
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
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			searchList() {
				this.pageInfo.pageNum = 1;
				this.getList();
			},
			del(item) {
				this.$mm.delete(() => {
					this.$http.post("/mr/comment/delete", {
						'id': item
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
			},
			show() {
				if (this.multipleSelection.length < 1) {
					this.$mm.error('至少选择一项')
				} else {
					let ids = this.multipleSelection.map((item) => {
						return item.id;
					})
					this.$http.post("/mr/comment/show", {
						'ids': ids
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
			notShow() {
				if (this.multipleSelection.length < 1) {
					this.$mm.error('至少选择一项')
				} else {
					let ids = this.multipleSelection.map((item) => {
						return item.id;
					})
					this.$http.post("/mr/comment/notshow", {
						'ids': ids
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
			getType(val) {
				if (val) {
					return "已显示";
				} else {
					return "未显示";
				}
			}
		},
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
</style>
