import { useUserStore } from '@/stores'
import axios from 'axios'
import type { AxiosError, Method } from 'axios'
import router from '@/router'

import { showToast } from 'vant'

export const baseURL = 'http://consult-api.itheima.net/'
// 创建axios实例
const instance = axios.create({
    // 1.设置基础地址和超时时间
    baseURL,
    timeout: 10000
})

// 使用请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 2.携带token
        const store = useUserStore()
        if (store.user?.token) {
            if (store.user?.token && config.headers) {
                config.headers.Authorization = `Bearer ${store.user.token}`
                // console.log(config.headers.Authorization)
            }
        }
        return config
    },
    (err) => Promise.reject(err)
)

// 使用响应拦截器
instance.interceptors.response.use(
    (res) => {
        // 3.处理业务失败
        if (res.data.code !== 10000) {
            showToast(res.data.message || '业务处理失败')
            // 返回 错误提示
            return Promise.reject(res.data)
            // 传入 code 将来catch的时候可以使用
        }
        // 4.获取核心响应数据
        return res.data
    },
    (err: AxiosError) => {
        // 5.处理401错误
        if (err.response?.status === 401) {
            // 清空本地用户信息
            const userStore = useUserStore()
            userStore.delUser()
            // 跳转到登录页面，携带当前访问页面地址(包含参数的)
            router.push({
                path: '/login',
                query: { returnUrl: router.currentRoute.value.fullPath }
            })
        }
        return Promise.reject(err)
    }
)

// 导出axios实例
export default instance

// 声明返回数据类型
type Data<T> = {
    code: number
    message: string
    data: T
}

export const request = <T>(url: string, method: Method = 'GET', submitData?: object) => {
    // 参数 : 地址 请求方式 提交的数据
    // 返回 : promise
    return instance.request<any, Data<T>>({
        url,
        method,
        [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
    })
}
