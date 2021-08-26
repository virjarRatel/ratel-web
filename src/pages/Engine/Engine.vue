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
          <el-button type="primary" size="small" icon="el-icon-upload2" @click="add = true">添加引擎</el-button>
        </el-col>
      </el-row>
      <p style="height: 10" />
      <el-table :data="filterList" style="width: 100%" size="small" v-loading="loading">
        <el-table-column prop="engineVersion" label="引擎版本号"></el-table-column>
        <el-table-column prop="engineVersionCode" label="Code"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span :style="{color: scope.row.enabled ? '#67c23a' : '#F56C6C'}">{{scope.row.enabled ? '可用' : '不可用'}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              :disabled="scope.row.enabled"
              :loading="enableLoading"
              @click="enabled(scope.row.fileHash)"
            >启用</el-button>
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
import { engine } from "@api/ratel";
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
      enableLoading: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      engine.listLastTen().then(res => {
        this.loading = false;
        if (res.ok) {
          this.tableData = res.data;
        }
      });
    },
    enabled(fileHash) {
      this.enableLoading = true;
      engine.enableEngine(fileHash).then(res => {
        this.enableLoading = false;
        if (res.ok) {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.getList();
        } else {
          this.$message({
            message: res.message,
            type: "error"
          });
        }
      });
    }
  },
  computed: {
    filterList() {
      return this.tableData.filter(item => JSON.stringify(Object.values(item)).toLowerCase().includes(this.query));
    }
  }
};
</script>
