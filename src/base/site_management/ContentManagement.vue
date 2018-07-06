<template>
  <div id="ContentManagement">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
          <el-select v-model="stateValue" placeholder="审核状态" size="mini" class="float-left state-selection" @change="currentPaging.currentPage = 1;getData()">
              <el-option v-for="item in stateSelection" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-model="siteValue" clearable placeholder="站点" size="mini" class="float-left column-selection" @change="currentPaging.currentPage = 1;categoryValue = '';getCategory();getData()">
              <el-option v-for="item in siteList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="categoryValue" clearable placeholder="分类" size="mini" class="float-left column-selection" @change="currentPaging.currentPage = 1;getData()">
              <el-option v-for="item in categoryList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
          <router-link to="/pages/system_administrators/System_Administrators/ContentRecycleBin" class="float-right">
            <el-button size="mini" type="primary">回收站</el-button>
          </router-link>
          <el-input placeholder="请输入关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
              <el-button slot="append" icon="el-icon-search" @click="currentPaging.currentPage = 1;getData()"></el-button>
          </el-input>
      </div>
      <div class="notice" v-show="show_keyword">搜索到{{currentPaging.totals}}篇关于“{{show_keyword}}”的文章：</div>      
      <!-- 表格 -->
      <div class="table-body">
          <el-table ref="multipleTable" border :data="tableInfo" stripe size="small" @selection-change="handleSelectionChange" v-loading="table_loading" element-loading-text="数据载入中">
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="id" label="ID" width="50"></el-table-column>
              <el-table-column prop="title" label="标题" width="200"></el-table-column>
              <el-table-column prop="category_title" label="所属分类"></el-table-column>
              <el-table-column prop="site_title" label="所属站点"></el-table-column>
              <el-table-column label="文章状态">
                  <div slot-scope="scope">
                      <el-tag close-transition size="mini" v-show="scope.row.state==-1">已删除</el-tag>
                      <el-tag close-transition size="mini" v-show="scope.row.state==0">临时(草稿)</el-tag>
                      <el-tag close-transition size="mini" v-show="scope.row.state==1">正常</el-tag>
                  </div>
              </el-table-column>
              <el-table-column prop="state_verify" label="审核状态" width="70">
                  <div slot-scope="scope">
                      <el-tag close-transition size="mini" type="danger" v-show="scope.row.state_verify==-1">驳回</el-tag>
                      <el-tag close-transition size="mini" v-show="scope.row.state_verify==0">待审</el-tag>
                      <el-tag close-transition size="mini" type="success" v-show="scope.row.state_verify==1">通过</el-tag>
                  </div>
              </el-table-column>
              <el-table-column prop="create_time" label="创建日期"></el-table-column>
              <el-table-column prop="author" label="作者"></el-table-column>
              <!-- <el-table-column prop="count" label="浏览次数"></el-table-column> -->
              <el-table-column label="排序">
                  <div slot-scope="scope" class="table-sort-input">
                      <el-input type="text" size="mini" @blur="sortBlur(scope.$index, tableInfo)" :value="scope.row.sort"></el-input>
                  </div>
              </el-table-column>
              <el-table-column label="操作">
                  <div slot-scope="scope" class="control-btn">
                      <el-button size="small" @click="openDialog(scope.row.title,scope.row.content)">预览</el-button>
                      <el-button size="small" v-if="scope.row.state_verify==0" @click="verify(scope.row.id,1)">通过</el-button>
                      <el-button size="small" v-if="scope.row.state_verify==0" @click="verify(scope.row.id,-1)">驳回</el-button>
                      <router-link :to="{path:'/pages/system_administrators/System_Administrators/EditContent',query:{id:scope.row.id}}"><el-button size="small">编辑</el-button></router-link>
                      <el-button @click="toDelete(scope.row.id)" size="small" class="control-btn-del">删除</el-button>
                  </div>
              </el-table-column>
          </el-table>
      </div>
      <!-- 表格筛选 -->
      <div class="table-filter">
          <el-button type="primary" size="mini" @click="selection(tableInfo)">全选</el-button>
          <el-button type="primary" size="mini">转移</el-button>
          <el-button type="primary" size="mini">推送</el-button>
          <el-button type="primary" size="mini">批量删除</el-button>
      </div>
      <!-- 分页 -->
      <Paging :currentPaging="currentPaging" v-on="{sizeChange:handleSizeChange,currentChange:handleCurrentChange}"></Paging>
    </div>
      <!-- 预览diolog -->
      <el-dialog
        :title="preview.title"
        :visible.sync="previewDialog"
        width="60%"
        center>
        <div v-html="preview.content">
          
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="previewDialog = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Paging from "@/components/Paging";
import Instructions from "@/components/Instructions";

import {
  getArticleList,
  verifyArticle,
  deleteArticle
} from "@/api/article/ArticleList";
import { getSiteList } from "@/api/site_management/SiteList";
import { getCategoryList } from "@/api/category/category";
/* 内容管理 */
export default {
  name: "ContentManagement",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "文章列表",
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
        totals: 0
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
          label: "通过"
        }
      ],
      stateValue: 1,
      //搜索关键字
      titleSearchValue: "",
      //搜索后用于展示的关键词
      show_keyword:'',
      //站点列表
      siteList: [],
      siteValue: "",
      //分类列表
      categoryList: [],
      categoryValue: "",
      //表格数据
      tableInfo: [],
      //用于全选
      tableList: [],
      //预览框
      previewDialog: false,
      //预览内容
      preview: {
        title: "",
        content: ""
      }
    };
  },
  components: {
    Crumb,
    Instructions,
    Paging
  },
  mounted: function() {
    this.getSite();
    this.getData();
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 1);
    this.$store.commit("update_system_menu_idx", 1);
  },
  methods: {
    //获取表格信息
    getData() {
      let data = {
        page: this.currentPaging.currentPage,
        size: this.currentPaging.pageSize,
        keyword: this.titleSearchValue,
        state_verify: this.stateValue,
        site_id: this.siteValue,
        category_id: this.categoryValue
      };
      this.table_loading = true;
      getArticleList(data).then(res => {
        this.table_loading = false;
        if (res.data.code == 200 || res.data.code == 404) {
          this.tableInfo = res.data.data.list;
          this.currentPaging.totals = res.data.data.count;
          this.show_keyword = this.titleSearchValue;          
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //获取站点列表
    getSite() {
      let data = {
        page: 0
      };
      getSiteList(data).then(res => {
        if (res.data.code == 200 || res.data.code == 404) {
          this.siteList = res.data.data.list;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //获取分类列表
    getCategory() {
      let data = {
        site_id: this.siteValue,
        page: 0
      };
      getCategoryList(data).then(res => {
        if (res.data.code == 200 || res.data.code == 404) {
          this.categoryList = res.data.data.list;
        } else {
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
    },
    //预览
    openDialog(title, content) {
      this.preview.title = title;
      this.preview.content = content;
      this.previewDialog = true;
    },
    //审核
    verify(id, state) {
      let data = {
        id: id,
        state_verify: state
      };
      let msg = state == 1 ? "该文章成功通过审核" : "已成功驳回该文章";
      verifyArticle(data).then(res => {
        if (res.data.code == 200) {
          this.$message.success(msg);
          this.getData();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 软删除
    toDelete(id) {
      let data = { id: id };
      deleteArticle(data).then(res => {
        if (res.data.code == 200) {
          this.$message.success("文章删除成功");
          this.getData();
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
