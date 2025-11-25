<script setup>
import {ArrowRight} from "@element-plus/icons-vue";
// import useLayOutSettingStore from "@/store/modules/setting";
import {useRoute} from "vue-router"
// let settingStore = useLayOutSettingStore()
let $route = useRoute()
// 过滤匹配的路由，只显示有 meta.title 且 hidden !== true 的路由
const breadcrumbList = computed(() =>
    $route.matched.filter(item => item.meta && item.meta.title && !item.meta.hidden)
);
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="index" :to="item.path">
      <el-icon style="margin-right: 8px">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="font-size: 13px;font-weight: normal;">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss">

</style>