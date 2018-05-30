<template>
  <div id="TemplateList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <router-link to="/pages/system_administrators/System_Administrators/AddTemplate" class="float-left filter-link">
          <el-button size="mini" type="primary">添加模板</el-button>
        </router-link>
        <el-input placeholder="请输入关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="articleSearch()"></el-button>
        </el-input>
      </div>
      <!-- template-list -->
      <div class="template-list">
        <ul>
          <li v-for="item in templates" :key="item.id">
            <p class="template-title">{{item.template_title}}</p>
            <ol>
              <li v-for="list in item.template_list" :key="list.id" class="float-left">
                <div class="template-img-box">
                  <img :src="list.img_url" alt="">
                </div>
                <p class="t-name">{{list.template_name}}</p>
                <div class="t-url">
                  <router-link :to="list.edit_url">编辑</router-link>
                  <a :href="list.look_url" target="_blank">预览</a>
                </div>
              </li>
            </ol>
            <!-- 分页 -->
            <Paging></Paging>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Paging from "@/components/Paging";
import Instructions from "@/components/Instructions";
/* 模板列表 */
export default {
  name: "TemplateList",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "模板管理",
          url: ""
        },
        {
          name: "模板列表",
          url: ""
        }
      ],
      //使用说明
      instructionsInfo: [
        {
          title: "标题1",
          content: "添加站点使用说明"
        },
        {
          title: "标题2",
          content: "添加站点使用说明"
        }
      ],
      //栏目检索
      titleSearchValue: "",
      //模板列表
      templates: {}
    };
  },
  components: {
    Crumb,
    Instructions,
    Paging
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 4);
    this.$store.commit("update_system_menu_idx", 4);
    var that = this;
    //获取数据
    function get_template_list() {
      return that.$http.get("./static/mock/template.json");
    }

    that.$http.all([get_template_list()]).then(
      that.$http.spread(function(template) {
        // 请求现在都执行完成
        that.templates = template.data;
      })
    );
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#TemplateList {
  #paging {
    margin-top: 0;
    margin-bottom: 40px;
  }
}
</style>
