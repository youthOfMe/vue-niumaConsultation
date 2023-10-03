import { IllnessTime, ConsultType } from '@/enums'

// 准备看病时间帮的那个数据
const timeOptions = [
    { label: '一周内', value: IllnessTime.Week },
    { label: '一月内', value: IllnessTime.Month },
    { label: '半年内', value: IllnessTime.HalfYear },
    { label: '半年以上', value: IllnessTime.More }
]

// 准备是否就诊过的单选框数据
const flagOptions = [
    { label: '就诊过', value: 1 },
    { label: '没就诊过', value: 0 }
]

// 准备选择就诊类型的单选框数据
const typeOptions = [
    { label: '问医生', value: ConsultType.Doctor },
    { label: '极速问诊', value: ConsultType.Fast },
    { label: '开药门诊', value: ConsultType.Medication }
]

export { timeOptions, flagOptions, typeOptions }
