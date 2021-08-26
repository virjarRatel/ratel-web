<template>
  <div>
    <template>
      <el-row :gutter="20">
        <el-col :span="24">
          <p>
            <el-button type="text" @click="goBack" :loading="loading">
              <i class="el-icon-back" style="font-size: 16px;" />
            </el-button>
            {{info.appName}} 详情
          </p>
          <el-button type="primary" size="mini" icon="el-icon-download" v-if="info.ossUrl" @click="open(info.ossUrl)">
            下载
          </el-button>
          <el-divider></el-divider>
          <el-row :gutter="20" class="font">
            <el-col :span="4">包名</el-col>
            <el-col :span="20">{{info.appPackage}}</el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20" class="font">
            <el-col :span="4">文件</el-col>
            <el-col :span="20">{{info.apkFileName}}</el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20" class="font">
            <el-col :span="4">alias</el-col>
            <el-col :span="20">{{info.alias}}</el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20" class="font">
            <el-col :span="4">appVersion</el-col>
            <el-col :span="20">{{info.appVersion}}</el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20" class="font">
            <el-col :span="4">appVersionCode</el-col>
            <el-col :span="20">{{info.appVersionCode}}</el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20" class="font">
            <el-col :span="4">更新时间</el-col>
            <el-col :span="20">{{info.uploadTime}}</el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20" class="font">
            <el-col :span="4">最后使用时间</el-col>
            <el-col :span="20">{{info.lastUsedTime}}</el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20" class="font">
            <el-col :span="4">是否为模块APK</el-col>
            <el-col :span="20">{{info.isXposedModule ? '是' : '否'}}</el-col>
          </el-row>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
export default {
  props: ["goBack", "info"],
  data() {
    return {
      loading: false
    };
  },
  methods: {
    open(url) {
      window.open(url);
    }
  }
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
