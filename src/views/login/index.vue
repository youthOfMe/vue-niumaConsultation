<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { formProps, showSuccessToast, showToast, type FormInstance } from 'vant'
import { loginByMobile, loginByPassword, sendMobileCode } from '@/service/user'
import { useUserStore } from '@/stores/index'

const mobile = ref('')
const password = ref('')
const agree = ref(false)

// 创建用户仓库
const userStore = useUserStore()
// 调用路由
const router = useRouter()
const route = useRoute()

let onSubmit = async () => {
    if (!agree.value) {
        return showToast('请勾选按协议')
    }
    // 判断是密码登录还是短信登录并进行发请求
    const res = isPass.value
        ? await loginByPassword(mobile.value, password.value)
        : await loginByMobile(mobile.value, code.value)
    userStore.setUser(res.data)
    showSuccessToast('登录成功')
    router.replace((route.query.returnUrl as string) || '/user')
}

// 短信登录页面切换
const isPass = ref(true)
const code = ref('')

// 配置发送验证码请求
const time = ref(0)
const form = ref<FormInstance>()
let timer: number
const onSend = async () => {
    // 验证 : 手机号 倒计时
    if (time.value > 0) return
    await form.value?.validate('mobile')
    await sendMobileCode(mobile.value, 'login')
    showToast('发送成功')
    // 开启倒计时
    time.value = 60
    if (timer) clearInterval(timer) // 保险
    timer = setInterval(() => {
        time.value--
        if (time.value <= 0) clearInterval(timer)
    }, 1000)
}
onUnmounted(() => clearInterval(timer))
</script>

<template>
    <div class="login-page">
        <cp-native-bar
            right-text="注册"
            @click-right="$router.push('/register')"
        ></cp-native-bar>
        <!-- 头部 -->
        <div class="login-head">
            <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
            <a href="javascript:;" @click="isPass = !isPass">
                <span>{{ isPass ? '短信验证码登录' : '密码登录' }}</span>
                <van-icon name="arrow"></van-icon>
            </a>
        </div>
        <!-- 表单 -->
        <van-form autocomplete="off" @submit="onSubmit()" ref="form">
            <van-field
                name="mobile"
                placeholder="请输入手机号"
                type="tel"
                v-model="mobile"
                :rules="mobileRules"
            >
            </van-field>
            <van-field
                placeholder="请输入密码"
                type="password"
                v-model="password"
                :rules="passwordRules"
                v-if="isPass"
            >
            </van-field>
            <van-field
                placeholder="请输入验证码"
                type="text"
                v-model="code"
                :rules="codeRules"
                v-else
            >
                <template #button>
                    <span class="btn-send" @click="onSend()">
                        {{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}
                    </span>
                </template>
            </van-field>
            <div class="cp-cell">
                <van-checkbox v-model="agree">
                    <span>我已同意</span>
                    <a href="javascript:;">用户协议</a>
                    <span>及</span>
                    <a href="javascript:;">隐私条款</a>
                </van-checkbox>
            </div>
            <div class="cp-cell">
                <van-button block round type="primary" native-type="submit"
                    >登 录</van-button
                >
            </div>
            <div class="cp-cell">
                <a href="javascript:;">忘记密码？</a>
            </div>
        </van-form>
        <!-- 底部 -->
        <div class="login-other">
            <van-divider>第三方登录</van-divider>
            <div class="icon">
                <img src="@/assets/qq.svg" alt="" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login {
    &-page {
        padding-top: 46px;
    }
    &-head {
        display: flex;
        padding: 30px 30px 50px;
        justify-content: space-between;
        align-items: flex-end;
        line-height: 1;
        h3 {
            font-weight: normal;
            font-size: 24px;
        }
        a {
            font-size: 15px;
        }
    }
    &-other {
        margin-top: 60px;
        padding: 0 30px;
        .icon {
            display: flex;
            justify-content: center;
            img {
                width: 36px;
                height: 36px;
                padding: 4px;
            }
        }
    }
}
.van-form {
    padding: 0 14px;
    .cp-cell {
        height: 52px;
        line-height: 24px;
        padding: 14px 16px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .van-checkbox {
            a {
                color: var(--cp-primary);
                padding: 0 5px;
            }
        }
    }
    .btn-send {
        color: var(--cp-primary);
        &.active {
            color: rgba(22, 194, 163, 0.5);
        }
    }
}
</style>
