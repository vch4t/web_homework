<!--主页面-->
<template>
    <div>
        <!--导航栏-->
        <div class="header" v-show="showHead">
            <div class="head-cont" :style="{width:proxy.globalParam.bodywidth+'px'}">
                <!--跳转回开始界面-->
                <router-link to="/" class="name">MyBBS</router-link>
                <!--待开发，目前是填充作用-->
                <div class="menu-bar"></div>
                <!--用户信息栏-->
                <div class="user-info">
                    <el-button type="primary" @click="newPost">发帖&nbsp;&nbsp;+</el-button>
                    <!--下拉栏，显示用户信息及退出功能-->
                    <el-dropdown v-if="userInfo.showAvater">
                        <el-button round :style="{'margin-left': '40px'}">{{userInfo.nickname}}</el-button>
                        <template #dropdown>
                            <el-dropdown-item @click="showUserInfo">个人信息</el-dropdown-item>
                            <el-dropdown-item @click="userInfo.showAvater=false">退出登录</el-dropdown-item>
                        </template>
                    </el-dropdown>
                    <!--按钮组进入不同界面-->
                    <el-button-group :style="{'margin-left': '10px'}" v-else>
                        <el-button type="primary" plain @click="loginRegister(1)">登录</el-button>
                        <el-button type="primary" plain @click="loginRegister(0)">注册</el-button>
                    </el-button-group>
                </div>
            </div>
        </div>
        <!--主界面-->
        <div class="body-cont">
            <router-view />
        </div>
        <!--登录注册界面-->
        <div>
            <LoginRegister ref="loginRegisterRef"></LoginRegister>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive, getCurrentInstance, onMounted, watch} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import LoginRegister from "./LoginView.vue";
import {useStore} from 'vuex';
import { ElMessage, ElMessageBox } from 'element-plus';

const {proxy} = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const store=useStore();


const showHead = ref(true);
//滚动条的设置，拉到下面一定距离隐藏顶栏，向上就会显现
const startScroll=()=>{
    let startP=document.documentElement.scrollTop
    window.addEventListener("scroll",()=>{
        let currentP=document.documentElement.scrollTop
        if(currentP>startP){
            if(currentP>100){
                    showHead.value=false;
            }
        }
        else{
            showHead.value=true;
        }
    
        startP=currentP;
    })
};
const loginRegisterRef=ref();
//接口引用
const loginRegister=(type)=>{
    loginRegisterRef.value.showLogin(type);
};


onMounted(()=>{
    startScroll();
    getUserInfo();
});

//获取用户信息
const getUserInfo=()=>{

    let result=proxy.VueCookies.get("lastLogin");
    if(result){
        if(result.remember===true){
            store.commit("updateLoginUserInfo",result);
            userInfo.value=result;
        }
    }
    else{
        userInfo.value.showAvater=false;
    }
}

const userInfo=ref({});
//监测用户信息有没有改变，并同步更改当前组件的值
watch(()=>store.state.loginUserInfo,
    (newVal,oldVal)=>{
        
        if(newVal!==undefined&&newVal!==null){
            userInfo.value=newVal;
        }
        else{
            userInfo.value={};
        }
    },{
        immediate:true,deep:true
});
//显示用户信息
const showUserInfo=()=>{
    ElMessageBox.alert("昵称："+userInfo.value.nickname+"<br>账号："+userInfo.value.account,"个人信息",{
        confirmButtonText:"确定",
        draggable:true,
        dangerouslyUseHTMLString:true,
        type:'info'
    })
}
//进入发帖界面
const newPost=()=>{
    if(store.getters.getLoginUserInfo){
        router.push("/newPost");
    }
    else{
        loginRegister(1);
    }
}

</script>

<style lang="scss" scoped>
.header{
    top:0px;
    height: 60px;
    width:100%;
    position: fixed;
    box-shadow: 0 2px 6px 0;
    background: white;
    z-index: 10;
    .head-cont{
        margin: 0 auto;
        align-items: center;
        height: 60px;
        display: flex;

        .name{
            color:darkblue;
            font-size: 40px;
            text-decoration: none;
            margin-right: 5px;
        }
        .menu-bar{
            flex:1;
        }
        .user-info{
            width:250px;
        }
    }
}
.body-cont{
    margin-top:60px;
}
</style>