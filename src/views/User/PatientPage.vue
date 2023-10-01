<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { PatientList, Patient } from '@/types/user'
import {
    addPatient,
    getPatientList,
    editPatient,
    delPatient
} from '@/service/user'
import { nameRules, idCardRule } from '@/utils/rules'
import {
    showConfirmDialog,
    type FormInstance,
    showSuccessToast,
    showToast
} from 'vant'
import { useRoute } from 'vue-router'
import { useConsultStore } from '@/stores'
import router from '@/router'

// 组件挂载完毕的时候进行获取数据
const list = ref<PatientList>([])
const loadList = async () => {
    const res = await getPatientList()
    list.value = res.data
    // 默认选中效果
    if (isChange.value && list.value.length) {
        const defPatient = list.value.find((item) => item.defaultFlag === 1)
        if (defPatient) patientId.value = defPatient.id
        else patientId.value = list.value[0].id
    }
}
onMounted(() => {
    loadList()
})

// 定义单选框中的数据
const options = [
    { label: '男', value: 1 },
    { label: '女', value: 0 }
]
// 定义数据来进行判断哪个被选中了
const gender = ref(1)

// 控制popup
const show = ref(false)
const showPopup = (item?: Patient) => {
    // 进行判断是点击的是编辑患者还是添加患者
    if (item) {
        const { id, name, idCard, gender, defaultFlag } = item
        patient.value = { id, name, idCard, gender, defaultFlag }
    } else {
        form.value?.resetValidation()
        patient.value = { ...initPatient }
    }
    show.value = true
}

// 创建回退功能
const back = () => {
    show.value = false
}

// 进行配置添加患者双向绑定数据初始化
const initPatient: Patient = {
    name: '',
    idCard: '',
    gender: 1,
    defaultFlag: 0
}

// 定义初始化数据
const patient = ref<Patient>({ ...initPatient })

const defaultFlag = computed({
    get: () => (patient.value.defaultFlag === 1 ? true : false),
    set: (value) => (patient.value.defaultFlag = value ? 1 : 0)
})

// 进行提交
const form = ref<FormInstance>()
const onSubmit = async () => {
    await form.value?.validate()
    // 性别校验
    const gender = Number(patient.value.idCard.slice(-2, -1)) % 2
    console.log(gender)
    if (gender !== patient.value.gender % 2) {
        await showConfirmDialog({
            title: '温馨提示',
            message: '填写的性别和身份证号中的不一致\n您确认提交吗'
        })
    }
    // 提交 由于ID是后端返回的所以刚开始新建患者的时候是没有患者ID的

    patient.value.id
        ? await editPatient(patient.value)
        : addPatient(patient.value)
    // 成功: 关闭添加患者页面,加载患者列表,成功提示
    show.value = false
    loadList()
    showSuccessToast(patient.value.id ? '编辑成功' : '新建成功')
}

// 配置删除功能
const remove = async () => {
    if (patient.value.id) {
        // 确认框，删除请求，关闭，加载，提示
        await showConfirmDialog({
            title: '温馨提示',
            message: `您确认删除 ${patient.value.name} 患者信息吗`
        })
        await delPatient(patient.value.id)
        show.value = false
        loadList()
        showSuccessToast('删除成功')
    }
}
// 判断是不是进行选择患者
const route = useRoute()
// 传递的参数都是字符串类型不是数字
const isChange = computed(() => route.query.isChange === '1')

// 选中效果
const patientId = ref<string>()
const selectPatient = (item: Patient) => {
    if (isChange.value) {
        patientId.value = item.id
    }
}

// 下一步的作用
const consultStore = useConsultStore()
const next = () => {
    if (!patientId.value) return showToast('请选择患者')
    consultStore.setPatient(patientId.value)
    router.push('/consult/pay')
}
</script>

