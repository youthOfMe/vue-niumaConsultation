<script setup lang="ts">
import CpNativeBar from '@/components/CpNativeBar.vue'
import { areaList } from '@vant/area-data'
</script>

<template>
    <div class="address-add-page">
        <van-area :area-list="areaList" visible-option-num="6" />
    </div>
</template>

<style scoped lang="scss">
.van-area {
}
</style>
