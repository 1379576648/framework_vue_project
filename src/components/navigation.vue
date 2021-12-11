f<!-- 首页导航栏 -->
<template>
  <div>
    <!--  头部导航栏  -->
    <div class="header-app_s">
      <div class="ant-row header_row_s">
        <div class="ant-col hq-logo-wrapper header_1_s header_logo_s">
					<span class="hq-logo_">
						<a>
							<img src="../assets/que360_logo.png"/>
						</a>
					</span>
        </div>
        <!--  导航菜单  -->
        <div class="ant-col header_row_menu">
          <!--          :default-active默认激活的路由-->
<!--          <el-menu :default-active="default_route" class="el-menu-demo" mode="horizontal"-->
<!--                   background-color="#085fc3" text-color="#ffffff" active-text-color="#ffd04b" router @close="one"-->
<!--                   @select="handleSelect">-->
<!--              <el-menu-item v-for="memu in filter_menu" :index="memu.MENU_ROUTE">-->
<!--                {{ memu.MENU_NAME }}-->
<!--              </el-menu-item>-->
<!--          </el-menu>-->
<!--            </span>-->


          <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
          >
            <el-menu-item v-for="memu in memuList1" :index="memu.MENU_ROUTE">
                   {{ memu.MENU_NAME }}
            </el-menu-item>
            <el-sub-menu index="5">
              <template #title>更多</template>
              <li style="text-align: center;margin: 10px 32px; float: left;width: 58px;height: 81px" v-for="memu in memuList2">
                <router-link v-if="memu.MENU_STATE==0"  :to="memu.MENU_ROUTE" >
                <i class="iconfont" style="color: #0c9c6e;font-size: 40px;height: 40px;width: 40px; display: block;margin: auto;">
                  {{ iconHandle(memu.MENU_MODULE) }}</i>
                <br/>
                <p>{{ memu.MENU_NAME }}</p>
                </router-link>
              </li>

            </el-sub-menu>
          </el-menu>
        </div>
        <!--  导航栏: 个人信息  -->
        <div class="ant-col header_3_s header_2_s">
					<span style="margin-left: 15px; margin-right: 15px;">
						<img style="width: 26px; height: 26px; border-radius: 50%;" alt="" src="../assets/aaa.jpg">
						&nbsp;&nbsp;
						17352763829
                <el-dropdown>
                  <span class="el-dropdown-link">
                     <i class="iconfont" style="color: white">&#xe600;</i>
                    <el-icon class="el-icon--right">
                      <arrow-down/>
                    </el-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>账户信息</el-dropdown-item>
                      <el-dropdown-item>SAAS PC</el-dropdown-item>
                      <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
					</span>
        </div>
        <!--  导航栏: 消息  -->
        <div class="ant-col header_2_s header-notice__event">
          <div>
						<span class="header-badge__notice ant-badge">
							<i style="font-size: 18px; color: rgb(255, 255, 255); line-height: 70px;"
                 class="iconfont">&#xe625;</i>
						</span>
            <div class="header_message header_message_show">
              <div>
                <el-tabs v-model="activeName" @tab-click="handleClick" stretch="true"
                         style="margin-top: 10px;color: black">
                  <el-tab-pane label="未读消息" name="first">
                    <div style="width: 100px; height: 100px; background-color: #0c9c6e"></div>
                  </el-tab-pane>
                  <el-tab-pane label="全部消息" name="second">全部消息</el-tab-pane>
                  <el-tab-pane label="已读消息" name="third">已读消息</el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 工作台 -->
    <router-view></router-view>
    <!-- 招聘 -->
    <router-view name="ym1"></router-view>

  </div>
</template>

<script>
import {ArrowDown} from '@element-plus/icons';
import {
  defineComponent,
  ref
} from 'vue'


