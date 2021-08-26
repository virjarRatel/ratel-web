<template>
  <d2-container>
    <template v-if="type == 'list'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input placeholder="请输入内容" size="small" class="input-with-select" v-model="query">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-refresh-right"
            :loading="loading"
            @click="getList()"
          >刷新</el-button>
          <!-- <el-button type="primary" size="small" icon="el-icon-upload2" @click="type = 'add'">添加任务</el-button> -->
        </el-col>
      </el-row>
      <p style="height: 10" />
      <el-table :data="showList" style="width: 100%" size="small" v-loading="loading">
        <el-table-column prop="account" label="账号" width="180"></el-table-column>
        <el-table-column prop="pwd" label="密码" width="180"></el-table-column>
        <el-table-column prop="lastActive" label="最后一次登录时间" width="180"></el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-sunny"
              v-if="mockToken !== `${scope.row.account}&${scope.row.loginToken}`"
              @click="mockUser(scope.row)"
            >开始模拟用户</el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-moon"
              v-else
              @click="mockUser(scope.row, false)"
            >退出模拟用户</el-button>
          </template>
        </el-table-column>
      </el-table>
      <p style="height: 10" />
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        :total="filterList.length"
        layout="total, prev, pager, next"
      ></el-pagination>
    </template>
  </d2-container>
</template>

<script>
import { user } from "@api/ratel";
export default {
  data() {
    return {
      type: "list",
      currentPage: 1,
      tableData: [],
      status: "",
      query: "",
      info: {},
      loading: false,
      mockToken: sessionStorage.getItem("mock-user")
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList(page = 0) {
      this.loading = true;
      user.listUsers().then(res => {
        this.loading = false;
        if (res.ok) {
          this.tableData = res.data;
        }
      });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    async mockUser(row, flag = true) {
      if (!flag) {
        sessionStorage.removeItem("mock-user");
      } else {
        let res = await user.queryLoginToken(row.account);
        if (!res.ok) {
          return;
        }
        sessionStorage.setItem("mock-user", `${row.account}&${res.data}`);
      }
      window.location.href = '/';
    }
  },
  computed: {
    filterList() {
      return this.tableData.filter(item =>
        JSON.stringify(Object.values(item))
          .toLowerCase()
          .includes(this.query)
      );
    },
    showList() {
      return this.filterList.slice(
        (this.currentPage - 1) * 10,
        this.currentPage * 10
      );
    }
  }
};
</script>
