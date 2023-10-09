import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/user'

export const useUserStore = defineStore(
    'cp-user',
    () => {
        // 1.用户信息的状态
        const user = ref<User>()
        // 2.设置用户信息的函数
        const setUser = (u: User) => {
            user.value = u
        }
        // 3.删除用户信息d
        const delUser = () => {
            user.value = undefined
        }

        // 进行设置回调地址
        const returnUrl = ref('')
        const setReturnUrl = (url: string) => (returnUrl.value = url)

        return {
            user,
            setUser,
            delUser,
            returnUrl,
            setReturnUrl
        }
    },
    {
        persist: true
    }
)
