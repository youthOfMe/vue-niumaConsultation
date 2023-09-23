export type User = {
    // token令牌
    token: string
    // 用户ID
    id: string
    // 用户名称
    account: string
    // 手机号
    mobile: string
    // 头像
    avator: string
}

// login登录 register注册 changeMobile更换手机号 forgetPassword找回密码 bindMobile绑定第三方登录
export type CodeType =
    | 'login'
    | 'register'
    | 'changeMobile'
    | 'forgetPassword'
    | 'bindMobile'

// 配置个人页面请求数据类型声明
type OmitUser = Omit<User, 'token'>
export type UserInfo = OmitUser & {
    // 关注数量
    likeNumber: number
    // 收藏数量
    collectionNumber: number
    // 积分数量
    score: number
    // 优惠券数量
    couponNumber: number
    orderInfo: {
        // 待付款数量
        paidNumber: number
        // 待发货数量
        receiveNumber: number
        // 待收货数量
        shippedNumber: number
        // 已完成数量
        finishedNumber: number
    }
}

// 家庭档案-患者信息
export type Patient = {
    // 患者ID
    id: string
    // 患者名称
    name: string
    // 身份证号
    idCard: string
    // 0不默认 1默认
    defaultFlag: 0 | 1
    // 0 女 1 男
    gender: 0 | 1
    // 性别文字
    genderValue: string
    // 年龄
    age: number
}

// 家庭档案-患者信息列表
export type PatientList = Patient[]
