<template>
  <div id="editor" class="public-wap">
    <!-- Header -->
    <Header></Header>
    <!-- nav -->
    <Nav :adminNavShow="true"></Nav>

    <div class="main">
      <!-- Subject -->
      <div class="subject no-public-container">
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
      systemFooterShow: false //本页面在Footer需要隐藏的元素
    };
  },
  components: {
    Header,
    Footer,
    Nav
  },
  mounted: function() {}
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
