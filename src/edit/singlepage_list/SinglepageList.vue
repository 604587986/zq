<template>
  <div id="SinglepageList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- Form -->
    <div class="form-container">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="108px" size="mini" label-position="right">
        <el-form-item label="单页" class="form-item">
            <el-select v-model="form.type" placeholder="请选择" style="width:100%;">
                <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="单页内容">
          <quill-editor 
                v-model="form.content" 
                ref="myQuillEditor" 
                :options="editorOption" 
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
          </quill-editor>
        </el-form-item>
        <el-form-item class="form-control-btn">
          <el-button type="primary" size="large">预览</el-button>
          <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";

export default {
  name: "SinglepageList",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "单页列表",
          url: ""
        }
      ],
      
      //编辑器配置
      editorOption: {},
      form: {},
      rules: {},
      //提交按钮loading
      subLoading: false,
      // 是否继续按钮
      continueBtn: false
    };
  },
  methods: {
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    },
    //表单提交
    submitForm(formName) {}
  },
  components: {
    Crumb
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
