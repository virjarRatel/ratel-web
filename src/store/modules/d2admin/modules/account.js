import { Message, MessageBox } from 'element-ui'
import { user } from '@api/ratel'
import util from '@/libs/util.js'
import router from '@/router'

export default {
    namespaced: true,
    actions: {
        login({ dispatch }, {
            userName = '',
            password = ''
        } = {}) {
            return new Promise((resolve, reject) => {
                // 开始请求登录接口
                user.login({
                    userName,
                    password
                })
                    .then(async res => {
                        if (res.ok) {
                            Message({
                                message: '登录成功',
                                type: 'success'
                            });
                            util.cookies.set('uuid', res.token)
                            const admin = await user.userMode().then(res => {
                                if (res.ok) {
                                    dispatch('d2admin/user/set', {
                                        name: res.data.nickName,
                                        uuid: res.data.loginToken
                                    }, { root: true })
                                    util.cookies.set('token', res.data.isAdmin)
                                    return res.data.isAdmin
                                }
                                return false
                            })
                            await dispatch('load')
                            resolve(admin)
                        } else {
                            Message({
                                message: res.message,
                                type: 'error'
                            });
                            reject(res.message)
                        }
                    })
                    .catch(err => {
                        console.log('err: ', err)
                        reject(err)
                    })
            })
        },
        register({ dispatch }, {
            userName = '',
            password = ''
        } = {}) {
            return new Promise((resolve, reject) => {
                // 开始请求注册接口
                user.register({
                    userName,
                    password
                })
                    .then(async res => {
                        if (res.ok) {
                            Message({
                                message: '注册成功',
                                type: 'success'
                            });
                            util.cookies.set('uuid', res.token)
                            const admin = user.userMode().then(res => {
                                if (res.ok) {
                                    dispatch('d2admin/user/set', {
                                        name: res.data.nickName,
                                        uuid: res.data.loginToken
                                    }, { root: true })
                                    util.cookies.set('token', res.data.isAdmin)
                                    return res.data.isAdmin
                                }
                                return false
                            })
                            await dispatch('load')
                            resolve(admin)
                        } else {
                            Message({
                                message: res.message,
                                type: 'error'
                            });
                            reject(res.message)
                        }
                    })
                    .catch(err => {
                        console.log('err: ', err)
                        reject(err)
                    })
            })
        },
        logout({ commit, dispatch }, { confirm = false } = {}) {
            async function logout() {
                // 删除cookie
                util.cookies.remove('token')
                util.cookies.remove('uuid')
                // 清空 vuex 用户信息
                await dispatch('d2admin/user/set', {}, { root: true })
                // 跳转路由
                router.push({
                    name: 'login'
                })
            }
            // 判断是否需要确认
            if (confirm) {
                commit('d2admin/gray/set', true, { root: true })
                MessageBox.confirm('确认注销当前账户吗? ', '确认操作', {
                    confirmButtonText: '确定注销',
                    cancelButtonText: '放弃',
                    type: 'warning'
                })
                    .then(() => {
                        commit('d2admin/gray/set', false, { root: true })
                        logout()
                    })
                    .catch(() => {
                        commit('d2admin/gray/set', false, { root: true })
                        Message({
                            message: '放弃注销用户'
                        })
                    })
            } else {
                logout()
            }
        },
        load({ dispatch }) {
            return new Promise(async resolve => {
                // DB -> store 加载用户名
                await dispatch('d2admin/user/load', null, { root: true })
                // DB -> store 加载主题
                await dispatch('d2admin/theme/load', null, { root: true })
                // DB -> store 加载页面过渡效果设置
                await dispatch('d2admin/transition/load', null, { root: true })
                // DB -> store 持久化数据加载上次退出时的多页列表
                await dispatch('d2admin/page/openedLoad', null, { root: true })
                // DB -> store 持久化数据加载侧边栏折叠状态
                await dispatch('d2admin/menu/asideCollapseLoad', null, { root: true })
                // DB -> store 持久化数据加载全局尺寸
                await dispatch('d2admin/size/load', null, { root: true })
                // end
                resolve()
            })
        }
    }
}
