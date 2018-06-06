<template>
    <div class="root">
        <div class="my-input">
            <el-input  v-bind:value="currentValue" style="display:none"></el-input>
            <el-input @focus="isShow=true" readonly  placeholder="请选择" v-model="label"></el-input>
        </div>
        <div id="file-picker" v-if="isShow">
            <div class="header">
              <div class="close" @click="isShow=false">关闭</div>
              <div class="my-input-wrapper">
                  <el-select v-model="siteValue" placeholder="请选择站点" v-if="level" @change="getData">
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
                <div class="filter">
                    <el-radio-group v-model="data.type" @change="getData">
                        <el-radio :label="1">图片</el-radio>
                        <el-radio :label="2">文档</el-radio>
                        <el-radio :label="3">视频</el-radio>
                    </el-radio-group>
                </div>
              </div>
            <div class="content">
                <div class="item" v-for="item in info" :key="item.id" @click="select(item)">
                    <img :src="'//webmaster.q-huan.link'+formatUrl(item.url,'/160')" alt=""> 
                    <p class="title">{{item.title}}</p>   
                </div>           
            </div>
            <div class="footer">
                <!-- 分页 -->
                <Paging :currentPaging="currentPaging" v-on="{sizeChange:handleSizeChange,currentChange:handleCurrentChange}"></Paging>
            </div>
        </div>
    </div>
</template>
<script>
import Paging from "@/components/Paging";
import { getEnclosureList } from "@/api/enclosure/EnclosureList.js";
import { getSiteList } from "@/api/site_management/SiteList";
import { formatUrl } from "@/utils";
export default {
  data() {
    return {
      //分页数据
      currentPaging: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        totals: null
      },
      //附件内容
      info: [],
      // 弹出框是否显示
      isShow: false,
      //输入框显示内容
      label: "",
      //组件绑定值
      currentValue: this.value,
      //是否为管理员
      level: window.localStorage.getItem("group") == 0 ? true : false,
      // 站点列表
      siteList: [],
      siteValue: ""
    };
  },
  props: {
    //请求地址
    url: {
      type: String,
      default: ""
    },
    //请求附带参数
    data: {
      type: Object,
      default() {
        return {
          type: 1,
          keyword: ""
        };
      }
    },
    //v-model双向绑定
    value: [String, Number]
  },
  watch: {
    currentValue: function(val, old) {
      this.$emit("input", val);
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
    formatUrl(url,size){
      return formatUrl(url,size)
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
      this.label = item.title;
      this.currentValue = item.id;
      this.isShow = false;
    },
    //处理sizeChange
    handleSizeChange(val) {
      this.currentPaging.pageSize = val;
      this.currentPaging.currentPage = 1;
      //   this.getData();
    },
    //处理currentChange
    handleCurrentChange(val) {
      this.currentPaging.currentPage = val;
      //   this.getData();
    }
  },
  components: { Paging }
};
</script>
<style lang="less">
@import "animate.css";
.root {
  position: relative;
}
.my-input {
  width: 300px;
  position: relative;
  z-index: 10;
}
#file-picker {
  position: fixed;
  width: 600px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  border-radius: 10px;
  overflow-y: auto;
  z-index: 999;
  .header {
    .close {
      line-height: 2;
      color: #666;
      font-size: 16px;
      cursor: pointer;
      text-align: right;
      transition: all .4s;
      &:hover{
        color:#409EFF;
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
      img {
        width: 100%;
      }
      .title {
        font-size: 12px;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
        text-align: center;
      }
    }
  }
}
</style>
