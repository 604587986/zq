<template>
  <div id="AddFriendlyLink">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
      <div class="form-container">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="150px" size="mini" label-position="right">
        <el-form-item label="标题:">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="分类" class="form-item" prop="category_id">
        <el-select v-model="form.category_id" placeholder="分类" clearable size="mini" class="state-selection">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="图片:">
          <file-picker v-model="form.image_id" :allowType="['image']"></file-picker>
        </el-form-item>
        <el-form-item label="链接:">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <!-- <el-form-item label="排序:">
          <el-input v-model="form.sort"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="是否启用:">
          <el-radio-group v-model="form.state">
              <el-radio :label="1">显示</el-radio>
              <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item class="form-control-btn">
          <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Instructions from "@/components/Instructions";
import FilePicker from "@/components/FilePicker";

import {index} from "@/api/gallery_category/index";
import { createLink } from "@/api/friendly_link/friendly_link";

/* 添加友情链接 */
export default {
  name: "AddFriendlyLink",
  data() {
    return {
      haha: "",
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "友情链接列表",
          url: "/pages/editor/editor/friendly_link"
        },
        {
          name: "添加友情链接",
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
      //提交按钮loading
      subLoading: false,

      //表单
      form: {},
      //分类列表
      typeList: [],
      //表单验证
      rules: {
        
        
      },
      //分类列表
      categoryList: [],
      //当前分类
      categoryValue:''
    };
  },
  components: {
    Crumb,
    Instructions,
    FilePicker
  },
  mounted: function() {
    //获取分类列表
    this.getAllCategory();
  },
  methods: {
    //表单提交
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        that.subLoading = true;
        if (valid) {
            createLink(that.form).then(res=>{
              that.subLoading = false;
              if(res.data.code == 200){
                that.$message.success('添加成功');
                that.$router.push('/pages/editor/editor/friendly_link')
              }else{
                that.$message.error(res.data.message)
              }
            })
        } else {
          that.subLoading = false;
          that.$message.error("提交失败!");
          return false;
        }
      });
    },
    //获取所有分类
    getAllCategory() {
      let data = {
        page: 0,
        type: 2
      };
      index(data).then(res => {
        if (res.data.code == 200 || res.data.code == 404) {
          this.categoryList = res.data.data.list;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
