<template>
  <span
    class="d2-mr mock-user"
    v-if="mockToken"
    @click="clearMock"
  >管理员模拟账户(点击退出): {{mockToken.split('&')[0]}}</span>
  <el-dropdown size="small" class="d2-mr" v-else>
    <span class="btn-text">{{info.name ? info.name : '未登录'}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5" />注销
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      mockToken: sessionStorage.getItem("mock-user")
    };
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  methods: {
    ...mapActions("d2admin/account", ["logout"]),
    /**
     * @description 登出
     */
    logOff() {
      this.logout({
        confirm: true
      });
    },
    clearMock() {
      sessionStorage.clear();
      window.location.href = '/';
    }
  }
};
</script>
