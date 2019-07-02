<template>
	<div>
		<div style="display: flex;flex-direction: row; align-items:flex-start;padding-top: 20px;padding-left: 18%;">
			<div id="bookImg">
				<img :src="'/api/fileupload/getbook?image='+info.image" style=""/>
			</div>
			<div class="info">
				<div>书名：{{info.seriesName}}</div>
				<div>作者：{{info.author}}</div>
				<div>页码：{{info.pageNum}}</div>
				<div>出版社：{{info.press}}</div>
				<div>主题词：{{info.themeWords}}</div>
				<div>出版日期：{{info.publicationTime|dateformat('YYYY-MM-DD ')}}</div>
				<div>标准书号：{{info.isbn}}</div>
				<div>中图分类：{{info.booksType}}</div>
				<div>图书地址：{{info.address}}</div>
			</div>

		</div>
		<div id="summary" >
			摘要：{{info.summary}}
		</div>
		<div style="width: 80%; flex-wrap:wrap-reverse;padding-left: 10%;">
			<span>评论：</span>
			<div v-for="(item,index) in comment" :key="index" class="comment">
				<div style="width: 30px;height: 30px;">
					<img src="https://p1.pstatp.com/thumb/5d48000c7102f0c3b89a" width="100%" height="100%" style="border-radius:50%;" />
				</div>
				<div style="margin-left: 10px;">
					<span>{{item.nickName}} :</span><br />
					<div style="margin-top: 6px; margin-left: 10px;">&nbsp;&nbsp; {{item.content}}</div>
				</div>
			</div>
		</div>
		<!-- {{info}} -->
	</div>
</template>
<script>
	export default {
		data() {
			return {
				info: {},
				comment: [],
			}
		},
		methods: {
			getData() {
				this.$http.get("/books/getdata", {
					id: this.$route.params.id
				}, true).then(
					(data) => {
						if (data) {
							console.log(data);
							this.info = data.bookInfo;
							this.comment = data.comment;
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
	#summary{
		width: 80%;
		font-size:20px;
		font-weight: 500;
		flex-wrap:wrap-reverse;
		padding-top: 30px;
		padding-bottom: 30px;
		padding-left: 10%;
		color:#777777;	
	}
	.info {
		padding-left: 10%;
	}

	.info div {
		font-size: 20px;
		padding-top: 10px;
		font-weight: 500;
	}
	.comment {
		display: flex;
		flex-direction: row;
		margin-top: 10px;
		margin-left: 30px;
	}
</style>
