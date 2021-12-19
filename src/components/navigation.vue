<!-- 首页导航栏 -->
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
          <!--           :default-active默认激活的路由-->
          <el-menu
              :default-active="default_route"
              mode="horizontal"
              @select="handleSelect"
          >
            <el-menu-item v-for="memu in memuList1" :index=memu.MENU_ROUTE>
              {{ memu.MENU_NAME }}
            </el-menu-item>
            <el-sub-menu index="5" v-if="memuList2">
              <template #title>更多</template>
              <li style="text-align: center;margin: 10px 32px; float: left;width: 58px;height: 81px"
                  v-for="memu in memuList2">
                <router-link :to="{path:memu.MENU_ROUTE,query:{'path':memu.MENU_ROUTE}}"
                             @click="activate_router=memu.MENU_ROUTE, this.$store.state.activate_router=memu.MENU_ROUTE">
                  <i class="iconfont"
                     style="color: #0c9c6e;font-size: 40px;height: 40px;width: 40px; display: block;margin: auto;">
                    {{ iconHandle(memu.PICTURE_ADDRESS) }}</i>
                  <br/>
                  <p style="color: #040711">{{ memu.MENU_NAME }}</p>
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
                <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true"
                         style="margin-top: 10px;color: black">

                  <el-tab-pane label="未读消息" name="first">

                    <div role="tabpanel" aria-hidden="false" class="ant-tabs-tabpane ant-tabs-tabpane-active tab_panel">
                      <div class="ant-list ant-list-split">
                        <div class="ant-spin-nested-loading">
                          <div class="ant-spin-container">

                           <ul>
                             <li>
                                <div style="padding-top: 10px">
                                  <span>
                                     <input type="checkbox" />
                                  </span>
                                  <span style="margin-left: 5px;font-weight: bold">缺卡提醒：</span>
                                  <span>2021-01-13您有缺卡，请及时处理避免考勤统计异常。</span>
                                </div>
                             </li>

                           </ul>

                          </div>
                        </div>
                      </div>
                      <div class="bottom_panel">
                        <div>
                          <!--分页-->
                           <div style="text-align: center; padding-bottom: 8px;">
                             <el-pagination
                                 style="height: 30px"
                                 :page-size="10"
                                 :pager-count="5"
                                 layout="prev, pager, next"
                                 :total="100"
                             >
                             </el-pagination>
                           </div>
                           <div>
                             <input type="checkbox" />
                             <span>全选</span>

                             <el-button style="margin-left: 10px">已读</el-button>
                           </div>

                        </div>
                      </div>
                    </div>


                  </el-tab-pane>
                  <el-tab-pane label="全部消息" name="second">

                    <div role="tabpanel" aria-hidden="false" class="ant-tabs-tabpane ant-tabs-tabpane-active tab_panel">
                      <div class="ant-list ant-list-split">
                        <div class="ant-spin-nested-loading">
                          <div class="ant-spin-container">

                            <ul>
                              <li>
                                <div style="padding-top: 10px">
                                  <span>
                                     <input type="checkbox" />
                                  </span>
                                  <span style="margin-left: 5px;font-weight: bold">缺卡提醒：</span>
                                  <span>2021-01-13您有缺卡，请及时处理避免考勤统计异常。</span>
                                </div>
                              </li>

                            </ul>

                          </div>
                        </div>
                      </div>
                      <div class="bottom_panel">
                        <div>
                          <!--分页-->
                          <div style="text-align: center; padding-bottom: 8px;">
                            <el-pagination
                                style="height: 30px"
                                :page-size="10"
                                :pager-count="5"
                                layout="prev, pager, next"
                                :total="100"
                            >
                            </el-pagination>
                          </div>
                          <div>
                            <input type="checkbox" />
                            <span>全选</span>

                            <el-button style="margin-left: 10px">已读</el-button>
                          </div>

                        </div>
                      </div>
                    </div>


                  </el-tab-pane>
                  <el-tab-pane label="已读消息" name="third">

                    <div role="tabpanel" aria-hidden="false" class="ant-tabs-tabpane ant-tabs-tabpane-active tab_panel">
                      <div class="ant-list ant-list-split">
                        <div class="ant-spin-nested-loading">
                          <div class="ant-spin-container">

                            <ul>
                              <li>
                                <div style="padding-top: 10px">
                                  <span>
                                     <input type="checkbox" />
                                  </span>
                                  <span style="margin-left: 5px;font-weight: bold">缺卡提醒：</span>
                                  <span>2021-01-13您有缺卡，请及时处理避免考勤统计异常。</span>
                                </div>
                              </li>

                            </ul>

                          </div>
                        </div>
                      </div>
                      <div class="bottom_panel">
                        <div>
                          <!--分页-->
                          <div style="text-align: center; padding-bottom: 8px;">
                            <el-pagination
                                style="height: 30px"
                                :page-size="10"
                                :pager-count="5"
                                layout="prev, pager, next"
                                :total="100"
                            >
                            </el-pagination>
                          </div>
                          <div>
                            <input type="checkbox" />
                            <span>全选</span>

                            <el-button style="margin-left: 10px">已读</el-button>
                          </div>

                        </div>
                      </div>
                    </div>

                  </el-tab-pane>


                </el-tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 显示视图 -->
    <router-view/>
  </div>
