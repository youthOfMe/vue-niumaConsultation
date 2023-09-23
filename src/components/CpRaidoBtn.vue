<!-- <script setup lang="ts">
// 计数器
// 通过v-model 解析成 通过modelValue传值给子组件 通过@update:modelValue传值给父组件
defineProps<{
    modelValue: number
}>()
defineEmits<{
    (e : 'update:modelValue',count:number) : void
}>()
</script>

<template>
    <h1>计数器 : {{ modelValue }} <button @click="$emit('update:modelValue',modelValue + 1)">+1</button></h1>
</template>

<style scoped>

</style> -->

<script setup lang="ts">
// 计数器
// 通过v-model 解析成 通过modelValue传值给子组件 通过@update:modelValue传值给父组件
defineProps<{
    count: number
}>()
defineEmits<{
    (e: 'update:count', count: number): void
}>()
</script>

<template>
    <h1>
        计数器 : {{ count }}
        <button @click="$emit('update:count', count + 1)">+1</button>
    </h1>
</template>

<style scoped></style>
