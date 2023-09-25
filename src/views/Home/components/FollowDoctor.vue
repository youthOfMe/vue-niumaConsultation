<script setup lang="ts">
import DoctorCard from './DoctorCard.vue'

// 使用use
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()

// 手写适配各种设备生成固定宽度
// 组件初始化获取设备宽度，页面尺寸发生改变时获取设备宽度
// import { ref, onMounted, onUnmounted } from 'vue'
// const width = ref(0)
// const setWidth = () => width.value = window.innerWidth
// onMounted(() => {
//     setWidth()
//     // 进行时间监听 监听resize 屏幕尺寸是否变化 当resize背触发后进行使用事件继续监听
//     window.addEventListener('resize',setWidth)
// })
// // 删除进行监听的事件
// onUnmounted(() => {
//     window.removeEventListener('resize',setWidth)
// })
</script>

<template>
    <div class="follow-doctor">
        <div className="head">
            <p>推荐关注</p>
            <a href="javascript:;">
                查看更多<i class="van-icon van-icon-arrow"
            /></a>
        </div>
        <div class="body">
            <!-- swipe 组件 -->
            <van-swipe
                :width="(150 / 375) * width"
                :show-indicators="false"
                :loop="false"
            >
                <van-swipe-item v-for="item in 5" :key="item">
                    <doctor-card></doctor-card>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
    background-color: var(--cp-bg);
    height: 250px;
    .head {
        display: flex;
        justify-content: space-between;
        height: 45px;
        align-items: center;
        padding: 0 15px;
        font-size: 13px;
        > a {
            color: var(--cp-tip);
        }
    }
    .body {
        width: 100%;
        overflow: hidden;
    }
}
</style>
