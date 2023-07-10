<!--发帖组件-->
<template>
    <div class="editor">
        <!--表单-->
        <el-form 
          :model="formData"
          :rules="rules"
          ref="formDataRef"
          label-width="50px"
          class="post-panel"
        >
            <div class="fck-editor">
                <el-card>
                    <template #header>
                        <span>编辑区</span>
                    </template>
                    <!--富文本框内容获取-->
                    <el-form-item prop="data" >
                        <FckEditor :height="FckEditorHeight" v-model="formData.data"></FckEditor>
                    </el-form-item>
                </el-card>
            </div>
            <!--信息栏相关-->
            <div class="float-menu"> 
                <el-card>
                    <template #header>
                        <span>文章信息</span>
                    </template>
                    <!--input输入-->
                    <el-form-item  label="标题" prop="title" >
                        <el-input 
                        clearable 
                        placeholder="请输入标题" 
                        :maxlength=10
                        v-model="formData.title"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="梗概" prop="info">
                        <el-input
                        clearable
                        placeholder="请输入梗概" 
                        v-model="formData.info"
                        type="textarea"
                        :rows="5"
                        :maxlength=100
                        resize="none"
                        show-word-limit
                        spellcheck="false"
                        >
                        </el-input>
                    </el-form-item >
                    <el-button type="primary" :style="{width:'100%'}" @click="postHandle">发送</el-button>
                </el-card>
            </div>
        </el-form>
    </div>
</template>

<script setup>
import {ref, reactive, getCurrentInstance} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {useStore} from 'vuex';
const {proxy} = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const formData=ref({});
const formDataRef=ref();
const store=useStore();

const rules={
    title:[{required:true, message:"请输入标题"}]
};


const FckEditorHeight=window.innerHeight-240;

//发帖处理
const postHandle=()=>{
    formDataRef.value.validate((valid)=>{
        //判断文章内容是否合格
        if(!valid){
            return;
        }
        let params={};
        Object.assign(params,formData.value);
        console.log(params);
        const dataCont=params.data.replace(/<(?!img).*?>/g,"");
        if(dataCont===""){
            proxy.message.warning("正文不能为空！");
            return;
        }
        //获取id
        let cnt=JSON.parse(localStorage.getItem('idbsize'));
        params.id=cnt+1;
        //获取时间
        let timeStamp=new Date().getTime();
        let date=new Date(timeStamp);
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
        params.time=year+'-'+month+'-'+day+" "+hour+':'+minute;
        params.timeStamp=timeStamp;
        params.nickname=(store.getters.getLoginUserInfo).nickname;
        //保存数据入库并跳转到文章详情页
        proxy.indexdb.updateDB(params);
        router.push(`/article/${cnt+1}`);
        proxy.globalParam.showAvater=true;
    })
}
</script>

<style lang="scss" scoped>
.editor{
    .post-panel{
        display: flex;

        .fck-editor{
            flex: 1;
        }
        .el-card__header{
            padding: 10px;
        }
        .float-menu{

            width:450px;
            margin-left: 10px;
        }

    }
}

</style>