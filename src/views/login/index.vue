<template>
    <h1>这是登陆页面</h1>
    <van-button type="primary" @click="fn">牛马</van-button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

let router = useRouter()
const fn = () => {
    router.push('/')
}
</script>

<style scoped></style>
