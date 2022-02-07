<!--出差记录-->
<template>
  <!--  出差查询页面-->
  <div class="w">
    <div class="head">
      <el-button size="medium">
        <el-icon style="font-size: 18px">
          <i-upload/>
        </el-icon>
        导出
      </el-button>
      <el-button size="medium">
        <el-icon style="font-size: 18px">
          <i-folder-opened/>
        </el-icon>
        导入
      </el-button>
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
      <el-button type="success" plain @click="selectEvectionRecordAll()">搜索</el-button>

    </div>
    <!--表格-->
    <div class="y">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="staffName" label="申请名称"/>
        <el-table-column prop="deptName" label="发起人部门"/>
        <el-table-column prop="travelPlace" label="出差地点"/>
        <el-table-column prop="travelMatter" label="出差事由"/>
        <el-table-column prop="travelSDate" label="计划开始时间"/>
        <el-table-column prop="travelEDate" label="计划结束时间"/>
        <el-table-column prop="travelTotalDate" label="计划时长"/>
        <el-table-column prop="travelActualTime" label="实际开始时间"/>
        <el-table-column prop="travelActualOvertime" label="实际结束时间"/>
        <el-table-column prop="travelActualTokinaga" label="实际时长"/>
        <el-table-column prop="operate" label="操作">
          <template #default="scope">
            <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                :icon="InfoFilled"
                icon-color="red"
                title="确定删除吗?"
                @confirm=deleteEvection(travelId)
            >
              <template #reference>
                <el-button type="text" size="small" style="color:darkorange"
                           @click="(travelId=scope.row.travelId)"
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
      // 选择开始日期/结束日期
      selectTime: [],
      //选择时间
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
      //查询出差数据
      tableData: [],
      value: ref(""), //选择
    };
  },
  methods: {
    // 根据员工名称查询出差
    selectEvectionRecordAll() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'selectEvectionRecordAll',
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
        console.log("查询出差记录");
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
          } else {
            ElNotification.warning({
              title: '提示',
              message: "查询出差记录有误，请联系管理员",
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
    // 删除出差记录
    deleteEvection() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'deleteEvection',
        data: {
          "travelId": this.travelId,
        }
      }).then((response) => {
        console.log("删除出差记录");
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
            if (response.data.data.info = 1) {
              ElMessage({
                showClose: true,
                message: '删除成功',
                type: 'success',
              })
              this.selectEvectionRecordAll();
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "删除出差记录有误，请联系管理员",
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
  },
  created() {
    // 根据员工名称查询出差
    this.selectEvectionRecordAll();
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
  margin-left: 850px;
  margin-top: 20px;
  margin-bottom: 30px;
}

</style>

