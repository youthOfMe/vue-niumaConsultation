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
