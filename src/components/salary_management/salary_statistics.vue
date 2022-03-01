<!--薪酬统计 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">

      <div class="j-card-body">
        <div class="j-card-head">
          <div class="j-card-head-title" style="margin-left:20px;">
            <span>薪酬统计</span>
          </div>
        </div>
        <br/>


<!--        <div class="container">-->
<!--          <div class="block" style="margin-left: 1095px;">-->
<!--            <span class="demonstration"></span>-->
<!--            <el-date-picker v-model="months" type="year" placeholder="请选择年份" style="width: 160px;">-->
<!--            </el-date-picker>-->
<!--          </div>-->
<!--          </div>-->


          <br/>
        <div class="demo-collapse" v-for="(obj,index) in tableDataTwo" v-show="one">
          <el-collapse :name="index"  v-model="activeNames" @change="selectstatc(obj.payMonth)" >
            <el-collapse-item :name="index">
              <template #title>
                <span style="margin-left: 0px;font-weight: bolder">{{ obj.payMonth }}月份</span>
                <span style="margin-left: 90px">计薪人数：{{ obj.countPerson }}</span>
                <span style="margin-left: 80px">应发工资：{{ obj.countyMoney }}</span>
                <span style="margin-left: 100px">实发工资：{{ obj.countsMoney }}</span>
                <span style="margin-left: 120px">公司缴纳：{{ obj.countcPay }}</span>
                <span style="margin-left: 150px">员工成本：{{ obj.staffPay }}</span>
              </template>
              <div style="background-color:  #e8edf2;text-align: center">
                <el-table
                    :data="tableData"
                    style="width: 1275px; margin: auto"
                    size="mini"
                    height="250">
                  <el-table-column prop="staffName" label="姓名" width="120" />
                  <el-table-column prop="deptName" label="部门" width="120" />
                  <el-table-column prop="moneyPigeonholePost" label="职位" width="120" />
                  <el-table-column prop="workdayOvertimePay" label="工作日加班工资" width="120" />
                  <el-table-column prop="dayOffOvertimePay" label="休息日加班工资" width="120" />
                  <el-table-column prop="holidayOvertimePay" label="节假日加班工资" width="120" />
                  <el-table-column prop="totalWage" label="工资合计" width="120" />
                  <el-table-column prop="moneyPigeonholeLeaveArly" label="早退" width="120" />
                  <el-table-column prop="moneyPigeonholeLate" label="迟到" width="120" />
                  <el-table-column prop="absenteism" label="旷工" width="120" />
                  <el-table-column prop="travelwage" label="出差工资" width="120" />
                  <el-table-column prop="moneyPigeonholeSalary" label="应发工资" width="120" />
                  <el-table-column prop="personageSocial" label="个人缴社保" width="120" />
                  <el-table-column prop="personageAccumulAtion" label="个人缴公积金" width="120" />
                  <el-table-column prop="moneyPigeonholePayrollSalary" label="实发工资" width="120" />
                  <el-table-column prop="companySocial" label="公司缴社保" width="120" />
                  <el-table-column prop="companyAccumulAtion" label="公司缴公积金" width="120" />
<!--                  <el-table-column fixed="right" label="Operations" width="120">-->
<!--                    <template #default>-->
<!--                      <el-button type="text" size="small" @click="handleClick"-->
<!--                      >Detail</el-button-->
<!--                      >-->
<!--                      <el-button type="text" size="small">Edit</el-button>-->
<!--                    </template>-->
<!--                  </el-table-column>-->
                </el-table>

              </div>

            </el-collapse-item>

            <br>
<!--            <el-collapse-item name="2">-->
<!--              <template #title>-->
<!--                <span style="margin-left: 20px;font-weight: bolder">2021-11月份</span>-->
<!--                <span style="margin-left: 140px">计薪人数：37</span>-->
<!--                <span style="margin-left: 120px">应发工资：22</span>-->
<!--                <span style="margin-left: 130px">实发工资：22</span>-->
<!--                <span style="margin-left: 140px">公司缴纳：22</span>-->
<!--                <span style="margin-left: 150px">员工成本：22</span>-->
<!--              </template>-->
<!--              <div style="background-color:  #e8edf2">-->

<!--                <el-table-->
<!--                    :data="tableData"-->
<!--                    style="width: 1275px; margin: auto"-->
<!--                    size="mini"-->
<!--                    height="250">-->
<!--                  <el-table-column fixed prop="dept" label="部门" width="120" />-->
<!--                  <el-table-column prop="number" label="人数" width="120" />-->
<!--                  <el-table-column prop="state" label="固定工资" width="120" />-->
<!--                  <el-table-column prop="city" label="加班工资" width="120" />-->
<!--                  <el-table-column prop="address" label="工资合计" width="120" />-->
<!--                  <el-table-column prop="zip" label="考勤扣款" width="120" />-->
<!--                  <el-table-column prop="state" label="应发工资" width="120" />-->
<!--                  <el-table-column prop="city" label="个人缴社保" width="120" />-->
<!--                  <el-table-column prop="address" label="个人缴公积金" width="120" />-->
<!--                  <el-table-column prop="zip" label="实发工资" width="120" />-->
<!--                  <el-table-column prop="state" label="公司缴社保" width="120" />-->
<!--                  <el-table-column prop="city" label="公司缴公积金" width="120" />-->
<!--                  <el-table-column prop="address" label="公司缴纳" width="120" />-->
<!--                </el-table>-->
<!--              </div>-->

<!--            </el-collapse-item>-->

          </el-collapse>
          <br/>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {ElMessage, ElNotification} from "element-plus";
export default {
  data() {
    return {
      //请求的路径
      url: "http://localhost:80/",
      tableDataTwo: {},
      tableData: [],
      one:false,
      months: '',
    }
  },
  methods: {
    handleClick() {
      console.log('click')
    },
    //判断是否有数据
    statc(){
      if(this.tableDataTwo.length>0){
        this.one=true
      }
    },
    //根据id查询教育经历
    selectstatcis() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectstatcis',
        data:{
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code === 200) {
          if (response.data.data) {
            console.log("月份")
            console.log(response)
            //如果服务是正常的
            if (response.data.data.state === 200) {
              _this.tableDataTwo = response.data.data.info,
                  this.statc();
              this.$store.commit("updateToken", response.data.data.token);
            } else {
              ElNotification.error({
                title: '提示',
                message: response.data.data.info,
                offset: 100,
              })
            }
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
    selectstatc(payMonth) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectstatc',
        data: {
          "payMonth":payMonth
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              _this.tableData = response.data.data.info

              this.$store.commit("updateToken", response.data.data.token);
            } else {
              ElNotification.error({
                title: '提示',
                message: response.data.data.info,
                offset: 100,
              })
            }
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
    //统计
    this.selectstatcis();
  }
}
</script>


<style scoped>
@import url("../../css/navigation.css");
@import url(../../css/dimission.css);
/deep/.demo-collapse{
  margin-left: 10PX;
}

/deep/.el-collapse-item__header {
  display: flex;
  align-items: center;
  height: var(--el-collapse-header-height);
  line-height: var(--el-collapse-header-height);
  cursor: pointer;
  border-bottom: 1px solid var(--el-collapse-border-color);
  font-size: var(--el-collapse-header-font-size);
  font-weight: 500;
  transition: border-bottom-color var(--el-transition-duration);
  outline: 0;
  background-color: #e8edf2;
}
</style>