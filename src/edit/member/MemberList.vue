<template>
  <div id="MemberList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- Form -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">       
          <router-link to="/pages/editor/editor/article_recycle_bin" class="float-right">
            <el-button size="mini" type="primary">回收站</el-button>
          </router-link>
          <el-input placeholder="请输入关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
            <el-button slot="append" icon="el-icon-search" @click="currentPaging.currentPage = 1;getData()"></el-button>
          </el-input>
      </div>
      <!-- 表格 -->
      <div class="table-body">
          <el-table ref="multipleTable" :data="tableInfo" stripe size="small" v-loading="table_loading" element-loading-text="数据载入中">
              <el-table-column></el-table-column>
          </el-table>
      </div>
      <!-- 表格筛选 -->
      <!-- <div class="table-filter">
          <el-button type="primary" size="mini" @click="selection(tableInfo)">全选</el-button>
          <el-button type="primary" size="mini">批量删除</el-button>
      </div> -->
      <!-- 分页 -->
      <Paging :currentPaging="currentPaging" v-on="{sizeChange:handleSizeChange,currentChange:handleCurrentChange}"></Paging>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Paging from "@/components/Paging";

export default {
  name: "MemberList",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "会员列表",
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
      //表格loading
      table_loading: false,
      //搜索关键字
      titleSearchValue: "",
      //表格数据
      tableInfo: [],
      //用于全选
      tableList: [],
      //预览框
      previewDialog: false
    };
  },
  components: {
    Crumb,
    Paging
  },
  mounted() {
    this.getData();
  },
  methods: {
    //获取表格信息
    getData() {},
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
