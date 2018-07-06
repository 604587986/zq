<template>
    <div class="root">
        <div class="my-input">
            <el-input  v-bind:value="currentValue" style="display:none"></el-input>
            <el-input @focus="showWrapper" readonly  placeholder="请选择" :value="label"></el-input>
            <!-- 图片预览 -->
            <img v-if="imageUrl" :src="formatUrl(imageUrl,'/160x160')" alt="">
            <!-- 文档地址 -->
            <a v-if="docUrl" :href="docUrl" target="_blank">文档链接</a>
            <!-- 视频预览 -->
            <video v-if="videoUrl" :src="videoUrl" controls></video>
            <slot name="img" v-if="!imageUrl"></slot>
            <!-- 从远程获取的默认图片 -->
            <img v-if="!imageUrl&&receiveImg" :src="formatUrl(receiveImg,'/160x160')" alt="">
        </div>
        <el-dialog
          append-to-body
          :visible.sync="isShow">
          <div id="file-picker" v-if="isShow">
              <div class="header">   
                <div class="close-wrapper">
                  <el-button type="primary" v-show="currentIndex == 2" @click="currentIndex = 1">选择附件</el-button>
                  <el-button type="primary" v-show="currentIndex == 1" @click="currentIndex = 2">上传附件</el-button>            
                </div>
              <div class="select-file" v-show="currentIndex == 1">
                <div class="my-input-wrapper">
                    <el-select v-model="siteValue" placeholder="请选择站点" v-if="level" @change="getData" clearable>
                      <el-option
                        v-for="item in siteList"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id">
                      </el-option>
                    </el-select>
                    <div class="search">
                      <el-input placeholder="请输入内容" v-model="data.keyword">
                          <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
                      </el-input>
                    </div>
                </div>
                <div class="notice" v-show="data.keyword">搜索到{{currentPaging.totals}}个关于“{{data.keyword}}”的附件：</div>
                <div class="filter">
                  <el-radio-group v-model="data.type" @change="getData">
                      <el-radio :label="1" v-if="allowType.includes('image')">图片</el-radio>
                      <el-radio :label="2" v-if="allowType.includes('doc')">文档</el-radio>
                      <el-radio :label="3" v-if="allowType.includes('video')">视频</el-radio>
                  </el-radio-group>
                  <i class="el-icon-refresh" @click="refresh" ref="refresh"></i>
                </div>
                <div class="content">
                  <div class="item" v-for="item in info" :key="item.id" @click="select(item)" v-if="info.length">
                    <div v-if="item.type == 1">
                      <div class="my-img-wrapper">
                        <img :src="formatUrl(item.url,'/160')" alt=""> 
                      </div>
                      <p class="title">{{item.title}}</p>
                    </div>   
                    <div v-if="item.type == 2">
                      <div class="my-doc-wrapper">
                        <p class="title">{{item.title}}</p>
                      <!-- <a :href="item.url" target="_blank">{{item.title}}</a> -->
                      </div>
                    </div>   
                    <div v-if="item.type == 3">
                      <div class="my-doc-wrapper">
                        <p class="title">{{item.title}}</p>
                        <!-- <a :href="item.url" target="_blank">{{item.title}}</a> -->
                      </div>
                    </div>   
                  </div>
                  <!-- 当列表为空时显示 -->
                  <div class="no-data" v-if="!info.length">
                    暂无数据
                  </div>           
                </div>
                <div class="footer">
                  <!-- 分页 -->
                  <Paging :currentPaging="currentPaging" v-on="{sizeChange:handleSizeChange,currentChange:handleCurrentChange}"></Paging>
                </div>
              </div>
              <div class="upload-file" v-show="currentIndex == 2">
                    <upload @uploadSuccess="handleUpload" :allowType="allowType"></upload>
              </div>
            </div>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import Paging from "@/components/Paging";
import Upload from "@/components/Upload";

