import { get, form, post } from './methods'

const prefix = '/ratel'

const prefixApk = `${prefix}/apk`
export const apk = {
    // 通过文件 hash 查询文件记录
    apkDetail: (fileHash) => get(`${prefixApk}/apkDetail?fileHash=${fileHash}`),

    // 查看 apk 文件列表
    listApks: (appPackage, apkType) => get(`${prefixApk}/listApks?appPackage=${appPackage}&apkType=${apkType}`),

    // 上传 apk 文件
    upload: (data, config) => form(`${prefixApk}/upload`, data, config)
}

const prefixCertificate = `${prefix}/certificate`
export const certificate = {
    // 查看单个证书详情
    certificateDetail: (licenceId, licenceVersionCode) => get(`${prefixCertificate}/certificateDetail?licenceId=${licenceId}&licenceVersionCode=${licenceVersionCode}`),

    // 添加授权证书
    importCertificate: (data) => form(`${prefixCertificate}/importCertificate`, data),

    // 查看证书列表
    listCertificate: () => get(`${prefixCertificate}/listCertificate`)
}

const prefixEngine = `${prefix}/engine-bin`
export const engine = {
    // 启用某个版本的发布包
    enableEngine: (bindMd5) => get(`${prefixEngine}/enableEngine?bindMd5=${bindMd5}`),

    // 查询最后十个版本的记录
    listLastTen: () => get(`${prefixEngine}/listLastTen`),

    // 上传ratel builder发布包文件
    upload: (data, config) => form(`${prefixEngine}/upload`, data, config)
}

const prefixHotload = `${prefix}/ratel-hot-module`
export const hotload = {
    // 启用/禁用热发版本
    changeStatus: (hotModuleId, enable) => get(`${prefixHotload}/changeHotModuleStatus?hotModuleId=${hotModuleId}&enable=${enable}`),

    // 查询列表
    list: () => get(`${prefixHotload}/list`),

    // 上传热发模块 apk
    upload: (data, config) => form(`${prefixHotload}/upload`, data, config)
}

const prefixManager = `${prefix}/manager-apk`
export const manager = {
    // 返回最新版本的5条记录
    listLast: (data) => form(`${prefixManager}/listLast`, data),

    // 上传Manager apk文件
    upload: (data) => form(`${prefixManager}/upload`, data)
}

const prefixTask = `${prefix}/task`
export const task = {
    // 克隆构建任务
    cloneTask: (taskId) => get(`${prefixTask}/cloneTask?taskId=${taskId}`),

    // 创建构建任务
    create: (data) => form(`${prefixTask}/create`, data),

    // 列出构建任务，不分页，只列出最后20条
    list: () => get(`${prefixTask}/list`),

    // 标记当前任务输出 apk 是个 badcase，后台收集到之后将会对他进行失败 case 分析
    maskTaskBadCase: (taskId) => get(`${prefixTask}/maskTaskBadCase?taskId=${taskId}`),

    // 重试失败任务
    retryFiledTask: (taskId) => get(`${prefixTask}/retryFiledTask?taskId=${taskId}`),
    exportTask: (taskId,needExport) => get(`${prefixTask}/setExportStatus?taskId=${taskId}&export=${needExport}`)
}

const prefixUser = `${prefix}/user`
export const user = {
    // 登录
    login: (data) => form(`${prefixUser}/login`, data),

    // 注册
    register: (data) => form(`${prefixUser}/register`, data),

    // 查询当前用户信息
    userMode: () => get(`${prefixUser}/userMode`),

    // 用户列表
    listUsers: () => get(`${prefixUser}/listUsers`),

    // 查询 token
    queryLoginToken: (userName) => get(`${prefixUser}/queryLoginToken?userName=${userName}`),
}

const prefixShell = `${prefix}/shell/certificate`
export const shell = {
    // 创建证书
    create: (data) => post(`${prefixShell}/create`, data),

    // 证书详情
    detail: (data) => post(`${prefixShell}/detail`, data),

    // 升级证书
    upgrade: (data) => post(`${prefixShell}/upgrade`, data)
}
