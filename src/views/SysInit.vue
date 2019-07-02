<template>
	<div id="sysinit">
		<!-- <el-progress :show-text="false" :text-inside="true"  :percentage="70"></el-progress> -->
	</div>
</template>

<script>
	import http from '@/http';
	export default {
		name: "sys-init",
		data() {
			return {}
		},
		methods: {
			init() {

			}
		},
		created() {
			var storage = window.sessionStorage;
			if (!storage.getItem('initData'))
			{
				http.get("/sys/init", {}, false,false).then(data => {
					storage.setItem('initData', JSON.stringify(data));
					this.$router.push("/index");
					//console.log('created');
				}).catch(error => {
				
				})
			}else{
				this.$router.push("/index");
			}

		},
		beforeRouteEnter(to, from, next) {
			next();
		}
	}
</script>

<style>
	#sysinit{
		width: 100%;
/* 		background-size:cover;
		background-repeat:  no-repeat;
		background-image: url("../assets/init.jpg");
		background-position: center; */
	}
</style>
