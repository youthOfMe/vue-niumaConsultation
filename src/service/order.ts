import type { AddressItem, OrderPre } from '@/types/order'
import { request } from '@/utils/request'

// 获取药品预支付信息
export const getMedicalOrderPre = (params: { prescriptionId: string }) =>
    request<OrderPre>('patient/medicine/order/pre', 'GET', params)

// 获取地址信息
export const getAddressList = () => request<AddressItem[]>('patient/order/address')
