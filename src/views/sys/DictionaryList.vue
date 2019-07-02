<template>
	<div id='dictionarylist'>
		<el-row :gutter="20">
			<el-col :span='6' class='items'>
				<div>
					<span>数据字典</span>
					<span>
						<el-button type='success' circle size='mini' title='新增' @click='dialog1=true' class='el-icon-plus'></el-button>
						<el-button type='primary' circle size='mini' title='编辑' @click='itemsEdit' class='el-icon-edit'></el-button>
						<el-button type='warning' circle size='mini' title='激活' class='el-icon-check' @click='itemsMiss'></el-button>
						<el-button type='danger' circle size='mini' title='删除' class='el-icon-delete' @click='itemsDel'></el-button>
						<el-button type='warning' circle size='mini' title='锁定' class='el-icon-view' @click='itemsLock'></el-button>
					</span>
				</div>
				<el-table :data='itemsData' @row-click='itemClick' :show-header='hide' @selection-change='itemsChange'>
					<el-table-column type="selection" width="48"></el-table-column>
					<el-table-column prop='dicName'></el-table-column>
					<el-table-column prop='enabled' label="是否有效" width="130px">
						<template slot-scope='scope'>
							<el-tag v-if="scope.row.enabled" type="success" size="mini">已激活</el-tag>
							<el-tag v-else type="danger" size="mini">未激活</el-tag>
							<el-tag v-if="scope.row.locked" type="success" size="mini">已锁定</el-tag>
							<el-tag v-else type="danger" size="mini">未锁定</el-tag>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span='18' class='values'>
				<div>
					<span>{{valuesItem.dicName}}详细内容</span>
					<span v-if='valuesItem.dicName'>
						<el-button type='add' size='mini' title='新增' @click='dialog3=true'>新增</el-button>
					</span>
				</div>
				<el-table :data='valuesData'>
					<el-table-column prop='dicName' label='字典名称' align="center"></el-table-column>
					<el-table-column prop='dicKeyword' label='字典关键字' align="center"></el-table-column>
					<el-table-column prop='dicKey' label='代码描述' align="center"></el-table-column>
					<el-table-column prop='dicValue' label='代码' align="center"></el-table-column>
					<el-table-column prop='enabled' label='状态' align="center">
						<template slot-scope="scope">
							<el-tag v-if="scope.row.enabled" type="success" size="mini">已激活</el-tag>
							<el-tag v-else type="danger" size="mini">未激活</el-tag>
							<el-tag v-if="scope.row.locked" type="success" size="mini">已锁定</el-tag>
							<el-tag v-else type="danger" size="mini">未锁定</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop='action' label='操作' width="300px" align="center">
						<template slot-scope='scope'>
							<el-button v-if="!scope.row.locked" type='edit' size='mini' @click='valuesEdit(scope.row)'>编辑</el-button>
							<el-button v-if="!scope.row.locked" type='del' size='mini' @click='valueDel(scope.row)'>删除</el-button>
							<el-button v-if='scope.row.enabled &!scope.row.locked' type='danger' size='mini' @click='valueMiss(scope.row)'>失效</el-button>
							<el-button v-else-if='!scope.row.locked' type='success' size='mini' @click='valueMiss(scope.row)'>激活</el-button>
							<el-button v-if='!scope.row.locked' type='warning' size='mini' @click='lock(scope.row)'>锁定</el-button>
							<el-button v-if='scope.row.locked' type='success' size='mini' @click='relieve(scope.row)'>解锁</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<AddItem :visible.sync='dialog1' @close='dialog1=false' @submit='getItemsData'></AddItem>
		<EditItem :visible.sync='dialog2' :itemData='itemsSelect[0]' @close='dialog2=false' @submit='getItemsData'></EditItem>
		<AddValue :visible.sync='dialog3' :itemData='valuesItem' @close='dialog3=false' @submit='getValuesData'></AddValue>
		<EditValue :visible.sync='dialog4' :item='valueData' @close='dialog4=false' @submit='getValuesData'></EditValue>
	</div>
</template>

