<template>
    <div>
        <div style="display: flex;flex-direction: column; align-items:center;">
            <div style="padding-bottom: 20px; font-size:38px;">{{info.theme}}</div>
            <div v-if="info.username" style="padding-bottom: 20px;width: 80%;">发布人:{{info.username}}</div>
            <div v-if="info.publishTime" style="padding-bottom: 20px;width: 80%;">发布时间:{{info.publishTime}}</div>
            <div style=" padding-bottom: 20px;color: #8C939D;">{{info.summary}}</div>
            <div style="padding-bottom: 20px;width: 80%;" v-html="info.content.html"></div>
            <div style="width: 80%">
                <span>评论：</span>
                <div v-for="(item,index) in comment" :key="index" class="comment">
                    <div style="width: 30px;height: 30px;">
                        <img src="https://p1.pstatp.com/thumb/5d48000c7102f0c3b89a" width="100%" height="100%" style="border-radius:50%;" />
                    </div>
                    <div style="margin-left: 10px;">
                        <span>{{item.nickName}}  :</span><br />
                        <div style="margin-top: 6px;  margin-left: 10px;">&nbsp;&nbsp; {{item.comment}}</div>
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
                    content: {
                        html: '',
                        text: "",
                    }
                },
                comment: [],
            }
        },
        methods: {
            handleClose() {
                this.$emit('close');
            },
            getData() {
                this.$http.get("/micro/read/getdata", {
                    id: this.$route.params.id
                }, true).then(
                    (data) => {
                        if (data) {
                            console.log(data);
                            this.info = data.microReading;
                            this.info.content = JSON.parse(this.info.content); //将字符串转换成json对象
                            this.comment = data.microReadingComment;
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
    #activitityitem .el-dialog__body {
        padding: 0 0 30px 20px;
    }
 
    #activitityitem .el-col:first-child {
        margin-bottom: 20px;
        font-size: 26px;
        text-align: center;
    }
 
    #activitityitem .el-col:nth-child(2),
    #activitityitem .el-col:nth-child(3) {
        margin-bottom: 5px;
        font-size: 14px;
        color: #909292;
        text-align: center;
    }
 
    #activitityitem .el-col:nth-child(3) p {
        text-align: left;
    }
 
    #activitityitem .el-col:nth-child(2) label,
    #activitityitem .el-col:nth-child(3) label {
        margin-left: 10px;
    }
 
    #activitityitem .el-col:nth-child(3) {
        margin-top: 30px;
    }
 
    #partyactivitycontent {
        background: center center no-repeat #ffffff;
        background-size: cover;
    }
</style>