<!--考勤月报表-->
<template>
  <!-- 月份报表页面 -->
  <div class="head">
    <div class="head-surface">
      <span>{{ this.$parent.$data.archiveName }}</span>
      <span style="margin-left: 28%;cursor: pointer" @click="this.$parent.$data.archive=false">
            <svg t="1641819317404" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="6044" width="40" height="40"><path
                d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512z m0-992a480 480 0 1 0 480 480A480 480 0 0 0 512 32z m16 527.616v63.824a32 32 0 0 1-49.744 26.544l-192-127.632a31.856 31.856 0 0 1 0-53.104l192-127.632A32 32 0 0 1 528 368.16V432a191.728 191.728 0 0 1 192 191.44 114.624 114.624 0 0 1-16 64.368c-30.896-73.92-93.264-128.112-176-128.192zM496 464v-90.496a45.552 45.552 0 0 0-22.576 4.592L323.2 477.024a22.752 22.752 0 0 0-11.696 19.728A26.08 26.08 0 0 0 323.2 518.4l150.224 92.432a51.328 51.328 0 0 0 22.576 5.6V528c183.472 0 208.32 122.784 208.32 122.784C704.32 505.6 592 464 496 464z"
                p-id="6045" fill="#2c2c2c"></path></svg>
          </span>
    </div>
    <div class="head-to">
      <el-tabs v-model="activeName">
        <el-tab-pane label="考勤报表" name="first"></el-tab-pane>
      </el-tabs>
    </div>
    <!--    搜索框-->
    <div class="head-examine">
      <el-input v-model="staffName" placeholder="根据员工名称搜索" style="width: 150px" clearable>
        <template>
          <el-icon style="margin-top: 13px; margin-right: 7px"
          >
            <i-search
            />
          </el-icon>
        </template>
      </el-input>
      &nbsp;
      <el-button @click="selectArchiveByNameAndIPage()">搜索</el-button>
      &nbsp;

    </div>
    <!--表格-->
    <div class="bottom">
      <el-table :data="tableData" stripe border style="width: 100%" height="320">
        <el-table-column prop="staffName" align="center" label="员工名称"/>
        <el-table-column prop="deptName" align="center" label="部门"/>
        <el-table-column prop="normalFrequency" align="center" label="正常"/>
        <el-table-column prop="lateFrequency" align="center" label="迟到"/>
        <el-table-column prop="leaveEarlyFrequency" align="center" label="早退"/>
        <el-table-column prop="absenteeismFrequency" align="center" label="旷工"/>
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
          v-model:page-size="pageInfo.pageSize"
          :default-page-size="pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          :pager-count="5"
          background
          next-text="下一页"
          prev-text="上一页"
          @size-change="selectArchiveByNameAndIPage()"
          @current-change="selectArchiveByNameAndIPage()"
          @prev-click="selectArchiveByNameAndIPage()"
          @next-click="selectArchiveByNameAndIPage()">
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
      // 搜索框部门名称
      staffName: "",
      activeName: "first",
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pageSize: 3,
        total: 0,
      },
      salaryMonth: "",
      tableData: [],
      tableDataTwo: [],
    };
  },
  methods: {
    // 根据归档名称查询对应的考勤归档记录
    selectArchiveByNameAndIPage() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectArchiveByNameAndIPage',
        data: {
          "archiveName": this.$parent.$data.archiveName,
          //当前页
          currentPage: this.pageInfo.currenPage,
          //页大小
          pageSize: this.pageInfo.pageSize,
          // 员工名称
          "staffName": this.staffName,
        },
      }).then((response) => {
        console.log("根据归档名称查询对应的考勤归档记录")
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              this.pageInfo.total = response.data.data.info.total;
              this.tableData = response.data.data.info.records;
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
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    // 根据归档名称查询对应的考勤归档记录
    this.selectArchiveByNameAndIPage();
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
</style>