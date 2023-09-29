import { Image, type Consult } from './consult'
import type { Patient } from './user'

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
            patietnInfo: Patient
        }
        // 处方信息
        prescription?: prescription
        // 评价信息
        evaluateDoc?: EvaluateDoc
    }
}
