<template>
  <div id="SiteList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <router-link to="/pages/system_administrators/System_Administrators/AddSite" class="float-left filter-link">
          <el-button size="mini" type="primary">添加站点</el-button>
        </router-link>
        <el-input placeholder="请输入关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="articleSearch()"></el-button>
        </el-input>
      </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small" v-loading="table_loading" element-loading-text="数据载入中">
          <el-table-column prop="id" label="序号" width="50"></el-table-column>
          <el-table-column prop="title" label="站点名称" width="150"></el-table-column>
          <!-- <el-table-column prop="category" label="类别" width="80"></el-table-column> -->
          <el-table-column prop="code" label="编码" width="60"></el-table-column>
          <el-table-column prop="alias" label="别名" width="60"></el-table-column>
          <el-table-column prop="domain" label="域名" width="120"></el-table-column>
          <el-table-column prop="create_time" label="创建时间" width="90"></el-table-column>
          <el-table-column prop="state" label="状态" width="60">
            <div slot-scope="scope">
              <el-tag v-if="scope.row.state == -1">关闭</el-tag>
              <el-tag v-if="scope.row.state == 0">建设中</el-tag>
              <el-tag v-if="scope.row.state == 1">正常</el-tag>
            </div>
          </el-table-column>
          <el-table-column label="排序" width="50">
            <div slot-scope="scope" class="table-sort-input">
              <el-input type="text" size="mini" @blur="sortBlur(scope.$index, tableInfo)" :value="scope.row.sort"></el-input>
            </div>
          </el-table-column>
          <el-table-column label="操作" width="500" resizable>
            <div slot-scope="scope" class="control-btn">
              <el-button size="mini" @click="visit(scope.row.domain)">访问</el-button>
              <el-button size="mini" @click="change(scope.row.id)">切换</el-button>
              <router-link :to="{path:'/pages/system_administrators/System_Administrators/EditSite',query:{id:scope.row.id}}"><el-button size="mini">编辑</el-button></router-link>
              <el-button size="mini" @click="update(scope.row.id)">更新缓存</el-button>
              <el-button size="mini" @click="backup(scope.row.id)">数据备份</el-button>
              <el-button size="mini" @click="recover(scope.row.id)">数据恢复</el-button>
              <el-button size="mini" @click="del(scope.row.uid)" class="control-btn-del">删除</el-button>
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

import { getSiteList } from "@/api/site_management/SiteList";

/* 站点列表 */
export default {
  name: "SiteList",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "站点管理",
          url: ""
        },
        {
          name: "站点列表",
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
      //表格loading
      table_loading:false,
      //栏目检索
      titleSearchValue: "",
      //表格
      tableInfo: [],
      tableList: []
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
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 1);
    this.$store.commit("update_system_menu_idx", 1);
  },
  methods: {
    //获取站点列表
    getData() {
      let data = {
        page:this.currentPaging.currentPage,
        size:this.currentPaging.pageSize,
        keyword:this.titleSearchValue
      };
      this.table_loading = true;      
      getSiteList(data).then(res => {
        if (res.data.code == 200) {
          this.tableInfo = res.data.data.list;
          this.currentPaging.totals = res.data.data.count
          this.table_loading = false;
        }else{
          this.table_loading = false;
          this.$message.error(res.data.message)
        }
      });
    },
    //访问
    visit(url) {
      window.open("//" + url);
    },
    //切换
    change(id) {
      this.$message("切换：" + id);
    },
    //更新缓存
    update(id) {
      this.$message("更新缓存：" + id);
    },
    //数据备份
    backup(id) {
      this.$message("数据备份：" + id);
    },
    //数据恢复
    recover(id) {
      this.$message("数据恢复：" + id);
    },
    //删除
    del(id) {
      this.$message("删除：" + id);
    },
    //检索
    articleSearch() {},
    //处理sizeChange
    handleSizeChange(val) {
      this.currentPaging.pageSize = val;
      this.currentPaging.currentPage = 1;
      this.getData()
    },
    //处理currentChange
    handleCurrentChange(val) {
      this.currentPaging.currentPage = val;
      this.getData()      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
