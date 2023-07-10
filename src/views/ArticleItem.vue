<!--文章项的内容-->
<template>
    <div class="article-item">
        <div class="item-inner">
            <!--显示用户名和时间-->
            <div class="user-info">
                <router-link :to="'/'" class="a-link">{{data.nickname}}</router-link>
                <el-divider direction="vertical"></el-divider>
                <div class="time">{{data.time}}</div>
            </div>
            <!--显示文章复选框和标题-->
            <div class="check-title">
                <el-checkbox class="check" 
                    v-model="articleArray[data.id]"
                ></el-checkbox>
                <router-link :to="`/article/${data.id}`"  class="title" target="_blank">{{data.title}}</router-link>
            </div>
            <!--显示文章梗概-->
            <div class="info">{{data.info}}</div>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive} from 'vue';
//接收父组件的内容
const props=defineProps({
    data:{
        type:Object
    },
    articleArray:{
        type:Array
    }
});
const aid=ref();
aid.value=props.data.id;
</script>

<style lang="scss" scoped>
.article-item{
    padding:5px 20px 0 5px;
    .item-inner{
        border-bottom: 1px solid #ddd;
        padding:10px 0;
        .user-info{
            display: flex;
            align-items: center;
            margin-left: 25px;
            .a-link{
                font-size: 15px;
                text-decoration: none;
            }
            .a-link:hover{
                color: blue;
            }
            .time{
                color: black;
            }
        }
        .title{
            font-weight:bold;
            text-decoration: none;
            color:#4a4a4a;
            font-size:20px;
            margin:6px 5px;
            display: inline-block;
        }
        .info{
            font-size: 15px;
            color: #869090;
            margin-left: 25px;
        }
        .check{
            margin-left: 5px;
        }

    }
}
.article-item:hover{
    background: #f5f5f5;
}
</style>