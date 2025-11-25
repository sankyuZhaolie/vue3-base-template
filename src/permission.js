import router from '@/router'
import NProgress from 'nprogress'

// 路由开始时加载进度条
router.beforeEach((to, from, next) => {
    NProgress.start()

    const token = localStorage.getItem('token')
    const expiresAt = Number(localStorage.getItem('expires_at')) // 秒时间戳
    const now = Math.floor(Date.now() / 1000)

    // ⭐ 1. 未登录：跳转登录
    if (!token && to.path !== '/login') {
        return next({path: '/login', query: {redirect: to.fullPath}})
    }

    // ⭐ 2. 已登录但 token 已过期：清除并跳登录
    if (token && expiresAt && now > expiresAt) {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('dept')
        localStorage.removeItem('expires_at')
        return next({path: '/login', query: {expired: 1}})
    }

    // ⭐ 3. 登录状态访问 login：跳首页
    if (token && to.path === '/login') {
        return next({path: '/'})
    }

    next()
})


// 路由结束时关闭进度条
router.afterEach(() => {
    NProgress.done() // ✅ 结束进度条
})

