<script setup lang="ts">
function fn() {
    console.log('fn')
}
</script>

<template>
    <cp-native-bar
        title="登录"
        rightText="注册"
        @click-right="fn"
    ></cp-native-bar>
    <router-view></router-view>
</template>

<style scoped lang="scss"></style>
