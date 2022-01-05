<!--考勤分页-->
<template>
  <!--  考勤记录页面上导航栏-->
  <div class="head">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">

      <el-tab-pane name="first" label="考勤记录">
        <clockingin_record/>
      </el-tab-pane>

      <el-tab-pane name="second" label="考勤月报表">

        <clockingin_month/>
      </el-tab-pane>

      <el-tab-pane name="thirdly" label="历史归档">
        <clockingin_history/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script lang="ts">
//考勤记录
import clockingin_record from '../clockingin_management/clockingin_record.vue';
//考勤月报表
import clockingin_month from '../clockingin_management/clockingin_month.vue';
//历史归档
import clockingin_history from '../clockingin_management/clockingin_history.vue';

export default {
  //注册组件
  components: {
    //考勤记录
    clockingin_record,
    //考勤月报表
    clockingin_month,
    //历史归档
    clockingin_history,
  },
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

a {
  text-decoration: none;
}
</style>