<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getMedicalOrderPre, getAddressList, createMedicalOrder } from '@/service/order'
import type { OrderPre, AddressItem } from '@/types/order'
import { ref, onMounted } from 'vue'
import { showToast } from 'vant'
import CpPaySheet from '@/components/CpPaySheet.vue'
import OrderMedical from './Components/OrderMedical.vue'

// 获取预支付信息
const route = useRoute()
const orderPre = ref<OrderPre>()
const loadOrder = async () => {
    const res = await getMedicalOrderPre({
        prescriptionId: route.query.id as string
    })
    orderPre.value = res.data
}

// 获取地址信息
const address = ref<AddressItem>()
const loadAddress = async () => {
    const addRes = await getAddressList()
    // 有默认就默认，无默认就第一个收获地址
    if (addRes.data.length) {
        const defAddress = addRes.data.find((item) => item.isDefault)
        if (defAddress) address.value = defAddress
        else address.value = addRes.data[0]
    }
}

// 创建药品订单
const agree = ref(false)
const loading = ref(false)
const orderId = ref('')
const show = ref(false)
const onSubmit = async () => {
    if (!agree.value) return showToast('请勾选用户协议')
    if (!address.value?.id) return showToast('请选择收货地址')
    if (!orderPre.value?.id) return showToast('未找到处方')
    if (orderId.value) return showToast('订单已存在，请勿重复支付')
    try {
        loading.value = true
        const res = await createMedicalOrder({
            id: orderPre.value?.id,
            addressId: address.value.id,
            couponId: orderPre.value?.couponId
        })
        orderId.value = res.data.id
        loading.value = false
        // 创建好订单ID之后进行打开支付抽屉
        show.value = true
    } catch (error) {
        loading.value = false
        showToast('创建订单')
    }
}

onMounted(() => {
    loadOrder()
    loadAddress()
})
</script>

<template>
    <div class="order-pay-page" v-if="orderPre && address">
        <cp-native-bar :title="$route.meta.title" />
        <div class="order-address">
            <p class="area">
                <van-icon name="location" />
                <span>{{ address.province + address.city + address.county }}</span>
            </p>
            <p class="detail">{{ address.addressDetail }}</p>
            <p>
                {{ address.receiver }}
                {{ address.mobile.replace(/^(\d{3})\d{4}(\d{4})$/g, '$1****$2') }}
            </p>
        </div>
        <!-- 药品列表 -->
        <order-medical :medicines="orderPre.medicines" v-if="orderPre"></order-medical>
        <div class="order-detail">
            <van-cell-group>
                <van-cell title="药品金额" :value="`￥${orderPre.payment}`" />
                <van-cell title="运费" :value="`￥${orderPre.expressFee}`" />
                <van-cell title="优惠券" :value="`-￥${orderPre.couponDeduction}`" />
                <van-cell title="实付款" :value="`￥${orderPre.actualPayment}`" class="price" />
            </van-cell-group>
        </div>
        <div class="order-tip">
            <p class="tip">
                由于药品的特殊性，如非错发、漏发药品的情况，药品一经发出
                不得退换，请核对药品信息无误后下单。
            </p>
            <van-checkbox v-model="agree">我已同意<a href="javascript:;">支付协议</a></van-checkbox>
        </div>
        <van-submit-bar
            :price="orderPre.actualPayment * 100"
            button-text="立即支付"
            button-type="primary"
            text-align="left"
            :loading="loading"
            @click="onSubmit"
        ></van-submit-bar>
        <cp-pay-sheet
            :show="show"
            :order-id="orderId"
            :actual-payment="orderPre.actualPayment"
            pay-callback="order/pay/result"
        >
        </cp-pay-sheet>
    </div>
    <div class="order-pay-page" v-else>
        <cp-native-bar :title="$route.meta.title" />
        <van-skeleton title avatar row="2" style="margin-top: 15px"></van-skeleton>
        <van-skeleton title row="2" style="margin-top: 50px"></van-skeleton>
        <van-skeleton title row="2" style="margin-top: 50px"></van-skeleton>
    </div>
</template>

<style lang="scss" scoped>
:deep(.van-nav-bar) {
    background-color: var(--cp-primary);
    .van-nav-bar__arrow,
    .van-nav-bar__title {
        color: #fff;
    }
}
:deep(.van-cell) {
    .van-cell__title {
        font-size: 16px;
    }
    .van-cell__value {
        font-size: 16px;
    }
    &.price {
        .van-cell__value {
            font-size: 18px;
            color: var(--cp-price);
        }
    }
}
:deep(.van-submit-bar) {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    .van-button {
        width: 200px;
    }
}
.order-pay-page {
    padding: 46px 0 65px;
}
.order-address {
    padding: 15px 15px 0 15px;
    background-color: #fff;
    font-size: 13px;
    .area {
        color: var(--cp-tag);
        margin-bottom: 5px;
        .van-icon-location {
            color: #ff7702;
            font-size: 14px;
        }
    }
    .detail {
        font-size: 17px;
        margin-bottom: 5px;
    }
    &::after {
        content: '';
        display: block;
        height: 12px;
        background-color: var(--cp-bg);
        margin: 0 -15px;
        margin-top: 15px;
    }
}
.order-tip {
    padding: 0 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
    .tip {
        font-size: 12px;
        color: var(--cp-tag);
        width: 100%;
        &::before {
            content: '*';
            color: var(--cp-price);
            font-size: 14px;
        }
        margin-bottom: 30px;
    }
    .van-checkbox {
        a {
            color: var(--cp-primary);
        }
    }
}
</style>
