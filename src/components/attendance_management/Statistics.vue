<template>
  <div class="head">
    <el-tabs v-model="activeName"  type="card" @tab-click="handleClick">
      
      <el-tab-pane  name="first">
        <template #label>
          <router-link to="/attendance/statistics/record">考勤记录</router-link>
        </template>
        <router-view ></router-view>
      </el-tab-pane>

      <el-tab-pane name="second">
        <template #label>
          <router-link to="/attendance/statistics/report">考勤月报表</router-link>
        </template>
        <router-view></router-view>
      </el-tab-pane>

      <el-tab-pane name="thirdly">
        <template #label>
          <router-link to="/attendance/statistics/archive">历史归档</router-link>
        </template>
        <router-view ></router-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script lang="ts">
import abb from "../attendance_management/Record.vue"

export default {
  data() {
    return {
      activeName: 'first',
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style scoped>
.head {
  margin-left: -20px;
  margin-top: 0px;
}
</style>