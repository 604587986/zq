<template>
  <div id="SinglepageList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <router-link to="/pages/editor/editor/add_singlepage" class="float-left filter-link">
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
          <el-table-column prop="state" label="状态">
            <div slot-scope="scope">
                <el-tag close-transition size="mini" v-show="scope.row.state==-1">已删除</el-tag>
                <el-tag close-transition size="mini" v-show="scope.row.state==0">临时(草稿)</el-tag>
                <el-tag close-transition size="mini" v-show="scope.row.state==1">正常</el-tag>
            </div>
          </el-table-column>
          <el-table-column label="操作" width="300">
            <div slot-scope="scope" class="control-btn">
              <router-link :to="{path:'/pages/editor/editor/edit_singlepage',query:{id:scope.row.id}}"><el-button size="mini">编辑</el-button></router-link>
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
