<script setup lang="ts">
import CpNativeBar from '@/components/CpNativeBar.vue'
import { getAddressList } from '@/service/address'
import { ref, onMounted } from 'vue'
import type { AddressItem as AddressItemType } from '@/types/order'
import AddressItem from './AddressItem.vue'
import { showToast } from 'vant'

const addressList = ref<AddressItemType[]>()
onMounted(async () => {
    const res = await getAddressList()
    addressList.value = res.data
})
</script>

<template>
    <div class="address-page">
        <cp-native-bar :title="$route.meta.title"></cp-native-bar>
        <van-list v-if="addressList">
            <address-item :item="item" v-for="item in addressList" :key="item.id"></address-item>
        </van-list>
        <div
            class="address-add"
            v-if="addressList"
            @click="
                addressList?.length <= 6
                    ? $router.push('/address/add')
                    : showToast('最多只能添加六个地址哦')
            "
        >
            <van-icon name="plus" size="25px" />
            <p class="add-text">添加地址</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.address-page {
    padding-top: 46px;
    background-color: var(--cp-bg);
    min-height: calc(100vh - 46px);
    .address-add {
        background-color: white;
        margin: 15px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 6px;
        height: 80px;
    }
    .van-icon {
        color: var(--cp-primary);
    }
    .add-text {
        color: var(--cp-primary);
        margin-top: 2px;
        font-size: 12px;
    }
}
</style>
