<template>
  <!--  请假查询页面-->
  <div class="w">
    <div class="head">
      <el-button size="medium">
        <el-icon style="font-size: 18px">
          <i-upload/>
        </el-icon>
        导出
      </el-button>
      &nbsp;
      <!--选择开始日期和结束日期-->
      <el-date-picker
          v-model="selectTime"
          type="daterange"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="shortcuts"
          style="margin-left: 0"
      >
      </el-date-picker>
      &nbsp;
      <el-button type="success" plain @click="selectLeaveRecordAll()">搜索</el-button>

    </div>
    <!--表格-->
    <div class="y">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="staffName" label="申请名称"/>
        <el-table-column prop="deptname" label="发起人部门"/>
        <el-table-column prop="leaveType" label="请假类型"/>
        <el-table-column prop="leaveMatter" label="请假事由"/>
        <el-table-column prop="leaveSDate" label="计划开始时间"/>
        <el-table-column prop="leaveEDate" label="计划结束时间"/>
        <el-table-column prop="leaveTotalDate" label="计划总小时"/>
        <el-table-column prop="leaveActualTime" label="实际开始时间"/>
        <el-table-column prop="leaveActualOvertime" label="实际结束时间"/>
        <el-table-column prop="leaveActualToKinAga" label="实际总小时"/>
        <el-table-column label="请假状态">
          <template #default="scope">
            <span v-if="scope.row.leaveCondition===0">未开始</span>
            <span v-if="scope.row.leaveCondition===1">进行中</span>
            <span v-if="scope.row.leaveCondition===2">已完成</span>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template #default="scope">
            <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                :icon="InfoFilled"
                icon-color="red"
                title="确定开始加班吗?"
                @confirm=beginLeave(leaveId)
            >
              <template #reference>
                <el-button type="text" size="small" style="color:darkorange"
                           @click="(leaveId=scope.row.leaveId,
                           leaveActualTime=scope.row.leaveActualTime)"
                >开始加班
                </el-button>
              </template>
            </el-popconfirm>
            <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                :icon="InfoFilled"
                icon-color="red"
                title="确定结束加班吗?"
                @confirm=EndLeave(leaveId)
            >
              <template #reference>
                <el-button type="text" size="small" style="color:darkorange"
                           @click="(leaveId=scope.row.leaveId,
                           leaveActualTime=scope.row.leaveActualTime,
                           leaveActualOvertime=scope.row.leaveActualOvertime)"
                >结束加班
                </el-button>
              </template>
            </el-popconfirm>
            <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                :icon="InfoFilled"
                icon-color="red"
                title="确定删除吗?"
                @confirm=deleteLeave(leaveId)
            >
              <template #reference>
                <el-button type="text" size="small" style="color:darkorange"
                           @click="(leaveId=scope.row.leaveId)"
                >删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="pageInfo.currenPage"
          :page-sizes="[3, 5, 10, 50]"
          v-model:page-size="pageInfo.pagesize"
          :default-page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          :pager-count="5"
          background
          @size-change="sele"
          @current-change="sele"
      >
      </el-pagination>
    </div>

  </div>
</template>

<script>
import {ref, defineComponent} from "vue";
import {ElMessage, ElNotification} from "element-plus";
import XLSX, {readFile} from "xlsx";

