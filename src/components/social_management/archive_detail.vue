<template>
  <!--社保缴费明细-->
  <div class="saas-main-content" v-if="someone_archive_particulars==false" style="margin-bottom: 20px">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <!-- 计薪月份 -->
        <div class="month-div">
          <div style="float: left">
            <span class="month_span">{{ this.$parent.$data.month.slice(0, 7) }}</span><br/><br/>
            计薪月份<br/><br/>
            <el-button type="primary" size="small" @click="next" :disabled="tableData==''">重新核算</el-button>
          </div>
          <div style="margin-left: 400px;">
            <el-table :data="tableDataS" border style="width: 721px">
              <el-table-column prop="number" align="center" label="参保人数" width="180"/>
              <el-table-column prop="personageMoney" align="center" label="个人缴费" width="180"/>
              <el-table-column prop="firmMoney" align="center" label="企业缴费" width="180"/>
              <el-table-column prop="totalMoney" align="center" label="合计缴费" width="180"/>
            </el-table>
          </div>
        </div>
        <!-- 社保总表 -->
        <!-- 表格按钮部分 -->
        <div class="mt-20 ml-20 mr-20">
          <!-- 按钮 -->
          <el-button size="small" :disabled="listData==''" @click="export2Excel"
          ><i class="iconfont">&#xe6a2;</i>批量导出
          </el-button
          >
          <!--          <el-button size="small"-->
          <!--            ><i class="iconfont">&#xe639;</i>批量导入</el-button-->
          <!--          >-->
          <!-- 输入框 -->
          <div class="resume-operation">
            <el-input v-model="empName_search" @blur="next" placeholder="员工姓名">
              <template #suffix>
                <el-icon class="el-input__icon">
                  <i-search/>
                </el-icon>
              </template>
            </el-input>
          </div>

          <!-- 部门 树形选择框 -->
          <div class="resume-operation">
            <el-select clearable v-model="dept_name" @change="next" placeholder="选择部门">
              <el-option
                  v-for="item in deptS"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptName"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table size="small" :data="tableData" stripe style="width: 100%" @selection-change="selectCheck">
            <!-- 多选框 -->
            <el-table-column type="selection" align="center" width="55"/>
            <el-table-column :index="indexMethod" align="center" label="序号" type="index" width="100"/>
            <el-table-column prop="insArchiveStaffName" align="center" label="姓名" width="100"/>
            <el-table-column prop="insArchiveInsuredName" align="center" label="参保方案" min-width="150"/>
            <el-table-column prop="insArchiveInsuredMonth" align="center" label="社保缴纳月份" width="100"/>
            <el-table-column prop="insArchiveSocialPersonPay" align="center" label="社保个人缴费" width="100"/>
            <el-table-column prop="insArchiveSocialFirmPay" align="center" label="社保企业缴费" width="100"/>
            <el-table-column prop="insArchiveInsuredMonth" align="center" label="积金缴纳月份" width="110"/>
            <el-table-column prop="insArchiveFundPersonPay" align="center" label="积金个人缴费" width="110"/>
            <el-table-column prop="insArchiveFundFirmPay" align="center" label="积金企业缴费" width="110"/>
            <el-table-column align="center" label="操作">
              <template #default="scope">
                <el-button type="text" size="small" @click="
                someone_archive_particulars=true,
                insArchive= scope.row
                ">查看
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="demo-pagination-block">
          <el-pagination v-model:current-page="pageInfo.currenPage"
                         v-model:page-size="pageInfo.pageSize"
                         :default-page-size="pageInfo.pageSize"
                         :page-sizes="[5, 10,15,20]"
                         :pager-count="5"
                         :total="pageInfo.total"
                         background
                         layout="	total ,sizes, prev, pager, next, jumper"
                         next-text="下一页"
                         prev-text="上一页"
                         @size-change="next()"
                         @current-change="next()"
                         @prev-click="next()"
                         @next-click="next()">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
  <!-- 查看个人参保详情-->
  <someone_archive_particulars v-if="someone_archive_particulars"/>
</template>

<script>
import {ref, defineComponent} from "vue";
//查看个人参保详情
import someone_archive_particulars from '../social_management/someone_archive_particulars.vue';
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import {export_json_to_excel} from "../../excal/Export2Excel";

