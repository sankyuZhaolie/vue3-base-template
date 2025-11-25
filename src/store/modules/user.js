import {defineStore} from 'pinia'
import {login} from '@/api/user/index.js'
import {ElMessage} from 'element-plus'
import {constantRoute} from "@/router/index.js";

export const useUserStore = defineStore('User', {
    state: () => ({
        username: localStorage.getItem('username') || '',
        dept: localStorage.getItem('dept') || '',
        token: localStorage.getItem('token') || '',
        isLoggedIn: !!localStorage.getItem('token'),  // ✅ 初始判断是否已登
        expires_at: localStorage.getItem('expires_at') || '',
        menuRoutes: constantRoute, // ✅ 放在 state 里
    }),

    getters: {
        welcomeMessage: (state) => `欢迎, ${state.username || '用户'}`,
    },

    actions: {
        async userLogin(data) {
            try {
                const res = await login(data)
                if (res.code === 200 && res.data?.token) {
                    const token = res.data.token.replace('Bearer ', '')

                    this.token = token
                    this.username = res.data.username
                    this.dept = res.data.dept
                    this.isLoggedIn = true
                    this.expires_at = res.data.expires_at

                    localStorage.setItem('token', token)
                    localStorage.setItem('username', this.username)
                    localStorage.setItem('dept', this.dept)
                    localStorage.setItem('expires_at', this.expires_at)

                    return true
                } else {
                    return false
                }
            } catch (err) {
                return false
            }
        },

        logout() {
            this.username = ''
            this.dept = ''
            this.token = ''
            this.isLoggedIn = false
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('dept')
            localStorage.removeItem('expires_at')
            ElMessage.info('已退出登录')
        },
    }
})
