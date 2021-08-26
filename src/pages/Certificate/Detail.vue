<template>
  <div>
    <template>
      <el-row :gutter="20">
        <el-col :span="24">
          <p>
            <el-button type="text" @click="goBack" :loading="loading">
              <i class="el-icon-back" style="font-size: 16px;" />
            </el-button>
            {{info.extra}} 详情
          </p>
          <el-row :gutter="20" class="font">
            <el-col :span="4">所属账号</el-col>
            <el-col :span="20">{{info.account}}</el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20" class="font">
            <el-col :span="4">证书 ID</el-col>
            <el-col :span="20">{{info.licenceId}}</el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20" class="font">
            <el-col :span="4">payload</el-col>
            <el-col :span="20">{{info.payload}}</el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20" class="font">
            <el-col :span="4">证书版本</el-col>
            <el-col :span="20">{{info.licenceVersion}}</el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20" class="font">
            <el-col :span="4">证书过期时间</el-col>
            <el-col :span="20">{{info.expire | formatDate}}</el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20" class="font">
            <el-col :span="4">可授权APP</el-col>
            <el-col :span="20" v-if="info.packageList.length > 0">
                <ul>
                    <li v-for="i in info.packageList" :key="i">{{i}}</li>
                </ul>
            </el-col>
            <el-col :span="20" v-else>无限制</el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20" class="font">
            <el-col :span="4">允许设备</el-col>
            <el-col :span="20" v-if="info.deviceList.length > 0">
                <ul>
                    <li v-for="i in info.deviceList" :key="i">{{i}}</li>
                </ul>
            </el-col>
            <el-col :span="20" v-else>无限制</el-col>
          </el-row>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
import { formatDate } from "./utils";
export default {
  props: ["goBack", "info"],
  data() {
    return {
      loading: false
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
};
</script>

<style lang="scss">
    .font {
        color: #606266;
        line-height: 23px;
        font-size: 12px;
        word-break: break-all;
    }
</style>
