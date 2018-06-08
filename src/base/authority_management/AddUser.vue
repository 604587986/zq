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
        <el-form-item label="登录用户名：" class="form-item" prop="user_name">
          <el-input v-model="form.uesr_name"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" class="form-item">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="登录密码：" class="form-item" prop="password">
          <el-input v-model="form.password"></el-input>
          <span class="site-item-info">最少6位，英文与数字或下划线组合</span>
        </el-form-item>
        <el-form-item label="用户组：" class="form-item" prop="user_group">
          <el-select v-model="form.user_group" clearable size="mini">
            <el-option v-for="item in user_group_list" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门：" class="form-item" prop="subordinateDepartmentValue">
          <el-select v-model="form.subordinateDepartmentValue" clearable size="mini">
            <el-option v-for="item in subordinateDepartment" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理站点：" class="form-item" prop="site">
          <el-select v-model="form.site" clearable size="mini">
            <el-option v-for="item in site_list" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否开启：" class="form-item">
          <el-radio-group v-model="form.open">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
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
        user_name: "", //用户名
        name: "", //姓名
        subordinateDepartmentValue: "", //所属部门
        password: "", //密码
        user_group: "", //用户组
        site: "", //管理站点
        remarks: "", //备注
        open: true, //是否开启
        close_info: "" //关闭原因
      },
      //表单验证
      rules: {
        user_name: [
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
        close_info: [
          {
            required: true,
            message: "请输入关闭原因",
            trigger: "blur"
          },
          {
            min: 1,
            max: 50,
            message: "不能超过50个字",
            trigger: "blur"
          }
        ],
        password: [
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
        user_group: [
          {
            required: true,
            message: "请选择用户组",
            trigger: "change"
          }
        ],
        subordinateDepartmentValue: [
          {
            required: true,
            message: "请选择所属部门",
            trigger: "change"
          }
        ],
        site: [
          {
            required: true,
            message: "请选择站点",
            trigger: "change"
          }
        ]
      },
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
      user_group_list: [
        {
          value: 0,
          label: "系统超级管理员"
        },
        {
          value: 1,
          label: "分站管理员"
        },
        {
          value: 2,
          label: "编辑"
        }
      ],
      site_list: []
    };
  },
  components: {
    Crumb,
    Instructions
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 5);
    this.$store.commit("update_system_menu_idx", 5);
  },
  methods: {
    //表单提交
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        that.subLoading = true;
        if (valid) {
          that.subLoading = false;
          that.$message({
            type: "success",
            message: "提交成功!"
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
