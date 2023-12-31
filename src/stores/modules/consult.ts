import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ConsultIllness, PartialConsult } from '@/types/consult'
import type { ConsultType } from '@/enums/index'

export const useConsultStore = defineStore(
    'cp-cunsult',
    () => {
        // 问诊信息
        const consult = ref<PartialConsult>({})
        // 记录问诊类型 快速问诊
        const setType = (type: ConsultType) => (consult.value.type = type)
        // 记录问诊级别
        const setIllnessType = (illnessType: 0 | 1) =>
            (consult.value.illnessType = illnessType)
        // 记录问诊科室
        const setDep = (depId: string) => (consult.value.depId = depId)
        // 记录病情
        const setIllness = (illness: ConsultIllness) => {
            consult.value.illnessDesc = illness.illnessDesc
            consult.value.illnessTime = illness.illnessTime
            consult.value.consultFlag = illness.consultFlag
            consult.value.pictures = illness.pictures
        }
        // 记录患者
        const setPatient = (id: string) => (consult.value.patientId = id)
        // 记录优惠券
        const setCoupon = (id: string) => (consult.value.couponId = id)
        // 清空本地仓库中的数据
        const clear = () => (consult.value = {})
        return {
            consult,
            setType,
            setIllnessType,
            setDep,
            setIllness,
            setPatient,
            setCoupon,
            clear
        }
    },
    { persist: true }
)
