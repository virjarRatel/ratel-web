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

          <div v-if="info.outputOssUrl" >

            <el-row :gutter="24">
              <el-col :span="2">
                <el-button type="primary" size="mini" icon="el-icon-download"  @click="open(info.outputOssUrl)">
                  下载
                </el-button>
              </el-col>
              <el-col :span="10">
                <img :src="genQRIUrl()" style="width: 50%;" />
              </el-col>
            </el-row>

          </div>

          <el-row :gutter="20" class="font">
            <el-col :span="3">包名</el-col>
            <el-col :span="7">{{info.appPackage}}</el-col>
            <el-col :span="3">模式</el-col>
            <el-col :span="7">{{info.ratelEngine}}</el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20" class="font">
            <el-col :span="3">APP版本</el-col>
            <el-col :span="7">{{info.appVersion}}</el-col>
            <el-col :span="3">APP版本 Code</el-col>
            <el-col :span="7">{{info.appVersionCode}}</el-col>
          </el-row>

          <el-divider></el-divider>
          <el-row :gutter="20" class="font">
            <el-col :span="3">允许调试</el-col>
            <el-col :span="7">{{info.addDebugFlag ? '是' : '否'}}</el-col>
            <el-col :span="3">引擎版本</el-col>
            <el-col :span="7">{{info.ratelVersion}}</el-col>
          </el-row>

          <el-divider></el-divider>
          <el-row :gutter="20" class="font">
            <el-col :span="3">添加时间</el-col>
            <el-col :span="7">{{info.addTime}}</el-col>
            <el-col :span="3">完成时间</el-col>
            <el-col :span="7">{{info.finishTime}}</el-col>
          </el-row>

          <el-divider v-if="info.xposedModuleApkId"></el-divider>
          <el-row v-if="info.xposedModuleApkId" :gutter="20" class="font">
            <el-col :span="4">插件</el-col>
            <el-col :span="20">{{info.xposedModuleApkId}}</el-col>
          </el-row>
          <el-divider v-if="info.extParam"></el-divider>
          <el-row v-if="info.extParam" :gutter="20" class="font">
            <el-col :span="4">扩展参数</el-col>
            <el-col :span="20">
              <pre style="margin: 0">{{info.extParam.replace(/ /g, '\n')}}</pre>
            </el-col>
          </el-row>


          <el-divider></el-divider>
          <el-row :gutter="20" class="font">
            <el-col :span="4">备注</el-col>
            <el-col :span="20">{{info.comment}}</el-col>
          </el-row>
          <el-row :gutter="20" class="font">
            <el-col :span="4">下载链接</el-col>
            <el-col :span="20">{{info.outputOssUrl}}</el-col>
          </el-row>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
  import { renderUrl } from "@api/methods";
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
    },
    genQRIUrl(){
      return  renderUrl(`/api/ratel/task/taskRRI?taskId=${this.info.id}`)
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
