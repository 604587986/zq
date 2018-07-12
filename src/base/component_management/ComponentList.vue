<template>
  <div id="ComponentList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <router-link to="/pages/system_administrators/System_Administrators/AddComponent" class="float-left filter-link">
          <el-button size="mini" type="primary">添加组件</el-button>
        </router-link>
        <el-input placeholder="请输入关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="articleSearch()"></el-button>
        </el-input>
      </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
          <el-table-column prop="uid" label="ID" width="50"></el-table-column>
          <el-table-column prop="title" label="组件名称" width="160"></el-table-column>
          <el-table-column prop="date" label="发布时间" width="100"></el-table-column>
          <el-table-column prop="team" label="开发团队" width="100"></el-table-column>
          <el-table-column prop="code" label="编码" width="100"></el-table-column>
          <el-table-column prop="category" label="类型" width="100"></el-table-column>
          <el-table-column prop="state" label="状态" width="100"></el-table-column>
          <el-table-column label="排序" width="50">
            <div slot-scope="scope" class="table-sort-input">
              <el-input type="text" size="mini" @blur="sortBlur(scope.$index, tableInfo)" :value="scope.row.count"></el-input>
            </div>
          </el-table-column>
          <el-table-column label="操作">
            <div slot-scope="scope" class="control-btn">
              <el-button size="mini" v-if="scope.row.state_value">卸载</el-button>
              <el-button size="mini" v-else>安装</el-button>
              <el-button size="mini">授权</el-button>
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
/* 组件列表 */
export default {
  name: "ComponentList",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "组件管理",
          url: ""
        },
        {
          name: "组件列表",
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
      tableInfo: [
        {
          uid: 1,
          title: "党员生日",
          team: "启焕科技",
          category: "组件",
          code: "UTF8",
          date: "2017-02-20",
          state: "已安装",
          state_value: true,
          count: 1
        },
        {
          uid: 2,
          title: "纪委举报",
          team: "启焕科技",
          category: "组件",
          code: "UTF8",
          date: "2017-02-20",
          state: "已安装",
          state_value: true,
          count: 2
        },
        {
          uid: 3,
          title: "活动预告",
          team: "启焕科技",
          category: "组件",
          code: "UTF8",
          date: "2017-02-20",
          state: "已安装",
          state_value: true,
          count: 3
        },
        {
          uid: 4,
          title: "轮播图",
          team: "启焕科技",
          category: "组件",
          code: "UTF8",
          date: "2017-02-20",
          state: "已安装",
          state_value: true,
          count: 4
        },
        {
          uid: 5,
          title: "友情链接",
          team: "启焕科技",
          category: "组件",
          code: "UTF8",
          date: "2017-02-20",
          state: "已安装",
          state_value: true,
          count: 5
        },
        {
          uid: 6,
          title: "留言反馈",
          team: "启焕科技",
          category: "组件",
          code: "UTF8",
          date: "2017-02-20",
          state: "已安装",
          state_value: true,
          count: 6
        },
        {
          uid: 7,
          title: "微信登录",
          team: "腾讯科技",
          category: "第三方组件",
          code: "GBK UTF8",
          date: "2017-02-20",
          state: "未安装",
          state_value: false,
          count: 7
        },
        {
          uid: 8,
          title: "支付宝登录",
          team: "蚂蚁金服",
          category: "第三方组件",
          code: "GBK UTF8",
          date: "2017-02-20",
          state: "未安装",
          state_value: false,
          count: 8
        },
        {
          uid: 9,
          title: "漂浮图标",
          team: "启焕科技",
          category: "组件",
          code: "UTF8",
          date: "2017-02-20",
          state: "已安装",
          state_value: true,
          count: 9
        },
        {
          uid: 10,
          title: "教师风采",
          team: "启焕科技",
          category: "组件",
          code: "UTF8",
          date: "2017-02-20",
          state: "已安装",
          state_value: true,
          count: 10
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
    sessionStorage.setItem("system_menu_idx", 3);
    this.$store.commit("update_system_menu_idx", 3);
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
