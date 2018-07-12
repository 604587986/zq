<template>
  <div id="editor" class="public-wap">
    <!-- Header -->
    <Header :site="site"></Header>

    <div class="main">
      <!-- Subject -->
      <div class="subject no-public-container">
        <div class="my-nav">>
          <router-link to="/pages/system_administrators/System_Administrators" v-if="is_mock_user">
            <el-button size="mini" type="danger">返回系统管理员页面</el-button>
          </router-link>
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

/* 后台首页 */
export default {
  name: "editor",
  data() {
    return {
      systemNavShow: true, //本页面需要展示在nav的元素
      systemFooterShow: false, //本页面在Footer需要隐藏的元素
      nav_column_list: [],
      is_mock_user: window.localStorage.getItem("mockUser")
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
    Footer,
  },
  mounted: function() {
    const navMenus = eval("(" + window.localStorage.getItem("entryList") + ")");
    this.nav_column_list = navMenus;
  },
  beforeRouteEnter(to, from, next) {
    const group = window.localStorage.getItem("group");
    const mockUser = window.localStorage.getItem("mockUser");
    if (group == 0 && !mockUser) {
      alert("请切换身份后再进行操作！");
      next(false);
    } else {
      next();
    }
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
