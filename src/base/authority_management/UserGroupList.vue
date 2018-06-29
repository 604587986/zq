<template>
  <div id="UserGroupList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <router-link to="/pages/system_administrators/System_Administrators/AddUserGroup" class="float-left filter-link">
          <el-button size="mini" type="primary">添加用户组</el-button>
        </router-link>
        <el-input placeholder="请输入关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="currentPaging.currentPage = 1;getData()"></el-button>
        </el-input>
      </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
          <el-table-column label="相应权限" type="expand" width="200">
              <div slot-scope="scope">
                  <el-tag v-for="item in toArray(scope.row.privilege)" :key="item.item">{{toTitle(item)}}</el-tag>
              </div>
          </el-table-column>
          <el-table-column prop="id" label="ID" width="50"></el-table-column>
          <el-table-column prop="title" label="用户组名"></el-table-column>
          <el-table-column prop="level" label="级别"></el-table-column>
          <!-- <el-table-column prop="date" label="添加时间"></el-table-column>
          <el-table-column prop="state" label="状态"></el-table-column> -->
          <el-table-column label="操作">
            <div slot-scope="scope" class="control-btn">
              <router-link :to="{path:'/pages/system_administrators/System_Administrators/EditUserGroup',query:{id:scope.row.id}}"><el-button size="mini">更改</el-button></router-link>
              <el-button size="mini" class="control-btn-del">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <Paging :currentPaging="currentPaging" v-on="{sizeChange:handleSizeChange,currentChange:handleCurrentChange}"></Paging>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Paging from "@/components/Paging";
import Instructions from "@/components/Instructions";

import { getUserGroup } from "@/api/group/group";
import { privilege } from "@/api/group/group";
/* 用户组列表 */
export default {
  name: "UserGroupList",
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
          name: "用户组管理",
          url: ""
        },
        {
          name: "用户组列表",
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
      tableInfo: [],
      tableList: [],
      //权限列表
      privilegeList: []
    };
  },
  components: {
    Crumb,
    Instructions,
    Paging
  },
  mounted: function() {
    //获取默认数据
    this.getData();
    //获取权限列表
    this.getPrivilege();
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 5);
    this.$store.commit("update_system_menu_idx", 5);
  },
  methods: {
    //获取用户组列表
    getData() {
      let data = {
        page: this.currentPaging.currentPage,
        size: this.currentPaging.pageSize,
        keyword: this.titleSearchValue
      };
      this.table_loading = true;
      getUserGroup(data).then(res => {
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
    //获取权限列表
    getPrivilege() {
      privilege().then(res => {
        if (res.data.code == 200 || res.data.code == 404) {
          this.privilegeList = res.data.data.list;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //将字符串转为数组
    toArray(str) {
      return str.split(",");
    },
    //将权限id转为对应title
    toTitle(tid) {
      for (let i in this.privilegeList) {
        if (this.privilegeList[i].id == tid) {
          return this.privilegeList[i].title;
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
