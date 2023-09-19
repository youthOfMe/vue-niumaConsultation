<script setup lang="ts">
import { Button as VanButton } from 'vant'
</script>

<template>
  <van-button type="primary">按钮</van-button>
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
