<!--考勤月报表-->
<template>
  <!-- 月份报表页面 -->
  <div class="head">
    <div class="head-surface">
      <span>{{ this.salaryMonth }}月考勤统计</span>
    </div>
    <div class="head-to">
      <el-tabs v-model="activeName">
        <el-tab-pane label="考勤统计" name="first"></el-tab-pane>
      </el-tabs>
    </div>
    <!--    搜索框-->
    <div class="head-examine">
      <el-input v-model="input" placeholder="搜索" style="width: 200px">
        <template #suffix>
          <el-icon style="margin-top: 13px; margin-right: 7px"
          >
            <i-search
            />
          </el-icon>
        </template>
      </el-input>
      &nbsp;
      <el-button size="small" @click="derive()">
        <el-icon style="font-size: 18px">
          <i-upload/>
        </el-icon>
        导出
      </el-button>
      <el-button type="primary" size="small">
        归档{{ this.salaryMonth }}月份报表
      </el-button>
    </div>
    <!--表格-->
    <div class="bottom">
      <el-table :data="tableDataTwo" stripe border style="width: 100%" height="320">
        <el-table-column prop="staffName" align="center" fixed label="员工名称"/>
        <el-table-column prop="deptName" align="center" fixed label="部门"/>
        <el-table-column prop="normal" align="center" label="正常"/>
        <el-table-column prop="leaveEarly" align="center" label="迟到"/>
        <el-table-column prop="tardy" align="center" label="早退"/>
        <el-table-column prop="absenteeism" align="center" label="旷工"/>
        <el-table-column align="center" label="是否全勤">
          <template #default="scope">
            <span v-if="scope.row.leaveEarly ===0 && scope.row.tardy ===0 && scope.row.absenteeism === 0">是</span>
            <span v-if="scope.row.leaveEarly !==0 || scope.row.tardy !==0 || scope.row.absenteeism !==0">否</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="pageInfo.currenPage"
          :page-sizes="[1, 3, 5, 7]"
          v-model:page-size="pageInfo.pagesize"
          :default-page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          :pager-count="5"
          background
          next-text="下一页"
          prev-text="上一页"
          @size-change="selectStaffNameAll()"
          @current-change="selectStaffNameAll()"
          @prev-click="selectStaffNameAll()"
          @next-click="selectStaffNameAll()">
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import {export_json_to_excel} from "../../excal/Export2Excel";

export default {
  data() {
    return {
      //访问路径
      url: "http://localhost:80/",
      // 总裁名称
      president: "",
      activeName: "first",
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },
      salaryMonth: "",
      tableData: [],
      tableDataTwo: [],
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
      let tHeader = ["员工名称", "部门", "正常", "迟到", "早退", "旷工"]; // 导出的表头名
      let filterVal = ["staffName", "deptName", "normal", "leaveEarly", "tardy", "absenteeism",];//导出其prop属性
      ElMessageBox.prompt('请输入文件名', '提示', {
        confirmButtonText: '生成',
        cancelButtonText: '取消',
      }).then(({value}) => {
        let data = _this.formatJson(filterVal, _this.tableDataTwo);
        export_json_to_excel(tHeader, data, value);
        ElMessage({
          type: 'success',
          message: `生成成功`,
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    // 查询总裁
    selectpresident() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectpresident',
      }).then((response) => {
        console.log("查询总裁成功")
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              _this.president = response.data.data.info;
              this.$store.commit("updateToken", response.data.data.token);
              window.setTimeout(this.selectStaffNameAll, 500);
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
    // 查询所有员工的考勤状态次数
    selectStaffNameAll() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'selectStaffNameAll',
        data: {
          "staffName": this.president[0].staffname,
          //当前页
          "currentPage": this.pageInfo.currenPage,
          //页大小
          "pageSize": this.pageInfo.pagesize,
        }
      }).then((response) => {
        console.log("查询所有员工的考勤状态次数");
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              this.tableData = response.data.data.info.records
              this.pageInfo.total = response.data.data.info.total;
              this.tableDataTwo = []
              for (let i = 0; i < this.tableData.length; i++) {
                let one = {
                  deptName: this.tableData[i].deptName,
                  staffName: this.tableData[i].staffName,
                  normal: 0,
                  leaveEarly: 0,
                  tardy: 0,
                  absenteeism: 0,
                }
                for (let j = 0; j < this.tableData[i].list.length; j++) {
                  if (this.tableData[i].list[j].checkState == "正常") {
                    // js添加元素
                    one["normal"] = this.tableData[i].list[j].stateNumber
                  } else if (this.tableData[i].list[j].checkState == "早退") {
                    one["leaveEarly"] = this.tableData[i].list[j].stateNumber
                  } else if (this.tableData[i].list[j].checkState == "迟到") {
                    one["tardy"] = this.tableData[i].list[j].stateNumber
                  } else if (this.tableData[i].list[j].checkState == "旷工") {
                    one["absenteeism"] = this.tableData[i].list[j].stateNumber
                  }
                }
                this.tableDataTwo.push(one)
                one = {}
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
  },
  created() {
    // 查询总裁
    this.selectpresident();
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    // 当前月份
    this.salaryMonth = month > 9 ? year + "-" + month : year + "-" + "0" + month;
  }
};
</script>

<style scoped>
.head {
  margin-top: 7px;
  border: 1px solid #e9e9e9;
  margin-left: 20px;
  margin-right: 5px;
  margin-bottom: 10px;
}

.head:hover {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  border-color: transparent;
}

.head-surface {
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
}

.head-to {
  margin-left: 20px;
}

.head-examine {
  margin-left: 30px;
}

/* 调整输入框的高度 */
::v-deep .el-input__inner {
  height: 32px;
}

.bottom {
  margin-left: 20px;
  margin-top: 20px;
  margin-right: 5px;
  margin-bottom: 10px;
  padding: 1%;
}

.demo-pagination-block {
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 5px;
}

/* 计薪月份 */
.month_span {
  font-weight: bold;
  font-size: 30px;
}
</style>