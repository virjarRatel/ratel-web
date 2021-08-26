<template>
  <div>
    <template>
      <el-row :gutter="20">
        <el-col :span="24">
          <p>新增证书</p>
          <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="textarea" maxlength="5000" show-word-limit></el-input>
        </el-col>
      </el-row>
      <section style="margin-top: 20px;">
        <el-button type="danger" size="small" icon="el-icon-close" @click="goBack" :loading="loading">
          返回
        </el-button>
        <el-button type="primary" size="small" icon="el-icon-finished" @click="submit" :loading="loading">
          添加
        </el-button>
      </section>
    </template>
  </div>
</template>

<script>
import { certificate } from "@api/ratel";
export default {
  props: ["goBack"],
  data() {
    return {
      loading: false,
      textarea: ""
    };
  },
  methods: {
    submit() {
      this.loading = true;
      certificate
        .importCertificate({
          certificateContent: this.textarea
        })
        .then(res => {
          this.loading = false;
          if (res.ok) {
            this.$message({
              message: "上传成功",
              type: "success"
            });
            this.goBack(true);
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>
