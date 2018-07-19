<template>
  <div id="admin">
    <!-- Header -->
    <Header :site="site"></Header>
    <!-- nav -->
    <Nav :adminNavShow="true" :article="article"></Nav>
    <!-- list -->
    <div id="entry-list" :class="listClass">
      <div class="float-left" :class="{'editor-list':editor}">
        <div v-for="(list,index) in entryList" :key="list.id" class="float-left entry-box" :class="list.show?'div-not-show':'div-show'">
          <router-link :to="list.entryUrl?list.entryUrl:''">
            <i class="iconfont" :class="list.iconName"></i>
            <span>{{list.entryName}}</span>
          </router-link>
        </div>
      </div>
      <div class="editor-article float-right" v-if="editor">
        <el-table ref="multipleTable" :data="newsInfo" stripe size="mini">
          <el-table-column prop="title" label="最新文章" width="450px">
            <a :href="scope.row.url" slot-scope="scope" class="table-text-color">{{scope.row.title}}</a>
          </el-table-column>
          <el-table-column prop="date"></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- footer -->
    <Footer></Footer>
  </div>
</template>

<script>
/* 引入组件 */
import Nav from "@/components/Nav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { init } from "@/api/login/login";
/* 后台登录页 */
export default {
  name: "Administrators",
  data() {
    return {
      //当前站点的文章数据
      article: {},
      adminNavShow: true, //本页面需要展示在nav的元素
      entryList: [],
      editor: false,
      listClass: "",
      newsInfo: [],
      // 不同用户的工作台菜单
      authority: {
        // 主站管理员
        main_admin: [
          {
            iconName: "icon-fawenzhang",
            entryName: "发文章",
            entryUrl: "/pages/editor/editor/publish_article"
          },
          {
            iconName: "icon-wenzhangliebiao",
            entryName: "文章列表",
            entryUrl: "/pages/editor/editor/article_list"
          },
          {
            iconName: "icon-danye",
            entryName: "单页列表",
            entryUrl: "/pages/editor/editor/singlepage_list"
          },
          {
            iconName: "icon-caidan",
            entryName: "菜单列表",
            entryUrl: "/pages/editor/editor/column_list"
          },
          {
            iconName: "icon-lanmuliebiao",
            entryName: "分类列表",
            entryUrl: "/pages/editor/editor/category_list"
          },
          {
            iconName: "icon-biaoqian",
            entryName: "文章标签",
            entryUrl: "/pages/editor/editor/tag_list"
          },
          {
            iconName: "icon-luqu",
            entryName: "录取管理",
            entryUrl: "/pages/editor/editor/enroll"
          },
          {
            iconName: "icon-gongzi",
            entryName: "工资管理",
            entryUrl: "/pages/editor/editor/salary"
          },
          {
            iconName: "icon-jiaoshifengcai",
            entryName: "会员管理",
            entryUrl: "/pages/editor/editor/member_list"
          },
          {
            iconName: "icon-zhandianxinxi",
            entryName: "站点信息",
            entryUrl: "/pages/editor/editor/site_information"
          }
          // {
          //   iconName: "icon-shujukanban",
          //   entryName: "数据看板",
          //   entryUrl: "/pages/editor/editor/data_board"
          // },
          // {
          //   iconName: "icon-zhandianfangwenpaihang",
          //   entryName: "站点访问排行",
          //   entryUrl: "/pages/editor/editor/access_rank"
          // },
          // {
          //   iconName: "icon-zhandianwenzhangshuliangpaihang",
          //   entryName: "站点文章数量排行",
          //   entryUrl: "/pages/editor/editor/count_rank"
          // },
          // {
          //   iconName: "icon-wenzhangfangwenpaihang",
          //   entryName: "文章访问排行",
          //   entryUrl: "/pages/editor/editor/article_rank"
          // },
          // {
          //   iconName: "icon-wenzhangliebiao",
          //   entryName: "网页生成",
          //   entryUrl: "/pages/editor/editor/page_generation"
          // },
        ],
        // 分站管理员
        sub_admin: [
          {
            iconName: "icon-fawenzhang",
            entryName: "发文章",
            entryUrl: "/pages/editor/editor/publish_article"
          },
          {
            iconName: "icon-wenzhangliebiao",
            entryName: "文章列表",
            entryUrl: "/pages/editor/editor/article_list"
          },
          {
            iconName: "icon-biaoqian",
            entryName: "文章标签",
            entryUrl: "/pages/editor/editor/tag_list"
          },
          {
            iconName: "icon-caidan",
            entryName: "菜单列表",
            entryUrl: "/pages/editor/editor/column_list"
          },
          {
            iconName: "icon-danye",
            entryName: "单页列表",
            entryUrl: "/pages/editor/editor/singlepage_list"
          },
          {
            iconName: "icon-lanmuliebiao",
            entryName: "分类列表",
            entryUrl: "/pages/editor/editor/category_list"
          },
          {
            iconName: "icon-lunbo",
            entryName: "轮播图",
            entryUrl: "/pages/editor/editor/carousel_list"
          },
          {
            iconName: "icon-youqinglianjie",
            entryName: "友情链接",
            entryUrl: "/pages/editor/editor/friendly_link"
          },
          {
            iconName: "icon-guanggao",
            entryName: "广告管理",
            entryUrl: "/pages/editor/editor/advertisement_list"
          },
          {
            iconName: "icon-huodongyugao",
            entryName: "活动预告",
            entryUrl: "/pages/editor/editor/activity_preview"
          },
          {
            iconName: "icon-shujukanban",
            entryName: "数据看板",
            entryUrl: "/pages/editor/editor/data_board"
          },
          {
            iconName: "icon-wenzhangpaihang",
            entryName: "文章排行",
            entryUrl: "/pages/editor/editor/article_rank"
          },
          {
            iconName: "icon-zhandianxinxi",
            entryName: "站点信息",
            entryUrl: "/pages/editor/editor/site_information"
          }
        ],
        // 领导
        leader: [
          {
            iconName: "icon-wenzhangliebiao",
            entryName: "文章列表",
            entryUrl: "/pages/editor/editor/article_list"
          },
          {
            iconName: "icon-shujukanban",
            entryName: "数据看板",
            entryUrl: "/pages/editor/editor/data_board"
          },
          {
            iconName: "icon-wenzhangpaihang",
            entryName: "文章排行",
            entryUrl: "/pages/editor/editor/article_rank"
          }
        ],
        //编辑
        editor: [
          {
            iconName: "icon-fawenzhang",
            entryName: "发文章",
            entryUrl: "/pages/editor/editor/publish_article"
          },
          {
            iconName: "icon-wenzhangliebiao",
            entryName: "文章列表",
            entryUrl: "/pages/editor/editor/article_list"
          },
          {
            iconName: "icon-caidan",
            entryName: "菜单列表",
            entryUrl: "/pages/editor/editor/column_list"
          },
          {
            iconName: "icon-lunbo",
            entryName: "轮播图",
            entryUrl: "/pages/editor/editor/carousel_list"
          }
        ],
        practice_editor: []
      }
    };
  },
  computed: {
    //当前用户所在的站点信息
    site() {
      return this.$store.state.site_title;
    }
  },
  components: {
    Header,
    Nav,
    Footer
  },
  mounted: function() {
    var that = this;
    that.getMenus();
    that.init();
  },
  methods: {
    //获取导航菜单
    getMenus() {
      var that = this;
      const group = window.localStorage.getItem("group"); //当前用户所在用户组
      const mockUser = window.localStorage.getItem("mockUser"); //管理员模拟用户
      const mockGroup = window.localStorage.getItem("mockGroup"); //管理员模拟用户所在组
      //如果是管理员模拟用户则获取分站管理员的菜单，否则根据用户组获取菜单
      if (mockUser) {
        switch (mockGroup) {
          case "2":
            this.entryList = this.authority.main_admin;
            localStorage.setItem("entryList", JSON.stringify(this.entryList));
            return;
          case "3":
            this.entryList = this.authority.sub_admin;
            localStorage.setItem("entryList", JSON.stringify(this.entryList));
            return;
          case "4":
            this.entryList = this.authority.leader;
            localStorage.setItem("entryList", JSON.stringify(this.entryList));
            return;
          case "5":
            this.entryList = this.authority.editor;
            localStorage.setItem("entryList", JSON.stringify(this.entryList));
            return;
        }
      } else {
        if (group == 1) {
          this.entryList = this.authority.main_admin;
        } else if (group == 2) {
          this.entryList = this.authority.sub_admin;
        } else if (group == 3) {
          this.entryList = this.authority.leader;
        } else if (group == 4) {
          this.entryList = this.authority.editor;
          this.editor = true;
          this.$http({
            method: "get",
            url: "./static/mock/news.json"
          })
            .then(function(response) {
              that.newsInfo = response.data;
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      }
      localStorage.setItem("entryList", JSON.stringify(this.entryList));
    },
    // 登录初始化
    init() {
      init().then(res => {
        if (res.data.code == 200) {
          this.article = res.data.data.init.statistics;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../assets/css/less_config.less";
#admin {
  width: 100%;
  height: 100vh;
  position: relative;
  #entry-list {
    width: 1200px;
    // margin-left: 5px;
    // position: absolute;
    // top: 55%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    margin: 110px auto;
    &::after {
      content: "";
      display: block;
      visibility: hidden;
      clear: both;
    }
    .entry-box {
      width: 290px;
      height: 160px;
      background: @base-color;
      margin-right: 10px;
      margin-bottom: 10px;
      border: 3px solid transparent;
      transition: all 0.3s;
      &:nth-child(2n) {
        background: @base-color2;
      }
      &:hover {
        border: 3px solid @base-color2;
        a {
          -webkit-transform: scale(1.1) translateZ(0);
          -ms-transform: scale(1.1) translateZ(0);
          -o-transform: scale(1.1) translateZ(0);
          transform: scale(1.1) translateZ(0);
        }
      }
      &:nth-child(2n):hover {
        border: 3px solid @base-color;
      }
      a {
        display: block;
        width: 100%;
        height: 100%;
        text-align: center;
        overflow: hidden;
        transition: all 0.3s;
        .iconfont {
          display: block;
          color: #fff;
          font-size: 54px;
          margin-top: 27px;
        }
        span {
          display: block;
          color: #fff;
          font-size: 16px;
          margin-top: 21px;
          letter-spacing: 2px;
        }
      }
    }
    .div-show {
      display: block;
    }
    .div-not-show {
      display: none;
    }
    /* 编辑页面 */
    .editor-list {
      width: 600px;
      &::after {
        content: "";
        display: block;
        visibility: hidden;
        clear: both;
      }
    }
    .editor-article {
      background: #fff;
      height: 330px;
      overflow: hidden;
      &::after {
        content: "";
        display: block;
        visibility: hidden;
        clear: both;
      }
      width: 590px;
      margin-right: 10px;
      .table-text-color {
        height: 100%;
        color: @text-color;
        white-space: nowrap;
        transition: all 0.3s;
        &:hover {
          color: @base-color2;
        }
      }
    }
  }
  /* 少于5个时的页面样式 */
  #entry-list.list-4 {
    width: 820px;
    .entry-box {
      width: 400px;
      height: 220px;
      a {
        .iconfont {
          font-size: 54px;
          margin-top: 45px;
        }
      }
    }
  }
  /* 少于7个时的页面样式 */
  #entry-list.list-6 {
    .entry-box {
      width: 390px;
      height: 200px;
      a {
        .iconfont {
          font-size: 54px;
          margin-top: 45px;
        }
      }
    }
  }
  #Footer {
    margin-top: 20px;
  }
}
</style>
