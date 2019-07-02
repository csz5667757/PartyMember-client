<template>
	<div id='list'>
		<!-- <el-form class='search' inline size="small">
			<el-form-item label="姓名">
				<el-input size='small' v-model="search.name"></el-input>
			</el-form-item>
			<el-form-item label="户口性质">
				<el-input size='small' v-model="search.name"></el-input>
			</el-form-item>
			<el-form-item label="籍贯">
				<el-input size='small' v-model="search.name"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type='primary' icon="el-icon-search" size="small" @click='searchList'>搜索</el-button>
			</el-form-item>
		</el-form> -->
		<div class="contr">
			<el-button type='add' size="small" @click='dialog1=true'>新增</el-button>
		</div>
		<el-table :data="pageInfo.list" style="width: 100%"  stripe @selection-change="handleSelectionChange">
			<el-table-column type="expand" width="35">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="图书馆简介">
							<span>{{ props.row.content }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<!-- <el-table-column type="selection" width="35"></el-table-column> -->
			<el-table-column label="图书馆名称" prop="libraryName" sortable></el-table-column>
			<el-table-column label="图书馆编号" prop="libraryNo" sortable ></el-table-column>
			<!-- 单选框value={1,2} -->
			<el-table-column label="数据权限代码" prop="authorityNo"  ></el-table-column>
			<!-- 行政展示 -->
			<el-table-column label="所属行政区" prop="areaId" :formatter="$dic.areaCode3Formatter.bind($dic)" align="center" width="240px"></el-table-column> 
			<!-- 数据字典展示 -->
			<el-table-column label="地址" prop="address"  ></el-table-column>
			
			<el-table-column label="操作" prop="action" width="150px" align="center">
				<template slot-scope='scope'> 
					<el-button type='edit' size="mini" @click='edit(scope.row)'>编辑</el-button>
					<el-button type='del' size="mini" @click='del(scope.row)'>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="elpagination">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum"
			 :page-sizes="[5, 10, 15, 20]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="pageInfo.total">
			</el-pagination>
		</div>
		<!--  {{pageInfo.list}} -->
		<Add :visible.sync='dialog1' @close='dialog1=false' @submit='getList'></Add>
		<Edit :visible.sync='dialog2' :item='item' @close='dialog2=false;item={}' @submit='getList'></Edit>
	</div>
</template>

<script>
	import Add from './Add.vue'
	import Edit from './Edit.vue'
	export default {
		components: {
			Add,
			Edit,
		},
		data() {
			return {
				search: { //查询条件
					name: '', //查询属性
					area: null,
				},
				dialog1: false, //新增
				dialog2: false, //编辑
				dialog3: false,
				pageInfo: { //分页
					pageNum: 1,
					pageSize: 5,
					total: 0,
					list: [],
				},
				item: {}, //选择项
				multipleSelection: [],
			}
		},
		methods: {
			getList() {
				this.$http.get("/library/select", {
					pageNum: this.pageInfo.pageNum,
					pageSize: this.pageInfo.pageSize,
					// ...this.search
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
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			edit(item) {
				this.dialog2 = true;
				this.item = item;
			},
			del(item) {
				this.$mm.delete(() => {
					this.$http.post("/library/delete", {
						'id': item.id
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
