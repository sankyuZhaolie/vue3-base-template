import {createRouter, createWebHistory} from 'vue-router'

import {
    HomeFilled, Document, Setting, Histogram
} from '@element-plus/icons-vue'

export const constantRoute = [{
    path: '/', component: () => import('@/layout/index.vue'), meta: {title: 'Layout', hidden: true},  // 👈 加上这行
    children: [{
        path: '', name: 'Home', component: () => import('@/views/home/index.vue'), meta: {title: '首页', icon: HomeFilled, hidden: false}
    }, {
        path: 'invoice', name: 'Invoice', component: () => import('@/views/invoice/index.vue'), meta: {title: '开票查询', icon: Document, hidden: false}
    }, {
        path: 'quota', name: 'Quota', component: () => import('@/views/quota/index.vue'), meta: {title: '额度调整', icon: Setting, hidden: false}
    }, {
        path: 'logs', name: 'Logs', component: () => import('@/views/logs/index.vue'), meta: {title: '接口日志', icon: Histogram, hidden: false}
    },]
}, {
    path: '/login', name: 'Login', component: () => import('@/views/login/index.vue'), meta: {title: '登录', hidden: true}
}, {
    path: '/404', name: 'NotFound', component: () => import('@/views/404/index.vue'), meta: {title: '404', hidden: true}
}, {
    path: '/:pathMatch(.*)*', redirect: '/404'
}]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), routes: constantRoute, // ✅ 这里必须是 routes
    scrollBehavior() {
        return {top: 0}
    },
})


export default router
