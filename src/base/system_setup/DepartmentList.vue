<template>
  <div id="DepartmentList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <router-link to="/pages/system_administrators/System_Administrators/AddDepartment" class="float-left filter-link">
          <el-button size="mini" type="primary">添加部门</el-button>
        </router-link>
        <router-link to="/pages/system_administrators/System_Administrators/AddDepartmentcClassif" class="float-left filter-link">
          <el-button size="mini" type="primary">添加部门分类</el-button>
        </router-link>
        <el-input placeholder="请输入关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="articleSearch()"></el-button>
        </el-input>
      </div>
      <!-- 表格 -->
      <div class="table-body column-container">
        <el-table :data="column_list" stripe size="small">
          <el-table-column prop="uid" label="ID" width="65"></el-table-column>
          <el-table-column label="显示子类" type="expand" width="100">
            <div slot-scope="props">
              <el-table :data="props.row.leavel2" stripe size="mini" class="second-table">
                <el-table-column prop="uid" width="65"></el-table-column>
                <el-table-column type="expand" width="100">
                  <div slot-scope="props">
                    <el-table :data="props.row.leavel3" stripe size="mini" class="third-table">
                      <el-table-column prop="uid" width="65"></el-table-column>
                      <el-table-column width="100" disabled="true"></el-table-column>
                      <el-table-column prop="column_title"></el-table-column>
                      <el-table-column prop="code" width="80"></el-table-column>
                      <el-table-column prop="type"></el-table-column>
                      <el-table-column prop="leavel" width="80"></el-table-column>
                      <el-table-column width="60">
                        <div slot-scope="scope" class="table-sort-input">
                          <el-input type="text" size="mini" @blur="sortBlur(scope.$index, column_list)" :value="scope.row.sort"></el-input>
                        </div>
                      </el-table-column>
                      <el-table-column width="220">
                        <div slot-scope="scope" class="control-btn">
                          <el-button size="small">添加子类</el-button>
                          <el-button size="small">编辑</el-button>
                          <el-button @click.native.prevent="deleteRow(scope.$index, column_list)" size="small" class="control-btn-del">删除</el-button>
                        </div>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-table-column>
                <el-table-column prop="column_title"></el-table-column>
                <el-table-column prop="code" width="80"></el-table-column>
                <el-table-column prop="type"></el-table-column>
                <el-table-column prop="leavel" width="80"></el-table-column>
                <el-table-column width="60">
                  <div slot-scope="scope" class="table-sort-input">
                    <el-input type="text" size="mini" @blur="sortBlur(scope.$index, column_list)" :value="scope.row.sort"></el-input>
                  </div>
                </el-table-column>
                <el-table-column width="220">
                  <div slot-scope="scope" class="control-btn">
                    <el-button size="small">添加子类</el-button>
                    <el-button size="small">编辑</el-button>
                    <el-button @click.native.prevent="deleteRow(scope.$index, column_list)" size="small" class="control-btn-del">删除</el-button>
                  </div>
                </el-table-column>
              </el-table>
            </div>
          </el-table-column>
          <el-table-column prop="column_title" label="部门名称"></el-table-column>
          <el-table-column prop="code" label="编码" width="80"></el-table-column>
          <el-table-column prop="type" label="所属类别"></el-table-column>
          <el-table-column prop="leavel" label="级别" width="80"></el-table-column>
          <el-table-column label="排序" width="60">
            <div slot-scope="scope" class="table-sort-input">
              <el-input type="text" size="mini" @blur="sortBlur(scope.$index, column_list)" :value="scope.row.sort"></el-input>
            </div>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <div slot-scope="scope" class="control-btn">
              <el-button size="small">添加子类</el-button>
              <el-button size="small">编辑</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, column_list)" size="small" class="control-btn-del">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <Paging></Paging>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Paging from "@/components/Paging";
import Instructions from "@/components/Instructions";
/* 部门列表 */
export default {
  name: "DepartmentList",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "系统设置",
          url: ""
        },
        {
          name: "部门管理",
          url: ""
        },
        {
          name: "部门列表",
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
      //菜单检索
      titleSearchValue: "",
      //表格
      column_list: []
    };
  },
  components: {
    Crumb,
    Instructions,
    Paging
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 6);
    this.$store.commit("update_system_menu_idx", 6);
    //获取表格数据
    var that = this;
    this.$http({
      method: "get",
      url: "./static/mock/department_list.json"
    })
      .then(function(response) {
        that.column_list = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    //删除表格行
    deleteRow(index, rows) {
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          rows.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //表格排序
    sortBlur(a, b) {
      console.log(b[a].uid);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
