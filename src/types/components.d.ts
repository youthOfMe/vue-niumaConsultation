import CpNativeBar from '@/components/CpNativeBar.vue'
import CpIcon from '@/components/CpIcon.vue'
import CpRaidoBtn from '@/components/CpRaidoBtn.vue'
import KnowledgeCard from '@/views/Home/components/KnowledgeCard.vue'
import KnowledgeList from '@/views/Home/components/KnowledgeList.vue'

declare module 'vue' {
    interface GlobalComponents {
        // 添加组件类型
        CpNativeBar: typeof CpNativeBar
        CpIcon: typeof CpIcon
        CpRaidoBtn: typeof CpRaidoBtn
        KnowledgeCard: typeof KnowledgeCard
        KnowledgeList: typeof KnowledgeList
    }
}
