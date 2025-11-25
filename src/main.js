import { createApp } from 'vue'
import App from '@/App.vue'

// SVG 图标注册
import 'virtual:svg-icons-register'
import '@/styles/index.scss'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 自动注册所有组件
import globalComponent from '@/components'

import router from '@/router'
import pinia from '@/store'

const app = createApp(App)
app.use(globalComponent)
app.use(ElementPlus, { locale: zhCn })
app.use(router)
import "@/permission.js"
import 'nprogress/nprogress.css'
app.use(pinia)
app.mount('#app')
