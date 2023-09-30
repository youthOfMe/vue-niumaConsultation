import type { Image, Consult } from './consult'
import type { Patient } from './user'
import { MsgType, PrescriptionStatus } from '@/enums'

// 定义药品清单消息类型
export type Medical = {
    // 药品ID
    id: string
    // 药品名称
    name: string
    // 金额
    amount: string
    // 药品图片
    avatar: string
    // 规格信息
    specs: string
    // 用法用量
    usageDosag: string
    // 数量
    quantity: string
    // 是否处方 不是 => 0 是 => 1
    prescriptionFlag: 0 | 1
}

// 定义评价信息类型
export type EvaluateDoc = {
    // 评价ID
    id?: string
    // 评分
    score?: number
    // 内容
    content?: string
    // 创建时间
    createTime?: string
    // 创建人
    creator?: string
}

// 进行配置处方类型
export type prescription = {
    // 处方ID
    id: string
    // 药品ID
    orderId: string
    // 创建时间
    createTime: string
    // 患者名称
    name: string
    // 问诊记录ID
    recordId: string
    // 性别 女 => 0 男 => 1
    gender: 0 | 1
    // 性别文字
    genderValue: ''
    // 年龄
    age: number
    // 诊断信息
    diagnosis: string
    // 处方状态
    status: PrescriptionStatus
    // 药品清单
    medicines: Medical[]
}

// 进行配置单条消息类型
export type Message = {
    // 消息Id
    id: string
    // 消息类型
    msgType: MsgType
    // 发信人
    from?: string
    // 发信人头像
    fromAvatar?: string
    // 收信人
    to?: string
    // 收信人头像
    toAvatar?: string
    // 创建时间
    createTime: string
    // 消息主体
    msg: {
        // 文本内容
        content?: string
        // 图片对象
        picture?: Image
        // 问诊记录，患者信息
        consultRecord?: Consult & {
            patientInfo: Patient
        }
        // 处方信息
        prescription?: prescription
        // 评价信息
        evaluateDoc?: EvaluateDoc
    }
}

// 定义消息列表数据类型
export type TimeMessages = {
    // 分组消息最早时间
    createTime: string
    // 消息数组
    items: Message[]
    // 订单ID
    orderId: string
    // 会话ID
    sid: string
}
