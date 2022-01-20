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
            <!--:default-active默认激活路由-->
            <!--:@select菜单点击事件-->
            <el-menu id="el-menu" :default-active="activate_router" background-color="#f2f6f8" mode="vertical"
                     @select="handleAsideSelect">
              <!-- 级联显示菜单 -->
              <menu-util :data="menuList"/>
            </el-menu>
          </div>
        </div>
      </aside>
    </div>
    <main class="ant-layout-content">
      <!--视图显示-->
      <router-view/>
    </main>
  </section>
</template>

<script lang="ts">
import menuUtil from '../../components/util/menu_util.vue'
import {
  useRouter
} from 'vue-router'

export default {
  components: {
    menuUtil,
  },
  data() {
    return {
      //根据path动态获取store里面的菜单列表
      menuList: this.$store.getters.store_menuList('/' + window.location.pathname.substring(1, window.location.pathname.length).substring(0, window.location.pathname.substring(1, window.location.pathname.length).indexOf('/')))[0],
      //默认激活路由
      activate_router: window.location.pathname.substring(0, window.location.pathname.length),
    }
  }, methods: {
    defaultRouter() {
      this.activate_router = window.location.pathname.substring(0, window.location.pathname.length);
    },
    //菜单点击事件
    handleAsideSelect(index, key, keyPath) {
      //默认激活的路由
      this.activate_router = index
      //跳转路由 通过path 以及携带参数  参数是从一级目录传过来的
      this.$router.push({
        path: index
      })
    }

  }, created() {
    //监听点击浏览器的前级跟回退按钮
    window.addEventListener('popstate', this.defaultRouter, false);
  }
}
</script>

<style type="text/css" scoped>
@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");

/deep/ .el-sub-menu .el-sub-menu__icon-arrow {
  position: relative !important;
  top: 4px !important;
  right: 0px !important;
}

/deep/ .el-sub-menu .el-menu-item {
  min-width: auto !important;
}

/deep/ #el-menu {
  height: 100% !important;
  overflow-x: auto !important;
}

.custom-menu {
  padding: 0px !important;
  height: 89% !important;
}

/deep/ label li div span {
  margin-right: 20px;
}

/deep/ .el-menu-item {
  font-weight: bold !important;
  font-size: 14px !important;
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

/deep/ .el-tabs__nav {
  white-space: nowrap;
  position: relative;
  transition: transform var(--el-transition-duration);
  float: left;
  z-index: calc(var(--el-index-normal) + 1);
  margin-left: 0px;
}

a {
  font-size: 15px;
  color: black;
}
</style>
