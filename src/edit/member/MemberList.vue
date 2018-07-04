<template>
  <div id="MemberList">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- Form -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter"> 
          <el-button type="primary" size="mini" @click="dialogVisible=true">添加会员</el-button>      
          <el-input placeholder="请输入昵称关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
            <el-button slot="append" icon="el-icon-search" @click="currentPaging.currentPage = 1;getData()"></el-button>
          </el-input>
      </div>
      <!-- 表格 -->
      <div class="table-body">
          <el-table ref="multipleTable" :data="tableInfo" stripe size="small" v-loading="table_loading" element-loading-text="数据载入中">
              <el-table-column prop="id" label="ID" width="70"></el-table-column>
              <el-table-column prop="title" label="昵称"></el-table-column>
              <el-table-column prop="account" label="账号"></el-table-column>
              <el-table-column prop="mail" label="邮箱"></el-table-column>
              <el-table-column prop="mobile" label="手机"></el-table-column>
              <el-table-column prop="create_time" label="创建时间"></el-table-column>
              <el-table-column label="操作">
                  <div slot-scope="scope" class="control-btn">
                      <el-button size="small" class="control-btn-del">编辑</el-button>
                      <el-button @click="toDelete(scope.row.id)" size="small" class="control-btn-del">删除</el-button>
                  </div>
              </el-table-column>
          </el-table>
      </div>
      <!-- 表格筛选 -->
      <!-- <div class="table-filter">
          <el-button type="primary" size="mini" @click="selection(tableInfo)">全选</el-button>
          <el-button type="primary" size="mini">批量删除</el-button>
      </div> -->
      <!-- 分页 -->
      <Paging :currentPaging="currentPaging" v-on="{sizeChange:handleSizeChange,currentChange:handleCurrentChange}"></Paging>
    </div>
    <el-dialog
      title="添加会员"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="108px" size="mini" label-position="right">
        <el-form-item label="账号：" class="form-item" prop="account">
            <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="昵称：" class="form-item" prop="title">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" class="form-item" prop="mail">
            <el-input v-model="form.mail"></el-input>
        </el-form-item>
        <el-form-item label="手机：" class="form-item" prop="mobile">
            <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="登录密码：" class="form-item" prop="passwd">
            <el-input type="password" v-model="form.passwd"></el-input>
            <span class="site-item-info">6~15位，英文与数字或下划线组合</span>
        </el-form-item>
        <el-form-item label="确认密码：" class="form-item" prop="comfirmPasswd">
            <el-input type="password" v-model="form.comfirmPasswd"></el-input>
        </el-form-item>
        <el-form-item class="form-control-btn">
            <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">提交</el-button>
        </el-form-item>
    </el-form>
    </el-dialog>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Paging from "@/components/Paging";

import {addMember,memberList} from "@/api/member/member"
export default {
  name: "MemberList",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "会员列表",
          url: ""
        }
      ],
      //分页数据
      currentPaging: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        totals: null
      },
      //表格loading
      table_loading: false,
      //搜索关键字
      titleSearchValue: "",
      //表格数据
      tableInfo: [],
      //用于全选
      tableList: [],
      // 添加用户表单
      form: {},
      // 表单验证
      rules: {
        account: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 1,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        title: [
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
        mobile:[
          {
            required: true,
            validator: function(rule, value, callback) {
              var reg = /0?(13|14|15|17|18|19)[0-9]{9}/;
              if (!value) {
                callback(new Error("手机不能为空"));
              } else if (reg.test(value) == false) {
                callback(
                  new Error("请输入正确的手机号码格式")
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
              var reg = /^[0-9a-zA-Z_]{6,15}$/; //6-15位数字字母下划线
              if (!value) {
                callback(new Error("密码不能为空"));
              } else if (reg.test(value) == false) {
                callback(
                  new Error("密码必须为数字/字母/下划线,长度6-15位之间")
                );
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        comfirmPasswd: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.form.passwd) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },
      // 弹出框
      dialogVisible: false,
      // 提交按钮loading
      subLoading:false
    };
  },
  components: {
    Crumb,
    Paging
  },
  mounted() {
    this.getData();
  },
  methods: {
    //获取表格信息
    getData() {
      let data = {
        page: this.currentPaging.currentPage,
        size: this.currentPaging.pageSize,
        keyword: this.titleSearchValue,
      };
      this.table_loading = true;
      memberList(data).then(res => {
        this.table_loading = false;
        if (res.data.code == 200 || res.data.code == 404) {
          this.tableInfo = res.data.data.list;
          this.currentPaging.totals = res.data.data.count;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //处理sizeChange
    handleSizeChange(val) {
      this.currentPaging.pageSize = val;
      this.currentPaging.currentPage = 1;
      this.getData();
    },
    //处理currentChange
    handleCurrentChange(val) {
      this.currentPaging.currentPage = val;
      this.getData();
    },
    //表单提交
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate(function(valid) {  
        that.subLoading = true;
        if (valid) {
          addMember(that.form).then(res => {
            that.subLoading = false;
            if (res.data.code == 200) {
              that.$message.success("提交成功");
              that.$refs[formName].resetField();
              that.dialogVisible = false;
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
