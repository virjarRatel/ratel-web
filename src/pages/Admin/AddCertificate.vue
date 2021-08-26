<template>
  <d2-container>
    <template>
      <el-row :gutter="20">
        <el-col :span="12">
          <p>生成证书</p>
          <el-divider />
          <el-row type="flex" align="middle">
            <el-col :span="6">
              <label>用户名</label>
            </el-col>
            <el-col :span="18">
              <el-input placeholder="输入用户" size="small" v-model="account"></el-input>
            </el-col>
          </el-row>
          <el-divider />
          <el-row type="flex" align="middle">
            <el-col :span="6">
              <label>过期时间</label>
            </el-col>
            <el-col :span="18">
              <el-date-picker
                size="small"
                v-model="expireDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择过期时间"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-row>
          <el-divider />
          <el-row type="flex" align="middle">
            <el-col :span="6">
              <label>限定包名</label>
            </el-col>
            <el-col :span="18">
              <el-row
                v-for="(item, index) in packageList"
                :key="item"
                type="flex"
                align="middle"
                style="margin-bottom: 10px"
              >
                <el-col :span="18">
                  <span>{{item}}</span>
                </el-col>
                <el-col :span="6" style="text-align: right;">
                  <el-button
                    type="danger"
                    size="small"
                    icon="el-icon-minus"
                    circle
                    @click="() => remove('package', index)"
                  ></el-button>
                </el-col>
              </el-row>
              <el-row type="flex" align="middle">
                <el-col :span="18">
                  <el-input placeholder="输入限定包名(点击 + 生效)" size="small" v-model="package"></el-input>
                </el-col>
                <el-col :span="6" style="text-align: right;">
                  <el-button
                    type="success"
                    size="small"
                    icon="el-icon-plus"
                    circle
                    @click="() => save('package')"
                  ></el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-divider />
          <el-row type="flex" align="middle">
            <el-col :span="6">
              <label>限定设备号</label>
            </el-col>
            <el-col :span="18">
              <el-row
                v-for="(item, index) in deviceList"
                :key="item"
                type="flex"
                align="middle"
                style="margin-bottom: 10px"
              >
                <el-col :span="18">
                  <span>{{item}}</span>
                </el-col>
                <el-col :span="6" style="text-align: right;">
                  <el-button
                    type="danger"
                    size="small"
                    icon="el-icon-minus"
                    circle
                    @click="() => remove('device', index)"
                  ></el-button>
                </el-col>
              </el-row>
              <el-row type="flex" align="middle">
                <el-col :span="18">
                  <el-input placeholder="输入限定设备号(点击 + 生效)" size="small" v-model="device"></el-input>
                </el-col>
                <el-col :span="6" style="text-align: right;">
                  <el-button
                    type="success"
                    size="small"
                    icon="el-icon-plus"
                    circle
                    @click="() => save('device')"
                  ></el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-divider />
          <section>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="clear"
              :loading="loading"
            >清空</el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-check"
              @click="submit"
              :loading="loading"
            >{{this.certificateContent ? '升级证书' : '创建证书'}}</el-button>
          </section>
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <p>已生成{{licenceId ? `（证书 ID: ${licenceId}）` : ''}}</p>
          <el-input
            type="textarea"
            :rows="15"
            placeholder="请输入内容"
            v-model="certificateContent"
            @input="changeContent"
          ></el-input>
        </el-col>
      </el-row>
    </template>
  </d2-container>
</template>

<script>
import { shell } from "@api/ratel";

Date.prototype.format = function (fmt) {
  const o = {
    "M+": this.getMonth() + 1,               //月份 
    "d+": this.getDate(),                    //日 
    "h+": this.getHours(),                   //小时 
    "m+": this.getMinutes(),                 //分 
    "s+": this.getSeconds(),                 //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

export default {
  data() {
    return {
      account: "",
      expireDate: "",
      certificateContent: "",
      device: "",
      deviceList: [],
      package: "",
      licenceId: "",
      packageList: [],
      loading: false
    };
  },
  methods: {
    submit() {
      this.loading = true;
      let data = {
        account: this.account,
        expireDate: this.expireDate,
        deviceList: this.deviceList,
        packageList: this.packageList
      };
      let pms = null;
      if (this.certificateContent) {
        data.certificateContent = this.certificateContent;
        pms = shell.upgrade(data);
      } else {
        pms = shell.create(data);
      }

      pms
        .then(res => {
          this.loading = false;
          if (res.ok) {
            this.$message({
              message: "新证书已生成",
              type: "success"
            });
            this.certificateContent = res.data;
            this.changeContent(this.certificateContent);
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
    },
    clear() {
      this.account = "";
      this.expireDate = "";
      this.device = "";
      this.deviceList = [];
      this.package = "";
      this.packageList = [];
      this.certificateContent = "";
      this.licenceId = "";
    },
    remove(key, index) {
      if (key === "package") {
        this.packageList.splice(index, 1);
      } else if (key === "device") {
        this.deviceList.splice(index, 1);
      }
    },
    save(key) {
      if (key === "package") {
        if (this.packageList.includes(this.package)) {
          return this.$message({
            message: "包名已存在",
            type: "error"
          });
        }
        this.packageList.push(this.package);
        this.package = "";
      } else if (key === "device") {
        if (this.deviceList.includes(this.device)) {
          return this.$message({
            message: "设备号已存在",
            type: "error"
          });
        }
        this.deviceList.push(this.device);
        this.device = "";
      }
    },
    changeContent(text) {
      if (text.length < 300) return;
      shell
        .detail({ certificateContent: text })
        .then(res => {
          if (res.ok) {
            this.licenceId = res.data.licenceId;
            this.account = res.data.account;
            this.expireDate = new Date(res.data.expire).format('yyyy-MM-dd');
            this.deviceList = res.data.deviceList;
            this.packageList = res.data.packageList;
          }
        });
    }
  }
};
</script>
