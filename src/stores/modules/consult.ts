import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PartialConsult } from '@/types/consult'
import type { ConsultType } from '@/enums/index'

export const useConsultStore = defineStore(
    'cp-cunsult',
    () => {
        // 问诊信息
        const consult = ref<PartialConsult>({})
        // 记录问诊类型 快速问诊
        const setType = (type: ConsultType) => (consult.value.type = type)
        return { consult, setType }
    },
    { persist: true }
)
