<template>
  <div id="EditSite">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Form -->
    <div class="form-container">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="150px" size="mini" label-position="right">
        <el-form-item label="站点名称：" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属类别：" prop="categoryValue">
          <el-select v-model="form.categoryValue" clearable placeholder="所属类别" size="mini">
            <el-option v-for="item in category" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <a href="javascript:void(0);" class="item-a">类别管理</a>
        </el-form-item> -->
        <el-form-item label="所属部门：" prop="department_id">
          <el-select v-model="form.department_id" placeholder="所属部门" size="mini">
            <el-option v-for="item in department_list" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
          <a href="javascript:void(0);" class="item-a">部门管理</a>
        </el-form-item>
        <el-form-item label="编码：">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="别名：" prop="alias">
          <el-input v-model="form.alias"></el-input>
          <span class="site-item-info">不能重复，并且只能英文及数字组成，例：caajwc，不能使用中文或其他符号</span>
        </el-form-item>
        <el-form-item label="域名：">
          <el-input v-model="form.domain"></el-input>
          <span class="site-item-info">网站绑定的域名。必须以http开头，例：http://jwc.caa.edu.cn</span>
        </el-form-item>
        <el-form-item label="是否启用HTTPS：">
          <el-radio-group v-model="form.domain_https">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">不启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="网站关键字：">
          <el-input v-model="form.keywords"></el-input>
        </el-form-item>
        <el-form-item label="选择站点管理员：">
          <el-select v-model="form.user_id" placeholder="选择站点管理员" size="mini">
            <el-option v-for="item in siteAdministrator" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <a href="javascript:void(0);" class="item-a">新建管理员</a>
        </el-form-item>
        <el-form-item label="网站描述：">
          <el-input v-model="form.description" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="访问统计代码：">
          <el-input v-model="form.analytics" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="底部信息：">
          <el-input v-model="form.tail_info" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="微信公众号二维码：">
          <file-picker v-model="form.qr_wechat">
            <div slot="img">
              <img class="small-img" :src="form.qr_wechat.url" alt="">
            </div>
          </file-picker>
        </el-form-item>
        <el-form-item label="新浪微博二维码：">
          <file-picker v-model="form.qr_weibo">
            <div slot="img">
              <img class="small-img" :src="form.qr_weibo.url" alt="">
            </div>
          </file-picker>
        </el-form-item>
        <!-- <el-form-item label="微信公众号二维码：">
          <el-upload action="" class="avatar-uploader wechat_weibo_uploader" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="form.wechat_img" :src="form.wechat_img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="新浪微博二维码：">
          <el-upload action="" class="avatar-uploader wechat_weibo_uploader" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="form.weibo_img" :src="form.weibo_img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> -->
        <el-form-item label="网站状态：" prop="state">
          <el-radio-group v-model="form.state">
            <el-radio :label="-1">关闭</el-radio>
            <el-radio :label="0">建设中</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关闭原因：" prop="stop_info" v-if="form.state == -1">
          <el-input v-model="form.stop_info" type="textarea" :rows="2"></el-input>
          <span class="site-item-info">必须填写，最多50个字符</span>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model.number="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="form.comment" type="textarea" :rows="2"></el-input>
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

import { getSiteInfo } from "@/api/site_management/EditSite";
import { updateSiteInfo } from "@/api/site_management/EditSite";
export default {
  name: "EditSite",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "站点信息",
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
      //部门列表
      department_list: [
        {
          label: "部门1",
          id: 1
        },
        {
          label: "部门2",
          id: 2
        },
        {
          label: "部门3",
          id: 3
        }
      ],
      //提交按钮loading
      subLoading: false,
      //表单
      form: {},
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
      },
      //所属类别
      category: [
        {
          value: 0,
          label: "机关部门"
        },
        {
          value: 1,
          label: "教辅与研创单位"
        },
        {
          value: 2,
          label: "教学单位"
        },
        {
          value: 3,
          label: "其他"
        }
      ],
      //所属部门
      subordinateDepartment: [
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
      ],
      //站点管理员
      siteAdministrator: [
        {
          value: 0,
          label: "系统超级管理员"
        },
        {
          value: 1,
          label: "分站管理员"
        },
        {
          value: 2,
          label: "编辑"
        }
      ]
    };
  },
  components: {
    Crumb,
    Instructions,
    FilePicker
  },
  mounted: function() {
    //获取站点信息
    this.getData();
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 1);
    this.$store.commit("update_system_menu_idx", 1);
  },
  methods: {
    //获取站点信息
    getData() {
      // let data = { id: this.$route.query.id };
      getSiteInfo().then(res => {
        if (res.data.code == 200) {
          this.form = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
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
          updateSiteInfo(that.form).then(res => {
            that.subLoading = false;
            if (res.data.code == 200) {
              that.$message.success("修改成功");
              that.getData();
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
</style>
