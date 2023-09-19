<script setup lang="ts">
import { Button as VanButton } from 'vant'
import { useUserStore } from './stores'
import axios from './utils/request'
const userStore = useUserStore()

const getUser = () => {
  axios.request({
    url: 'patient/myUser',
    method: 'get'
  })
}
</script>

<template>
  App{{ userStore.user }}
  <van-button
    type="primary"
    @click="
      userStore.setUser({
        id: '1',
        avator: '1',
        token: '888',
        mobile: '1008611',
        account: '1'
      })
    "
    >登录</van-button
  >
  <van-button type="primary" @click="userStore.delUser()">退出登录</van-button>
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
