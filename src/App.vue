<script setup lang="ts">
import { Button as VanButton } from 'vant'
import { useUserStore } from './stores/user'
const userStore = useUserStore()
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
  <div class="main">main</div>
  <div class="footer">footer</div>
</template>

<style scoped lang="scss">
.main {
  color: var(--main-color);
}
.footer {
  color: var(--main-color);
}
</style>
