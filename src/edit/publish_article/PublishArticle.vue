<template>
  <div id="PublishArtice">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <el-button type="primary" size="mini">发文章</el-button>
    <el-button type="primary" size="mini">发链接</el-button>
    <!-- Form -->
    <div class="form-container">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="108px" size="mini" label-position="right">
        <el-form-item label="主栏目" class="form-item" prop="mainColumn">
            <el-select v-model="form.mainColumn" placeholder="请选择主栏目" style="width:100%;">
                <el-option v-for="item in mainColumnList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="副栏目" class="form-item">
            <el-select v-model="form.subColumn" placeholder="请选择副栏目" style="width:100%;">
                <el-option v-for="item in subColumnList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标题" class="form-item" prop="title">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="属性" class="form-item" prop="attribute">
            <el-radio-group v-model="form.attribute">
                <el-radio label="推荐"></el-radio>
                <el-radio label="头条"></el-radio>
                <el-radio label="置顶"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="缩略图" class="form-item">
            <el-upload action="./upload/upload.json" class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="来源" class="form-item" prop="comeFrom">
            <el-select v-model="form.comeFrom" placeholder="请选择栏目" style="width:100%;">
                <el-option v-for="item in sourceList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="作者" class="form-item">
            <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="编辑" class="form-item">
            <el-input v-model="form.editer"></el-input>
        </el-form-item>
        <el-form-item label="摄影" class="form-item">
            <el-input v-model="form.photoGraphy"></el-input>
        </el-form-item>
        <el-form-item label="文章内容">
          <quill-editor 
                v-model="form.content" 
                ref="myQuillEditor" 
                :options="editorOption" 
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
          </quill-editor>
        </el-form-item>
        <el-form-item label="文章排序" class="form-item" prop="sort">
          <el-input v-model.number="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="置顶" class="form-item">
            <el-select v-model="form.toTop" placeholder="请选择" style="width:100%;">
                <el-option v-for="item in toTopList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="发布日期" class="form-item" prop="date">
            <el-date-picker v-model="form.date" align="right" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item class="form-control-btn">
          <el-button type="primary" size="large">预览</el-button>
          <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">提交</el-button>
          <el-checkbox v-model="continueBtn" style="margin-left:10px;">发布后继续</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";

export default {
  name: "PublishArtice",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "发文章",
          url: ""
        }
      ],
      //主栏目列表
      mainColumnList: [
        {
          value: 0,
          label: "学术交流"
        },
        {
          value: 1,
          label: "通知公告"
        },
        {
          value: 2,
          label: "下载中心"
        },
        {
          value: 3,
          label: "联系我们"
        }
      ],
      //副栏目列表
      subColumnList: [
        {
          value: 0,
          label: "学术交流"
        },
        {
          value: 1,
          label: "通知公告"
        },
        {
          value: 2,
          label: "下载中心"
        },
        {
          value: 3,
          label: "联系我们"
        }
      ],
      // 来源列表
      sourceList: [
        {
          value: 0,
          label: "学术交流"
        },
        {
          value: 1,
          label: "通知公告"
        },
        {
          value: 2,
          label: "下载中心"
        },
        {
          value: 3,
          label: "联系我们"
        }
      ],
      //置顶
      toTopList: [
        {
          value: 0,
          label: "置顶一天"
        },
        {
          value: 1,
          label: "置顶一周"
        },
        {
          value: 2,
          label: "置顶一个月"
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
