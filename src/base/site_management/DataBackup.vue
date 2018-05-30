<template>
  <div id="DataBackup">
    <!-- 内层菜单 -->
    <InnerMenu :innerMenu="innerMenu"></InnerMenu>
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="form-container">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon size="mini" label-position="top">
        <el-form-item>
          <p class="backup-title">请选择备份类型</p>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="backup_type" label="备份数据（日常维护推荐使用只备份数据）" @change="backup"></el-radio>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="backup_type" label="全备份（包含所有站点文件数据及数据库）" @change="backup"></el-radio>
          <el-checkbox-group v-model="form.backup_choose" style="margin-left:24px;" v-if="form.backup_type==1?true:false">
            <el-checkbox label="文件增量备份"></el-checkbox>
            <el-checkbox label="不备份大文件"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">立即备份</el-button>
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
/* 数据备份 */
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
          name: "站点管理",
          url: ""
        },
        {
          name: "数据备份",
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
            name: "数据备份",
            url: "",
            list_active: true
          },
          {
            name: "自动备份设置",
            url: "",
            list_active: false
          },
          {
            name: "数据恢复",
            url: "",
            list_active: false
          }
        ]
      },
      //单选
      backup_type: "备份数据（日常维护推荐使用只备份数据）",
      //form
      form: {
        backup_type: 0, //备份类型
        backup_choose: []
      },
      //表单验证
      rules: {
        attribute: [
          {
            required: true,
            message: "请选择属性",
            trigger: "change"
          }
        ]
      }
    };
  },
  components: {
    Crumb,
    Instructions,
    InnerMenu
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 1);
    this.$store.commit("update_system_menu_idx", 1);
  },
  methods: {
    backup: function(value) {
      if (value == "备份数据（日常维护推荐使用只备份数据）") {
        this.form.backup_type = 0;
        this.form.backup_choose = [];
      } else if (value == "全备份（包含所有站点文件数据及数据库）") {
        this.form.backup_type = 1;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../assets/css/less_config.less";
#DataBackup {
  .backup-title {
    font-size: 16px;
    color: @text-color;
  }
}
</style>
