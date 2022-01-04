<template>
  <!--  加班审批页面-->
  <div class="body_1">
    <el-tabs type="border-card">
      <!-- 待办申请页面 -->
      <el-tab-pane label="待办申请">
        <el-button @click="resetDateFilter1">重置日期过滤</el-button>
        &nbsp;
        <el-input
            v-model="tableData.staffName1"
            placeholder="输入名称搜索"
            style="width: 130px"
        />
        &nbsp;
        <el-button type="success" plain @click="selectAuditflow()">搜索</el-button>
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
              @size-change="selectAuditflow()"
              @current-change="selectAuditflow()"
              @prev-click="selectAuditflow()"
              @next-click="selectAuditflow()">
            prev-text="上一页"
            next-text="下一页"
            >
            <!--  @size-change="selectUsers" @current-change="selectUsers" -->
          </el-pagination>
        </div>
      </el-tab-pane>
      <!-- 点击详情，弹出抽屉-->
      <el-drawer v-model="drawer" title="I am the title" :with-header="false">
        <el-form ref="form" :model="details">
          <el-form-item label="标题">
            <el-input v-model="details[0].auditflowTitle" disabled></el-input>
          </el-form-item>
          <el-form-item label="申请人">
            <el-input v-model="details[0].staffName1" disabled></el-input>
          </el-form-item>
          <el-form-item label="申请状态">
            <el-input v-model="details[0].auditflowdetaiState" disabled></el-input>
          </el-form-item>
          <el-form-item label="加班类型">
            <el-input v-model="details[0].overtimeaskType" disabled></el-input>
          </el-form-item>
          <el-form-item label="加班事由">
            <el-input v-model="details[0].overtimeaskmatter" disabled></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="details[0].overtimeaskremarks" disabled></el-input>
          </el-form-item>
          <el-form-item label="加班开始时间">
            <el-input v-model="details[0].overtimeaskSDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="加班结束时间">
            <el-input v-model="details[0].overtimeaskEDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="加班总时长">
            <el-input v-model="details[0].overtimeasktotaldate" disabled></el-input>
          </el-form-item>
          <el-form-item label="审批人">
            <el-input v-model="details[0].staffName2" disabled></el-input>
          </el-form-item>
          <el-form-item label="审批备注">
            <el-input v-model="details[0].auditflowdetai_remarks" disabled></el-input>
          </el-form-item>
          <el-form-item label="审核时间">
            <el-input v-model="details[0].auditflowdetaiDate" disabled></el-input>
          </el-form-item>
        </el-form>
      </el-drawer>
      <!-- 已办申请页面 -->
      <el-tab-pane label="已办申请" @click="selectEndAuditflow()">
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
          <el-table-column label="状态" width="100">
            <template #default="scope">
              <span class="button-await" v-if="scope.row.auditflowstate===0">待审</span>
              <span class="button-pass" v-if="scope.row.auditflowstate===1">通过</span>
              <span class="button-reject" v-if="scope.row.auditflowstate===2">驳回</span>
            </template>
          </el-table-column>
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
          <el-pagination v-model:current-page="pageInfo1.currentPage"
                         v-model:page-size="pageInfo1.pagesize"
                         :default-page-size="pageInfo1.pagesize"
                         :page-sizes="[3,6,9,12]"
                         :pager-count="5"
                         :total="pageInfo1.total"
                         background
                         layout="	total ,sizes, prev, pager, next, jumper"
                         next-text="下一页"
                         prev-text="上一页"
                         @size-change="selectEndAuditflow()"
                         @current-change="selectEndAuditflow()"
                         @prev-click="selectEndAuditflow()"
                         @next-click="selectEndAuditflow()">
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
      input: ref(""),
    };
  },
  data() {
    return {
      drawer: false,
      //访问路径
      url: "http://localhost:80/",
      // 待办加班审批列表
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
      // 详情抽屉表单
      details: {
        //审批标题
        auditflowtitle: "",
        //申请人
        staffName1: "",
        //审核状态
        auditflowdetaiState: "",
        //加班类型
        overtimeaskType: "",
        //加班事由
        overtimeaskmatter: "",
        // 备注
        overtimeaskremarks: "",
        //加班开始时间
        overtimeaskSDate: "",
        //加班结束时间
        overtimeaskEDate: "",
        //加班总小时
        overtimeasktotaldate: "",
        // 审核人
        staffName2: "",
        //审核时间
        auditflowdetaiDate: "",
        // 审核备注
        auditflowdetai_remarks: "",
      }
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
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectAuditflow',
        data: {
          //当前页
          "currentPage": this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          //申请人名称
          "staff_name": this.tableData.staffName1,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }) .then((response) => {
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
      }).catch(function (error) {
            console.log("失败")
            console.log(error);
          });
    },
    // 查询已办审批加班数据
    selectEndAuditflow() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectEnddAuditflow',
        data: {
          //当前页
          "currentPage": this.pageInfo1.currentPage,
          //页大小
          "pagesize": this.pageInfo1.pagesize,
          //申请人名称
          "staff_name": this.tableData1.staffName1,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("查询已办审批加班数据")
        console.log(response)
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
        } else if (response.data.data) {
          if (response.data.data.state == 200) {
            _this.tableData1 = response.data.data.info.records;
            this.pageInfo1.pagesize = response.data.data.info.size;
            this.pageInfo1.total = response.data.data.info.total;
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        }
      })
          .catch(function (error) {
            console.log("失败")
            console.log(error);
          });
    },
    particulars(value) {
      console.log(value.id)
      console.log(value.name1)
      console.log(value.name2)
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectDetailsAuditflow',
        data: {
          //审批编号
          "auditflowId": value.id,
          //申请人
          "staffName1": value.name1,
          //审批人
          "staffName2": value.name2,
        }, responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.drawer = true;
        console.log("查询已审批加班数据详情");
        console.log(response)
        this.details = response.data.data.info;

      })
          .catch(function (error) {
            console.log("查询已审批加班数据详情失败")
            console.log(error);
          });
    }
  },
  // 挂载
  created() {
    // 查询待处理的加班审批
    this.selectAuditflow();
    // 查询已处理的加班审批
    this.selectEndAuditflow();
  }
};
</script>

<style scoped>
@import url("../../css/Examine_2.css");
</style>
