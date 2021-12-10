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
            <el-menu unique-opened="true" default-active="3" background-color="#f2f6f8">
              <!-- 权限管理 -->
              <el-sub-menu index="1">
                <template #title>
                  <i class="iconfont">&#xe62c;</i>&nbsp;&nbsp;
                  <span
                      style="
                         font-weight: normal;
                         font-size: 15px;
                         margin-left: -5px;
                         margin-top: -1px;">
                      权限管理
                    </span>
                </template>

                <el-menu-item index="1-1">
                  <router-link to="/permission_set">
                    权限设置
                  </router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link to="/notice">
                    角色设置
                  </router-link>
                </el-menu-item>
              </el-sub-menu>
              <!-- 公告设置 -->
              <el-sub-menu index="1">
                <template #title>
                  <i class="iconfont">&#xe62c;</i>&nbsp;&nbsp;
                  <span
                      style="
                         font-weight: normal;
                         font-size: 15px;
                         margin-left: -5px;
                         margin-top: -1px;">
                      公告管理
                    </span>
                </template>

                <el-menu-item index="1-1">
                  <router-link to="/notice">
                    公告设置
                  </router-link>
                </el-menu-item>
              </el-sub-menu>
              <!-- 日志管理 -->
              <el-sub-menu index="2">
                <template #title>
                  <i class="iconfont">&#xe62c;</i>&nbsp;&nbsp;
                  <span
                      style="
				         font-weight: normal;
				         font-size: 15px;
				         margin-left: -5px;
				         margin-top: -1px;">
				      日志管理
				    </span>
                </template>

                <el-menu-item index="2-1">
                  <router-link to="/login_log">
                    登录日志
                  </router-link>
                </el-menu-item>
                <el-menu-item index="2-2">
                  <router-link to="/operate_log">
                    操作日志
                  </router-link>
                </el-menu-item>
              </el-sub-menu>
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

<script lang="ts"></script>

<style type="text/css" scoped>
@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");
</style>
