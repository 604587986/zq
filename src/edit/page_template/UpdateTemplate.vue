<template>
  <div id="UpdateTemplate">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="form-container">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="125px" size="mini" label-position="right">
        <el-form-item label="模板名称：" class="form-item" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="分类：" class="form-item" prop="type">
          <el-select v-model="form.type" clearable placeholder="所属分类" size="mini">
            <el-option v-for="item in type_list" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代码：" class="form-item">
          <el-input v-model="form.code" type="textarea" :rows="15"></el-input>
        </el-form-item>
        <el-form-item label="模板说明：" class="form-item">
          <el-input v-model="form.intr" type="textarea" :rows="4"></el-input>
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

export default {
  name: "UpdateTemplate",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "添加模板",
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
        title: "大学典雅蓝风格",
        type: "首页",
        code:'html',
        intr:'无'
      },
      type_list:['首页','单页'],
      //表单验证
      rules: {}
    };
  },
  components: {
    Crumb,
    Instructions
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 4);
    this.$store.commit("update_system_menu_idx", 4);
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
