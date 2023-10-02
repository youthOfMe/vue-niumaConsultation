import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/index'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/login',
            component: () => import('@/views/login/index.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/user/patient',
            component: () => import('@/views/User/PatientPage.vue'),
            meta: { title: '家庭档案' }
        },
        {
            path: '/consult/fast',
            component: () => import('@/views/Consult/ConsultFast.vue'),
            meta: { title: '极速问诊' }
        },
        {
            path: '/consult/dep',
            component: () => import('@/views/Consult/ConsultDep.vue'),
            meta: { title: '选择科室' }
        },
        {
            path: '/consult/illness',
            component: () => import('@/views/Consult/ConsultIllness.vue'),
            meta: { title: '病情描述' }
        },
        {
            path: '/consult/pay',
            component: () => import('@/views/Consult/ConsultPay.vue'),
            meta: { title: '问诊支付' }
        },
        {
            path: '/room',
            component: () => import('@/views/Room/index.vue'),
            meta: { title: '问诊室' },
            // beforeEnter 钩子函数在这里进行使用 控制单个路由进入前进行执行函数
            beforeEnter(to) {
                if (to.query.payResult === 'false') return '/user/consult'
            }
        },
        {
            path: '/user/consult',
            component: () => import('@/views/User/ConsultPage.vue'),
            meta: { title: '问诊记录' }
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
