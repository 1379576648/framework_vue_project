<template>
  <!-- 参保明细 -->
  <div class="outer-div" v-if="this.$parent.$parent.$parent.$parent.$data.judge==1">
    <!-- 标题 -->
    <div class="big-title">&nbsp;&nbsp;&nbsp;参保明细</div>
    <!-- 个人缴费信息 -->
    <div class="insured_details">
      <!-- 左 -->
      <div class="payment_details">
        <!-- 个人信息 -->
        <div style="float: left">
          <svg t="1644319631374" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="2715" width="100" height="100">
            <path
                d="M509.44 1018.368c-141.312 0-277.504-59.904-372.736-164.352l-19.968-21.504 19.968-21.504c95.744-104.448 231.424-164.352 372.736-164.352 141.312 0 277.504 59.904 372.736 164.352l19.968 21.504-19.968 21.504c-95.232 104.448-231.424 164.352-372.736 164.352zM204.8 832.512c81.92 77.824 190.976 121.856 304.64 121.856 113.664 0 222.72-44.032 304.64-121.856-81.92-77.824-190.976-121.856-304.64-121.856-113.664 0-222.72 44.032-304.64 121.856zM509.952 600.576c-89.088 0-161.792-72.704-161.792-161.792 0-89.088 72.704-161.792 161.792-161.792s161.792 72.704 161.792 161.792c0 89.088-72.192 161.792-161.792 161.792z m0-259.584c-53.76 0-97.792 44.032-97.792 97.792s44.032 97.792 97.792 97.792 97.792-44.032 97.792-97.792-43.52-97.792-97.792-97.792z"
                p-id="2716"></path>
            <path
                d="M119.296 719.36c-33.792-63.488-51.2-134.144-51.2-206.848 0-243.712 198.144-441.344 441.344-441.344s441.344 198.144 441.344 441.344c0 72.192-17.92 143.36-51.2 206.336 16.384 15.36 31.744 31.744 46.08 49.152 45.568-77.312 69.12-165.376 69.12-255.488 0-279.04-226.816-505.856-505.856-505.856C230.4 7.168 4.096 233.984 4.096 512.512c0 90.112 24.064 178.688 69.632 255.488 13.824-16.896 29.184-33.28 45.568-48.64z"
                p-id="2717"></path>
          </svg>
        </div>
        <div style="margin-top: 20px">
          姓名：{{ this.$parent.$parent.$parent.$parent.$data.detail.insDetailStaffName }} <br/>
          部门：{{ this.$parent.$parent.$parent.$parent.$data.detail.deptName }} <br/>
          职位：{{ this.postName }} <br/><br/><br/>
          参保方案：{{ this.$parent.$parent.$parent.$parent.$data.detail.insDetailInsuredName }} <br/>
          参保月份：{{ this.$parent.$parent.$parent.$parent.$data.detail.insDetailInsuredMonth }} <br/>
          计薪月份： {{ this.$parent.$parent.$parent.$parent.$data.detail.insDetailSalaryMonth }}<br/>
          社保基数：{{ this.socialNumber }} <br/>
          积金基数：{{ this.fundNumber }} <br/>
        </div>
        <el-popover
            placement="bottom"
            title="提示"
            :width="200"
            trigger="hover"
            content="调整 需先进行 删除 该投保再重新 选择 合适方案的进行参保"
        >
          <template #reference>
            <el-button type="text">调整</el-button>&nbsp;&nbsp;
          </template>
        </el-popover>
        <el-popconfirm
            @confirm="deleteInsuredDetail" title="删除此方案?"
            @cancel="revocatory">
          <template #reference>
            <el-button type="text" style="color: red">删除</el-button>
          </template>
        </el-popconfirm>
      </div>

      <!-- 右 -->
      <div class="payment_project">
        <!-- 缴纳明细表 -->
        <el-table :data="tableData" size="mini">
          <el-table-column prop="defSchemeType" label="缴纳项目" align="center"/>

          <el-table-column label="基数" align="center">
            <el-table-column prop="number" label="缴纳基数" align="center"/>
            <el-table-column label="范围" align="center">
              <el-table-column prop="defSchemeMin" label="最低" align="center"/>
              <el-table-column prop="defSchemeMax" label="最高" align="center"/>
            </el-table-column>
            <el-table-column prop="defSchemeFloor" label="下限" align="center"/>
            <el-table-column prop="defSchemeUpper" label="上限" align="center"/>
          </el-table-column>


          <el-table-column label="公司缴纳" align="center">
            <el-table-column prop="defSchemeFirmProp" label="缴纳比例" align="center"/>
            <el-table-column prop="defSchemeFirmSum" label="固定金额" align="center"/>
          </el-table-column>

          <el-table-column label="个人缴纳" align="center">
            <el-table-column prop="defSchemePersonProp" label="缴纳比例" align="center"/>
            <el-table-column prop="defSchemePersonSum" label="固定金额" align="center"/>
          </el-table-column>
          <el-table-column prop="statistics" label="小计" align="center"/>
        </el-table>
      </div>
    </div>
    <!-- 标题 -->
    <div class="big-title">&nbsp;&nbsp;&nbsp;参保日志</div>

    <div class="outer-div">
      <!-- 参保日志  时间线 -->
      <el-timeline>
        <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :color="activity.insLogColor"
            :timestamp="activity.createdTime"
        >
          {{ activity.insLogUpdateObject + activity.insLogExplain }}<br/>
          参保方案：{{ activity.insLogInsuredName }}<br/>
          社保基数：{{ activity.insLogSocialNumber }}<br/>
          参保月份：{{ activity.insLogSocialInsuredMonth }}<br/>
          计薪月份：{{ activity.insLogSocialInsuredMonth }}<br/>
          公积金月份：{{ activity.insLogFundNumber }}<br/>
          参保月份：{{ activity.insLogFundInsuredMonth }}<br/>
          计薪月份：{{ activity.insLogFundSalaryMonth }}<br/>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>

  <div class="outer-div" v-if="this.$parent.$parent.$parent.$parent.$data.judge==2">
    <!-- 标题 -->
    <div class="big-title">&nbsp;&nbsp;&nbsp;参保明细</div>
    <!-- 个人缴费信息 -->
    <div class="insured_details">
      <!-- 左 -->
      <div class="payment_details">
        <!-- 个人信息 -->
        <div style="float: left">
          <svg t="1644319631374" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="2715" width="100" height="100">
            <path
                d="M509.44 1018.368c-141.312 0-277.504-59.904-372.736-164.352l-19.968-21.504 19.968-21.504c95.744-104.448 231.424-164.352 372.736-164.352 141.312 0 277.504 59.904 372.736 164.352l19.968 21.504-19.968 21.504c-95.232 104.448-231.424 164.352-372.736 164.352zM204.8 832.512c81.92 77.824 190.976 121.856 304.64 121.856 113.664 0 222.72-44.032 304.64-121.856-81.92-77.824-190.976-121.856-304.64-121.856-113.664 0-222.72 44.032-304.64 121.856zM509.952 600.576c-89.088 0-161.792-72.704-161.792-161.792 0-89.088 72.704-161.792 161.792-161.792s161.792 72.704 161.792 161.792c0 89.088-72.192 161.792-161.792 161.792z m0-259.584c-53.76 0-97.792 44.032-97.792 97.792s44.032 97.792 97.792 97.792 97.792-44.032 97.792-97.792-43.52-97.792-97.792-97.792z"
                p-id="2716"></path>
            <path
                d="M119.296 719.36c-33.792-63.488-51.2-134.144-51.2-206.848 0-243.712 198.144-441.344 441.344-441.344s441.344 198.144 441.344 441.344c0 72.192-17.92 143.36-51.2 206.336 16.384 15.36 31.744 31.744 46.08 49.152 45.568-77.312 69.12-165.376 69.12-255.488 0-279.04-226.816-505.856-505.856-505.856C230.4 7.168 4.096 233.984 4.096 512.512c0 90.112 24.064 178.688 69.632 255.488 13.824-16.896 29.184-33.28 45.568-48.64z"
                p-id="2717"></path>
          </svg>
        </div>
        <div style="margin-top: 20px">
          姓名：{{ this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveStaffName }} <br/>
          部门：{{ this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveDeptName }} <br/>
          职位：{{ this.$parent.$parent.$parent.$parent.$data.insArchive.insArchivePostName }} <br/><br/><br/>
          参保方案：{{ this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveInsuredName }} <br/>
          参保月份：{{ this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveInsuredMonth }} <br/>
          计薪月份： {{ this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveInsuredMonth }}<br/>
          社保基数：{{ this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveSocialNumber }} <br/>
          积金基数：{{ this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveFundNumber }} <br/>
        </div>
      </div>

      <!-- 右 -->
      <div class="payment_project">
        <!-- 缴纳明细表 -->
        <el-table :data="tableData" size="mini">
          <el-table-column prop="defSchemeType" label="缴纳项目" align="center"/>

          <el-table-column label="基数" align="center">
            <el-table-column prop="number" label="缴纳基数" align="center"/>
            <el-table-column label="范围" align="center">
              <el-table-column prop="defSchemeMin" label="最低" align="center"/>
              <el-table-column prop="defSchemeMax" label="最高" align="center"/>
            </el-table-column>
            <el-table-column prop="defSchemeFloor" label="下限" align="center"/>
            <el-table-column prop="defSchemeUpper" label="上限" align="center"/>
          </el-table-column>

          <el-table-column label="公司缴纳" align="center">
            <el-table-column prop="defSchemeFirmProp" label="缴纳比例" align="center"/>
            <el-table-column prop="defSchemeFirmSum" label="固定金额" align="center"/>
          </el-table-column>

          <el-table-column label="个人缴纳" align="center">
            <el-table-column prop="defSchemePersonProp" label="缴纳比例" align="center"/>
            <el-table-column prop="defSchemePersonSum" label="固定金额" align="center"/>
          </el-table-column>
          <el-table-column prop="statistics" label="小计" align="center"/>
        </el-table>
      </div>
    </div>
    <!-- 标题 -->
    <div class="big-title">&nbsp;&nbsp;&nbsp;参保日志</div>

    <div class="outer-div">
      <!-- 参保日志  时间线 -->
      <el-timeline>
        <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :color="activity.insLogColor"
            :timestamp="activity.createdTime"
        >
          {{ activity.insLogUpdateObject + activity.insLogExplain }}<br/>
          参保方案：{{ activity.insLogInsuredName }}<br/>
          社保基数：{{ activity.insLogSocialNumber }}<br/>
          参保月份：{{ activity.insLogSocialInsuredMonth }}<br/>
          计薪月份：{{ activity.insLogSocialInsuredMonth }}<br/>
          公积金月份：{{ activity.insLogFundNumber }}<br/>
          参保月份：{{ activity.insLogFundInsuredMonth }}<br/>
          计薪月份：{{ activity.insLogFundSalaryMonth }}<br/>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
