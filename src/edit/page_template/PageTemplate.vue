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
        <router-link to="/pages/editor/editor/add_template" class="float-left filter-link">
          <el-button size="mini" type="primary">添加模板</el-button>
        </router-link>
        <el-select v-model="typeValue" placeholder="选择模板类型" size="mini" class="float-left state-selection">
          <el-option v-for="item in typeList" :key="item.label" :label="item.label" :value="item.label"></el-option>
        </el-select>
        <el-input placeholder="请输入关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="articleSearch()"></el-button>
        </el-input>
      </div>
      <!-- template-list -->
      <div class="template-list">
        <ul>
          <li>
            <p class="template-title">{{typeValue}}</p>
            <ol>
              <li v-for="list in templates" :key="list.id" class="float-left">
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
          url: "/pages/administrators/Administrators"
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
      //模板类型
      typeList: [
        {
          label: "整站模板"
        },
        {
          label: "组件模板"
        },
        {
          label: "单页模板"
        }
      ],
      typeValue: '整站模板',
      //菜单检索
      titleSearchValue: "",
      //模板列表
      templates: [
        {
          img_url: "./static/img/template.jpg",
          template_name: "大学典雅蓝风格",
          edit_url:
            "/pages/editor/editor/edit_template",
          look_url: "javascript:void(0);"
        },
        {
          img_url: "./static/img/template.jpg",
          template_name: "大学典雅蓝风格",
          edit_url:
            "/pages/editor/editor/edit_template",
          look_url: "javascript:void(0);"
        },
        {
          img_url: "./static/img/template.jpg",
          template_name: "大学典雅蓝风格",
          edit_url:
            "/pages/editor/editor/edit_template",
          look_url: "javascript:void(0);"
        },
        {
          img_url: "./static/img/template.jpg",
          template_name: "大学典雅蓝风格",
          edit_url:
            "/pages/editor/editor/edit_template",
          look_url: "javascript:void(0);"
        },

      ]
    };
  },
  components: {
    Crumb,
    Instructions,
    Paging
  },
  mounted: function() {
    var that = this;
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
