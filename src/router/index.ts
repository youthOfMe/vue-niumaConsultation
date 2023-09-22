import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/index'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            component: () => import('@/views/login/index.vue')
        },
        {
            path: '/',
            component: () => import('@/views/Layout/index.vue'),
            children: [
                {
                    path: '/home',
                    component: () => import('@/views/Home/index.vue')
                },
                {
                    path: '/article',
                    component: () => import('@/views/Article/index.vue')
                },
                {
                    path: '/notify',
                    component: () => import('@/views/Notify/index.vue')
                },
                {
                    path: '/user',
                    component: () => import('@/views/User/index.vue')
                }
            ]
        }
    ]
})

// 全局的前置导航
router.beforeEach((to) => {
    // 获取token的
    const userStore = useUserStore()
    // 准备白名单
    const whiteList = ['/login']
    // 如果你没有token并且不在白名单中，就重定向到登录
    if (!userStore.user?.token && !whiteList.includes(to.path)) return '/login'
})

export default router
