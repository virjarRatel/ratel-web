<template>
  <d2-container>
    <template v-if="!add">
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
          <el-button type="primary" size="small" icon="el-icon-upload2" @click="add = true">添加管理员 APK</el-button>
        </el-col>
      </el-row>
      <p style="height: 10" />
      <el-table :data="filterList" style="width: 100%" size="small" v-loading="loading">
        <el-table-column prop="appVersion" label="版本号"></el-table-column>
        <el-table-column prop="appVersionCode" label="Code"></el-table-column>
        <el-table-column prop="fileHash" label="Hash"></el-table-column>
        <el-table-column align="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              :disabled="scope.row.ossUrl"
              @click="open(scope.row.ossUrl)"
            >下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-else>
      <Add :goBack="(f) => {add = false; f && getList()}" />
    </template>
  </d2-container>
</template>

<script>
import { manager } from "@api/ratel";
import Add from "./Add";
export default {
  components: { Add },
  data() {
    return {
      add: false,
      currentPage: 1,
      totalPage: 1,
      total: 0,
      tableData: [],
      status: "",
      query: '',
      loading: false,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      manager.listLast().then(res => {
        this.loading = false;
        if (res.ok) {
          this.tableData = res.data;
        }
      });
    },
    open(url) {
      url && window.open(url);
    }
  },
  computed: {
    filterList() {
      return this.tableData.filter(item => JSON.stringify(Object.values(item)).toLowerCase().includes(this.query));
    }
  }
};
</script>
