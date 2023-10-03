import type { ConsultType, IllnessTime } from '@/enums'
import { flagOptions, timeOptions, typeOptions } from '@/service/constants'

// 获取患病时间
export const getIllnessTimeText = (time: IllnessTime) =>
    timeOptions.find((item) => item.value === time)?.label
// 获取是否治疗过
export const getConsultFlagText = (flag: 0 | 1) =>
    flagOptions.find((item) => item.value === flag)?.label
// 获取问诊类型
export const getConsultType = (type: ConsultType) => {
    return typeOptions.find((item) => item.value === Number(type))?.label
}
