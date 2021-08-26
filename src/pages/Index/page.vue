<template>
  <d2-container class="page">
    <el-alert :title="disclaimer" type="error" effect="dark"></el-alert>
    <el-row :gutter="20">
      <el-col :span="12">
        <h3>Ratel Manager</h3>
        <ul>
          <li v-for="item in apks" :key="item.fileHash">
            {{item.appVersion}}
            <el-button type="text" @click="open(item.ossUrl)">
              <i class="el-icon-download el-icon--right"></i>
            </el-button>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <h3>项目文档</h3>
        <ul>
          <li>
            <el-button
              type="text"
              @click="open('http://git.virjar.com/ratel/ratel-doc')"
            >http://git.virjar.com/ratel/ratel-doc</el-button>
          </li>
        </ul>
      </el-col>
    </el-row>
    <h3>专属 QQ 群</h3>
    <el-row :gutter="20">
      <el-col :span="12" v-for="(item, index) in qq" :key="String(index)">
        <img :src="item" style="width: 50%;" />
      </el-col>
    </el-row>
    <h3>您的私密贴心小客服</h3>
    <el-row :gutter="20">
      <el-col :span="12" v-for="(item, index) in girl" :key="String(index)">
        <img :src="item" style="width: 50%;" />
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import { manager } from "@api/ratel";
export default {
  components: {},
  data() {
    return {
      disclaimer: `
        免责声明：
        平头哥所发布的一切破解补丁、注册机和注册信息及软件的解密分析文章仅限用于学习和研究目的；
        不得将上述内容用于商业或者非法用途，否则，一切后果请用户自负。本站信息来自网络，版权争议与本站无关。
        您必须在下载后的24个小时之内，从您的电脑中彻底删除上述内容。如果您喜欢该程序，请支持正版软件，购买注册，得到更好的正版服务。
        如有侵权请邮件与我们联系处理。
        本平台不做：
        微信、QQ等腾讯相关业务；淘宝、支付宝等阿里相关业务；
        以及政府机构、银行金融、通信运营商、论坛贴吧相关的项目！！！
      `,
      apks: [],
      qq: [require("./image/qq.png")],
      girl: [require("./image/haoqq.png"), require("./image/haowechat.png")],
      donate: [
        require("./image/donatewechat.png"),
        require("./image/donatealipay.png")
      ]
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      manager.listLast().then(res => {
        if (res.ok) {
          this.apks = res.data;
        }
      });
    },
    open(url) {
      window.open(url);
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  .page__logo {
    width: 120px;
  }
  .page__btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    margin-top: 0px;
    margin-bottom: 20px;
    span {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
    }
  }
}
</style>