<script>
	import AddItem from './DictionaryAddItem.vue'
	import EditItem from './DictionaryEditItem.vue'
	import AddValue from './DictionaryAddValue.vue'
	import EditValue from './DictionaryEditValue.vue'
	export default {
		components: {
			AddItem,
			EditItem,
			AddValue,
			EditValue
		},
		data() {
			return {
				dialog1: false,
				dialog2: false,
				dialog3: false,
				dialog4: false,
				hide: false,
				itemsSelect: [], //字典项多选
				itemsData: [], //字典项列表
				valuesData: [], //字典项值列表
				valuesItem: {}, //选择的字典项
				valueData: {} //选择的字典项值
			}
		},
		methods: {
			getItemsData() {
				this.$http.get("/dictionary/diclist", null, true).then((data) => {
					this.itemsData = data;
				}).catch((err) => {})
			},
			itemsEdit() {
				if (this.itemsSelect.length == 1) {
					this.dialog2 = true;
				} else if (this.itemsSelect.length > 1) {
					this.$mm.error('只能选择一项')
				} else {
					this.$mm.error('至少选择一项')
				}
			},
			itemsMiss() {
				if (this.itemsSelect.length) {
					const ids = this.itemsSelect.map((item) => {
						return item.id;
					})
					const that = this;
					this.$mm.activate(function() {
						that.itemsMissRequest(ids, 1);
					}, function() {
						that.itemsMissRequest(ids, 0);
					})
				} else {
					this.$mm.error('至少选择一项')
				}
			},
			itemsMissRequest(ids, status) {
				this.$http.post("/dictionary/isenabled", {
					ids: ids,
					status: status
				}, true).then(
					(data) => {
						if (data > 0) {
							this.$message({
								message: "状态修改成功",
								type: 'success',
								duration: 2000
							})
							this.itemsSelect = [];
							this.getItemsData();
						} else {
							this.$message({
								message: "状态修改失败，请联系管理员",
								type: 'error',
								duration: 2000
							})
						}
					}
				)
			},
			itemsDel() {
				if (this.itemsSelect.length) {
					const dicKeyword = this.itemsSelect.map((item) => {
						return item.dicKeyword;
					})
					this.$mm.delete(() => {
						this.$http.post("/dictionary/deletediclist", {
							'dicKeyword': dicKeyword
						}, true).then(
							(data) => {
								if (data > 0) {
									this.$message({
										message: "字典项删除成功",
										type: 'success',
										duration: 2000
									})
									this.itemsSelect = [];
									this.getItemsData();
								} else {
									this.$message({
										message: "字典项删除失败，请联系管理员",
										type: 'error',
										duration: 2000
									})
								}
							}
						)
					})
				} else {
					this.$mm.error('至少选择一项')
				}
			},
			itemsLock() {
				if (this.itemsSelect.length) {
					const dicKeywords = this.itemsSelect.map((item) => {
						return item.dicKeyword;
					})
					const that = this;
					this.$mm.locking(function() {
						that.itemsLockRequest(dicKeywords, 1);
					}, function() {
						that.itemsLockRequest(dicKeywords, 0);
					})
				} else {
					this.$mm.error('至少选择一项')
				}
			},
			itemsLockRequest(dicKeywords, status) {
				this.$http.post("/dictionary/locklist", {
					dicKeywords: dicKeywords,
					status: status
				}, true).then(
					(data) => {
						if (data > 0) {
							this.$message({
								message: "状态修改成功",
								type: 'success',
								duration: 2000
							})
							this.itemsSelect = [];
							this.getItemsData();
						} else {
							this.$message({
								message: "状态修改失败，请联系管理员",
								type: 'error',
								duration: 2000
							})
						}
					}
				)
			},
			itemsChange(val) {
				this.itemsSelect = val;
			},
			itemClick(row) {
				this.valuesItem = row;
				this.getValuesData(row);
			},
			getValuesData(item) {
				this.$http.get("/dictionary/kvlist", {
					dicKeyword: item.dicKeyword
				}, true).then((data) => {
					this.valuesData = data;
				}).catch((err) => {
					this.valuesData = [];
				})
			},
			valuesEdit(value) {
				this.valueData = value;
				this.dialog4 = true;
			},
			valueDel(value) {
				this.$mm.delete(() => {
					this.$http.post("/dictionary/deletekv", {
						id: value.id
					}, true).then(
						(data) => {
							if (data > 0) {
								this.$message({
									message: "删除成功",
									type: 'success',
									duration: 2000
								})
								this.getValuesData(value);
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
			valueMiss(value) {
				const ids = [value.id];
				this.$mm.activate(() => {
					this.valueMissRequest(ids, 1, value);
				}, () => {
					this.valueMissRequest(ids, 0, value);
				})

			},
			valueMissRequest(ids, status, value) {
				this.$http.post("/dictionary/isenabled", {
					ids,
					status
				}, true).then(
					(data) => {
						if (data > 0) {
							this.$message({
								message: "修改成功",
								type: 'success',
								duration: 2000
							})
							this.getValuesData(value);
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
			lock(value) {
				this.$http.post("/dictionary/lockkv", {
					id: value.id,
				}, true).then(
					(data) => {
						if (data > 0) {
							this.$message({
								message: "状态修改成功",
								type: 'success',
								duration: 2000
							})
							this.getValuesData(this.valuesItem);
						} else {
							this.$message({
								message: "状态修改失败，请联系管理员",
								type: 'error',
								duration: 2000
							})
						}
					})
			},
			relieve(value) {
				this.$http.post("/dictionary/relieve", {
					id: value.id,
				}, true).then(
					(data) => {
						if (data > 0) {
							this.$message({
								message: "状态修改成功",
								type: 'success',
								duration: 2000
							})
							this.getValuesData(this.valuesItem);
						} else {
							this.$message({
								message: "状态修改失败，请联系管理员",
								type: 'error',
								duration: 2000
							})
						}
					})
			}
		},
		mounted() {
			this.getItemsData();
		}
	}
</script>

<style>
	#dictionarylist .items {
		padding: 10px 15px;
		border: solid 1px #dadada;
		min-height: 500px;
		line-height: 30px;
	}

	#dictionarylist .items>div:first-child {
		margin-bottom: 10px;
	}

	#dictionarylist .items>div:first-child>span:first-child {
		font-weight: bold;
		color: #909292;
	}

	#dictionarylist .items>div:first-child>span:nth-child(2) {
		float: right;
		margin-right: 10px;
	}

	#dictionarylist .values>div:first-child {
		padding: 20px;
		border-bottom: 2px #E4e7ed dotted;
		font-weight: bold;
		color: #909292;
	}

	#dictionarylist .values>div:first-child>span:nth-child(2) {
		margin-top: -5px;
		float: right;
	}
</style>
