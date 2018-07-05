<template>
  <div id="TagList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- Form -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter"> 
          <el-button type="primary" size="mini" @click="addTag">添加标签</el-button>      
          <el-input placeholder="请输入昵称关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
            <el-button slot="append" icon="el-icon-search" @click="currentPaging.currentPage = 1;getData()"></el-button>
          </el-input>
      </div>
      <!-- 表格 -->
      <div class="table-body">
          <el-table ref="multipleTable" :data="tableInfo" stripe size="small" v-loading="table_loading" element-loading-text="数据载入中">
              <el-table-column prop="id" label="ID"></el-table-column>
              <el-table-column prop="title" label="标签名称"></el-table-column>
              <el-table-column label="操作">
                  <div slot-scope="scope" class="control-btn">
                      <el-button @click="editTag(scope.row.id)" size="small">编辑</el-button>
                      <el-button @click="del(scope.row.id)" size="small" class="control-btn-del">删除</el-button>                    
                  </div>
              </el-table-column>
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

import { tagList, createNewTag, deleteTag, saveTag } from "@/api/tag/tag";

export default {
  name: "TagList",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "文章标签列表",
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
      // 提交按钮loading
      subLoading: false
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
    //获取标签列表
    getData() {
      let data = {
        page: this.currentPaging.currentPage,
        size: this.currentPaging.pageSize,
        keyword: this.titleSearchValue
      };
      this.table_loading = true;
      tagList(data).then(res => {
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
    //添加标签
    addTag() {
      this.$prompt("请输入标签名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "不能为空"
      }).then(({ value }) => {
        let data = { title: value, type: 1 };
        createNewTag(data).then(res => {
          if (res.data.code == 200) {
            this.$message.success("标签创建成功");
            this.getData();
          } else {
            this.$message.error(res.data.message);
          }
        });
      });
    },
    //编辑标签
    editTag(id) {
      this.$prompt("请输入新的标签名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "不能为空"
      }).then(({ value }) => {
        let data = { id: id, title: value, type: 1 };
        saveTag(data).then(res => {
          if (res.data.code == 200) {
            this.$message.success("标签修改成功");
            this.getData();
          } else {
            this.$message.error(res.data.message);
          }
        });
      });
    },
    //删除标签
    del(id) {
      this.$confirm("此操作将删除该标签，同时删除在相关文章中的引用", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteTag({ id: id }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("删除成功");
              this.getData();
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>