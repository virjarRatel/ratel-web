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
          <el-button type="primary" size="small" icon="el-icon-upload2" @click="type = 'add'">添加证书</el-button>
        </el-col>
      </el-row>
      <p style="height: 10" />
      <el-table :data="showList" size="small" style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="extra" label="信息"></el-table-column>
        <el-table-column prop="licenceVersion" label="版本号"></el-table-column>
        <el-table-column label="过期时间">
          <template slot-scope="scope">
            <span>{{scope.row.expire | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="可授权APP">
          <template slot-scope="scope">
            <span>{{scope.row.packageList.length > 0 ? `${scope.row.packageList.length}个` : '无限制'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="允许设备">
          <template slot-scope="scope">
            <span>{{scope.row.deviceList.length > 0 ? `${scope.row.deviceList.length}个` : '无限制'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" width="80">
          <template slot-scope="scope">
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
import { certificate } from "@api/ratel";
import { formatDate } from "./utils";
import Add from "./Add";
import Detail from "./Detail";
export default {
  components: { Add, Detail },
  data() {
    return {
      type: "list",
      currentPage: 1,
      query: "",
      tableData: [],
      status: "",
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
      certificate.listCertificate().then(res => {
        this.loading = false;
        if (res.ok) {
          this.tableData = res.data.content;
        }
      });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
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
