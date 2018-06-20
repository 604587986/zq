<template>
  <div id="editor" class="public-wap">
    <!-- Header -->
    <Header></Header>
    <!-- nav -->
    <Nav :adminNavShow="true"></Nav>

    <div class="main">
      <!-- Subject -->
      <div class="subject no-public-container">
        <div class="my-nav">>
          <router-link to="/pages/administrators/Administrators">
            <el-button size="mini">工作台</el-button>
          </router-link>
          <router-link :to="item.entryUrl" v-for="item in nav_column_list" :key="item.entryUrl">
            <el-button size="mini">{{item.entryName}}</el-button>
          </router-link>
        </div>       
        <router-view></router-view>
      </div>
    </div>
    <!-- Footer -->
    <Footer :systemFooterShow="false"></Footer>
  </div>
</template>

<script>
/* 引入组件 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

/* 后台首页 */
export default {
  name: "editor",
  data() {
    return {
      systemNavShow: true, //本页面需要展示在nav的元素
      systemFooterShow: false, //本页面在Footer需要隐藏的元素
      nav_column_list: []
    };
  },
  components: {
    Header,
    Footer,
    Nav
  },
  mounted: function() {
    const navMenus = eval("(" + window.localStorage.getItem("entryList") + ")");
    this.nav_column_list = navMenus;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../assets/css/less_config.less";
#editor {
  width: 100%;
  .my-nav {
    margin: 20px 0;
    font-size: 0;
    a {
      display: inline-block;
      margin-right: 10px;
      margin-bottom: 10px;
      &.router-link-exact-active {
        button {
          background: #409eff;
          color: #fff;
        }
      }
    }
  }
}
</style>
