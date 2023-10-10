<script setup lang="ts">
import OrderList from './Components/OrderList.vue'
import { OrderType } from '@/enums'
import CpNativeBar from '@/components/CpNativeBar.vue'
import type { MedicalOrderItem } from '@/types/order'
import { ref } from 'vue'
import { provide } from 'vue'
import CpPaySheet from '@/components/CpPaySheet.vue'

// 配置支付功能
const item = ref<MedicalOrderItem>()
const show = ref<boolean>(false)
const showPay = (itema: MedicalOrderItem) => {
    item.value = itema
    show.value = true
}
provide('showPay', showPay)
</script>

<template>
    <div class="consult-page">
        <cp-native-bar :title="$route.meta.title"></cp-native-bar>
        <van-tabs sticky>
            <van-tab title="待支付"><order-list :order-status="OrderType.MedicinePay" /></van-tab>
            <van-tab title="待发货"><order-list :order-status="OrderType.MedicineSend" /></van-tab>
            <van-tab title="待收货"><order-list :order-status="OrderType.MedicineTake" /></van-tab>
            <van-tab title="已完成"
                ><order-list :order-status="OrderType.MedicineComplete"
            /></van-tab>
            <van-tab title="已取消"
                ><order-list :order-status="OrderType.MedicineCancel"
            /></van-tab>
        </van-tabs>
        <cp-pay-sheet
            v-if="item"
            v-model:show="show"
            :order-id="item.id"
            :actual-payment="Number(item.actualPayment)"
            :pay-callback="`order/${item.id}`"
        >
        </cp-pay-sheet>
    </div>
</template>

<style lang="scss" scoped>
.consult-page {
    padding-top: 46px;
    background-color: var(--cp-bg);
    min-height: calc(100vh - 46px);
}
</style>
