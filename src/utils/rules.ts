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

// 定义中文姓名规则
const nameRules: FieldRule[] = [
    { required: true, message: '请输入真实的姓名' },
    { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '中文字符2-16个' }
]

// 定义身份证规则
const idCardRule: FieldRule[] = [
    { required: true, message: '请输入身份证号' },
    {
        pattern:
            /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
        message: '身份证格式不正确'
    }
]

export { mobileRules, passwordRules, codeRules, nameRules, idCardRule }
