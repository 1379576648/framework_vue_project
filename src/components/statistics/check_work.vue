<!--人才库-->
<template>

  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">

        <div class="j-tabs2" >
          <el-menu

              class="el-menu-demo"
              mode="horizontal"
          >
            <router-link to="/CheckWork1">
              <el-menu-item style="height: 80px;" index="1"
              >出勤分析</el-menu-item>
            </router-link>

            <router-link to="/CheckWork2">
              <el-menu-item style="height: 80px" index="2"
              >工时分析</el-menu-item
              >
            </router-link>
            <router-link to="/CheckWork3">
              <el-menu-item style="height: 80px" index="3"
              >加班分析</el-menu-item
              >
            </router-link>
            <router-link to="/CheckWork4">
              <el-menu-item style="height: 80px" index="4"
              >请假分析</el-menu-item
              >
            </router-link>
          </el-menu>
        </div>
        <router-view name="CheckWork1"></router-view>
        <router-view name="CheckWork2"></router-view>
        <router-view name="CheckWork3"></router-view>
        <router-view name="CheckWork4"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref
} from 'vue'

</script>

<style  type="text/css" scoped>
@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");

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
