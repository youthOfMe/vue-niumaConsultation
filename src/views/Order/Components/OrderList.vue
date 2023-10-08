<script setup lang="ts">
import OrderItem from './OrderItem.vue'
</script>

<template>
    <div class="order-list">
        <order-item v-for="i in 5" :key="i" />
    </div>
</template>

<style lang="scss" scoped>
.order-list {
    padding: 10px 15px;
}
</style>
