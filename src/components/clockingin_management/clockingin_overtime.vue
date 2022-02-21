<!--加班记录-->
<template>
  <!--  加班查询页面-->
  <div class="w">
    <div class="head">
      <el-button size="medium" @click="derive()">
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
          style="margin-left: 0px"
      >
      </el-date-picker>
      &nbsp;
      <el-button type="success" plain @click="selectOverTimeRecordAll()">搜索</el-button>
    </div>
    <!--表格-->
    <div class="y">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="staffName" label="申请人"/>
        <el-table-column prop="deptName" label="发起人部门"/>
        <el-table-column prop="overtimeaskType" label="加班类型"/>
        <el-table-column prop="overtimeaskMatter" label="加班事由"/>
        <el-table-column prop="overtimeaskSDate" label="计划开始时间"/>
        <el-table-column prop="overtimeaskEDate" label="计划结束时间"/>
        <el-table-column prop="overtimeaskTotalDate" label="计划总小时"/>
        <el-table-column prop="overtimeaskActualTime" label="实际开始时间"/>
        <el-table-column prop="overtimeaskActualOvertime" label="实际结束时间"/>
        <el-table-column prop="overtimeaskActualTokinaga" label="实际总小时"/>
        <el-table-column label="加班状态">
          <template #default="scope">
            <span v-if="scope.row.overtimeaskCondition===0">未开始</span>
            <span v-if="scope.row.overtimeaskCondition===1">进行中</span>
            <span v-if="scope.row.overtimeaskCondition===2">已完成</span>
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
                @confirm=beginOverTime(overtimeaskId)
            >
              <template #reference>
                <el-button type="text" size="small" style="color:darkorange"
                           @click="(overtimeaskId=scope.row.overtimeaskId,
                           overtimeaskActualTime=scope.row.overtimeaskActualTime,
                           overtimeaskActualOvertime=scope.row.overtimeaskActualOvertime)"
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
                @confirm=EndOverTime(overtimeaskId)
            >
              <template #reference>
                <el-button type="text" size="small" style="color:darkorange"
                           @click="(overtimeaskId=scope.row.overtimeaskId,
                           overtimeaskActualTime=scope.row.overtimeaskActualTime,
                           overtimeaskActualOvertime=scope.row.overtimeaskActualOvertime)"
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
                @confirm=deleteOverTime(overtimeaskId)
            >
              <template #reference>
                <el-button type="text" size="small" style="color:darkorange"
                           @click="(overtimeaskId=scope.row.overtimeaskId)"
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
          v-model:currentPage="pageInfo.currentPage"
          :page-sizes="[1, 3, 5, 7]"
          v-model:page-size="pageInfo.pagesize"
          :default-page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          :pager-count="5"
          background
          next-text="下一页"
          prev-text="上一页"
          @size-change="selectOverTimeRecordAll()"
          @current-change="selectOverTimeRecordAll()"
          @prev-click="selectOverTimeRecordAll()"
          @next-click="selectOverTimeRecordAll()">
        >
      </el-pagination>
    </div>

  </div>
</template>

<script>


import {ref, defineComponent} from "vue";
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import {export_json_to_excel} from "../../excal/Export2Excel";
import XLSX from "xlsx";

