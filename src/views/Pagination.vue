<!--分布组件-->
<template>
    <!--向外传递数据，显示数据项-->
    <div v-for="item in dataSource.array">
        <slot :data="item"></slot>
    </div>
    <!--分页设置-->
    <div>
        <el-pagination
        v-if="dataSource.array"
      v-model:current-page="dataSource.pageNo"
      v-model:page-size="dataSource.pageSize"
      :page-sizes="[10, 15, 25, 50]"
      layout="sizes, prev, pager, next"
      :total="dataSource.size"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    </div>
</template>

<script setup>
const props=defineProps({
    dataSource:{
        type:Object
    },
});
//设置相应功能让文章显示相应页码内容
const emit=defineEmits(["loadData"]);
const handleCurrentChange=(pageNo)=>{
    props.dataSource.pageNo=pageNo;
    emit("loadData");
}
//设置相应页码的大小
const handleSizeChange=(size)=>{
    props.dataSource.pageSize=size;
    emit("loadData");
}

</script>

<style lang="scss" scoped>

</style>