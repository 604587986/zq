<template>
  <div id="PublishArtice">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <div class="btn-wrapper" style="margin-left:108px;">
      <!-- <el-button type="primary" size="mini">发文章</el-button> -->
      <!-- <el-button type="primary" size="mini">发链接</el-button> -->
    </div>
    <!-- Form -->
    <div class="form-container">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="108px" size="mini" label-position="right">
        <!-- <el-form-item label="主栏目" class="form-item" prop="mainColumn">
            <el-select v-model="form.mainColumn" placeholder="请选择主栏目" style="width:100%;">
                <el-option v-for="item in mainColumnList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="副栏目" class="form-item">
            <el-select v-model="form.subColumn" placeholder="请选择副栏目" style="width:100%;">
                <el-option v-for="item in subColumnList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item label="分类" class="form-item">
            <el-select v-model="form.category_id" placeholder="请选择" style="width:100%;">
                <el-option v-for="item in categoryList" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标题" class="form-item" prop="title">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="SEO标题" class="form-item" prop="title">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="作者" class="form-item" prop="title">
            <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="摄影" class="form-item" prop="title">
            <el-input v-model="form.photo"></el-input>
        </el-form-item>      
        <!-- <el-form-item label="属性" class="form-item" prop="attribute">
            <el-radio-group v-model="form.attribute">
                <el-radio label="推荐"></el-radio>
                <el-radio label="头条"></el-radio>
                <el-radio label="置顶"></el-radio>
            </el-radio-group>
        </el-form-item> -->
        <!-- <el-form-item label="来源" class="form-item" prop="comeFrom">
            <el-select v-model="form.comeFrom" placeholder="请选择栏目" style="width:100%;">
                <el-option v-for="item in sourceList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item label="文章内容">
          <quill-editor 
                v-model="form.content" 
                ref="myQuillEditor" 
                :options="editorOption" 
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
          </quill-editor>
        </el-form-item>
        <!-- <el-form-item label="文章排序" class="form-item" prop="sort">
          <el-input v-model.number="form.sort"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="置顶" class="form-item">
            <el-select v-model="form.toTop" placeholder="请选择" style="width:100%;">
                <el-option v-for="item in toTopList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="发布日期" class="form-item" prop="date">
            <el-date-picker v-model="form.date" align="right" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item> -->
        <el-form-item class="form-control-btn">
          <el-button type="primary" size="large">预览</el-button>
          <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">提交</el-button>
          <el-checkbox v-model="continueBtn" style="margin-left:10px;">发布后继续</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";

import { createArticle, saveArticle } from "@/api/article/ArticleList";
import { getCategoryList } from "@/api/category/category";

export default {
  name: "PublishArtice",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "发文章",
          url: ""
        }
      ],
      //分类列表
      categoryList: [],
      //编辑器配置
      editorOption: {},
      form: {
        id: "",
        title: "",
        name: "",
        // state: "",
        // state_verify: "",
        // image_id: "",
        // sort: "",
        // pin_date: "",
        // create_time: "",
        // update_time: "",
        // user_id: "",
        // site_id: "",
        category_id: "",
        author: "",
        photo: ""
        // url: ""
      },
      rules: {},
      //提交按钮loading
      subLoading: false,
      // 是否继续按钮
      continueBtn: false
    };
  },
  mounted() {
    //获取分类列表
    this.getCategory();
  },
  methods: {
    //获取分类列表
    getCategory() {
      getCategoryList().then(res => {
        if (res.data.code == 200 || res.data.code == 404) {
          this.categoryList = res.data.data.list;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    },
    //表单提交
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        that.subLoading = true;
        if (valid) {
          //文章预创建
          createArticle().then(res => {
            if (res.data.code == 200) {
              //赋值id
              that.form.id = res.data.data.id;
              //保存文章
              saveArticle(that.form).then(res => {
                if (res.data.code == 200) {
                  that.$alert("提交成功，请等待审核", "提示", {
                    confirmButtonText: "确定",
                    callback:()=>{

                    }
                  });
                } else {
                  that.$message.error(res.data.message);
                }
              });
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
  },
  components: {
    Crumb
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
