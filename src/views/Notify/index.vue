<script setup lang="ts">
import { ConsultType } from '@/enums'
import ConsultList from '../User/components/ConsultList.vue'
</script>

<template>
    <div class="consult-page">
        <van-tabs sticky>
            <van-tab title="极速问诊"><consult-list :type="ConsultType.Fast" /></van-tab>
            <van-tab title="找医生"><consult-list :type="ConsultType.Doctor" /></van-tab>
            <van-tab title="开药问诊"><consult-list :type="ConsultType.Medication" /></van-tab>
        </van-tabs>
    </div>
</template>

<style scoped lang="scss">
.consult-page {
    background-color: var(--cp-bg);
    min-height: calc(100vh);
}
</style>
