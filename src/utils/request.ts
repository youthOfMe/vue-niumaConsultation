import { useUserStore } from '@/stores'
import axios from 'axios'

import { showToast } from 'vant'

// 创建axios实例
const instance = axios.create({
    // 1.设置基础地址和超时时间
    baseURL: 'http://consult-api.itheima.net/',
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
    (err) => {
        // 5.处理401错误
        return Promise.reject(err)
    }
)

// 导出axios实例
export default instance
