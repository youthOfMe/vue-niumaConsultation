<script setup lang="ts">
import { useOrderDetail } from '@/composables'
import { useRoute } from 'vue-router'
import OrderMedical from './Components/OrderMedical.vue'
import { OrderType } from '@/enums'

const route = useRoute()
const { order } = useOrderDetail(route.params.id as string)
</script>

<template>
    <div class="order-detail-page">
        <cp-native-bar :title="`${$route.meta.title}-${order?.statusValue}`" />
        <div class="order-head">
            <div
                class="address"
                v-if="
                    order?.status === OrderType.MedicinePay ||
                    order?.status === OrderType.MedicineCancel ||
                    order?.status === OrderType.MedicineSend
                "
            >
                <p class="area">
                    <van-icon name="location" />
                    <span>{{
                        order?.addressInfo.province +
                        order?.addressInfo.city +
                        order?.addressInfo.county
                    }}</span>
                </p>
                <p class="detail">{{ order?.addressInfo.addressDetail }}</p>
                <p>
                    {{ order?.addressInfo.receiver }}
                    {{ order?.addressInfo.mobile.replace(/^(\d{3})\d+(\d{4})$/, '$1****$2') }}
                </p>
            </div>
            <div class="card" @click="$router.push(`/order/logistics/${order?.id}`)" v-else>
                <div class="logistics">
                    <p>{{ order?.expressInfo }}</p>
                    <p>{{ order?.expressFee }}</p>
                </div>
                <van-icon name="arrow" />
            </div>
        </div>
        <!-- 药品清单列表 -->
        <order-medical :medicines="order?.medicines" v-if="order?.medicines"></order-medical>
        <div class="order-detail">
            <van-cell-group>
                <van-cell title="药品金额" :value="`￥${order?.payment}`" />
                <van-cell title="运费" :value="`￥${order?.expressFee}`" />
                <van-cell title="优惠券" :value="`-￥${order?.couponDeduction}`" />
                <van-cell title="实付款" :value="`￥${order?.actualPayment}`" class="price" />
                <van-cell title="订单编号" :value="order?.orderNo" />
                <van-cell title="创建时间" :value="order?.createTime" />
                <template
                    v-if="
                        order?.status === OrderType.MedicineComplete ||
                        order?.status === OrderType.MedicineTake ||
                        order?.status === OrderType.MedicineSend
                    "
                >
                </template>
                <van-cell title="支付时间" :value="order?.payTime" />
                <van-cell title="支付方式" :value="order?.paymentMethod ? '支付宝' : '微信'" />
            </van-cell-group>
        </div>
        <!-- 已取消 -->
        <van-action-bar v-if="order?.status === OrderType.MedicineCancel">
            <van-action-bar-icon icon="delete-o" text="删除" />
            <van-action-bar-button type="primary" text="沟通记录" />
        </van-action-bar>
        <!-- 待收货 -->
        <van-action-bar v-if="order?.status === OrderType.MedicineTake">
            <van-action-bar-button type="primary" text="确认收货" />
        </van-action-bar>
        <!-- 待发货 -->
        <van-action-bar v-if="order?.status === OrderType.MedicineSend">
            <van-action-bar-button type="primary" text="提醒发货" />
        </van-action-bar>
        <!-- 待支付 -->
        <van-action-bar v-if="order?.status === OrderType.MedicinePay">
            <p class="price">
                需要支付：<span>{{ order?.actualPayment }}</span>
            </p>
            <van-action-bar-button color="#bbb" text="取消订单" />
            <van-action-bar-button type="primary" text="继续支付" />
        </van-action-bar>
        <!-- 已完成 -->
        <van-action-bar v-if="order?.status === OrderType.MedicineComplete">
            <van-action-bar-icon icon="delete-o" text="删除" />
            <van-action-bar-button type="primary" text="再次购买" />
        </van-action-bar>
    </div>
</template>

<style lang="scss" scoped>
.order-detail-page {
    padding-top: 46px;
    padding-bottom: 65px;
}
.address {
    padding: 15px;
    background-color: #fff;
    font-size: 13px;
    position: relative;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
    border-radius: 8px;
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
}
.order-head {
    position: relative;
    padding: 15px;
    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 80px;
        background: linear-gradient(180deg, rgba(44, 181, 165, 0), rgba(44, 181, 165, 0.2));
        border-bottom-left-radius: 150px 20px;
        border-bottom-right-radius: 150px 20px;
    }
    .card {
        height: 74px;
        background-color: #fff;
        border-radius: 8px;
        position: relative;
        display: flex;
        align-items: center;
        padding: 0 15px;
        box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
        .logistics {
            flex: 1;
            p {
                &:first-child {
                    color: var(--cp-primary);
                }
                &:last-child {
                    color: var(--cp-tag);
                    font-size: 13px;
                    margin-top: 5px;
                }
            }
        }
        .van-icon {
            color: var(--cp-tip);
        }
    }
}
:deep(.van-cell) {
    .van-cell__title {
        font-size: 14px;
        flex: none;
        width: 100px;
    }
    .van-cell__value {
        font-size: 14px;
    }
    &.price {
        .van-cell__value {
            font-size: 18px;
            color: var(--cp-price);
        }
    }
}
.van-action-bar {
    padding: 0 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    .price {
        padding: 0 10px;
        > span {
            font-size: 18px;
            color: var(--cp-price);
        }
    }
}
</style>
