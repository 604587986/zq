<template>
  <div id="AddActivity">
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
        <el-form-item label="主办方:">
          <el-input v-model="form.organizer"></el-input>
        </el-form-item>
        <el-form-item label="介绍:">
          <el-input v-model="form.introduce"></el-input>
        </el-form-item>
        <el-form-item label="图片:">
          <file-picker v-model="form.img"></file-picker>
        </el-form-item>
        <el-form-item label="活动时间:">
          <el-input v-model="form.date"></el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="是否启用:">
          <el-radio-group v-model="form.state">
              <el-radio :label="1">显示</el-radio>
              <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
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

// import { toAddCategory } from "@/api/category/category";

/* 添加活动 */
export default {
  name: "AddActivity",
  data() {
    return {
      haha:'',
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "活动列表",
          url: "/pages/editor/editor/activity_preview"
        },
        {
          name: "添加活动",
          url: ""
        },
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
       
      },
      //广告类型列表
      typeList:[
          {
              value:1,
              title:'漂浮广告'
          },
          {
              value:2,
              title:'对联广告'
          },
          {
              value:3,
              title:'右下角弹出'
          },
      ],
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
        alias: [
          {
            required: true,
            message: "请输入别名",
            trigger: "blur"
          },
          {
            min: 1,
            message: "别名不能为空",
            trigger: "blur"
          }
        ],
        state: [
          {
            required: true,
            message: "请选择站点状态",
            trigger: "blur"
          }
        ],
        close_info: [
          {
            required: true,
            message: "请输入关闭原因",
            trigger: "blur"
          },
          {
            min: 1,
            max: 50,
            message: "不能超过50个字",
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
        ]
      },
    };
  },
  components: {
    Crumb,
    Instructions,
    FilePicker
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 1);
    this.$store.commit("update_system_menu_idx", 1);
  },
  methods: {
    //表单提交
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {
        that.subLoading = true;
        if (valid) {
        //   toAddCategory(that.form).then(res=>{
        //     that.subLoading = false;
        //     if(res.data.code == 200){              
        //       that.$message.success('添加成功')
        //     }else{
        //       that.$message.error(res.data.message)
        //     }
        //   })
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
