<template>
  <div id="ColumnList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <div class="table-filter">
      <el-button type="primary" size="mini" @click="add_child(0,0,'顶级菜单')">添加菜单</el-button>
      <el-select v-model="group" placeholder="菜单类型" size="mini" @change="getData()">
          <el-option label="首页菜单" :value="1"></el-option>
          <el-option label="会员菜单" :value="2"></el-option>
      </el-select>
    </div>
    <!-- Form -->
    <div class="table-container">
        <!-- 表格 -->
        <div class="table-body carousel_container">
            <el-table :data="tableInfo" size="small" v-loading="table_loading" element-loading-text="数据载入中">
                <el-table-column prop="id" label="ID" width="65"></el-table-column>
                <el-table-column label="显示子类" type="expand" width="100">
                    <div slot-scope="props">
                        <el-table :data="props.row._child" stripe size="mini" class="second-table">
                            <el-table-column prop="id" width="65"></el-table-column>
                            <el-table-column type="expand" width="100">
                                <div slot-scope="props">
                                    <el-table :data="props.row._child" stripe size="mini" class="third-table">
                                        <el-table-column prop="id" width="65"></el-table-column>
                                        <el-table-column width="100" disabled="true"></el-table-column>
                                        <el-table-column prop="title"></el-table-column>
                                        <el-table-column prop="type">
                                          <div slot-scope="scope">
                                            <div v-show="scope.row.type==1">单页/模板</div>
                                            <div v-show="scope.row.type==2">列表</div>
                                            <div v-show="scope.row.type==3">链接</div>
                                          </div>
                                        </el-table-column>
                                        <el-table-column prop="state" width="">
                                          <div slot-scope="scope">
                                            <div v-show="scope.row.state==-1">删除</div>
                                            <div v-show="scope.row.state==0">隐藏</div>
                                            <div v-show="scope.row.state==1">正常</div>
                                          </div>
                                        </el-table-column>
                                        <el-table-column prop="level" width="80"></el-table-column>
                                        <el-table-column width="60">
                                            <div slot-scope="scope" class="table-sort-input">
                                                <el-input type="text" size="mini" @blur="sortBlur(scope.$index, column_list)" :value="scope.row.sort"></el-input>
                                            </div>
                                        </el-table-column>
                                        <el-table-column width="270">
                                            <div slot-scope="scope" class="control-btn">
                                                <!-- <el-button size="small">添加子类</el-button> -->
                                                <router-link :to="{path:'/pages/editor/editor/edit_column',query:{id:scope.row.id}}"><el-button size="small">编辑</el-button></router-link>
                                                <el-button @click.native.prevent="deleteRow(scope.$index, column_list)" size="small" class="control-btn-del">删除</el-button>
                                            </div>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-table-column>
                            <el-table-column prop="title"></el-table-column>
                            <el-table-column prop="type">
                              <div slot-scope="scope">
                                <div v-show="scope.row.type==1">单页/模板</div>
                                <div v-show="scope.row.type==2">列表</div>
                                <div v-show="scope.row.type==3">链接</div>
                              </div>
                            </el-table-column>
                            <el-table-column prop="state" width="">
                             <div slot-scope="scope">
                              <div v-show="scope.row.state==-1">删除</div>
                              <div v-show="scope.row.state==0">隐藏</div>
                              <div v-show="scope.row.state==1">正常</div>
                            </div>
                            </el-table-column>
                            <el-table-column prop="level" width="80"></el-table-column>
                            <el-table-column width="60">
                                <div slot-scope="scope" class="table-sort-input">
                                    <el-input type="text" size="mini" @blur="sortBlur(scope.$index, column_list)" :value="scope.row.sort"></el-input>
                                </div>
                            </el-table-column>
                            <el-table-column width="270">
                                <div slot-scope="scope" class="control-btn">
                                    <el-button size="small" @click="add_child(scope.row.id,2,'三级菜单')">添加子类</el-button>
                                    <router-link :to="{path:'/pages/editor/editor/edit_column',query:{id:scope.row.id}}"><el-button size="small">编辑</el-button></router-link>
                                    <el-button @click.native.prevent="deleteRow(scope.$index, column_list)" size="small" class="control-btn-del">删除</el-button>
                                </div>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-table-column>
                <el-table-column prop="title" label="分类名称"></el-table-column>
                <el-table-column label="类别">
                  <div slot-scope="scope">
                    <div v-show="scope.row.type==1">单页/模板</div>
                    <div v-show="scope.row.type==2">列表</div>
                    <div v-show="scope.row.type==3">链接</div>
                  </div>
                </el-table-column>
                <el-table-column label="状态" width="">
                  <div slot-scope="scope">
                    <div v-show="scope.row.state==-1">删除</div>
                    <div v-show="scope.row.state==0">隐藏</div>
                    <div v-show="scope.row.state==1">正常</div>
                  </div>
                </el-table-column>
                <!-- <el-table-column prop="level" label="级别" width="80"></el-table-column> -->
                <el-table-column label="排序">
                    <div slot-scope="scope" class="table-sort-input">
                        <el-input type="text" size="mini" @blur="sortBlur(scope.$index, column_list)" :value="scope.row.sort"></el-input>
                    </div>
                </el-table-column>
                <el-table-column label="操作" width="270">
                    <div slot-scope="scope" class="control-btn">
                        <el-button size="small" @click="add_child(scope.row.id,1,'二级菜单')">添加子类</el-button>
                        <router-link :to="{path:'/pages/editor/editor/edit_column',query:{id:scope.row.id}}"><el-button size="small">编辑</el-button></router-link>
                        <el-button @click.native.prevent="deleteRow(scope.$index, column_list)" size="small" class="control-btn-del">删除</el-button>
                    </div>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <!-- dialog -->
    <el-dialog :title="show_title" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="150px" label-position="right" :rules="rules">
        <el-form-item label="菜单标题：" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="路径：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单分组：">
          <el-select v-model="form.group" placeholder="请选择" size="mini">
            <el-option label="首页菜单" :value="1"></el-option>
          <el-option label="会员菜单" :value="2"></el-option>
      </el-select>
        </el-form-item>
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
          <file-picker v-model="form.icon_id" :allowType="['image']"></file-picker>
        </el-form-item>
        </el-form-item>
        <el-form-item label="排序：">
            <el-input-number v-model="form.sort"></el-input-number>
        </el-form-item>
        <el-form-item label="数据：" v-if="form.type == 1">
          <el-select v-model="form.data" size="mini" placeholder="输入关键词搜索文章" filterable remote :remote-method="remoteArticle" :popper-append-to-body="false">
            <el-option v-for="item in articleList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据：" v-if="form.type == 2">
          <el-select v-model="form.data" size="mini" placeholder="请选择分类" :popper-append-to-body="false">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.title" :value="String(item.id)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据：" v-if="form.type == 3">
          <el-input v-model="form.data" placeholder="请输入链接地址" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary"  size="large" :loading="subLoading" @click="submitForm('form')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Instructions from "@/components/Instructions";
