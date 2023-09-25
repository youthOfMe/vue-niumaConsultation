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

// 文章列表查询参数
export type KnowledgeParams = {
    type: knowledgeType
    current: number
    pageSize: number
}
