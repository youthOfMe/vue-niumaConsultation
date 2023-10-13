import { request } from '@/utils/request'
import type { AddressItem } from '@/types/order'
import type { AddressId } from '@/types/address'
import type { AddAddressParams, DeleteAddressParams, ChangeAddressParams } from '@/types/address'

// 获取地址列表
export const getAddressList = () => request<AddressItem[]>('patient/order/address', 'GET')

// 进行添加地址信息
export const addAddressItem = (params: AddAddressParams) =>
    request<AddressId>('patient/order/address', 'POST', params)

// 进行删除收获地址信息
export const deleteAddressItem = (id: string) =>
    request<AddressId>(`patient/order/address/${id}`, 'DELETE')

// 进行修改收货地址信息
export const changeAddressItem = (params: ChangeAddressParams, id: string) =>
    request<AddressId>(`patient/order/address/${id}`, 'PUT', params)
