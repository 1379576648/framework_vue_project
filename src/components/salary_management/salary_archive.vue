<!--工资表 -->
<template>
  <div >
    <el-tabs type="card" @tab-click="handleClick">

      <el-tab-pane label="未归档">

        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table :data="tableData" stripe style="width: 100%">
<!--            <el-table-column prop="name" label="部门" width="160"/>-->
            <el-table-column prop="countPerson" label="计薪人数" width="190"/>
            <el-table-column prop="countyMoney" label="应发工资" width="190"/>
            <el-table-column prop="countsMoney" label="实发工资" width="190"/>
            <el-table-column prop="countcPay" label="公司缴纳" width="190"/>
            <el-table-column prop="staffPay" label="员工成本" width="190"/>
<!--            <el-table-column prop="date" label="状态" width="190"/>-->
            <el-table-column label="状态" width="190">
              <template #default="scope">
                <span v-if="scope.row.moneyPigeonholeState==0">未归档</span>
                <span v-else>已归档</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template #default="scope">
                <el-button type="text" size="small" @click="this.$parent.$data.salary_checkwage=true,this.$parent.$data.state=scope.row.moneyPigeonholeState">查看工资表&nbsp;</el-button>
                <!--                      <el-button type="text" size="small" @click="handleClick">归档</el-button>-->
                <el-popconfirm title="归档之后，数据一律不允许修改" @confirm="updateMoney()">
                  <template #reference>
                    <el-button type="text" size="small">归档</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </el-tab-pane>
      <el-tab-pane label="已归档">

        <!--月份选择框·-->
        <div class="mt-20 ml-20 mr-20">
          <el-date-picker
              v-model="months"
              type="monthrange"
              unlink-panels
              range-separator="-"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              style="margin-left: 985px;margin-top: 10px"
              :shortcuts="shortcuts"
              @change="countMoneys"
          ></el-date-picker>
        </div>
        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">

          <el-table :data="tableDataTwo" stripe style="width: 100%">
<!--            <el-table-column prop="name" label="部门" width="160"/>-->
            <el-table-column prop="countPerson" label="计薪人数" width="160"/>
            <el-table-column prop="payMonth" label="薪资月份" width="170"/>
            <el-table-column prop="countyMoney" label="应发工资" width="160"/>
            <el-table-column prop="countsMoney" label="实发工资" width="160"/>
            <el-table-column prop="countcPay" label="公司缴纳" width="160"/>
            <el-table-column prop="staffPay" label="员工成本" width="160"/>
            <el-table-column prop="moneyPigeonholeState" label="状态" width="160">
            <template #default="scope">
              <span v-if="scope.row.moneyPigeonholeState==0">未归档</span>
              <span v-else>已归档</span>
            </template>
            </el-table-column>
            <el-table-column label="操作" width="190">
              <template #default="scope">
                <el-button type="text" size="small"  @click="
                this.$parent.$data.salary_checkwage=true,
                this.$parent.$data.state=scope.row.moneyPigeonholeState,
                this.$parent.$data.payMonth=scope.row.payMonth
">查看工资表&nbsp;</el-button>
              </template>
            </el-table-column>
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
              @size-change="countMoneys()"
              @current-change="countMoneys()"
              background
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      &nbsp;
    </el-tabs>
  </div>
</template>
<script>
import {ElMessage, ElNotification} from "element-plus";
export default {
  data() {
    return {
      //请求的路径
      url: "http://localhost:80/",
      tableData: [],
      tableDataTwo:[],
      months: '',
      seek: '',
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 5, // 页大小
        total: 0, // 总页数
      },
      //日期选择
      shortcuts: [{
        text: '当前月',
        value: [new Date(), new Date()],
      },
        {
          text: '当前年',
          value: () => {
            const end = new Date()
            const start = new Date(new Date().getFullYear(), 0)
            return [start, end]
          },
        },
        {
          text: '前六个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 6)
            return [start, end]
          }
        }],
    }

  },
  methods:{
    //统计未归档工资表
    countMoney() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'countMoney',
        data: {
         // "staffName":this.tableData.staffName
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response)
        if (response.data.code === 200) {
            if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              this.tableData=[];
              if (response.data.data.info!=null){
                _this.tableData.push(response.data.data.info);
              }
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
    //统计已归档工资表
    countMoneys() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'countMoneys',
        data: {
          //当前页
          currentPage: this.pageInfo.currentPage,
          //页大小
          pageSize: this.pageInfo.pagesize,
          //起始时间
          startTime: this.months == null ? null : this.months[0],
          //结束时间
          endTime: this.months == null ? null : this.months[1]
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response)
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              this.pageInfo.total=response.data.data.info.total
                  _this.tableDataTwo=response.data.data.info.records,
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
    //修改状态为已归档
    updateMoney(moneyPigeonholeId) {
      var _this = this
      this.axios({
        method: 'put',
        url: this.url + 'updateMoney',
        data: {

        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              //如果是成功
              if (response.data.data.info == 666) {
                this.countMoney();
                this.countMoneys();
                this.$store.commit("updateToken", response.data.data.token);
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
  }
  ,mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    //分页查询
    this.countMoney();
    //
    this.countMoneys();
  }

}

</script>
<style scoped>
@import url("../../css/Salary.css");

.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}

/deep/ .cell {
  padding-left: 10px;
  text-align: center;
  color: black;
}

/deep/ .cell {
  padding-left: 10px;
  text-align: center;
  color: black;
  font-size: 12px;
}
</style>