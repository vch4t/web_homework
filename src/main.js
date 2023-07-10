
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueCookies from 'vue-cookies'

import Message from '@/utils/Message'
import indexdb from '@/utils/IndexDB'
import store from '@/utils/Store'
import '@/assets/base.css'

import Pagination from '@/views/Pagination.vue'
import FckEditor from '@/views/FckEditor.vue'

const app = createApp(App)

//各种插件的加载
app.use(router);
app.use(ElementPlus);
app.use(store);
app.config.globalProperties.VueCookies=VueCookies;
//全局变量的使用
app.config.globalProperties.globalParam={
    bodywidth:1200,
    isDebug:1,
    showAvater:0
}
app.config.globalProperties.Message=Message;
app.config.globalProperties.indexdb=indexdb;

app.component("Pagination",Pagination);
app.component("FckEditor",FckEditor);



app.mount('#app')
