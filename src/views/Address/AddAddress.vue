<script setup lang="ts">
import CpNativeBar from '@/components/CpNativeBar.vue'
import { areaList } from '@vant/area-data'
</script>

<template>
    <div class="address-add-page">
        <cp-native-bar :title="$route.meta.title" right-test="确认"></cp-native-bar>
        <van-area :area-list="areaList" />
    </div>
</template>

<style scoped lang="scss"></style>
