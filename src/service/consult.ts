import type {
    DoctorPage,
    FollowType,
    KnowledgePage,
    KnowledgeParams,
    PageParams,
    TopDep,
    Image,
    ConsultOrderPreParms,
    ConsultOrderPreData,
    PartialConsult,
    ConsultOrderItem,
    ConsultOrderListParams,
    ConsultOrderPage
} from '@/types/consult'
import { request } from '@/utils/request'
export const getKonwledgePage = (params: KnowledgeParams) =>
    request<KnowledgePage>('patient/home/knowledge', 'GET', params)

export const getDoctorPage = (params: PageParams) =>
    request<DoctorPage>('home/page/doc', 'GET', params)

// 关注额api 负责关注或者取消关注
export const followOrUnfollow = (id: string, type: FollowType) =>
    request('like', 'POST', { id, type })

// 配置科室请求接口
export const getAllDep = () => request<TopDep[]>('dep/all')

// 配置上传文件API
export const uploadImage = (file: File) => {
    // 提交File对象, 需要准备一个FormData对象
    const fd = new FormData()
    fd.append('file', file) // 使用append方法给对象进行添加属性
    return request<Image>('upload', 'POST', fd)
}

// 配置获取订单信息API
export const getConsultOrderPre = (params: ConsultOrderPreParms) =>
    request<ConsultOrderPreData>('patient/consult/order/pre', 'GET', params)

// 配置获取生成订单API
export const createConsultOrder = (data: PartialConsult) =>
    request<{ id: string }>('patient/consult/order', 'POST', data)

// 配置跳转支付地址API
export const getConsultOrderPayUrl = (params: {
    paymentMethod: 0 | 1
    orderId: string
    payCallback: string
}) => request<{ payUrl: string }>('patient/consult/pay', 'POST', params)

// 定义获取订单数据API
export const getConsultOrderDetail = (orderId: string) =>
    request<ConsultOrderItem>('patient/consult/order/detail', 'GET', {
        orderId
    })

// 定义维度消息的数量API
export const getUnreadMessageCount = () =>
    request<number>('patient/message/unRead/all')

// 定义获取处方图片地址
export const getPrescriptionPic = (id: string) =>
    request<{ url: string }>(`patient/consult/prescription/${id}`)

// 定义提交信息API
export const evaluateConsultOrder = (data: {
    docId: string
    orderId: string
    score: number
    content: string
    anonymousFlag: 0 | 1
}) => request('patient/order/evaluate', 'POST', data)

// 请求问诊记录列表数据的API函数
export const getConsultOrderList = (params: ConsultOrderListParams) =>
    request<ConsultOrderPage>('patient/consult/order/list', 'GET', params)
