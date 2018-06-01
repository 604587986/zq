<template>
  <div id="SecuritySetting">
    <!-- 内层菜单 -->
    <InnerMenu :innerMenu="innerMenu"></InnerMenu>
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="form-container">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="110px" size="mini" label-position="right">
        <el-form-item label="禁止访问网站IP列表" class="form-item" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="禁止登录后台IP列表：" class="form-item">
          <el-input v-model="form.domain_name"></el-input>
        </el-form-item>
        <el-form-item label="后台登录失败次数锁定（锁定IP）：" class="form-item">
          <el-input v-model="form.host_unit"></el-input>
        </el-form-item>
        <el-form-item label="解除锁定IP时间：" class="form-item">
          <el-input v-model="form.keyword"></el-input>
        </el-form-item>
        <el-form-item label="是否启用防CC攻击：" class="form-item">
          <el-input v-model="form.describe" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="同一IP每3秒钟超过多少次访问视为CC攻击：" class="form-item">
          <el-input v-model="form.access_statistics_code" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="针对攻击IP,隔多久才允许访问：" class="form-item">
          <el-input v-model="form.footer_info" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="IP验证功能：" class="form-item">
          <el-switch v-model="form.open" active-color="#13ce66" inactive-color="#aaa"></el-switch>
        </el-form-item>
        <el-form-item label="敏感词设置：" class="form-item" prop="close_info" v-if="!form.open">
          <el-input v-model="form.close_info" type="textarea" :rows="2"></el-input>
          <span class="site-item-info">必须填写，最多50个字符</span>
        </el-form-item>
        <el-form-item label="内容包含敏感词提示：" class="form-item">
          <el-input v-model="form.remarks" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="后台登录启用验证码：" class="form-item">
          <el-input v-model="form.remarks" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="启用后台操作日志：" class="form-item">
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
import InnerMenu from "@/components/InnerMenu";
/* 添加站点 */
export default {
  name: "SecuritySetting",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "系统设置",
          url: ""
        },
        {
          name: "全局设置",
          url: ""
        },
        {
          name: "安全设置",
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
      //内层菜单
      innerMenu: {
        system: true,
        list: [
          {
            name: "站点信息",
            url: "/pages/system_administrators/System_Administrators/SiteInfo",
            list_active: false
          },
          {
            name: "安全设置",
            url: "/pages/system_administrators/System_Administrators/SecuritySetting",
            list_active: true
          },
          {
            name: "附件设置",
            url: "/pages/system_administrators/System_Administrators/EnclosureSetting",
            list_active: false
          },
          {
            name: "邮件设置",
            url: "/pages/system_administrators/System_Administrators/MailSetting",
            list_active: false
          },
          {
            name: "后台登录页设置",
            url: "/pages/system_administrators/System_Administrators/LoginPageSetting",
            list_active: false
          },
          {
            name: "自动化设置",
            url: "/pages/system_administrators/System_Administrators/AutomationSetting",
            list_active: false
          }
        ]
      },
      //提交按钮loading
      subLoading: false,
      //表单
      form: {
        title: "", //站点名称
        domain_name: "", //域名
        host_unit: "", //主办单位
        keyword: "", //网站关键字
        describe: "", //网站描述
        access_statistics_code: "", //访问统计代码
        footer_info: "", //底部信息
        remarks: "", //备注
        open: true, //是否开启
        close_info: "系统维护 暂时关闭" //关闭原因
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
        ],
        categoryValue: [
          {
            required: true,
            message: "请选择所属类别",
            trigger: "change"
          }
        ],
        subordinateDepartmentValue: [
          {
            required: true,
            message: "请选择所属部门",
            trigger: "change"
          }
        ],
        siteAdministratorValue: [
          {
            required: true,
            message: "请选择站点管理员",
            trigger: "change"
          }
        ]
      }
    };
  },
  components: {
    Crumb,
    InnerMenu,
    Instructions
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 6);
    this.$store.commit("update_system_menu_idx", 6);
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
