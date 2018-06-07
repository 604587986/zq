<template>
  <div id="CategoryList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
          <router-link to="/pages/editor/editor/add_category"><el-button type="primary" size="mini">添加分类</el-button></router-link>
          <el-input placeholder="请输入关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
              <el-button slot="append" icon="el-icon-search" @click="getData()"></el-button>
          </el-input>
      </div>
      <!-- 表格 -->
      <div class="table-body">
          <el-table ref="multipleTable" :data="tableInfo" stripe size="small" @selection-change="handleSelectionChange" v-loading="table_loading" element-loading-text="数据载入中">
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="id" label="ID" width="70"></el-table-column>
              <el-table-column prop="title" label="标题" resizable></el-table-column>
              <el-table-column prop="name" label="SEO名称" width="100"></el-table-column>
              <el-table-column prop="index_tpl" label="列表页模板路径" width="90"></el-table-column>
              <el-table-column prop="index_tpl_id" label="列表页模板id" width="90"></el-table-column>
              <el-table-column prop="index_pattern" label="列表页文件命名规则" width="90"></el-table-column>
              <el-table-column prop="content_tpl" label="内容页模板路径" width="90"></el-table-column>
              <el-table-column prop="content_tpl_id" label="内容模板ID" width="90"></el-table-column>
              <el-table-column prop="content_pattern" label="内容页文件命名规则" width="90"></el-table-column>
              <el-table-column label="操作" width="250">
                  <div slot-scope="scope" class="control-btn">
                     <router-link :to="{path:'/pages/editor/editor/edit_category',query:{id:scope.row.id}}"><el-button size="small">编辑</el-button></router-link> 
                      <el-button @click.native.prevent="deleteRow(scope.$index, tableInfo)" size="small" class="control-btn-del">删除</el-button>
                  </div>
              </el-table-column>
          </el-table>
      </div>
      <!-- 表格筛选 -->
      <div class="table-filter">
          <el-button type="primary" size="mini" @click="selection(tableInfo)">全选</el-button>
          <el-button type="primary" size="mini">批量删除</el-button>
      </div>
      <!-- 分页 -->
      <Paging :currentPaging="currentPaging" v-on="{sizeChange:handleSizeChange,currentChange:handleCurrentChange}"></Paging>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Instructions from "@/components/Instructions";
import Paging from "@/components/Paging";

import { getCategoryList } from "@/api/category/category";
export default {
  name: "CategoryList",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "分类列表",
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
      //分页数据
      currentPaging: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        totals: null
      },
      //表格loading
      table_loading: false,
      //选择发布状态
      stateSelection: [
        {
          value: -1,
          label: "驳回"
        },
        {
          value: 0,
          label: "待审"
        },
        {
          value: 1,
          label: "正常"
        }
      ],
      stateValue: 1,
      //选择栏目
      columnSelection: [
        {
          value: 0,
          label: "学术交流"
        },
        {
          value: 1,
          label: "通知公告"
        },
        {
          value: 2,
          label: "下载中心"
        },
        {
          value: 3,
          label: "联系我们"
        }
      ],
      columnSelectionValue: "",
      //搜索关键字
      titleSearchValue: "",
      //表格数据
      tableInfo: [],
      //用于全选
      tableList: []
    };
  },
  components: {
    Crumb,
    Instructions,
    Paging
  },
  mounted() {
    this.getData();
  },
  methods: {
    //获取表格信息
    getData() {
      let data = {
        page: this.currentPaging.currentPage,
        size: this.currentPaging.pageSize,
        keyword: this.titleSearchValue
      };
      this.table_loading = true;
      getCategoryList(data).then(res => {
        this.table_loading = false;
        if (res.data.code == 200) {
          this.tableInfo = res.data.data.list;
          this.currentPaging.totals = res.data.data.count;
        } else {
          this.tableInfo = res.data.data.list;
          this.currentPaging.totals = res.data.data.count;
          this.$message.error(res.data.message);
        }
      });
    },

    //选中的时候触发
    handleSelectionChange(val) {
      this.tableList = [];
      for (let i in val) {
        this.tableList.push(val[i].id);
      }
    },
    //全选
    selection(rows) {
      var that = this;
      if (this.tableInfo.length !== this.tableList.length) {
        rows.forEach(row => {
          that.$refs.multipleTable.toggleRowSelection(row, true);
        });
      } else {
        that.$refs.multipleTable.clearSelection();
      }
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
