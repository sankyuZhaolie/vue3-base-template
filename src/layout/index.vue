<script setup>
import Logo from '@/layout/logo/index.vue'
import Menu from '@/layout/menu/index.vue'
import Tabber from '@/layout/tabber/index.vue'
import Main from '@/layout/main/index.vue'
import {useUserStore} from "@/store/modules/user.js";

let userStore = useUserStore()

</script>

<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <Menu :menuList="userStore.menuRoutes"></Menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar">
      <Tabber></Tabber>
    </div>
    <el-scrollbar class="layout_main">
      <Main></Main>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  user-select: none; // 禁止文本选择
  cursor: default; // 默认鼠标指针

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all .3s;

    .scrollbar {
      width: $base-menu-width;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }

      &.fold {
        width: $base-menu-min-width;
        transition: all .6s; /* 收缩时的过渡效果 */
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0;
    left: $base-menu-width;
    background-color: $base-background;

    &.fold {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
      transition: all .6s; /* 收缩时的过渡效果 */
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    top: $base-tabbar-height;
    left: $base-menu-width;
    padding: 20px;
    background-color: $base-background;
    transition: all .1s; /* 添加过渡效果 */

    &.fold {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
      transition: all .6s; /* 添加过渡效果 */
    }
  }

}
</style>