</template>

<script>

export default {
  data() {
    return {
      true: true,
      //默认激活的路由
      activate_router: this.$store.state.activate_router,
      activeName: 'second',
      //更多之外的菜单
      memuList1: this.$store.getters.menus_outer,
      //更多之内的菜单
      memuList2: this.$store.getters.menus_within,
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    //菜单点击事件
    handleSelect(key, keyPath) {
      //将当前点击的路由存起来
      this.$store.state.activate_router = key
      //通过path 跳转路由 并且传当前激活路由为参数
      this.$router.push({
        path: key,
        query: {path: key},
      })
    },
    //字符串转图标字体
    iconHandle(icon) {
      icon = icon.replace(/(&#x|;)/g, "")
      console.log(icon, "%u" + icon);
      return unescape("%u" + icon)
    },
    inquire_1() {
      //如果菜单列表有值
      if (this.memuList1) {
        //循环菜单列表
        for (let i of this.memuList1) {
          //如果默认激活路由为空
          if (this.activate_router == '') {
            //选择菜单列表第一个路由为默认激活
            this.activate_router = i.MENU_ROUTE;
          }
        }
      }
    }
  }, computed: {
    //默认激活路由
    default_route() {
      //如果存起来的默认激活路由不等于参数值
      if (this.$store.state.activate_router != this.$route.query.path) {
        //如果参数不为空
        if (this.$route.query.path != null) {
          //默认激活路由等于参数值
          this.activate_router = this.$route.query.path
        } else {
          //初始化默认激活参数
          this.activate_router = ''
        }
        //如果存起来的默认激活路由等于参数值
      } else {
        //则默认激活路由取出来
        this.activate_router = this.$store.state.activate_router;
      }
      //找出第一个菜单
      this.inquire_1();
      //将目前激活的路由存起来
      this.$store.state.activate_router = this.activate_router
      //返回路由结果
      return this.activate_router;
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
.header_message .bottom_panel {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 8px;
  background-color: #fff;
}

.ant-tabs .ant-tabs-top-content > .ant-tabs-tabpane, .ant-tabs .ant-tabs-bottom-content > .ant-tabs-tabpane {
  flex-shrink: 0;
  width: 100%;
  -webkit-backface-visibility: hidden;
  opacity: 1;
  transition: opacity 0.45s;
}

.header_message .tab_panel {
  height: 460px;
  display: block;
  padding: 0 16px;
  padding-bottom: 0px;
  margin-bottom: 16px;
  overflow-y: auto;
  text-align: left;
  padding-bottom: 72px;
}
.ant-list {
  color: rgba(0, 0, 0, 0.65);
}
.ant-list {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #333;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
}
.ant-spin-nested-loading {
  position: relative;
}
.ant-spin-container {
   position: relative;
   transition: opacity 0.3s;
 }

.ant-spin-container::after {

  background: #fff;

}
.ant-spin-container::after {

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: none \9;
  width: 100%;
  height: 100%;
  background: #fff;
  opacity: 0;
  transition: all 0.3s;
  content: '';
  pointer-events: none;

}
*, ::before, ::after {

  box-sizing: border-box;

}
.ant-list-items {
  margin: 0;
  padding: 0;
  list-style: none;
}
.ant-list * {
  outline: none;
}
.ant-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
}




































/deep/ .el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0 0 5px;
}

.gengd_li {
  width: 100px;
  height: 100px;
}

/deep/ .el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
  height: 71px;
  line-height: 60px;
  border-bottom: 2px solid transparent;
  border-bottom-color: transparent;
  color: var(--el-menu-text-color);
}


.el-menu[data-v-09d1a3b8] {
  height: 71px;
  font-weight: bold;
  background-color: #085fc3;
}

.el-menu--horizontal > .el-menu-item {
  color: white;
}

/deep/ .el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
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
