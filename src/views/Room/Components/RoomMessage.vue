<script setup lang="ts">
import type { Message, Prescription } from '@/types/room'
import type { Image } from '@/types/consult'
import { MsgType, PrescriptionStatus } from '@/enums'
import { showImagePreview, showToast } from 'vant'
import dayjs from 'dayjs'
import { useUserStore } from '@/stores'
import EvaluateCard from './EvaluateCard.vue'
import { useShowPrescription } from '@/composables'
// 获取患病事件和是否进行治疗过
import { getIllnessTimeText, getConsultFlagText } from '@/utils/filter'
import { useRouter } from 'vue-router'

const props = defineProps<{
    item: Message
}>()
// 预览图片
const onPreviewImage = (images?: Image[]) => {
    // 只需要传进去一个URL数组即可进行预览图片 只需要将images中的图片对象改为url即可
    if (images && images?.length) showImagePreview(images.map((item) => item.url))
    else showToast('暂无图片')
}

// 准备转换时间的函数
const formatTime = (time: string) => dayjs(time).format('HH:mm')
const userStore = useUserStore()

// 预览聊天图片
const showImage = (item: Message) => {
    showImagePreview([item?.msg?.pictures?.url as string])
}

// 查看处方图片
const { onShowPrescription } = useShowPrescription()

// 跳转支付药品
const router = useRouter()
const buy = async (pre?: Prescription) => {
    if (!pre) return showToast('处方不存在')
    if (pre.status === PrescriptionStatus.Invalid) return showToast('该处方是无效的')
    if (pre.status === PrescriptionStatus.NotPayment && !pre.orderId)
        return showToast('跳转成功') && (await router.push(`/order/pay?id=${pre.id}`))
    // 其它情况
    router.push(`/order/${pre.orderId}`)
}
</script>

<template>
    <!-- 患者卡片 -->
    <div class="msg msg-illness" v-if="item.msgType === MsgType.CardPat">
        <div class="patient van-hairline--bottom">
            <p>
                {{ item.msg.consultRecord?.patientInfo.name }}
                {{ item.msg.consultRecord?.patientInfo?.genderValue }}
                {{ item.msg.consultRecord?.patientInfo?.age }} 岁
            </p>
            <p v-if="item.msg.consultRecord">
                {{ getIllnessTimeText(item.msg.consultRecord?.illnessTime) }} |
                {{ getConsultFlagText(item.msg.consultRecord?.consultFlag) }}
            </p>
        </div>
        <van-row>
            <van-col span="6">病情描述</van-col>
            <van-col span="18">{{ item.msg.consultRecord?.illnessDesc }}</van-col>
            <van-col span="6">图片</van-col>
            <van-col span="18" @click="onPreviewImage(item.msg.consultRecord?.pictures)">
                点击查看
            </van-col>
        </van-row>
    </div>
    <!-- 通知-通用 -->
    <div class="msg msg-tip" v-if="item.msgType === MsgType.Notify">
        <div class="content">
            <span>{{ item.msg.content }}</span>
        </div>
    </div>
    <!-- 通知-温馨提示 -->
    <div class="msg msg-tip" v-if="item.msgType === MsgType.NotifyTip">
        <div class="content">
            <span class="green">温馨提示：</span>
            <span>{{ item.msg.content }}</span>
        </div>
    </div>
    <!-- 通知-结束 -->
    <div class="msg msg-tip msg-tip-cancel" v-if="item.msgType === MsgType.NotifyCancel">
        <div class="content">
            <span>{{ item.msg.content }}</span>
        </div>
    </div>
    <!-- 发送文字 -->
    <div
        class="msg msg-to"
        v-if="item.msgType === MsgType.MsgText && item.from === userStore.user?.id"
    >
        <div class="content">
            <div class="time">{{ formatTime(item.createTime) }}</div>
            <div class="pao">{{ item.msg.content }}</div>
        </div>
        <van-image :src="item.fromAvatar" />
    </div>
    <!-- 发送图片 -->
    <div
        class="msg msg-to"
        v-if="item.msgType === MsgType.MsgImage && item.from === userStore.user?.id"
        @click="showImage(item)"
    >
        <div class="content">
            <div class="time">{{ formatTime(item.createTime) }}</div>
            <van-image fit="contain" :src="item.msg.pictures?.url" />
        </div>
        <van-image :src="item.fromAvatar" />
    </div>
    <!-- 接收文字 -->
    <div
        class="msg msg-from"
        v-if="item.msgType === MsgType.MsgText && !(item.from === userStore.user?.id)"
    >
        <van-image :src="item.fromAvatar" />
        <div class="content">
            <div class="time">{{ formatTime(item.createTime) }}</div>
            <div class="pao">{{ item.msg.content }}</div>
        </div>
    </div>
    <!-- 接收图片 -->
    <div
        class="msg msg-from"
        v-if="item.msgType === MsgType.MsgImage && !(item.from === userStore.user?.id)"
        @click="showImage(item)"
    >
        <van-image :src="item.msg.pictures?.url" />
        <div class="content">
            <div class="time">{{ formatTime(item.createTime) }}</div>
            <van-image fit="contain" :src="item.fromAvatar" />
        </div>
    </div>
    <!-- 处方卡片 -->
    <div class="msg msg-recipe" v-if="item.msgType === MsgType.CardPre">
        <div class="content">
            <div class="head van-hairline--bottom">
                <div class="head-tit">
                    <h3>电子处方</h3>
                    <p @click="onShowPrescription(item.msg.prescription?.id)">
                        原始处方 <van-icon name="arrow"></van-icon>
                    </p>
                </div>
                <p>
                    {{ item.msg.prescription?.name }}
                    {{ item.msg.prescription?.genderValue }}
                    {{ item.msg.prescription?.age }}岁
                    {{ item.msg.prescription?.diagnosis }}
                </p>
                <p>开方时间：{{ item.msg.prescription?.createTime }}</p>
            </div>
            <div class="body">
                <div
                    class="body-item"
                    v-for="med in item.msg.prescription?.medicines"
                    :key="med.id"
                >
                    <div class="durg">
                        <p>{{ med.name }} {{ med.specs }}</p>
                        <p>{{ med.usageDosag }}</p>
                    </div>
                    <div class="num">x{{ med.quantity }}</div>
                </div>
            </div>
            <div class="foot" @click="buy(item.msg.prescription)"><span>购买药品</span></div>
        </div>
    </div>
    <!-- 评价卡片，后期实现 -->
    <div
        class="msg msg-comment"
        v-if="item.msgType === MsgType.CardEva || item.msgType === MsgType.CardEvaForm"
    >
        <evaluate-card :evaluateDoc="item.msg.evaluateDoc"></evaluate-card>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/room.scss';
</style>
