<script setup lang="ts">
import CpNativeBar from '@/components/CpNativeBar.vue'
import { areaList } from '@vant/area-data'
import {
    type AddressEditInfo,
    type AddressEditSearchItem,
    showSuccessToast,
    showFailToast
} from 'vant'
import { onUnmounted, ref } from 'vue'
import { addAddressItem } from '@/service/address'
import { useRouter } from 'vue-router'
import { useAddressStore } from '@/stores/modules/address'
import { changeAddressItem } from '@/service/address'

// 配置新增地址功能
const router = useRouter()
const cityCode = ref<string>()
const searchResult = ref<AddressEditSearchItem[]>([])
const addressDetail = ref<string>()
const isDefault = ref<number>()
const onSave = async (addressData: AddressEditInfo) => {
    ;(addressStore.addressInfo
        ? changeAddressItem(
              {
                  receiver: addressData.name,
                  mobile: addressData.tel,
                  provinceCode: addressData.areaCode.replace(/^(\d{2})\d+$/, '$10000'),
                  cityCode: addressData.areaCode.replace(/^(\d{4})\d+$/, `$100`),
                  countyCode: addressData.areaCode,
                  addressDetail: addressData.addressDetail,
                  isDefault: (isDefault.value = addressData.isDefault ? 1 : 0)
              },
              addressStore.addressInfo.id
          )
        : addAddressItem({
              receiver: addressData.name,
              mobile: addressData.tel,
              provinceCode: addressData.areaCode.replace(/^(\d{2})\d+$/, '$10000'),
              cityCode: cityCode.value!,
              countyCode: addressData.areaCode,
              addressDetail: addressData.addressDetail,
              isDefault: (isDefault.value = addressData.isDefault ? 1 : 0)
          })
    )
        .then(() => {
            showSuccessToast(addressStore.addressInfo ? '修改地址成功!' : '添加地址成功')
        })
        .catch(() => {
            showFailToast('操作失败')
        })

    router.replace('/address/manage')
}

// 进行获取数据
const addressStore = useAddressStore()
const name = addressStore.addressInfo?.receiver
const tel = addressStore.addressInfo?.mobile
addressDetail.value = addressStore.addressInfo?.addressDetail
    ? addressStore.addressInfo?.addressDetail
    : ''
isDefault.value = addressStore.addressInfo?.isDefault ? addressStore.addressInfo.isDefault : 0
const addressInfo = ref<Partial<AddressEditInfo> | undefined>({
    name,
    tel,
    addressDetail: addressDetail.value,
    isDefault: isDefault.value ? true : false
})

onUnmounted(() => {
    addressStore.clearAddressInfo()
    addressInfo.value = undefined
})
</script>

<template>
    <cp-native-bar
        :title="$route.meta.title"
        :clear-address-info="addressStore.clearAddressInfo"
    ></cp-native-bar>
    <div class="add-address-page">
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-delete
            :address-info="addressInfo"
            show-set-default
            :show-search-result="true"
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
        />
    </div>
</template>

<style scoped lang="scss">
.add-address-page {
    padding: 46px 0;
}
</style>