/* 时间线 */
import {defineComponent} from "vue";
import {ElMessage, ElNotification} from "element-plus";
// import { MoreFilled } from "@element-plus/icons-vue";

export default {
  data() {
    return {
      //访问地址
      url: 'http://localhost:80/detail/',
      /* 时间线 */
      activities: [],
      //职位名称
      postName: '',
      //社保基数
      socialNumber: 0,
      //基金基数
      fundNumber: 0,
      //表格数据
      tableData: [],
    };
  }, methods: {
    revocatory() {
      ElMessage({
        message: '取消成功',
        type: 'info',
      })
    },
    //删除参保
    deleteInsuredDetail() {
      this.axios({
        method: 'delete',
        url: this.url + 'deleteInsuredDetail',
        data: {
          staffIdList: [this.$parent.$parent.$parent.$parent.$data.detail.staffId],
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
                this.$parent.$parent.$parent.$parent.next();
                ElMessage({
                  type: 'success',
                  message: '删除成功',
                })
                this.$parent.$parent.$parent.$parent.$data.someone_insured_particulars = false;
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
    //通过明细编号查询数据
    selectListScheme() {
      this.axios({
        method: 'get',
        url: this.url + 'selectListScheme/' + this.$parent.$parent.$parent.$parent.$data.detail.insDetailId,
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
         if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              this.tableData = response.data.data.info.defSchemeList;
              this.fundNumber = response.data.data.info.insuredPayment.insuredPaymentFundNumber;
              this.socialNumber = response.data.data.info.insuredPayment.insuredPaymentSocialNumber;
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
    },
    //通过员工名称查询职位名称
    selectPostName() {
      this.axios({
        method: 'get',
        url: this.url + 'selectPostName/' + this.$parent.$parent.$parent.$parent.$data.detail.insDetailStaffName,
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
         if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              this.postName = response.data.data.info;
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
    //查询某一个员工某一个月的参保日志
    selectInsuredLog() {
      this.axios({
        method: 'get',
        url: this.url + 'selectInsuredLog/' + this.$parent.$parent.$parent.$parent.$data.detail.insDetailStaffName + '/' + this.$parent.$parent.$parent.$parent.$data.detail.insDetailSalaryMonth,
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
         if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              this.activities = response.data.data.info;
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
    },
    //查询某一个员工某一个月的参保日志
    selectInsuredALog() {
      this.axios({
        method: 'get',
        url: this.url + 'selectInsuredLog/' + this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveStaffName + '/' + this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveInsuredMonth,
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
         if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              this.activities = response.data.data.info;
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
  }, mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    if (this.$parent.$parent.$parent.$parent.$data.judge == 1) {
      //通过员工名称获取职位名称
      this.selectPostName();
      //通过明细编号查询数据
      this.selectListScheme();
      //查询某一个员工某一个月的参保日志
      this.selectInsuredLog();
    } else {
      //初始化
      this.tableData = [];
      let value1 = {
        //方案名称
        defSchemeType: '养老保险',
        //缴纳基数
        number: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchivePrNumber,
        //范围下限
        defSchemeMin: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveSocialMin,
        //范围上限
        defSchemeMax: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveSocialMax,
        //基数下限
        defSchemeFloor: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchivePrFloor,
        //基数上限
        defSchemeUpper: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchivePrUpper,
        //公司缴纳比例
        defSchemeFirmProp: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchivePrFirmProp,
        //公司固定金额
        defSchemeFirmSum: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchivePrFirmSum,
        //个人缴纳比例
        defSchemePersonProp: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchivePrPersonProp,
        //个人固定金额
        defSchemePersonSum: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchivePrPersonSum,
        //小计
        statistics:
            ((this.$parent.$parent.$parent.$parent.$data.insArchive.insArchivePrNumber *
                    (this.$parent.$parent.$parent.$parent.$data.insArchive.insArchivePrFirmProp / 100) +
                    this.$parent.$parent.$parent.$parent.$data.insArchive.insArchivePrFirmSum) +
                (this.$parent.$parent.$parent.$parent.$data.insArchive.insArchivePrNumber *
                    (this.$parent.$parent.$parent.$parent.$data.insArchive.insArchivePrPersonProp / 100) +
                    this.$parent.$parent.$parent.$parent.$data.insArchive.insArchivePrPersonSum)).toFixed(2),
      }
      let value2 = {
        //方案名称
        defSchemeType: '医疗保险',
        //缴纳基数
        number: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveMdNumber,
        //范围下限
        defSchemeMin: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveSocialMin,
        //范围上限
        defSchemeMax: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveSocialMax,
        //基数下限
        defSchemeFloor: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveMdFloor,
        //基数上限
        defSchemeUpper: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveMdUpper,
        //公司缴纳比例
        defSchemeFirmProp: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveMdFirmProp,
        //公司固定金额
        defSchemeFirmSum: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveMdFirmSum,
        //个人缴纳比例
        defSchemePersonProp: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveMdPersonProp,
        //个人固定金额
        defSchemePersonSum: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveMdPersonSum,
        //小计
        statistics:
            ((this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveMdNumber *
                    (this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveMdFirmProp / 100) +
                    this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveMdFirmSum) +
                (this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveMdNumber *
                    (this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveMdPersonProp / 100) +
                    this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveMdPersonSum)).toFixed(2),
      }
      let value3 = {
        //方案名称
        defSchemeType: '失业保险',
        //缴纳基数
        number: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveUnNumber,
        //范围下限
        defSchemeMin: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveSocialMin,
        //范围上限
        defSchemeMax: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveSocialMax,
        //基数下限
        defSchemeFloor: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveUnFloor,
        //基数上限
        defSchemeUpper: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveUnUpper,
        //公司缴纳比例
        defSchemeFirmProp: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveUnFirmProp,
        //公司固定金额
        defSchemeFirmSum: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveUnFirmSum,
        //个人缴纳比例
        defSchemePersonProp: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveUnPersonProp,
        //个人固定金额
        defSchemePersonSum: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveUnPersonSum,
        //小计
        statistics:
            ((this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveUnNumber *
                    (this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveUnFirmProp / 100) +
                    this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveUnFirmSum) +
                (this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveUnNumber *
                    (this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveUnPersonProp / 100) +
                    this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveUnPersonSum)).toFixed(2),
      }
      let value4 = {
        //方案名称
        defSchemeType: '工伤保险',
        //缴纳基数
        number: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveOcNumber,
        //范围下限
        defSchemeMin: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveSocialMin,
        //范围上限
        defSchemeMax: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveSocialMax,
        //基数下限
        defSchemeFloor: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveOcFloor,
        //基数上限
        defSchemeUpper: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveOcUpper,
        //公司缴纳比例
        defSchemeFirmProp: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveOcFirmProp,
        //公司固定金额
        defSchemeFirmSum: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveOcFirmSum,
        //个人缴纳比例
        defSchemePersonProp: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveOcPersonProp,
        //个人固定金额
        defSchemePersonSum: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveOcPersonSum,
        //小计
        statistics:
            ((this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveOcNumber *
                    (this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveOcFirmProp / 100) +
                    this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveOcFirmSum) +
                (this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveOcNumber *
                    (this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveOcPersonProp / 100) +
                    this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveOcPersonSum)).toFixed(2),
      }
      let value5 = {
        //方案名称
        defSchemeType: '生育保险',
        //缴纳基数
        number: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveGiNumber,
        //范围下限
        defSchemeMin: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveSocialMin,
        //范围上限
        defSchemeMax: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveSocialMax,
        //基数下限
        defSchemeFloor: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveGiFloor,
        //基数上限
        defSchemeUpper: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveGiUpper,
        //公司缴纳比例
        defSchemeFirmProp: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveGiFirmProp,
        //公司固定金额
        defSchemeFirmSum: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveGiFirmSum,
        //个人缴纳比例
        defSchemePersonProp: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveGiPersonProp,
        //个人固定金额
        defSchemePersonSum: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveGiPersonSum,
        //小计
        statistics:
            ((this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveGiNumber *
                    (this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveGiFirmProp / 100) +
                    this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveGiFirmSum) +
                (this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveGiNumber *
                    (this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveGiPersonProp / 100) +
                    this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveGiPersonSum)).toFixed(2),
      }
      let value6 = {
        //方案名称
        defSchemeType: '公积金',
        //缴纳基数
        number: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveFuNumber,
        //范围下限
        defSchemeMin: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveFundMin,
        //范围上限
        defSchemeMax: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveFundMax,
        //基数下限
        defSchemeFloor: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveFuFloor,
        //基数上限
        defSchemeUpper: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveFuUpper,
        //公司缴纳比例
        defSchemeFirmProp: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveFuFirmProp,
        //公司固定金额
        defSchemeFirmSum: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveFuFirmSum,
        //个人缴纳比例
        defSchemePersonProp: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveFuPersonProp,
        //个人固定金额
        defSchemePersonSum: this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveFuPersonSum,
        //小计
        statistics:
            ((this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveFuNumber *
                    (this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveFuFirmProp / 100) +
                    this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveFuFirmSum) +
                (this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveFuNumber *
                    (this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveFuPersonProp / 100) +
                    this.$parent.$parent.$parent.$parent.$data.insArchive.insArchiveFuPersonSum)).toFixed(2),
      }
      this.tableData.push(value1);
      this.tableData.push(value2);
      this.tableData.push(value3);
      this.tableData.push(value4);
      this.tableData.push(value5);
      this.tableData.push(value6);
      //查询某一个员工某一个月的参保日志
      this.selectInsuredALog();
    }
  }
};
</script>

<style lang="scss" scoped>
/* 个人头像 */
.picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

/* 缴费项目 */
.payment_project {
  background-color: blue;
  display: inline-block;
  float: right;
  width: 73%;
}

/* 缴费信息 */
.payment_details {
  display: inline-block;
  float: left;
  width: 25%;
  margin-top: 50px;
}

/* 参保明细 */
.insured_details {
  text-align: center;
  height: 400px;
  margin: 0.5%;
}

/* 外层div */
.outer-div {
  padding: 10px 1%;
}

/* 标题 */
.big-title {
  width: 98%;
  //height: 45px;
  background-color: #f2f4fa;
  font-size: 16px;
  font-weight: bold;
  padding: 1%;
  margin-bottom: 20px;
}
</style>