<template>
    <div class="root">
        <div>
            <el-input placeholder="请选择附件" disabled :label="obj.title">
                <el-button slot="append" icon="el-icon-search" @click="isShow = true"></el-button>
            </el-input>
        </div>
        <div id="file-picker" v-if="isShow">
            <div class="header">
                <div class="search">
                    <el-input placeholder="请输入内容" v-model="data.keyword">
                        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
                    </el-input>
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
                    <img :src="item.url" alt=""> 
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
      info: [],
      isShow: false,
      value: "",
      obj: {}
    };
  },
  props: {
    url: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
      default() {
        return {
          type: 1,
          keyword: ""
        };
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http.get(this.url, { params: this.data }).then(res => {
        this.info = res.data;
      });
    },
    select(item) {
        console.log(item)
      //   this.$emit("select-file", item);
      this.obj = item;
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
  .content {
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
