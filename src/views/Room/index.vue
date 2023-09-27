<script setup lang="ts">
import CpNativeBar from '@/components/CpNativeBar.vue'
import RoomStatus from './Components/RoomStatus.vue'
import RoomActions from './Components/RoomActions.vue'
import RoomMessage from './Components/RoomMessage.vue'
</script>

<template>
    <div class="room-page">
        <cp-native-bar title="牛马问诊室"></cp-native-bar>
        <room-status></room-status>
        <room-actions></room-actions>
        <room-message></room-message>
    </div>
</template>

<style lang="scss" scoped>
.room-page {
    padding-top: 90px;
    padding-bottom: 60px;
    min-height: 100vh;
    box-sizing: border-box;
    background-color: var(--cp-bg);
    .van-pull-refresh {
        width: 100%;
        min-height: calc(100vh - 150px);
    }
}
</style>
