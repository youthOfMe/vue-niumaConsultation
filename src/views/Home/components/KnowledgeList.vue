<script setup lang="ts">
import { ref } from 'vue'
import KnowledgeCard from './KnowledgeCard.vue'
import type {
    KnowledgeParams,
    knowledgeType,
    KnowledgeList
} from '@/types/consult'
import { getKonwledgePage } from '@/service/consult'
// 加载中状态
const loading = ref(false)
// 是否完全加载完毕数据
const finished = ref(false)
// 配置数据列表
const list = ref<KnowledgeList>([])
// 定义props确定查询的时什么类型的数据
let props = defineProps<{
    type: knowledgeType
}>()
// 准备好查询参数
const params = ref<KnowledgeParams>({
    type: props.type,
    current: 1,
    pageSize: 5
})
// 滚动到底部时进行加载
const onLoad = async () => {
    const res = await getKonwledgePage(params.value)
    list.value.push(...res.data.rows)
    // 判断已经加载完成了
    if (params.value.current >= res.data.pageTotal) {
        finished.value = true
    } else {
        params.value.current++
    }
    loading.value = false
}
</script>

<template>
    <div class="knowledge-list">
        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <knowledge-card
                v-for="(item, index) in list"
                :key="index"
                :item="item"
            >
            </knowledge-card>
        </van-list>
    </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
    padding: 0 15px;
}
</style>
