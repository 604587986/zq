<template>
  <div id="ArticeList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
          <el-select v-model="stateValue" clearable placeholder="发布状态" size="mini" class="float-left state-selection">
              <el-option v-for="item in stateSelection" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-model="columnSelectionValue" clearable placeholder="栏目" size="mini" class="float-left column-selection">
              <el-option v-for="item in columnSelection" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-input placeholder="请输入关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
              <el-button slot="append" icon="el-icon-search" @click=""></el-button>
          </el-input>
      </div>
      <!-- 表格 -->
      <div class="table-body">
          <el-table ref="multipleTable" :data="tableInfo" stripe size="small" @selection-change="handleSelectionChange">
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="uid" label="ID" width="70"></el-table-column>
              <el-table-column prop="title" label="标题" resizable></el-table-column>
              <el-table-column prop="column" label="栏目" width="100"></el-table-column>
              <el-table-column prop="state" label="发布状态" width="90" :filters="[{ text: '已发', value: '已发' }, { text: '待审', value: '待审' }, { text: '草稿', value: '草稿' }]"
                  :filter-method="filterState" filter-placement="bottom-end">
                  <div slot-scope="scope">
                      <el-tag close-transition :class="scope.row.stateClass" size="mini">{{scope.row.state}}</el-tag>
                  </div>
              </el-table-column>
              <el-table-column prop="date" label="创建日期" width="100"></el-table-column>
              <el-table-column prop="author" label="创建人" width="85"></el-table-column>
              <el-table-column prop="count" label="浏览次数" width="70"></el-table-column>
              <el-table-column label="排序" width="65">
                  <div slot-scope="scope" class="table-sort-input">
                      <el-input type="text" size="mini" @blur="sortBlur(scope.$index, tableInfo)"></el-input>
                  </div>
              </el-table-column>
              <el-table-column label="操作" width="250">
                  <div slot-scope="scope" class="control-btn">
                      <el-button size="small">预览</el-button>
                      <el-button size="small">审核</el-button>
                      <el-button size="small">编辑</el-button>
                      <el-button @click.native.prevent="deleteRow(scope.$index, tableInfo)" size="small" class="control-btn-del">删除</el-button>
                  </div>
              </el-table-column>
          </el-table>
      </div>
      <!-- 表格筛选 -->
      <div class="table-filter">
          <el-button type="primary" size="mini" @click="selection(tableInfo)">全选</el-button>
          <el-button type="primary" size="mini">转移</el-button>
          <el-button type="primary" size="mini">推送</el-button>
          <el-button type="primary" size="mini">批量删除</el-button>
      </div>
      <!-- 分页 -->
      <Paging></Paging>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Instructions from "@/components/Instructions";
import Paging from "@/components/Paging";

/* 添加用户 */
export default {
  name: "ArticeList",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "文章列表",
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
          title: "郎朗独奏音乐会",
          column: "学术交流",
          date: "2017-02-20",
          author: "吴晓棣",
          state: "已发",
          stateClass: "state1",
          count: "56",
          zip: 200333
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
          zip: 200333
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
          zip: 200333
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
          zip: 200333
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
          zip: 200333
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
          zip: 200333
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
          zip: 200333
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
          zip: 200333
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
          zip: 200333
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
          zip: 200333
        }
      ],
      //用于全选
      tableList: []
    };
  },
  components: {
    Crumb,
    Instructions,
    Paging
  },
  mounted: function() {},
  methods: {
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
