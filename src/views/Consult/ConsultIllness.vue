<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { ConsultIllness } from '@/types/consult'
import type { UploaderAfterRead, UploaderFileListItem } from 'vant/lib/uploader/types'
import { uploadImage } from '@/service/consult'
import { useConsultStore } from '@/stores'
import { showConfirmDialog, showToast } from 'vant'
import type { Image } from '@/types/consult'
import { timeOptions, flagOptions } from '@/service/constants'

// 存储病情描述数据
const form = ref<ConsultIllness>({
    illnessDesc: '',
    illnessTime: undefined,
    consultFlag: undefined,
    pictures: []
})

// 上传图片
const fileList = ref<Image[]>([])
const onAfterRead: UploaderAfterRead = (item) => {
    if (Array.isArray(item)) return
    if (!item.file) return
    item.status = 'uploading'
    item.message = '上传中......'

    uploadImage(item.file)
        .then((res) => {
            item.status = 'done'
            item.message = undefined
            item.url = res.data.url
            // 同步数据 上传图片后后台返回的数据就是ID和URL
            form.value.pictures?.push(res.data)
            console.log(form.value.pictures)
        })
        .catch(() => {
            item.status = 'failed'
            item.message = '上传失败'
        })
}
const onDeleteImg = (item: UploaderFileListItem) => {
    form.value.pictures = form.value.pictures?.filter((pic) => pic.url !== item.url)
    console.log(form.value.pictures)
}

// 进行配置控制按钮激活/非激活状态转换数据
const disabled = computed(
    () =>
        !form.value.illnessDesc ||
        form.value.illnessTime === undefined ||
        form.value.consultFlag === undefined
)

// 进行下一步提交和保存数据的操作
const consultStore = useConsultStore()
const router = useRouter()
const next = () => {
    if (!form.value.illnessDesc) return showToast('请输入病情描述')
    if (!form.value.illnessTime) return showToast('请输入症状持续的时间')
    if (!form.value.consultFlag) return showToast('请输入您是就诊过')
    // 记录病情
    consultStore.setIllness(form.value)
    // 跳转，携带标识
    router.push('/user/patient?isChange=1')
}

onMounted(() => {
    if (consultStore.consult.illnessDesc) {
        showConfirmDialog({
            title: '富康提示',
            message: '是否恢复原来填写的数据',
            closeOnPopstate: false // 保证在页面回退时也能进行显示，因为这个组件在页面回退时自动关闭
        }).then(() => {
            // 回显数据
            const { illnessDesc, illnessTime, consultFlag, pictures } = consultStore.consult
            form.value = { illnessDesc, illnessTime, consultFlag, pictures }
            fileList.value = pictures || []
        })
    }
})
</script>

<template>
    <div class="consult-illness-page">
        <cp-native-bar title="图文问诊" />
        <!-- 医生提示 -->
        <div class="illness-tip van-hairline--bottom">
            <img class="img" src="@/assets/avatar-doctor.svg" />
            <div class="info">
                <p class="tit">在线医生</p>
                <p class="tip">请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助</p>
                <p class="safe"><cp-icon name="consult-safe" /><span>内容仅医生可见</span></p>
            </div>
        </div>
        <!-- 收集信息 -->
        <div class="illness-form">
            <van-field
                type="textarea"
                rows="3"
                placeholder="请详细描述您的病情，病情描述不能为空"
                v-model="form.illnessDesc"
            ></van-field>
            <div class="item">
                <p>本次患病多久了？</p>
                <cp-radio-btn :options="timeOptions" v-model="form.illnessTime"></cp-radio-btn>
            </div>
            <div class="item">
                <p>此次病情是否去医院就诊过？</p>
                <cp-radio-btn :options="flagOptions" v-model="form.consultFlag"></cp-radio-btn>
            </div>
            <div class="illness-img">
                <van-uploader
                    upload-icon="photo-o"
                    upload-text="上传图片"
                    max-count="9"
                    :max-size="5 * 1024 * 1024"
                    v-model="fileList"
                    :after-read="onAfterRead"
                    @delete="onDeleteImg"
                ></van-uploader>
                <p class="tip" v-if="!fileList.length">上传内容仅医生可见,最多9张图,最大5MB</p>
            </div>
            <!-- 下一步 -->
            <van-button :class="{ disabled }" type="primary" round block @click="next">
                下一步
            </van-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// 进行配置按钮样式
.van-button {
    font-size: 16px;
    margin-bottom: 30px;
    &.disabled {
        opacity: 1;
        background: #fafafa;
        color: #d9dbde;
        border: #fafafa;
    }
}

// 上传图标组件基本样式
.illness-img {
    padding-top: 16px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    .tip {
        font-size: 12px;
        color: var(--cp-tip);
    }
    ::v-deep() {
        .van-uploader {
            &__preview {
                &-delete {
                    left: -6px;
                    top: -6px;
                    border-radius: 50%;
                    background-color: var(--cp-primary);
                    width: 20px;
                    height: 20px;
                    &-icon {
                        transform: scale(0.9) translate(-22%, 22%);
                    }
                }
                &-image {
                    border-radius: 8px;
                    overflow: hidden;
                }
            }
            &__upload {
                border-radius: 8px;
            }
            &__upload-icon {
                color: var(--cp-text3);
            }
        }
    }
}
// 页面基本样式
.consult-illness-page {
    padding-top: 46px;
}
.illness-tip {
    display: flex;
    padding: 15px;
    .img {
        width: 52px;
        height: 52px;
        border-radius: 4px;
        overflow: hidden;
        margin-top: 10px;
    }
    .info {
        flex: 1;
        padding-left: 12px;
        .tit {
            font-size: 16px;
            margin-bottom: 5px;
        }
        .tip {
            padding: 12px;
            background: var(--cp-bg);
            color: var(--cp-text3);
            font-size: 13px;
            margin-bottom: 10px;
        }
        .safe {
            font-size: 10px;
            color: var(--cp-text3);
            display: flex;
            align-items: center;
            .cp-icon {
                font-size: 12px;
                margin-right: 2px;
            }
        }
    }
}
.illness-form {
    padding: 15px;
    .van-field {
        padding: 0;
        &::after {
            border-bottom: none;
        }
    }
    .item {
        > p {
            color: var(--cp-text3);
            padding: 15px 0;
        }
    }
}
</style>
