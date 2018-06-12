<template>
  <div id="AddUserGroup">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="form-container">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="95px" size="mini" label-position="right">
        <el-form-item label="用户组名：" class="form-item" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="级别：" class="form-item" prop="level">
          <el-select v-model="form.level" placeholder="" size="mini">
            <el-option v-for="item in levelList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限：" class="form-item" prop="privilege">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"  @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="form.privilege" @change="handleCheckedChange">
            <el-checkbox v-for="item in privilegeList" :label="item.id" :key="item.id">{{item.title}}</el-checkbox>
          </el-checkbox-group>
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

import { privilege } from "@/api/group/group";
import { addUserGroup } from "@/api/group/group";
/* 添加用户组 */
export default {
  name: "AddUserGroup",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "权限管理",
          url: ""
        },
        {
          name: "用户组管理",
          url: "/pages/system_administrators/System_Administrators/UserGroupList"
        },
        {
          name: "添加用户组",
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
        privilege: []
      },
      //级别列表
      levelList: [
        {
          id: 0,
          title: "系统管理员"
        },
        {
          id: 1,
          title: "主站管理员"
        },
        {
          id: 2,
          title: "站点管理员"
        },
        {
          id: 3,
          title: "领导"
        },
        {
          id: 4,
          title: "编辑"
        },
        {
          id: 5,
          title: "实习编辑"
        }
      ],
      //权限列表
      privilegeList: [],
      //全选属性
      isIndeterminate: false,
      //是否全选
      checkAll: false,
      //表单验证
      rules: {
        title: [
          {
            required: true,
            message: "请输入用户组名",
            trigger: "blur"
          },
          {
            min: 1,
            message: "用户组名不能为空",
            trigger: "blur"
          }
        ],
        level: [
          {
            required: true,
            message: "请选择级别",
            trigger: "blur"
          }
        ],
        // privilege:[
        //   {
        //     required: true,
        //     message: "请选择级别",
        //     trigger: "blur"
        //   }
        // ]
      }
    };
  },
  computed: {
    privilegeListId: function() {
      let arr = [];
      for (let i in this.privilegeList) {
        arr.push(this.privilegeList[i].id);
      }
      return arr;
    }
  },
  components: {
    Crumb,
    Instructions
  },
  mounted: function() {
    //获取权限列表
    this.getPrivilege();
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 5);
    this.$store.commit("update_system_menu_idx", 5);
  },
  methods: {
    //获取权限列表
    getPrivilege() {
      privilege().then(res => {
        if (res.data.code == 200 || res.data.code == 404) {
          this.privilegeList = res.data.data.list;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //处理全选
    handleCheckAllChange(val) {
      this.form.privilege = val ? this.privilegeListId : [];
      this.isIndeterminate = false;
    },
    //处理单选
    handleCheckedChange(val) {
      let checkedCount = val.length;
      this.checkAll = checkedCount === this.privilegeListId.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.privilegeListId.length;
    },
    //表单提交
    submitForm(formName) {
      this.form.privilege = this.form.privilege.join(','); //将权限从数组转为字符串
      var that = this;
      that.$refs[formName].validate(function(valid) {
        that.subLoading = true;
        if (valid) {
          addUserGroup(that.form).then(res => {
            that.subLoading = false;
            if (res.data.code == 200) {
              that.$message.success("添加成功");
              that.$refs[formName].resetFields();
              that.isIndeterminate = false;
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#AddUserGroup {
  .el-checkbox {
    margin-left: 10px;
    min-width: 150px;
  }
}
</style>
