<template>
  <div id="AddSinglepage">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="form-container">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="120px" size="mini" label-position="right">
        <el-form-item label="名称：" class="form-item">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="模板文件路径:">
          <el-input v-model="form.page_tpl"></el-input>
        </el-form-item>
        <el-form-item label="模板文件ID:">
          <el-input v-model="form.index_tpl_id"></el-input>
        </el-form-item>
        <el-form-item label="页面SEO名称:">
          <el-input v-model="form.seo_name"></el-input>
        </el-form-item>
        <el-form-item label="页面SEO描述:">
          <el-input v-model="form.seo_desc"></el-input>
        </el-form-item>
        <el-form-item label="页面SEO关键字:">
          <el-input v-model="form.seo_keywords"></el-input>
        </el-form-item>
        <el-form-item label="附加数据(分类):">
          <!-- 分类 -->
          <div v-for="(row,index) in this.form.data.category" :key="row.id" style="margin-bottom:10px">
            <span>分类：</span>
            <el-select v-model="row.id" size="mini" placeholder="请选择分类" :popper-append-to-body="false">
              <el-option v-for="item in categoryList" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
            <span>列表数量：</span>
              <el-input  v-model="row.size" style="width:auto"></el-input>
              <el-button @click="del_category(index)" size="mini" type="danger">删除本条</el-button>
          </div> 
          <div><el-button @click="add_category()" size="mini" type="success">新增</el-button></div>
        </el-form-item>
        <el-form-item label="附加数据(链接):">
          <!-- 链接 -->
          <div v-for="(row,index) in this.form.data.link" :key="row.id" style="margin-bottom:10px">
            <span>链接：</span>
            <span>标题：</span>
              <el-input  v-model="row.title" style="width:auto"></el-input>
            <span>地址：</span>
              <el-input  v-model="row.url" style="width:auto"></el-input>
              <el-button @click="del_link(index)" size="mini" type="danger">删除本条</el-button>
          </div> 
          <div><el-button @click="add_link()" size="mini" type="success">新增</el-button></div>
        </el-form-item>
        <el-form-item label="附加数据(图片):">
          <!-- 图片 -->
          <div v-for="(row,index) in this.form.data.image" :key="createKey(index)" style="margin:10px 0">
            <span>图片:</span>
            <el-tag>id：{{row.id}}</el-tag>
            <file-picker style="display:inline-block" v-model="row.id" :allowType="['image']"></file-picker>
            <el-button @click="del_image(index)" size="mini" type="danger">删除本条</el-button>
          </div>
          <div><el-button @click="add_image()" size="mini" type="success">新增</el-button></div>
        </el-form-item>
        <el-form-item label="附加数据(视频):">
          <!-- 视频 -->
          <div v-for="(row,index) in this.form.data.movie" :key="createKey(index)" style="margin:10px 0">
            <span>视频:</span>
            <el-tag>id：{{row.id}}</el-tag>
            <file-picker style="display:inline-block" v-model="row.id" :allowType="['video']"></file-picker>
            <el-button @click="del_movie(index)" size="mini" type="danger">删除本条</el-button>
          </div>
          <div><el-button @click="add_movie()" size="mini" type="success">新增</el-button></div>
        </el-form-item>
        <el-form-item label="附加数据(附件):">
          <!-- 附件 -->
          <div v-for="(row,index) in this.form.data.attachment" :key="createKey(index)" style="margin:10px 0">
            <span>附件:</span>
            <el-tag>id：{{row.id}}</el-tag>
            <file-picker style="display:inline-block" v-model="row.id" :allowType="['doc']"></file-picker>
            <el-button @click="del_attachment(index)" size="mini" type="danger">删除本条</el-button>
          </div>
          <div><el-button @click="add_attachment()" size="mini" type="success">新增</el-button></div>
        </el-form-item>
        <el-form-item label="页面内容:">
            <tinymce :height="300" v-model="form.content" id='tinymce'></tinymce>
        </el-form-item>
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
import Tinymce from "@/components/Tinymce";

import { addPage } from "@/api/single_page/single";
import { getCategoryList } from "@/api/category/category";

