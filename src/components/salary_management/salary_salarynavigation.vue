<!--薪酬步骤导航 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <span></span>
        <div class="payroll2-tabs">
          <ul style="margin-left: 85px">

              <li @click="paysheet=false,scheme=false,flat=true">
              <i class="iconfont i-iconfont">&#xe602;</i>
              <h3>
                <span>第一步</span>
              </h3>
              <p><span>设置薪酬结构</span></p>
            </li>


            <li style="border: none"><i class="iconfont" style="margin-top: 52px">&#xe658;</i></li>
            <li class="" @click="paysheet=false,scheme=true,flat=false">
              <i class="iconfont">&#xe633;</i>
              <h3>
                <span>第二步</span>
              </h3>
              <p><span>设置核算方案</span></p>
            </li>

            <li style="border: none"><i class="iconfont" style="margin-top: 52px">&#xe658;</i></li>
            <li class="" @click="paysheet=true,scheme=false,flat=false">
              <i class="iconfont">&#xe624;</i>
              <h3>
                <span>第三步</span>
              </h3>
              <p><span>核算工资并<br/>生成工资表</span></p>
            </li>
          </ul>
        </div>
<!--        薪酬结构-->
        <salary_construction v-if="flat"/>
<!--        核算方案-->
        <salary_accountscheme v-if="scheme"/>
<!--        工资表-->
        <salary_archive v-if="paysheet"/>

      </div>
    </div>
  </div>
  &nbsp;
</template>

<script>
//薪酬结构
import salary_construction from '../salary_management/salary_construction.vue';
//核算方案
import salary_accountscheme from '../salary_management/salary_accountscheme.vue';
//工资表
import salary_archive from '../salary_management/salary_archive.vue';
export default {
  //注册组件
  components:{
    //薪酬结构
    salary_construction,
    //核算方案
    salary_accountscheme,
    //工资表
    salary_archive,
  },
  data(){
    return{
      //薪酬结构
      flat:true,
      //核算方案
      scheme:false,
      //工资表
      paysheet:false,
    }
  }
}
</script>




<style scoped>
@import url("../../css/navigation.css");
@import url("../../css/Salary.css");
</style>