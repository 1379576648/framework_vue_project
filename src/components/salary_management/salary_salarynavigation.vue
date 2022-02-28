<!--薪酬步骤导航 -->
<template>
  <div class="saas-main-content"
       v-if="salary_checkwage==false&&
       regular==false&&
       callbackpay==false&&
       attendanceplan==false&&
       evectionplan==false&&
       salary_insertplan==false&&
      salary_insertplanthree==false&&
      salary_insertplantwo==false">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <span></span>
        <div class="payroll2-tabs">
          <ul style="margin-left: 85px">
            <li @click="structure">
              <i class="iconfont i-iconfont">&#xe602;</i>
              <h3>
                <span>第一步</span>
              </h3>
              <p><span>设置薪酬结构</span></p>
            </li>


            <li style="border: none"><i class="iconfont" style="margin-top: 52px">&#xe658;</i></li>
            <li class="" @click="certified">
              <i class="iconfont">&#xe633;</i>
              <h3>
                <span>第二步</span>
              </h3>
              <p><span>设置核算方案</span></p>
            </li>

            <li style="border: none"><i class="iconfont" style="margin-top: 52px">&#xe658;</i></li>
            <li class="" @click="reveal">
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
        <salary_archive v-if="paysheet" ref="child"/>
      </div>
    </div>
  </div>
  <!--  查看工资表-->
  <salary_checkwage v-if="salary_checkwage"/>
  <!-- 固定工资 -->
  <regular v-if="regular"/>
  <!-- 加班工资 -->
  <callbackpay v-if="callbackpay"/>
  <!-- 考勤扣款 -->
  <attendanceplan v-if="attendanceplan"/>
  <!--  出差方案-->
  <evectionplan v-if="evectionplan"/>
  <!--  新增修改加班方案-->
  <salary_insertplan v-if="salary_insertplan" :name="insertplan_name"/>
  <!--  新增修改出差方案-->
  <salary_insertplanthree v-if="salary_insertplanthree" :name="insertplanthree_name"/>
<!--  考勤扣款新增或修改方案-->
  <salary_insertplantwo v-if="salary_insertplantwo" :name="insertplantwo_name"/>

</template>
&nbsp;
<script>
import {ElMessage, ElNotification} from "element-plus";
//薪酬结构
import salary_construction from '../salary_management/salary_construction.vue';
//核算方案
import salary_accountscheme from '../salary_management/salary_accountscheme.vue';
//工资表
import salary_archive from '../salary_management/salary_archive.vue';
//查看工资表
import salary_checkwage from '../salary_management/salary_checkwage.vue';
//固定工资
import regular from '../salary_management/salary_fixedwage.vue';
//社保
import social from '../social_management/insured_management.vue';
//加班工资
import callbackpay from '../salary_management/salary_workovertimeplan.vue';
//考勤扣款
import attendanceplan from '../salary_management/salary_attendance.vue';
//出差方案
import evectionplan from '../salary_management/salary_evection.vue';
//新增修改加班方案
import salary_insertplan from '../salary_management/salary_insertplan.vue';
//新增修改出差方案
import salary_insertplanthree from '../salary_management/salary_insertplanthree.vue';
//新增修改考勤扣款方案
import salary_insertplantwo from '../salary_management/salary_insertplantwo.vue';

export default {
  //注册组件
  components: {
    //薪酬结构
    salary_construction,
    //核算方案
    salary_accountscheme,
    //工资表
    salary_archive,
    //查看工资表
    salary_checkwage,
    //固定工资
    regular,
    //加班工资
    callbackpay,
    //考勤扣款
    attendanceplan,
    //出差方案
      evectionplan,
    //新增修改加班方案
    salary_insertplan,
    //新增修改出差方案
    salary_insertplanthree,
    //新增修改考勤扣款方案
    salary_insertplantwo,
    //社保
    social,
  },
  data() {
    return {
      //请求的路径
      url: "http://localhost:80/",
      //归档状态
      state:0,
      //薪资月份
      payMonth:'',
      //薪酬结构
      flat: true,
      //核算方案
      scheme: false,
      //工资表
      paysheet: false,
      //显示隐藏工资表
      salary_checkwage: false,
      //固定工资
      regular: false,
      //加班工资
      callbackpay: false,
      //考勤扣款
      attendanceplan: false,
      //出差方案
      evectionplan: false,
      //新增修改加班方案
      salary_insertplan: false,
      //新增修改出差方案
      salary_insertplanthree: false,
      //新增修改考勤扣款方案
      salary_insertplantwo:false,
      //新增或修改加班方案
      insertplan_name:'',
      //新增修改出差方案
      insertplanthree_name:'',
      //新增修改考勤扣款方案
      insertplantwo_name:''
    }
  }, methods: {
    //设置薪酬结构
    structure() {
      //工资表
      this.paysheet = false;
      //核算方案
      this.scheme = false;
      //薪酬结构
      this.flat = true;
    },
    //设置核实方案
    certified() {
      //工资表
      this.paysheet = false;
      //核算方案
      this.scheme = true;
      //薪酬结构
      this.flat = false;
    },
    //设置工资表
    salary() {
      //工资表
      this.paysheet = true;
      //核算方案
      this.scheme = false;
      //薪酬结构
      this.flat = false;
    },
    reveal() {
      let date = new Date();
      if(date.getDate()<29){
        this.selectWage();
        this.salary();
      }else {
        this.salary();
      }
    },
    //生成工资表
    selectWage() {
      this.axios({
        method: 'post',
        url: this.url + 'selectWage',
        data: {
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              if (response.data.data.info=="成功"){
                //如果是成功
                ElNotification({
                  title: '提示',
                  message: '生成工资表成功',
                  type: 'success',
                })
                this.$store.commit("updateToken", response.data.data.token);
              }else{
                //如果是成功
                ElNotification({
                  title: '提示',
                  message: response.data.data.info,
                  type: 'success',
                })
              }
            } else {
              ElMessage({
                type: 'warning',
                message: response.data.data.info,
              })
            }
          }else {
            ElNotification.error({
              title: '提示',
              message: response.data.data.info,
              offset: 100,
            })
          }
        } else {
          ElNotification.error({
            title: '提示',
            message: response.data.message,
            offset: 100,
          })
        }
      })
    },
  },mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
  }
}
</script>


<style scoped>
@import url("../../css/navigation.css");
@import url("../../css/Salary.css");
</style>