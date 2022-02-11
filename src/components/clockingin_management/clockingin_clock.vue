<!--打卡记录-->
<template>
  <div class="w">
    <div class="head">
      <el-button size="medium" @click="derive()">
        <el-icon style="font-size: 18px">
          <i-upload/>
        </el-icon>
        导出
      </el-button>
      &nbsp;
      <el-upload
          :action="this.url1 +this.$store.state.staffMessage.staffName"
          style="display: inline-block"
          :show-file-list="false"
          accept=".xlsx"
          :on-success="ExcelImport"
          :before-upload="beforeUpload"
      >
        <el-button size="medium">
          <el-icon style="font-size: 18px">
            <i-folder-opened/>
          </el-icon>
          导入
        </el-button>
      </el-upload>
      <!--选择开始日期和结束日期-->
      <el-date-picker
          v-model="selectTime"
          type="daterange"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="shortcuts"
          style="margin-left: 340px"
      >
      </el-date-picker>
      &nbsp;
      <el-button type="success" plain @click="selectCardRecordAll()">搜索</el-button>
    </div>
    <!--    表格-->
    <div class="y">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="staffName" label="员工名称"/>
        <el-table-column prop="deptName" label="部门名称"/>
        <el-table-column prop="mornClock" label="早上打卡时间"/>
        <el-table-column prop="afternoonClock" label="下午打卡时间"/>
        <el-table-column prop="createdTime" label="记录时间"/>
        <el-table-column prop="operate" label="操作">
          <template #default="scope">
            <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                :icon="InfoFilled"
                icon-color="red"
                title="确定删除吗?"
                @confirm=deleteClock(clockRecordId)
            >
              <template #reference>
                <el-button type="text" size="small" style="color:darkorange"
                           @click="(clockRecordId=scope.row.clockRecordId)"
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
          @size-change="selectCardRecordAll()"
          @current-change="selectCardRecordAll()"
          @prev-click="selectCardRecordAll()"
          @next-click="selectCardRecordAll()">
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {ref, defineComponent} from "vue";
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import {export_json_to_excel} from '/src/excal/Export2Excel.js'
import XLSX from "xlsx";

export default {
  data() {
    return {
      //访问路径
      url: "http://localhost:80/",
      // 导入地址
      url1: "http://localhost:80/import/",
      // 当前登录者
      NowStaffName: this.$store.state.staffMessage.staffName,
      StaffName: this.NowStaffName,
      pageInfo: {
        currentPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },
      //时间选择
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
      //打卡记录数据
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
      let tHeader = ["员工名称", "部门名称", "早上打卡时间", "下午打卡时间", "记录时间"]; // 导出的表头名
      let filterVal = ["staffName", "deptName", "mornClock", "afternoonClock", "createdTime"];//导出其prop属性
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
    // 导入判断
    beforeUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      const whiteList = ["xls", "xlsx"];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error('上传文件只能是xls、xlsx格式');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB');
        return false;
      }
    },
    // 根据员工名称查询打卡记录
    selectCardRecordAll() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'selectCardRecordAll',
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
        console.log("查询打卡记录");
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            this.tableData = response.data.data.info.records;
            this.pageInfo.total = response.data.data.info.total;
          } else {
            ElNotification.warning({
              title: '提示',
              message: "查询部门职位有误，请联系管理员",
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
    // 删除打卡记录
    deleteClock() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'deleteClock',
        data: {
          "clockRecordId": this.clockRecordId,
        }
      }).then((response) => {
        console.log("删除打卡记录");
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            if (response.data.data.info == 1) {
              ElMessage({
                showClose: true,
                message: '删除成功',
                type: 'success',
              })
              this.selectCardRecordAll();
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "删除打卡记录有误，请联系管理员",
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
    // 导入
    ExcelImport(response) {
      console.log("导入")
      console.log(response)
      if (response.data.data) {
        ElNotification.warning({
          title: '提示',
          message: "服务发生关闭",
          offset: 100,
        })
      } else if (response.data.state == 200) {
        if (response.data.info == 99) {
          ElMessage({
            type: 'success',
            message: `导入成功`,
          })
          this.selectCardRecordAll();
        } else {
          ElNotification.warning({
            title: '提示',
            message: response.data.info,
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
    }
  },
  created() {
    // 根据员工名称查询打卡记录
    this.selectCardRecordAll();
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

.upload-demo {
  display: inline-block;
  margin-left: 10px;
}
</style>