import { getEnclosureList } from "@/api/enclosure/EnclosureList.js";
import { getSiteList } from "@/api/site_management/SiteList";
import { formatUrl } from "@/utils";
export default {
  data() {
    return {
      //分页数据
      currentPaging: {
        currentPage: 1,
        pageSize: 9,
        pageSizes: [9, 18, 27, 36],
        totals: null
      },
      //图片预览
      imageUrl: "",
      //文档预览
      docUrl: "",
      //视频预览
      videoUrl: "",
      //判断当前是选择文件还是上传文件,1为选择，2为上传
      currentIndex: 1,
      //附件内容
      info: [],
      // 弹出框是否显示
      isShow: false,
      //输入框显示内容
      label: "",
      //组件绑定值
      currentValue: this.value,
      // 站点列表
      siteList: [],
      siteValue: "",
      //请求附件的地址
      url: "/api/attachment/index",
      // 刷新次数
      count: 1
    };
  },

  props: {
    //v-model双向绑定
    value: [String, Number],
    receiveImg: [String],
    allowType: {
      type: Array,
      default() {
        return ["image", "doc", "video"];
      }
    }
  },
  computed: {
    //请求数据时的附带参数
    data: function() {
      let type;
      let keyword;
      if (this.allowType[0] == "image") {
        type = 1;
      } else if (this.allowType[0] == "doc") {
        type = 2;
      } else {
        type = 3;
      }
      return {
        type,
        keyword: ""
      };
    },
    //检查是否为管理员使用
    level: function() {
      if (
        window.localStorage.getItem("group") == 0 &&
        !window.localStorage.getItem("mockUser")
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    //数据双向绑定
    currentValue: function(val, old) {
      this.$emit("input", val);
    },
    //监听currentIndex变化，若为1则请求附件列表
    currentIndex: function(val) {
      this.getData();
    }
  },
  mounted() {
    //获取默认数据
    this.getData();
    //如果为管理员则获取站点列表
    if (this.level) {
      this.getSite();
    }
  },
  methods: {
    //获取默认数据
    getData() {
      let data = this.data;
      data.page = this.currentPaging.currentPage;
      data.size = this.currentPaging.pageSize;
      if (this.level) {
        data.site_id = this.siteValue;
      }
      getEnclosureList(data).then(res => {
        if (res.data.code == 200) {
          this.info = res.data.data.list;
          this.currentPaging.totals = res.data.data.count;
        } else if (res.data.code == 404) {
          this.info = res.data.data.list;
          this.currentPaging.totals = res.data.data.count;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //获取指定大小图片的方法
    formatUrl(url, size) {
      return formatUrl(url, size);
    },
    //获取站点列表
    getSite() {
      let data = {
        page: 0
      };
      getSiteList(data).then(res => {
        if (res.data.code == 200) {
          this.siteList = res.data.data.list;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //选择附件时触发
    select(item) {
      this.currentValue = item.id;
      this.label = item.title;
      //生成预览路径
      if (item.type == 1) {
        this.imageUrl = item.url;
        this.docUrl = "";
        this.videoUrl = "";
      } else if (item.type == 2) {
        this.docUrl = item.url;
        this.imageUrl = "";
        this.videoUrl = "";
      } else {
        this.videoUrl = item.url;
        this.imageUrl = "";
        this.docUrl = "";
      }
      this.isShow = false;
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
    //上传成功的回调
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      if (res.code == 200) {
        this.$message.success("附件上传成功");
      }
    },
    //上传之前的回调
    beforeAvatarUpload(file) {
      var that = this;
      if (that.fileData.title == "") {
        that.$message.warning("请先添加附件标题");
        return false;
      }
      return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function(event) {
          var image = new Image();
          image.onload = function() {
            var width = this.width;
            var height = this.height;
            that.fileData.size_w = width; //上传图片的宽
            that.fileData.size_h = height; //上传图片的高
            that.fileData.ext = file.name.slice(file.name.lastIndexOf(".") + 1); //上传图片的后缀
            that.fileData.origin = file.name; //上传文件名
            resolve();
          };
          image.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
    },
    //监听上传成功事件
    handleUpload(item) {
      this.currentValue = item.id;
      this.label = item.title;
      //生成预览路径
      if (item.type == 1) {
        this.imageUrl = item.url;
        this.docUrl = "";
        this.videoUrl = "";
      } else if (item.type == 2) {
        this.docUrl = item.url;
        this.imageUrl = "";
        this.videoUrl = "";
      } else {
        this.videoUrl = item.url;
        this.imageUrl = "";
        this.docUrl = "";
      }
      this.isShow = false;
    },
    //打开弹出框
    showWrapper() {
      this.isShow = true;
    },
    // 刷新当前列表（重新请求）
    refresh() {
      this.$refs.refresh.style.transform =
        "rotate(" + this.count * 360 + "deg)";
      this.count++;
      this.getData();
    }
  },
  components: { Paging, Upload }
};
</script>
<style lang="less">
@import "animate.css";
.root {
  position: relative;
}
.my-input {
  width: 160px;
  position: relative;
  z-index: 10;
}
#file-picker {
  // position: fixed;
  width: 600px;
  height: 600px;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // background: #fff;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  // padding: 10px 20px;
  // border-radius: 10px;
  overflow-y: auto;
  // z-index: 999;
  .header {
    .close-wrapper {
      span {
        transition: all 0.4s;
      }
      .close {
        font-size: 22px;
        cursor: pointer;
        float: right;
        &:hover {
          color: #409eff;
        }
      }
    }

    .my-input-wrapper {
      margin: 20px 0;

      .search {
        float: right;
      }
      &:after {
        content: " ";
        display: block;
        clear: both;
      }
    }
  }
  .content {
    min-height: 300px;
    .item {
      width: 160px;
      display: inline-block;
      margin-left: 20px;
      vertical-align: top;
      cursor: pointer;
      .my-img-wrapper {
        height: 80px;
        overflow: hidden;
        position: relative;
      }
      .my-doc-wrapper {
        p {
          text-align: left;
          height: 60px;
        }
      }
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        min-height: 100%;
      }
      .title {
        font-size: 12px;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
        text-align: center;
      }
    }
    .no-data {
      font-size: 20px;
      line-height: 300px;
      text-align: center;
      color: #909399;
    }
  }
  .select-file {
    position: absolute;
    left: 20px;
    right: 20px;
    top: 50;
    z-index: 30;
    background: #fff;
    .el-icon-refresh {
      margin-left: 40px;
      cursor: pointer;
      transition: all 1s;
      &:hover {
        color: #409eff;
      }
    }
  }
  .upload-file {
    position: absolute;
    left: 20px;
    right: 40px;
    z-index: 20;
    background: #fff;
  }
  .upload-file {
    margin-top: 20px;
  }
}
</style>
