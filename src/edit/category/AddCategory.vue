<template>
  <div id="AddCategory">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="form-container">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="150px" size="mini" label-position="right">
        <el-form-item label="标题:">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="SEO名称:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="列表页模板路径:">
          <el-input v-model="form.index_tpl"></el-input>
        </el-form-item>
        <el-form-item label="列表页模板ID:">
          <el-input v-model="form.index_tpl_id"></el-input>
        </el-form-item>
        <el-form-item label="列表页文件命名规则:">
          <el-input v-model="form.index_pattern"></el-input>
        </el-form-item>
        <el-form-item label="内容页模板路径:">
          <el-input v-model="form.content_tpl"></el-input>
        </el-form-item>
        <el-form-item label="内容模板ID:">
          <el-input v-model="form.content_tpl_id"></el-input>
        </el-form-item>
        <el-form-item label="内容页文件命名规则:">
          <el-input v-model="form.content_pattern"></el-input>
        </el-form-item>
        <el-form-item label="列表数量:">
          <el-input-number v-model="form.page_size" :min="5" :max="100"></el-input-number>
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

import { toAddCategory } from "@/api/category/category";

/* 添加站点 */
export default {
  name: "AddCategory",
  data() {
    return {
      haha: "",
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "分类列表",
          url: "/pages/editor/editor/category_list"
        },
        {
          name: "添加分类",
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
        parent_id: 0
      },
      //表单验证
      rules: {
        title: [
          {
            required: true,
            message: "请输入站点名称",
            trigger: "blur"
          },
          {
            min: 1,
            message: "站点名称不能为空",
            trigger: "blur"
          }
        ],
        alias: [
          {
            required: true,
            message: "请输入别名",
            trigger: "blur"
          },
          {
            min: 1,
            message: "别名不能为空",
            trigger: "blur"
          }
        ],
        state: [
          {
            required: true,
            message: "请选择站点状态",
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
        sort: [
          {
            required: true,
            validator: function(rule, value, callback) {
              if (!Number.isInteger(value)) {
                callback(new Error("请输入数字值"));
              } else {
                callback();
              }
            },
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
    sessionStorage.setItem("system_menu_idx", 1);
    this.$store.commit("update_system_menu_idx", 1);
  },
  methods: {
    //表单提交
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        that.subLoading = true;
        if (valid) {
          toAddCategory(that.form).then(res => {
            that.subLoading = false;
            if (res.data.code == 200) {
              that.$message.success("添加成功");
              that.$router.push('/pages/editor/editor/column_list')
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
