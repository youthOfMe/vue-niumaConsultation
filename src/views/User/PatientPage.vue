<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { PatientList, Patient } from '@/types/user'
import { addPatient, getPatientList } from '@/service/user'
import { nameRules, idCardRule } from '@/utils/rules'
import { showConfirmDialog, type FormInstance, showSuccessToast } from 'vant'

// 组件挂载完毕的时候进行获取数据
const list = ref<PatientList>([])
const loadList = async () => {
    const res = await getPatientList()
    list.value = res.data
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
const showPopup = () => {
    patient.value = { ...initPatient }
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

const patient = ref<Patient>({ ...initPatient })

const defaultFlag = computed({
    get: () => (patient.value.defaultFlag === 1 ? true : false),
    set: (value) => (patient.value.defaultFlag = value ? 1 : 0)
})

// 进行提交
const form = ref<FormInstance>()
const onSubmit = async () => {
    await form.value?.validate()
    console.log('校验通过')
    // 性别校验
    const gender = Number(patient.value.idCard.substring(-2, -1)) % 2
    if (gender !== patient.value.gender % 2) {
        await showConfirmDialog({
            title: '温馨提示',
            message: '填写的性别和身份证号中的不一致\n您确认提交吗'
        })
    }
    // 提交
    await addPatient(patient.value)
    // 成功: 关闭添加患者页面,加载患者列表,成功提示
    show.value = false
    location.reload()
    showSuccessToast('添加成功')
}
</script>

<template>
    <div class="patient-page">
        <cp-native-bar title="家庭档案"></cp-native-bar>
        <div class="patient-list">
            <div class="patient-item" v-for="item in list" :key="item.id">
                <div class="info">
                    <span class="name">{{ item.name }}</span>
                    <span class="id">{{
                        item.idCard.replace(/^(.{6}).+(.{4})$/, '$1********$2')
                    }}</span>
                    <span>{{ item.genderValue }}</span>
                    <span>{{ item.age }}岁</span>
                </div>
                <div class="icon"><cp-icon name="user-edit" /></div>
                <div class="tag" v-if="item.defaultFlag">默认</div>
            </div>
            <div class="patient-add" v-if="list.length < 6" @click="showPopup">
                <cp-icon name="user-add" />
                <p>添加患者</p>
            </div>
            <div class="patient-tip">最多可添加 6 人</div>
            <!-- 使用popup 组件 -->
            <van-popup position="right" v-model:show="show">
                <cp-native-bar
                    title="添加患者"
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
                            <cp-raido-btn
                                v-model="patient.gender"
                                :options="options"
                            ></cp-raido-btn>
                        </template>
                    </van-field>
                    <van-field label="默认就诊人">
                        <template #input>
                            <van-checkbox
                                :icon-size="18"
                                round
                                v-model="patient.defaultFlag"
                            ></van-checkbox>
                        </template>
                    </van-field>
                </van-form>
            </van-popup>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
