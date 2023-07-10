<!--程序的入口-->
<template>
	<el-config-provider :locale="locale" :message="config">
	<router-view />
	</el-config-provider>
</template>



<script setup>
import { RouterLink, RouterView } from 'vue-router'

import {reactive} from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
const locale=zhCn;
const config=reactive({
	max:1
});

</script>



<style scoped>

</style>
