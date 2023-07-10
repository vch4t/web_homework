<!--文章列表组件-->
<template>
    <div class="body-contain" :style="{width:proxy.globalParam.bodywidth+'px'}">
        <!--工具栏，显示删除按钮-->
        <div class="article-bar">
            <el-button type="info">最新</el-button>
            <el-button type="info" :disabled="isDisable" @click="mulDelete">删除</el-button>
        </div>
        <!--包含分页组件和各文章项-->
        <div class="article-list">
            <Pagination :dataSource="articleInfo" @loadData="loadArticlePage">
                <template #default="{data}">
                    <ArticleItem :data="data" :articleArray="articleArray"></ArticleItem>
                </template>
            </Pagination>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, getCurrentInstance,onMounted,watch} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {useStore} from 'vuex';
import ArticleItem from "./ArticleItem.vue"

const {proxy} = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const store=useStore();

const articleArray=ref([]);
const isDisable=ref(true);
//监听复选框是否有改变
watch(()=>[...articleArray.value],
    (now,old)=>{
        if(now.some((val)=>val===true)){
            isDisable.value=false;
        }
        else{
            isDisable.value=true;
        }
    }
)
//多选删除
const mulDelete=async function (){
    let marray=articleArray.value;

    for(var i=0;i<marray.length;++i){
        if(marray[i]===true){ 
            await proxy.indexdb.deleteByKey(i);
        }
    }
    router.go(0);
    
}

const articleInfo=ref({});
//加载文章长度及一页文章项
const loadArticle=()=>{
    articleInfo.value.pageNo=1;
    articleInfo.value.pageSize=10;
    proxy.indexdb.getAllDB().then((res)=>{
        articleInfo.value.size=res.length;
        loadArticlePage();
    });
}
//加载一页文章
const loadArticlePage=()=>{
    proxy.indexdb.getAllByPage(articleInfo.value.pageNo,articleInfo.value.pageSize).then((res)=>{
        articleInfo.value.array=res;
    });
}
//初始化数据库，并读取内容
onMounted(()=>{
    proxy.indexdb.openDB().then((res)=>{
        proxy.indexdb.db=res;
        loadStorage();
        loadArticle();
    });
});

//制造一些初始数据进行测试
const loadStorage=()=>{
    let result=localStorage.getItem("articleInfo");
    if(result){
        return;
    }
    let sarry=[];
    let endTime=new Date().getTime();
    let startTime=new Date(2020,0,1).getTime();
    for(var i=0;i<21;++i){
        let ob={};

        let randomTime=startTime+Math.floor(Math.random()*(endTime-startTime));
        let date=new Date(randomTime);
        let day=date.getDate();
        let month=date.getMonth()+1;
        let year=date.getFullYear();
        let week=date.getDay();
        let hour=date.getHours();
        let minute=date.getMinutes();
        //转换格式
        month=month<10?'0'+month:month;
        day=day<10?'0'+day:day;
        hour=hour<10?'0'+hour:hour;
        minute=minute<10?'0'+minute:minute;
        ob.time=year+'-'+month+'-'+day+" "+hour+':'+minute;
        ob.timeStamp=randomTime;

        sarry.push(ob)
    }
    sarry.sort((a,b)=>{return a.timeStamp-b.timeStamp});
    for(var i=0;i<20;++i){
        sarry[i].id=i;
        sarry[i].nickname="name"+i.toString();
        sarry[i].title="title"+i.toString();
        sarry[i].data="article"+i.toString();
        sarry[i].info="info"+i.toString();
        proxy.indexdb.updateDB(sarry[i]);
    }
    sarry[20].data="<p>😊</p><p><br></p><pre><code >#include&lt;iostream&gt;\n\
using std::cout;\n\
\n\
int main(){\n\
    cout&lt;&lt;\"hello world!\"&lt;&lt;endl;\n\
    return 0;\n\
}</code></pre><p><br></p>";
    sarry[20].id=20;
    sarry[20].nickname="hello"
    sarry[20].title="Hello World!"
    sarry[20].info="hello world!coding!"
    proxy.indexdb.updateDB(sarry[20]);
    localStorage.setItem("articleInfo",true);
    
}

</script>

<style lang="scss" scoped>
.body-contain{
    margin:64px auto 0;
    .article-bar{
        display: flex;
        justify-content: space-between;
        background: white;
        border-radius: 5px;
    }
    .article-list{
        margin-top: 3px;
        background: white;
    }
}
</style>