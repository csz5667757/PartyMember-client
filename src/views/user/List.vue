<template>
	<div id='list'>
		<el-form class='search' inline size="small">
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
		</el-form>
		<el-table :data="pageInfo.list" style="width: 100%" :default-sort="{prop: 'id', order: 'ascending'}" stripe
		 @selection-change="handleSelectionChange">
			<el-table-column type="expand" width="35">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="ID">
							<span>{{ props.row.id }}</span>
						</el-form-item>
						<el-form-item label="名字">
							<span>{{ props.row.name }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<!-- <el-table-column type="selection" width="35"></el-table-column> -->
			<el-table-column label="ID" prop="id" sortable></el-table-column>
			<el-table-column label="名字" prop="name" sortable v-if="isShow('名字')"></el-table-column>
			<!-- 单选框value={1,2} -->
			<el-table-column label="性别" prop="sex" :formatter="$dic.getCheck.bind($dic,'男','女')" v-if="isShow('性别')"></el-table-column>
			<!-- 数据字典展示 -->
			<el-table-column label="户口性质" prop="hkType" :formatter="$dic.formatter.bind($dic,'hkxz')" v-if="isShow('户口性质')"></el-table-column>
			<!-- 日期展示 -->
			<el-table-column label="出生日期" prop='birthday'>
				<template slot-scope='scope'>{{scope.row.birthday|dateformat('YYYY-MM-DD')}}</template>
			</el-table-column>
			<el-table-column label="年龄" prop="age"></el-table-column>
			<!-- 行政展示 -->
			<!-- <el-table-column label="籍贯" prop="nativePlace" :formatter="$dic.areaCode3Formatter.bind($dic)" align="center" width="240px"></el-table-column> -->
			<!-- <el-table-column label="工作类型" prop="jobs" :formatter="$dic.getJobs.bind($dic)"></el-table-column> -->
			<el-table-column label="房屋" prop="houseId">
				<template slot-scope='scope'>{{scope.row.houseId}}</template>
			</el-table-column>
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
		<!-- {{pageInfo.list}} -->
	</div>
</template>

<script>
	export default {
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
					list: [{
						id: '12987124',
						name: '张三',
						age: 23,
						sex: 1,
						hkType: '1',
						birthday: '2019-04-23 12:50:28.224',
						nativePlace: '120101000000',
						houseId: 1,
						content: '{"html":"<p>aaa</p>","text":"aaa"}',
						jobs: '1000',
						person: 1,
					}, {
						id: '12987123',
						name: '李四',
						age: 24,
						sex: 1,
						hkType: '2',
						birthday: '2019-04-23 12:50:28.224',
						nativePlace: '120101000000',
						houseId: 2,
						content: '{"html":"<p>aaa</p>","text":"aaa"}',
						jobs: '1101',
						person: 2,
					}, {
						id: '12987125',
						name: '王五',
						age: 25,
						sex: 2,
						hkType: '3',
						birthday: '2019-04-23 12:50:28.224',
						nativePlace: '120101000000',
						houseId: 1,
						content: '{"html":"<p>aaa</p>","text":"aaa"}',
						jobs: '1102',
						person: 3,
					}, {
						id: '12987126',
						name: '马六',
						age: 26,
						hkType: '4',
						birthday: '2019-04-23 12:50:28.224',
						nativePlace: '120101000000',
						houseId: 2,
						content: '{"html":"<p>aaa</p>","text":"aaa"}',
						jobs: '1000',
					}]
				},
				item: {}, //选择项
				propgroup: [],
				options: ['名字', '性别', '户口性质'],
				multipleSelection: [],
			}
		},
		methods: {
			getList() {
				/* this.$http.get("/house/select", {
					pageNum: this.pageInfo.pageNum,
					pageSize: this.pageInfo.pageSize,
					...this.search
				}, true).then((data) => {
					this.pageInfo = data;
				}).catch((err) => {}) */
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
					/* this.$http.post("/house/delete", {
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
					) */
				})
			},
			isShow(name) {
				return this.propgroup.indexOf(name) > -1
			},
		},
		watch: {
			propgrop(newValue, oldValue) {

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
