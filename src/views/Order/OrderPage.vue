<script setup lang="ts">
import OrderList from './Components/OrderList.vue'
import { OrderType } from '@/enums'
import CpNativeBar from '@/components/CpNativeBar.vue'
</script>

<template>
    <div class="consult-page">
        <cp-native-bar :title="$route.meta.title"></cp-native-bar>
        <van-tabs sticky>
            <van-tab title="取消问诊"><order-list :type="OrderType.ConsultCancel" /></van-tab>
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
