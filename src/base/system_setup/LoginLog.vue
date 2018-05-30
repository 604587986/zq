<template>
  <div id="LoginLog">
    <!-- 内层菜单 -->
    <InnerMenu :innerMenu="innerMenu"></InnerMenu>
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <el-select v-model="site_value" clearable placeholder="所属站点" size="mini" class="float-left column-selection">
          <el-option v-for="item in site_list" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="user_group_value" clearable placeholder="用户组" size="mini" class="float-left column-selection">
          <el-option v-for="item in user_group_list" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="user_value" clearable placeholder="用户" size="mini" class="float-left state-selection">
          <el-option v-for="item in user_list" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
          <el-table-column prop="uid" label="ID" width="50"></el-table-column>
          <el-table-column prop="user_name" label="用户名"></el-table-column>
          <el-table-column prop="site" label="所属站点"></el-table-column>
          <el-table-column prop="date" label="时间"></el-table-column>
          <el-table-column prop="equipment_information" label="设备信息"></el-table-column>
          <el-table-column prop="state" label="状态"></el-table-column>
          <el-table-column prop="remarks" label="备注"></el-table-column>
        </el-table>
      </div>
      <!-- 表格控制 -->
      <div class="table-filter">
        <el-button type="primary" size="mini" @click="clear_log()">清空日志</el-button>
        <span class="log-item-info float-left">最近30天的日志不能删除</span>
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
import InnerMenu from "@/components/InnerMenu";
/* 添加站点 */
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
        },
        {
          name: "登陆日志",
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
      //内层菜单
      innerMenu: {
        system: true,
        list: [
          {
            name: "登陆日志",
            url: "",
            list_active: true
          },
          {
            name: "操作日志",
            url: "",
            list_active: false
          },
          {
            name: "搜索日志",
            url: "",
            list_active: false
          },
          {
            name: "文件改动扫描",
            url: "",
            list_active: false
          }
        ]
      },
      //提交按钮loading
      subLoading: false,
      //按站点
      site_list: [
        {
          value: 0,
          label: "学院官网"
        },
        {
          value: 1,
          label: "教务处"
        }
      ],
      site_value: "",
      //用户组
      user_group_list: [
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
      user_group_value: "",
      //用户
      user_list: [
        {
          value: 0,
          label: "admin"
        },
        {
          value: 2,
          label: "jwc"
        }
      ],
      user_value: "",
      //表格
      tableInfo: [
        {
          uid: 2,
          user_name: "admin",
          site: "学院官网",
          date: "2017-02-20",
          equipment_information: "./images/test1.jpg",
          state: "成功",
          remarks: ""
        },
        {
          uid: 1,
          user_name: "jwc",
          site: "学院官网",
          date: "2017-02-20",
          equipment_information: "./images/test1.jpg",
          state: "失败",
          remarks: "用户名错误"
        }
      ]
    };
  },
  components: {
    Crumb,
    InnerMenu,
    Instructions,
    Paging
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 6);
    this.$store.commit("update_system_menu_idx", 6);
  },
  methods: {
    //批量删除
    clear_log() {
      this.$confirm("此操作将清空日志, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "清空成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消清空"
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../assets/css/less_config";
#LoginLog {
  .log-item-info {
    font-size: 14px;
    display: block;
    line-height: 28px;
    margin-left: 10px;
    color: @text-color;
  }
}
</style>
