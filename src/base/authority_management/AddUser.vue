<template>
  <div id="AddUser">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="form-container">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="108px" size="mini" label-position="right">
        <el-form-item label="名称：" class="form-item">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="昵称：" class="form-item" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="账号：" class="form-item" prop="account">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="登录密码：" class="form-item" prop="passwd">
          <el-input v-model="form.passwd" type="password"></el-input>
          <span class="site-item-info">最少6位，英文与数字或下划线组合</span>
        </el-form-item>
        <el-form-item label="确认密码：" class="form-item" prop="passwdconfirm">
            <el-input type="password" v-model="form.passwdconfirm"></el-input>
        </el-form-item>
        <el-form-item label="用户组：" class="form-item">
          <el-select v-model="form.group_id" clearable size="mini">
            <el-option v-for="item in groupList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门：" class="form-item">
          <el-select v-model="form.department_id" clearable size="mini">
            <!-- <el-option v-for="item in subordinateDepartment" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="管理站点：" class="form-item">
          <el-select v-model="form.site_id" clearable size="mini">
            <el-option v-for="item in siteList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱：" class="form-item" prop="mail">
          <el-input v-model="form.mail"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" class="form-item" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>

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
import Instructions from "@/components/Instructions";

import { addUser } from "@/api/user/user";
import { getSiteList } from "@/api/site_management/SiteList";
import { getUserGroup } from "@/api/group/group";

/* 添加用户 */
export default {
  name: "AddUser",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "权限管理",
          url: ""
        },
        {
          name: "用户管理",
          url: ""
        },
        {
          name: "添加用户",
          url: ""
        }
      ],
      //使用说明
      instructionsInfo: [
        {
          title: "标题1",
          content: "添加站点使用说明"
        },
        {
          title: "标题2",
          content: "添加站点使用说明"
        }
      ],
      //提交按钮loading
      subLoading: false,
      //表单
      form: {
        department_id: 1
      },
      //表单验证
      rules: {
        account: [
          {
            required: true,
            validator: function(rule, value, callback) {
              var reg = /^[0-9a-zA-Z_]{1,12}$/; //1-12位数字字母下划线
              if (!value) {
                callback(new Error("用户名不能为空"));
              } else if (reg.test(value) == false) {
                callback(
                  new Error("用户名必须为数字/字母/下划线,长度不超过12位")
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
              var reg = /^[0-9a-zA-Z_]{6,12}$/; //6-12位数字字母下划线
              if (!value) {
                callback(new Error("密码不能为空"));
              } else if (reg.test(value) == false) {
                callback(
                  new Error("密码必须为数字/字母/下划线,长度6-12位之间")
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
        ],
        nickname: [
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
          { required: false, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            required: false,
            validator: function(rule, value, callback) {
              var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
              if (!value) {
                callback();
              } else if (reg.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },
      //站点列表
      siteList: [],
      //用户组列表
      groupList: []
    };
  },
  components: {
    Crumb,
    Instructions
  },
  mounted: function() {
    //获取站点列表
    this.getSite();
    //获取用户组列表
    this.getGroup();
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 5);
    this.$store.commit("update_system_menu_idx", 5);
  },
  methods: {
    //获取站点列表
    getSite() {
      let data = {
        page: 0
      };
      getSiteList(data).then(res => {
        if (res.data.code == 200 || res.data.code == 404) {
          this.siteList = res.data.data.list;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //获取用户组列表
    getGroup() {
      getUserGroup().then(res => {
        if (res.data.code == 200 || res.data.code == 404) {
          this.groupList = res.data.data.list;
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
          addUser(that.form).then(res => {
            that.subLoading = false;
            if (res.data.code == 200) {
              that.$message.success("添加成功");
              that.$router.push(
                "/pages/system_administrators/System_Administrators/UserList"
              );
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
