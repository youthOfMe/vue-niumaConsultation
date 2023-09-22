<script setup lang="ts">
import type { UserInfo } from '@/types/user'
import { ref } from 'vue'

const userInfo = ref<UserInfo>()
</script>

<template>
    <h1>这是用户页面</h1>
    <svg aria-hidden="true">
        <use href="#icon-consult-alipay" />
    </svg>
    <cp-icon name="consult-alipay"></cp-icon>
</template>

<style scoped></style>
