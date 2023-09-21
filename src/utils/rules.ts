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

// 定义验证码规则
const codeRules: FieldRule[] = [
    { required: true, message: '请输入验证码' },
    { pattern: /^\d{6}$/, message: '验证码格式错误' }
]

export { mobileRules, passwordRules, codeRules }
