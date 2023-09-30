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
import type { ConsultOrderItem } from '@/types/consult'
import { getConsultOrderDetail } from '@/service/consult'

// 获取订单状态
const consult = ref<ConsultOrderItem>()
const loadConsult = async () => {
    const res = await getConsultOrderDetail(route.query.orderId as string)
    consult.value = res.data
}

// 准备用户数据和消息列表
const userStore = useUserStore()
const route = useRoute()
let socket: Socket
const list = ref<Message[]>([])
onMounted(() => {
    // 进行获取订单状态
    loadConsult()
    // 与websocket服务器进行建立连接
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
    // 监听订单状态的变化
    socket.on('statusChange', () => loadConsult())
})
// 脱离连接
onUnmounted(() => {
    socket.close()
})
</script>

<template>
    <div class="room-page">
        <cp-native-bar title="牛马问诊室"></cp-native-bar>
        <room-status :status="consult?.status" :countdown="consult?.countdown">
        </room-status>
        <room-message v-for="item in list" :key="item.id" :item="item">
        </room-message>
        <room-actions :disabled="consult?.status === 2"></room-actions>
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
