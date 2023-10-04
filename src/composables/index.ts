import { OrderType } from '@/enums'
import {
    cancelOrder,
    followOrUnfollow,
    getPrescriptionPic
} from '@/service/consult'
import type { ConsultOrderItem, FollowType } from '@/types/consult'
import { showFailToast, showImagePreview, showSuccessToast } from 'vant'
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

// 进行封装查看处方API
export const useShowPrescription = () => {
    const onShowPrescription = async (id?: string) => {
        if (id) {
            const res = await getPrescriptionPic(id)
            showImagePreview([res.data.url])
        }
    }
    return { onShowPrescription }
}

// 封装取消订单
export const useCancelOrder = () => {
    const loading = ref(false)
    const cancelConsultOrder = async (item: ConsultOrderItem) => {
        try {
            loading.value = true
            await cancelOrder(item.id)
            item.status = OrderType.ConsultCancel
            item.statusValue = '已取消'
            showSuccessToast('取消成功')
        } catch (error) {
            showFailToast('取消失败')
        } finally {
            loading.value = false
        }
    }
    return { loading, cancelConsultOrder }
}
