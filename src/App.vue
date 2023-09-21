<script setup lang="ts">
import { Button as VanButton, showToast } from 'vant'
import { useUserStore } from './stores'
import axios from './utils/request'
import { request } from './utils/request'
import type { User } from './types/user'
const userStore = useUserStore()

const getUser = () => {
    axios.request({
        url: 'patient/myUser',
        method: 'get'
    })
}
// 测试登录
const login = () => {
    request<User>('login/password', 'POST', {
        mobile: '132111122252',
        password: 'abc12345'
    })
        .then((res) => {
            showToast(res.message)
        })
        .catch((err) => {
            // showToast(err.message)
        })
}
</script>

<template>
    App{{ userStore.user }}
    <van-button type="primary" @click="login">登录</van-button>
    <van-button type="primary" @click="userStore.delUser()"
        >退出登录</van-button
    >
    <van-button @click="getUser()">获取用户信息</van-button>
</template>

<style scoped lang="scss">
.main {
    color: var(--main-color);
}
.footer {
    color: var(--main-color);
}
</style>
./stores/modules/user
