<template>
  <!--  请假审批页面 -->
  <div class="body_1">
    <el-tabs type="border-card">
      <!-- 待办申请页面 -->
      <el-tab-pane label="待办申请">
        <el-button @click="selectleaveData2()">重置</el-button>
        &nbsp;
        <el-input
            v-model="tableData.staffName1"
            placeholder="根据申请人搜索"
            style="width: 130px"
        />
        &nbsp;
        <el-date-picker
            v-model="selectTime"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-value="[new Date, new Date]"
        >
        </el-date-picker>
        &nbsp;
        <el-button type="success" plain @click="selectleaveData()">搜索</el-button>
        <!--  表格 -->
        <el-table
            ref="filterTable1"
            row-key="date1"
            :data="tableData"
            style="width: 100%"
        >
          <el-table-column
              prop="createdTime"
              label="日期"
              sortable
              width="140"
              column-key="date1"
          />
          <el-table-column fixed :index="indexMethod" align="center" label="序号" type="index" min-width="100"/>
          <!--          <el-table-column prop="auditflowId" label="审批编号" width="100"/>-->
          <el-table-column prop="auditflowType" label="流程" width="100"/>
          <el-table-column prop="staffName1" label="申请人" width="150"/>
          <el-table-column label="状态" width="100">
            <template #default="scope">
              <span class="button-underway" v-if="scope.row.auditflowdetaiState===0">审批中</span>
              <span class="button-await" v-if="scope.row.auditflowdetaiState===1">待我审批</span>
              <span class="button-pass" v-if="scope.row.auditflowdetaiState===2">通过</span>
              <span class="button-reject" v-if="scope.row.auditflowdetaiState===3">驳回</span>
            </template>
          </el-table-column>
          <el-table-column prop="staffName2" label="当前审批人" width="150"/>
          <el-table-column prop="updatedTime" label="最近处理" width="150"/>
          <el-table-column label="操作">
            <template #default="scope">
              <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  :icon="InfoFilled"
                  icon-color="red"
                  title="确定通过吗?"
                  @confirm="(id ={
                    auditflowdetailId1:state1[0].auditflowdetailId,
                    auditflowdetailId2:state1[1].auditflowdetailId,
                    auditflowdetailId3:state1[2].auditflowdetailId,
                  }),through_approval(id)"
              >
                <template #reference>
                  <el-button type="success" plain @click="(auditflowId=scope.row.auditflowId),queryDetail(auditflowId)">
                    通过
                  </el-button>
                </template>
              </el-popconfirm>
              <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  :icon="InfoFilled"
                  icon-color="red"
                  title="确定驳回吗?"
                  @confirm="(id ={
                    auditflowdetailId1:state1[0].auditflowdetailId,
                    auditflowdetailId2:state1[1].auditflowdetailId,
                    auditflowdetailId3:state1[2].auditflowdetailId,
                    auditflowId:scope.row.auditflowId
                  }),rejected_apply(id)"
              >
                <template #reference>
                  <el-button type="danger" plain @click="(auditflowId=scope.row.auditflowId),queryDetail(auditflowId)">
                    驳回
                  </el-button>
                </template>
              </el-popconfirm>
              <el-button
                  type="primary"
                  style="margin-left: 16px"
                  @click="
                  (value = {
                    id: scope.row.auditflowId,
                    name1: scope.row.staffName1,
                    name2: scope.row.staffName2,
                    }),
                   particulars(value)"
              >
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页插件 -->
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
              @size-change="selectleaveData()"
              @current-change="selectleaveData()"
              @prev-click="selectleaveData()"
              @next-click="selectleaveData()">
            prev-text="上一页"
            next-text="下一页"
            >
            <!--  @size-change="selectUsers" @current-change="selectUsers" -->
          </el-pagination>
        </div>
      </el-tab-pane>
      <!-- 点击详情，弹出抽屉-->
      <el-drawer v-model="drawer" title="I am the title" :with-header="false">
        <span>Hi there!</span>
      </el-drawer>
      <!-- 已办申请页面 -->
      <el-tab-pane label="已办申请">
        <el-button @click="resetDateFilter">重置日期过滤</el-button>
        &nbsp;
        <el-input
            v-model="input"
            placeholder="输入名称搜索nima"
            style="width: 130px"
        />
        &nbsp;
        <el-button type="success" plain>搜索</el-button>

        <el-table
            ref="filterTable"
            row-key="date"
            :data="tableData"
            style="width: 100%"
        >
          <el-table-column
              prop="date"
              label="日期"
              sortable
              width="140"
              column-key="date"
              :filters="[
              { text: '2016-05-01', value: '2016-05-01' },
              { text: '2016-05-02', value: '2016-05-02' },
              { text: '2016-05-03', value: '2016-05-03' },
              { text: '2016-05-04', value: '2016-05-04' },
            ]"
              :filter-method="filterHandler"
          />
          <el-table-column prop="AUDITFLOW_ID" label="审批编号" width="100"/>
          <el-table-column prop="AUDITFLOW_TYPE" label="流程" width="100"/>
          <el-table-column prop="STAFF_ID" label="申请人" width="150"/>
          <!-- <el-table-column prop="name" label="操作人" width="100" /> -->
          <el-table-column prop="AUDITFLOW_STATE" label="状态" width="100"/>
          <el-table-column prop="STAFF_NAME" label="历史审批人" width="150"/>
          <el-table-column prop="UPDATED_TIME" label="最近处理" width="140"/>

          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                  type="primary"
                  style="margin-left: 5px"
                  @click="drawer = true"
              >
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页插件 -->
        <div class="demo-pagination-block">
          <el-pagination
              v-model:currentPage="pageInfo.currentPage"
              :page-sizes="[3, 5, 10, 50]"
              v-model:page-size="pageInfo.pagesize"
              :default-page-size="pageInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo.total"
              :pager-count="5"
              background
          >
            <!--  @size-change="selectUsers"
						@current-change="selectUsers" -->
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  Search,
  Edit,
  Check,
  Message,
  Star,
  Delete,
} from "@element-plus/icons";
import {defineComponent, ref} from "vue";
import {ElNotification} from "element-plus";

