<!--考勤导航栏-->
<template>
  <section
      class="ant-layout ant-layout-has-sider"
      style="
      min-width: 988px;
      min-height: 100vh;
      background-color: rgb(232, 239, 246, 0);
      box-shadow: rgb(121, 159, 197) 0px 7px;
    "
      id="scrollLayout">
    <div class="sider-view-left">
      <aside
          class="
          hq-siderbar
          strut-sidebar-show
          ant-layout-sider ant-layout-sider-inline
        "
          style="
          flex: 0 0 160px;
          max-width: 160px;
          min-width: 160px;
          width: 160px;
          background-color: #f2f6f8;">
        <div class="ant-layout-sider-children">
          <div class="hq-logo-wrapper"></div>
          <div class="custom-menu" style="width: 160px">
            <!-- 下拉菜单 -->
            <el-menu unique-opened="true" :default-active="default_route" background-color="#f2f6f8" router>
              <menu-util :data="menuList"/>
            </el-menu>
          </div>
        </div>
      </aside>
    </div>
    <main class="ant-layout-content">
      <route-util :data="menuList"></route-util>
    </main>
  </section>
</template>

<script lang="ts">
import menuUtil from '../util/menu_util.vue'
import routeUtil from '../util/route_util.vue'

export default {
  components: {
    menuUtil,
    routeUtil
  },
  data() {
    return {
      //动态菜单
      menuList: [
        {
          MENU_ID: 1,//菜单编号
          MENU_NAME: '基础设置',//菜单名称
          MENU_ROUTE: '/1',//路由地址
          MENU_MODULE: '&#xe62c;',//组件地址
          MENU_STATE: 0,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 0,//是否有叶子 0有 1没有
          son: [
            {
              MENU_ID: 2,//菜单编号
              MENU_NAME: '招聘计划',//菜单名称
              MENU_ROUTE: '/1-1',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            }
          ]
        }, {
          MENU_ID: 3,//菜单编号
          MENU_NAME: '考勤记录',//菜单名称
          MENU_ROUTE: '/2',//路由地址
          MENU_MODULE: '&#xe62c;',//组件地址
          MENU_STATE: 0,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 0,//是否有叶子 0有 1没有
          son: [
            {
              MENU_ID: 4,//菜单编号
              MENU_NAME: '人才库',//菜单名称
              MENU_ROUTE: '/2-1',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            }, {
              MENU_ID: 5,//菜单编号
              MENU_NAME: '新简历',//菜单名称
              MENU_ROUTE: '/2-2',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            }, {
              MENU_ID: 6,//菜单编号
              MENU_NAME: '候选人',//菜单名称
              MENU_ROUTE: '/2-3',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            }, {
              MENU_ID: 7,//菜单编号
              MENU_NAME: '淘汰库',//菜单名称
              MENU_ROUTE: '/2-4',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            }
          ]
        }, {
          MENU_ID: 8,//菜单编号
          MENU_NAME: '考勤统计',//菜单名称
          MENU_ROUTE: '/3',//路由地址
          MENU_MODULE: '&#xe62c;',//组件地址
          MENU_STATE: 0,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 0,//是否有叶子 0有 1没有
          son: [
            {
              MENU_ID: 9,//菜单编号
              MENU_NAME: '面试管理',//菜单名称
              MENU_ROUTE: '/3-1',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            }, {
              MENU_ID: 10,//菜单编号
              MENU_NAME: '复试管理',//菜单名称
              MENU_ROUTE: '/3-2',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            }
          ]
        }
      ], activate_router: '',
    }
  }, computed: {
    //默认激活路由
    default_route() {
      //找出第一个没有叶子的菜单
      this.inquire_1();
      return this.activate_router;
    }
  }, methods: {
    inquire_1() {
      for (let i of this.menuList) {
        if (i.MENU_LEAF == 0 && i.MENU_STATE == 0) {
          this.inquire_2(i.son);
        } else if (i.MENU_LEAF == 1 && i.MENU_STATE == 0) {
          if (this.activate_router == '') {
            this.activate_router = i.MENU_ROUTE;
          }
        }
      }
    }, inquire_2(value) {
      for (let i of value) {
        if (i.MENU_LEAF == 0 && i.MENU_STATE == 0) {
          this.inquire_2(i.son);
        } else if (i.MENU_LEAF == 1 && i.MENU_STATE == 0) {
          if (this.activate_router == '') {
            this.activate_router = i.MENU_ROUTE;
          }
        }
      }
    }
  }

}
</script>

<style type="text/css" scoped>
@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");

/deep/ .el-menu-item{
  font-weight: normal !important;
  font-size: 13px !important;
  margin-left: 16px !important;
  height: 50px !important;
}
/deep/ .el-tabs__item {
  padding: 0px 10px;
  padding-left: 36px;
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  color: var(--el-text-color-primary);
  position: relative;
}
/deep/.el-tabs__nav {
  white-space: nowrap;
  position: relative;
  transition: transform var(--el-transition-duration);
  float: left;
  z-index: calc(var(--el-index-normal) + 1);
  margin-left: 0px;
}

a{
  font-size: 15px;
  color: black;
}
</style>
