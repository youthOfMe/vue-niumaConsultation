// 文章信息类型
export type Knowledge = {
    id: string
    // 标题
    title: string
    // 封面[]
    coverUrl: string[]
    // 标签[]
    topics: string[]
    // 收藏数量
    collectionNumber: number
    // 评论数
    commentNumber: number
    // 医生名称
    creatorName: string
    // 医生头像
    creatorAvatar: string
    // 医生医院
    creatorHospatalName: string
    // 关注文章
    likeFlag: 0 | 1
    // 内容
    content: string
    // 医生科室
    creatorDep: string
    // 医生职称
    creatorTitles: string
    // 医生ID
    creatorId: string
}

// 文章列表
export type KnowledgeList = Knowledge[]

// 文章列表带分页
export type KnowledgePage = {
    pageTotal: number
    total: number
    rows: KnowledgeList
}

// props类型 recommend推荐 : fatReduction减脂 food健饮食 like关注医生页面文章
export type knowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'

// 通用的分页查询参数
export type PageParams = {
    /** 当前页码 */
    current: number
    /** 每页条数 */
    pageSize: number
}

// 文章列表查询参数
export type KnowledgeParams = PageParams & {
    type: knowledgeType
}

// 设置关注医生接收数据类型，发送请求数据类型
export type Doctor = {
    // 医生ID
    id: string
    // 医生名称
    name: string
    // 头像
    avator: string
    // 医院名称
    hospitalName: string
    // 医院等级
    gradeName: string
    // 科室
    depName: string
    // 职称
    positionalTitles: string
    // 是否关注: 0 未关注 1 已关注
    likeFlag: 0 | 1
    // 接诊服务费
    serviceFee: number
    // 接诊人数
    consultationNum: number
    // 评分
    score: number
    // 主攻方向
    major: string
}

// 医生列表
export type DoctorList = Doctor[]

// 医生分页
export type DoctorPage = PageParams & {
    rows: DoctorList
}

// 配置关注的目标的类型
export type FollowType = 'topic' | 'knowledge' | 'doc' | 'disease'

// 引入枚举进行设置类型
import { ConsultType, IllnessTime } from '@/enum'
import type { Patient } from './user'
import type { OrderType } from '@/enums'

// 配置图片列表类型
export type Image = {
    // 图片ID
    id: string
    // 图片地址
    url: string
}

// 配置问诊记录数据类型
export type Consult = {
    // 图片ID
    id: string
    // 问诊类型
    type: ConsultType
    // 快速问诊类型 普通 => 0 三甲 => 1
    illnessType: 0 | 1
    // 科室ID
    depId: string
    // 疾病描述
    illnessDesc: string
    // 疾病持续时间
    illnessTime: IllnessTime
    // 是否就诊过 未就诊过 => 0 就诊过 => 1
    consultFlag: 0 | 1
    // 图片数组
    pictures: Image[]
    // 患者ID
    patientId: string
    // 优惠券ID
    couponId: string
}

// Partial<T> 把一个对象的属性转换成可选
type PartialConsult = Partial<Consult>
// Requried<T> 把一个对象的属性全部转换为必选
type RequriedConsult = Required<PartialConsult>

// 定义二级科室
type SubDep = {
    id: string
    name: string
}

// 定义一级科室
type TopDep = SubDep & {
    child: SubDep[]
}

// 定义病情描述对象数据类型
type ConsultIllness = Pick<
    PartialConsult,
    'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>

// 问诊订单预支付传参
export type ConsultOrderPreParms = Pick<PartialConsult, 'type' | 'illnessType'>

// 问诊订单预支付信息
export type ConsultOrderPreData = {
    // 积分抵扣
    pointDeduction: number
    // 优惠券抵扣
    couponDeduction: number
    // 优惠券ID
    couponId: string
    // 需付款
    payment: number
    // 实付款
    actualPayment: number
}

// 问诊订单单项信息
export type ConsultOrderItem = Consult & {
    // 创建时间
    createTime: string
    // 医生信息
    docInfo: Doctor
    // 患者信息
    patientInfo: Patient
    // 订单编号
    orderNo: string
    // 订单状态
    status: OrderType
    // 状态文字
    statusValue: string
    // 类型问诊文字
    typeValue: string
    // 倒计时时间
    countdown: number
    // 处方ID
    prescriptionId?: string
    // 评价ID
    evaluateId: number
    // 应付款
    payment: number
    // 优惠券抵扣
    couponDeduction: number
    // 积分抵扣
    pointDeduction: number
    // 实付款
    actualPayment: number
}

// 问诊记录页面数据列表请求参数类型
export type ConsultOrderListParams = PageParams & {
    type: ConsultType
}
// 获取的问诊记录的接收数据类型
export type ConsultOrderPage = {
    total: number
    pageTotal: number
    rows: ConsultOrderItem[]
}
