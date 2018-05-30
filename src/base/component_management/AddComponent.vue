<template>
  <div id="AddComponent">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="form-container">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="95px" size="mini" label-position="right">
        <el-form-item label="组件名称：" class="form-item" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="编码：" class="form-item" prop="code">
          <el-select v-model="form.code" clearable placeholder="所属类别" size="mini">
            <el-option v-for="item in code_list" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型：" class="form-item" prop="type">
          <el-select v-model="form.type" clearable placeholder="选择类型" size="mini">
            <el-option v-for="item in type_list" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授权：" class="form-item" prop="gave">
          <el-select v-model="form.gave" clearable placeholder="所属部门" size="mini">
            <el-option v-for="item in gave_list" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
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
/* 添加组件 */
export default {
  name: "AddComponent",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "组件管理",
          url: ""
        },
        {
          name: "添加组件",
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
        code: "",
        type: "",
        gave: "",
        sort: "", //排序
        remarks: "" //备注
      },
      //表单验证
      rules: {
        title: [
          {
            required: true,
            message: "请输入组件名称",
            trigger: "blur"
          },
          {
            min: 1,
            message: "组件名称不能为空",
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
        ],
        gave: [
          {
            required: true,
            message: "请选择部门",
            trigger: "change"
          }
        ]
      },
      //编码
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
          label: "组件"
        },
        {
          value: 1,
          label: "第三方组件"
        }
      ],
      //授权
      gave_list: [
        {
          value: 0,
          label: "党员办"
        },
        {
          value: 1,
          label: "组织人事"
        },
        {
          value: 2,
          label: "纪监审办公室"
        },
        {
          value: 3,
          label: "宣传部"
        },
        {
          value: 4,
          label: "研究生工作部"
        },
        {
          value: 5,
          label: "学生工作部"
        },
        {
          value: 6,
          label: "网络中心"
        },
        {
          value: 7,
          label: "教务处"
        },
        {
          value: 8,
          label: "招生办公室"
        },
        {
          value: 9,
          label: "科研创作处"
        },
        {
          value: 10,
          label: "外事处"
        },
        {
          value: 11,
          label: "计划财务处"
        },
        {
          value: 12,
          label: "校园建设和管理处"
        },
        {
          value: 13,
          label: "工会"
        },
        {
          value: 14,
          label: "保卫处"
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
    sessionStorage.setItem("system_menu_idx", 3);
    this.$store.commit("update_system_menu_idx", 3);
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
