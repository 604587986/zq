<template>
  <div id="nav">
    <div class="nav-container">
      <!-- 公共显示部分 -->
      <div class="nav-logo float-left">
        <router-link to="/">
          <div class="logo-rotate float-left">
            <i class="iconfont icon-logo"></i>
          </div>
          <i class="iconfont icon-qihuankeji"></i>
        </router-link>
      </div>
      <!-- 只在前台首页显示 -->
      <div v-if="receptionNavShow" class="web-nav">
        <span class="logo-title float-left">隶属单位网站一览表</span>
        <!-- list -->
        <ul class="float-right nav-list">
          <li class="float-left">
            <router-link class="underline-hover" to="../pages/index/Rank">站点排行榜</router-link>
          </li>
          <li class="float-left">
            <router-link to="/" class="underline-hover">学院官网</router-link>
          </li>
          <li class="float-left">
            <router-link to="../pages/admin/Login" class="underline-hover">后台登录</router-link>
          </li>
          <!-- <li class="float-left">
            <router-link to="../pages/Systemsettings/welcome" class="underline-hover">系统设置</router-link>
          </li> -->
        </ul>
      </div>
      <!-- 只在前台搜索页面展示 -->
      <div v-if="searchNavShow" class="search-nav">
        <div class="nav-search float-right">
          <div class="search-switch">
            <span class="float-left" :class="{'span-active':reception_search.source}" @click="search_switch()">站 群</span>
            <span class="float-left" :class="{'span-active':!reception_search.source}" @click="search_switch()">学术共享平台</span>
          </div>
          <el-input placeholder="请输入关键字" v-model="reception_search.keyword" class="input-with-select news-search float-left" @keyup.enter.native="propSearch()">
            <el-button slot="append" icon="el-icon-search" @click="propSearch()"></el-button>
          </el-input>
          <el-radio-group v-model="reception_search.option" class="float-left">
            <el-radio :label="0">全文搜索</el-radio>
            <el-radio :label="1">标题搜索</el-radio>
          </el-radio-group>
        </div>
      </div>
      <!-- 只在排行榜页面展示 -->
      <div v-if="rankNavShow" class="web-nav">
        <span class="logo-title float-left">站点排行榜</span>
        <!-- list -->
        <ul class="float-right nav-list">
          <li class="float-left">
            <router-link to="/" class="underline-hover">首页</router-link>
          </li>
          <li class="float-left">
            <router-link to="/" class="underline-hover">学院官网</router-link>
          </li>
          <li class="float-left">
            <router-link to="/pages/admin/Login" class="underline-hover">后台登录</router-link>
          </li>
        </ul>
      </div>
      <!-- 只在后台页面展示 -->
      <div v-if="adminNavShow">
        <div class="admin-index-btn float-left">
          <router-link to="/pages/administrators/Administrators" class="underline-hover">工作台</router-link>
        </div>
        <ul class="notice-list float-right">
            <li class="float-left">
              <router-link to="/pages/editor/editor/article_list">              
                <span class="list-title float-left">发布文章</span>
                <span class="list-info float-left">{{article.PublishCount}}</span>
              </router-link>
            </li>          
          
          <li class="float-left">
            <router-link to="/pages/editor/editor/article_list">
              <span class="list-title float-left">今日发布</span>
              <span class="list-info float-left">{{article.TodayPublishCount}}</span>
            </router-link>
          </li>
          <li class="float-left">
            <router-link to="/pages/editor/editor/article_list">
              <span class="list-title float-left">待审文章</span>
              <span class="list-info float-left">{{article.VerifyPendingCount}}</span>
            </router-link>
          </li>
          <li class="float-left">
          <router-link to="/pages/editor/editor/article_list">            
            <span class="list-title float-left">文章总数</span>
            <span class="list-info float-left">{{article.ArticleCount}}</span>
          </router-link>           
          </li>
        </ul>
      </div>
      <!-- 只在系统管理员页面展示 -->
      <div v-if="systemNavShow">
        <div class="admin-index-btn float-left">
          <router-link to="/pages/system_administrators/System_Administrators" class="underline-hover">工作台</router-link>
        </div>
        <div class="admin-index-btn xitong-left float-left">
          <router-link to="/pages/system_administrators/System_Administrators/SiteList" class="underline-hover">站点管理</router-link>
        </div>
        <div class="admin-index-btn xitong-left float-left">
         <!--  <a href="javascript:void(0);" class="underline-hover">系统设置</a> -->
          <router-link to="../../pages/Systemsettings/welcome" class="underline-hover">系统设置</router-link>
        </div>
        <div class="admin-index-btn float-right">
          <a href="javascript:void(0);" class="underline-hover" @click="system_info = true">系统信息</a>
        </div>
        <!-- 系统信息dialog -->
        <el-dialog title="系统信息" :visible.sync="system_info" class="system-info-pop">
          <p>
            <span class="system-info-title">用户名:</span>
            <span>system</span>
          </p>
          <p>
            <span class="system-info-title">所属管理组：</span>
            <span>系统管理员</span>
          </p>
          <p>
            <span class="system-info-title">数据库信息：</span>
            <span>暂无</span>
          </p>
          <p>
            <span class="system-info-title">最近登录：</span>
            <span>2018-01-19 14:10:59</span>
          </p>
          <p>
            <span class="system-info-title">服务器环境：</span>
            <span>Apache/2.4.9 (Win64)</span>
          </p>
          <p>
            <span class="system-info-title">PHP版本：</span>
            <span>5.5.12</span>
          </p>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  props: {
    receptionNavShow: false, //前台首页展示模块
    searchNavShow: false, //前台搜索页面展示模块
    rankNavShow: false, //排行榜页面展示模块
    adminNavShow: false, //后台首页页面展示模块
    systemNavShow: false, //系统管理员页面展示模块
    // 导航上显示的文章信息
    article:{}
  },
  data() {
    return {
      //搜索选项
      reception_search: {
        keyword: "",
        option: 0, //全局/标题
        source: true //切换搜索‘站群’和‘共享平台’
      },
      //系统信息弹框
      system_info: false
    };
  },
  mounted: function() {
    var that = this;
    that.reception_search.keyword = that.$store.state.reception_search_keyword;
  },
  methods: {
    //搜索切换
    search_switch() {
      this.reception_search.source = !this.reception_search.source;
    },
    //搜索
    propSearch: function() {
      this.$store.commit(
        "update_reception_search_keyword",
        this.reception_search.keyword
      );
      this.$store.commit(
        "update_reception_search_option",
        this.reception_search.option
      );
      this.$store.commit(
        "update_reception_search_source",
        this.reception_search.source
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../assets/css/less_config.less";
#nav {
  width: 100%;
  height: 90px;
  background: #fff;
  .nav-container {
    width: 1190px;
    margin: 0 auto;
    position: relative;
    &::after {
      content: "";
      display: block;
      visibility: hidden;
      clear: both;
    }
    .nav-logo {
      .logo-rotate {
        position: relative;
        top: 2px;
        transition: all 0.3s;
        .icon-logo {
          font-size: 50px;
          color: @base-color2;
          line-height: 90px;
        }
      }
      .icon-qihuankeji {
        color: @text-color;
        font-size: 48px;
        line-height: 90px;
        position: relative;
        top: 1px;
        left: 10px;
      }
    }
    .admin-index-btn {
      margin-top: 52px;
      margin-left: 160px;
      a {
        display: block;
        font-size: 16px;
        color: @text-color;
        &:hover {
          color: @base-color2;
        }
      }
      .underline-hover:before {
        background: @base-color2;
      }
    }
    .xitong-left {
      margin-left: 52px;
    }
    .back-to-home {
      display: none;
    }
    .notice-list {
      margin-top: 48px;
      &::after {
        content: "";
        display: block;
        visibility: hidden;
        clear: both;
      }
      li {
        margin-left: 40px;
        &:hover {
          .list-info {
            transform: scale(1.1);
          }
        }
        &::after {
          content: "";
          display: block;
          visibility: hidden;
          clear: both;
        }
        &:first-of-type {
          margin-left: 0;
        }
        .list-title {
          display: block;
          font-size: 16px;
          color: @text-color;
        }
        .list-info {
          display: block;
          color: @base-color2;
          margin-left: 20px;
          font-weight: 600;
          font-size: 34px;
          margin-top: -11px;
          transition: all 0.3s;
        }
      }
    }
  }
  //站群网站列表nav
  .web-nav {
    .logo-title {
      color: @base-color2;
      font-size: 24px;
      margin-left: 40px;
      line-height: 90px;
      font-weight: 600;
    }
    .nav-list {
      margin-top: 55px;
      li {
        margin-left: 73px;
        a {
          font-size: 14px;
          color: @text-color;
          transition: all 0.3s;
          display: block;
          &:hover {
            color: @text-hover;
          }
        }
      }
    }
  }
  //搜索页面nav
  .search-nav {
    .nav-search {
      margin-top: 11px;
      .search-switch {
        margin-left: 4px;
        position: relative;
        top: 1px;
        z-index: 10;
        &::after {
          content: "";
          display: block;
          visibility: hidden;
          clear: both;
        }
        span {
          display: block;
          color: @text-color;
          line-height: 26px;
          padding: 0 9px;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .span-active {
          color: #fff;
          background: rgba(0, 160, 233, 0.65);
        }
      }
      .news-search {
        width: 400px;
        height: 36px;
        margin-right: 22px;
        .el-input__inner {
          height: 36px;
        }
        .el-input-group__append {
          padding: 0 10px;
          overflow: hidden;
          transition: all 0.3s;
          .el-button {
            transition: all 0.3s;
          }
          [class*=" el-icon-"],
          [class^="el-icon-"] {
            font-size: 20px;
            position: relative;
            top: 2px;
            transition: all 0.3s;
          }
          &:hover {
            border-color: @base-color2;
            .el-button {
              background: @base-color2;
            }
            [class*=" el-icon-"],
            [class^="el-icon-"] {
              color: #fff;
            }
          }
        }
      }
      .el-radio + .el-radio {
        margin-left: 22px;
        line-height: 36px;
      }
    }
  }
  //系统信息弹框
  .system-info-pop {
    .el-dialog {
      width: 500px;
      .el-dialog__body {
        padding-top: 8px;
      }
    }
    .system-info-title {
      display: inline-block;
      width: 100px;
    }
  }
}
</style>
