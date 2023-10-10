import { request } from '@/utils/request'
import type { AddressItem } from '@/types/order'
import type { AddressId } from '@/types/address'
import type { AddressParams } from '@/types/address'

// 获取地址列表
export const getAddressList = () => request<AddressItem[]>('patient/order/address', 'GET')

// 进行添加地址信息
export const addAddressItem = (params: AddressParams) =>
    request<AddressId>('patient/order/address', 'POST', params)
