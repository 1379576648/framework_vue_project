<!-- 系统导航栏 -->
<template>
  <section
      class="ant-layout ant-layout-has-sider"
      style="
      min-width: 988px;
      min-height: 100vh;
      background-color: rgb(232, 239, 246, 0);
      box-shadow: rgb(121, 159, 197) 0px 7px;
    "
      id="scrollLayout"
  >
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
          MENU_NAME: '权限管理',//菜单名称
          MENU_ROUTE: '/1',//路由地址
          MENU_MODULE: '&#xe62c;',//组件地址
          MENU_STATE: 0,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 0,//是否有叶子 0有 1没有
          son: [//子菜单
            {
              MENU_ID: 2,//菜单编号
              MENU_NAME: '权限设置',//菜单名称
              MENU_ROUTE: '/permission_set',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            },
            {
              MENU_ID: 3,//菜单编号
              MENU_NAME: '角色设置',//菜单名称
              MENU_ROUTE: '/notice',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 0,//是否有叶子 0有 1没有
              son: [
                {
                  MENU_ID: 4,//菜单编号
                  MENU_NAME: '权限设置',//菜单名称
                  MENU_ROUTE: '/permission_set',//路由地址
                  MENU_MODULE: '&#xe62c;',//组件地址
                  MENU_STATE: 0,//是否启用 0启用 1禁用
                  MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                  MENU_LEAF: 0,//是否有叶子 0有 1没有
                  son: [
                    {
                      MENU_ID: 5,//菜单编号
                      MENU_NAME: '权限设置',//菜单名称
                      MENU_ROUTE: '/permission_set',//路由地址
                      MENU_MODULE: '&#xe62c;',//组件地址
                      MENU_STATE: 0,//是否启用 0启用 1禁用
                      MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                      MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }
                  ]
                }
              ]
            }]
        }, {
          MENU_ID: 6,//菜单编号
          MENU_NAME: '公告管理',//菜单名称
          MENU_ROUTE: '/permission_set',//路由地址
          MENU_MODULE: '&#xe62c;',//组件地址
          MENU_STATE: 0,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 0,//是否有叶子 0有 1没有
          son: [
            {
              MENU_ID: 7,//菜单编号
              MENU_NAME: '公告设置',//菜单名称
              MENU_ROUTE: '/notice',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            }]
        }, {
          MENU_ID: 8,//菜单编号
          MENU_NAME: '日志管理',//菜单名称
          MENU_ROUTE: '/3',//路由地址
          MENU_MODULE: '&#xe62c;',//组件地址
          MENU_STATE: 0,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 0,//是否有叶子 0有 1没有
          son: [
            {
              MENU_ID: 8,//菜单编号
              MENU_NAME: '登录日志',//菜单名称
              MENU_ROUTE: '/login_log',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            },
            {
              MENU_ID: 9,//菜单编号
              MENU_NAME: '操作日志',//菜单名称
              MENU_ROUTE: '/operate_log',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            }]
        }, {
          MENU_ID: 10,//菜单编号
          MENU_NAME: '操作日志',//菜单名称
          MENU_ROUTE: '/1',//路由地址
          MENU_MODULE: '&#xe62c;',//组件地址
          MENU_STATE: 0,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 1,//是否有叶子 0有 1没有
        }], activate_router: '',
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

a {
  color: rgb(48, 49, 51)
}

/deep/ .el-sub-menu__title span {
  font-weight: normal;
  font-size: 15px;
  margin-left: -5px;
  margin-top: -1px;
}
</style>
