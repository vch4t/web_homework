import {ElMessage} from 'element-plus'

//各类信息的输出
const message={
    error:(msg,callback)=>{
        ElMessage({
            type:"error",
            message:msg,
            duration:2000,
            onClose:()=>{
                if(callback){
                    callback();
                }
            }
        })
    },
    success:(msg,callback)=>{
        ElMessage({
            type:"success",
            message:msg,
            duration:2000,
            onClose:()=>{
                if(callback){
                    callback();
                }
            }
        })
    },
    warning:(msg,callback)=>{
        ElMessage({
            type:"warning",
            message:msg,
            duration:2000,
            onClose:()=>{
                if(callback){
                    callback();
                }
            }
        })
    },

}

export default message;