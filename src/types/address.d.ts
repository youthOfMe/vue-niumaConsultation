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
    isDefault: Integer
}

// 配置删除地址的请求参数
export type DeleteAddressParams = Pick<AddressId, 'id'>

// 配置修改收货地址
export type ChangeAddressParams = Pick<AddressId, 'id'> & {
    // 配置订单id参数
    id: string
    // 配置收货人姓名
    recerver: string
    // 配置收货人联系方式
    mobile: string
    // 配置省份编号
    provinceCode: string
    // 配置城市编号
    cityCode: string
    // 配置县区编号
    countyCode: string
    // 配置详细地址
    addressDetail: string
    // 配置是否为默认
    isDefault: integer
}
