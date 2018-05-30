<template>
  <div id="Workbench">
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 快捷导航 -->
    <div class="quick-navigation">
      <ul>
        <li v-for="item in quick_navigation" class="float-left">
          <a :href="item.url">
            <i class="iconfont" :class="item.icon"></i>
            <p>{{item.name}}</p>
          </a>
        </li>
      </ul>
    </div>
    <!-- 数据展示 -->
    <div class="data-display">
      <!-- menu -->
      <div class="data-menu">
        <span ref="data" v-for="(item,index) in data_display" :key="item.id" @click="data_switch($event,index)" class="float-left" :class="item.classCon?'span-active':''">{{item.name}}</span>
        <i class="line" :style="{left:line_left,width:line_Width}"></i>
      </div>
      <!-- 展示容器 -->
      <div class="data-container">
        <div v-show="switch_control == 1">
          <!-- 数据总览 -->
          <div class="data-all">
            <ul>
              <li v-for="item in data_all" :key="item.id" class="float-left">
                <span>{{item.count}}</span>
                <p>{{item.name}}</p>
              </li>
            </ul>
          </div>
          <!-- echarts 图表 -->
          <DataChart></DataChart>
        </div>
        <!-- 访问量排行 -->
        <div v-show="switch_control == 2">
          <div class="rank-title">
            <span>备注：数据统计时间有延迟，每10分钟数据自动刷新一次。</span>
            <el-button type="primary" size="mini">数据刷新</el-button>
          </div>
          <el-table :data="accessRankings" stripe size="small" v-loading="tableLoading">
            <el-table-column prop="uid" label="序号" width="50"></el-table-column>
            <el-table-column prop="title" label="网站名称" width="300"></el-table-column>
            <el-table-column prop="today" label="本月访问量"></el-table-column>
            <el-table-column prop="thisMonth" label="今日访问量"></el-table-column>
            <el-table-column prop="lastMonth" label="上月访问量"></el-table-column>
            <el-table-column prop="thisYear" label="今年访问量"></el-table-column>
            <el-table-column prop="count" label="总访问量"></el-table-column>
          </el-table>
        </div>
        <!-- 文章数量排行 -->
        <div v-show="switch_control == 3">
          <div class="rank-title">
            <span>备注：数据统计时间有延迟，每10分钟数据自动刷新一次。</span>
            <el-button type="primary" size="mini">数据刷新</el-button>
          </div>
          <el-table :data="countRankings" stripe size="small" v-loading="tableLoading2">
            <el-table-column prop="uid" label="序号" width="50"></el-table-column>
            <el-table-column prop="title" label="网站名称" width="300"></el-table-column>
            <el-table-column prop="today" label="今日发布"></el-table-column>
            <el-table-column prop="thisMonth" label="本月发布"></el-table-column>
            <el-table-column prop="lastMonth" label="上月发布"></el-table-column>
            <el-table-column prop="thisYear" label="今年发布"></el-table-column>
            <el-table-column prop="count" label="总文章数量"></el-table-column>
          </el-table>
        </div>
        <!-- 文章访问排行 -->
        <div v-show="switch_control == 4">
          <div class="rank-title">
            <span>备注：数据统计时间有延迟，每10分钟数据自动刷新一次。</span>
            <el-button type="primary" size="mini">数据刷新</el-button>
          </div>
          <el-table :data="lookRankings" stripe size="small" v-loading="tableLoading3">
            <el-table-column prop="uid" label="排行" width="50"></el-table-column>
            <el-table-column prop="title" label="标题" width="300"></el-table-column>
            <el-table-column prop="count" label="浏览次数"></el-table-column>
            <el-table-column prop="author" label="作者"></el-table-column>
            <el-table-column prop="column" label="栏目"></el-table-column>
            <el-table-column prop="date" label="创建日期"></el-table-column>
            <el-table-column prop="site" label="所属站点"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* 引入组件 */
