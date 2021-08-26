import util from './libs/util.ice'

const asideMenuConfig = [
    {
        name: '首页',
        icon: 'dashboard',
        path: '/'
    },
    {
        name: '我的任务',
        icon: 'home',
        path: '/user',
        children: [
            {
                name: '所有任务',
                icon: 'tasks',
                path: '/task/'
            },
            {
                name: 'APK 列表',
                icon: 'cubes',
                path: '/apk/'
            },
            {
                name: '证书',
                icon: 'certificate',
                path: '/certificate/'
            },
            {
                name: '热发插件',
                icon: 'bolt',
                path: '/hotload/'
            }
        ]
    }
]

const adminAsideMenuConfig = [
    ...asideMenuConfig,
    {
        name: '管理员',
        icon: 'tint',
        path: '/admin',
        children: [
            {
                name: '用户管理',
                icon: 'user',
                path: '/user/'
            },
            {
                name: '生成证书',
                icon: 'cogs',
                path: '/add-cer/'
            },
            {
                name: '引擎管理',
                icon: 'leaf',
                path: '/engine/'
            },
            {
                name: '管理 APK',
                icon: 'sitemap',
                path: '/manager/'
            },
            // {
            //     name: '用户管理',
            //     icon: 'user-md',
            //     path: '/user/'
            // }
        ]
    }
]

const headerMenuConfig = []

// 导出顶栏菜单
export const menuHeader = util.recursiveMenuConfig(headerMenuConfig)

// 导出侧边栏菜单
export const menuAside = util.recursiveMenuConfig(asideMenuConfig)

// 导出管理员菜单
export const menuAdminAside = util.recursiveMenuConfig(adminAsideMenuConfig)
