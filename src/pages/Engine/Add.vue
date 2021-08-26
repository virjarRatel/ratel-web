<template>
  <div>
    <template>
      <el-row :gutter="20">
        <el-col :span="24">
          <p>Engine Zip 上传</p>
          <el-upload
            class="upload-demo"
            ref="zip"
            drag
            action="/uploads"
            :limit="1"
            :on-change="changeZip"
            :on-remove="clearZip"
            :auto-upload="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传 zip 文件，文件小于 500m</div>
          </el-upload>
        </el-col>
      </el-row>
      <el-divider v-if="progress > 0" />
      <el-progress
        v-if="progress > 0"
        :text-inside="true"
        :stroke-width="24"
        :percentage="progress"
        :status="progressStatus"
      ></el-progress>
      <el-divider />
      <section>
        <el-button type="danger" size="small" icon="el-icon-close" @click="goBack" :loading="loading">
          返回
        </el-button>
        <el-button type="primary" size="small" icon="el-icon-upload" @click="submit" :loading="loading">
          上传
        </el-button>
      </section>
    </template>
  </div>
</template>

<script>
import { engine } from "@api/ratel";
export default {
  props: ["goBack"],
  data() {
    return {
      zip: null,
      loading: false,
      progress: 0,
      progressStatus: null
    };
  },
  methods: {
    changeZip(file) {
      this.zip = file.raw;
      this.progressStatus = null;
      this.progress = 0;
    },
    clearZip() {
      this.zip = null;
    },
    submit() {
      this.loading = true;
      this.progressStatus = null;
      this.progress = 0;
      const config = {
        onUploadProgress: progressEvent => {
          const complete =
            ((progressEvent.loaded / progressEvent.total) * 100) | 0;
          this.progress = complete;
        }
      };
      engine
        .upload(
          {
            ratelBuilderZip: this.zip
          },
          config
        )
        .then(res => {
          this.loading = false;
          if (res.ok) {
            this.$refs.zip.clearFiles();
            this.progressStatus = "success";
            this.$message({
              message: "上传成功",
              type: "success"
            });
          } else {
            this.progressStatus = "exception";
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        })
        .catch(() => {
          this.progressStatus = "exception";
          this.loading = false;
        });
    }
  }
};
</script>