import DataChart from "@/components/DataChart";
import Crumb from "@/components/Crumb";
/* 工作台 */
export default {
  name: "Workbench",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: ""
        }
      ],
      tableLoading: true,
      tableLoading2: true,
      tableLoading3: true,
      //快捷导航
      quick_navigation: [
        {
          name: "权限管理",
          url: "javascript:void(0);",
          icon: "icon-quanxianguanli"
        },
        {
          name: "附件管理",
          url: "javascript:void(0);",
          icon: "icon-fujianguanli"
        },
        {
          name: "系统日志",
          url: "javascript:void(0);",
          icon: "icon-xitongrizhi"
        },
        {
          name: "数据备份",
          url: "javascript:void(0);",
          icon: "icon-shujubeifen"
        },
        {
          name: "查看站点内容",
          url: "javascript:void(0);",
          icon: "icon-chakanzhandianneirong"
        }
      ],
      //数据导航
      data_display: [
        {
          name: "数据概况",
          classCon: true
        },
        {
          name: "访问量排行",
          classCon: false
        },
        {
          name: "文章数量排行",
          classCon: false
        },
        {
          name: "文章访问排行",
          classCon: false
        }
      ],
      //line-left
      line_left: 0,
      line_Width: 72,
      //数据总览
      data_all: [
        {
          name: "站点数量(个)",
          count: 38
        },
        {
          name: "文章总数(篇)",
          count: 54896
        },
        {
          name: "栏目总数(个)",
          count: 470
        },
        {
          name: "附件总数(个)",
          count: 48949
        },
        {
          name: "管理员数量(位)",
          count: 15
        }
      ],
      //切换控制
      switch_control: 1,
      //访问排行榜
      accessRankings: [],
      //数量排行榜
      countRankings: [],
      //访问量排行榜
      lookRankings: []
    };
  },
  components: {
    DataChart,
    Crumb
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 0);
    this.$store.commit("update_system_menu_idx", 0);
  },
  methods: {
    //切换
    data_switch: function(event, index) {
      let that = this;
      let url = null;
      for (let i = 0; i < that.data_display.length; i++) {
        that.data_display[i].classCon = false;
      }
      that.switch_control = index + 1;
      if (index == 1) {
        url = "./static/mock/accessRankings.json";
      } else if (index == 2) {
        url = "./static/mock/countRankings.json";
      } else if (index == 3) {
        url = "./static/mock/lookRankings.json";
      }
      that
        .$http({
          method: "get",
          url: url
        })
        .then(function(response) {
          if (index == 1) {
            that.accessRankings = response.data;
            setTimeout(function() {
              that.tableLoading = false;
            }, 300);
          } else if (index == 2) {
            that.countRankings = response.data;
            setTimeout(function() {
              that.tableLoading2 = false;
            }, 300);
          } else if (index == 3) {
            that.lookRankings = response.data;
            setTimeout(function() {
              that.tableLoading3 = false;
            }, 300);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      that.data_display[index].classCon = true;
      that.line_left = event.currentTarget.offsetLeft + "px";
      that.line_Width = event.currentTarget.offsetWidth + "px";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../assets/css/less_config.less";
.quick-navigation {
  padding-top: 48px;
  border-top: 1px solid @border_color;
  ul {
    &::after {
      content: "";
      display: block;
      visibility: hidden;
      clear: both;
    }
    li {
      margin-right: 18px;
      &:last-of-type {
        margin-right: 0;
      }
      &:hover {
        a {
          transform: scale(1.1) translateZ(0);
        }
      }
      a {
        display: block;
        width: 175px;
        height: 100px;
        text-align: center;
        border-radius: 3px;
        border: 1px solid @border_color;
        position: relative;
        transition: all 0.3s;
        .iconfont {
          color: @base-color2;
          font-size: 40px;
          position: absolute;
          left: 50%;
          top: 35%;
          transform: translate(-50%, -50%);
        }
        .icon-quanxianguanli {
          font-size: 38px;
        }
        .icon-shujubeifen {
          font-size: 38px;
        }
        .icon-fujianguanli {
          font-size: 33px;
        }
        .icon-xitongrizhi {
          font-size: 44px;
        }
        p {
          position: absolute;
          left: 50%;
          bottom: 10px;
          transform: translateX(-50%);
          color: @base_grey;
          white-space: nowrap;
          font-size: 16px;
        }
      }
    }
  }
}
.data-display {
  margin-top: 46px;
  padding-bottom: 40px;
  .data-menu {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid @border_color;
    position: relative;
    span {
      font-size: 18px;
      color: @base_grey;
      cursor: pointer;
      line-height: 40px;
      margin-right: 32px;
      transition: all 0.3s;
      &:last-of-type {
        margin-right: 0;
      }
      &:hover {
        color: @base-color2;
      }
    }
    .span-active {
      color: @base-color2;
    }
    .line {
      width: 72px;
      height: 5px;
      background: @base-color2;
      position: absolute;
      bottom: -2.5px;
      left: 0;
      transition: all 0.3s;
    }
  }
  .data-container {
    margin-top: 50px;
    .data-all {
      margin-bottom: 50px;
      ul {
        &::after {
          content: "";
          display: block;
          visibility: hidden;
          clear: both;
        }
        li {
          margin-right: 18px;
          display: block;
          width: 175px;
          height: 100px;
          text-align: center;
          border-radius: 3px;
          border: 1px solid @border_color;
          position: relative;
          text-align: center;
          &:last-of-type {
            margin-right: 0;
          }
          span {
            display: block;
            color: @base-color2;
            font-size: 34px;
            white-space: nowrap;
            margin-top: 11px;
          }
          p {
            color: @base_grey;
            white-space: nowrap;
            margin-top: 11px;
            font-size: 16px;
          }
        }
      }
    }
    .rank-title {
      width: 100%;
      height: 40px;
      margin-bottom: 20px;
      > span {
        font-size: 14px;
        color: @base_grey;
        margin-left: 10px;
      }
    }
  }
}
</style>
