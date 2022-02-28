<!--查看工资表 -->
<template>
  <div style="width:100%;">
  <div style="width:100%;height:10px;">
    <!--搜索输入框-->
    <el-row style="width:200px;float:right;">
      <el-input v-model="seek" placeholder="搜索">
        <template #suffix>
          <el-icon class="el-input__icon"><i-search/></el-icon>
        </template>
      </el-input>
    </el-row>
  </div>
    <div style="width:100%;margin-top: 50px;" class="icon-p">
<!--      <div style="width:80%;height:100px;margin: auto;background: #42b983">-->
      <el-row>
        <el-col :span="4">
          <el-card shadow="always" style="background-color: rgb(35, 102, 167);font-size:14px;color: white">
           <p>29</p>
            <p>全部</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" style="background-color: rgb(73, 167, 130);font-size:14px;color: white">
            <p>29</p>
            <p>正式员工</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="never" style="background-color: rgb(57, 146, 193);font-size:14px;color: white">
            <p>22</p>
            <p>试用员工</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always" style="background-color: rgb(233, 143, 39);font-size:14px;color: white">
            <p>22</p>
            <p>本月新入职</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always" style="background-color: rgb(35, 102, 167);font-size:14px;color: white">
            <p>22</p>
            <p>本月调薪</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always" style="background-color: rgb(73, 167, 130);font-size:14px;color: white">
            <p>22</p>
            <p>本月离职</p>
          </el-card>
        </el-col>
      </el-row>
      </div>


    <div style="text-align: center;">
      <el-table :data="tableData" style="width: 100%;font-size: 12px;color:black;font-weight: normal;">
          <el-table-column  label="基本信息">
            <el-table-column     prop="staffName" label="姓名" width="100" />
            <el-table-column   prop="deptName" label="部门" width="100" />
            <el-table-column   prop="moneyPigeonholePost" label="职位" width="100" />
<!--            <el-table-column   prop="name" label="本月变动" width="100" />-->
        </el-table-column>
<!--        <el-table-column label="考勤数据" >
          <el-table-column prop="name" label="应出勤天数" width="100" />
          <el-table-column prop="name" label="实际出勤天数" width="100" />
          <el-table-column prop="name" label="月计薪天数" width="100" />
        </el-table-column>-->

          <el-table-column prop="moneyPigeonholeBasePay" label="基本工资" width="110" />
<!--          <el-table-column prop="name" label="实发固定工资" width="100" />-->
        <el-table-column label="加班工资" >
          <el-table-column prop="workdayOvertimePay" label="工作日加班工资" width="110" />
          <el-table-column prop="dayOffOvertimePay" label="休息日加班工资" width="110" />
          <el-table-column prop="holidayOvertimePay" label="节假日加班工资" width="110" />
        </el-table-column>
        <el-table-column prop="travelwage" label="出差工资" width="100" />
        <el-table-column prop="totalWage" label="工资合计" width="100" />
        <el-table-column label="考勤扣款" >
          <el-table-column prop="moneyPigeonholeLate" label="迟到" width="100" />
<!--          <el-table-column prop="lateMoneycs" label="迟到次数" width="100" />-->
          <el-table-column prop="moneyPigeonholeLeaveArly" label="早退" width="100" />
<!--          <el-table-column prop="elaryMoneycs" label="早退次数" width="100" />-->
<!--          <el-table-column prop="name" label="未签到" width="100" />-->
<!--          <el-table-column prop="name" label="未签退" width="100" />-->
          <el-table-column prop="absenteism" label="旷工" width="100" />
<!--          <el-table-column prop="leaveMoneycs" label="旷工次数" width="100" />-->
<!--          <el-table-column prop="-" label="事假" width="100" />-->
          <el-table-column label="事假" width="100">
            <template #default="scope">
              <span>-</span>
            </template>
          </el-table-column>
<!--          <el-table-column prop="-" label="病假" width="100" />-->
          <el-table-column label="病假" width="100">
            <template #default="scope">
              <span>-</span>
            </template>
          </el-table-column>
<!--          <el-table-column prop="name" label="不在职免发" width="100" />-->
        </el-table-column>
        <el-table-column label="社保" >
          <el-table-column prop="personageSocial" label="个人缴纳社保" width="100" />
          <el-table-column prop="companySocial" label="公司缴纳社保" width="100" />
        </el-table-column>
        <el-table-column label="公积金" >
          <el-table-column prop="personageAccumulAtion" label="个人缴纳公积金" width="100" />
          <el-table-column prop="icompanyAccumulAtion" label="公司缴纳公积金" width="100" />
        </el-table-column>
        <el-table-column prop="moneyPigeonholeSalary" label="应发工资" width="100" fixed="right"/>
        <el-table-column prop="moneyPigeonholePayrollSalary" label="实发工资" width="100" fixed="right"/>
      </el-table>
    </div>

    <!-- 分页插件 -->
    <div class="demo-pagination-block" style="margin-left: 25px;margin-top: 20px;margin-bottom: 10px">
      <el-pagination
          v-model:currentPage="pageInfo.currentPage"
          :page-sizes="[4, 5, 10, 50]"
          v-model:page-size="pageInfo.pagesize"
          :default-page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          :pager-count="5"
          prev-text="上一页"
          next-text="下一页"
          @size-change="selectWage()"
          @current-change="selectWage()"
          background
      >
      </el-pagination>
    </div>



  </div>
<!--  </div>-->
  {{tableData}}
  {{tableDataTwo}}
</template>


<script>
import {ElNotification} from "element-plus";
export default {
  data() {
    return {
      //请求的路径
      url: "http://localhost:80/",
      tableData: [],
      tableDataTwo: [],
      seek:"",
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 5, // 页大小
        total: 0, // 总页数
      },

    }
  },
  methods:{
    //分页查询未归档工资表
    selectMoney() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectMoney',
        data: {
          //当前页
          'currentPage': this.pageInfo.currentPage,
          //页大小
          "pageSize": this.pageInfo.pagesize,
          //部门名称
          //"deptName":this.$parent.$data.two,
          //方案名称
          //"workSchemeName":this.seek,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              _this.tableData = response.data.data.info.records
              _this.pageInfo.total = response.data.data.info.total
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
    //分页查询已归档工资表
    selectMoneys(moth) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectMoneys',
        data: {
          //当前页
          'currentPage': this.pageInfo.currentPage,
          //页大小
          "pageSize": this.pageInfo.pagesize,
          //薪资月份
          "payMonth":moth,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              _this.tableData = response.data.data.info.records
              _this.pageInfo.total = response.data.data.info.total
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
  },
  mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    //如果未归档
    if (this.$parent.$parent.$parent.$parent.$data.state==0){
      //分页查询工资表
      this.selectMoney();
    }else{
      this.selectMoneys(this.$parent.$parent.$parent.$parent.$data.payMonth);
    }


  }
}
</script>
<style scoped>
/deep/.el-card__body {
  /* padding: var(--el-card-padding); */
  padding: 10px 0;
}


/deep/.icon-p p{
  text-align: center;
}
/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
  font-size: 12px;
}
</style>
