import type { KnowledgePage, KnowledgeParams } from '@/types/consult'
import { request } from '@/utils/request'

export const getKonwledgePage = (params: KnowledgeParams) =>
    request<KnowledgePage>('patient/home/knowledge', 'GET', params)
