<template>
  <div id="EditMember">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>

    <!-- Form -->
    <div class="form-container">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="108px" size="mini" label-position="right">
        <el-form-item label="账号：" class="form-item" prop="account">
            <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="昵称：" class="form-item" prop="title">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" class="form-item" prop="mail">
            <el-input v-model="form.mail"></el-input>
        </el-form-item>
        <el-form-item label="手机：" class="form-item" prop="mobile">
            <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="创建时间：" class="form-item">
            <el-input v-model="form.create_time" disabled></el-input>
        </el-form-item>
        <el-form-item label="最近一次登录ip：" class="form-item">
            <el-input v-model="form.last_ipv4" disabled></el-input>
        </el-form-item>
        <el-form-item label="最近一次登录时间：" class="form-item">
            <el-input v-model="form.last_time" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="登录密码：" class="form-item" prop="passwd">
            <el-input type="password" v-model="form.passwd"></el-input>
            <span class="site-item-info">6~15位，英文与数字或下划线组合</span>
        </el-form-item>
        <el-form-item label="确认密码：" class="form-item" prop="comfirmPasswd">
            <el-input type="password" v-model="form.comfirmPasswd"></el-input>
        </el-form-item> -->
        <el-form-item class="form-control-btn">
            <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";

import {editMember,saveMember} from "@/api/member/member"
export default {
  name: "EditMember",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "会员列表",
          url: "/pages/editor/editor/member_list"
        },
        {
          name: "编辑会员",
          url: ""
        }
      ],

      //提交按钮loading
      subLoading: false,
      //表单
      form: {},
      // 表单验证
      rules: {
        account: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 1,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          },
          {
            min: 1,
            message: "昵称不能为空",
            trigger: "blur"
          }
        ],
        mail: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur"]
          }
        ],
        mobile:[
          {
            required: true,
            validator: function(rule, value, callback) {
              var reg = /0?(13|14|15|17|18|19)[0-9]{9}/;
              if (!value) {
                callback(new Error("手机不能为空"));
              } else if (reg.test(value) == false) {
                callback(
                  new Error("请输入正确的手机号码格式")
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
        comfirmPasswd: [
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
    };
  },
  components: {
    Crumb,
  },
  mounted: function() {
    //获取默认数据
    this.getData();
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 1);
    this.$store.commit("update_system_menu_idx", 1);
  },
  methods: {
    //获取数据
    getData() {
      let data = { id: this.$route.query.id };
      editMember(data).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //表单提交
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        that.subLoading = true;
        if (valid) {
          saveMember(that.form).then(res => {
            that.subLoading = false;
            if (res.data.code == 200) {
              that.$message.success("修改成功");
              that.getData();
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
