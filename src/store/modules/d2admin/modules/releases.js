import util from '@/libs/util.js'

export default {
  namespaced: true,
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state vuex state
     */
    versionShow () {
      // util.log.capsule('D2Admin', `v${process.env.VUE_APP_VERSION}`)
    }
  }
}
