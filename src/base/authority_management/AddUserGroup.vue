<template>
  <div id="AddUserGroup">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="form-container">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="95px" size="mini" label-position="right">
        <el-form-item label="用户组名：" class="form-item" prop="user_group_name">
          <el-input v-model="form.uesr_group_name"></el-input>
        </el-form-item>
        <el-form-item label="是否开启：" class="form-item">
          <el-switch v-model="form.open" active-color="#13ce66" inactive-color="#aaa"></el-switch>
        </el-form-item>
        <el-form-item label="关闭原因：" class="form-item" prop="close_info" v-if="!form.open">
          <el-input v-model="form.close_info" type="textarea" :rows="2"></el-input>
          <span class="site-item-info">必须填写，最多50个字符</span>
        </el-form-item>
        <el-form-item label="备注：" class="form-item">
          <el-input v-model="form.remarks" type="textarea" :rows="2"></el-input>
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
/* 添加用户组 */
export default {
  name: "AddUserGroup",
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
          name: "用户组管理",
          url: ""
        },
        {
          name: "添加用户组",
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
        user_group_name: "", //用户名
        remarks: "", //备注
        open: true, //是否开启
        close_info: "" //关闭原因
      },
      //表单验证
      rules: {
        user_group_name: [
          {
            required: true,
            message: "请输入用户组名",
            trigger: "blur"
          },
          {
            min: 1,
            message: "用户组名不能为空",
            trigger: "blur"
          }
        ]
      }
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
