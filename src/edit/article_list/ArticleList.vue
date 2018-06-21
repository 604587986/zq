<template>
  <div id="ArticeList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
          <el-select v-model="stateValue" placeholder="审核状态" size="mini" class="float-left state-selection" @change="getData()">
              <el-option v-for="item in stateSelection" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <!-- <el-select v-model="columnSelectionValue" clearable placeholder="栏目" size="mini" class="float-left column-selection">
              <el-option v-for="item in columnSelection" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select> -->
        
          <router-link to="/pages/editor/editor/article_recycle_bin" class="float-right">
            <el-button size="mini" type="primary">回收站</el-button>
          </router-link>
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
              <el-table-column prop="category_title" label="栏目" width="100"></el-table-column>
              <el-table-column label="文章状态" width="90">
                  <div slot-scope="scope">
                      <el-tag close-transition size="mini" v-show="scope.row.state==-1">已删除</el-tag>
                      <el-tag close-transition size="mini" v-show="scope.row.state==0">临时(草稿)</el-tag>
                      <el-tag close-transition size="mini" v-show="scope.row.state==1">正常</el-tag>
                  </div>
              </el-table-column>
              <el-table-column prop="create_time" label="创建日期" width="100"></el-table-column>
              <el-table-column prop="author" label="创建人" width="85"></el-table-column>
              <!-- <el-table-column prop="count" label="浏览次数" width="70"></el-table-column> -->
              <el-table-column prop="state_verify" label="审核状态" width="70">
                  <div slot-scope="scope">
                      <el-tag close-transition size="mini" type="danger" v-show="scope.row.state_verify==-1">驳回</el-tag>
                      <el-tag close-transition size="mini" v-show="scope.row.state_verify==0">待审</el-tag>
                      <el-tag close-transition size="mini" type="success" v-show="scope.row.state_verify==1">通过</el-tag>
                  </div>
              </el-table-column>
              <el-table-column label="排序" width="65">
                  <div slot-scope="scope" class="table-sort-input">
                      <el-input type="text" size="mini" @blur="sortBlur(scope.$index, tableInfo)" :value="scope.row.sort"></el-input>
                  </div>
              </el-table-column>
              <el-table-column label="操作" width="250">
                  <div slot-scope="scope" class="control-btn">
                      <el-button size="small" @click="openDialog(scope.row.title,scope.row.content)">预览</el-button>
                      <el-button size="small" v-if="scope.row.state_verify==0" @click="verify(scope.row.id,1)">通过</el-button>
                      <el-button size="small" v-if="scope.row.state_verify==0" @click="verify(scope.row.id,-1)">驳回</el-button>
                      <router-link :to="{path:'/pages/editor/editor/edit_article',query:{id:scope.row.id}}"><el-button size="small">编辑</el-button></router-link>
                      <el-button @click="toDelete(scope.row.id)" size="small" class="control-btn-del">删除</el-button>
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
import Instructions from "@/components/Instructions";
import Paging from "@/components/Paging";

import { getArticleList } from "@/api/article/ArticleList";
export default {
  name: "ArticeList",
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
          label: "通过"
        }
      ],
      stateValue: 1,
      columnSelectionValue: "",
      //搜索关键字
      titleSearchValue: "",
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
  mounted() {
    this.getData();
  },
  methods: {
    //获取表格信息
    getData() {
      let data = {
        page: this.currentPaging.currentPage,
        size: this.currentPaging.pageSize,
        keyword: this.titleSearchValue,
        state_verify: this.stateValue
      };
      this.table_loading = true;
      getArticleList(data).then(res => {
        this.table_loading = false;
        if (res.data.code == 200 || res.data.code == 404) {
          this.tableInfo = res.data.data.list;
          this.currentPaging.totals = res.data.data.count;
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
