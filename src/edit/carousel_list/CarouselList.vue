<template>
  <div id="CarouselList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- 表格筛选 -->
    <div class="table-filter">
      <router-link to="/pages/editor/editor/add_carousel"><el-button type="primary" size="mini">添加轮播图</el-button></router-link>
      <el-cascader v-model="categoryValue" :options="categoryList" clearable placeholder="分类" change-on-select :props="{value:'id',label:'title',children:'children'}" size="mini" class=" column-selection" @change="currentPaging.currentPage = 1;getData()">
      </el-cascader>
      <el-select v-model="type" placeholder="状态" clearable size="mini" class="state-selection" @change="currentPaging.currentPage = 1;getData()">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="隐藏" :value="-1"></el-option>
      </el-select>
    </div>
    <div class="table-container">
        <!-- 表格 -->
        <div class="table-body carousel_container">
            <el-table ref="multipleTable" :data="tableInfo" stripe size="small" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="id" label="ID" width="65"></el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="category_title" label="分类"></el-table-column>
                <el-table-column label="图片">
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
                <el-table-column label="是否显示" width="90">
                  <div slot-scope="scope">
                    {{scope.row.type==1?'显示':'隐藏'}}
                  </div>
                </el-table-column>
                <el-table-column prop="create_time" label="添加时间" width="96"></el-table-column>
                <el-table-column label="操作" width="130">
                    <div slot-scope="scope" class="control-btn">
                        <el-button size="small" @click="editDialog=true;form=scope.row">编辑</el-button>
                        <el-button @click.native.prevent="deleteRow(scope.$index, carouselInfo)" size="small" class="control-btn-del">删除</el-button>
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
    <el-dialog
        title="编辑"
        :visible.sync="editDialog"
       >
        <el-form ref="form" :model="form" status-icon label-width="150px" size="mini" label-position="right">
        <el-form-item label="标题:">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="分类:" class="form-item" prop="category_id">
          <span v-show="!form.categoryValue || !form.categoryValue.length">原分类：{{form.category_title}}</span>
          <el-cascader v-model="form.categoryValue" :options="categoryList" clearable placeholder="选择新分类" change-on-select :props="{value:'id',label:'title',children:'children'}" size="mini" class="column-selection" @change="currentPaging.currentPage = 1;getData()">
          </el-cascader>
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
              <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="form-control-btn">
          <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">提交</el-button>
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

import { carouselList,editCarousel } from "@/api/carousel/carousel";
import { getCategoryList } from "@/api/category/category";

/* 轮播图列表 */
export default {
  name: "CarouselList",
  data() {
    return {
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
      //表格loading
      table_loading: false,
      //分类列表
      categoryList: [],
      categoryValue: [],
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
      subLoading: false
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
  },
  methods: {
    //获取表格信息
    getData() {
      let data = {
        page: this.currentPaging.currentPage,
        size: this.currentPaging.pageSize,
        keyword: this.titleSearchValue,
        type:this.type,
        category_id: this.categoryValue[this.categoryValue.length - 1]
      };
      this.table_loading = true;
      carouselList(data).then(res => {
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
    //获取分类列表
    getCategory() {
      let data = {
        page: 0,
        tree: 1
      };
      getCategoryList(data).then(res => {
        if (res.data.code == 200 || res.data.code == 404) {
          this.categoryList = res.data.data.list;
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
    //表单提交(编辑)
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        that.subLoading = true;
        if (valid) {
          let data = {
            id:that.form.id,
            title:that.form.title,
            category_id:that.form.categoryValue || that.form.categoryValue.length?that.form.categoryValue[that.form.categoryValue.length-1]: that.form.category_id,
            image_id:that.form.image_id,
            link:that.form.link,
            // sort:that.form.sort,
            type:that.form.type
          }
          editCarousel(data).then(res => {
            that.subLoading = false;
            if (res.data.code == 200) {
              that.$message.success("修改成功");
              that.editDialog = false;
              that.getData()
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
