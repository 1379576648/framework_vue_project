<!-- 统计分析导航栏 -->
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
          MENU_NAME: '人员分析',//菜单名称
          MENU_ROUTE: '/1',//路由地址
          MENU_MODULE: '&#xe62c;',//组件地址
          MENU_STATE: 0,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 0,//是否有叶子 0有 1没有
          son: [
            {
              MENU_ID: 2,//菜单编号
              MENU_NAME: '人员数量分析',//菜单名称
              MENU_ROUTE: '/StatisticePersonnel1',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            },
            {
              MENU_ID: 3,//菜单编号
              MENU_NAME: '人员异动分析',//菜单名称
              MENU_ROUTE: '/StatisticePersonnel2',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            },
            {
              MENU_ID: 4,//菜单编号
              MENU_NAME: '员工概况',//菜单名称
              MENU_ROUTE: '/StatisticePersonnel3',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            }
          ]
        }, {
          MENU_ID: 5,//菜单编号
          MENU_NAME: '考勤分析',//菜单名称
          MENU_ROUTE: '/2',//路由地址
          MENU_MODULE: '&#xe62c;',//组件地址
          MENU_STATE: 0,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 0,//是否有叶子 0有 1没有
          son: [
            {
              MENU_ID: 6,//菜单编号
              MENU_NAME: '出勤分析',//菜单名称
              MENU_ROUTE: '/CheckWork1',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            }, {
              MENU_ID: 7,//菜单编号
              MENU_NAME: '工时分析',//菜单名称
              MENU_ROUTE: '/CheckWork2',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            },
            {
              MENU_ID: 8,//菜单编号
              MENU_NAME: '加班分析',//菜单名称
              MENU_ROUTE: '/CheckWork3',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            }, {
              MENU_ID: 9,//菜单编号
              MENU_NAME: '请假分析',//菜单名称
              MENU_ROUTE: '/CheckWork4',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            }
          ]
        }, {
          MENU_ID: 10,//菜单编号
          MENU_NAME: '薪酬分析',//菜单名称
          MENU_ROUTE: '/3',//路由地址
          MENU_MODULE: '&#xe62c;',//组件地址
          MENU_STATE: 0,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 0,//是否有叶子 0有 1没有
          son: [
            {
              MENU_ID: 11,//菜单编号
              MENU_NAME: '工资成本分析',//菜单名称
              MENU_ROUTE: '/SalaryAnalysis1',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            },{
              MENU_ID: 12,//菜单编号
              MENU_NAME: '社保成本分析',//菜单名称
              MENU_ROUTE: '/SalaryAnalysis2',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            },{
              MENU_ID: 13,//菜单编号
              MENU_NAME: '薪酬结构分析',//菜单名称
              MENU_ROUTE: '/SalaryAnalysis3',//路由地址
              MENU_MODULE: '&#xe62c;',//组件地址
              MENU_STATE: 0,//是否启用 0启用 1禁用
              MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
              MENU_LEAF: 1,//是否有叶子 0有 1没有
            },{
              MENU_ID: 14,//菜单编号
              MENU_NAME: '部门成本分析',//菜单名称
              MENU_ROUTE: '/SalaryAnalysis4',//路由地址
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
      //返回结果
      return this.activate_router;
    }
  }, methods: {
    inquire_1() {
      for (let i of this.menuList) {
        //判断列表是否有叶子 状态是否启用 类型是否是菜单
        if (i.MENU_LEAF == 0 && i.MENU_STATE == 0 && i.MENU_TYPE==0) {
          //递归循环
          this.inquire_2(i.son);
        }
        //判断列表是否有叶子 状态是否启用 类型是否是菜单
        else if (i.MENU_LEAF == 1 && i.MENU_STATE == 0 && i.MENU_TYPE==0) {
          //如果默认激活路由没有则添加默认激活路由
          if (this.activate_router == '') {
            this.activate_router = i.MENU_ROUTE;
          }
        }
      }
    }, inquire_2(value) {
      for (let i of value) {
        //判断列表是否有叶子 状态是否启用 类型是否是菜单
        if (i.MENU_LEAF == 0 && i.MENU_STATE == 0 && i.MENU_TYPE==0) {
          //递归循环
          this.inquire_2(i.son);
        }
        //判断列表是否有叶子 状态是否启用 类型是否是菜单
        else if (i.MENU_LEAF == 1 && i.MENU_STATE == 0 && i.MENU_TYPE==0) {
          //如果默认激活路由没有则添加默认激活路由
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
