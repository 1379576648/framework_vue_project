<template>
  <!--  加班审批页面-->
  <div class="body_1">
    <el-tabs type="border-card">
      <!-- 待办申请页面 -->
      <el-tab-pane label="待办申请">
        <el-button @click="resetDateFilter1">重置日期过滤</el-button>
        &nbsp;
        <el-input
            v-model="input"
            placeholder="输入名称搜索"
            style="width: 130px"
        />
        &nbsp;
        <el-button type="success" plain>搜索</el-button>
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
              :filters="[
              { text: '2016-05-01', value: '2016-05-01' },
              { text: '2016-05-02', value: '2016-05-02' },
              { text: '2016-05-03', value: '2016-05-03' },
              { text: '2016-05-04', value: '2016-05-04' },
            ]"
              :filter-method="filterHandler"
          />
          <el-table-column prop="auditflowId" label="审批编号" width="100"/>
          <el-table-column prop="auditflowType" label="流程" width="100"/>
          <el-table-column prop="staffName1" label="申请人" width="150"/>
          <el-table-column prop="auditflowState" label="状态" width="100"/>
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
                  @confirm="through1()"
              >
                <template #reference>
                  <el-button type="success" plain>通过</el-button>
                </template>
              </el-popconfirm>
              <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  :icon="InfoFilled"
                  icon-color="red"
                  title="确定驳回吗?"
                  @confirm="through2()"
              >
                <template #reference>
                  <el-button type="danger" plain>驳回</el-button>
                </template>
              </el-popconfirm>
              <el-button
                  type="primary"
                  style="margin-left: 16px"
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
              @current-change="selectUser()"
              @size-change="selectUser"
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
            :data="tableData1"
            style="width: 100%"
        >
          <el-table-column
              prop="createdTime"
              label="日期"
              sortable
              width="140"
              column-key="date1"
              :filters="[
              { text: '2016-05-01', value: '2016-05-01' },
              { text: '2016-05-02', value: '2016-05-02' },
              { text: '2016-05-03', value: '2016-05-03' },
              { text: '2016-05-04', value: '2016-05-04' },
            ]"
              :filter-method="filterHandler"
          />
          <el-table-column prop="auditflowId" label="审批编号" width="100"/>
          <el-table-column prop="auditflowType" label="流程" width="100"/>
          <el-table-column prop="staffName1" label="申请人" width="150"/>
          <el-table-column prop="auditflowState" label="状态" width="100"/>
          <el-table-column prop="staffName2" label="历史审批人" width="150"/>
          <el-table-column prop="updatedTime" label="最近处理" width="150"/>
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
              v-model:currentPage="pageInfo1.currentPage"
              :page-sizes="[3, 5, 10, 50]"
              v-model:page-size="pageInfo1.pagesize"
              :default-page-size="pageInfo1.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo1.total"
              :pager-count="5"
              background
              @current-change="selectEndUser()"
              @size-change="selectEndUser"
          >
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
import {ElMessage, ElNotification} from "element-plus";

export default {
  setup() {
    return {
      drawer: ref(false),
      input: ref(""),
    };
  },
  data() {
    return {
      // 待办加班审批列表
      tableData: [
        {
          date: "",
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
      // 已办转正审批列表
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
      // 待处理分页
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },
      // 已处理分页
      pageInfo1: {
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
    // 查询待审批加班数据
    selectAuditflow() {
      this.axios
          .get("http://localhost:80/selectAuditflow", {
            params: this.pageInfo,
          })
          .then((response) => {
            console.log("查询待审批加班数据");
            console.log(response);
            console.log(response.data.data.info)
            if (response.data.data.info === "服务发生关闭") {
              ElNotification({
                title: '服务发生关闭',
                message: '服务发生关闭，请稍后再试，或联系管理员',
                type: 'error',
              })
              this.$router.push('/beginIndex/faceLogin');
            }
            this.tableData = response.data.succeed.records;
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);
          });
    },
    // 分页待审批加班数据
    selectUser() {
      var _this = this;
      this.axios
          .get("http://localhost:80/selectAuditflow", {
            params: this.pageInfo,
          })
          .then(function (response) {
            console.log("分页查询数据");
            console.log(response);
            _this.tableData = response.data.succeed.records;
            _this.pageInfo.pagesize = response.data.succeed.size;
            _this.pageInfo.total = response.data.succeed.total;
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    // 查询已处理的加班审批
    selectEndAuditflow() {
      this.axios
          .get("http://localhost:80/selectEndAuditflow", {
            params: this.pageInfo,
          })
          .then((response) => {
            console.log("查询已审批加班数据");
            console.log(response);
            this.tableData1 = response.data.succeed.records;
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);
          });
    },
    // 分页已审批加班数据
    selectEndUser() {
      var _this = this;
      this.axios
          .get("http://localhost:80/selectEndAuditflow", {
            params: this.pageInfo,
          })
          .then(function (response) {
            console.log("分页查询已处理的加班数据");
            console.log(response);
            _this.tableData = response.data.succeed.records;
            _this.pageInfo1.pagesize = response.data.succeed.size;
            _this.pageInfo1.total = response.data.succeed.total;
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  },
  // 挂载
  created() {
    // 查询待处理的加班审批
    this.selectAuditflow();
    // 分页查询待处理的加班审批
    this.selectUser();
    // 查询已处理的加班审批
    this.selectEndAuditflow();
    //分页查询已处理的加班审批
    this.selectEndUser();
  }
};
</script>

<style scoped>
@import url("../../css/Examine_2.css");
</style>
