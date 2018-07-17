<template>
  <div id="Header">
    <div class="header-container">
      <div class="float-left header-left">
        <p class="site float-left" v-if="site_title">
          <span class="float-left">所属站点：</span>
          <span class="float-left">{{site_title}}</span>
        </p>
        <p class="reception float-left">
          <a :href="'//'+$store.state.domain" class="underline-hover" target="_blank">前台首页</a>
        </p>
      </div>
      <div class="float-right header-right" v-if="user">
        <div class="user float-left">
          <i class="iconfont icon-user float-left"></i>
          <span class="float-left header-name">欢迎您，{{user}}</span>
        </div>
        <div class="control-box float-left">
          <a href="javascript:void(0);" class="underline-hover float-left" @click="dialogVisible = true">修改密码</a>
          <i class="iconfont icon-shuxian float-left"></i>
          <a href="javascript:void(0);" class="underline-hover float-left" @click="clear_local()">退出</a>
        </div>
      </div>
      <div class="float-right header-right" v-else>
          <router-link to="/pages/admin/Login">
            <div class="user float-left">
              <i class="iconfont icon-user float-left"></i>
              <span class="float-left header-name">登录</span>
            </div>
        </router-link>
      </div>
    </div>
    <!-- 修改密码弹出框 -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="108px" size="mini" label-position="right">
        <el-form-item label="原密码：" class="form-item" prop="oldpasswd">
            <el-input type="password" v-model="form.oldpasswd"></el-input>
        </el-form-item>
        <el-form-item label="登录密码：" class="form-item" prop="passwd">
            <el-input type="password" v-model="form.passwd"></el-input>
            <span class="site-item-info">6~15位，英文与数字或下划线组合</span>
        </el-form-item>
        <el-form-item label="确认密码：" class="form-item" prop="passwdconfirm">
            <el-input type="password" v-model="form.passwdconfirm"></el-input>
        </el-form-item>
        <el-form-item class="form-control-btn">
            <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">提交</el-button>
        </el-form-item>
    </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { toLogout } from "@/api/login/login.js";
import { init } from "@/api/login/login";
import { modifyPasswd } from "@/api/user/user";

export default {
  name: "Header",
  data() {
    return {
      user: "",
      site_title: "",
      // 表单验证
      rules: {
        oldpasswd: [
          {
            required: true,
            validator: function(rule, value, callback) {
              var reg = /^[0-9a-zA-Z_]{6,15}$/; //6-15位数字字母下划线
              if (!value) {
                callback(new Error("密码不能为空"));
              } else if (reg.test(value) == false) {
                callback(
                  new Error("密码必须为数字/字母/下划线,长度6-15位之间")
                );
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        passwd: [
          {
            required: true,
            validator: function(rule, value, callback) {
              var reg = /^[0-9a-zA-Z_]{6,15}$/; //6-15位数字字母下划线
              if (!value) {
                callback(new Error("密码不能为空"));
              } else if (reg.test(value) == false) {
                callback(
                  new Error("密码必须为数字/字母/下划线,长度6-15位之间")
                );
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        passwdconfirm: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.form.passwd) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },
      form:{},
      dialogVisible:false,
      subLoading:false
    };
  },
  mounted: function() {
    // this.user = JSON.parse(localStorage.getItem("userInfo")).nickname;
    this.init();
  },
  methods: {
    clear_local() {
      toLogout().then(res => {
        if (res.data.code == 200) {
          localStorage.removeItem("userInfo"); //退出登录清除登录信息
          localStorage.removeItem("group"); //退出登录清除登录信息
          localStorage.removeItem("isEditor"); //退出登录清除登录信息
          localStorage.removeItem("entryList"); //退出登录清除登录信息
          localStorage.removeItem("mockUser"); //退出登录清除登录信息
          sessionStorage.setItem("system_menu_idx", 0);
          this.$router.push({ path: "/pages/admin/Login" });
        }
      });
    },
    // 登录初始化
    init() {
      init().then(res => {
        if (res.data.code == 200) {
          if (res.data.data.site) {
            this.site_title = res.data.data.site.title;
            this.$store.commit("set_domain", res.data.data.site.domain);
          }
          this.user = res.data.data.user.nickname;
        }
      });
    },
    //修改密码
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        that.subLoading = true;
        if (valid) {
          // let data = {
          //   oldpasswd:that.form.oldpasswd,
          //   passwd:that.form.passwd
          // }
          modifyPasswd(that.form).then(res => {
            that.subLoading = false;
            if (res.data.code == 200) {
              that.$message.success("修改成功");
              that.$refs[formName].resetFields();
              that.dialogVisible = false;
            } else {
              that.$message.error(res.data.message);
            }
          });
        } else {
          that.subLoading = false;
          that.$message.error("提交失败!");
          return false;
        }
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../assets/css/less_config";
#Header {
  width: 100%;
  min-width: 1190px;
  background: @base-color;
  .header-container {
    width: 1190px;
    height: 36px;
    margin: 0 auto;
    &::after {
      content: "";
      display: block;
      visibility: hidden;
      clear: both;
    }
    .header-left {
      .site {
        span {
          display: block;
          font-size: 14px;
          color: #fff;
          line-height: 36px;
        }
      }
      .reception {
        margin-left: 50px;
        a {
          display: block;
          line-height: 36px;
          font-size: 14px;
          color: #fff;
          transition: all 0.3s;
          &:hover {
            color: @text-hover;
          }
        }
        .underline-hover:before {
          bottom: 8px;
        }
      }
    }
    .header-right {
      .user {
        float: left;
        .icon-user {
          color: #fff;
          line-height: 36px;
        }
        span {
          display: block;
          font-size: 14px;
          color: #fff;
          line-height: 36px;
          margin-left: 10px;
        }
      }
      .control-box {
        float: left;
        margin-left: 30px;
        a {
          font-size: 14px;
          line-height: 36px;
          color: #fff;
          transition: all 0.3s;
          &:hover {
            color: @text-hover;
          }
        }
        .underline-hover:before {
          bottom: 8px;
        }
        .icon-shuxian {
          line-height: 36px;
          font-size: 14px;
          color: #fff;
        }
      }
    }
  }
}
</style>
