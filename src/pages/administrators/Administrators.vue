<template>
  <div id="admin">
    <!-- Header -->
    <Header></Header>
    <!-- nav -->
    <Nav :adminNavShow="true"></Nav>
    <!-- list -->
    <div id="entry-list" :class="listClass">
      <div class="float-left" :class="{'editor-list':editor}">
        <div v-for="(list,index) in entryList" :key="list.id" class="float-left entry-box" :class="list.show?'div-not-show':'div-show'">
          <router-link :to="list.entryUrl">
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
/* 后台登录页 */
export default {
  name: "Administrators",
  data() {
    return {
      adminNavShow: true, //本页面需要展示在nav的元素
      entryList: [],
      editor: false,
      listClass: "",
      newsInfo: []
    };
  },
  components: {
    Header,
    Nav,
    Footer
  },
  mounted: function() {
    var that = this;
    var cw =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth; //获取屏幕分辨率
    var isEditor = localStorage.getItem("isEditor"); //判断是否是编辑页面
    if (isEditor == "true") {
      //获取最新文章列表
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
    //获取入口列表数据
    this.$http({
      method: "get",
      url: "./static/mock/" + localStorage.getItem("jsonUrl")
    })
      .then(function(response) {
        //将栏目列表存到localStorage
        localStorage.setItem("nav_column_list", JSON.stringify(response.data));
        //判断是否是编辑页面
        if (isEditor == "true") {
          that.editor = true;
          for (var i = 0; i < response.data.length; i++) {
            if ((i + 1) % 3 === 0) {
              response.data.splice(i, 0, {
                show: true
              });
            }
          }
        } else {
          //根据屏幕分辨率修改栏目列表达到隔行变色
          if (cw > 769 && response.data.length > 6) {
            that.listClass = "list-9";
            for (var i = 0; i < response.data.length; i++) {
              if ((i + 1) % 5 === 0) {
                response.data.splice(i, 0, {
                  show: true
                });
              }
            }
          } else if (cw > 769 && response.data.length < 5) {
            //小与5个时添加另一套class
            that.listClass = "list-4";
            for (var i = 0; i < response.data.length; i++) {
              if ((i + 1) % 3 === 0) {
                response.data.splice(i, 0, {
                  show: true
                });
              }
            }
          } else if (
            cw > 769 &&
            response.data.length < 7 &&
            response.data.length > 4
          ) {
            //小与7个且大于4个时添加另一套class
            that.listClass = "list-6";
          } else {
            //给栏目列表添加空元素
            for (var i = 0; i < response.data.length; i++) {
              if ((i + 1) % 3 === 0) {
                response.data.splice(i, 0, {
                  show: true
                });
              }
            }
          }
        }
        that.entryList = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
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
