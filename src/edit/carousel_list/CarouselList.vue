<template>
  <div id="CarouselList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- 表格筛选 -->
    <div class="table-filter">
      <router-link to="/pages/editor/editor/add_carousel"><el-button type="primary" size="mini">添加轮播图</el-button></router-link>
      <el-select v-model="categoryValue" placeholder="分类" clearable size="mini" class="state-selection" @change="currentPaging.currentPage = 1;getData()">
          <el-option v-for="item in categoryList" :key="item.id" :label="item.title" :value="item.id"></el-option>
      </el-select>
      <el-select v-model="type" placeholder="状态" clearable size="mini" class="state-selection" @change="currentPaging.currentPage = 1;getData()">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="隐藏" :value="-1"></el-option>
      </el-select>
      <el-button type="primary" size="mini" class="float-right" @click="categoryDialog = true">轮播图分类</el-button>
    </div>
    <div class="table-container">
        <!-- 表格 -->
        <div class="table-body carousel_container">
            <el-table ref="multipleTable" :data="tableInfo" stripe size="small" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection"></el-table-column> -->
                <el-table-column prop="id" label="ID" width="65"></el-table-column>
                <el-table-column prop="title" label="标题" width="90"></el-table-column>
                <el-table-column prop="category_title" label="分类" width="100"></el-table-column>
                <el-table-column label="图片" width="150">
                    <div slot-scope="scope" class="carousel-img">
                        <img :src="scope.row.image_url" />
                    </div>
                </el-table-column>
                <el-table-column prop="link" label="链接">
                    <a :href="scope.row.link" slot-scope="scope" target="_blank" class="carousel-link">{{scope.row.link}}</a>
                </el-table-column>
                <!-- <el-table-column label="排序" width="65">
                    <div slot-scope="scope" class="table-sort-input">
                        <el-input type="text" size="mini" @blur="sortBlur(scope.$index, carouselInfo)" :value="scope.row.count"></el-input>
                    </div>
                </el-table-column> -->
                <el-table-column label="是否显示" >
                  <div slot-scope="scope">
                    {{scope.row.type==1?'显示':'隐藏'}}
                  </div>
                </el-table-column>
                <el-table-column prop="create_time" label="添加时间"></el-table-column>
                <el-table-column label="操作">
                    <div slot-scope="scope" class="control-btn">
                        <el-button size="small" @click="editDialog=true;form=scope.row">编辑</el-button>
                        <el-button @click.native.prevent="delCarousel(scope.row.id)" size="small" class="control-btn-del">删除</el-button>
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
    <!-- 编辑轮播图 -->
    <el-dialog
        title="编辑"
        :visible.sync="editDialog"
       >
        <el-form ref="form" :model="form" status-icon label-width="150px" size="mini" label-position="right">
        <el-form-item label="标题:">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="分类:" class="form-item" prop="category_id">
            <el-select v-model="form.category_id" placeholder="分类" clearable size="mini" class="state-selection">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="图片:">
          <file-picker v-model="form.image_id" :allowType="['image']" :receiveImg="form.image_url"></file-picker>
        </el-form-item>
        <el-form-item label="链接:">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <!-- <el-form-item label="排序:">
          <el-input v-model="form.sort"></el-input>
        </el-form-item> -->
        <el-form-item label="是否启用:">
          <el-radio-group v-model="form.type">
              <el-radio :label="1">显示</el-radio>
              <el-radio :label="-1">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="form-control-btn">
          <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 轮播图分类列表 -->
    <el-dialog
        title="轮播图分类管理"
        :visible.sync="categoryDialog"
       >
       <el-row>
         <el-button type="primary" size="mini" @click="addDialog = true">新增</el-button>
       </el-row>
      <el-table :data="gridData">
        <el-table-column property="id" label="id"></el-table-column>
        <el-table-column property="title" label="标题"></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope" >
           <el-button size="small" @click="editCategoryDialog= true;form3 = scope.row">编辑</el-button>
           <el-button size="small" @click="delCategory(scope.row.id)">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Paging :currentPaging="currentPaging2" v-on="{sizeChange:handleSizeChange2,currentChange:handleCurrentChange2}"></Paging>
    </el-dialog>
    <!-- 新增分类 -->
    <el-dialog
        title="新增分类"
        :visible.sync="addDialog"
       >
        <el-form ref="form2" :model="form2" status-icon label-width="150px" size="mini" label-position="right">
          <el-form-item label="标题:">
            <el-input v-model="form2.title"></el-input>
          </el-form-item>
          <el-form-item class="form-control-btn">
            <el-button type="primary" @click="addCategory('form2')" size="mini" :loading="subLoading">提交</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 编辑分类 -->
    <el-dialog
        title="编辑分类"
        :visible.sync="editCategoryDialog"
       >
        <el-form ref="form3" :model="form3" status-icon label-width="150px" size="mini" label-position="right">
          <el-form-item label="标题:">
            <el-input v-model="form3.title"></el-input>
          </el-form-item>
          <el-form-item class="form-control-btn">
            <el-button type="primary" @click="editCategory('form3')" size="mini" :loading="subLoading">提交</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Instructions from "@/components/Instructions";
