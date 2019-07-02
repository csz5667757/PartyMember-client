<template>
	<div class="modellist">
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
				<el-button icon="el-icon-refresh" size="small" @click='searchReset'>重置</el-button>
			</el-form-item>
		</el-form>
		<div class="contr">
			<el-button type='add' size="small" @click='dialog1=true'>新增</el-button>
		</div>
		<el-table :data="pageInfo.list" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="模板图标" align="center">
				<template slot-scope="scope">
					<el-image :src="'/api/fileupload/getimage?image='+scope.row.moduleIcon" style="width: 50px;height: 50px;border-radius: 100%;"></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="moduleName" label="模板名称" sortable></el-table-column>
			<el-table-column prop="url" label="链接URL" sortable show-overflow-tooltip align="center">
				<template v-slot="scope">
					<el-link :href="scope.row.url" target="_blank">{{scope.row.url}}</el-link>
				</template>
			</el-table-column>
			<el-table-column prop="templatePage" label="模板页面" sortable></el-table-column>
			<el-table-column prop="remarks" label="备注" sortable show-overflow-tooltip></el-table-column>
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
		{{pageInfo.list}}
		<Add :visible.sync='dialog1' @close='dialog1=false' @submit='getList'></Add>
	</div>
</template>

<script>
	import Add from './ModelAdd.vue'
	export default {
		components: {
			Add
		},
		data() {
			return {
				search: {

				},
				dialog1: false,
				dialog2: false,
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
				this.$http.get("/template/select", {
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
			searchReset() {

			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			upTop(id) {

			},
			downTop(id) {

			}
		},
		mounted() {
			this.getList();
		}
	}
</script>

<style>
	.modellist .avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 100%;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.modellist .avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.modellist .avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 89px;
		height: 89px;
		border-radius: 100%;
		line-height: 89px;
		text-align: center;
	}

	.modellist .avatar {
		width: 89px;
		height: 89px;
		border-radius: 100%;
		display: block;
	}

	.modellist .el-select {
		width: 100%;
	}
</style>
