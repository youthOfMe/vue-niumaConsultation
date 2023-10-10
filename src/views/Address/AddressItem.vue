<script setup lang="ts">
import type { AddressItem } from '@/types/order.d.ts'
import { deleteAddressItem } from '@/service/address'
import { showConfirmDialog, showSuccessToast } from 'vant'

defineProps<{
    item: AddressItem
}>()

const deleteAddress = (id: string) => {
    console.log(id)
    showConfirmDialog({
        title: '牛马警告',
        message: '您确定删除该配置地址吗',
        theme: 'round-button'
    }).then(async () => {
        const niuma = await deleteAddressItem(id)
        showSuccessToast('删除地址成功')
        window.location.replace('/address/manage')
    })
}
</script>

<template>
    <van-swipe-cell>
        <div class="address-item">
            <div class="item" v-if="item.isDefault">
                <van-cell-group>
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
                <van-cell-group>
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
        <template #right>
            <van-button square type="primary" text="编辑" class="button" />
            <van-button
                square
                text="删除"
                type="danger"
                class="button"
                @click="deleteAddress(item.id)"
            />
        </template>
    </van-swipe-cell>
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
.button {
    height: 100%;
}
</style>
