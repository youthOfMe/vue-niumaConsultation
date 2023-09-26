import type {
    DoctorPage,
    FollowType,
    KnowledgePage,
    KnowledgeParams,
    PageParams,
    TopDep
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
