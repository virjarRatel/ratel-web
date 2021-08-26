<template>
  <d2-container>
    <template v-if="type == 'list'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input placeholder="请输入内容" size="small" v-model="query" class="input-with-select">
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
          <el-button type="primary" size="small" icon="el-icon-upload2" @click="type = 'add'">上传 APK</el-button>
        </el-col>
      </el-row>
      <p style="height: 10" />
      <el-table :data="showList" size="small" style="width: 100%" v-loading="loading">
        <el-table-column prop="apkFileName" label="文件名"></el-table-column>
        <el-table-column prop="appPackage" label="包名"></el-table-column>
        <el-table-column prop="appVersion" label="版本号"></el-table-column>
        <el-table-column prop="lastUsedTime" label="最近使用时间" width="180"></el-table-column>
        <el-table-column align="right" width="160">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" :disabled="!scope.row.ossUrl" @click="open(scope.row.ossUrl)">下载</el-button>
            <el-button type="primary" size="mini" @click="type = 'detail';info = scope.row;">详情</el-button>
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
    <template v-else-if="type == 'add'">
      <Add :goBack="(f) => {type = 'list'; f && getList()}" />
    </template>
    <template v-else-if="type == 'detail'">
      <Detail :goBack="(f) => {type = 'list';}" :info="info" />
    </template>
  </d2-container>
</template>

<script>
import { apk } from "@api/ratel";
import Add from "./Add";
import Detail from "./Detail";
export default {
  components: { Add, Detail },
  data() {
    return {
      type: "list",
      currentPage: 1,
      tableData: [],
      status: "",
      query: "",
      info: {},
      loading: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      apk.listApks("", "").then(res => {
        this.loading = false;
        if (res.ok) {
          this.tableData = res.data.content;
        }
      });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    open(url) {
      url && window.open(url);
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