export default {
  data() {
    return {
      //访问路径
      url: "http://localhost:80/",
      // 导入地址
      url1: "http://localhost:80/importOverTimeRecord/",
      // 当前登录者
      NowStaffName: this.$store.state.staffMessage.staffName,
      pageInfo: {
        currentPage: 1,
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
      // 表格数据
      tableData: [],
      value1: "", //日期
      value: ref(""), //选择
    };
  },
  methods: {
    // 点击导出操作
    derive() {
      ElMessageBox.confirm(
          '此操作将导出excel文件, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        this.deriveExcel();
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
    },
    // 导出方法
    deriveExcel() {
      var _this = this;
      let tHeader = ["申请人", "发起人部门", "加班类型", "加班事由", "计划开始时间", "计划结束时间", "计划总小时", "实际开始时间", "实际结束时间", "实际总小时",]; // 导出的表头名
      let filterVal = ["staffName", "deptName", "overtimeaskType", "overtimeaskMatter", "overtimeaskSDate", "overtimeaskEDate", "overtimeaskTotalDate", "overtimeaskActualTime", "overtimeaskActualOvertime", "overtimeaskActualTokinaga"];//导出其prop属性
      ElMessageBox.prompt('请输入文件名', '提示', {
        confirmButtonText: '生成',
        cancelButtonText: '取消',
      }).then(({value}) => {
        let data = _this.formatJson(filterVal, _this.tableData);
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
    // 根据员工名称查询打卡记录
    selectOverTimeRecordAll() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'selectOverTimeRecordAll',
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
        console.log("查询加班记录");
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              this.tableData = response.data.data.info.records;
              this.pageInfo.total = response.data.data.info.total;
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
    // 删除打卡记录
    deleteOverTime() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'deleteOverTime',
        data: {
          "overtimeaskId": this.overtimeaskId,
        }
      }).then((response) => {
        console.log("删除加班记录");
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              if (response.data.data.info === 1) {
                ElMessage({
                  showClose: true,
                  message: '删除成功',
                  type: 'success',
                })
                this.$store.commit("updateToken", response.data.data.token);
                this.selectOverTimeRecordAll();
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
    },
    // 开始加班
    beginOverTime() {
      if (this.overtimeaskCondition === 2) {
        ElNotification.warning({
          title: '提示',
          message: "该加班已完成，不能进行重复操作",
          offset: 100,
        })
      } else if (this.overtimeaskActualTime !== null) {
        ElNotification.warning({
          title: '提示',
          message: "已正在进行加班，不能进行重复操作",
          offset: 100,
        })
      } else {
        var _this = this;
        this.axios({
          method: 'post',
          url: this.url + 'updateBeginOverTime',
          data: {
            "overtimeaskId": this.overtimeaskId,
          }
        }).then((response) => {
          console.log("开始加班");
          console.log(response);
          if (response.data.code === 200) {
            if (response.data.data) {
              //如果服务是正常的
              if (response.data.data.state === 200) {
                if (response.data.data.info === "开始加班成功") {
                  ElMessage({
                    showClose: true,
                    message: '开始加班成功',
                    type: 'success',
                  })
                  this.selectOverTimeRecordAll();
                  this.$store.commit("updateToken", response.data.data.token);
                } else {
                  ElNotification.warning({
                    title: '提示',
                    message: response.data.data.info,
                    offset: 100,
                  })
                }
              } else {
                ElNotification.error({
                  title: '提示',
                  message: "开始加班失败",
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
    },
    // 结束加班
    EndOverTime() {
      if (this.overtimeaskActualOvertime !== null) {
        ElNotification.warning({
          title: '提示',
          message: "该加班已完成，不能进行重复操作",
          offset: 100,
        })
      } else {
        var _this = this;
        this.axios({
          method: 'post',
          url: this.url + 'updateEndOverTime',
          data: {
            "overtimeaskId": this.overtimeaskId,
            "overtimeaskActualTime": this.overtimeaskActualTime,
          }
        }).then((response) => {
          console.log("结束加班");
          console.log(response);
          if (response.data.code === 200) {
            if (response.data.data) {
              //如果服务是正常的
              if (response.data.data.state === 200) {
                if (response.data.data.info === "结束加班成功") {
                  ElMessage({
                    showClose: true,
                    message: '结束加班成功',
                    type: 'success',
                  })
                  this.selectOverTimeRecordAll();
                  this.$store.commit("updateToken", response.data.data.token);
                } else {
                  ElNotification.warning({
                    title: '提示',
                    message: response.data.data.info,
                    offset: 100,
                  })
                }
              } else {
                ElNotification.error({
                  title: '提示',
                  message: "结束加班失败",
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
    },
  },
  created() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    // 根据员工名称查询打卡记录
    this.selectOverTimeRecordAll();

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

