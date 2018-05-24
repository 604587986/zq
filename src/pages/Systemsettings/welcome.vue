<template>
    <div id="welcome">
        <!-- Header -->
        <Header></Header>
        <!-- 顶部导航 -->
        <Nav :systemNavShow="true"></Nav>
        <!-- 面包屑 -->
        <Crumb :crumbs="crumbs"></Crumb>
        <!-- Form -->
        <div class="form-container">
            <p>欢迎使用启焕站群管理系统</p>
            <el-form ref="form" :model="form">
                <el-form-item>
                    <el-radio-group v-model="form.resource">
                        <el-radio label="1">进行初始化设置向导</el-radio>
                        <el-radio label="2">不，稍后我自己配置，直接进入后台首页</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                </el-form-item>
            </el-form>
            <!-- Footer -->
        </div>
        <Footer :systemFooterShow="true"></Footer>
    </div>
</template>
<script>
/* 引入组件 */
import Nav from "@/components/Nav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Crumb from "@/components/Crumb";
export default {
  name: "welcome",
  data() {
    return {
      systemNavShow: true, //本页面需要展示在nav的元素
      systemFooterShow: true, //本页面在Footer需要的元素
      //表单
      //面包屑
      crumbs: [
        {
          name: "位置",
          url: ""
        },
        {
          name: "欢迎界面",
          url: ""
        }
      ],
      form: {
        resource: "2" //特殊资源
      }
    };
  },
  components: {
    Header,
    Nav,
    Footer,
    Crumb
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style lang="less" scoped>
#welcome {
  background: #fff;
  .form-container {
    text-align: center;
    form {
      width: 800px;
      margin: 0 auto;
      text-align: center;
    }
  }
}
</style>