export default {
  setup() {
    return {
      drawer: ref(false),
      input: ref(""),
    };
  },
  data() {
    return {
      //访问路径
      url: "http://localhost:80/",
      // 选择开始日期/结束日期
      selectTime: [],
      // 待办请假审批列表
      tableData: [
        {
          date: "",
          //加班编号
          AUDITFLOW_ID: "",
          //类型
          AUDITFLOW_TYPE: "",
          //申请人（员工名称）
          staffName1: "",
          //加班状态
          AUDITFLOW_STATE: "",
          //加班人
          STAFF_NAME: "",
          //最近处理
          UPDATED_TIME: "",
        },
      ],
      // 已办请假审批列表
      tableData1: [
        {
          date1: "",
          //加班编号
          AUDITFLOW_ID: "",
          //类型
          AUDITFLOW_TYPE: "",
          //申请人（员工名称）
          STAFF_ID: "",
          //加班状态
          AUDITFLOW_STATE: "",
          //加班人
          STAFF_NAME: "",
          //最近处理
          UPDATED_TIME: "",
        },
      ],
      // 分页
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },
    };
  },
  methods: {
    // 重置日期过滤
    resetDateFilter1() {
      this.$refs.filterTable1.clearFilter("date1");
    },
    // 重置日期过滤
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    // 筛选
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // 点击通过确认按钮触发
    through1() {
      alert(1)
    },
    // 点击驳回确认按钮触发
    through2() {
      alert(1)
    },
    // 查询待处理的请假审批
    selectleaveData() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectLeaveAll',
        data: {
          //当前页
          "currentPage": this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          //申请人名称
          "staffName1": this.tableData.staffName1,
          //起始时间
          "startTime": this.selectTime[0],
          //结束时间
          "endTime": this.selectTime[1],
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("查询待审批加班数据");
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
            this.pageInfo.pagesize = response.data.data.info.size;
            this.pageInfo.total = response.data.data.info.total;
          }
        } else {
          ElNotification.warning({
            title: '提示',
            message: "服务发生雪崩",
            offset: 100,
          })
        }
      })
          .catch(function (error) {
            console.log("失败")
            console.log(error);
          });
    },
    // 查询待处理的请假审批 --不带数据
    selectleaveData2() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectLeaveAll',
        data: {
          //当前页
          "currentPage": this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("查询待审批加班数据");
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
            this.pageInfo.pagesize = response.data.data.info.size;
            this.pageInfo.total = response.data.data.info.total;
          }
        } else {
          ElNotification.warning({
            title: '提示',
            message: "服务发生雪崩",
            offset: 100,
          })
        }
      })
          .catch(function (error) {
            console.log("失败")
            console.log(error);
          });
    },
    // 序号
    indexMethod(index) {
      let curpage = this.pageInfo.currentPage; //单前页码，具体看组件取值
      let limitpage = this.pageInfo.pagesize; //每页条数，具体是组件取值
      return index + 1 + (curpage - 1) * limitpage;
    },
  },
  // 挂载
  created() {
    // 查询待处理的请假审批
    this.selectleaveData();
  }
};
</script>

<style scoped>
@import url("../../css/Examine_2.css");
</style>