import FilePicker from "@/components/FilePicker";

import { getColumnList } from "@/api/column/ColumnList";
import { AddColumn } from "@/api/column/ColumnList";

import { getArticleList } from "@/api/article/ArticleList";
import { getCategoryList } from "@/api/category/category";

export default {
  name: "ColumnList",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "菜单列表",
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
      //存储pid和level和显示标题
      pid: "",
      level: "",
      show_title: "",
      //弹出框
      dialogFormVisible: false,
      //弹出框的表单
      form: {
        data: ""
      },
      //站点列表
      siteList: [{ label: "站点1", value: 1 }, { label: "站点2", value: 2 }],
      //类型为单页时的文章列表
      articleList: [],
      //类型为列表时的分类列表
      categoryList: [],
      //菜单类型列表
      typeList: [
        { label: "单页/模板", value: 1 },
        { label: "列表", value: 2 },
        { label: "链接", value: 3 },
        // { label: "链接1", value: 4 },
        { label: "推荐", value: 5 }
      ],
      //菜单状态列表
      stateList: [{ label: "隐藏", value: 0 }, { label: "正常", value: 1 }],
      //表格loading
      table_loading: false,
      //提交按钮loading
      subLoading: false,
      //表单验证
      rules: {
        title: [{ required: true, message: "请填写名称", trigger: "blur" }]
      },
      //表格
      tableInfo: [
      ],
      // 菜单组
      group:1
    };
  },
  components: {
    Crumb,
    Instructions,
    FilePicker
  },
  mounted() {
    //获取表格数据
    this.getData();
    //获取分类列表
    this.getCategory();
  },
  methods: {
    //获取表格数据
    getData() {
      let data = {
        site_id: "",
        tree: 1,
        group:this.group
      };
      this.table_loading = true;
      getColumnList(data).then(res => {
        this.table_loading = false;
        if (res.data.code == 200) {
          this.tableInfo = res.data.data.list;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //打开弹出框并存储pid和level
    add_child(id, level, title) {
      this.dialogFormVisible = true;
      this.pid = id;
      this.level = level;
      this.show_title = "添加" + title;
      //将文章列表清空
      this.articleList = [];
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
      let data = {page:0};
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
      this.form.data = "";
      this.articleList = [];
    },
    //表单提交
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        that.subLoading = true;
        if (valid) {
          let data = {
            site_id: that.form.site_id,
            type: that.form.type,
            state: that.form.state,
            sort: that.form.sort,
            title: that.form.title,
            name: that.form.name,
            icon_id: that.form.icon_id,
            pid: that.pid,
            level: that.level,
            data: that.form.data
          };
          AddColumn(data).then(res => {
            that.subLoading = false;
            if (res.data.code == 200) {
              that.$message.success("添加成功");
              that.form = {};
              that.dialogFormVisible = false;
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#ColumnList {
  .second-table {
    .el-table__header-wrapper {
      display: none;
    }
    .el-table__row > td {
      background: #f5f7fa;
    }
    .el-icon-arrow-right {
      left: 56%;
    }
  }
  .third-table {
    .el-table__row > td {
      background: #e7e7e7;
    }
  }
  .el-table__expanded-cell[class*="cell"] {
    padding: 0 0 20px 0;
  }
  .el-select-dropdown {
    &.el-popper {
      max-width: 300px;
    }
  }
  .el-table__expand-icon > .el-icon {
    font-size: 20px;
    margin-top: -8px;
  }
  .second-table {
    .el-table__expand-icon > .el-icon {
      font-size: 14px;
      margin-top: -5px;
    }
  }
}
</style>
