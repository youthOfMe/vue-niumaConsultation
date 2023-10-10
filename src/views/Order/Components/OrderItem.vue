<script setup lang="ts">
import { ref } from 'vue'
import type { MedicalOrderItem } from '@/types/order'
import { OrderType } from '@/enums'
import { showFailToast, showSuccessToast } from 'vant'
import { inject } from 'vue'
import { onMounted } from 'vue'
import OrderMore from './OrderMore.vue'
import { useRouter } from 'vue-router'

const activeNames = ref<string[]>([])
const props = defineProps<{
    item: MedicalOrderItem
}>()

// 配置继续支付功能
const showPay = inject<(itema: MedicalOrderItem) => void>('showPay')
onMounted(() => {})

// 配置更多中的查看详情功能
const router = useRouter()
const showDetail = () => {
    router.push(`/order/${props.item.id}`)
}
</script>

<template>
    <div class="consult-item">
        <div class="head van-hairline--bottom">
            <img class="img" src="@/assets/avatar-doctor.svg" />
            <p>药品订单</p>
            <span>{{ item.statusValue }}</span>
        </div>
        <div class="body">
            <div class="body-row">
                <div class="body-label">订单id</div>
                <div class="body-value">{{ item.id }}</div>
            </div>
            <div class="body-row">
                <div class="body-label">订单编号</div>
                <div class="body-value">{{ item.orderNo }}</div>
            </div>
            <div class="body-row">
                <div class="body-label">地址</div>
                <div class="body-value tip">{{ item.address || '无' }}</div>
            </div>
            <!-- <div class="body-row">
                <div class="body-label">优惠券id</div>
                <div class="body-value tip">{{ item.couponId || '无' }}</div>
            </div>
            <div class="body-row">
                <div class="body-label">优惠券抵扣</div>
                <div class="body-value tip">-￥{{ item.couponDeduction }}</div>
            </div>
            <div class="body-row">
                <div class="body-label">运费</div>
                <div class="body-value tip">￥{{ item.expressFee }}</div>
            </div>
            <div class="body-row">
                <div class="body-label">药品金额</div>
                <div class="body-value tip">￥{{ item.payment || '0' }}</div>
            </div> -->
            <div class="body-row">
                <div class="body-label">实际支付</div>
                <div class="body-value tip">￥{{ item.actualPayment }}</div>
            </div>
            <van-collapse v-model="activeNames">
                <van-collapse-item
                    title="药品列表"
                    name="1"
                    :accordion="true"
                    class="collapse-item"
                >
                    <div class="body-medical-list" v-for="med in item.medicines" :key="med.id">
                        <div class="body-medical-item">
                            <div class="item-basic-info">
                                <img src="/src/assets/ad.png" alt="" class="fl" />
                                <div class="info fr ml">
                                    <div class="name-quantity info-item">
                                        <div class="fl" style="width: 130px">
                                            <p>{{ med.name }}</p>
                                        </div>
                                        <p class="fr quantity" style="width: 30px">
                                            x{{ med.quantity }}
                                        </p>
                                        <div class="clear"></div>
                                    </div>
                                    <div class="flag-specs info-item">
                                        <span class="flag">{{
                                            med.prescriptionFlag ? '处方药' : '非处方药'
                                        }}</span>
                                        <span>{{ med.specs }}</span>
                                    </div>
                                    <p class="price info-item">￥{{ med.amount }}</p>
                                </div>
                                <div class="clear"></div>
                            </div>
                        </div>
                        <p class="medical-use">
                            {{ med.usageDosag }}
                        </p>
                    </div>
                </van-collapse-item>
            </van-collapse>
        </div>
        <div class="foot">
            <!-- <van-button class="gray" plain size="small" round :to="`/order/${item?.id}`"
                >查看详情</van-button
            > -->

            <template v-if="String(item.status) === String(OrderType.MedicinePay)">
                <!-- 更多组件 -->
                <order-more @on-detail="showDetail()"> </order-more>
                <van-button
                    class="gray"
                    plain
                    size="small"
                    round
                    @click="showFailToast('垃圾接口强烈抵制')"
                    >取消订单</van-button
                >
                <van-button type="primary" plain size="small" round @click="showPay!(item)"
                    >去支付</van-button
                >
            </template>
            <template v-if="String(item.status) === String(OrderType.MedicineSend)">
                <!-- 更多组件 -->
                <order-more @on-detail="showDetail()"> </order-more>
                <van-button
                    class="gray"
                    plain
                    size="small"
                    round
                    @click="showFailToast('垃圾接口强烈抵制')"
                    >取消订单</van-button
                >
                <van-button
                    type="primary"
                    plain
                    size="small"
                    round
                    @click="showSuccessToast('已通知商家')"
                    >提醒发货</van-button
                >
            </template>
            <template v-if="String(item.status) === String(OrderType.MedicineTake)">
                <van-button
                    type="primary"
                    plain
                    size="small"
                    round
                    @click="$router.push(`/order/${item.id}`)"
                    >查看详情</van-button
                >
                <van-button
                    type="primary"
                    plain
                    size="small"
                    round
                    primary
                    @click="showFailToast('后端正在拼命开发中')"
                    >确认收货</van-button
                >
            </template>
            <template v-if="String(item.status) === String(OrderType.MedicineComplete)">
                <!-- 更多组件 -->
                <order-more @on-detail="showDetail()"> </order-more>
                <van-button
                    type="primary"
                    plain
                    size="small"
                    round
                    @click="showFailToast('垃圾接口无法调用')"
                    >删除订单</van-button
                >
                <van-button
                    type="primary"
                    plain
                    size="small"
                    round
                    primary
                    @click="showFailToast('后端正在拼命开发中')"
                    >再次购买</van-button
                >
            </template>
            <template v-if="String(item.status) === String(OrderType.MedicineCancel)">
                <!-- 更多组件 -->
                <order-more @on-detail="showDetail()"> </order-more>
                <van-button
                    type="primary"
                    plain
                    size="small"
                    round
                    @click="showFailToast('垃圾接口无法调用')"
                    >删除订单</van-button
                >
                <van-button
                    type="primary"
                    plain
                    size="small"
                    round
                    primary
                    @click="showFailToast('后端正在拼命开发中')"
                    >沟通记录</van-button
                >
            </template>

            <!-- <van-buttono
                type="primary"
                plain
                size="small"
                round
                :to="`/consult/fast`"
                v-else-if="
                    item.status === String(OrderType.MedicineSend) || String(OrderType.MedicineTake)
                "
                >继续咨询</van-button
            > -->
            <!-- <van-button type="primary" plain size="small" round :to="`/home`" v-else
                >咨询其它医生</van-button
            > -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/repeat.css';