export default {
  data() {
    return {
      //访问路径
      url: "http://localhost:80/",
      // 当前登录者
      NowStaffName: this.$store.state.staffMessage.staffName,
      pageInfo: {
        currentPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },
      shortcuts: [
        {
          text: "最近一周",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          },
        },
        {
          text: "最近一个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          },
        },
        {
          text: "最近三个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          },
        },
      ],
      // 选择开始日期/结束日期
      selectTime: [],
      options: ref([
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ]),
      tableData: [],
      value1: "", //日期
      value: ref(""), //选择
    };
  },
  methods: {
    // 根据员工名称查询请假
    selectLeaveRecordAll() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'selectLeaveRecordAll',
        data: {
          // 当前登陆者
          "staffName": this.NowStaffName,
          // 当前页
          "currentPage": this.pageInfo.currentPage,
          // 页大小
          "pagesize": this.pageInfo.pagesize,
          // 起始时间
          "startTime": this.selectTime == null ? null : this.selectTime[0],
          // 结束时间
          "endTime": this.selectTime == null ? null : this.selectTime[1],
        }
      }).then((response) => {
        console.log("查询请假记录");
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state === 200) {
            this.tableData = response.data.data.info.records;
            this.pageInfo.total = response.data.data.info.total;
          } else {
            ElNotification.warning({
              title: '提示',
              message: "查询请假记录有误，请联系管理员",
              offset: 100,
            })
          }
        } else {
          ElNotification.warning({
            title: '提示',
            message: "服务发生雪崩",
            offset: 100,
          })
        }
      })
    },
    // 删除请假记录
    deleteLeave() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'deleteLeave',
        data: {
          "leaveId":this.leaveId,
        }
      }).then((response) => {
        console.log("删除请假记录");
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state === 200) {
            if (response.data.data.info=1){
              ElMessage({
                showClose: true,
                message: '删除成功',
                type: 'success',
              })
              this.selectLeaveRecordAll();
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "删除请假记录有误，请联系管理员",
              offset: 100,
            })
          }
        } else {
          ElNotification.warning({
            title: '提示',
            message: "服务发生雪崩",
            offset: 100,
          })
        }
      })
    },
    // 开始加班
    beginLeave() {
      if (this.leaveCondition === 2) {
        ElNotification.warning({
          title: '提示',
          message: "该请假已完成，不能进行重复操作",
          offset: 100,
        })
      } else if (this.leaveActualTime !== null) {
        ElNotification.warning({
          title: '提示',
          message: "已正在进行请假，不能进行重复操作",
          offset: 100,
        })
      } else {
        var _this = this;
        this.axios({
          method: 'post',
          url: this.url + 'updateBeginLeave',
          data: {
            "leaveId": this.leaveId,
          }
        }).then((response) => {
          console.log("开始请假");
          console.log(response);
          if (response.data.data.data) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
          } else if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              if (response.data.data.info === "开始加班成功") {
                ElMessage({
                  showClose: true,
                  message: '开始请假成功',
                  type: 'success',
                })
                this.selectLeaveRecordAll();
              } else {
                ElNotification.warning({
                  title: '提示',
                  message: response.data.data.info,
                  offset: 100,
                })
              }
            } else {
              ElNotification.warning({
                title: '提示',
                message: "开始请假数据有误，请联系管理员",
                offset: 100,
              })
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        })
      }
    },
    // 结束请假
    EndLeave() {
      if (this.leaveActualOvertime !== null) {
        ElNotification.warning({
          title: '提示',
          message: "该请假已完成，不能进行重复操作",
          offset: 100,
        })
      } else {
        var _this = this;
        this.axios({
          method: 'post',
          url: this.url + 'updateEndLeave',
          data: {
            "leaveId": this.leaveId,
            "leaveActualTime": this.leaveActualTime,
          }
        }).then((response) => {
          console.log("结束请假");
          console.log(response);
          if (response.data.data.data) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
          } else if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              if (response.data.data.info === "结束请假成功") {
                ElMessage({
                  showClose: true,
                  message: '结束请假成功',
                  type: 'success',
                })
                this.selectLeaveRecordAll();
              } else {
                ElNotification.warning({
                  title: '提示',
                  message: response.data.data.info,
                  offset: 100,
                })
              }
            } else {
              ElNotification.warning({
                title: '提示',
                message: "结束请假数据有误，请联系管理员",
                offset: 100,
              })
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        })
      }
    },
  },
  created() {
    // 根据员工名称查询请假
    this.selectLeaveRecordAll();
  },
};
</script>

<style>

table * {
  text-align: center;
}

.w {
  margin-top: 20px;
  border: 1px solid #e9e9e9;
}

.w:hover {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  border-color: transparent;
}

.y {
  margin-top: 20px;
}

.head {
  margin-left: 2%;
  margin-top: 2%;
}

.demo-pagination-block {
  margin-top: 20px;
  margin-bottom: 30px;
}

</style>

