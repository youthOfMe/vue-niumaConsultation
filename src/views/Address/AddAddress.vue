<script setup lang="ts">
import CpNativeBar from '@/components/CpNativeBar.vue'
import { areaList } from '@vant/area-data'
import { type AddressEditInfo, type AddressEditSearchItem, showSuccessToast } from 'vant'
import { onUnmounted, ref } from 'vue'
import { addAddressItem } from '@/service/address'
import { useRouter } from 'vue-router'
import { useAddressStore } from '@/stores/modules/address'

// 配置新增地址功能
const router = useRouter()
const receiver = ref<string>('')
const mobile = ref<string>('')
const provinceCode = ref<string>()
const cityCode = ref<string>()
const countyCode = ref<string>()
const searchResult = ref<AddressEditSearchItem[]>([])
const addressDetail = ref<string>()
const isDefault = ref<number>()
const onSave = async (addressData: AddressEditInfo) => {
    receiver.value = addressData.name
    mobile.value = addressData.tel
    provinceCode.value = addressData.areaCode.replace(/^(\d{2})\d+$/, '$10000')
    cityCode.value = addressData.areaCode.replace(/^(\d{4})\d+$/, `$100`)
    countyCode.value = addressData.areaCode
    addressDetail.value = addressData.addressDetail
    isDefault.value = addressData.isDefault ? 1 : 0
    await addAddressItem({
        receiver: receiver.value,
        mobile: mobile.value,
        provinceCode: provinceCode.value,
        cityCode: cityCode.value,
        countyCode: countyCode.value,
        addressDetail: addressDetail.value,
        isDefault: isDefault.value
    })
    showSuccessToast('添加地址成功!')
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
