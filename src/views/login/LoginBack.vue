<script setup lang="ts">
/* global QC */
import { loginByQQ } from '@/service/user'
import { onMounted, ref } from 'vue'
import { useMobileCode } from '@/composables/index'

const openId = ref('')
const isNeedBind = ref(false)
onMounted(() => {
    if (QC.Login.check()) {
        QC.Login.getMe((id: string) => {
            loginByQQ(id)
                .then(() => {
                    // 登录成功的逻辑
                })
                .catch(() => {
                    // 登录失败的逻辑
                    isNeedBind.value = true
                })
        })
    }
})

// 配置发送验证码的功能
const mobile = ref('')
const code = ref()
const { form, time, onSend } = useMobileCode(mobile, 'bindMobile')
</script>

<template>
    <div class="login-page" v-if="isNeedBind">
        <cp-nav-bar></cp-nav-bar>
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
