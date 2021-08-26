// 工具
import util from '@/libs/util.ice'
// 页面和布局
import Index from './pages/Index'
import Login from './pages/Login'
import Register from './pages/Register'
import Error404 from './pages/Error404'
import HeaderAside from './layouts/HeaderAside'

import Apk from './pages/Apk'
import Certificate from './pages/Certificate'
import Engine from './pages/Engine'
import Task from './pages/Task'
import User from './pages/User'
import HotLoad from './pages/HotLoad'

import Manager from './pages/Manager'
import AddCertificate from './pages/Admin/AddCertificate'

const routerConfig = [
    // 首页 必须 name:index
    {
        path: '/',
        name: 'index',
        layout: HeaderAside,
        component: Index,
        meta: {
            auth: true,
            title: '首页'
        }
    },
    {
        path: '/refresh',
        name: 'refresh',
        layout: HeaderAside,
        hidden: true,
        component: {
            beforeRouteEnter (to, from, next) {
                next(vm => vm.$router.replace(from.fullPath))
            },
            render: h => h()
        }
    },
    {
        path: '/redirect/:route*',
        name: 'redirect',
        layout: HeaderAside,
        hidden: true,
        component: {
            beforeRouteEnter (to, from, next) {
                next(vm => vm.$router.replace(JSON.parse(from.params.route)))
            },
            render: h => h()
        }
    },
    {
        path: '/apk',
        name: 'APK 列表',
        layout: HeaderAside,
        component: Apk,
        meta: {
            auth: true,
            title: 'APK 列表'
        }
    },
    {
        path: '/task',
        name: '任务列表',
        layout: HeaderAside,
        component: Task,
        meta: {
            auth: true,
            title: '任务列表'
        }
    },
    {
        path: '/certificate',
        name: '证书',
        layout: HeaderAside,
        component: Certificate,
        meta: {
            auth: true,
            title: '证书'
        }
    },
    {
        path: '/hotload',
        name: '证书',
        layout: HeaderAside,
        component: HotLoad,
        meta: {
            auth: true,
            title: '热发插件'
        }
    },
    {
        path: '/engine',
        name: 'Engine',
        layout: HeaderAside,
        component: Engine,
        meta: {
            auth: true,
            title: 'Engine'
        }
    },
    {
        path: '/manager',
        name: 'Manager',
        layout: HeaderAside,
        component: Manager,
        meta: {
            auth: true,
            title: 'Manager'
        }
    },
    {
        path: '/add-cer',
        name: '添加证书',
        layout: HeaderAside,
        component: AddCertificate,
        meta: {
            auth: true,
            title: 'Manager'
        }
    },
    {
        path: '/user',
        name: '用户管理',
        layout: HeaderAside,
        component: User,
        meta: {
            auth: true,
            title: 'User'
        }
    },
]

const routerConfigMenuOut = [
    // 登录
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            auth: false
        }
    },
    // 注册
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            auth: false
        }
    },
    // 404
    {
        path: '*',
        component: Error404
    }
]

// 导出全部路由设置
// 这个数据会在 router.js 中被扁平处理

export default util.recursiveRouterConfig([
    ...routerConfig,
    ...routerConfigMenuOut
])

// 导出参与多标签页处理的路由设置
// 这个数据会在 mian.js 中使用

export const frameInRoutes = util.recursiveRouterConfig(routerConfig).map(e => {
    const route = e.children ? e.children[0] : e
    return {
        path: e.path,
        name: route.name,
        hidden: route.hidden,
        meta: route.meta
    }
})
