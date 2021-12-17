<!--考勤分页-->
<template>
<!--  考勤记录页面上导航栏-->
  <div class="head">
    <el-tabs v-model="activeName"  type="card" @tab-click="handleClick">
      
      <el-tab-pane  name="first">
        <template #label>
          <router-link :to="{path: this.one,query:{path:this.$route.query.path}}"><span style="color: #5aaaff">考勤记录</span></router-link>
        </template>
        <router-view ></router-view>
      </el-tab-pane>

      <el-tab-pane name="second">
        <template #label>
          <router-link :to="{path: this.two,query:{path:this.$route.query.path}}"><span style="color: #5aaaff">考勤月报表</span></router-link>
        </template>
        <router-view></router-view>
      </el-tab-pane>

      <el-tab-pane name="thirdly">
        <template #label>
          <router-link :to="{path: this.three,query:{path:this.$route.query.path}}"><span style="color: #5aaaff">历史归档</span></router-link>
        </template>
        <router-view ></router-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script lang="ts">
export default {
  data() {
    return {
      activeName: 'first',
      // 考勤记录/考勤月报表/历史归档路由
      one:'/attendance/statistics/record',
      two:'/attendance/statistics/report',
      three:'/attendance/statistics/archive',
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
a{
  text-decoration: none;
}
</style>