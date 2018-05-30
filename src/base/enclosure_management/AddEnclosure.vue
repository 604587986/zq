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
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
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
      //upload
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          status: "finished"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          status: "finished"
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
    //upload
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
}
</style>
