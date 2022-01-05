<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">

      <div class="j-card-body">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane  name="book" label="固定工资">
            <salary_regularearn />
          </el-tab-pane>

          <el-tab-pane  name="second" label="调薪查询">
            <salary_raisequery />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
//固定工资
import salary_regularearn from '../salary_management/salary_regularearn.vue';
//调薪查询
import salary_raisequery from '../salary_management/salary_raisequery.vue';
export default {
  //注册组件
  components:{
    //固定工资
    salary_regularearn,
    //调薪查询
    salary_raisequery,
  },
  data(){
    return{
      activeName:'book'
    }
  }
}
</script>

<style scoped>
@import url(../../css/navigation.css);
</style>

