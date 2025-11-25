<script setup>
import {ref, watch, computed} from 'vue'
import {useRouter, useRoute} from 'vue-router'

// 接收路由菜单
const props = defineProps({
  menuList: {
    type: Array,
    default: () => []
  }
})

const router = useRouter()
const route = useRoute()

// 当前激活菜单（用于高亮）
const activeIndex = ref(route.path)

// 监听路由变化自动更新高亮
watch(
    () => route.path,
    (newPath) => {
      activeIndex.value = newPath
    }
)

// 安全过滤，防止 item 为 undefined 或没有 meta
const safeMenuList = computed(() => {
  // 找到根布局
  const root = props.menuList.find(item => item.path === '/' && item.children)
  if (!root) return []

  // 过滤子菜单
  const children = root.children.filter(
    child => child && child.meta && child.meta.hidden !== true
  )
  return children
})



// 跳转路由
const handleSelect = (index) => {
  router.push(index)
}
</script>

<template>
  <el-menu
      :default-active="activeIndex"
      router
      background-color="#1f2d3d"
      text-color="#bfcbd9"
      active-text-color="#ffd04b"
      class="el-menu-vertical-demo"
      @select="handleSelect"
  >
    <template v-for="item in safeMenuList" :key="item.path">
      <!-- 一级菜单（无子菜单） -->
      <el-menu-item
          v-if="!item.children && !item.meta?.hidden"
          :index="item.path.startsWith('/') ? item.path : `/${item.path}`"
      >
        <el-icon>
          <component :is="item.meta?.icon"/>
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </el-menu-item>

      <!-- 仅一个子菜单 -->
      <el-menu-item
          v-else-if="item.children?.length === 1 && !item.children[0]?.meta?.hidden"
          :index="item.children[0].path.startsWith('/') ? item.children[0].path : `/${item.children[0].path}`"
      >
        <el-icon>
          <component :is="item.children[0].meta?.icon"/>
        </el-icon>
        <span>{{ item.children[0].meta?.title }}</span>
      </el-menu-item>

      <!-- 多个子菜单 -->
      <el-sub-menu v-else :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta?.icon"/>
          </el-icon>
          <span>{{ item.meta?.title }}</span>
        </template>

        <el-menu-item
            v-for="child in item.children || []"
            v-if="!child?.meta?.hidden"
            :key="child.path"
            :index="child.path.startsWith('/') ? child.path : `/${child.path}`"
        >
          <el-icon>
            <component :is="child.meta?.icon"/>
          </el-icon>
          <span>{{ child.meta?.title }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<style scoped lang="scss">
.el-menu-vertical-demo {
  border-right: none;
  height: 100%;
  background-color: #1f2d3d;
  color: #bfcbd9;
}
</style>
