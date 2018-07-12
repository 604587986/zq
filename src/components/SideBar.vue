<template>
  <div id="SideBar" class="float-left">
    <ul class="side-ul">
      <li v-for="(item,index) in side_bar" :key="item.id" :class="{'li-active':item.column_open}">
        <div class="menu-link-container" @click="open_column(index)">
          <i class="iconfont float-left" :class="item.column_icon"></i>
          <span class="side-text float-left">{{item.first_class_column_name}}</span>
          <i class="iconfont icon-down"></i>
        </div>
        <ol>
          <li v-for="(list,index) in item.second_class_column" :key="list.id">
            <router-link :to="'/pages/system_administrators/System_Administrators/'+list.column_url" class="side-click" active-class="menu-active">{{list.column_name}}</router-link>
          </li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      side_bar: [
        {
          first_class_column_name: "工作台",
          first_class_column_url: "Workbench",
          column_icon: "icon-gongzuotai",
          column_open: false,
          no_second: true,
          second_class_column: []
        },
        {
          first_class_column_name: "站点管理",
          first_class_column_url: "",
          column_icon: "icon-zhandianguanli",
          column_open: false,
          no_second: false,
          second_class_column: [
            {
              column_name: "添加站点",
              column_url: "AddSite",
              column_active: false
            },
            {
              column_name: "站点列表",
              column_url: "SiteList",
              column_active: false
            },
            {
              column_name: "内容管理",
              column_url: "ContentManagement",
              column_active: false
            },
            {
              column_name: "数据备份",
              column_url: "DataBackup",
              column_active: false
            }
          ]
        },
        {
          first_class_column_name: "附件管理",
          first_class_column_url: "",
          column_icon: "icon-fujianguanli",
          column_open: false,
          no_second: false,
          second_class_column: [
            // {
            //   column_name: "添加附件",
            //   column_url: "AddEnclosure",
            //   column_active: false
            // },
            {
              column_name: "附件列表",
              column_url: "EnclosureList",
              column_active: false
            }
          ]
        },
        {
          first_class_column_name: "组件管理",
          first_class_column_url: "",
          column_icon: "icon-zujianguanli",
          column_open: false,
          no_second: false,
          second_class_column: [
            {
              column_name: "添加组件",
              column_url: "AddComponent",
              column_active: false
            },
            {
              column_name: "组件列表",
              column_url: "ComponentList",
              column_active: false
            }
          ]
        },
        {
          first_class_column_name: "网站模板",
          first_class_column_url: "",
          column_icon: "icon-wangzhanmoban",
          column_open: false,
          no_second: false,
          second_class_column: [
            {
              column_name: "添加模板",
              column_url: "AddTemplate",
              column_active: false
            },
            {
              column_name: "模板列表",
              column_url: "TemplateList",
              column_active: false
            }
          ]
        },
        {
          first_class_column_name: "权限管理",
          first_class_column_url: "",
          column_icon: "icon-quanxianguanli",
          column_open: false,
          no_second: false,
          second_class_column: [
            {
              column_name: "添加用户",
              column_url: "AddUser",
              column_active: false
            },
            {
              column_name: "用户管理",
              column_url: "UserList",
              column_active: false
            },
            {
              column_name: "添加用户组",
              column_url: "AddUserGroup",
              column_active: false
            },
            {
              column_name: "用户组管理",
              column_url: "UserGroupList",
              column_active: false
            }
          ]
        },
        {
          first_class_column_name: "系统设置",
          first_class_column_url: "",
          column_icon: "icon-xitongshezhi",
          column_open: false,
          no_second: false,
          second_class_column: [
            {
              column_name: "部门管理",
              column_url: "DepartmentList",
              column_active: false
            },
            {
              column_name: "全局设置",
              column_url: "SiteInfo",
              column_active: false
            },
            {
              column_name: "系统日志",
              column_url: "LoginLog",
              column_active: false
            }
          ]
        }
      ],
      menu_idx: 0 //导航定位
    };
  },
  watch: {
    update_system_menu_idx(newVal, oldVal) {
      for (let obj of this.side_bar) {
        obj.column_open = false;
      }
      this.side_bar[newVal].column_open = true; //定位导航
    }
  },
  computed: {
    update_system_menu_idx() {
      return this.$store.state.system_menu_idx;
    }
  },
  mounted: function() {
    //定位导航
    if (sessionStorage.getItem("system_menu_idx")) {
      this.menu_idx = sessionStorage.getItem("system_menu_idx");
      this.side_bar[this.menu_idx].column_open = true;
    }
  },
  methods: {
    open_column: function(index) {
      for (let obj of this.side_bar) {
        // obj.column_open = false;
      }
      if (index == 0) {
        this.$router.push({
          path: "/pages/system_administrators/System_Administrators/Workbench"
        });
      }
      this.side_bar[index].column_open = !this.side_bar[index].column_open; //展开菜单
      sessionStorage.setItem("system_menu_idx", index); //将导航idx存入sessionStorage数据库
      this.$store.commit("update_system_menu_idx", index); //更新vuex
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../assets/css/less_config";
#SideBar {
  width: 183px;
  background: #fff;
  border-radius: 3px;
  .side-ul {
    width: 100%;
    padding: 10px 0;
    overflow: hidden;
    > li {
      width: 100%;
      &:first-of-type {
        .icon-down {
          display: none;
        }
      }
      &:hover {
        .menu-link-container {
          background: #dff2fc;
          &::before {
            left: 0;
          }
        }
      }
      .menu-link-container {
        display: block;
        width: 100%;
        height: 40px;
        padding-left: 20px;
        position: relative;
        background: #fff;
        transition: all 0.3s;
        cursor: pointer;
        &::before {
          content: "";
          position: absolute;
          left: -6px;
          top: 0;
          display: block;
          width: 6px;
          height: 100%;
          background: @base-color2;
          transition: all 0.3s;
        }
        .iconfont,
        span {
          line-height: 40px;
          color: @base_grey;
          font-size: 16px;
          position: relative;
          z-index: 10;
        }
        .icon-fujianguanli {
          font-size: 14px;
        }
        .icon-down {
          position: absolute;
          right: 26px;
          transition: all 0.3s;
        }
        .side-text {
          margin-left: 10px;
        }
      }
      > ol {
        width: 100%;
        > li {
          width: 100%;
          height: 0;
          overflow: hidden;
          transition: all 0.3s;
          .side-click {
            display: block;
            width: 100%;
            line-height: 38px;
            font-size: 14px;
            padding-left: 20px;
            color: @base_grey;
            transition: all 0.3s;
            &:hover {
              color: @base-color2;
            }
          }
        }
        .router-link-exact-active.menu-active {
          color: @base-color2;
        }
      }
    }
    .li-active {
      .menu-link-container {
        background: #dff2fc;
        &::before {
          left: 0;
        }
        .icon-down {
          transform: rotateZ(180deg);
        }
      }
      > ol > li {
        height: 38px;
      }
    }
  }
}
</style>
