import CpNativeBar from '@/components/CpNativeBar.vue'

declare module 'vue' {
    interface GlobalComponents {
        // 添加组件类型
        CpNativeBar: typeof CpNativeBar
    }
}
