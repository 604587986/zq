<template>
    <div id="DataBoard">
        <Crumb :crumbs="crumbs"></Crumb>
        <div class="data-container">
          <!-- 数据总览 -->
          <div class="data-all">
            <ul>
              <li v-for="item in data_all" :key="item.id" class="float-left">
                <span>{{item.count}}</span>
                <p>{{item.name}}</p>
              </li>
            </ul>
          </div>
          <!-- echarts 图表 -->
          <DataChart></DataChart>
        </div>
    </div>
</template>
<script>
import DataChart from "@/components/DataChart";
import Crumb from "@/components/Crumb";

export default {
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/administrators/Administrators"
        },
        {
          name: "数据看板",
          url: ""
        }
      ],
      //数据总览
      data_all: [
        {
          name: "管理员数量",
          count: "3"
        },
        {
          name: "菜单总数",
          count: "10"
        },
        {
          name: "附件容量",
          count: "200G"
        },
        {
          name: "文章总数",
          count: "100"
        }
      ]
    };
  },
  components: {
    DataChart,
    Crumb
  }
};
</script>
<style lang="less">
.data-container {
  margin-top: 50px;
  .data-all {
    margin-bottom: 50px;
    ul {
        display: flex;
      &::after {
        content: "";
        display: block;
        visibility: hidden;
        clear: both;
      }
      li {
        margin-right: 18px;
        display: block;
        // width: 175px;
        flex: 1;
        height: 100px;
        text-align: center;
        border-radius: 3px;
        border: 1px solid #d9d9d9;
        position: relative;
        text-align: center;
        &:last-of-type {
          margin-right: 0;
        }
        span {
          display: block;
          color: #00a0e9;
          font-size: 34px;
          white-space: nowrap;
          margin-top: 11px;
          overflow: hidden;
        }
        p {
          color: #888;
          white-space: nowrap;
          margin-top: 11px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>

