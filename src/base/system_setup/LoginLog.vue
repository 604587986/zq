<template>
  <div id="LoginLog">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
          <el-select v-model="typeValue" placeholder="日志类型" size="mini" class="float-left state-selection" @change="currentPaging.currentPage = 1;getData();">
              <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-model="siteValue" placeholder="站点" size="mini" class="float-left state-selection" @change="currentPaging.currentPage = 1;getData();">
              <el-option v-for="item in siteList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
      </div>
      <!-- 表格 -->
      <div class="table-body">
          <el-table ref="multipleTable" :data="tableInfo" stripe size="small" v-loading="table_loading" element-loading-text="数据载入中">
              <el-table-column prop="id" label="ID"></el-table-column>
              <el-table-column prop="user_id" label="操作人"></el-table-column>
              <el-table-column prop="time" label="操作时间"></el-table-column>
              <el-table-column label="设备信息" width="260">
                <div slot-scope="scope">
                  <el-row>
                    操作IP：{{scope.row.ipv4}}
                  </el-row>
                  <el-row>
                    操作地点：{{scope.row.addr}}                    
                  </el-row>
                  <el-row>
                    操作系统：{{scope.row.ua_os}} 
                  </el-row>
                  <el-row>
                    浏览器：{{scope.row.ua_browser}} 
                  </el-row>
                </div>
              </el-table-column>
              <el-table-column prop="site_id" label="所属站点"></el-table-column>              
              <el-table-column prop="type" label="日志类型">
                <div slot-scope="scope">
                  <el-tag type="success" v-show="scope.row.type==1">操作日志</el-tag>
                  <el-tag type="success" v-show="scope.row.type==11">登录日志</el-tag>
                  <el-tag type="success" v-show="scope.row.type==21">文章日志</el-tag>
                </div>
              </el-table-column>              
              <el-table-column prop="data" label="操作接口"></el-table-column>              
              <el-table-column prop="ext" label="参数" width="300"></el-table-column>              
          </el-table>
      </div>
      <el-row>
        <el-col><el-button type="primary" size="mini" @click="clear">清空日志</el-button></el-col>
        <el-col class="notice">最近30天的日志不能清空</el-col>
      </el-row>
      <!-- 分页 -->
      <Paging :currentPaging="currentPaging" v-on="{sizeChange:handleSizeChange,currentChange:handleCurrentChange}"></Paging>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Paging from "@/components/Paging";

import { logList, clearLog } from "@/api/log/log";
import { getSiteList } from "@/api/site_management/SiteList";


export default {
  name: "LoginLog",
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
          name: "系统日志",
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
      //提交按钮loading
      subLoading: false,
      // 表格loading
      table_loading: false,
      //日志类型
      typeValue: 1,
      typeList: [
        { value: 1, label: "操作日志" },
        { value: 11, label: "登录日志" },
        { value: 21, label: "文章日志" }
      ],
      //表格
      tableInfo: [],
            //站点列表
      siteList: [],
      siteValue:''
    };
  },
  components: {
    Crumb,
    Paging
  },
  mounted: function() {
    this.getData();
        //获取站点列表
    this.getSite();
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 6);
    this.$store.commit("update_system_menu_idx", 6);
  },
  methods: {
    //获取日志列表
    getData() {
      let data = {
        page: this.currentPaging.currentPage,
        size: this.currentPaging.pageSize,
        type: this.typeValue,
        site_id:this.siteValue
      };
      this.table_loading = true;
      logList(data).then(res => {
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

    //清空日志
    clear() {
      this.$confirm("此操作将清空大于30天的日志, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          clearLog().then(res => {
            if (res.data.result == "success") {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: "操作失败"
              });
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
    //获取站点列表
    getSite() {
      let data = {
        page: 0
      };
      getSiteList(data).then(res => {
        if (res.data.code == 200 || res.data.code == 404) {
          this.siteList = res.data.data.list;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#LoginLog {
  .notice {
    font-size: 14px;
    color: #888;
  }
}
</style>
