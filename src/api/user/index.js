import {post} from '@/utils/request'
import qs from 'qs'

// 接口地址常量
const UserApi = {
    LOGIN_URL: '/leqi/user/v1/login', INFO_URL: '/leqi/user/v1/info'
}

// 登录接口
export const login = (data) => {
    return post(UserApi.LOGIN_URL, qs.stringify(data), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

// 获取用户信息接口
export const getUserInfo = (data) => {
    return post(UserApi.INFO_URL, data)
}

export default {
    login, getUserInfo
}

