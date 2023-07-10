<!--富文本框组件-->
<template>
    <div>
        <Toolbar
        style="border-bottom:1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toobarConfig"
        :mode="mode"/>
        <Editor
        :style="{height:height+'px','overflow-y':'hidden'}"
        :model-value="modelValue"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="onChange"/>
    </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css";
import {onBeforeUnmount,ref,shallowRef} from 'vue';
import {Editor,Toolbar} from "@wangeditor/editor-for-vue"
import {getCurrentInstance} from "vue"
const {proxy}=getCurrentInstance();
//子组件获得父组件的参数
const props=defineProps({
    modelValue:{
        type:String,
        default:""
    },
    height:{
        type:Number,
        default:500
    }
});

const mode=ref("default");
const editorRef=shallowRef();
//配置富文本框
const toobarConfig={
}

const editorConfig={
    placeholder:"请输入内容",
    maxLength: 100,
    MENU_CONF:{
        uploadImage:{
            maxFileSize: 3*1024*1024,
            filedName:"file",
        }
    }
}
//绑定值获得数据
const emit=defineEmits();
const onChange=(editor)=>{
    emit("update:modelValue",editor.getHtml());
};
//退出时要清除相关数据
onBeforeUnmount(()=>{
    const editor =editorRef.value;
    if(editor===null) return;
    editor.destroy();
});
//初始化
const handleCreated=(editor)=>{
    editorRef.value=editor;
}

</script>

<style lang="scss" scoped>

</style>