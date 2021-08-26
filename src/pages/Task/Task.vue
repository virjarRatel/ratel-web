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
          <el-button type="primary" size="small" icon="el-icon-upload2" @click="type = 'add'">添加任务</el-button>
        </el-col>
      </el-row>
      <p style="height: 10" />
      <el-table :data="filterList" style="width: 100%" size="small" v-loading="loading">
        <el-table-column label="APP" fixed="left" width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="scope.row.outputOssUrl"
              @click="open(scope.row.outputOssUrl)"
            >
              {{scope.row.appName}}
              <i class="el-icon-download el-icon--right"></i>
            </el-button>
            <span v-else>{{scope.row.appName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="150">
          <template slot-scope="scope">
            <span
              :style="{color: getStatusColor(scope.row.taskStatus)}"
            >{{getStatus(scope.row.taskStatus)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="appPackage" label="包名" width="180"></el-table-column>
        <el-table-column prop="appVersion" label="APP版本" width="120"></el-table-column>
        <el-table-column prop="ratelEngine" label="模式" width="120"></el-table-column>
        <el-table-column prop="ratelVersion" label="引擎版本" width="120"></el-table-column>
        <el-table-column label="允许调试" width="80">
          <template slot-scope="scope">
            <span
              :style="{color: scope.row.addDebugFlag ? '#67c23a' : '#F56C6C'}"
            >{{scope.row.addDebugFlag ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="finishTime" label="最近更新" width="180"></el-table-column>
        <!-- <el-table-column prop="addTime" label="添加时间" width="180"></el-table-column> -->
        <el-table-column align="right" width="380">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              :disabled="!scope.row.logOssUrl"
              @click="read(scope.row)"
            >日志</el-button>
            <el-button type="primary" size="mini" :loading="copyLoading" @click="copy(scope.row)">克隆</el-button>
            <el-button
              type="primary"
              size="mini"
              :loading="reLoading"
              :disabled="!(scope.row.taskStatus == 2 || scope.row.taskStatus == 5)"
              @click="reTask(scope.row)"
            >重试</el-button>
            <el-button
                    type="primary"
                    size="mini"
                    :loading="reLoading"
                    @click="setExportStatus(scope.row)"
            >
         <span :style="{color: scope.row.needExport ? '#F56C6C' : '#67c23a'}">
            {{scope.row.needExport ? '导入' : '导出'}}
               </span>
            </el-button>
            <el-button type="primary" size="mini" @click="type = 'detail';info = scope.row;">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <p style="height: 10" />
    </template>
    <template v-else-if="type == 'add'">
      <Add :goBack="(f) => {type = 'list'; f && getList()}" />
    </template>
    <template v-else-if="type == 'detail'">
      <Detail :goBack="(f) => {type = 'list';}" :info="info" />
    </template>
    <template v-else-if="type == 'log'">
      <Log :goBack="() => {type = 'list'}" :log="log" />
    </template>
  </d2-container>
</template>

<script>
import { task } from "@api/ratel";
import Add from "./Add";
import Detail from "./Detail";
import Log from "./Log";
export default {
  components: { Add, Log, Detail },
  data() {
    return {
      type: "list",
      currentPage: 1,
      totalPage: 1,
      total: 0,
      tableData: [],
      status: "",
      query: "",
      log: {},
      info: {},
      loading: false,
      markLoading: false,
      copyLoading: false,
      reLoading: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    mark(row) {
      this.markLoading = true;
      task.maskTaskBadCase(row.id).then(res => {
        this.markLoading = false;
        if (res.ok) {
          this.$message({
            message: "我们已收到您的标记，后台正在紧急处理",
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
    },
    copy(row) {
      this.copyLoading = true;
      task.cloneTask(row.id).then(res => {
        this.copyLoading = false;
        if (res.ok) {
          this.$message({
            message: "已克隆任务",
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
    },
    setExportStatus(row){
      this.reLoading = true;
      task.exportTask(row.id,!row.needExport).then(res => {
        this.reLoading = false;
        if (res.ok) {
          this.$message({
            message: "设置成功",
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
    },
    reTask(row) {
      this.reLoading = true;
      task.retryFiledTask(row.id).then(res => {
        this.reLoading = false;
        if (res.ok) {
          this.$message({
            message: "已重试任务",
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
    },
    open(url) {
      url && window.open(url);
    },
    read(row) {
      this.log = row;
      this.type = "log";
    },
    getStatus(status) {
      switch (status) {
        case 0:
          return "初始化";
        case 1:
          return "任务执行中";
        case 2:
          return "任务执行失败";
        case 3:
          return "任务执行成功";
        case 4:
          return "APK保存中";
        case 5:
          return "任务被标记为错误APK";
        default:
          return "";
      }
    },
    getStatusColor(status) {
      switch (status) {
        case 0:
        case 1:
        case 4:
          return "inherit";
        case 3:
          return "#67c23a";
        case 2:
        case 5:
          return "#F56C6C";
        default:
          return "";
      }
    },
    getList(showLoading=true) {
      if(showLoading) {
        this.loading = true;
      }
      task.list().then(res => {
        this.loading = false;
        if (res.ok) {
          this.tableData = [...res.data];
          if (this.tableData.find(item => [0, 1, 4].includes(item.taskStatus))) {
            this.timer = setTimeout(() => {
              this.getList(false);
            }, 5000);
          } else {
            this.timer && clearTimeout(this.timer);
          }
        }
      });
    }
  },
  computed: {
    filterList() {
      return this.tableData.filter(item =>
        JSON.stringify(Object.values(item))
          .toLowerCase()
          .includes(this.query)
      );
    }
  },
  beforeDestroy() {
    this.timer && clearTimeout(this.timer);
  }
};
</script>
