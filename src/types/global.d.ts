// 使用interface给全局对象进项添加类型声明

// 给全局对象windows进行配置 给一个类型进行添加类型的时候使用这个
interface Window {
    _AMapSecurityConfig: {
        securityJsCode: string
    }
}

// 给全局变量QC进行添加类型 新建类型的时候进行使用这个
type QCType = {
    Login: {
        check(): boolean
        getMe(cb: (openId: string) => void): void
    }
}

declare const QC: QCType
