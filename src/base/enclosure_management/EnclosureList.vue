<template>
  <div id="EnclosureList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <el-select v-model="siteValue" clearable placeholder="所属站点" size="mini" class="float-left state-selection" @change="currentPaging.currentPage = 1;getData()">
          <el-option v-for="item in siteList" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
        <!-- <el-select v-model="typeValue" clearable placeholder="文件分类" size="mini" class="float-left state-selection">
          <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select> -->
        <el-input placeholder="请输入关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="currentPaging.currentPage = 1;getData()"></el-button>
        </el-input>
      </div>
      <!-- 表格 -->
      <div class="table-body carousel_container">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small" @selection-change="handleSelectionChange" v-loading="table_loading" element-loading-text="数据载入中">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column prop="title" label="文件名称" width="160"></el-table-column>
          <el-table-column prop="preview" label="预览" width="150">
            <div slot-scope="scope">
              <a :href="scope.row.url" target="_blank" v-if="scope.row.type == 1">
                <div class="carousel-img">
                  <img :src="format(scope.row.url,'/128')"/>
                </div>
              </a>
              <div v-else>
                <a :href="scope.row.url" target="_blank">{{scope.row.title}}</a>
              </div>
            </div>
          </el-table-column>
          <el-table-column label="文件大小" width="80">
            <div slot-scope="scope">
              {{scope.row.size | fileSize}}
            </div>
          </el-table-column>
          <el-table-column prop="user_title" label="上传人" width="80"></el-table-column>
          <el-table-column prop="create_time" label="添加时间" width="90"></el-table-column>
          <el-table-column prop="site_title" label="所属站点" width="100"></el-table-column>
          <el-table-column prop="ext" label="文件类型" width="70"></el-table-column>
          <el-table-column label="操作" width="130">
            <div slot-scope="scope" class="control-btn">
              <el-button size="small">更改</el-button>
              <el-button @click.native.prevent="del(scope.row.id)" size="small" class="control-btn-del">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
      <!-- 表格控制 -->
      <div class="table-filter">
        <el-button type="primary" size="mini" @click="selection(tableInfo)">全选</el-button>
        <el-button type="primary" size="mini" @click="batchDeleting()">批量删除</el-button>
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

import { formatUrl } from "@/utils";
import { getEnclosureList,deleteEnclosure } from "@/api/enclosure/EnclosureList.js";
import { getSiteList } from "@/api/site_management/SiteList";

/* 附件列表 */
export default {
  name: "EnclosureList",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "附件管理",
          url: ""
        },
        {
          name: "附件列表",
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
      table_loading: false,
      // 站点列表
      siteList: [],
      siteValue: "",
      userGroupList: [
        {
          value: 0,
          label: "系统管理员"
        },
        {
          value: 1,
          label: "分站管理员"
        },
        {
          value: 2,
          label: "编辑"
        }
      ],
      userGroupValue: "",
      typeList: [
        {
          value: 0,
          label: "图片"
        },
        {
          value: 1,
          label: "文档"
        },
        {
          value: 2,
          label: "视频"
        },
        {
          value: 3,
          label: "音频"
        }
      ],
      typeValue: "",
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
  mounted() {
    //获取默认数据
    this.getData();
    //获取站点列表
    this.getSite();
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 2);
    this.$store.commit("update_system_menu_idx", 2);
  },
  methods: {
    //获取表格数据
    getData() {
      let data = {
        site_id: this.siteValue,
        type: "",
        keyword: this.titleSearchValue,
        page: this.currentPaging.currentPage,
        size: this.currentPaging.pageSize
      };
      this.table_loading = true;
      getEnclosureList(data).then(res => {
        this.table_loading = false;
        if (res.data.code == 200 || res.data.code == 404) {
          this.tableInfo = res.data.data.list;
          this.currentPaging.totals = res.data.data.count;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //格式化图片url
    format(url, size) {
      return formatUrl(url, size);
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
    },
    //删除表格行
    del(id) {
      this.$confirm("此操作将删除该文件和文件在其他地方的引用, 请谨慎操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteEnclosure({id:id}).then(res=>{
            if(res.data.code == 200){
              this.$message.success('删除成功');
              this.getData()
            }else{
              this.$message.error(res.data.message)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
    }
  },
  filters: {
    fileSize: function(value) {
      if (null == value || value == "") {
        return "0 Bytes";
      }
      var unitArr = new Array(
        "Bytes",
        "KB",
        "MB",
        "GB",
        "TB",
        "PB",
        "EB",
        "ZB",
        "YB"
      );
      var index = 0;
      var srcsize = parseFloat(value);
      index = Math.floor(Math.log(srcsize) / Math.log(1024));
      var size = srcsize / Math.pow(1024, index);
      size = size.toFixed(2); //保留的小数位数
      return size + unitArr[index];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
