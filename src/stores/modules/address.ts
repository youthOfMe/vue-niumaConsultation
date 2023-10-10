import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ChangeAddressInfo } from '@/types/address'

export const useAddressStore = defineStore(
    'cp-address',
    () => {
        // 地址信息对象
        const addressInfo = ref<ChangeAddressInfo>()
        // 记录地址信息对象
        const setAddressInfo = (changeAddressInfo: ChangeAddressInfo) => {
            console.log(changeAddressInfo)
            const { receiver, mobile, addressDetail } = changeAddressInfo
            addressInfo.value = {
                receiver,
                mobile,
                // provinceCode,
                // cityCode,
                // countyCode,
                addressDetail
            }
            console.log(addressInfo)
            addressInfo.value.isDefault = changeAddressInfo.isDefault ? 1 : 0
        }
        // 清空地址信息对象
        const clearAddressInfo = () => {
            addressInfo.value = undefined
        }
        return {
            addressInfo,
            setAddressInfo,
            clearAddressInfo
        }
    },
    {
        persist: true
    }
)