<template>
    <div class="patient-page">
        <cp-native-bar
            :title="isChange ? '选择患者' : '家庭档案'"
        ></cp-native-bar>
        <!-- 头部提示 -->
        <div class="patient-change" v-if="isChange">
            <h3>请选择患者信息</h3>
            <p>以便医生给出更准确的治疗，信息仅医生可见</p>
        </div>
        <div class="patient-list">
            <div
                class="patient-item"
                v-for="item in list"
                :key="item.id"
                :class="{ selected: patientId === item.id }"
                @click="selectPatient(item)"
            >
                <div class="info">
                    <span class="name">{{ item.name }}</span>
                    <span class="id">{{
                        item.idCard.replace(/^(.{6}).+(.{4})$/, '$1********$2')
                    }}</span>
                    <span>{{ item.genderValue }}</span>
                    <span>{{ item.age }}岁</span>
                </div>
                <div class="icon" @click.stop="showPopup(item)">
                    <cp-icon name="user-edit" />
                </div>
                <div class="tag" v-if="item.defaultFlag">默认</div>
            </div>
            <div
                class="patient-add"
                v-if="list.length < 6"
                @click="showPopup()"
            >
                <cp-icon name="user-add" />
                <p>添加患者</p>
            </div>
            <div class="patient-tip">最多可添加 6 人</div>
            <!-- 使用popup 组件 -->
            <van-popup position="right" v-model:show="show">
                <cp-native-bar
                    :title="patient.id ? '编辑患者' : '添加患者'"
                    right-text="保存"
                    :back="back"
                    @click-right="onSubmit"
                >
                </cp-native-bar>
                <van-form autocomplete="off" ref="form">
                    <van-field
                        label="真实姓名"
                        placeholder="请输入真实姓名"
                        v-model="patient.name"
                        :rules="nameRules"
                    ></van-field>
                    <van-field
                        label="身份证号"
                        placeholder="请输入身份证号"
                        v-model="patient.idCard"
                        :rules="idCardRule"
                    ></van-field>
                    <van-field label="性别" class="pb4">
                        <!-- 单选按钮组件 -->
                        <template #input>
                            <cp-radio-btn
                                v-model="patient.gender"
                                :options="options"
                            ></cp-radio-btn>
                        </template>
                    </van-field>
                    <van-field label="默认就诊人">
                        <template #input>
                            <van-checkbox
                                :icon-size="18"
                                round
                                v-model="defaultFlag"
                            ></van-checkbox>
                        </template>
                    </van-field>
                </van-form>
                <!-- 删除按钮 -->
                <van-action-bar v-if="patient.id">
                    <van-action-bar-button
                        text="删除"
                        @click="remove"
                    ></van-action-bar-button>
                </van-action-bar>
            </van-popup>
        </div>
        <!-- 底部按钮 -->
        <div class="patient-next" v-if="isChange">
            <van-button type="primary" round block @click="next"
                >下一步</van-button
            >
        </div>
    </div>
</template>

<style lang="scss" scoped>
// 选中时的样式
.patient-change {
    padding: 15px;
    > h3 {
        font-weight: normal;
        margin-bottom: 5px;
    }
    > p {
        color: var(--cp-text3);
    }
}
// 下一步的样式
.patient-next {
    padding: 15px;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 80px;
    box-sizing: border-box;
}

// 配置编辑患者样式
.patient-change {
    padding: 15px;
    > h3 {
        font-weight: normal;
        margin-bottom: 5px;
    }
    > p {
        color: var(--cp-text3);
    }
}
.patient-next {
    padding: 15px;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 80px;
    box-sizing: border-box;
}

// 配置删除按钮样式
.van-action-bar {
    padding: 0 10px;
    margin-bottom: 10px;
    .van-button {
        color: var(--cp-price);
        background-color: var(--cp-bg);
    }
}

.patient-page {
    padding: 46px 0 80px;
}
.patient-list {
    padding: 15px;
}
// 配置侧滑栏样式
.patient-page {
    padding: 46px 0 80px;
    :deep() {
        .van-popup {
            width: 100%;
            height: 100%;
            padding-top: 46px;
            box-sizing: border-box;
        }
    }
}
.patient-item {
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: var(--cp-bg);
    border-radius: 8px;
    margin-bottom: 15px;
    position: relative;
    border: 1px solid var(--cp-bg);
    transition: all 0.3s;
    overflow: hidden;
    .info {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        span {
            color: var(--cp-tip);
            margin-right: 20px;
            line-height: 30px;
            &.name {
                font-size: 16px;
                color: var(--cp-text1);
                width: 80px;
                margin-right: 0;
            }
            &.id {
                color: var(--cp-text2);
                width: 180px;
            }
        }
    }
    .icon {
        color: var(--cp-tag);
        width: 20px;
        text-align: center;
    }
    .tag {
        position: absolute;
        right: 60px;
        top: 21px;
        width: 30px;
        height: 16px;
        font-size: 10px;
        color: #fff;
        background-color: var(--cp-primary);
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    // 设置选中后的样式
    &.selected {
        border-color: var(--cp-primary);
        background-color: var(--cp-plain);
        .icon {
            color: var(--cp-primary);
        }
    }
}
.patient-add {
    background-color: var(--cp-bg);
    color: var(--cp-primary);
    text-align: center;
    padding: 15px 0;
    border-radius: 8px;
    .cp-icon {
        font-size: 24px;
    }
}
.patient-tip {
    color: var(--cp-tag);
    padding: 12px 0;
}
.pb4 {
    padding-bottom: 4px;
}
</style>
