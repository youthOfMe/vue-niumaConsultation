<script setup lang="ts">
import type { AddressItem } from '@/types/order.d.ts'

defineProps<{
    addressList: AddressItem[]
}>()
</script>

<template>
    <div class="address-item" v-for="item in addressList" :key="item.id">
        <div class="item" v-if="item.isDefault">
            <van-cell-group inset>
                <van-cell title="收货信息" size="large" is-link>
                    <view>
                        <van-tag type="primary">默认</van-tag>
                        <view class="van-cell-text">编辑</view>
                    </view>
                </van-cell>
                <van-cell
                    title="身份信息"
                    :border="false"
                    class="mobile_info info"
                    :value="item.receiver + ' ' + item.mobile"
                ></van-cell>
                <van-cell
                    title="地址信息"
                    :value="item.province"
                    :label="item.province + item.city + item.county + item.addressDetail"
                    class="info"
                />
            </van-cell-group>
        </div>
        <div class="item" v-else>
            <van-cell-group inset>
                <van-cell title="收货信息" size="large" is-link>
                    <view>
                        <view class="van-cell-text">编辑</view>
                    </view>
                </van-cell>
                <van-cell
                    title="身份信息"
                    :border="false"
                    class="mobile_info info"
                    :value="item.receiver + ' ' + item.mobile"
                ></van-cell>
                <van-cell
                    title="地址信息"
                    :value="item.province"
                    :label="item.province + item.city + item.county + item.addressDetail"
                    class="info"
                />
            </van-cell-group>
        </div>
    </div>
</template>

<style scoped lang="scss">
.address-item {
    .item {
        margin-top: 10px;
    }
    .info {
        padding-top: 6px;
    }
    .mobile_info {
        height: 35px;
        padding-bottom: 8px;
    }
}
.van-tag {
    margin-right: 5px;
}
</style>
