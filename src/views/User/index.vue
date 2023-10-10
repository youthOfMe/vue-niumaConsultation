<script setup lang="ts">
import { getMediclOrderList } from '@/service/order'
import { getUserInfo } from '@/service/user'
import { useUserStore } from '@/stores'
import type { UserInfo } from '@/types/user'
import { showConfirmDialog } from 'vant'
import { ref, onMounted } from 'vue'
import { OrderType } from '@/enums'

const user = ref<UserInfo>()

onMounted(async () => {
    const res = await getUserInfo()
    user.value = res.data
})

// 初始化工具
const tools = [
    { label: '我的问诊', path: '/user/consult' },
    { label: '我的处方', path: '/order' },
    { label: '家庭档案', path: '/user/patient' },
    { label: '地址管理', path: '/address/manage' },
    { label: '我的评价', path: '/order' },
    { label: '客服官方', path: '/order' },
    { label: '设置', path: '/order' }
]

// 退出登录
const onLogout = async () => {
    await showConfirmDialog({
        title: '温馨提示',
        message: '请问您是否确认退出牛马问诊?'
    })
    // 点击确认后
    const userStore = useUserStore()
    userStore.delUser()
    location.reload()
}

// 获取药品订单展示数量
const current = ref<string>('1')
const orderNumberList = ref<number[]>([])
const orderTypeList = ref<OrderType[]>([
    OrderType.MedicinePay,
    OrderType.MedicineSend,
    OrderType.MedicineTake,
    OrderType.MedicineComplete,
    OrderType.MedicineCancel
])
onMounted(async () => {
    for (var i = 0; i < orderTypeList.value.length; i++) {
        const res = await getMediclOrderList({
            current: current.value,
            pageSize: '100',
            status: String(orderTypeList.value[i])
        })
        orderNumberList.value.push(res.data.rows.length)
    }
})
</script>

<template>
    <div class="user-page">
        <div class="user-page-head">
            <div class="top">
                <van-image
                    round
                    fit="cover"
                    src="https://yanxuan-item.nosdn.127.net/ef302fbf967ea8f439209bd747738aba.png"
                />
                <div class="name">
                    <p>{{ user?.account }}</p>
                    <p><van-icon name="edit" /></p>
                </div>
            </div>
            <van-row>
                <van-col span="6">
                    <p>{{ user?.collectionNumber }}</p>
                    <p>收藏</p>
                </van-col>
                <van-col span="6">
                    <p>{{ user?.likeNumber }}</p>
                    <p>关注</p>
                </van-col>
                <van-col span="6">
                    <p>{{ user?.score }}</p>
                    <p>积分</p>
                </van-col>
                <van-col span="6">
                    <p>{{ user?.couponNumber }}</p>
                    <p>优惠券</p>
                </van-col>
            </van-row>
        </div>
        <div class="user-page-order">
            <div class="head">
                <h3>药品订单</h3>
                <router-link to="/order">全部订单 <van-icon name="arrow" /></router-link>
            </div>
            <van-row>
                <van-col span="6">
                    <van-badge :content="orderNumberList[0]">
                        <cp-icon name="user-paid" />
                    </van-badge>
                    <p>待付款</p>
                </van-col>
                <van-col span="6">
                    <van-badge :content="orderNumberList[1]">
                        <cp-icon name="user-shipped" />
                    </van-badge>
                    <p>待发货</p>
                </van-col>
                <van-col span="6">
                    <van-badge :content="orderNumberList[2]">
                        <cp-icon name="user-received" />
                    </van-badge>
                    <p>待收货</p>
                </van-col>
                <van-col span="6">
                    <van-badge :content="orderNumberList[3]">
                        <cp-icon name="user-finished" />
                    </van-badge>
                    <p>已完成</p>
                </van-col>
            </van-row>
        </div>
        <div class="user-page-group">
            <h3>快捷工具</h3>
            <van-cell
                :title="item.label"
                is-link
                :border="false"
                v-for="(item, index) in tools"
                :key="item.label"
                :to="item.path"
            >
                <template #icon><cp-icon :name="`user-tool-0${index + 1}`" /></template>
            </van-cell>
        </div>
        <!-- 退出登录 -->
        <a href="javascript:;" class="logout" @click="onLogout">退出登录</a>
    </div>
</template>

<style lang="scss" scoped>
.user-page {
    background-color: var(--cp-bg);
    min-height: calc(100vh - 50px);
    padding: 0 15px 65px;
    // 头部
    &-head {
        height: 200px;
        background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
        margin: 0 -15px;
        padding: 0 15px;
        .top {
            display: flex;
            padding-top: 50px;
            align-items: center;
            .van-image {
                width: 70px;
                height: 70px;
            }
            .name {
                padding-left: 10px;
                p {
                    &:first-child {
                        font-size: 18px;
                        font-weight: 500;
                    }
                    &:last-child {
                        margin-top: 10px;
                        color: var(--cp-primary);
                        font-size: 16px;
                    }
                }
            }
        }
        .van-row {
            margin: 0 -15px;
            padding-top: 15px;
            p {
                text-align: center;
                &:first-child {
                    font-size: 18px;
                    font-weight: 500;
                }
                &:last-child {
                    color: var(--cp-dark);
                    font-size: 12px;
                    padding-top: 4px;
                }
            }
        }
    }
    // 订单
    &-order {
        background-color: #fff;
        border-radius: 8px;
        margin-bottom: 15px;
        padding-bottom: 15px;
        .head {
            display: flex;
            justify-content: space-between;
            line-height: 50px;
            padding: 0 15px;
            a {
                color: var(--cp-tip);
            }
        }
        .van-col {
            text-align: center;
            .cp-icon {
                font-size: 28px;
            }
            p {
                font-size: 12px;
                padding-top: 4px;
            }
        }
    }
    // 分组
    &-group {
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
        h3 {
            padding-left: 16px;
            line-height: 44px;
        }
        .van-cell {
            align-items: center;
        }
        .cp-icon {
            font-size: 17px;
            margin-right: 10px;
        }
    }
    .logout {
        display: block;
        margin: 20px auto;
        width: 100px;
        text-align: center;
        color: var(--cp-price);
    }
}
</style>
