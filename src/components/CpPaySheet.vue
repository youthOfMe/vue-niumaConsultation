<script setup lang="ts">
import { getConsultOrderPayUrl } from '@/service/consult'
import { showLoadingToast, showToast } from 'vant'
import { onMounted } from 'vue'
import { ref } from 'vue'

const props = defineProps<{
    show: boolean
    orderId: string
    actualPayment: number
    onClose?: () => void
    payCallback?: string
}>()

// 配置进行支付橱窗是否显示
const emit = defineEmits<{
    (e: 'update:show', show: boolean): void
}>()
const paymentMethod = ref<0 | 1>()

// 支付逻辑
const pay = async () => {
    if (paymentMethod.value === undefined) return showToast('请选择支付方式')
    showLoadingToast({ message: '跳转支付', duration: 0 })
    const res = await getConsultOrderPayUrl({
        orderId: props.orderId,
        paymentMethod: paymentMethod.value,
        payCallback: 'http://localhost:80/' + props.payCallback
    })
    window.location.href = res.data.payUrl
}
onMounted(() => {})
</script>

<template>
    <div class="consult-pay-page">
        <van-action-sheet
            :show="show"
            @update:show="emit('update:show', $event)"
            title="选择支付方式"
            :close-on-popstate="false"
            :closeable="false"
            :before-close="onClose"
        >
            <div class="pay-type">
                <p class="amount">￥{{ props.actualPayment.toFixed(2) }}</p>
                <van-cell-group>
                    <van-cell title="微信支付" @click="paymentMethod = 0">
                        <template #icon><cp-icon name="consult-wechat" /></template>
                        <template #extra><van-checkbox :checked="paymentMethod === 0" /></template>
                    </van-cell>
                    <van-cell title="支付宝支付" @click="paymentMethod = 1">
                        <template #icon><cp-icon name="consult-alipay" /></template>
                        <template #extra><van-checkbox :checked="paymentMethod === 1" /></template>
                    </van-cell>
                </van-cell-group>
                <div class="btn">
                    <van-button type="primary" round block @click="pay()">立即支付</van-button>
                </div>
            </div>
        </van-action-sheet>
    </div>
</template>

<style scoped lang="scss">
.pay-type {
    .amount {
        padding: 20px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }
    .btn {
        padding: 15px;
    }
    .van-cell {
        align-items: center;
        .cp-icon {
            margin-right: 10px;
            font-size: 18px;
        }
        .van-checkbox :deep(.van-checkbox__icon) {
            font-size: 16px;
        }
    }
}
</style>