.collapse-item {
    padding-left: 0;
    padding-right: 0;
}
.consult-item {
    border-radius: 4px;
    box-shadow: 0px 0px 22px 0px rgba(245, 245, 245, 0.1);
    background-color: #fff;
    margin-bottom: 10px;
    .head {
        display: flex;
        align-items: center;
        height: 50px;
        padding: 0 15px;
        .img {
            width: 20px;
            height: 20px;
        }
        > p {
            flex: 1;
            font-size: 15px;
            padding-left: 10px;
        }
        > span {
            color: var(--cp-tag);
            &.orange {
                color: #f2994a;
            }
            &.green {
                color: var(--cp-primary);
            }
        }
    }
    .body {
        padding: 15px 15px 8px 15px;
        .body-row {
            display: flex;
            margin-bottom: 7px;
        }
        .body-label {
            width: 72px;
            font-size: 13px;
            color: var(--cp-tip);
        }
        .body-value {
            width: 250px;
            &.tip {
                color: var(--cp-tip);
            }
        }
        .body-medical-list {
            margin-bottom: 7px;
            .body-medical-item {
                .item-basic-info {
                    img {
                        width: 80px;
                        height: 70px;
                        border-radius: 2px;
                        overflow: hidden;
                    }
                    .info {
                        width: 190px;
                        span {
                            font-size: 12px;
                            line-height: 12px;
                        }
                        .flag {
                            background-color: var(--cp-primary);
                            color: #fff;
                            border: var(--cp-primary) 3px solid;
                            margin-right: 5px;
                        }
                        .info-item {
                            margin-bottom: 5px;
                        }
                        .price {
                            color: red;
                            font-size: 20px;
                        }
                        .quantity {
                            display: flex;
                            flex-direction: row-reverse;
                        }
                    }
                }
            }
            .medical-use {
                background-color: #eeeeee;
                padding: 5px;
                border-radius: 5%;
                font-size: 14px;
                color: #aaa;
            }
        }
    }
    .foot {
        padding: 0 15px 15px 15px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .van-button {
            margin-left: 10px;
            padding: 0 16px;
            &.gray {
                color: var(--cp-text3);
                background-color: var(--cp-bg);
            }
        }
        .more {
            color: var(--cp-tag);
            flex: 1;
            font-size: 13px;
        }
    }
}
</style>
