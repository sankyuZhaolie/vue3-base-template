import axios from 'axios'
import {ElMessage} from 'element-plus'

// 创建 Axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // 可以在 .env 配置 API 地址
    timeout: 10000, // 请求超时 10 秒
})

// 请求拦截器
service.interceptors.request.use(config => {
    // 可以在这里加 token
    // const token = localStorage.getItem('token')
    // if (token) config.headers.Authorization = `Bearer ${token}`
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
    const res = response.data
    /**
     * 假设后端返回格式：
     * { code: number, data: any, msg: string }
     */
    if (!res) {
        ElMessage.error('返回数据为空')
        return Promise.reject(new Error('返回数据为空'))
    }

    return res
}, error => {
    // 网络错误处理
    if (error.response) {
        const status = error.response.status
        switch (status) {
            case 400:
                ElMessage.error('请求参数错误')
                break
            case 401:
                ElMessage.warning('未授权，请登录')
                break
            case 403:
                ElMessage.error('拒绝访问')
                break
            case 404:
                ElMessage.error('请求地址不存在')
                break
            case 500:
                ElMessage.error('服务器内部错误')
                break
            default:
                ElMessage.error(`网络错误，状态码: ${status}`)
        }
    } else if (error.request) {
        ElMessage.error('请求超时或无响应')
    } else {
        ElMessage.error(error.message || '请求失败')
    }
    return Promise.reject(error)
})


// 简化 GET/POST/PUT/DELETE 方法
export const get = (url, params, config = {}) => service.get(url, {params, ...config})
export const post = (url, data, config = {}) => service.post(url, data, config)
export const put = (url, data, config = {}) => service.put(url, data, config)
export const del = (url, data, config = {}) => service.delete(url, {data, ...config})

export default service
