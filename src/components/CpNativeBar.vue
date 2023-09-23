<template>
    <!-- 固定定位 左侧箭头 标题 右侧文字 -->
    <van-nav-bar
        fixed
        left-arrow
        :title="title"
        :right-text="rightTest"
        @click-right="onClickRight"
        @click-left="onClickLeft"
    >
    </van-nav-bar>
</template>

<script setup lang="ts">
import { backTopProps } from 'vant'
import { useRouter } from 'vue-router'

let router = useRouter()

// 1.通过props来实现标题和右侧文字设置
const props = defineProps<{
    title?: string
    rightTest?: string
    back?: () => void
}>()
const emit = defineEmits<{
    (e: 'click-right'): void
}>()
// 2.使用emit函数来触发自定义事件(点击右侧文字按钮)
const onClickRight = function () {
    emit('click-right')
}
// 3.回退
const onClickLeft = () => {
    if (props.back) return props.back()
    if (history.state?.back) {
        router.back()
    } else {
        router.push('/')
    }
}
</script>

<style scoped lang="scss">
:deep() {
    .van-nav-bar {
        &__arrow {
            color: var(--cp-text1);
            font-size: 18px;
        }
        &__title {
            font-size: 15px;
        }
    }
}
</style>
