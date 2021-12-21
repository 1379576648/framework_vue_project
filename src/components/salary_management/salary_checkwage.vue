<!--查看工资表导航 -->
<template>

  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <span></span>
        <div>
  <el-tabs v-model="wagetable" @tab-click="handleClick">

    <el-tab-pane name="wages">

      <template #label>
        <div style="width: 100px; text-align: center;">  <router-link :to="{path:this.selectwagetable,query:{path: this.$route.query.path}}">工资表</router-link></div>
      </template>

      <router-view></router-view>


    </el-tab-pane>
  </el-tabs>
        </div>
      </div>
    </div>
  </div>
  &nbsp;
</template>
<script lang="ts">
export default {
  data() {
    return {
      //查看工资表
      selectwagetable:'/salary/selectwagetable',
      wagetable: 'wages',
    }
  },
}
</script>
<style scoped>
@import url("../../css/navigation.css");
/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
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

</style>