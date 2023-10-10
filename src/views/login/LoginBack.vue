<script setup lang="ts">
/* global QC */
import { bindMobile, loginByQQ } from '@/service/user'
import { onMounted, ref } from 'vue'
import { useMobileCode } from '@/composables/index'
import { useUserStore } from '@/stores/modules/user'
import { useRouter } from 'vue-router'
import type { User } from '@/types/user'
import { showSuccessToast } from 'vant'

// 配置发送验证码的功能
const mobile = ref('')
const code = ref()
const { form, time, onSend } = useMobileCode(mobile, 'bindMobile')

// 配置绑定手机的功能
const loading = ref<boolean>(false)
const userStore = useUserStore()
const router = useRouter()
// 配置绑定手机成功的逻辑
const loginSuccess = (res: { data: User }) => {
    userStore.setUser(res.data)
    router.replace(userStore.returnUrl || '/user')
    showSuccessToast('登录成功')
    userStore.setReturnUrl('')
}
// 绑定手机的逻辑
const bind = async () => {
    try {
        loading.value = true
        const res = await bindMobile({
            mobile: mobile.value,
            code: code.value,
            openId: openId.value
        })
        // 绑定手机成功之后进行执行逻辑
        loginSuccess(res)
    } finally {
        loading.value = false
    }
}

const openId = ref('')
const isNeedBind = ref(false)
onMounted(() => {
    if (QC.Login.check()) {
        QC.Login.getMe((id: string) => {
            openId.value = id
            loginByQQ(id)
                .then(() => {
                    router.replace(userStore.returnUrl || '/user')
                    // 登录成功的逻辑
                })
                .catch(() => {
                    // 登录失败的逻辑
                    isNeedBind.value = true
                })
        })
    }
})
</script>

<template>
    <div class="login-page" v-if="isNeedBind">
        <cp-native-bar :title="$route.meta.title"></cp-native-bar>
        <div class="login-head">
            <h3>手机绑定</h3>
        </div>
        <van-form autocomplete="off" ref="form">
            <van-field name="mobile" placeholder="请输入手机号" v-model="mobile"></van-field>
            <van-field name="code" placeholder="请输入验证码" v-model="code">
                <template #button>
                    <span class="btn-send" @click="onSend()">
                        {{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}
                    </span>
                </template>
            </van-field>
            <div class="cp-cell">
                <van-button
                    style="margin-top: 50px"
                    block
                    round
                    type="primary"
                    native-type="submit"
                    @click="bind()"
                    :loading="loading"
                >
                    立即绑定
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/login.scss';
</style>
