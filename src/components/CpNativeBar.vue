<template>
    <!-- 固定定位 左侧箭头 标题 右侧文字 -->
    <van-nav-bar
        fiexd
        left-arrow
        :title="title"
        :right-text="rightTest"
        @click-right="onClickRight"
    >
    </van-nav-bar>
</template>

<script setup lang="ts">
// 1.通过props来实现标题和右侧文字设置
defineProps<{
    title?: string
    rightTest?: string
}>()
const emit = defineEmits<{
    (e: 'click-right'): void
}>()
// 2.使用emit函数来触发自定义事件(点击右侧文字按钮)
const onClickRight = function () {
    emit('click-right')
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
