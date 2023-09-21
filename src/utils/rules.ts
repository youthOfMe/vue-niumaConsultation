// 提供规则类型
import { type FieldRule } from 'vant'

// 提供检验规则

const mobileRules: FieldRule[] = [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
]

const passwordRules: FieldRule[] = [
    { required: true, message: '请输入密码' },
    { pattern: /^\w{8,24}$/, message: '密码格式不正确' }
]

export { mobileRules, passwordRules }
