<template>
  <div id="EditUser">
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
        <el-form-item label="修改密码：" class="form-item">
          <el-switch
            v-model="modify_pwd"
            @change="modify()"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="登录密码：" class="form-item" prop="passwd" v-if="modify_pwd">
          <el-input v-model="form.passwd" type="password"></el-input>
          <span class="site-item-info">最少6位，英文与数字或下划线组合</span>
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
        <el-form-item label="创建时间：" class="form-item">
          <el-input v-model="form.create_time" disabled readonly></el-input>
        </el-form-item>
        <el-form-item label="上一次登录ipv4：" class="form-item">
          <el-input v-model="form.last_ipv4" disabled readonly></el-input>
        </el-form-item>
        <el-form-item label="上一次登陆时间：" class="form-item">
          <el-input v-model="form.last_time" disabled readonly></el-input>
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
import FilePicker from "@/components/FilePicker";

import { editUser } from "@/api/user/user";
import { updateUser } from "@/api/user/user";
import { getSiteList } from "@/api/site_management/SiteList";
import { getUserGroup } from "@/api/group/group";

export default {
  name: "EditUser",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "用户管理",
          url: "/pages/system_administrators/System_Administrators/UserList"
        },
        {
          name: "编辑用户",
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
      modify_pwd: false,
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
                callback(new Error("号码不能为空"));
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
      //提交按钮loading
      subLoading: false,
      //表单
      form: {},
      //所属类别
      category: [
        {
          value: 0,
          label: "机关部门"
        },
        {
          value: 1,
          label: "教辅与研创单位"
        },
        {
          value: 2,
          label: "教学单位"
        },
        {
          value: 3,
          label: "其他"
        }
      ],
      //所属部门
      subordinateDepartment: [
        {
          value: 0,
          label: "党员办"
        },
        {
          value: 1,
          label: "组织人事"
        },
        {
          value: 2,
          label: "纪监审办公室"
        },
        {
          value: 3,
          label: "宣传部"
        },
        {
          value: 4,
          label: "研究生工作部"
        },
        {
          value: 5,
          label: "学生工作部"
        },
        {
          value: 6,
          label: "网络中心"
        },
        {
          value: 7,
          label: "教务处"
        },
        {
          value: 8,
          label: "招生办公室"
        },
        {
          value: 9,
          label: "科研创作处"
        },
        {
          value: 10,
          label: "外事处"
        },
        {
          value: 11,
          label: "计划财务处"
        },
        {
          value: 12,
          label: "校园建设和管理处"
        },
        {
          value: 13,
          label: "工会"
        },
        {
          value: 14,
          label: "保卫处"
        }
      ],
      //站点列表
      siteList: [],
      //用户组列表
      groupList: []
    };
  },
  components: {
    Crumb,
    Instructions,
    FilePicker
  },
  mounted: function() {
    //获取用户信息
    this.getData();
    //获取站点列表
    this.getSite();
    //获取用户组列表
    this.getGroup();
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 5);
    this.$store.commit("update_system_menu_idx", 5);
  },
  methods: {
    //获取用户信息
    getData() {
      let data = { id: this.$route.query.id };
      editUser(data).then(res => {
        this.modify_pwd = false;
        if (res.data.code == 200) {
          this.form = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
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
          updateUser(that.form).then(res => {
            that.subLoading = false;
            if (res.data.code == 200) {
              that.$message.success("修改成功");
              that.$router.push('/pages/system_administrators/System_Administrators/UserList')
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
    modify(val) {
      if (!val) {
        delete this.form.passwd;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