export default {
  data() {
    return {
      //默认激活路由
      activate_router: '',
      two: '',
      gend: false,
      activeIndex: '1',
      activeIndex2: '1',
      activeName: 'second',
      //更多之外的菜单
      memuList1: [
        {
          MENU_ID: 1,//菜单编号
          MENU_NAME: '工作台',//菜单名称
          MENU_ROUTE: '/workT',//路由地址
          MENU_MODULE: '&#xe64c;',//组件地址
          MENU_STATE: 1,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 1,//是否有叶子 0有 1没有
        },
        {
          MENU_ID: 2,//菜单编号
          MENU_NAME: '组织管理',//菜单名称
          MENU_ROUTE: '/zuzhi',//路由地址
          MENU_MODULE: '&#xe64c;',//组件地址
          MENU_STATE: 1,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 1,//是否有叶子 0有 1没有
        },
        {
          MENU_ID: 3,//菜单编号
          MENU_NAME: '员工管理',//菜单名称
          MENU_ROUTE: '/empyg',//路由地址
          MENU_MODULE: '&#xe64c;',//组件地址
          MENU_STATE: 0,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 1,//是否有叶子 0有 1没有
        },
        {
          MENU_ID: 4,//菜单编号
          MENU_NAME: '时间管理',//菜单名称
          MENU_ROUTE: '/shij',//路由地址
          MENU_MODULE: '&#xe64c;',//组件地址
          MENU_STATE: 0,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 1,//是否有叶子 0有 1没有
        },
        {
          MENU_ID: 5,//菜单编号
          MENU_NAME: '招聘管理',//菜单名称
          MENU_ROUTE: '/zpdaohang',//路由地址
          MENU_MODULE: '&#xe64c;',//组件地址
          MENU_STATE: 0,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 1,//是否有叶子 0有 1没有
        }
      ],
      //更多之内的菜单
      memuList2: [
        {
          MENU_ID: 1,//菜单编号
          MENU_NAME: '审批管理',//菜单名称
          MENU_ROUTE: '/xcnavigation',//路由地址
          MENU_MODULE: '&#xeb65;',//组件地址
          MENU_STATE: 0,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 1,//是否有叶子 0有 1没有
        },
        {
          MENU_ID: 2,//菜单编号
          MENU_NAME: '薪酬管理',//菜单名称
          MENU_ROUTE: '/xcnavigation',//路由地址
          MENU_MODULE: '&#xe68d;',//组件地址
          MENU_STATE: 0,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 1,//是否有叶子 0有 1没有
        },
        {
          MENU_ID: 3,//菜单编号
          MENU_NAME: '社保管理',//菜单名称
          MENU_ROUTE: '/xcnavigation',//路由地址
          MENU_MODULE: '&#xe604;',//组件地址
          MENU_STATE: 0,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 1,//是否有叶子 0有 1没有
        },
        {
          MENU_ID: 4,//菜单编号
          MENU_NAME: '薪酬管理',//菜单名称
          MENU_ROUTE: '/Statistics',//路由地址
          MENU_MODULE: '&#xe68c;',//组件地址
          MENU_STATE: 0,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 1,//是否有叶子 0有 1没有
        },
        {
          MENU_ID: 5,//菜单编号
          MENU_NAME: '系统管理',//菜单名称
          MENU_ROUTE: '/system_navigation',//路由地址
          MENU_MODULE: '&#xe64c;',//组件地址
          MENU_STATE: 0,//是否启用 0启用 1禁用
          MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
          MENU_LEAF: 1,//是否有叶子 0有 1没有
        }
      ]
    }
  },
  methods: {
    mouseLeave() {
      this.gend = false;
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }, handleSelect(key, keyPath) {
      this.two = key;
      console.log(key, keyPath)
    },
    //字符串转图标字体
    iconHandle(icon) {
      icon = icon.replace(/(&#x|;)/g, "")
      console.log(icon, "%u" + icon);
      return unescape("%u" + icon)
    },
    inquire_1() {
      for (let i of this.memuList1) {
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
  }, computed: {
    //默认激活路由
    default_route() {
      //找出第一个没有叶子的菜单
      this.inquire_1();
      return this.activate_router;
    }, //筛选菜单列表
    filter_menu(){
      var menu_list =[]
      for (let i = 0; i <this.memuList1.length ; i++) {
        if (this.memuList1[i].MENU_STATE==0){
          menu_list.push(this.memuList1[i])
        }
      }
      return menu_list;
    }
  }

}
</script>
<style>
.el-menu--popup {
  z-index: 100 !important;
  border: none !important;
  padding: 10px 10px !important;
  border-radius: var(--el-border-radius-small) !important;
  box-shadow: var(--el-box-shadow-light) !important;
  min-width: 0px !important;
  width: 386px;
}
</style>

<style type="text/css" scoped>
@import url("../css/navigation.css");

.gengd_li{
  width: 100px;
  height: 100px;
}

/deep/.el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
  height: 71px;
  line-height: 60px;
  border-bottom: 2px solid transparent;
  border-bottom-color: transparent;
  color: var(--el-menu-text-color);
}


.el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-sub-menu__title {
  background-color: var(--el-menu-background-color);
  display: flex;
  align-items: center;
  padding: 0 10px;
  color: var(--el-menu-text-color);
  width: 100px;
  height: 100px;
  float: left;
}
.el-menu[data-v-09d1a3b8] {
  height: 71px;
  font-weight: bold;
  background-color: #085fc3;
}
.el-menu--horizontal > .el-menu-item {
  color: white;
}
 /deep/.el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
   height: 71px;
   line-height: 60px;
   border-bottom: 2px solid transparent;
   border-bottom-color: transparent;
   border-bottom-color: transparent;
   color: white;
 }





.hea_nav_tab li a i {
  font-size: 40px;
  vertical-align: middle;
}

.hea_nav_tab li a p span {
  color: rgba(0, 0, 0, 0.65);
}

/deep/ .el-menu-item {
  height: 70px !important;

}

.dh-span {
  height: 56px;
  width: 56px;
  display: block;
  margin: auto;
  color: white;
  cursor: pointer;
}

.ant-popover {
  color: rgba(0, 0, 0, 0.65);
}

.head_over_page {
  position: fixed !important;
  top: 48px !important;
}

.ant-popover-placement-bottom,
.ant-popover-placement-bottomLeft,
.ant-popover-placement-bottomRight {
  padding-top: 10px;
}

.ant-popover {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  padding-top: 0px;
  color: #333;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1030;
  font-weight: normal;
  white-space: normal;
  text-align: left;
  cursor: auto;
  user-select: text;
}

.ant-popover::after {
  background: rgba(255, 255, 255, 0.01);
}

.ant-popover::after {
  position: absolute;
  background: rgba(255, 255, 255, 0.01);
  content: '';
}


.ant-popover-placement-bottom > .ant-popover-content > .ant-popover-arrow {
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
}

.ant-popover-placement-bottom > .ant-popover-content > .ant-popover-arrow,
.ant-popover-placement-bottomLeft > .ant-popover-content > .ant-popover-arrow,
.ant-popover-placement-bottomRight > .ant-popover-content > .ant-popover-arrow {
  top: 6px;
  border-top-color: #fff;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: #fff;
  box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);
}

.ant-popover-arrow {
  position: absolute;
  display: block;
  width: 8.48528137px;
  height: 8.48528137px;
  background: transparent;
  border-style: solid;
  border-width: 4.24264069px;
  transform: rotate(45deg);
}

.ant-popover-inner {
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  margin-top: 10px;
}

/* 框框样式 */
.ant-popover-inner-content {
  color: rgba(0, 0, 0, 0.65);
}

.ant-popover-inner-content {
  padding: 12px 16px;
  color: #606c82;
}

.hea_nav_tot {
  width: 100%;
  padding: 7px 10px;
  background-color: #fff;
}

/* 内容样式 */
.hea_nav_tot .hea_nav_tab {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.hea_nav_tot ul {
  margin: 0;
}

ul {
  padding: 0px;
}

.hea_nav_tot .hea_nav_tab > li {
  text-align: center;
  margin: 10px 32px;
  width: 58px;
}

ul li {
  list-style: none;
}

.hea_nav_tot .header_navigation_over_list > p {
  font-size: 12px;
  color: #606c82;
  padding-top: 5px;
  margin: 0;
}

.shebaofuli {
  background-color: #49A782;
  color: #fff;
}


/* 消息样式 */
.header_message {
  width: 450px;
  height: 0;
  visibility: hidden;
  overflow: hidden;
  opacity: 0;
  transition: all .3s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.219);
  border-radius: 4px;
  position: fixed;
  top: 48px;
  right: 32px;
  z-index: 100;
  background-color: #fff;
  display: block;
}

.header_2_s:hover .header_message {
  display: block;
  height: 538px;
  visibility: visible;
  opacity: 1;
}

.ant-tabs::after {
  clear: both;
}

.ant-tabs::before, .ant-tabs::after {
  display: table;
  content: '';
}

::selection {
  color: #fff;
  background: #085fc3;
}

.ant-tabs-nav-scroll {
  height: 54px;
  line-height: 54px;
  margin-bottom: 0;
}
</style>
