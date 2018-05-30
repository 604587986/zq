<template>
  <div id="PageGeneration">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>

    <div class="table-container">
        <div class="data-menu">
            <span ref="data" v-for="(item,index) in data_display" :key="item.id" @click="data_switch($event,index)" :class="item.classCon?'span-active':''">{{item.name}}</span>
            <i class="line" :style="{left:line_left,width:line_Width}"></i>
        </div>
        <!-- switch -->
        <!-- 一键生成 -->
        <div v-if="switch_control == 1" class="btn-container">
            <el-button type="primary">一键生成首页</el-button>
            <el-button type="primary">一键生成所有内容</el-button>
            <el-button type="primary">一键生成所有栏目</el-button>
            <el-button type="primary">一键生成所有单页</el-button>
            <div class="btn-container">
                <el-button type="primary">一键生成某时间段内容</el-button>
                <el-date-picker v-model="time_slot" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始时间"
                    end-placeholder="结束时间" align="right" @change="time_choose()">
                </el-date-picker>
            </div>
            <div class="btn-container">
                <el-button type="primary">一键生成ID端内容</el-button>
                <el-input placeholder="请输入ID范围" v-model="id_map" clearable class="id-input"></el-input>
                <span class="remarks">指定ID范围，例如：4-9,5000-6000</span>
            </div>
        </div>
        <!-- 生成首页 -->
        <div v-if="switch_control == 2" class="btn-container">
            <span class="remarks2">选择首页模板</span>
            <el-select v-model="selectModules" placeholder="选择首页模板" size="small" class="modules-input">
                <el-option v-for="item in modules" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button type="primary" size="small" class="btn">生成首页</el-button>
        </div>
        <!-- 生成频道页 -->
        <div v-if="switch_control == 3" class="btn-container">
            <span class="remarks2">选择频道</span>
            <el-select v-model="selectChannels" placeholder="选择频道" size="small" class="modules-input">
                <el-option v-for="item in channels" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button type="primary" size="small" class="btn">生成频道页</el-button>
        </div>
        <!-- 生成栏目页 -->
        <div v-if="switch_control == 4" class="btn-container">
            <span class="remarks2">选择栏目</span>
            <el-select v-model="selectColumns" placeholder="选择栏目" size="small" class="modules-input">
                <el-option v-for="item in columns" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button type="primary" size="small" class="btn">生成栏目页</el-button>
        </div>
        <!-- 生成单页 -->
        <div v-if="switch_control == 5" class="btn-container">
            <span class="remarks2">选择单页</span>
            <el-select v-model="selectSingelPages" placeholder="选择单页" size="small" class="modules-input">
                <el-option v-for="item in singelPages" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button type="primary" size="small" class="btn">生成单页</el-button>
        </div>
        <!-- 生成内容页 -->
        <div v-if="switch_control == 6" class="btn-container">
            <span class="remarks2">选择栏目</span>
            <el-select v-model="selectContentPages" placeholder="选择单页" size="small" class="modules-input">
                <el-option v-for="item in contentPages" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button type="primary" size="small" class="btn">生成内容页</el-button>
        </div>
    </div>
  </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Instructions from "@/components/Instructions";
/* 添加用户 */
export default {
  name: "PageGeneration",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "网页生成",
          url: ""
        },
        {
          name: "一键生成",
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

      //表单验证
      rules: {},
      //数据导航
      data_display: [
        {
          name: "一键生成",
          classCon: true
        },
        {
          name: "生成首页",
          classCon: false
        },
        {
          name: "生成频道页",
          classCon: false
        },
        {
          name: "生成栏目页",
          classCon: false
        },
        {
          name: "生成单页",
          classCon: false
        },
        {
          name: "生成内容页",
          classCon: false
        }
      ],
      //line-left
      line_left: 0,
      line_Width: 72,
      //切换控制
      switch_control: 1,
      //时间段选择
      time_slot: [new Date().getTime() - 3600 * 1000, new Date()],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一小时",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      //ID范围
      id_map: "0-9",
      //选择首页模板
      modules: [
        {
          value: 0,
          label: "/template/school-blue/index.html"
        },
        {
          value: 1,
          label: "/template/school-blue/index-20.html"
        }
      ],
      selectModules: "/template/school-blue/index.html",
      //选择频道
      channels: [
        {
          value: 0,
          label: "新闻中心"
        },
        {
          value: 1,
          label: "图片中心"
        },
        {
          value: 2,
          label: "下载中心"
        }
      ],
      selectChannels: "新闻中心",
      //选择栏目
      columns: [
        {
          value: 0,
          label: "通知公告"
        },
        {
          value: 1,
          label: "活动预告"
        },
        {
          value: 2,
          label: "教师风采"
        }
      ],
      selectColumns: "通知公告",
      //选择单页
      singelPages: [
        {
          value: 0,
          label: "系部介绍"
        },
        {
          value: 1,
          label: "领导介绍"
        },
        {
          value: 2,
          label: "联系我们"
        }
      ],
      selectSingelPages: "系部介绍",
      //选择内容页
      contentPages: [
        {
          value: 0,
          label: "通知公告"
        },
        {
          value: 1,
          label: "最新新闻"
        },
        {
          value: 2,
          label: "活动预告"
        }
      ],
      selectContentPages: "通知公告"
    };
  },
  components: {
    Crumb,
    Instructions
  },
  mounted: function() {},
  methods: {
    //切换
    data_switch: function(event, index) {
      var that = this;
      var url = null;
      for (var i = 0; i < that.data_display.length; i++) {
        that.data_display[i].classCon = false;
      }
      if (index == 0) {
        that.crumbs[2].name = "一键生成";
      } else if (index == 1) {
        that.crumbs[2].name = "生成首页";
      } else if (index == 2) {
        that.crumbs[2].name = "生成频道页";
      } else if (index == 3) {
        that.crumbs[2].name = "生成栏目页";
      } else if (index == 4) {
        that.crumbs[2].name = "生成单页";
      } else if (index == 5) {
        that.crumbs[2].name = "生成内容页";
      }
      that.switch_control = index + 1;
      that.data_display[index].classCon = true;
      that.line_left = event.currentTarget.offsetLeft + "px";
      that.line_Width = event.currentTarget.offsetWidth + "px";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#PageGeneration {
  /* 网页生成 */
  .data-menu {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #d9d9d9;
    position: relative;
    span {
      font-size: 18px;
      color: #888;
      cursor: pointer;
      line-height: 40px;
      margin-right: 32px;
      transition: all 0.3s;
      vertical-align: top;
      &:last-of-type {
        margin-right: 0;
      }
      &:hover {
        color: #00a0e9;
      }
    }
    .span-active {
      color: #00a0e9;
    }
    .line {
      width: 72px;
      height: 5px;
      background: #00a0e9;
      position: absolute;
      bottom: -2.5px;
      left: 0;
      transition: all 0.3s;
    }
  }
  .remarks {
    color: #606266;
    font-size: 14px;
  }
  .remarks2 {
    color: #606266;
    font-size: 14px;
  }
  .id-input {
    width: 20%;
  }
}
</style>