import Paging from "@/components/Paging";
import FilePicker from "@/components/FilePicker";

import {
  carouselList,
  editCarousel,
  delCarousel
} from "@/api/carousel/carousel";
import { create, index, save, del } from "@/api/gallery_category/index";

/* 轮播图列表 */
export default {
  name: "CarouselList",
  data() {
    return {
      // 表格中的分类列表
      gridData: [],
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "轮播图",
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
      //分类列表分页数据
      currentPaging2: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        totals: null
      },
      //表格loading
      table_loading: false,
      //分类列表
      categoryList: [],
      categoryValue: "",
      //轮播状态
      type: "",
      //检索
      titleSearchValue: "",
      //表格
      tableInfo: [],
      //用于多选
      tableList: [],
      // 编辑弹出框
      editDialog: false,
      //编辑form
      form: {},
      //提交按钮loading
      subLoading: false,
      //轮播图列表弹出框
      categoryDialog: false,
      //新增分类弹出框
      addDialog: false,
      //新增分类时的表单
      form2: {},
      //编辑分类弹出框
      editCategoryDialog: false,
      //编辑分类时的表单
      form3: {}
    };
  },
  components: {
    Crumb,
    Instructions,
    Paging,
    FilePicker
  },
  mounted() {
    this.getData();
    //获取分类列表
    this.getCategory();
    //获取所有分类列表
    this.getAllCategory();
  },
  watch: {
    gridData: function() {
      this.getAllCategory();
    }
  },
  methods: {
    //获取表格信息
    getData() {
      let data = {
        page: this.currentPaging.currentPage,
        size: this.currentPaging.pageSize,
        keyword: this.titleSearchValue,
        type: this.type,
        category_id: this.categoryValue
      };
      this.table_loading = true;
      carouselList(data).then(res => {
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
    //处理sizeChange2
    handleSizeChange2(val) {
      this.currentPaging2.pageSize = val;
      this.currentPaging2.currentPage = 1;
      this.getCategory();
    },
    //处理currentChange2
    handleCurrentChange2(val) {
      this.currentPaging2.currentPage = val;
      this.getCategory();
    },
    //表单提交(编辑)
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        that.subLoading = true;
        if (valid) {
          let data = {
            id: that.form.id,
            title: that.form.title,
            category_id: that.form.category_id,
            image_id: that.form.image_id,
            link: that.form.link,
            // sort:that.form.sort,
            type: that.form.type
          };
          editCarousel(data).then(res => {
            that.subLoading = false;
            if (res.data.code == 200) {
              that.$message.success("修改成功");
              that.editDialog = false;
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
    //删除轮播
    delCarousel(id) {
      this.$confirm("此操作将会删除该轮播，是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delCarousel({ id: id }).then(res => {
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
    },
    //获取所有分类
    getAllCategory() {
      let data = {
        page: 0,
        type: 1
      };
      index(data).then(res => {
        if (res.data.code == 200 || res.data.code == 404) {
          this.categoryList = res.data.data.list;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //获取分类
    getCategory() {
      let data = {
        page: this.currentPaging2.currentPage,
        size: this.currentPaging2.pageSize,
        type: 1
      };
      index(data).then(res => {
        if (res.data.code == 200 || res.data.code == 404) {
          this.gridData = res.data.data.list;
          this.currentPaging2.totals = res.data.data.count;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //新增轮播图分类
    addCategory(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        that.subLoading = true;
        if (valid) {
          let data = {
            title: that.form2.title,
            type: 1
          };
          create(data).then(res => {
            that.subLoading = false;
            if (res.data.code == 200) {
              that.$message.success("分类创建成功");
              that.addDialog = false;
              that.getCategory();
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
    //删除分类
    delCategory(id) {
      del({ id: id }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("分类删除成功");
          this.getCategory();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //编辑分类
    editCategory(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        if (valid) {
          save(that.form3).then(res => {
            if (res.data.code == 200) {
              that.$message.success("分类修改成功");
              that.getCategory();
              that.editCategoryDialog = false;
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
</style>
