<template>
  <!--社保缴费明细-->
  <div class="saas-main-content" v-if="someone_insured_particulars==false" style="margin-bottom: 20px">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <!-- 计薪月份 -->
        <div class="month-div">
          <div style="float: left">
            <span class="month_span">{{ salaryMonth }}</span><br/><br/>
            计薪月份<br/><br/>
            <el-button type="primary" size="small" @click="next" :disabled="tableData==''">重新核算</el-button>
            <el-button type="primary" size="small" style="width: 80px" @click="dialogVisible = true"
                       :disabled="tableData==''"
            >归档
            </el-button
            >
          </div>
          <el-dialog
              v-model="dialogVisible"
              title="归档确认"
              width="40%"
              :before-close="revocatory"
          >
            <div class="ant-modal-body">
              <p>
              <div data-show="true" class="ant-alert ant-alert-info ant-alert-no-icon">
              <span class="ant-alert-message">
                <span style="line-height: 1.88;"><span>说明</span>：<br>
                  1. <span>此操作将明细数据转移到月度报表，不可再变更参保数据；</span><br>
                  2. <span>已归档的参保数据，将提供给薪酬管理核算员工的社保公积金；</span><br>
                  </span></span>
                <span class="ant-alert-description"></span></div>
              </p>
            </div>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="revocatory" size="mini">取消</el-button>
        <el-button type="primary" size="mini" @click="pigeonhole"
        >确认</el-button
        >
      </span>
            </template>
          </el-dialog>
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
          <el-button size="small" type="danger" plain :disabled="listData==''" @click="deleteInsuredDetail"
          ><i class="iconfont">&#xe608;</i>批量删除
          </el-button
          >

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

          <!-- 下拉选择器 -->
          <div class="resume-operation">
            <el-select clearable size="small" @change="next" v-model="empState" placeholder="员工状态">
              <el-option
                  v-for="item in empState_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <!-- 部门 树形选择框 -->
          <div class="resume-operation">
            <el-select clearable v-model="dept_name" @change="next" placeholder="选择部门">
              <el-option
                  v-for="item in deptS"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptId"
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
            <el-table-column prop="insDetailStaffName" sortable align="center" label="姓名" width="100"/>
            <el-table-column prop="insDetailInsuredName" sortable align="center" label="参保方案" min-width="150"/>
            <el-table-column prop="insDetailInsuredMonth" sortable align="center" label="社保缴纳月份" width="116"/>
            <el-table-column prop="insDetailSocialPersonPay" sortable align="center" label="社保个人缴费" width="116"/>
            <el-table-column prop="insDetailSocialFirmPay" sortable align="center" label="社保企业缴费" width="116"/>
            <el-table-column prop="insDetailInsuredMonth" sortable align="center" label="积金缴纳月份" width="116"/>
            <el-table-column prop="insDetailFundPersonPay" sortable align="center" label="积金个人缴费" width="116"
            />
            <el-table-column prop="insDetailFundFirmPay" sortable align="center" label="积金企业缴费" width="116"/>
            <el-table-column align="center" label="操作">
              <template #default="scope">
                <el-button type="text" size="small" @click="
                someone_insured_particulars=true,
                detail.insDetailId=scope.row.insDetailId,
                detail.insDetailStaffName=scope.row.insDetailStaffName,
                detail.insDetailInsuredName=scope.row.insDetailInsuredName,
                detail.insDetailInsuredMonth=scope.row.insDetailInsuredMonth,
                detail.insDetailSalaryMonth=scope.row.insDetailSalaryMonth,
                detail.deptName=scope.row.dept.deptName,
                detail.staffId=scope.row.staff.staffId,
                judge=1
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
  <someone_insured_particulars v-if="someone_insured_particulars"/>
</template>

<script>
import {ref, defineComponent} from "vue";
//查看个人参保详情
import someone_insured_particulars from '../social_management/someone_insured_particulars.vue';
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import {export_json_to_excel} from "../../excal/Export2Excel";

