<template>
  <div>
    <template>
      <el-row :gutter="20">
        <el-col :span="24">
          <p>新建任务</p>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="待感染app" prop="originApkFileHash" required>
              <el-select
                v-model="ruleForm.originApkFileHash"
                size="small"
                style="width: 300px"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in apks.filter((item) => !item.isXposedModule)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模块插件app" prop="xposedModuleApkFileHash">
              <el-select
                v-model="ruleForm.xposedModuleApkFileHash"
                size="small"
                style="width: 300px"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in apks.filter((item) => item.isXposedModule)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证书" prop="certificateId" required>
              <el-select
                v-model="ruleForm.certificateId"
                size="small"
                style="width: 300px"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in certificates"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="扩展参数" prop="extParam">
              <el-input
                v-model="ruleForm.extParam"
                placeholder="请填写"
                size="small"
                style="width: 300px"
              ></el-input>
            </el-form-item>
            <el-form-item label="引擎" prop="ratelEngine">
              <el-select
                v-model="ruleForm.ratelEngine"
                size="small"
                style="width: 300px"
                filterable
                placeholder="请选择"
              >
                <el-option label="appendDex" value="appendDex"></el-option>
                <el-option label="rebuildDex" value="rebuildDex"></el-option>
                <el-option label="shell" value="shell"></el-option>
                <el-option label="zelda" value="zelda"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="允许调试" prop="addDebugFlag">
              <el-radio v-model="ruleForm.addDebugFlag" label="1">允许</el-radio>
              <el-radio v-model="ruleForm.addDebugFlag" label="0">禁用</el-radio>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-cpu"
                :loading="loading"
                @click="submitForm('ruleForm')"
              >立即创建</el-button>
              <el-button size="small" icon="el-icon-refresh-left" @click="resetForm('ruleForm')">重置</el-button>
              <el-button type="danger" size="small" icon="el-icon-close" @click="goBack">返回</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
import { certificate, task, apk } from "@api/ratel";
export default {
  props: ["goBack"],
  data() {
    return {
      loading: false,
      textarea: "",
      apks: [],
      certificates: [],
      originApkFileHash: "",
      certificateId: "",
      ruleForm: {
        originApkFileHash: "",
        xposedModuleApkFileHash: "",
        certificateId: "",
        addDebugFlag: "0",
        extParam: "",
        ratelEngine: ""
      },
      rules: {
        originApkFileHash: [
          { required: true, message: "请选择待感染app", trigger: "change" }
        ],
        certificateId: [
          { required: true, message: "请选择证书", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    this.getAll();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submit();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getAll() {
      apk.listApks("", "").then(res => {
        if (res.ok) {
          let list = [];
          res.data.content.map(item => {
            list.push({
              value: item.fileHash,
              label: item.apkFileName,
              isXposedModule: item.isXposedModule
            });
          });
          this.apks = list;
        }
      });
      certificate.listCertificate().then(res => {
        if (res.ok) {
          let list = [];
          res.data.content.map(item => {
            list.push({
                value: item.id,
                label: item.account + '_' + item.id
            });
          });
          this.certificates = list;
        }
      });
    },
    submit() {
      this.loading = true;
      task
        .create({
          originApkFileHash: this.ruleForm.originApkFileHash,
          xposedModuleApkFileHash: this.ruleForm.xposedModuleApkFileHash,
          certificateId: this.ruleForm.certificateId,
          extParam: this.ruleForm.extParam,
          addDebugFlag: this.ruleForm.addDebugFlag === '1' ? true : false,
          ratelEngine: this.ruleForm.ratelEngine
        })
        .then(res => {
          this.loading = false;
          if (res.ok) {
            this.$message({
              message: "新增成功",
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
