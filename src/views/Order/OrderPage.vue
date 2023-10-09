<script setup lang="ts">
import OrderList from './Components/OrderList.vue'
import { OrderType } from '@/enums'
import CpNativeBar from '@/components/CpNativeBar.vue'
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
    </div>
</template>

<style lang="scss" scoped>
.consult-page {
    padding-top: 46px;
    background-color: var(--cp-bg);
    min-height: calc(100vh - 46px);
}
</style>
