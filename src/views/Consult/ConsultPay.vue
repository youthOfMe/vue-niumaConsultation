<script setup lang="ts">
import { useConsultStore } from '@/stores'
import { ref, onMounted } from 'vue'
import type { Patient } from '@/types/user'
import type { ConsultOrderPreData, PartialConsult } from '@/types/consult'
import { getConsultOrderPre, createConsultOrder } from '@/service/consult'
import { getPatientDetail } from '@/service/user'
import { showConfirmDialog, showDialog, showToast } from 'vant'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import CpPaySheet from '@/components/CpPaySheet.vue'
// 获取预支付信息
const consultStore = useConsultStore()
const payInfo = ref<ConsultOrderPreData>()
const loadData = async () => {
    const res = await getConsultOrderPre({
        type: consultStore.consult.type,
        illnessType: consultStore.consult.illnessType
    })
    payInfo.value = res.data
    // 记录优惠券ID
    consultStore.setCoupon(res.data.couponId)
}

// 获得患者详情信息
const patient = ref<Patient>()
const loadPatient = async () => {
    if (!consultStore.consult.patientId) return
    const res = await getPatientDetail(consultStore.consult.patientId)
    patient.value = res.data
}

// 配置渲染数据必须的数据
const agree = ref(false)

// 生成订单
// 进行配置支付橱窗的配置数据
const show = ref(false)
const loading = ref(false)
// 打开选择支付模式的小窗前进行检验
// const choosePayMethod = () => {
//     if (!agree.value) return showToast('请先同意支付协议')
//     show.value = true
// }
const orderId = ref('')
const submit = async () => {
    if (!agree.value) return showToast('请先同意支付协议')
    loading.value = true
    // 发送生成订单的请求
    const res = await createConsultOrder(consultStore.consult)
    loading.value = false
    consultStore.clear()
    orderId.value = res.data.id
    show.value = true
}

// 实现禁止用户进行路由回退功能
onBeforeRouteLeave(() => {
    // 返回false就是进行禁止离开本路由
    if (orderId.value) return false
})

// 配置橱窗用户引导函数
const router = useRouter()
const onClose = () => {
    return showConfirmDialog({
        title: '牛马提示',
        message:
            '取消支付将无法得到医生的回复，医生接诊名额有限，是否确认取消呢',
        cancelButtonText: '狠心离开',
        confirmButtonText: '狠心支付'
    })
        .then(() => {
            return false
        })
        .catch(() => {
            orderId.value = ''
            router.push('/home')
            return true
        })
}

// 实现用户填写信息的校验
type Key = keyof PartialConsult
// 获取数据
onMounted(() => {
    // 生成订单需要信息不完整的时候需要进行提示
    // 使用生成的该联合类型，写字段时能获得类型提示
    const validKeys: Key[] = [
        'type',
        'illnessType',
        'depId',
        'illnessDesc',
        'illnessTime',
        'consultFlag',
        'patientId'
    ]
    const valid = validKeys.every(
        (key) => consultStore.consult[key] !== undefined
    )
    if (!valid) {
        return showDialog({
            title: '牛马提示',
            message:
                '问诊信息不完整请重新添加，如果有未支付的问诊订单可以在问诊记录中进行查看',
            closeOnPopstate: false
        }).then(() => {
            router.push('/home')
        })
    }
    loadData()
    loadPatient()
})

// 支付抽屉
</script>

<template>
    <div class="consult-pay-page" v-if="payInfo && patient">
        <cp-native-bar title="支付" />
        <div class="pay-info">
            <p class="tit">图文问诊 {{ payInfo.payment }} 元</p>
            <img class="img" src="@/assets/avatar-doctor.svg" />
            <p class="desc">
                <span>极速问诊</span>
                <span>自动分配医生</span>
            </p>
        </div>
        <van-cell-group>
            <van-cell title="优惠券" :value="`-￥${payInfo.couponDeduction}`" />
            <van-cell
                title="积分抵扣"
                :value="`-￥${payInfo.pointDeduction}`"
            />
            <van-cell
                title="实付款"
                :value="`¥${payInfo.actualPayment}`"
                class="pay-price"
            />
        </van-cell-group>
        <div class="pay-space"></div>
        <van-cell-group>
            <van-cell
                title="患者信息"
                :value="`${patient.name} | ${patient.genderValue} | ${patient.age}岁`"
            ></van-cell>
            <van-cell
                title="病情描述"
                :label="consultStore.consult.illnessDesc"
            ></van-cell>
        </van-cell-group>
        <div class="pay-schema">
            <van-checkbox v-model="agree"
                >我已同意 <span class="text">支付协议</span></van-checkbox
            >
        </div>
        <van-submit-bar
            button-type="primary"
            :price="payInfo.actualPayment * 100"
            button-text="立即支付"
            text-align="left"
            @click="submit"
            :loading="loading"
        />
        <!-- 支付抽屉，控制面板 -->
        <cp-pay-sheet
            v-model:show="show"
            :order-id="orderId"
            :actual-payment="payInfo.payment"
            :on-close="onClose"
        >
        </cp-pay-sheet>
    </div>
</template>

<style lang="scss" scoped>
.consult-pay-page {
    padding: 46px 0 50px 0;
}
.pay-info {
    display: flex;
    padding: 15px;
    flex-wrap: wrap;
    align-items: center;
    .tit {
        width: 100%;
        font-size: 16px;
        margin-bottom: 10px;
    }
    .img {
        margin-right: 10px;
        width: 38px;
        height: 38px;
        border-radius: 4px;
        overflow: hidden;
    }
    .desc {
        flex: 1;
        > span {
            display: block;
            color: var(--cp-tag);
            &:first-child {
                font-size: 16px;
                color: var(--cp-text2);
            }
        }
    }
}
.pay-price {
    ::v-deep() {
        .vam-cell__title {
            font-size: 16px;
        }
        .van-cell__value {
            font-size: 16px;
            color: var(--cp-price);
        }
    }
}
.pay-space {
    height: 12px;
    background-color: var(--cp-bg);
}
.pay-schema {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
        color: var(--cp-primary);
    }
}
::v-deep() {
    .van-submit-bar__button {
        font-weight: normal;
        width: 160px;
    }
}
.pay-type {
    .amount {
        padding: 20px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }
    .btn {
        padding: 15px;
    }
    .van-cell {
        align-items: center;
        .cp-icon {
            margin-right: 10px;
            font-size: 18px;
        }
        .van-checkbox :deep(.van-checkbox__icon) {
            font-size: 16px;
        }
    }
}
</style>
