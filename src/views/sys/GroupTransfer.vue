<template>
	<div id='grouptransfer'>
		<el-dialog :close-on-click-modal="false" title="组织配置" :visible.sync="visible" width="600px" :before-close="handleClose">
			<el-transfer v-model="value" :data="data" :titles="['未绑定的组织','已绑定的组织']"></el-transfer>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogOkClick">保 存</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: ['dialogVisible', 'close', 'rowId'],
		data: function() {
			return {
				value: [],
				data: []
			}
		},
		created() {

		},
		methods: {
			dialogOkClick() {
				this.$http.post("/sys/setgroupbyuserid", {
					userId: this.rowId,
					groupId: this.value
				}, true).then(res => {
					if (res >= 0)
						this.$mm.success("保存成功");
				})
			},
			handleClose(done) {
				this.close();
			},
			getData(id) {
				this.$http.all([{
						methods: 'get',
						url: '/sys/getallgroup',
						params: null
					},
					{
						methods: 'get',
						url: '/sys/getgroupbyuserid',
						params: {
							id: id
						}
					}
				], true).then(res => {
					console.log(res);
					if (res[0].status == 200 && res[0].data && res[0].data.status == 200 && res[0].data.data) {
						res[0].data.data.forEach(item => {
							item.key = item.id;
							item.label = item.groupName;
						})
						this.data = res[0].data.data;
					}
					if (res[1].status == 200 && res[1].data && res[1].data.status == 200 && res[1].data.data) {
						var value = [];
						res[1].data.data.forEach((item) => {
							value.push(item.groupId);
						})
						this.value = value;
					}
				}).catch(err => {
					console.log(err);
				})


			}
		},
		computed: {
			visible() {
				return this.dialogVisible;
			}
		},
		watch: {
			'rowId': function(n, o) {
				if (this.rowId)
					this.getData(n);
			}
		},
	}
</script>

<style>
	#grouptransfer .el-transfer{
		margin: 0 auto;
		width: 500px;
	}
</style>
