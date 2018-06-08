<template>
  <div id="ArticleRank">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
        <div class="table-container">
          <div class="table-body">
            <el-table :data="tableInfo" stripe size="mini">
                <el-table-column prop="uid" label="排行" width="50"></el-table-column>
                <el-table-column prop="title" label="标题" width="500"></el-table-column>
                <el-table-column prop="count" label="浏览次数"></el-table-column>
                <el-table-column prop="author" label="作者"></el-table-column>
                <el-table-column prop="column" label="栏目"></el-table-column>
                <el-table-column prop="date" label="创建日期"></el-table-column>
                <el-table-column prop="site" label="所属站点"></el-table-column>
            </el-table>
          </div>
        <!-- 分页 -->
        <Paging :currentPaging="currentPaging" v-on="{sizeChange:handleSizeChange,currentChange:handleCurrentChange}"></Paging>
      </div>
  </div>
</template>
<script>
import Crumb from "@/components/Crumb";
import Paging from "@/components/Paging";
export default {
  name: "ArticleRank",
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
          url: "/pages/editor/editor/article_list"
        },
        {
          name: "文章排行",
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
      tableInfo: [
        {
          uid: 1,
          title: "杨梦漪独奏音乐会",
          author: "admin",
          count: 12145,
          column: "通知公告",
          date: "2018-01-12",
          site: "学院官网",
          url: "javascript:void(0);"
        },
        {
          uid: 2,
          title: "中国美术学院工会工作奖励和配套资助办法",
          author: "admin",
          count: 9873,
          column: "下载中心",
          date: "2018-01-12",
          site: "学院官网",
          url: "javascript:void(0);"
        },
        {
          uid: 3,
          title: "中国美术学院举行纪念建团95周年活动",
          author: "admin",
          count: 7586,
          column: "学术公告",
          date: "2018-01-12",
          site: "学院官网",
          url: "javascript:void(0);"
        },
        {
          uid: 4,
          title: "“治水最前线”中国美术学院下乡创作实践展开幕",
          author: "admin",
          count: 8512,
          column: "通知公告",
          date: "2018-01-12",
          site: "学院官网",
          url: "javascript:void(0);"
        },
        {
          uid: 5,
          title: "「民族翰骨——潘天寿诞辰120年纪念大展」在中国美术馆开幕",
          author: "admin",
          count: 5613,
          column: "下载中心",
          date: "2018-01-12",
          site: "学院官网",
          url: "javascript:void(0);"
        },
        {
          uid: 6,
          title: "纪念潘天寿诞辰120周年座谈会举行",
          author: "admin",
          count: 4235,
          column: "下载中心",
          date: "2018-01-12",
          site: "学院官网",
          url: "javascript:void(0);"
        },
        {
          uid: 7,
          title: "中国美术学院第八届教代会、第十六届工代会第三次会议隆重举行",
          author: "admin",
          count: 3256,
          column: "学术公告",
          date: "2018-01-12",
          site: "学院官网",
          url: "javascript:void(0);"
        },
        {
          uid: 8,
          title: "中国美术学院2017-2018年教职工蛋糕（券）供应商",
          author: "admin",
          count: 2145,
          column: "通知公告",
          date: "2018-01-12",
          site: "学院官网",
          url: "javascript:void(0);"
        },
        {
          uid: 9,
          title: "中国美术学院民艺博物馆物业服务项目预中标公告",
          author: "admin",
          count: 2156,
          column: "学术公告",
          date: "2018-01-12",
          site: "学院官网",
          url: "javascript:void(0);"
        },
        {
          uid: 10,
          title: "中国美术学院2017年接受国内访问学者简章",
          author: "admin",
          count: 1456,
          column: "通知公告",
          date: "2018-01-12",
          site: "学院官网",
          url: "javascript:void(0);"
        }
      ]
    };
  },
  components: {
    Crumb,
    Paging
  }
};
</script>
<style lang="less">
</style>

