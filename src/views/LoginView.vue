<!--登录界面组件-->
<template>
    <div>
        <!--登录注册对话框-->
        <el-dialog v-model="dialogFormVisible" :title="formTitle" :width="formDialogWidth" draggable>
            <!--表单及其各项的设置，通过设置不同的type显示不同的form-item区分登录注册-->
            <el-form :model="formData" :rules="rules" ref="formDataRef">
                <el-form-item label="昵称:" :label-width="formLabelWidth" prop="nickname" v-if="loginType===0">
                    <el-input v-model="formData.nickname" clearable placeholder="请输入昵称" />
                </el-form-item>
                <el-form-item label="账号:" :label-width="formLabelWidth" prop="account">
                    <el-input v-model="formData.account" clearable placeholder="请输入账号" />
                </el-form-item>
                <el-form-item label="密码:" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="formData.password" clearable placeholder="请输入密码" show-password/>
                </el-form-item>
                <el-form-item label="密码:" :label-width="formLabelWidth" prop="repassword" v-if="loginType===0">
                    <el-input v-model="formData.repassword" clearable  placeholder="请再次输入密码" show-password/>
                </el-form-item>
                <el-form-item v-if="loginType===1">
                    <div class="checkbox">
                        <el-checkbox v-model="formData.remember" prop="remember">记住密码</el-checkbox>
                        <!--跳转到登录界面-->
                        <a href="javascript:void(0)" @click="loginType=0;resetForm()">没有账号?</a>
                    </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <!--相应功能按钮，提交表单与否-->
                <div class="dialog-footer">
                    <el-button type="primary" @click="mSubmit">{{formTitle}}</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import {ref, reactive, getCurrentInstance, nextTick} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {useStore} from 'vuex'
import md5 from "js-md5";
const {proxy} = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const store=useStore();

const loginType=ref();

//登录页加载
const showLogin=(type)=>{
    loginType.value=type;
    resetForm(type);
};
defineExpose({showLogin});

const formData=ref({});
const formDataRef=ref();
//验证相关输入信息
const mvalidate=(rule, value, callback)=>{
    let reg= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,20}$/;
    if(value!==formData.value.password){
        callback(new Error(rule.message));
    }
    else{
        callback();
    }

}
//表单规则
const rules={
    nickname:[{required:true, message:"请输入昵称"},
    {max:20,message:"昵称太长,只支持20以内字符"}],
    account:[{required:true, message:"请输入帐号"},
    {max:20,message:"账号太长,只支持20以内字符"},
    {pattern:/^\w+$/,message:"只支持数字及字母下划线！"}],
    password:[{required:true, message:"请输入密码"},
    {max:20,message:"密码太长,只支持20以内字符"},
    {pattern:/^\w+$/,message:"只支持数字及字母下划线！"}],
    repassword:[{required:true, message:"请再次输入密码"},
    {validator:mvalidate,message:"两次密码不一致，请重新输入"}]
};
const dialogFormVisible = ref(false);
const formLabelWidth = '60px';
const formDialogWidth = '400px';
const formTitle=ref("");

//每次进入清空表单并显示相应的界面
const resetForm=(type)=>{
    dialogFormVisible.value = true;
    if(type===1){
        formTitle.value="登录";
    }else{
        formTitle.value="注册";
    }
    nextTick(()=>{
        formDataRef.value.resetFields();
        formData.value={};
        if(loginType.value===1){
            const cookieInfo=proxy.VueCookies.get("loginInfo");
            if(cookieInfo){
                formData.value=cookieInfo;
            }
        }
    });
};
//表单提交
const mSubmit=()=>{
    
    if(proxy.globalParam.isDebug===0){
        //后端保留
    }
    else{
        formDataRef.value.validate((valid)=>{
             if(!valid){
                return;
            }
            //注册后信息的保存
            if(loginType.value===0){
                const loginInfo={
                    nickname:formData.value.nickname,
                    account:formData.value.account,
                };
                proxy.VueCookies.set(formData.value.account,loginInfo,-1);
                proxy.Message.success("注册成功，请登录");
                dialogFormVisible.value = false;
            }
            else{
                //登录时判断是否自动登录
                if(formData.value.remember){
                    //将相应的信息进行短期记录
                    const loginInfo={
                        account:formData.value.account,
                        password:formData.value.password,
                        remember:formData.value.remember
                    };
                    proxy.VueCookies.set("loginInfo",loginInfo,"30D");
                }
                else{
                    //删除保存的信息
                    proxy.VueCookies.remove("loginInfo");
                }
                //判断账号是否注册
                if(!proxy.VueCookies.get(formData.value.account)){
                    return proxy.Message.error("登录失败，未注册");
                }
                //页面转换
                proxy.Message.success("登录成功");
                dialogFormVisible.value = false;
                //设置最后登录的信息。
                const mInfo={
                    showAvater:true,
                    account:formData.value.account,
                    nickname:proxy.VueCookies.get(formData.value.account).nickname,
                    remember:formData.value.remember
                }
                proxy.VueCookies.set("lastLogin",mInfo,"30D");
                //方便后续全局使用
                store.commit("updateLoginUserInfo",mInfo);
            }
        });
    }
}

</script>

<style lang="scss" scoped>
.el-button--text {
  margin-right: 15px;
}
.el-input {
  width: 300px;
}
.dialog-footer{
    text-align: right;
    button:first-child {
    margin-right: 10px;
 }
}
.checkbox{
    margin-left: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
}
</style>