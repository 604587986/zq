/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 14:35:20 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-01-31 17:40:06
 */

<template>
  <div class="echarts-container">
    <div class="float-left echarts-left">
      <div class="echarts float-left">
        <p>当日数据</p>
        <div id="echarts-1" style="width: 225px;height:140px;padding-left:5px;"></div>
      </div>
      <div class="echarts float-left">
        <p>本周数据</p>
        <div id="echarts-2" style="width: 225px;height:140px;padding-left:5px;"></div>
      </div>
      <div class="echarts float-left">
        <p>本月数据</p>
        <div id="echarts-3" style="width: 225px;height:140px;padding-left:5px;"></div>
      </div>
      <div class="echarts float-left">
        <p>年度数据</p>
        <div id="echarts-4" style="width: 225px;height:140px;padding-left:5px;"></div>
      </div>
    </div>
    <div class="float-right echarts-right">
      <div class="echarts-title">
        <el-date-picker size="mini" v-model="echarts_filter" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" class="float-left">
        </el-date-picker>
        <el-select v-model="earchts_filter_list_value" clearable placeholder="请选择" size="mini" class="float-right">
          <el-option v-for="item in earchts_filter_list" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div id="echarts-5" style="width: 450px;height:300px;padding-left:12px;"></div>
    </div>
  </div>
</template>

<script>
//按需引入折线图 标题
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
export default {
  name: "DataChart",
  data() {
    return {
      //当日数据
      today_data: {},
      //本周数据
      week_data: {},
      //本月数据
      month_data: {},
      //年度数据
      year_data: {},
      //筛选数据
      choose_data: {},
      //按日期筛选
      pickerOptions: {
        shortcuts: [
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
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      echarts_filter: ["2018-01-15", "2018-01-31"],
      //选择菜单
      earchts_filter_list: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "学院官网"
        },
        {
          value: 2,
          label: "学院官网英文版"
        },
        {
          value: 3,
          label: "艺术与设计学院"
        },
        {
          value: 4,
          label: "新闻与传播学院"
        },
        {
          value: 5,
          label: "公共管理学院"
        }
      ],
      earchts_filter_list_value: "全部"
    };
  },
  watch: {},
  mounted: function() {
    let that = this;
    //获取canvas数据并调用
    that
      .$http({
        method: "get",
        url: "./static/mock/echart.json"
      })
      .then(function(response) {
        let res = response.data;
        that.today_data = res.today_data;
        that.week_data = res.week_data;
        that.month_data = res.month_data;
        that.year_data = res.year_data;
        that.choose_data = res.choose_data;
        that.echarts();
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    //canvas
    echarts() {
      let that = this;
      let Charts = function(dataList, name, dataInfo, myChart, posi) {
        // 指定图表的配置项和数据
        let option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#00a0e9"
              }
            }
          },
          toolbox: {
            //将图表保存为图片
            feature: {
              saveAsImage: {}
            }
          },
          grid: posi,
          xAxis: [
            {
              type: "category",
              boundaryGap: true,
              data: dataList
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: name,
              type: "line",
              stack: "总量",
              itemStyle: {
                normal: {
                  color: "rgba(84,195,241,0.5)"
                }
              },
              label: {
                normal: {
                  show: false,
                  position: "top"
                }
              },
              areaStyle: {
                normal: {}
              },
              data: dataInfo
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      };
      // 今日数据
      let myChart1 = echarts.init(document.getElementById("echarts-1"));
      Charts(
        that.today_data.filter_info,
        "当日数据",
        that.today_data.show_info,
        myChart1,
        {
          left: "0",
          right: "0",
          bottom: "0",
          top: "10%",
          containLabel: true
        }
      );
      let myChart2 = echarts.init(document.getElementById("echarts-2"));
      Charts(
        that.week_data.filter_info,
        "本周数据",
        that.week_data.show_info,
        myChart2,
        {
          left: "0",
          right: "0",
          bottom: "0",
          top: "10%",
          containLabel: true
        }
      );
      let myChart3 = echarts.init(document.getElementById("echarts-3"));
      Charts(
        that.month_data.filter_info,
        "本月数据",
        that.month_data.show_info,
        myChart3,
        {
          left: "0",
          right: "0",
          bottom: "0",
          top: "10%",
          containLabel: true
        }
      );
      let myChart4 = echarts.init(document.getElementById("echarts-4"));
      Charts(
        that.year_data.filter_info,
        "年度数据",
        that.year_data.show_info,
        myChart4,
        {
          left: "0",
          right: "0",
          bottom: "0",
          top: "10%",
          containLabel: true
        }
      );
      let myChart5 = echarts.init(document.getElementById("echarts-5"));
      Charts(
        that.choose_data.filter_info,
        "年度数据",
        that.choose_data.show_info,
        myChart5,
        {
          left: "0",
          right: "0",
          bottom: "0",
          top: "10%",
          containLabel: true
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../assets/css/less_config";
.echarts-container {
  width: 100%;
  &::after {
    content: "";
    display: block;
    visibility: hidden;
    clear: both;
  }
  .echarts-left {
    width: 500px;
    height: 374px;
    .echarts {
      margin-right: 20px;
      margin-bottom: 20px;
      border: 1px solid #c4c5c5;
      padding-bottom: 5px;
      > p {
        display: table-cell;
        width: 227px;
        height: 30px;
        background: #dcdddd;
        color: #707070;
        font-size: 16px;
        padding-left: 5px;
        vertical-align: middle;
      }
    }
  }
  .echarts-right {
    width: 450px;
    height: 374px;
    border: 1px solid #c4c5c5;
    .echarts-title {
      width: 100%;
      height: 30px;
      background: #dcdddd;
      padding-top: 3px;
      margin-bottom: 17px;
      .el-date-editor {
        width: 230px;
        height: 24px;
        margin-left: 12px;
        padding: 0 10px;
      }
      .el-range__icon {
        line-height: 24px;
      }
      .el-range-input {
        float: left;
      }
      .el-range-separator {
        width: 12%;
        float: left;
        position: relative;
        top: 1px;
      }
      .el-select {
        width: 160px;
        margin-right: 10px;
      }
      .el-input--mini .el-input__inner {
        height: 24px;
      }
      .el-range__close-icon {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
}
</style>
