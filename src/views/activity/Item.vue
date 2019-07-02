<template>
	<div>
		<div style="display: flex;flex-direction: column; align-items:center;">
			<div style="padding-bottom: 20px; font-size:38px;">{{info.title}}</div>
			<div style="padding-bottom: 20px; color: #8C939D;"><span>活动时间:</span><span>{{info.startTime|dateformat('YYYY-MM-DD HH:mm:ss')}}</span>至<span>{{info.endTime|dateformat('YYYY-MM-DD HH:mm:ss')}}</span></div>
			<div style=" padding-bottom: 20px;color: #8C939D;"><span>活动地点:</span>{{info.address}}</div>
			<!-- <div><img  :src="'/api/fileupload/getactivity?image='+form.image"></div> -->
			<!-- <div style="padding-bottom: 20px;width: 80%;">{{form.content}}</div> -->
			<div style="padding-bottom: 20px;width: 80%;" v-html="info.details.html"></div>
			<div style="padding-bottom: 20px;width: 80%;">
				<span>活动参与者：</span>
				<span v-for="(item,index) in partake" :key="index">{{item.name}}&nbsp;&nbsp;</span>
			</div>
			<div style="width: 80%">
				<span>评论：</span>
				<div v-for="(item,index) in comment" :key="index" class="comment">
					<div style="width: 30px;height: 30px;">
						<img src="https://p1.pstatp.com/thumb/5d48000c7102f0c3b89a" width="100%" height="100%" style="border-radius:50%;" />
					</div>
					<div style="margin-left: 10px;">
						<span>{{item.nickName}}  :</span><br />
						<div style="margin-top: 6px; margin-left: 10px;">&nbsp;&nbsp; {{item.content}}</div>
					</div>
				</div>
			</div>
			<!-- {{info}} -->
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					details: {
						html: '',
						text:"",
					}
				},
				partake: [],
				comment: [],
			}
		},
		methods: {
			handleClose() {
				this.$emit('close');
			},
			getData() {
				this.$http.get("/activity/getdata", {
					id: this.$route.params.id
				}, true).then(
					(data) => {
						if (data) {
							console.log(data);
							this.info = data.activityInfo;
							this.info.details = JSON.parse(this.info.details); //将字符串转换成json对象
							this.partake = data.activityPartake;
							this.comment = data.activityComment;
						} else {
							this.$message({
								message: "加载失败，请联系管理员",
								type: 'error',
								duration: 2000
							})
						}
					}
				)
			},
		},
		mounted() {
			this.getData();
		}
	}
</script>

<style>
	.comment{
		 display: flex;
		 flex-direction:row;
		 margin-top:10px;
	}

</style>
