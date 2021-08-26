<template>
  <div>
    <template>
      <el-row :gutter="20">
        <el-col :span="24">
          <p>
            <el-button type="text" @click="goBack">
              <i class="el-icon-back" style="font-size: 16px;" />
            </el-button>
            {{log.appName}} 日志
          </p>
          <pre>{{code}}</pre>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
import "codemirror/lib/codemirror.css";
export default {
  props: ["goBack", "log"],
  data() {
    return {
      code: ""
    };
  },
  mounted() {
    this.getLog();
  },
  methods: {
    async getLog() {
      const url = this.log.logOssUrl;
      const response = await fetch(
        url.replace(
          "http://ratel-bin.oss-cn-beijing.aliyuncs.com",
          "/api/ratel/oss-bin"
        ).replace(
          "https://ratel-bin.oss-cn-beijing.aliyuncs.com",
          "/api/ratel/oss-bin"
        )
      );
      const file = await response.blob();
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        this.code = reader.result;
      };
    }
  }
};
</script>

<style lang="scss">
.CodeMirror {
  border: 1px solid #eee;
  height: auto;
}
</style>
