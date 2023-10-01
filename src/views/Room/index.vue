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
import type { ConsultOrderItem, Image } from '@/types/consult'
import { getConsultOrderDetail } from '@/service/consult'
import { nextTick } from 'vue'
import dayjs from 'dayjs'
import { showToast } from 'vant'

// 获取订单详细
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

// 配置父组件中发送文字信息
const onSendText = (text: string) => {
    // 进行提交文字
    socket.emit('sendChatMsg', {
        from: userStore.user?.id,
        to: consult.value?.docInfo?.id,
        msgType: MsgType.MsgText,
        msg: {
            content: text
        }
    })
}
// 配置上传图片功能
const onSendImage = (image: Image) => {
    socket.emit('sendChatMsg', {
        from: userStore.user?.id,
        to: consult.value?.docInfo?.id,
        msgType: MsgType.MsgImage,
        msg: {
            pictures: image
        }
    })
}

// 配置问诊室聊天记录功能
const initialMsg = ref(true)

// 配下拉刷新功能
const loading = ref(false)
const time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
const onRefresh = () => {
    socket.emit('getChatMsgList', 20, time.value, consult.value?.id)
}

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
        data.forEach((item, i) => {
            // 记录每一段消息中最早的消息时间，获取聊天记录使用
            if (i === 0) return (time.value = item.createTime)
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
        // 加载聊天记录后执行的功能
        loading.value = false
        if (!arr.length) return showToast('暂无更多聊天记录')

        // 获取聊天记录的时候判断是否是第一次进行加载数据
        if (initialMsg.value) {
            // 第一次加载消息的时候需要滚动到最新消息
            nextTick(() => {
                window.scroll(0, document.body.scrollHeight)
                initialMsg.value = false
            })
        }
    })
    // 监听订单状态的变化
    socket.on('statusChange', () => loadConsult())
    // 进行配置接收聊条消息
    socket.on('receiveChatMsg', async (event) => {
        list.value.push(event)
        // 等nextTick返回promise 进行页面渲染完后子在进行dom操作否则就会出错，无法定位到底部
        // 等到nextTick的结果后再进行滚动到底部
        await nextTick()
        window.scroll(0, document.body.scrollHeight)
    })
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
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <room-message v-for="item in list" :key="item.id" :item="item">
            </room-message>
        </van-pull-refresh>
        <room-actions
            :disabled="consult?.status === 2"
            @send-text="onSendText"
            @send-image="onSendImage"
        >
        </room-actions>
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
