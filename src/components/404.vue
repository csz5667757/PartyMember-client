<template>
    <div class="page404">
        <p>出错了,你访问的页面不存在！</p>
       <!-- <router-link class="btn back" :to="roLink">返回</router-link> -->
    </div>
</template>

<script>
    export default {
        data(){
            return{
                roLink:''
            }
        },
        mounted(){
//             let menuData = JSON.parse(sessionStorage.getItem('menuData'));
//             if(!menuData || !menuData[0].link){
//                 this.roLink = '/login';
//             }else {
//                 this.roLink = "/"+menuData[0].link;
//             }
        },
        created(){

        }
    }


</script>

<style lang="scss" scoped>
    .page404{width: 100vw;height: 100vh;background: url("../assets/404.png") center no-repeat;background-size:cover;}
    p{font-size: 30px; color: #222222;position: fixed;top: 50vh;width: 100vw;text-align: center;}
</style>