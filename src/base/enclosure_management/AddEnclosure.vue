<template>
  <div id="AddEnclosure">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="form-container">
      <div class="prompt">
        <p class="title">提示：</p>
        <p>图片类型仅支持jpg、png、gif格式</p>
        <p>文档格式支持 .doc,docx,ppt,pptx,pdf,xls,xlxs</p>
        <p>音频支持.mp3 视频支持.mp4 格式(可在系统参数中修改)</p>
      </div>
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="95px" size="mini" label-position="right">
        <el-form-item label="附件格式：" prop="format">
          <el-radio-group v-model="form.format">
            <el-radio label="图片"></el-radio>
            <el-radio label="文档"></el-radio>
            <el-radio label="音频"></el-radio>
            <el-radio label="视频"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="附件标题：" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上传文件：">
          <uploader :options="options" :fileStatusText="fileStatusText" :autoStart="false" @file-added="fileAdd" class="uploader-example" ref="uploader">
            <uploader-unsupport></uploader-unsupport>
              <uploader-drop>
                <p>拖动文件或者选择文件</p>
                <uploader-btn>选择文件</uploader-btn>
              </uploader-drop>
              <uploader-list></uploader-list>
          </uploader>
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
/* 添加附件 */
export default {
  name: "DataBackup",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "附件管理",
          url: ""
        },
        {
          name: "添加附件",
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
      form: {
        title: "",
        format: ""
      },
      //表单验证
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          },
          {
            min: 1,
            //max: 5,
            message: "标题不能为空",
            trigger: "blur"
          }
        ],
        format: [
          {
            required: true,
            message: "请选择格式",
            trigger: "change"
          }
        ]
      },
      //upload配置
      options: {
        target: "//jsonplaceholder.typicode.com/posts/",
        testChunks: false
      },
      fileStatusText: {
        success: "成功",
        error: "错误",
        uploading: "正在上传",
        paused: "暂停",
        waiting: "等待中"
      }
    };
  },
  components: {
    Crumb,
    Instructions
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 2);
    this.$store.commit("update_system_menu_idx", 2);
  },
  methods: {
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
    },
    fileAdd(file){
      var dataURL = window.URL.createObjectURL(file.file) 
      var image = new Image();
      image.setAttribute('src',dataURL) ;
      image.onload = function(){
      console.log(image.width)        
      console.log(image.height)        
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../assets/css/less_config.less";
#AddEnclosure {
  .prompt {
    font-size: 14px;
    color: @text-color;
    line-height: 24px;
    margin-bottom: 20px;
    .title {
      font-size: 16px;
    }
  }
  .uploader-example {
    width: 100%;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
