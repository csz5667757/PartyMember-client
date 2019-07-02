<template>
	<div id='list'>
		<el-form class='search' inline size="small">
			<el-form-item label="书名">
				<el-input size='small' v-model="search.seriesName"></el-input>
			</el-form-item>
			<el-form-item label="ISBN号">
				<el-input size='small' v-model="search.isbn"></el-input>
			</el-form-item>
			<el-form-item label="作者">
				<el-input size='small' v-model="search.author"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type='primary' icon="el-icon-search" size="small" @click='searchList'>搜索</el-button>
			</el-form-item>
			<div class="contr">
				<el-button type='add' size="small" @click='dialog1=true'>新增</el-button>
			</div>
		</el-form>
		<!-- //图书资源展示 -->
		<div class="demo-image__placeholder">
			<ul v-for="books in pageInfo.list" class="block" style="width: 180px" onmouseover="this.className='borderRed'"
			 onmouseout="this.className='block'" :key="books.id">
				<el-image class="bookImage" :src="'/api/fileupload/getbook?image='+books.image" @click.native="getData(books.id)">
					<li slot="placeholder" class="image-slot">
						加载中<span class="dot">...</span>
					</li>
				</el-image>

				<span class="descBookName">{{ books.seriesName }}</span>
				<!-- <el-tooltip class="item" effect="light" :content="books.summary" placement="bottom"> -->
					<span class="descBookDemo">{{books.summary}}</span>
				<!-- </el-tooltip> -->
				<el-button-group class="operatorBtn">
					<el-button class="editBtn" type="primary" icon="el-icon-edit" @click='edit(books)'></el-button>
					<el-button class="deleteBtn" type="del" icon="el-icon-delete" @click='del(books)'></el-button>
				</el-button-group>
			</ul>
		</div>
		<!-- 分页 -->
		<div class="elpagination">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.pageNum"
			 :page-sizes="[12, 24, 36, 48]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
			</el-pagination>
		</div>

		{{pageInfo.list}}
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
				dialog1: false, //新增
				dialog2: false, //编辑
				dialog3: false, //详情
				search: { //查询条件
					//查询属性
					seriesName: null,
					isbn: null,
					author: null,
				},
				pageInfo: { //分页
					pageNum: 1,
					pageSize: 12,
					total: null,
					list: [],
				},
				item: {}, //选择项
			}
		},
		methods: {
			getList() {
				this.$http.get("/books/select", {
					pageNum: this.pageInfo.pageNum,
					pageSize: this.pageInfo.pageSize,
					...this.search
				}, true).then((data) => {
					this.pageInfo = data;
				}).catch((err) => {})
			},
			handleSizeChange(val) {
				this.pageInfo.pageSize = val;
				this.getItems();
			},
			handleCurrentChange(val) {
				this.pageInfo.pageNum = val;
				this.getItems();
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
					this.$http.post("/books/delete", {
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
			getData(id){
				this.$router.push('/books/Item/' + id);
			}
		},
		mounted() {
			this.getList();
		},
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

	/* #list .contr{
		margin-bottom: -5px;
	} */

	/* 图片资源 */
	#list .demo-image__placeholder {
		display: flex;
		flex-direction: row;
		text-align: center;
		flex-wrap: wrap;
		/*换行*/

		/* width:120px;
		height: 100px; */
		/* border-radius: 4px*/
		/* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
	}

	#list .block {
		/* position: relative; */
		display: flex;
		text-align: center;
		flex-wrap: wrap;
		/*换行*/
		justify-content: space-between;
		/*水平方向对齐*/
		flex-direction: row;
		border-radius: 4px;
		border: 2px solid;
		border-color: rgba(211, 211, 211, 0.5);
		margin-left: 50px;
		margin-top: 5px;
	}

	#list .borderRed {
		display: flex;
		text-align: center;
		flex-wrap: wrap;
		/*换行*/
		justify-content: space-between;
		/*水平方向对齐*/
		flex-direction: column;
		border-radius: 4px;
		border: 2px solid;
		border-color: rgba(28, 134, 238, 0.5);
		margin-left: 50px;
		margin-top: 5px;

	}

	#list .bookImage {
		display: flex;
		width: 170px;
		height: 230px;
		border-radius: 4px;
		padding-top: 1px;
	}

	#list .descBookName {
		/* display: flex; */
		width: 180px;
		height: 25px;
		align-content: center;
		overflow: hidden;
		justify-content: center;
		/*水平方向对齐*/
		display: -webkit-box;
		white-space: normal;
		text-overflow: ellipsis;
		/*文本超出后...*/
		word-wrap: break-word;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		/* float: left; */
	}

	#list .descBookDemo {
		/* font-style: italic; */
		font-size: small;
		color: #FF7F00;
		width: 180px;
		height: 34.4px;
		overflow: hidden;
		display: -webkit-box;
		white-space: normal;
		text-overflow: ellipsis;
		/*文本超出后...*/
		word-wrap: break-word;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		text-align: left;
	}

	#list .operatorBtn {
		display: flex;
		height: 40px;
		cursor: pointer;

	}

	#list .editBtn {
		height: 40px;
		width: 88px;
	}

	#list .deleteBtn {
		margin-left: 1px;
		height: 40px;
		width: 88px;
	}

	#list .block:hover .d {
		background: #ff6a00;
	}

	.elpagination {
		margin-top: 10px;
		margin-left: 50px;
	}
</style>
