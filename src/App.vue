<script setup lang="ts">
import { Button as VanButton, showToast } from 'vant'
import { useUserStore } from './stores'
import axios from './utils/request'
import { request } from './utils/request'
const userStore = useUserStore()

const getUser = () => {
    axios.request({
        url: 'patient/myUser',
        method: 'get'
    })
}
// 测试登录
const login = () => {
    request('login/password', 'POST', {
        mobile: '13211112222',
        password: 'abc12345'
    })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
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
