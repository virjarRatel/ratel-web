
import { menuAdminAside, menuAside } from '../../../../menuConfig'
import { user } from '@api/ratel'
import util from '@/libs/util.js'
export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {}
  },
  actions: {
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param {*} info info
     */
    set({ state, dispatch }, info) {
      return new Promise(async resolve => {
        // store 赋值
        state.info = info
        // 持久化
        await dispatch('d2admin/db/set', {
          dbName: 'sys',
          path: 'user.info',
          value: info,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} state vuex state
     */
    load({ commit, state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.info = await dispatch('d2admin/db/get', {
          dbName: 'sys',
          path: 'user.info',
          defaultValue: {},
          user: true
        }, { root: true })
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
        if (admin) {
          await commit('d2admin/menu/asideSet', menuAdminAside, { root: true })
        } else {
          await commit('d2admin/menu/asideSet', menuAside, { root: true })
        }
        // end
        resolve()
      })
    }
  }
}
