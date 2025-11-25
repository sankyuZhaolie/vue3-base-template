<!-- src/components/SvgIcon/index.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  color: { type: String, default: 'currentColor' }
})

const iconId = computed(() => `#icon-${props.name}`)
const iconStyle = computed(() => ({
  width: typeof props.size === 'number' ? `${props.size}px` : props.size,
  height: typeof props.size === 'number' ? `${props.size}px` : props.size,
  fill: props.color
}))
</script>

<template>
  <svg :style="iconStyle" aria-hidden="true">
    <use :xlink:href="iconId" />
  </svg>
</template>

<style scoped>
svg {
  display: inline-block;
  vertical-align: middle;
}
</style>
