<script setup>
import {FullScreen, Refresh, Setting} from "@element-plus/icons-vue";
import {useUserStore} from "@/store/modules/user";
import {useRouter, useRoute} from "vue-router";

let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();

const fullScreen = () => {
  let full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const logout = () => {
  userStore.logout(); // 你store里面方法叫logout，不是userLogout
  $router.push({path: "/login", query: {redirect: $route.path}});
};
</script>

<template>
  <el-button size="default" circle class="circle-btn">
    <el-icon><Refresh /></el-icon>
  </el-button>
  <el-button size="default" @click="fullScreen" circle class="circle-btn">
    <el-icon><FullScreen /></el-icon>
  </el-button>
  <el-button size="default" circle class="circle-btn">
    <el-icon><Setting /></el-icon>
  </el-button>

  <img alt="" src="@/assets/images/sankyu-png-MID.png" style="width: 30px;height: 30px;margin: 0 5px 0 10px">

  <span style="margin-left: 8px; font-weight: 500;">
    {{ userStore.dept }} - {{ userStore.username }}
    <el-button type="text" @click="logout" style="margin: 0 15px; padding: 0;">
      退出登录
    </el-button>
  </span>
</template>

<style scoped lang="scss">
.circle-btn {
  border: 1px solid #cccccc88; /* 深灰色边框 */
  background-color: transparent;
  color: #333;
}
</style>
