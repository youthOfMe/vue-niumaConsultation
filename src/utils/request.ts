import { useUserStore } from '@/stores'
import axios from 'axios'

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
    // 4.获取核心响应数据
    return res
  },
  (err) => {
    // 5.处理401错误
    return Promise.reject(err)
  }
)

// 导出axios实例
export default instance
