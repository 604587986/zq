<template>
  <div id="EditArticle">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="form-container">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="150px" size="mini" label-position="right">
        <el-form-item label="文章标题：">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="分类：">
          <el-select v-model="form.category_id" placeholder="分类" size="mini" >
              <el-option v-for="item in categoryList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者:">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="摄影:">
          <el-input v-model="form.photo"></el-input>
        </el-form-item>
        <el-form-item label="文章配图:">
          <file-picker v-model="form.image_id"></file-picker>
        </el-form-item>
        <el-form-item label="文章状态:">
          <el-select v-model="form.state" placeholder="状态" size="mini" disabled>
              <el-option label="删除" :value="-1"></el-option>
              <el-option label="草稿" :value="0"></el-option>
              <el-option label="正常" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态:">
          <el-select v-model="form.state_verify" placeholder="状态" size="mini" disabled>
              <el-option label="驳回" :value="-1"></el-option>
              <el-option label="待审核" :value="0"></el-option>
              <el-option label="通过" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间:">
          <el-input v-model="form.create_time" disabled></el-input>
        </el-form-item>
        <el-form-item label="更新时间:">
          <el-input v-model="form.update_time" disabled></el-input>
        </el-form-item>
        <el-form-item label="文章标签:">
          <tag @change="getTags"></tag>
        </el-form-item>
        <el-form-item label="文章内容:">
            <tinymce :height="300" v-model="form.content" id='tinymce'></tinymce>
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
import Tag from "@/components/Tag";
import Tinymce from "@/components/Tinymce"

import { editArticle, saveArticle } from "@/api/article/ArticleList";

export default {
  name: "EditArticle",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "文章列表",
          url: "/pages/editor/editor/article_list"
        },
        {
          name: "编辑文章",
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
      form: {},
      //分类列表
      categoryList: [],
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
        ]
      }
    };
  },
  components: {
    Crumb,
    Instructions,
    FilePicker,
    Tag,
    Tinymce
  },
  mounted: function() {
    //获取信息
    this.getData();
  },
  methods: {
    //获取信息
    getData() {
      let data = { id: this.$route.query.id };
      editArticle(data).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.data.data;
          this.categoryList = res.data.data.fields.category;
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
          let data = {
            id: that.form.id,
            title: that.form.title,
            category_id: that.form.category_id,
            author: that.form.author,
            photo: that.form.photo,
            content: that.form.content,
            image_id: that.form.image_id
          };
          saveArticle(data).then(res => {
            that.subLoading = false;
            if (res.data.code == 200) {
              that.$message.success("提交成功");
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
    },
    //获取标签
    getTags(val) {
      console.log(val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.tag {
  margin-right: 10px;
}
</style>
