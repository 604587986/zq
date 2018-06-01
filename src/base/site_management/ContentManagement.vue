<template>
  <div id="ContentManagement">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <el-select v-model="siteListValue" clearable placeholder="选择站点" size="mini" class="float-left state-selection">
          <el-option v-for="item in siteList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="stateValue" clearable placeholder="发布状态" size="mini" class="float-left state-selection">
          <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="columnListValue" clearable placeholder="栏目" size="mini" class="float-left column-selection">
          <el-option v-for="item in columnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-input placeholder="请输入关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="articleSearch()"></el-button>
        </el-input>
      </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small" @selection-change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="uid" label="ID" width="50"></el-table-column>
          <el-table-column prop="title" label="标题" width="250"></el-table-column>
          <el-table-column prop="column" label="栏目" width="80"></el-table-column>
          <el-table-column prop="site" label="所属站点" width="130"></el-table-column>
          <el-table-column prop="state" label="发布状态" width="80">
            <div slot-scope="scope">
              <el-tag close-transition :class="scope.row.stateClass" size="mini">{{scope.row.state}}</el-tag>
            </div>
          </el-table-column>
          <el-table-column prop="date" label="创建日期" width="100"></el-table-column>
          <el-table-column prop="author" label="创建人" width="85"></el-table-column>
          <el-table-column prop="count" label="浏览次数" width="70"></el-table-column>
          <el-table-column label="操作" width="250" fixed="right">
            <div slot-scope="scope" class="control-btn">
              <el-button size="small">访问</el-button>
              <el-button size="small">审核</el-button>
              <el-button size="small">编辑</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableInfo)" size="small" class="control-btn-del">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
      <!-- 表格控制 -->
      <div class="table-filter">
        <el-button type="primary" size="mini" @click="selection(tableInfo)">全选</el-button>
        <el-button type="primary" size="mini" @click="batchDeleting()">批量删除</el-button>
        <el-button type="primary" size="mini">批量审核</el-button>
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
/* 内容管理 */
export default {
  name: "ContentManagement",
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
          name: "内容管理",
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
      //选择站点
      siteList: [
        {
          value: 0,
          label: "9401中国美术学院"
        }
      ],
      siteListValue: "",
      //选择栏目
      columnList: [
        {
          value: 0,
          label: "学术交流"
        },
        {
          value: 1,
          label: "通知公告"
        },
        {
          value: 2,
          label: "下载中心"
        },
        {
          value: 3,
          label: "联系我们"
        }
      ],
      columnListValue: "",
      //选择发布状态
      stateList: [
        {
          value: 0,
          label: "已发"
        },
        {
          value: 1,
          label: "待审"
        },
        {
          value: 2,
          label: "草稿"
        }
      ],
      stateValue: "",
      //栏目检索
      titleSearchValue: "",
      //表格
      tableInfo: [
        {
          uid: 0,
          title: "郎朗独奏音乐会",
          column: "学术交流",
          date: "2017-02-20",
          author: "吴晓棣",
          state: "已发",
          stateClass: "state1",
          count: "56",
          site: "9401中国美术学院"
        },
        {
          uid: 1,
          title: "中国美术学院工会工作奖励和配套资助办法",
          column: "学术交流",
          date: "2017-02-20",
          author: "吴晓棣",
          state: "已发",
          stateClass: "state1",
          count: "656",
          site: "9401中国美术学院"
        },
        {
          uid: 2,
          title: "中国美术学院举行纪念建团95周年活动",
          column: "学术交流",
          date: "2017-02-20",
          author: "吴晓棣",
          state: "待审",
          stateClass: "state2",
          count: "1",
          site: "9401中国美术学院"
        },
        {
          uid: 3,
          title: "“治水最前线”中国美术学院下乡创作实践展开幕",
          column: "联系我们",
          date: "2017-02-20",
          author: "吴晓棣",
          state: "已发",
          stateClass: "state1",
          count: "684",
          site: "9401中国美术学院"
        },
        {
          uid: 4,
          title: "「民族翰骨——潘天寿诞辰120年纪念大展」在中国美术馆开幕",
          column: "联系我们",
          date: "2017-02-20",
          author: "吴晓棣",
          state: "草稿",
          stateClass: "state3",
          count: "78",
          site: "9401中国美术学院"
        },
        {
          uid: 5,
          title: "纪念潘天寿诞辰120周年座谈会举行 刘延东出席并讲话",
          column: "通知公告",
          date: "2017-02-20",
          author: "吴晓棣",
          state: "待审",
          stateClass: "state2",
          count: "5",
          site: "9401中国美术学院"
        },
        {
          uid: 6,
          title: "中国美术学院第八届教代会、第十六届工代会第三次会议隆重举行",
          column: "下载中心",
          date: "2017-02-20",
          author: "吴晓棣",
          state: "草稿",
          stateClass: "state3",
          count: "875",
          site: "9401中国美术学院"
        },
        {
          uid: 7,
          title: "中国美术学院2017-2018年教职工蛋糕（券）供应商",
          column: "通知公告",
          date: "2017-02-20",
          author: "吴晓棣",
          state: "已发",
          stateClass: "state1",
          count: "54",
          site: "9401中国美术学院"
        },
        {
          uid: 8,
          title: "中国美术学院民艺博物馆物业服务项目预中标公告",
          column: "下载中心",
          date: "2017-02-20",
          author: "吴晓棣",
          state: "已发",
          stateClass: "state1",
          count: "0",
          site: "9401中国美术学院"
        },
        {
          uid: 9,
          title: "中国美术学院2017年接受国内访问学者简章",
          column: "通知公告",
          date: "2017-02-20",
          author: "吴晓棣",
          state: "已发",
          stateClass: "state1",
          count: "1456",
          site: "9401中国美术学院"
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
    //处理sizeChange
    handleSizeChange(val) {
      this.currentPaging.pageSize = val;
      this.currentPaging.currentPage = 1;
    },
    //处理currentChange
    handleCurrentChange(val) {
      this.currentPaging.currentPage = val;
    },
    //选中的时候触发
    handleSelectionChange(val) {
      this.tableList = val;
      //console.log(val[0].uid)
      //this.tableInfo.splice(val.uid, 1)
      //console.log(this.tableList)
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
    //批量删除
    batchDeleting() {
      for (var i = 0; i < this.tableList.length; i++) {
        //console.log(this.tableList[i].uid)
      }
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
