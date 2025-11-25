<script setup>

</script>

<template>
  <div class="logo">
    <img src="@/assets/images/sankyu-png-MID.png" alt="">
    <p class="title">山九乐企开票管理平台</p>
  </div>
</template>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: #f0f0f0;
  display: flex;
  align-items: center;
  padding: 15px;
  overflow: hidden; /* 防止文字在动画过程中溢出 */

  img {
    max-width: 40px;
    max-height: 40px;
    width: auto; // 让宽度自动调整，保持原始比例
    height: auto; // 让高度自动调整，保持原始比例
  }

  .title {
    transition: opacity 0.3s ease, max-width 0.3s ease; /* 添加过渡效果 */
    max-width: 200px; /* 初始最大宽度 */
    margin-left: 5px;
    font-size: 16px;
    font-weight: 550;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>