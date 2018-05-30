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
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
          <el-table-column prop="uid" label="序号" width="50"></el-table-column>
          <el-table-column prop="title" label="站点名称" width="150"></el-table-column>
          <el-table-column prop="category" label="类别" width="80"></el-table-column>
          <el-table-column prop="code" label="编码" width="60"></el-table-column>
          <el-table-column prop="alias" label="别名" width="60"></el-table-column>
          <el-table-column prop="domain_name" label="域名" width="120"></el-table-column>
          <el-table-column prop="date" label="创建时间" width="90"></el-table-column>
          <el-table-column prop="state" label="状态" width="60"></el-table-column>
          <el-table-column label="排序" width="50">
            <div slot-scope="scope" class="table-sort-input">
              <el-input type="text" size="mini" @blur="sortBlur(scope.$index, tableInfo)" :value="scope.row.count"></el-input>
            </div>
          </el-table-column>
          <el-table-column label="操作" width="500" fixed="right">
            <div slot-scope="scope" class="control-btn">
              <el-button size="mini">
                <router-link :to="scope.row.url">访问</router-link>
              </el-button>
              <el-button size="mini">切换</el-button>
              <el-button size="mini">编辑</el-button>
              <el-button size="mini">更新缓存</el-button>
              <el-button size="mini">数据备份</el-button>
              <el-button size="mini">数据恢复</el-button>
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
          uid: 0,
          title: "中国美术学院",
          category: "机关单位",
          code: 9104,
          alias: "caa",
          domain_name: "www.caa.edu.cn",
          date: "2017-02-20",
          state: "正常",
          count: 1,
          url: "javascript:void(0);"
        },
        {
          uid: 1,
          title: "教务处",
          category: "机关单位",
          code: 9109,
          alias: "caa",
          domain_name: "jwc.caa.edu.cn",
          date: "2017-02-20",
          state: "正常",
          count: 2,
          url: "javascript:void(0);"
        },
        {
          uid: 2,
          title: "党院办",
          category: "机关单位",
          code: 9104,
          alias: "caa",
          domain_name: "www.caa.edu.cn",
          date: "2017-02-20",
          state: "正常",
          count: 1,
          url: "javascript:void(0);"
        },
        {
          uid: 3,
          title: "组织人事部",
          category: "机关单位",
          code: 9109,
          alias: "caa",
          domain_name: "jwc.caa.edu.cn",
          date: "2017-02-20",
          state: "正常",
          count: 2,
          url: "javascript:void(0);"
        },
        {
          uid: 4,
          title: "纪监审办公室",
          category: "机关单位",
          code: 9104,
          alias: "caa",
          domain_name: "www.caa.edu.cn",
          date: "2017-02-20",
          state: "正常",
          count: 1,
          url: "javascript:void(0);"
        },
        {
          uid: 5,
          title: "宣传部",
          category: "机关单位",
          code: 9109,
          alias: "caa",
          domain_name: "jwc.caa.edu.cn",
          date: "2017-02-20",
          state: "正常",
          count: 2,
          url: "javascript:void(0);"
        },
        {
          uid: 6,
          title: "研究生工作部",
          category: "机关单位",
          code: 9104,
          alias: "caa",
          domain_name: "www.caa.edu.cn",
          date: "2017-02-20",
          state: "正常",
          count: 1,
          url: "javascript:void(0);"
        },
        {
          uid: 7,
          title: "学生工作部",
          category: "机关单位",
          code: 9109,
          alias: "caa",
          domain_name: "jwc.caa.edu.cn",
          date: "2017-02-20",
          state: "正常",
          count: 2,
          url: "javascript:void(0);"
        },
        {
          uid: 8,
          title: "网络中心",
          category: "机关单位",
          code: 9104,
          alias: "caa",
          domain_name: "www.caa.edu.cn",
          date: "2017-02-20",
          state: "正常",
          count: 1,
          url: "javascript:void(0);"
        },
        {
          uid: 9,
          title: "发展规划与学科建设处",
          category: "机关单位",
          code: 9109,
          alias: "caa",
          domain_name: "jwc.caa.edu.cn",
          date: "2017-02-20",
          state: "正常",
          count: 2,
          url: "javascript:void(0);"
        },
        {
          uid: 10,
          title: "招生办公室",
          category: "机关单位",
          code: 9104,
          alias: "caa",
          domain_name: "www.caa.edu.cn",
          date: "2017-02-20",
          state: "正常",
          count: 1,
          url: "javascript:void(0);"
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
    sessionStorage.setItem("system_menu_idx", 1);
    this.$store.commit("update_system_menu_idx", 1);
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
