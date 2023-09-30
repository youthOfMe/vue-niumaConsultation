// 定义问诊类型
export enum ConsultType {
    Doctor = 1,
    Fast = 2,
    Medication = 3
}

// 定义生病持续时间
export enum IllnessTime {
    Week = 1,
    Month = 2,
    HalfYear = 3,
    More = 4
}

// 定义消息类型
export enum MsgType {
    // 文字消息
    MsgType = 1,
    // 图片消息
    MsgImage = 4,
    // 患者信息
    CardPat = 21,
    // 处方信息
    CardPre = 22,
    // 未评价信息
    CardEvaForm = 23,
    // 已评价消息
    CardEva = 24,
    // 通用通知
    Notify = 31,
    // 温馨提示
    NotifyTip = 32,
    // 取消提示
    NotifyCancel = 33
}

// 定义处方状态类型
export enum PrescriptionStatus {
    // 未付款
    NotPayment = 1,
    // 已付款
    Payment = 2,
    // 已失效
    Invalid = 3
}
