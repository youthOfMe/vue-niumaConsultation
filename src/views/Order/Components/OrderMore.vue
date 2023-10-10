<script setup lang="ts">
import { showFailToast, showSuccessToast } from 'vant'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
    disabled?: boolean
}>()

const showPopover = ref(false)
const actions = computed(() => [{ text: '订单详情' }, { text: '删除订单' }, { text: '暮雪老狗' }])
// 定义提交自定义事件提交到父组件中进行调用事件
const emit = defineEmits<{
    (e: 'on-detail'): void
}>()
const router = useRouter()
const onSelect = (actions: { text: string }, i: number) => {
    if (i === 0) emit('on-detail')
    if (i === 1) showFailToast('后端开发人员是垃圾，接口不可用')
    if (i === 2) showSuccessToast('正确')
}
</script>

<template>
    <div class="consult-more">
        <van-popover
            v-model:show="showPopover"
            :actions="actions"
            @select="onSelect"
            placement="top-start"
        >
            <template #reference>更多</template>
        </van-popover>
    </div>
</template>

<style scoped>
.consult-more {
    color: var(--cp-tag);
    flex: 1;
    font-size: 13px;
}
</style>
