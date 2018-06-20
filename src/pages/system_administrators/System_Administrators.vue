<template>
  <div id="system_admin" class="public-wap">
    <!-- Header -->
    <Header></Header>

    <!-- 顶部导航 -->
    <Nav :systemNavShow="true"></Nav>
    <div class="main">
      <!-- 侧边导航 -->
      <SideBar></SideBar>
      <!-- Subject -->
      <div class="subject public-container float-right">
        <router-view></router-view>
      </div>
    </div>
    <!-- Footer -->
    <Footer :systemFooterShow="false"></Footer>
  </div>
</template>

<script>
/* 引入组件 */
import Nav from "@/components/Nav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideBar from "@/components/SideBar";

/* 后台首页 */
export default {
  name: "System_Administrators",
  data() {
    return {
      systemNavShow: true, //本页面需要展示在nav的元素
      systemFooterShow: false //本页面在Footer需要隐藏的元素
    };
  },
  components: {
    Header,
    Nav,
    Footer,
    SideBar
  },
  mounted: function() {},
  beforeRouteEnter(to, from, next) {
    window.localStorage.removeItem("mockUser");//进入系统管理员页则删除模拟用户
    next()
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../assets/css/less_config.less";
#system_admin {
  width: 100%;
  .main {
    background: transparent;
    padding: 0;
  }
}
</style>
