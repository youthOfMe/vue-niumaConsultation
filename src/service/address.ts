import { request } from '@/utils/request'
import type { AddressItem } from '@/types/order'

export const getAddressList = () => request<AddressItem[]>('patient/order/address', 'GET')
