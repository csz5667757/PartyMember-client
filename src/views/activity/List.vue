<template>
	<div id='list'>
		<el-form class='search' inline size="small">
			<el-form-item label="活动名称">
				<el-input size='small' v-model="search.title"></el-input>
			</el-form-item>
			<el-form-item label="活动时间">
				<el-date-picker v-model="time" type="datetimerange" align="right" start-placeholder="开始日期" end-placeholder="结束日期"
				 :default-time="['08:00:00', '18:00:00']">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="活动状态">
				<el-select v-model="search.actStatus" placeholder="请选择" clearable>
					<el-option v-for="item in options" :key="item.dicValue" :label="item.dicKey" :value="item.dicValue">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type='primary' icon="el-icon-search" size="small" @click='searchList'>搜索</el-button>
			</el-form-item>
			<div class="contr">
				<el-button type='add' size="small" @click='dialog1=true'>新增</el-button>
			</div>
		</el-form>
		<!-- <div class="contr">
			<el-button type='add' size="small" @click='dialog1=true'>新增</el-button>
			<prop-group v-model="propgroup" :options='options' @refresh='searchList'></prop-group>
		</div> -->
		<el-row :gutter="20">
			<el-col :span="6" v-for="(activity , index) in pageInfo.list" :key='index'>
				<el-card :body-style="{ padding: '20px' }">
					<!-- <img :src="activity.image" class="image"> -->
					<!-- <img v-if="activity.image" :src="'/api/fileupload/getactivity?image='+activity.image"> -->
					<el-image :src="'/api/fileupload/getactivity?image='+activity.image" fit="fill" style='width: 100%;height: 15rem;'
					 @click.native="selectAct(activity.id)"></el-image>
					<div style="padding: 14px;">
						<span>活动名称:{{activity.title}}</span><br />
						<span>活动状态:{{getType(activity.actStatus)}}</span><br />
						<div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">活动简介:{{ activity.content}}</div>
						<el-button @click="edit(activity)" style="background-color: aquamarine; ">编辑</el-button>
						<el-button @click="del(activity.id)" style="background-color: coral ;">删除</el-button>

					</div>
				</el-card>
			</el-col>
		</el-row>

		<div class="elpagination">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum"
			 :page-sizes="[8, 16, 24, 32]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="pageInfo.total">
			</el-pagination>
		</div>
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
					title: null, //查询属性
					actStatus: null,
					start: null,
					end: null,
				},
				time: [],
				dialog1: false, //新增
				dialog2: false, //编辑
				pageInfo: { //分页
					pageNum: 1,
					pageSize: 8,
					total: 0,
					list: []
				},
				item: {}, //选择项
				options: [],
			}
		},
		methods: {
			getList() {
				this.$http.get("/activity/select", {
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
			del(item) {
				this.$mm.delete(() => {
					this.$http.post("/activity/delete", {
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
			selectAct(id) {
				this.$router.push('/activity/Item/' + id);
			},
			getType(val) {
				var tem = '';
				this.options.forEach((item) => {
					if (item.dicValue == val) {
						tem = item.dicKey;
					}
				})
				return tem;
			},
		},
		watch: {
			time: function(newtime, oldtime) {
				this.search.start = newtime[0];
				this.search.end = newtime[1];

			}
		},
		mounted() {
			this.getList();
			this.$store.dispatch('getDic', {
				dicKeyword: 'hdzt',
				callback: (res) => {
					this.options = res;
				}
			})
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
