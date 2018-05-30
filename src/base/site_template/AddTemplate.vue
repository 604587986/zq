<template>
  <div id="AddTemplate">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="form-container">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="125px" size="mini" label-position="right">
        <el-form-item label="模板名称：" class="form-item" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="编码：" class="form-item" prop="code">
          <el-select v-model="form.code" clearable placeholder="所属类别" size="mini">
            <el-option v-for="item in code_list" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型：" class="form-item" prop="type">
          <el-select v-model="form.type" clearable placeholder="所属部门" size="mini">
            <el-option v-for="item in type_list" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模版html路径：" class="form-item" prop="html_src">
          <el-input v-model="form.html_src"></el-input>
          <span class="site-item-info">填写模版所在文件路径 /template/blue2017</span>
        </el-form-item>
        <el-form-item label="模版css路径：" class="form-item" prop="css_src">
          <el-input v-model="form.css_src"></el-input>
          <span class="site-item-info">填写模版样式文件路径</span>
        </el-form-item>
        <el-form-item label="模版图片路径：" class="form-item" prop="img_src">
          <el-input v-model="form.img_src"></el-input>
          <span class="site-item-info">填写模版图片文件路径</span>
        </el-form-item>
        <el-form-item label="模版js路径：" class="form-item" prop="js_src">
          <el-input v-model="form.js_src"></el-input>
          <span class="site-item-info">填写模版js文件路径</span>
        </el-form-item>
        <el-form-item label="上传预览图：" class="form-item">
          <el-upload action="./upload/upload.json" class="avatar-uploader wechat_weibo_uploader" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="form.img" :src="form.weibo_img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="排序：" class="form-item" prop="sort">
          <el-input v-model.number="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="备注：" class="form-item">
          <el-input v-model="form.remarks" type="textarea" :rows="2"></el-input>
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
/* 添加模板 */
export default {
  name: "AddTemplate",
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
          name: "添加模板",
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
      form: {
        title: "", //站点名称
        code: "", //编码
        img: "", //新浪微博二维码
        sort: "", //排序
        type: "", //类型
        html_src: "",
        css_src: "",
        img_src: "",
        js_src: ""
      },
      //表单验证
      rules: {
        title: [
          {
            required: true,
            message: "请输入站点名称",
            trigger: "blur"
          },
          {
            min: 1,
            message: "站点名称不能为空",
            trigger: "blur"
          }
        ],
        html_src: [
          {
            required: true,
            message: "请输入html路径",
            trigger: "blur"
          },
          {
            min: 1,
            message: "html路径不能为空",
            trigger: "blur"
          }
        ],
        css_src: [
          {
            required: true,
            message: "请输入css路径",
            trigger: "blur"
          },
          {
            min: 1,
            message: "css路径不能为空",
            trigger: "blur"
          }
        ],
        img_src: [
          {
            required: true,
            message: "请输入img路径",
            trigger: "blur"
          },
          {
            min: 1,
            message: "img路径不能为空",
            trigger: "blur"
          }
        ],
        js_src: [
          {
            required: true,
            message: "请输入js路径",
            trigger: "blur"
          },
          {
            min: 1,
            message: "js路径不能为空",
            trigger: "blur"
          }
        ],
        sort: [
          {
            required: true,
            validator: function(rule, value, callback) {
              if (!Number.isInteger(value)) {
                callback(new Error("请输入数字值"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请选择编码",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择类型",
            trigger: "change"
          }
        ]
      },
      code_list: [
        {
          value: 0,
          label: "UTF8"
        },
        {
          value: 1,
          label: "GBK"
        }
      ],
      type_list: [
        {
          value: 0,
          label: "整站模板"
        },
        {
          value: 1,
          label: "组件模板"
        }
      ]
    };
  },
  components: {
    Crumb,
    Instructions
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 4);
    this.$store.commit("update_system_menu_idx", 4);
  },
  methods: {
    //图片上传
    handleAvatarSuccess(res, file) {
      this.form.wechat_img = URL.createObjectURL(file.raw);
    },
    //上传限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传缩略图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传缩略图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //表单提交
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        that.subLoading = true;
        if (valid) {
          that.subLoading = false;
          that.$message({
            type: "success",
            message: "提交成功!"
          });
        } else {
          that.subLoading = false;
          that.$message.error("提交失败!");
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
