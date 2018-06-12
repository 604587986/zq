<template>
  <div id="SinglepageList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <router-link to="/pages/system_administrators/System_Administrators/AddSite" class="float-left filter-link">
          <el-button size="mini" type="primary">添加单页</el-button>
        </router-link>
        <el-input placeholder="请输入关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="articleSearch()"></el-button>
        </el-input>
      </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small" v-loading="table_loading" element-loading-text="数据载入中">
          <el-table-column prop="id" label="序号" width="50"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="user_id" label="所属用户"></el-table-column>
          <el-table-column prop="site_id" label="所属站点"></el-table-column>
          <el-table-column prop="seo_name" label="页面SEO名称"></el-table-column>
          <el-table-column prop="seo_desc" label="页面SEO描述"></el-table-column>
          <el-table-column prop="seo_keywords" label="页面SEO关键字"></el-table-column>
          <el-table-column label="操作" width="300">
            <div slot-scope="scope" class="control-btn">
              <el-button size="mini" @click="visit(scope.row.domain)">访问</el-button>
              <el-button size="mini" @click="change(scope.row.id)">切换</el-button>
              <router-link :to="{path:'/pages/system_administrators/System_Administrators/EditSite',query:{id:scope.row.id}}"><el-button size="mini">编辑</el-button></router-link>
              <el-button size="mini" @click="update(scope.row.id)">更新缓存</el-button>
              <el-button size="mini" @click="backup(scope.row.id)">数据备份</el-button>
              <el-button size="mini" @click="recover(scope.row.id)">数据恢复</el-button>
              <el-button size="mini" @click="del(scope.row.uid)" class="control-btn-del">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <Paging :currentPaging="currentPaging" v-on="{sizeChange:handleSizeChange,currentChange:handleCurrentChange}"></Paging>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Paging from "@/components/Paging";

import { pageList } from "@/api/single_page/single";
export default {
  name: "SinglepageList",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "单页列表",
          url: ""
        }
      ],
      //分页数据
      currentPaging: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        totals: null
      },
      //表格数据
      tableInfo:[],
      //表格loading
      table_loading:false,
      //搜索关键词
      titleSearchValue:'',
      rules: {},
      //提交按钮loading
      subLoading: false,
      // 是否继续按钮
      continueBtn: false
    };
  },
  mounted(){
    this.getData()
  },
  methods: {
    //获取单页列表
    getData() {
      let data = {
        page: this.currentPaging.currentPage,
        size: this.currentPaging.pageSize,
        keyword: this.titleSearchValue
      };
      this.table_loading = true;
      pageList(data).then(res => {
        this.table_loading = false;
        if (res.data.code == 200 || res.data.code == 404) {
          this.tableInfo = res.data.data.list;
          this.currentPaging.totals = res.data.data.count;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //处理sizeChange
    handleSizeChange(val) {
      this.currentPaging.pageSize = val;
      this.currentPaging.currentPage = 1;
      this.getData();
    },
    //处理currentChange
    handleCurrentChange(val) {
      this.currentPaging.currentPage = val;
      this.getData();
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
    submitForm(formName) {}
  },
  components: {
    Crumb,
    Paging
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
