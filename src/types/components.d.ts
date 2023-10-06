import CpNativeBar from '@/components/CpNativeBar.vue'
import CpIcon from '@/components/CpIcon.vue'
import CpRadioBtn from '@/components/CpRaidoBtn.vue'
import KnowledgeCard from '@/views/Home/components/KnowledgeCard.vue'
import KnowledgeList from '@/views/Home/components/KnowledgeList.vue'
import CpPaySheet from '@/components/CpPaySheet.vue'

declare module 'vue' {
    interface GlobalComponents {
        // 添加组件类型
        CpNativeBar: typeof CpNativeBar
        CpIcon: typeof CpIcon
        CpRadioBtn: typeof CpRadioBtn
        KnowledgeCard: typeof KnowledgeCard
        KnowledgeList: typeof KnowledgeList
        CpPaySheet: typeof CpPaySheet
    }
}
