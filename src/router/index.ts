import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/index'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            component: () => import('@/views/login/index.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/user/patient',
            component: () => import('@/views/User/PatientPage.vue')
        },
        {
            path: '/',
            component: () => import('@/views/Layout/index.vue'),
            children: [
                {
                    path: '/home',
                    component: () => import('@/views/Home/index.vue'),
                    meta: { title: '首页' }
                },
                {
                    path: '/article',
                    component: () => import('@/views/Article/index.vue'),
                    meta: { title: '健康百科' }
                },
                {
                    path: '/notify',
                    component: () => import('@/views/Notify/index.vue'),
                    meta: { title: '消息通知' }
                },
                {
                    path: '/user',
                    component: () => import('@/views/User/index.vue'),
                    meta: { title: '个人中心' }
                }
            ]
        }
    ]
})

// 配置进度条
NProgress.configure({
    showSpinner: false
})

// 全局的前置守卫
router.beforeEach((to) => {
    NProgress.start()
    // 获取token的
    const userStore = useUserStore()
    // 准备白名单
    const whiteList = ['/login']
    // 如果你没有token并且不在白名单中，就重定向到登录
    if (!userStore.user?.token && !whiteList.includes(to.path)) return '/login'
})

// 全局的后置守卫
router.afterEach((to) => {
    document.title = `${to.meta.title || ''}-牛马问诊`
    NProgress.done()
})

export default router
