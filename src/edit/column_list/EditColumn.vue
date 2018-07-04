<template>
  <div id="EditColumn">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="form-container">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="150px" size="mini" label-position="right">
        <el-form-item label="菜单标题：" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="路径：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属站点：">
          <el-select v-model="form.site_id" size="mini">
            <el-option v-for="item in siteList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="类型：">
          <el-select v-model="form.type" size="mini" @change="clearData">
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="form.state" size="mini">
            <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        </el-form-item>
        <el-form-item label="小图标：">
          <el-select v-model="form.icon_id" size="mini">
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        </el-form-item>
        <el-form-item label="排序：">
            <el-input-number v-model="form.sort"></el-input-number>
        </el-form-item>
        <el-form-item label="数据：" v-if="form.type == 1">
          <el-select v-model="form.data" size="mini" placeholder="请输入文章关键词" filterable remote :remote-method="remoteArticle" :popper-append-to-body="false">
            <el-option v-for="item in articleList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据：" v-if="form.type == 2">
          <el-select v-model="form.data" size="mini" placeholder="请选择分类" :popper-append-to-body="false">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据：" v-if="form.type == 3">
          <el-input v-model="form.data" placeholder="请输入链接地址" size="mini"></el-input>
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

import { EditColumn } from "@/api/column/ColumnList";
import { UpdateColumn } from "@/api/column/ColumnList";
import { getArticleList } from "@/api/article/ArticleList";
import { getCategoryList } from "@/api/category/category";

export default {
  name: "EditColumn",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "栏目列表",
          url: "/pages/editor/editor/column_list"
        },
        {
          name: "编辑栏目",
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
      //站点列表
      siteList: [{ label: "站点1", value: 1 }, { label: "站点2", value: 2 }],
      //栏目类型列表
      typeList: [
        { label: "单页/模板", value: 1 },
        { label: "列表", value: 2 },
        { label: "链接", value: 3 }
      ],
      //类型为单页时的文章列表
      articleList: [],
      //类型为列表时的分类列表
      categoryList: [],
      articleList: [],
      //栏目状态列表
      stateList: [
        { label: "隐藏", value: 0 },
        { label: "正常", value: 1 }
      ],

      //提交按钮loading
      subLoading: false,
      //部门列表
      department_list: [
        {
          label: "部门1",
          id: 1
        },
        {
          label: "部门2",
          id: 2
        },
        {
          label: "部门3",
          id: 3
        }
      ],
      //表单
      form: {},
      //表单验证
      rules: {
        title:[{ required: true, message: '请填写名称', trigger: 'blur' }]
      }
    };
  },
  components: {
    Crumb,
    Instructions
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
      EditColumn(data).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.data.data;
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
          // let data = {
          //   site_id: that.form.site_id,
          //   type: that.form.type,
          //   state: that.form.state,
          //   sort: that.form.sort,
          //   title: that.form.title,
          //   name: that.form.name,
          //   icon_id: that.form.icon_id,
          //   pid: 0,
          //   level: 0,
          //   data: that.form.data
          // };
          UpdateColumn(that.form).then(res => {
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
    },
        //远程搜索文章列表
    remoteArticle(query) {
      this.articleList = [];
      let data = {
        keyword: query
      };
      if (query == "") {
        this.articleList = [];
      } else {
        getArticleList(data).then(res => {
          if (res.data.code == 200 || res.data.code == 404) {
            this.articleList = res.data.data.list;
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    //获取分类列表
    getCategory() {
      let data = {};
      getCategoryList(data).then(res => {
        if (res.data.code == 200 || res.data.code == 404) {
          this.categoryList = res.data.data.list;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //切换类型时清空一些数据
    clearData() {
      this.form.data = '';
      this.articleList = [];
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
