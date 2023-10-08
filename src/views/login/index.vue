<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { showSuccessToast, showToast } from 'vant'
import { loginByMobile, loginByPassword } from '@/service/user'
import { useUserStore } from '@/stores/index'
import { useMobileCode } from '@/composables/index'

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
const { onSend, time, form } = useMobileCode(mobile, 'login')

// 进行配置密码的可见与不可见
const isShow = ref<boolean>(false)

// 实现QQ登录
// onMounted(() => {
//     QC.Login({
//         btnId: 'qq'
//     })
// })
</script>

<template>
    <div class="login-page">
        <cp-native-bar right-text="注册" @click-right="$router.push('/register')"></cp-native-bar>
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
                :type="isShow ? 'text' : 'password'"
                v-model="password"
                :rules="passwordRules"
                v-if="isPass"
            >
                <template #button>
                    <cp-icon
                        :name="`login-eye-${isShow ? 'on' : 'off'}`"
                        @click="isShow = !isShow"
                        style="margin-right: 10px"
                    >
                    </cp-icon>
                </template>
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
                <van-button block round type="primary" native-type="submit">登 录</van-button>
            </div>
            <div class="cp-cell">
                <a href="javascript:;">忘记密码？</a>
            </div>
        </van-form>
        <!-- 底部 -->
        <div class="login-other">
            <van-divider>第三方登录</van-divider>
            <a
                href="https://graph.qq.com/oauth2.0/authorize?client_id=102015968&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fconsult-patients.itheima.net%2Flogin%2Fcallback"
            >
                <div class="icon" id="qq">
                    <img src="@/assets/qq.svg" alt="" />
                </div>
            </a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/login.scss';
</style>
