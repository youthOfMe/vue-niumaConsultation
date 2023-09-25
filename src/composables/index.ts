import { followOrUnfollow } from '@/service/consult'
import type { Doctor, FollowType } from '@/types/consult'
import { ref } from 'vue'
// Vue3概念: 通过组合式API封装 数据逻辑 在一起的函数叫做组合式API 书写规范都是usexxxxx
// 在Composables文件中进行编写
export const useFollow = (type: FollowType = 'doc') => {
    // 使用关注功能
    const loading = ref(false)
    const follow = async (item: { id: string; likeFlag: 0 | 1 }) => {
        // 按钮进行加载状态
        loading.value = true
        try {
            await followOrUnfollow(item.id, type)
            item.likeFlag = item.likeFlag === 1 ? 0 : 1
        } finally {
            loading.value = false
        }
    }
    return { loading, follow }
}
