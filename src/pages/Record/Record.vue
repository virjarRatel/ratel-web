<template>
  <d2-container>
    <template>
      <el-select v-model="status" placeholder="请选择状态过滤" filterable @change="handleStatus">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-table :data="tableData" style="width: 100%" :loading="loading">
        <el-table-column
          prop="rawApkName"
          label="RawApk"
        ></el-table-column>
        <el-table-column
          prop="crackApkName"
          label="CrackApk"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button :disabled="scope.row.status !== 'finished'" @click="handleClick(scope.row)" type="text" size="small">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <p style="height: 10" />
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </template>
  </d2-container>
</template>

<script>
import { TaskList } from '@api/scumall.ratel'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  data () {
    return {
      options: [{
        value: '',
        label: '全部'
      }, {
        value: 'prepared',
        label: 'prepared'
      }, {
        value: 'working',
        label: 'working'
      }, {
        value: 'finished',
        label: 'finished'
      }],
      currentPage: 1,
      totalPage: 1,
      total: 0,
      tableData: [],
      status: '',
      loading: false
    }
  },
  mounted () {
    this.getTaskList()
  },
  methods: {
    getTaskList (page = 0) {
      this.loading = true
      TaskList({
        status: this.status,
        page,
        userId: this.info.uuid
      }).then(res => {
        this.loading = false
        this.tableData = res.data.content
        this.total = res.data.totalElements
        this.totalPage = res.data.totalPages
      })
    },
    handleClick (row) {
      row.mergeApkDownloadUrl && window.open(row.mergeApkDownloadUrl)
    },
    handleCurrentChange (page) {
      this.currentPage = page
      this.getTaskList(page - 1)
    },
    handleStatus (status) {
      this.status = status
      this.currentPage = 1
      this.getTaskList()
    }
  }
}
</script>
