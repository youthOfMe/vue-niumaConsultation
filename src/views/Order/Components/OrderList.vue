<script setup lang="ts">
import OrderItem from './OrderItem.vue'
import { ref, onMounted } from 'vue'
import { getMediclOrderList } from '@/service/order'
import type { MedicalOrderList } from '@/types/order'
import { OrderType } from '@/enums'

const props = defineProps<{
    orderStatus: OrderType
}>()
const medicalOrderList = ref<MedicalOrderList>()
const current = ref<string>('1')
onMounted(async () => {
    const res = await getMediclOrderList({
        current: current.value,
        pageSize: '5',
        status: String(props.orderStatus)
    })
    medicalOrderList.value = res.data
    console.log(res)
})
</script>

<template>
    <div class="order-list">
        <order-item v-for="item in medicalOrderList?.rows" :key="item.id" :item="item" />
    </div>
</template>

<style lang="scss" scoped>
.order-list {
    padding: 10px 15px;
}
</style>