export default {
  //注册组件
  components: {
    //查看个人参保详情
    someone_archive_particulars
  },
  data() {
    return {
      //访问地址
      url: 'http://localhost:80/archive/',
      url_2: 'http://localhost:80/detail/',
      //显示隐藏查看个人参保详情
      someone_archive_particulars: false,
      // 部门名称
      dept_name: '',
      // 选择部门 下拉选择器
      deptS: [],
      //计薪月份
      salaryMonth: '',
      // 员工姓名搜索框
      empName_search: "",
      //员工状态下拉选择器的值
      empState: "",
      // 分页
      pageInfo: {
        /* 当前的页 */
        currenPage: 1,
        //页大小
        pageSize: 5,
        //总条数
        total: 0,
      },
      //表格数据
      tableData: [],
      //选择的表格数据
      listData: [],
      //员工编号列表
      staffIdList: [],
      //统计数据
      tableDataS: [
        {
          //参保人数
          number: 0,
          //个人缴费
          personageMoney: 0,
          //企业缴费
          firmMoney: 0,
          //总计
          totalMoney: 0,
        }
      ],
      //查看的数据
      insArchive: {},
    };
  }, methods: {
    // 导出方法
    export2Excel() {
      var that = this;
      let tHeader = ["姓名", "参保方案", "社保缴纳月份", "社保个人缴费", "社保企业缴费", "积金缴纳月份", "积金个人缴费", "积金企业缴费", "缴纳时间"]; // 导出的表头名
      let filterVal = ["insDetailStaffName", "insDetailInsuredName", "insDetailInsuredMonth", "insDetailSocialPersonPay", "insDetailSocialFirmPay", "insDetailInsuredMonth", "insDetailFundPersonPay", "insDetailFundFirmPay", "createdTime"];
      ElMessageBox.prompt('请输入文件名', '提示', {
        confirmButtonText: '生成',
        cancelButtonText: '取消',
      })
          .then(({value}) => {
            let data = that.formatJson(filterVal, that.listData);
            export_json_to_excel(tHeader, data, value);
            ElMessage({
              type: 'success',
              message: `生成成功`,
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '取消成功',
            })
          })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    /*序号*/
    indexMethod(index) {
      let curpage = this.pageInfo.currenPage; //单前页码，具体看组件取值
      let limitpage = this.pageInfo.pageSize; //每页条数，具体是组件取值
      return index + 1 + (curpage - 1) * limitpage;
    }
    ,
    //选择的数据
    selectCheck(val) {
      this.listData = val;
    }
    ,
    //查询所有的部门
    deptList() {
      this.axios({
        method: 'get',
        url: this.url_2 + 'deptList',
        responseEncoding: 'utf-8',
      }).then((response) => {
            if (response.data.code == 200) {
              if (response.data.data) {
                //如果服务是正常的
                if (response.data.data.state == 200) {
                  this.deptS = response.data.data.info;
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
          }
      )
    },
    //查询当月所有已参保的员工
    next() {
      this.axios({
        method: 'post',
        url: this.url + 'selectListInsuredArchive',
        data: {
          //当前页
          currenPage: this.pageInfo.currenPage,
          //页大小
          pageSize: this.pageInfo.pageSize,
          //计薪月份
          insArchiveSalaryMonth: this.$parent.$data.month.slice(0, 7),
          //部门名称
          listDept: this.dept_name == '' ? [] : [this.dept_name],
          //员工名称
          insArchiveStaffName: this.empName_search,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
            if (response.data.code == 200) {
              if (response.data.data) {
                //如果服务是正常的
                if (response.data.data.state == 200) {
                  this.tableData = response.data.data.info.records;
                  this.pageInfo.total = response.data.data.info.total;
                  //个人缴费
                  let personageMoney = 0;
                  //企业缴费
                  let firmMoney = 0;
                  //总计
                  let totalMoney = 0;
                  for (let i = 0; i < response.data.data.info.records.length; i++) {
                    personageMoney = personageMoney + response.data.data.info.records[i].insArchiveSocialPersonPay + response.data.data.info.records[i].insArchiveFundPersonPay;
                    firmMoney = firmMoney + response.data.data.info.records[i].insArchiveSocialFirmPay + response.data.data.info.records[i].insArchiveFundFirmPay;
                  }
                  totalMoney = personageMoney + firmMoney;
                  //参保人数
                  this.tableDataS[0].number = response.data.data.info.records.length;
                  //个人缴费
                  this.tableDataS[0].personageMoney = personageMoney.toFixed(2);

                  //企业缴费
                  this.tableDataS[0].firmMoney = firmMoney.toFixed(2);
                  //总计
                  this.tableDataS[0].totalMoney = totalMoney.toFixed(2);
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
          }
      )
    }
    ,
  }
  ,
  mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    this.deptList();
    this.next();
  }
};
</script>

<style scoped>
/* 月统计金额下的div下的span */
.month_sum div span {
  margin: 35px;
}

/* 月统计金额下的div */
.month_sum div {
  display: inline-block;
}

/* 月金额统计 */
.month_sum {

  display: inline-block;
  margin-left: 300px;
}

/* 计薪月份div */
.month-div {
  display: inline-block;
  margin: 40px;
  margin-left: 100px;
}

/* 计薪月份 */
.month_span {
  font-weight: bold;
  font-size: 30px;
}

/* 调整输入框的高度 */
::v-deep .el-input__inner {
  height: 32px;
}

/* 分页的样式 */
.demo-pagination-block {
  margin: 10px 0 10px 10px;
}

/**
	 * 下拉选择器样式
	 */
.resume-operation {
  padding-left: 8px;
  float: right;
  width: 120px;
}

/* 外层阴影 */
.saas-main-content {
  padding-top: 12px;
  min-height: 500px;
}

.j-card-bordered {
  border: 1px solid #e9e9e9;
}

.j-card {
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  margin-top: 8px;
  min-height: 100%;
}

.j-card:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: transparent;
}

.j-card-bordered {
  border: 1px solid #e9e9e9;
  border-top-color: rgb(233, 233, 233);
  border-right-color: rgb(233, 233, 233);
  border-bottom-color: rgb(233, 233, 233);
  border-left-color: rgb(233, 233, 233);
}

.j-card {
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  margin-top: 8px;
  min-height: 100%;
}

.j-card-body {
  padding: 0 2%;
}

@font-face {
  font-family: 'iconfont';  /* Project id 2990377 */
  src: url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.woff2?t=1639139822080') format('woff2'),
  url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.woff?t=1639139822080') format('woff'),
  url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.ttf?t=1639139822080') format('truetype');
}

</style>

