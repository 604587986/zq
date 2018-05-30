<template>
  <div id="ColumnList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <div class="table-filter">
      <el-button type="primary" size="mini">添加栏目</el-button>
    </div>
    <!-- Form -->
    <div class="table-container">
        <!-- 表格 -->
        <div class="table-body carousel_container">
            <el-table :data="tableInfo" stripe size="small">
                <el-table-column prop="uid" label="ID" width="65"></el-table-column>
                <el-table-column label="显示子类" type="expand" width="100">
                    <div slot-scope="props">
                        <el-table :data="props.row.leavel2" stripe size="mini" class="second-table">
                            <el-table-column prop="uid" width="65"></el-table-column>
                            <el-table-column type="expand" width="100">
                                <div slot-scope="props">
                                    <el-table :data="props.row.leavel3" stripe size="mini" class="third-table">
                                        <el-table-column prop="uid" width="65"></el-table-column>
                                        <el-table-column width="100" disabled="true"></el-table-column>
                                        <el-table-column prop="column_title"></el-table-column>
                                        <el-table-column prop="column"></el-table-column>
                                        <el-table-column prop="state" width=""></el-table-column>
                                        <el-table-column prop="leavel" width="80"></el-table-column>
                                        <el-table-column width="60">
                                            <div slot-scope="scope" class="table-sort-input">
                                                <el-input type="text" size="mini" @blur="sortBlur(scope.$index, column_list)" :value="scope.row.sort"></el-input>
                                            </div>
                                        </el-table-column>
                                        <el-table-column width="270">
                                            <div slot-scope="scope" class="control-btn">
                                                <el-button size="small">添加子类</el-button>
                                                <el-button size="small">预览</el-button>
                                                <el-button size="small">编辑</el-button>
                                                <el-button @click.native.prevent="deleteRow(scope.$index, column_list)" size="small" class="control-btn-del">删除</el-button>
                                            </div>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-table-column>
                            <el-table-column prop="column_title"></el-table-column>
                            <el-table-column prop="column"></el-table-column>
                            <el-table-column prop="state" width=""></el-table-column>
                            <el-table-column prop="leavel" width="80"></el-table-column>
                            <el-table-column width="60">
                                <div slot-scope="scope" class="table-sort-input">
                                    <el-input type="text" size="mini" @blur="sortBlur(scope.$index, column_list)" :value="scope.row.sort"></el-input>
                                </div>
                            </el-table-column>
                            <el-table-column width="270">
                                <div slot-scope="scope" class="control-btn">
                                    <el-button size="small">添加子类</el-button>
                                    <el-button size="small">预览</el-button>
                                    <el-button size="small">编辑</el-button>
                                    <el-button @click.native.prevent="deleteRow(scope.$index, column_list)" size="small" class="control-btn-del">删除</el-button>
                                </div>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-table-column>
                <el-table-column prop="column_title" label="分类名称"></el-table-column>
                <el-table-column prop="column" label="类别"></el-table-column>
                <el-table-column prop="state" label="状态" width=""></el-table-column>
                <el-table-column prop="leavel" label="级别" width="80"></el-table-column>
                <el-table-column label="排序" width="60">
                    <div slot-scope="scope" class="table-sort-input">
                        <el-input type="text" size="mini" @blur="sortBlur(scope.$index, column_list)" :value="scope.row.sort"></el-input>
                    </div>
                </el-table-column>
                <el-table-column label="操作" width="270">
                    <div slot-scope="scope" class="control-btn">
                        <el-button size="small">添加子类</el-button>
                        <el-button size="small">预览</el-button>
                        <el-button size="small">编辑</el-button>
                        <el-button @click.native.prevent="deleteRow(scope.$index, column_list)" size="small" class="control-btn-del">删除</el-button>
                    </div>
                </el-table-column>
            </el-table>
        </div>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Instructions from "@/components/Instructions";
/* 添加用户 */
export default {
  name: "ColumnList",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "栏目列表",
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
      //提交按钮loading
      subLoading: false,

      //表单验证
      rules: {},
      //表格
      tableInfo: [
        {
          uid: 1,
          column_title: "学院概况",
          column: "单页",
          state: "显示",
          leavel: 1,
          sort: 1,
          leavel2: [
            {
              uid: 8,
              column_title: "学校简介",
              column: "单页",
              state: "显示",
              leavel: 2,
              sort: 8,
              leavel3: [
                {
                  uid: 10,
                  column_title: "中文网概况",
                  column: "单页",
                  state: "显示",
                  leavel: 3,
                  sort: 13
                },
                {
                  uid: 11,
                  column_title: "英文网概况",
                  column: "列表",
                  state: "显示",
                  leavel: 3,
                  sort: 14
                }
              ]
            },
            {
              uid: 9,
              column_title: "学校历史",
              column: "单页",
              state: "显示",
              leavel: 2,
              sort: 9
            },
            {
              uid: 10,
              column_title: "领导介绍",
              column: "单页",
              state: "显示",
              leavel: 2,
              sort: 10
            },
            {
              uid: 11,
              column_title: "校园风光",
              column: "列表",
              state: "显示",
              leavel: 2,
              sort: 11
            }
          ]
        },
        {
          uid: 2,
          column_title: "学院与学科",
          column: "单页",
          state: "显示",
          leavel: 1,
          sort: 2
        },
        {
          uid: 3,
          column_title: "职能部门",
          column: "单页",
          state: "显示",
          leavel: 1,
          sort: 3
        },
        {
          uid: 4,
          column_title: "人才培养",
          column: "单页",
          state: "显示",
          leavel: 1,
          sort: 4
        },
        {
          uid: 5,
          column_title: "科学研究",
          column: "单页",
          state: "显示",
          leavel: 1,
          sort: 5
        },
        {
          uid: 6,
          column_title: "招生就业",
          column: "单页",
          state: "显示",
          leavel: 1,
          sort: 6
        },
        {
          uid: 7,
          column_title: "管理与服务",
          column: "单页",
          state: "隐藏",
          leavel: 1,
          sort: 7
        }
      ]
    };
  },
  components: {
    Crumb,
    Instructions
  },
  mounted: function() {},
  methods: {
    //表单提交
    submitForm(formName) {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#ColumnList{
  .second-table{
    .el-table__header-wrapper{
      display: none;
    }
    .el-table__row > td{
          background: #e7e7e7;
    }
  }
  .el-table__expanded-cell[class*=cell]{
    padding: 0 0 20px 0;
  }
}
</style>
