<script setup lang="ts">
import CpNativeBar from '@/components/CpNativeBar.vue'
import RoomStatus from './Components/RoomStatus.vue'
import RoomActions from './Components/RoomActions.vue'
import RoomMessage from './Components/RoomMessage.vue'
import io, { Socket } from 'socket.io-client'
import { baseURL } from '@/utils/request'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { onUnmounted, ref } from 'vue'
import type { TimeMessages, Message } from '@/types/room'
import { MsgType } from '@/enums'

const userStore = useUserStore()
const route = useRoute()
let socket: Socket
const list = ref<Message[]>([])
onMounted(() => {
    socket = io(baseURL, {
        auth: {
            token: `Bearer ${userStore.user?.token}`
        },
        query: {
            orderId: route.query.orderId
        }
    })
    socket.on('connect', () => {
        console.log('连接成功')
    })
    socket.on('disconnect', () => {
        console.log('连接失败')
    })
    socket.on('error', () => {
        console.log('发生错误')
    })
    // 获取该聊天室聊天记录，每获取聊天记录的时候就把数据加在数组前面
    socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
        const arr: Message[] = []
        data.forEach((item) => {
            arr.push({
                msgType: MsgType.Notify,
                msg: {
                    content: item.createTime
                },
                createTime: item.createTime,
                id: item.createTime
            })
            arr.push(...item.items)
        })
        list.value.unshift(...arr)
        console.log(list.value)
    })
    onUnmounted(() => {
        socket.close()
    })
})
</script>

<template>
    <div class="room-page">
        <cp-native-bar title="牛马问诊室"></cp-native-bar>
        <room-status></room-status>
        <room-message v-for="item in list" :key="item.id" :item="item">
        </room-message>
        <room-actions></room-actions>
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
