// 配置接收添加地址时返回的数据
export type AddressId = {
    id: string
}

// 配置请求添加地址的请求参数
export type AddAddressParams = {
    // 收货人
    receiver: string
    // 联系方式
    mobile: string
    // 所在省份编码
    provinceCode: string
    // 所在城市编码
    cityCode: string
    // 所在区/县编码
    countyCode: string
    // 详细地址
    addressDetail: string
    // 是否默认
    isDefault?: number
}

// 配置删除地址的请求参数
export type DeleteAddressParams = Pick<AddressId, 'id'>

// 配置修改收货地址
export type ChangeAddressParams = AddAddressParams

// 配置建立收货地址暂存库类型
export type ChangeAddressInfo = Omit<
    ChangeAddressParams,
    'provinceCode' | 'cityCode' | 'countyCode'
> & {
    id?: string
}
