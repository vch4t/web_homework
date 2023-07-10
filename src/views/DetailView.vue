<!--文章详情页的组件-->
<template>
    <div class="body-contain" :style="{width:proxy.globalParam.bodywidth+'px'}" v-if="articleInfo">
        <div class="detail-info">
            <!--文章标题及用户信息-->
            <div class="title">{{articleInfo.title}}</div>
            <div class="user-info">
                <div class="nickname">{{articleInfo.nickname}}</div>
                <el-divider direction="vertical" :style="{height:'25px'}"></el-divider>
                <div class="time">{{articleInfo.time}}</div>
            </div>
            <!--分割线-->
            <el-divider></el-divider>
            <!--文章主体内容-->
            <div class="detail" v-html="articleInfo.data"></div>
        </div>
    </div>
</template>

<script setup>
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-light.css"
import {ref, reactive, getCurrentInstance, onMounted, nextTick} from 'vue';
import {useRouter, useRoute} from 'vue-router';
const {proxy} = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const articleInfo=ref();
//获取文章信息并进行代码高亮
const getArticleInfo=(title)=>{
    proxy.indexdb.openDB().then((res)=>{
        proxy.indexdb.db=res;
        proxy.indexdb.getByKey(title).then((res)=>{
        articleInfo.value=res;
        highlightCode();
    });
    })
    
}

onMounted(()=>{
    getArticleInfo(parseInt(route.params.articleId));
});
//代码高亮
const highlightCode=()=>{
    nextTick(()=>{
        let blocks=document.querySelectorAll("pre code");
        blocks.forEach(item=>{
            hljs.highlightBlock(item);
        });
    });
}


</script>

<style lang="scss" scoped>
.body-contain{
    margin:64px auto 0;
    .detail-info{
        background: white;
        padding: 10px;
        .title{
            font-weight: bolder;
            font-size: 20px;
        }
        .user-info{
            margin-top:10px;
            display: flex;
            .nickname{
                font-size: 15px;
                font-weight:bold ;
            }
        }
        .detail{
            padding:0 20px;
        }
    }
}
</style>