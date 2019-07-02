<template>
	<div>
		<div class="actionbox" style="margin-bottom: 20px;">
			<el-button class="hnys" type="primary" icon="el-icon-plus" @click="dialogVisible=true">新增角色</el-button>
		</div>
		<el-table :data="pageInfo.list" border style="width: 100%">
			<el-table-column prop="id" label="ID" width="180"></el-table-column>
			<el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
			<el-table-column prop="action" label="操作" >
				<template slot-scope="scope">
				<el-button type="primary" size="small" @click="cdqxButtonChick(scope.row)">菜单权限</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :close-on-click-modal="false" title="新增角色" :visible.sync="dialogVisible" width="30%" :before-close="addhandleClose">
			<span>
				<RoleAdd ref="RoleAdd"></RoleAdd>
			</span>
			<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="addDialogOkClick">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import RoleAdd from './RoleAdd.vue';
export default {
	components:{
		RoleAdd
	},
	data:function() {
		return {
			dialogVisible:false,
			pageInfo:{
				list:[]
			}
		}
	},
	methods:{
		addhandleClose(done){
			done();
		},
		addDialogOkClick(){
			this.$refs.RoleAdd.submit();
		}
	},
	created() {
		this.$http.get("/sys/getallrole",true).then(res=>{
			this.pageInfo.list = res;
		})
	}
}
</script>

<style lang="scss" scoped>
	.elpagination{
		margin-top: 10px;
	}
	.actionbox{
	padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 20px 0;
	}
	.hnys{
		margin-right: 10px; 
	}
</style>
