<template>
  <div id="PublishArtice">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <div class="btn-wrapper" style="margin-left:108px;">
      <!-- <el-button type="primary" size="mini">发文章</el-button> -->
      <!-- <el-button type="primary" size="mini">发链接</el-button> -->
    </div>
    <!-- Form -->
    <div class="form-container">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="108px" size="mini" label-position="right">
        <!-- <el-form-item label="主菜单" class="form-item" prop="mainColumn">
            <el-select v-model="form.mainColumn" placeholder="请选择主菜单" style="width:100%;">
                <el-option v-for="item in mainColumnList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="副菜单" class="form-item">
            <el-select v-model="form.subColumn" placeholder="请选择副菜单" style="width:100%;">
                <el-option v-for="item in subColumnList" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item label="分类" class="form-item" prop="category_id">
          <el-cascader v-model="categoryValue" :options="categoryList" clearable placeholder="分类" change-on-select :props="{value:'id',label:'title',children:'children'}" size="mini" class="float-left column-selection" @change="currentPaging.currentPage = 1;getData()">
          </el-cascader>
        </el-form-item>
        <el-form-item label="标题" class="form-item" prop="title">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <!-- <el-form-item label="SEO标题" class="form-item">
            <el-input v-model="form.name" placeholder="请输入英文字母"></el-input>
        </el-form-item> -->
        <el-form-item label="作者" class="form-item" prop="author">
            <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="摄影" class="form-item">
            <el-input v-model="form.photo"></el-input>
        </el-form-item> 
        <el-form-item label="编辑" class="form-item">
            <el-input v-model="form.editor"></el-input>
        </el-form-item> 
        <el-form-item label="来源" class="form-item">
            <el-input v-model="form.source"></el-input>
        </el-form-item> 
        <el-form-item label="文章配图">
          <file-picker v-model="form.image_id" :allowType="['image']"></file-picker>
        </el-form-item>     
        <el-form-item label="文章发布日期" class="form-item">
          <el-date-picker
            v-model="form.release_time"
            type="datetime"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="文章发布日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="置顶截止日期" class="form-item">
          <el-date-picker
            v-model="form.pin_date"
            type="datetime"
            value-format="yyyy-MM-dd hh:mm:ss"
            :picker-options="pickerOptions"
            placeholder="选择置顶截止日期">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="属性" class="form-item" prop="attribute">
            <el-radio-group v-model="form.attribute">
                <el-radio label="推荐"></el-radio>
                <el-radio label="头条"></el-radio>
                <el-radio label="置顶"></el-radio>
            </el-radio-group>
        </el-form-item> -->
        <el-form-item label="文章标签" class="form-item">
            <tag @change="getTags"></tag>
        </el-form-item>
        <el-form-item label="是否推荐" class="form-item">
            <el-switch
            v-model="form.recommend"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#909399">
          </el-switch>
        </el-form-item>
        <el-form-item label="文章内容">
          <tinymce :height="300" v-model="form.content" id='tinymce'></tinymce>
        </el-form-item>
        <!-- <el-form-item label="文章排序" class="form-item" prop="sort">
          <el-input v-model.number="form.sort"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="发布日期" class="form-item" prop="date">
            <el-date-picker v-model="form.date" align="right" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item> -->
        <el-form-item class="form-control-btn">
          <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">提交</el-button>
          <!-- <el-checkbox v-model="continueBtn" style="margin-left:10px;">发布后继续</el-checkbox> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import FilePicker from "@/components/FilePicker";
import Tag from "@/components/Tag";
import Tinymce from "@/components/Tinymce";

import { createArticle, saveArticle } from "@/api/article/ArticleList";
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
      //分类列表
      categoryList: [],
      categoryValue: [],
      form: {
        id: "",
        title: "",
        // name: "",
        image_id: "",
        // state: "",
        // state_verify: "",
        // image_id: "",
        // sort: "",
        release_time: "",
        pin_date: "",
        editor: "",
        source: "",
        // create_time: "",
        // update_time: "",
        // user_id: "",
        // site_id: "",
        category_id: "",
        author: "",
        photo: "",
        tag_id: "",
        recommend:0,
        // url: ""
      },
      rules: {
        category_id: [
          {
            required: true,
            message: "请选择分类",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: true,
            message: "请输入文章标题",
            trigger: "blur"
          },
          {
            min: 1,
            message: "文章标题不能为空",
            trigger: "blur"
          }
        ],
        author: [
          {
            required: true,
            message: "请输入作者",
            trigger: "blur"
          },
          {
            min: 1,
            message: "作者不能为空",
            trigger: "blur"
          }
        ]
      },
      //提交按钮loading
      subLoading: false,
      // 是否继续按钮
      continueBtn: false,
      //是否已提交
      isSubmit: false,
      //置顶截止日期需大于当前时间
      pickerOptions: {
        disabledDate: function(val) {
          let now = new Date();
          return val < now ? true : false;
        }
      }
    };
  },
  mounted() {
    //文章预创建
    this.toCreate();
  },
  methods: {
    //文章预创建
    toCreate() {
      createArticle().then(res => {
        if (res.data.code == 200) {
          //赋值id
          this.form.id = res.data.data.data.id;
          //赋值分类列表
          this.categoryList = res.data.data.fields.category;
          //赋值当前创建时间到发布时间上
          this.form.release_time = res.data.data.data.create_time;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //表单提交
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        that.subLoading = true;
        if (valid) {
          //保存文章
          saveArticle(that.form).then(res => {
            that.subLoading = false;
            if (res.data.code == 200) {
              that.isSubmit = true;
              that.$message.success('发布成功');
              that.$router.push("/pages/editor/editor/article_list");
            } else {
              that.$message.error(res.data.message);
            }
          });
        } else {
          that.subLoading = false;
          that.$message.error("提交失败!");
          return false;
        }
      });
    },
    //监听tag变化，将标签值绑定到form上
    getTags(val) {
      this.$set(this.form, "tag_id", val);
    }
  },
  watch:{
    categoryValue:function(val){
      this.$set(this.form,'category_id',val[val.length-1])
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isSubmit) {
      this.$confirm("是否放弃保存并离开此页面", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          next();
        })
        .catch(() => {
          next(false);
        });
    } else {
      next();
    }
  },

  components: {
    Crumb,
    FilePicker,
    Tag,
    Tinymce
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
