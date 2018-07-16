<template>
  <div id="enroll">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- Form -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter"> 
          <el-button type="primary" size="mini" @click="dialogVisible=true">导入录取信息</el-button>      
          <el-input placeholder="请输入关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
            <el-button slot="append" icon="el-icon-search" @click="currentPaging.currentPage = 1;getData()"></el-button>
          </el-input>
      </div>
      <!-- 表格 -->
      <div class="table-body">
          <el-table ref="multipleTable" :data="tableInfo" stripe size="small" v-loading="table_loading" element-loading-text="数据载入中">
              <el-table-column prop="id" label="ID" width="70"></el-table-column>
              <el-table-column prop="title" label="姓名"></el-table-column>
              <el-table-column prop="account" label="考生号码"></el-table-column>
              <el-table-column prop="mail" label="身份证号"></el-table-column>
              <el-table-column prop="mobile" label="录取时间"></el-table-column>
              <el-table-column label="操作" width="200">
                  <div slot-scope="scope" class="control-btn">
                    <router-link :to="{path:'/pages/editor/editor/edit_member',query:{id:scope.row.id}}">
                      <el-button size="small">编辑</el-button>
                    </router-link>
                      <el-button @click="" size="small" class="control-btn-del">删除</el-button>                    
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
    <!-- 表单 -->
    <el-dialog
      title="导入录取信息"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="100px" size="mini" label-position="left">
        <el-form-item label="下载模板：">
            <a href="/api/admission/down">
                <el-button type="primary" size="mini">下载模板</el-button>
            </a>
            请先下载模板，按规定格式填写学生信息
        </el-form-item>
        <el-form-item label="上传模板：">
            <el-button type="primary" size="mini" @click="uploadVisible=true">点击上传</el-button>
             请选择填好的表格进行上传
        </el-form-item>
        <el-form-item label="当前文件：">
            <el-input v-model="form.id" style="display:none"></el-input>
            {{form.id?current_title:'请上传文件！'}}
        </el-radio-group>
        </el-form-item>
        <el-form-item label="上传后是否删除文件：">
            <el-radio-group v-model="form.del">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
        </el-radio-group>
        </el-form-item>
        <el-form-item class="form-control-btn">
            <el-button type="primary" @click="submitForm('form')" size="large" :loading="subLoading">提交</el-button>
        </el-form-item>
    </el-form>
    </el-dialog>
    <!-- 上传 -->
    <el-dialog
        title="附件上传"
        :visible.sync="uploadVisible"       
        >
        <upload @uploadSuccess="handleSuccess" :allowType="['doc']"></upload>
    </el-dialog>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Paging from "@/components/Paging";
import Upload from "@/components/Upload";

import { addMember, memberList, modifyPassword } from "@/api/member/member";
export default {
  name: "enroll",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "录取管理",
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
      form: {
          id:'',
          del:true
      },
      // 表单验证
      rules: {
       
      },
      // 弹出框
      dialogVisible: false,
      //上传组件弹出框
      uploadVisible:false,
      // 提交按钮loading
      subLoading: false,
      //当前选择的文件
      current_title:''
    };
  },
  components: {
    Crumb,
    Paging,
    Upload
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
        keyword: this.titleSearchValue
      };
      this.table_loading = true;
      memberList(data).then(res => {
        this.table_loading = false;
        // if (res.data.code == 200 || res.data.code == 404) {
        //   this.tableInfo = res.data.data.list;
        //   this.currentPaging.totals = res.data.data.count;
        // } else {
        //   this.$message.error(res.data.message);
        // }
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
        //   addMember(that.form).then(res => {
        //     that.subLoading = false;
        //     if (res.data.code == 200) {
        //       that.$message.success("添加成功");
        //       that.$refs[formName].resetFields();
        //       that.dialogVisible = false;
        //       that.getData()
        //     } else {
        //       that.$message.error(res.data.message);
        //     }
        //   });
        } else {
          that.subLoading = false;
          that.$message.error("提交失败!");
          return false;
        }
      });
    },
    //上传成功的回调
    handleSuccess(item){
        this.current_title = item.title;
        this.form.id = item.id;
        this.uploadVisible = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>

