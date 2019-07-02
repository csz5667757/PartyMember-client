<template>
	<div>
		<el-form ref="form" :rules="formRules" :model="form" label-width="100px">
			<el-form-item label="角色名称" prop="roleName">
				<el-input v-model="form.roleName"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	components:{
	},
	data:function() {
		return {
			form:{},
			formRules:{}
		}
	},
	methods:{
		cleanForm(){
			this.form={}
		},
		submit(){
			this.$http.post("/sys/addrole",this.form,true).then(res=>{
				if(res==1){
					this.$message({
						message: "角色添加成功",
						type: 'success',
						duration:2000
					})
					this.cleanForm();
				}else{
					this.$message({
						message: "角色添加失败",
						type: 'error',
						duration:2000
					})	
				}				
			})
		},
	}
}
</script>

<style>
</style>
