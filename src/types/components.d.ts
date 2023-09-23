import CpNativeBar from '@/components/CpNativeBar.vue'
import CpIcon from '@/components/CpIcon.vue'
import CpRaidoBtn from '@/components/CpRaidoBtn.vue'

declare module 'vue' {
    interface GlobalComponents {
        // 添加组件类型
        CpNativeBar: typeof CpNativeBar
        CpIcon: typeof CpIcon
        CpRaidoBtn: typeof CpRaidoBtn
    }
}
