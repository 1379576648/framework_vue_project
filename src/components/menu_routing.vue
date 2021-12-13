<!-- 审批导航栏 -->
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
            <el-menu  id="el-menu" :default-active="default_route" background-color="#f2f6f8" mode="vertical"
                     @select="handleAsideSelect" >
              <menu-util :data="menuList[0]"/>
            </el-menu>
          </div>
        </div>
      </aside>
    </div>
    <main class="ant-layout-content">
      <router-view v-for="name in menuName" :name="name"/>
    </main>
  </section>
</template>

<script lang="ts">
import menuUtil from '../components/util/menu_util.vue'

export default {
  components: {
    menuUtil,
  },
  data() {
    return {
      //路由名称列表
      menuName:[],
      //根据path动态获取store里面的菜单列表
      menuList: this.$store.getters.store_menuList(this.$route.query.path),
      //默认激活路由
      activate_router: '',
    }
  }, computed: {
    //默认激活路由
    default_route() {
      //如果版本不一致
      if (this.$store.state.router_versions!=this.$route.query.path){
        this.activate_router=''
      }else{
        //如果版本一致则默认激活路由取出来
        this.activate_router=this.$store.state.default_route;
      }
      // //找出第一个没有叶子的菜单
      this.inquire_1();
      return this.activate_router;
    },
  }, methods: {
    inquire_1() {
      for (let i of this.menuList[0]) {
        //如果菜单有叶子 并且状态为启用
        if (i.MENU_LEAF == 0 && i.MENU_STATE == 0) {
          //梯归
          this.inquire_2(i.son);
        } else if (i.MENU_LEAF == 1 && i.MENU_STATE == 0) {
          //取当前路由名称添加最后一个/后面的字符
          this.menuName.push(i.MENU_ROUTE.substring(i.MENU_ROUTE.lastIndexOf('/') + 1,i.MENU_ROUTE.length));
          //找出第一个路由为默认激活路由
          if (this.activate_router==''){
            //替换默认激活地址
            this.activate_router=i.MENU_ROUTE
          }
        }
      }
    }, inquire_2(value) {
      for (let i of value) {
        //如果菜单有叶子 并且状态为启用
        if (i.MENU_LEAF == 0 && i.MENU_STATE == 0) {
          //梯归
          this.inquire_2(i.son);
        } else if (i.MENU_LEAF == 1 && i.MENU_STATE == 0) {
          //取当前路由名称添加最后一个/后面的字符
          this.menuName.push(i.MENU_ROUTE.substring(i.MENU_ROUTE.lastIndexOf('/') + 1, i.MENU_ROUTE.length));
          //找出第一个路由为默认激活路由
          if (this.activate_router == '') {
            //替换默认激活地址
            this.activate_router = i.MENU_ROUTE
          }
        }
      }
    },
    //菜单点击事件
    handleAsideSelect(index, key, keyPath) {
      //默认激活的路由
      this.$store.state.default_route=index
      //更换默认二级路由名称版本
      this.$store.state.router_versions = this.$route.query.path
      //跳转路由
      this.$router.push({
        path: index,
        query: {path: this.$route.query.path,},
        replace:true
      })
    }

}
}
</script>

<style type="text/css" scoped>
@import url("../css/navigation.css");
@import url("../css/zpdaohang.css");

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
  height: 90% !important;
}

/deep/ label li div span {
  margin-right: 20px;
}

/deep/ .el-menu-item {
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
