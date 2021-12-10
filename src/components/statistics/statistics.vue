<!-- 招聘导航栏 -->
<template>
  <section class="ant-layout ant-layout-has-sider"
           style="min-width: 988px; min-height: 100vh; background-color: rgb(232, 239, 246, 0); box-shadow: rgb(121, 159, 197) 0px 7px;"
           id="scrollLayout">
    <div class="sider-view-left">

      <aside class="hq-siderbar strut-sidebar-show  ant-layout-sider ant-layout-sider-inline"
             style="flex: 0 0 160px; max-width: 160px; min-width: 160px; width: 160px; background-color: #f2f6f8;">
        <div class="ant-layout-sider-children">
          <div class="hq-logo-wrapper"></div>
          <div class="custom-menu" style="width: 160px;">

            <el-menu default-active="2"  background-color="#f2f6f8" unique-opened="">
              <el-sub-menu index="1">
                <template #title>
                  <i class="iconfont">&#xe62c;</i>&nbsp;&nbsp;
                  <span
                      style="font-weight: normal;font-size: 15px;margin-left: -5px;margin-top: -1px;">人员分析</span>
                </template>
                <router-link to="/StatisticePersonnel">
                  <el-menu-item index="1-1">人员数量分析</el-menu-item>
                </router-link>
                <router-link to="/StatisticePersonnel1">
                  <el-menu-item index="1-1">人员异动分析</el-menu-item>
                </router-link>
                <router-link to="StatisticePersonnel2">
                  <el-menu-item index="1-1">员工概况</el-menu-item>
                </router-link>
              </el-sub-menu>

              <el-sub-menu index="2">
                <template #title>
                  <i class="iconfont">&#xe677;</i>&nbsp;&nbsp;
                  <span
                      style="font-weight: normal;font-size: 15px;margin-left: -5px;margin-top: -1px;">考勤分析</span>
                </template>

                <router-link to="/CheckWork">
                  <el-menu-item index="2-1">出勤分析</el-menu-item>
                </router-link>
                <router-link to="/CheckWork2">
                  <el-menu-item index="2-1">工时分析</el-menu-item>
                </router-link>
                <router-link to="/CheckWork3">
                  <el-menu-item index="2-1">加班分析</el-menu-item>
                </router-link>
                <router-link to="/CheckWork4">
                  <el-menu-item index="2-1">请假分析</el-menu-item>
                </router-link>

              </el-sub-menu>

              <el-sub-menu index="3">
                <template #title>
                  <i class="iconfont">&#xe677;</i>&nbsp;&nbsp;
                  <span
                      style="font-weight: normal;font-size: 15px;margin-left: -5px;margin-top: -1px;">薪酬分析</span>
                </template>
                <router-link to="/SalaryAnalysis">
                <el-menu-item index="3-1">工资成本分析</el-menu-item>
                  </router-link>
                <router-link to="/SalaryAnalysis2">
                <el-menu-item index="3-2">社保成本分析</el-menu-item>
                </router-link>
                  <router-link to="/SalaryAnalysis3">
                <el-menu-item index="3-3">薪酬结构分析</el-menu-item>
                  </router-link>
                    <router-link to="/SalaryAnalysis4">
                <el-menu-item index="3-4">部门成本分析</el-menu-item>
                    </router-link>
              </el-sub-menu>

            </el-menu>
          </div>
        </div>
      </aside>

    </div>
    <main class="ant-layout-content">
      <router-view name="StatisticePersonnel"></router-view>
      <router-view name="CheckWork"></router-view>
      <router-view name="SalaryAnalysis"></router-view>
    </main>
  </section>


</template>

<script lang="ts">

</script>

<style type="text/css" scoped>
@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");

</style>
