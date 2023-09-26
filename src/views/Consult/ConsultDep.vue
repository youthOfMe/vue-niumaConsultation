<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { TopDep } from '@/types/consult'
import { getAllDep } from '@/service/consult'
import { useConsultStore } from '@/stores'

const active = ref(0)

// 进行科室数据请求
const allDep = ref<TopDep[]>([])
onMounted(async () => {
    const res = await getAllDep()
    allDep.value = res.data
})
// 监听获取二级科室数据
const subDep = computed(() => allDep.value[active.value]?.child)
// 进行本地持久化处理
const consultStore = useConsultStore()
</script>

<template>
    <div class="consult-dep-page">
        <cp-native-bar title="选择科室" />
        <div class="wrapper">
            <van-sidebar v-model="active">
                <van-sidebar-item
                    v-for="item in allDep"
                    :title="item.name"
                    :key="item.id"
                />
            </van-sidebar>
            <div class="sub-dep">
                <router-link
                    to="/consult/illness"
                    v-for="sub in subDep"
                    :key="sub.id"
                    @click="consultStore.setDep(sub.id)"
                >
                    {{ sub.name }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.van-sidebar {
    width: 114px;
    &-item {
        padding: 14px;
        color: var(--cp-tag);
        &--select {
            color: var(--cp-main);
            font-weight: normal;
            &::before {
                display: none;
            }
        }
    }
}
.consult-dep-page {
    padding-top: 46px;
    .wrapper {
        height: calc(100vh - 46px);
        overflow: hidden;
        display: flex;
        .sub-dep {
            flex: 1;
            height: 100%;
            overflow-y: auto;
            > a {
                display: block;
                padding: 14px 30px;
                color: var(--cp-dark);
            }
        }
    }
}
</style>