/* 添加用户 */
export default {
  name: "AddSinglepage",
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
          url: "/pages/editor/editor/singlepage_list"
        },
        {
          name: "添加单页",
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
      form: { data: { category: [],link: [], image: [] ,movie:[] ,attachment:[]}},
      //表单验证
      rules: {
        account: [
          {
            required: true,
            validator: function(rule, value, callback) {
              var reg = /^[0-9a-zA-Z_]{1,12}$/; //1-12位数字字母下划线
              if (!value) {
                callback(new Error("用户名不能为空"));
              } else if (reg.test(value) == false) {
                callback(
                  new Error("用户名必须为数字/字母/下划线,长度不超过12位")
                );
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        passwd: [
          {
            required: true,
            validator: function(rule, value, callback) {
              var reg = /^[0-9a-zA-Z_]{6,12}$/; //6-12位数字字母下划线
              if (!value) {
                callback(new Error("密码不能为空"));
              } else if (reg.test(value) == false) {
                callback(
                  new Error("密码必须为数字/字母/下划线,长度6-12位之间")
                );
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          },
          {
            min: 1,
            message: "昵称不能为空",
            trigger: "blur"
          }
        ],
        mail: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [
          {
            required: true,
            validator: function(rule, value, callback) {
              var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
              if (!value) {
                callback(new Error("号码不能为空"));
              } else if (reg.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },
      //分类列表
      categoryList: [],
      siteList: []
    };
  },
  components: {
    Crumb,
    Instructions,
    FilePicker,
    Tinymce
  },
  mounted: function() {
    //获取分类列表
    this.getCategory();
  },
  methods: {
    //表单提交
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        that.subLoading = true;
        if (valid) {
          //将form.data.image转换为不带id的数组
          let arr1 = [];
          for(let i in that.form.data.image){
            arr1.push(that.form.data.image[i].id)
          }
          that.form.data.image = arr1;
          //将form.data.movie转换为不带id的数组
          let arr2 = [];
          for(let i in that.form.data.movie){
            arr2.push(that.form.data.movie[i].id)
          }
          that.form.data.movie = arr2;
          //将form.data.attachment转换为不带id的数组
          let arr3 = [];
          for (let i in that.form.data.attachment) {
            arr3.push(that.form.data.attachment[i].id);
          }
          that.form.data.attachment = arr3;
          //将附加数据（json）转换为字符串
          that.form.data = JSON.stringify(that.form.data);
          addPage(that.form).then(res => {
            that.subLoading = false;
            if (res.data.code == 200) {
              that.$message.success("添加成功");
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
    //获取分类列表
    getCategory() {
      let data = {};
      getCategoryList(data).then(res => {
        if (res.data.code == 200 || res.data.code == 404) {
          this.categoryList = res.data.data.list;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //删除一行附加数据：分类
    del_category(index) {
      this.form.data.category.splice(index, 1);
    },
    //新增一行附加数据：分类
    add_category() {
      this.form.data.category.push({ id: "", size: ""});
    },
    //删除一行附加数据：链接
    del_link(index) {
      this.form.data.link.splice(index, 1);
    },
    //新增一行附加数据：链接
    add_link() {
      this.form.data.link.push({ title: "", url: ""});
    },
    //删除一行附加数据：图片
    del_image(index) {
      this.form.data.image.splice(index, 1);
    },
    //新增一行附加数据：图片
    add_image() {
      this.form.data.image.push({ id: "" });
    },
    //删除一行附加数据：视频
    del_movie(index) {
      this.form.data.movie.splice(index, 1);
    },
    //新增一行附加数据：视频
    add_movie() {
      this.form.data.movie.push({ id: "" });
    },
    //删除一行附加数据：附件
    del_attachment(index) {
      this.form.data.attachment.splice(index, 1);
    },
    //新增一行附加数据：附件
    add_attachment() {
      this.form.data.attachment.push({ id: "" });
    },
    // 生成循环时所需唯一数（用于绑定key）
    createKey(a){
      return new Date().getTime()+a
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
