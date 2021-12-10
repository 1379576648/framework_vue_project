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
            <el-menu unique-opened="true" default-active="3" background-color="#f2f6f8" router>
              <menu-util :data="menuList"/>
            </el-menu>
          </div>
        </div>
      </aside>
    </div>
    <main class="ant-layout-content">
      <router-view name="notice"></router-view>
      <router-view name="login_log"></router-view>
      <router-view name="operate_log"></router-view>
      <router-view name="permission_set"></router-view>
    </main>
  </section>
</template>

<script lang="ts">
import menuUtil from '../util/menu_util.vue'

export default {
  components: {
    menuUtil
  },
  data() {
    return {
      menuList: [
        {
          MENU_NAME: '权限管理',
          MENU_ROUTE: '/1',
          MENU_MODULE: '&#xe62c;',
          MENU_state: 0,
          MENU_TYPE: 0,
          MENU_LEAF: 1,
          MENU_ORDER: 0
          ,
          son: [
            {
              MENU_NAME: '权限设置',
              MENU_ROUTE: '/permission_set',
              MENU_MODULE: '',
              MENU_state: 0,
              MENU_TYPE: 0,
              MENU_LEAF: 1,
              MENU_ORDER: 1
            },
            {
              MENU_NAME: '角色设置',
              MENU_ROUTE: '/notice',
              MENU_MODULE: '&#xe62c;',
              MENU_state: 0,
              MENU_TYPE: 0,
              MENU_LEAF: 1,
              MENU_ORDER: 0,
              son: [
                {
                  MENU_NAME: '权限设置',
                  MENU_ROUTE: '/permission_set',
                  MENU_MODULE: '&#xe62c;',
                  MENU_state: 0,
                  MENU_TYPE: 0,
                  MENU_LEAF: 1,
                  MENU_ORDER: 0,
                  son:[
                    {
                      MENU_NAME: '权限设置',
                      MENU_ROUTE: '/permission_set',
                      MENU_MODULE: '&#xe62c;',
                      MENU_state: 0,
                      MENU_TYPE: 0,
                      MENU_LEAF: 1,
                      MENU_ORDER: 1}
                  ]
                }
              ]
            }]
        }, {
          MENU_NAME: '公告管理',
          MENU_ROUTE: '/2',
          MENU_MODULE: '&#xe62c;',
          MENU_state: 0,
          MENU_TYPE: 0,
          MENU_LEAF: 1,
          MENU_ORDER: 0
          ,
          son: [
            {
              MENU_NAME: '公告设置',
              MENU_ROUTE: '/notice',
              MENU_MODULE: '',
              MENU_state: 0,
              MENU_TYPE: 0,
              MENU_LEAF: 1,
              MENU_ORDER: 1
            }]
        }, {
          MENU_NAME: '日志管理',
          MENU_ROUTE: '/3',
          MENU_MODULE: '&#xe62c;',
          MENU_state: 0,
          MENU_TYPE: 0,
          MENU_LEAF: 1,
          MENU_ORDER: 0
          ,
          son: [
            {
              MENU_NAME: '登录日志',
              MENU_ROUTE: '/login_log',
              MENU_MODULE: '',
              MENU_state: 0,
              MENU_TYPE: 0,
              MENU_LEAF: 1,
              MENU_ORDER: 1
            },
            {
              MENU_NAME: '操作日志',
              MENU_ROUTE: '/operate_log',
              MENU_MODULE: '',
              MENU_state: 0,
              MENU_TYPE: 0,
              MENU_LEAF: 1,
              MENU_ORDER: 1
            }]
        }, {
          MENU_NAME: '权限管理',
          MENU_ROUTE: '/1',
          MENU_MODULE: '&#xe62c;',
          MENU_state: 0,
          MENU_TYPE: 0,
          MENU_LEAF: 1,
          MENU_ORDER: 1
        }]
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
