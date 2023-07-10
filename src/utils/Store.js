import { createStore } from "vuex";

//保存变量，方便在多个组件中使用
export default createStore({
    state:{
        loginUserInfo:null,
        articleInfo:[]
    },
    //返回结果
    getters:{
        getLoginUserInfo:(state)=>{
            return state.loginUserInfo;
        }
    },
    //更新函数
    mutations:{
        updateLoginUserInfo(state,value){
            state.loginUserInfo=value;
        },
        appendArticleInfo(state,value){
            state.articleInfo.push(value);
        },
        setArticleInfo(state,value){
            state.articleInfo=value;
        }
    }

})