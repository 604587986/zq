<template>
  <div id="FriendlyLink">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="table-container">
        <!-- 表格筛选 -->
        <div class="table-filter">
          <router-link to="/pages/editor/editor/add_friendly_link"><el-button type="primary" size="mini">添加友情链接</el-button></router-link>
          <!-- <el-button type="primary" size="mini">友情链接分类</el-button> -->
        </div>
        <!-- 表格筛选 -->
        <div class="table-filter">
            <el-select v-model="columnSelectionValue" clearable placeholder="分类" size="mini" class="float-left column-selection">
                <el-option v-for="item in columnSelection" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="stateValue" clearable placeholder="启用状态" size="mini" class="float-left state-selection">
                <el-option v-for="item in stateSelection" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-input placeholder="请输入关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
                <el-button slot="append" icon="el-icon-search" @click="articleSearch()"></el-button>
            </el-input>
        </div>
        <!-- 表格 -->
        <div class="table-body carousel_container">
            <el-table ref="multipleTable" :data="tableInfo" stripe size="small" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="uid" label="ID" width="65"></el-table-column>
                <el-table-column prop="title" label="标题" resizable></el-table-column>
                <el-table-column prop="column" label="分类" width="65"></el-table-column>
                <el-table-column prop="img" label="图片">
                    <div slot-scope="scope" class="carousel-img">
                        <img :src="scope.row.img" />
                    </div>
                </el-table-column>
                <el-table-column prop="imgUrl" label="链接" width="150">
                    <a :href="scope.row.imgUrl" slot-scope="scope" target="_blank" class="carousel-link">{{scope.row.imgUrl}}</a>
                </el-table-column>
                <el-table-column label="排序" width="65">
                    <div slot-scope="scope" class="table-sort-input">
                        <el-input type="text" size="mini" @blur="sortBlur(scope.$index, carouselInfo)" :value="scope.row.count"></el-input>
                    </div>
                </el-table-column>
                <el-table-column prop="open" label="启用" width="70"></el-table-column>
                <el-table-column prop="date" label="添加时间" width="100"></el-table-column>
                <el-table-column label="操作" width="130">
                    <div slot-scope="scope" class="control-btn">
                        <el-button size="small">编辑</el-button>
                        <el-button @click.native.prevent="deleteRow(scope.$index, carouselInfo)" size="small" class="control-btn-del">删除</el-button>
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
      <Paging></Paging>
</div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Instructions from "@/components/Instructions";
import Paging from "@/components/Paging";

/* 友情链接 */
export default {
  name: "FriendlyLink",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "友情链接",
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
      //分类
      columnSelection: [
        {
          value: 0,
          label: "首页"
        },
        {
          value: 1,
          label: "关于我们"
        }
      ],
      columnSelectionValue: "",
      //启用状态
      stateSelection: [
        {
          value: 0,
          label: "启用"
        },
        {
          value: 1,
          label: "隐藏"
        }
      ],
      stateValue: "",
      //菜单检索
      titleSearchValue: "",
      //表格
      tableInfo: [
        {
          uid: 4,
          title: "元旦汇演海报",
          column: "首页",
          date: "2017-02-20",
          img: "./images/test1.jpg",
          imgUrl: "http://www.caa.edu.cn/gmrx/201801/t20180106_71798.html",
          count: "4",
          open: "显示"
        },
        {
          uid: 3,
          title: "元旦汇演海报",
          column: "首页",
          date: "2017-02-20",
          img: "./images/test2.jpg",
          imgUrl: "http://www.caa.edu.cn/gmrx/201801/t20180106_71798.html",
          count: "3",
          open: "显示"
        },
        {
          uid: 2,
          title: "元旦汇演海报",
          column: "首页",
          date: "2017-02-20",
          img: "./images/test3.jpg",
          imgUrl: "http://www.caa.edu.cn/gmrx/201801/t20180106_71798.html",
          count: "2",
          open: "显示"
        },
        {
          uid: 1,
          title: "郎朗独奏音乐会",
          column: "关于我们",
          date: "2017-02-20",
          img: "./images/test4.jpg",
          imgUrl: "http://www.caa.edu.cn/gmrx/201801/t20180106_71798.html",
          count: "1",
          open: "隐藏"
        }
      ],
      //用于多选
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