export default {
  //注册组件
  components: {
    //查看个人参保详情
    someone_insured_particulars
  },
  data() {
    return {
      //归档弹出框:
      dialogVisible: false,
      //访问地址
      url: 'http://localhost:80/detail/',
      //显示隐藏查看个人参保详情
      someone_insured_particulars: false,
      // 部门名称
      dept_name: '',
      // 选择部门 下拉选择器
      deptS: [],
      //计薪月份
      salaryMonth: '',
      // 员工姓名搜索框
      empName_search: "",
      //员工状态下拉选择器
      empState_options: [
        {value: 0, label: "试用"},
        {value: 1, label: "在职"},
        {value: 2, label: "离职"},
      ],
      empState: "",//员工状态下拉选择器的值
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
      detail: {
        //当前查看的编号
        insDetailId: '',
        //员工名称
        insDetailStaffName: '',
        //参保方案
        insDetailInsuredName: '',
        //参保月份
        insDetailInsuredMonth: '',
        //计薪月份
        insDetailSalaryMonth: '',
        //部门名称
        deptName: '',
        //员工编号
        staffId: '',
      },
      //查看的数据
      insArchive: {},
      //判断是查看明细还是归档
      judge: 1,
    };
  }, methods: {
    //归档取消事件
    revocatory() {
      this.dialogVisible = false;
      ElMessage({
        message: '取消成功',
        type: 'info',
      })
    },
    //多选删除参保
    deleteInsuredDetail() {
      ElMessageBox.confirm(
          '是否确认删除所选数据项?',
          '系统提示',
          {
            cancelButtonText: '取消',
            confirmButtonText: '确认',
            type: 'warning',
          }
      ).then(() => {
        this.staffIdList = [];
        for (let i = 0; i < this.listData.length; i++) {
          this.staffIdList.push(
              this.listData[i].staff.staffId
          )
        }
        this.axios({
          method: 'delete',
          url: this.url + 'deleteInsuredDetail',
          data: {
            staffIdList: this.staffIdList,
            staffName: this.$store.state.staffMessage.staffName,
          },
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          if (response.data.code == 200) {
           if (response.data.data) {
              //如果服务是正常的
              if (response.data.data.state == 200) {
                //如果是成功
                if (response.data.data.info == "成功") {
                  this.next();
                  ElMessage({
                    type: 'success',
                    message: '删除成功',
                  })
                  this.$store.commit("updateToken", response.data.data.token);
                } else {
                  ElMessage({
                    type: 'warning',
                    message: response.data.data.info,
                  })
                }
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
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
    },
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
        url: this.url + 'deptList',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              this.deptS = response.data.data.info;
              this.$store.commit("updateToken", response.data.data.token);
            }else {
              ElNotification.error({
                title: '提示',
                message:response.data.data.info,
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
    //归档操作
    pigeonhole() {
      this.axios({
        method: 'post',
        url: this.url + 'pigeonhole',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              //如果是成功
              if (response.data.data.info == "成功") {
                this.next();
                ElMessage({
                  type: 'success',
                  message: '归档成功',
                })
                this.dialogVisible = false;
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
    //查询当月所有已参保的员工
    next() {
      this.axios({
        method: 'post',
        url: this.url + 'selectPageIsuredDetail',
        data: {
          //当前页
          currenPage: this.pageInfo.currenPage,
          //页大小
          pageSize: this.pageInfo.pageSize,
          //部门编号列表
          deptIdList: this.dept_name == '' ? [] : [this.dept_name],
          //员工状态
          staffState: this.empState,
          //员工名称
          staffName: this.empName_search,
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
                personageMoney = personageMoney + response.data.data.info.records[i].insDetailSocialPersonPay + response.data.data.info.records[i].insDetailFundPersonPay;
                firmMoney = firmMoney + response.data.data.info.records[i].insDetailSocialFirmPay + response.data.data.info.records[i].insDetailFundFirmPay;
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
              if (this.tableData.length > 0) {
                //计薪语法
                this.salaryMonth = this.tableData[0].insDetailSalaryMonth;
              } else {
                let year = new Date().getFullYear();
                let month = new Date().getMonth() + 1;
                //计薪语法
                this.salaryMonth = month > 9 ? year + "-" + month : year + "-" + "0" + month;
              }
              this.$store.commit("updateToken", response.data.data.token);
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
    }
    ,
  }, mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    this.deptList();
    this.next();
  }
};
</script>

<style scoped>

.ant-modal-body {
  padding: 15px 30px;
  line-height: 1.6 !important;
  word-wrap: break-word;
}

.ant-alert-info {
  border: 1px solid #d3ebdf;
  color: #999;
  background: #ebfff7;
  padding: 8px 15px;
}

.ant-alert-message {
  color: #606c82 !important;
}

/deep/ .el-dialog__body {
  padding: 0 0;
  color: var(--el-text-color-regular) !important;
  font-size: var(--el-dialog-content-font-size) !important;
  word-break: break-all !important;
}

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

