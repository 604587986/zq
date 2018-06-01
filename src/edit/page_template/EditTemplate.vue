<template>
  <div id="EditTemplate">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="table-container">
      <div style="font-size:24px">模板名称：大学典雅蓝风格</div>
      <!-- 表格 -->
      <div class="table-body">
          <el-table ref="multipleTable" :data="tableInfo" stripe size="small" @selection-change="handleSelectionChange">
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="uid" label="ID"></el-table-column>
              <el-table-column prop="title" label="模板名称" resizable></el-table-column>
              <el-table-column prop="type" label="类别"></el-table-column>
              <el-table-column prop="state" label="状态">
                  <div slot-scope="scope">
                      <el-tag close-transition :class="scope.row.stateClass" size="mini">{{scope.row.state}}</el-tag>
                  </div>
              </el-table-column>
              <el-table-column prop="people" label="创建人"></el-table-column>
              <el-table-column prop="date" label="创建日期"></el-table-column>
              <el-table-column label="操作">
                  <div slot-scope="scope" class="control-btn">
                      <el-button size="small">预览</el-button>
                      <router-link to="/pages/editor/editor/update_template"><el-button size="small">编辑</el-button></router-link>
                      <el-button size="small" class="control-btn-del">删除</el-button>
                  </div>
              </el-table-column>
          </el-table>
      </div>
      <!-- 表格筛选 -->
      <div class="table-filter">
          <el-button type="primary" size="mini" @click="selection(tableInfo)">全选</el-button>
          <el-button type="primary" size="mini">批量删除</el-button>
      </div>
      <!-- 分页 -->
      <!-- <Paging></Paging> -->
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Instructions from "@/components/Instructions";
/* 添加用户 */
export default {
  name: "EditTemplate",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "编辑模板",
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
      //选择发布状态
      stateSelection: [
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
      //选择栏目
      columnSelection: [
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
      columnSelectionValue: "",
      //搜索关键字
      titleSearchValue: "",
      //表格数据
      tableInfo: [
        {
          uid: 0,
          title: "首页",
          type: "首页",
          people:'张三',
          date: "2017-02-20",
          state: "启用",
        },
        {
          uid: 0,
          title: "首页",
          type: "首页",
          people:'张三',
          date: "2017-02-20",
          state: "启用",
        },
        {
          uid: 0,
          title: "首页",
          type: "首页",
          people:'张三',
          date: "2017-02-20",
          state: "启用",
        },
        {
          uid: 0,
          title: "首页",
          type: "首页",
          people:'张三',
          date: "2017-02-20",
          state: "启用",
        },
      ],
      //用于全选
      tableList: []
    };
  },
  components: {
    Crumb,
    Instructions
  },
  mounted: function() {},
  methods: {
    //表单提交
    submitForm(formName) {},
    //选中的时候触发
    handleSelectionChange(val) {
      this.tableList = [];
      for (let i in val) {
        this.tableList.push(val[i].id);
      }
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
