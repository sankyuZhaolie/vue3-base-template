<script setup>
import BreadCrumb from '@/layout/tabber/breadcrumb/index.vue'
import Setting from '@/layout/tabber/setting/index.vue'
</script>

<template>
  <div class="tabber">
    <div class="tabbar_left">
      <BreadCrumb></BreadCrumb>
    </div>
    <div class="tabbar_right">
      <Setting></Setting>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabber {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cccccc88; // ✅ 完整写法

  .tabbar_left {
    margin-left: 22px;
    display: flex;
    align-items: center;
  }

  .tabbar_right {
    display: flex;
    align-items: center;
    margin-right: 15px;
  }
}
</style>