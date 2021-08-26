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
        <el-table-column prop="modulePkgName" label="插件包名" width="240"></el-table-column>
        <el-table-column label="插件版本 / 版本号" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.moduleVersion}} / {{scope.row.moduleVersionCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="certificateId" label="证书 ID" width="280"></el-table-column>
        <el-table-column prop="forRatelApp" label="目标 APK" width="180"></el-table-column>
        <el-table-column prop="ratelGroup" label="模块分组" width="180"></el-table-column>
        <el-table-column prop="uploadTime" label="最近更新时间" width="180"></el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            <p :style="{ display: 'flex', alignItems: 'center' }">
              <span
                :style="{ display: 'block', borderRadius: '4px', width: '8px', height: '8px', marginRight: '4px', background: scope.row.enable ? '#67c23a' : '#F56C6C' }"
              ></span>
              <span :style="{ color: scope.row.enable ? '#67c23a' : '#F56C6C' }">{{scope.row.enable ? '已启用' : '已禁用'}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column align="right" width="160">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              :disabled="!scope.row.ossUrl"
              @click="open(scope.row.ossUrl)"
            >下载</el-button>
            <el-button
              type="danger"
              :loading="enableloading"
              size="mini"
              v-if="scope.row.enable"
              @click="makeDisable(scope, false)"
            >禁用</el-button>
            <el-button
              type="primary"
              :loading="enableloading"
              size="mini"
              v-else
              @click="makeDisable(scope, true)"
            >启用</el-button>
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
  </d2-container>
</template>

<script>
import { hotload } from "@api/ratel";
import Add from "./Add";
export default {
  components: { Add },
  data() {
    return {
      type: "list",
      currentPage: 1,
      tableData: [],
      status: "",
      query: "",
      info: {},
      loading: false,
      enableloading: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      hotload.list().then(res => {
        this.loading = false;
        if (res.ok) {
          this.tableData = res.data;
        }
      });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    open(url) {
      url && window.open(url);
    },
    makeDisable(scope, status) {
      this.enableloading = true;
      hotload.changeStatus(scope.row.id, status).then(res => {
        this.enableloading = false;
        if (res.ok) {
          this.getList();
        }
      }).catch(() => this.enableloading = false);
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
