<template>
  <div id="UserList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <router-link to="/pages/system_administrators/System_Administrators/AddUser" class="float-left filter-link">
          <el-button size="mini" type="primary">添加用户</el-button>
        </router-link>
        <el-input placeholder="请输入关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="articleSearch()"></el-button>
        </el-input>
      </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
          <el-table-column prop="uid" label="ID" width="50"></el-table-column>
          <el-table-column prop="uesr_name" label="登录用户名"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="user_group" label="用户组"></el-table-column>
          <el-table-column prop="subordinateDepartmentValue" label="所属部门"></el-table-column>
          <el-table-column prop="site" label="管理站点"></el-table-column>
          <el-table-column prop="count" label="登陆次数"></el-table-column>
          <el-table-column prop="ip" label="最后一次登录IP" width="120"></el-table-column>
          <el-table-column prop="state" label="状态"></el-table-column>
          <el-table-column label="操作" width="130">
            <div slot-scope="scope" class="control-btn">
              <el-button size="mini">更改</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableInfo)" size="mini" class="control-btn-del">删除</el-button>
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
/* 用户列表 */
export default {
  name: "UserList",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "权限管理",
          url: ""
        },
        {
          name: "用户管理",
          url: ""
        },
        {
          name: "用户列表",
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
      //栏目检索
      titleSearchValue: "",
      //表格
      tableInfo: [
        {
          uid: 1,
          uesr_name: "admin",
          name: "乔立",
          user_group: "系统管理员",
          subordinateDepartmentValue: "网络中心",
          site: "站群主页",
          count: 115,
          ip: "115.192.201.17",
          state: "启用"
        },
        {
          uid: 2,
          uesr_name: "jwc",
          name: "赵老师",
          user_group: "分站管理员",
          subordinateDepartmentValue: "教务处",
          site: "教务处",
          count: 52,
          ip: "115.193.158.234",
          state: "启用"
        },
        {
          uid: 3,
          uesr_name: "jwc02",
          name: "李刚",
          user_group: "编辑",
          subordinateDepartmentValue: "教务处",
          site: "教务处",
          count: 32,
          ip: "192.168.199.221",
          state: "关闭"
        }
      ],
      tableList: []
    };
  },
  components: {
    Crumb,
    Instructions,
    Paging
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 5);
    this.$store.commit("update_system_menu_idx", 5);
  },
  methods: {
    //检索
    articleSearch() {},
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
