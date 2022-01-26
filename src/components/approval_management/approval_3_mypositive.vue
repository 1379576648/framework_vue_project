<template>
  <!--  我的转正申请页面-->
  <div class="body_1">
    <el-tabs type="border-card">
      <!-- 转正—待审批     -->
      <el-tab-pane label="待审批">
        <el-button @click="selectMyWorker1()">重置</el-button>
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
        <el-button type="success" plain @click="selectMyWorker()">搜索</el-button>
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
              <span class="button-await" v-if="scope.row.auditflowstate===0">待审批</span>
            </template>
          </el-table-column>
          <el-table-column prop="staffName2" label="当前审批人" width="150"/>
          <el-table-column prop="updatedTime" label="最近处理" width="150"/>
          <el-table-column label="操作">
            <template #default="scope">
              <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  title="确定要撤销吗?"
                  @confirm=revocation(auditflowId)
              >
                <template #reference>
                  <el-button type="success" plain
                             @click="(auditflowId=scope.row.auditflowId)">
                    撤销
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
                    }),
                   selectDetailsWorker(value)"
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
              @size-change="selectMyWorker()"
              @current-change="selectMyWorker()"
              @prev-click="selectMyWorker()"
              @next-click="selectMyWorker()">
            prev-text="上一页"
            next-text="下一页"
            >
            <!--  @size-change="selectUsers" @current-change="selectUsers" -->
          </el-pagination>
        </div>
      </el-tab-pane>
      <!-- 转正—已审批 -->
      <el-tab-pane label="已审批">
        <el-button @click="selectMyEndWorker1()">重置</el-button>
        &nbsp;
        <el-date-picker
            v-model="selectTime2"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-value="[new Date, new Date]"
        >
        </el-date-picker>
        &nbsp;
        <el-button type="success" plain @click="selectMyEndWorker()">搜索</el-button>
        <!--  表格 -->
        <el-table
            ref="filterTable1"
            row-key="date1"
            :data="tableData1"
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
              <span class="button-await" v-if="scope.row.auditflowstate===0">待审批</span>
              <span class="button-pass" v-if="scope.row.auditflowstate===1">通过</span>
              <span class="button-reject" v-if="scope.row.auditflowstate===2">驳回</span>
              <span class="button-underway" v-if="scope.row.auditflowstate===3">撤销</span>
            </template>
          </el-table-column>
          <el-table-column prop="staffName2" label="最后审批人" width="150"/>
          <el-table-column prop="updatedTime" label="最近处理" width="150"/>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                  type="primary"
                  style="margin-left: 16px"
                  @click="
                  (value = {
                    id: scope.row.auditflowId,
                    name1: scope.row.staffName1,
                    }),
                   selectDetailsWorker(value)"
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
              @size-change="selectMyEndWorker()"
              @current-change="selectMyEndWorker()"
              @prev-click="selectMyEndWorker()"
              @next-click="selectMyEndWorker()">
            prev-text="上一页"
            next-text="下一页"
            >
            <!--  @size-change="selectUsers" @current-change="selectUsers" -->
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 点击详情，弹出抽屉-->
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <el-form ref="form" :model="details" v-for="item in details1">

        <el-form-item label="标题：">
          <el-input v-model="item.auditFlowTitle" disabled></el-input>
        </el-form-item>
        <el-form-item label="申请人：">
          <el-input v-model="item.staffName1" disabled></el-input>
        </el-form-item>
        <el-form-item label="当前审核状态：">
          <el-input v-model="item.auditFlowDeTaiState" disabled></el-input>
        </el-form-item>
        <el-form-item label="审批人：">
          <el-input v-model="item.staffName2" disabled></el-input>
        </el-form-item>
        <el-form-item label="申请状态：">
          <el-input v-model="item.auditFlowState" disabled></el-input>
        </el-form-item>
        <el-form-item label="审核时间：">
          <el-input v-model="item.auditFlowDeTaiDate" disabled></el-input>
        </el-form-item>
        <el-form-item label="审核备注：">
          <el-input v-model="item.cardRemarks" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>

  {{ tableData1 }}

</template>

<script scoped>
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
      // 当前登录者
      NowStaffName: this.$store.state.staffMessage.staffName,
      // 我的审批列表 待审批
      tableData: [],
      tableData1: [],
      // 选择开始日期/结束日期
      selectTime: [],
      // 选择开始日期/结束日期
      selectTime2: [],
      // 总裁名称
      president: "",
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },
      // 详情抽屉表单
      details: {
        //审批标题
        auditflowTitle: "",
        //申请人
        staffName1: "",
        //审核状态
        auditflowdetaiState: "",
        //审批状态
        auditflowstate: "",
        // 审核人
        staffName2: "",
        //审核时间
        auditflowdetaiDate: "",
        // 审核备注
        auditflowdetaiRemarks: "",
      },
      // 状态
      state: {
        pending: "待审",
        through: "通过",
        rejected: "驳回",
        undo: "撤销",
        undo1: "被撤销",
        ongoing: "审批中",
        approval: "待审批",
      },
      details1: [],
    };
  },
  methods: {
    // 查询审批数据详情
    selectDetailsWorker(value) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectDetailsWorker',
        data: {
          //审批编号
          "auditflowId": value.id,
          //申请人
          "staffName1": value.name1,
        }, responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.drawer = true;
        console.log("查询审批数据详情");
        console.log(response)
        if (response.data.data.data) {
          ElNotification.error({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state === 200) {
            if (response.data.data.info != null) {
              // this.details = response.data.data.info;
              // 初始化
              this.details1 = [];
              // 循环审批数据详情
              for (let i = 0; i < response.data.data.info.length; i++) {
                this.details1.push({
                  // 审批标题
                  auditFlowTitle: response.data.data.info[i].auditflowTitle,
                  // 审核时间
                  auditFlowDeTaiDate: response.data.data.info[i].auditflowdetaiDate,
                  // 审核备注
                  auditFlowDeTaiRemarks: response.data.data.info[i].auditflowdetaiRemarks,
                  // 审核状态
                  auditFlowDeTaiState: response.data.data.info[i].auditflowdetaiState,
                  // 申请状态
                  auditFlowState: response.data.data.info[i].auditflowstate,
                  // 申请人
                  staffName1: response.data.data.info[i].staffName1,
                  // 审批人
                  staffName2: response.data.data.info[i].staffName2,
                  // 审核备注
                  cardRemarks: response.data.data.info[i].cardremarks,
                })
              }
            }
          } else if (response.data.data.state === 300) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
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
    // 撤销审批
    revocation() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'revocation',
        data: {
          auditflowId: this.auditflowId,
        }
      }).then((response) => {
        console.log("撤销审批成功")
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
          //如果服务没有关闭
        } else if (response.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            ElNotification.warning({
              title: '提示',
              message: "撤销成功",
              type: 'success',
            })
            // 查询我的调薪审批申请 待处理
            this.selectMyWorker();
            // 查询总裁
            this.selectpresident();
          } else {
            ElNotification.warning({
              title: '提示',
              message: "系统繁忙，请稍后再试",
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
    // 查询总裁
    selectpresident() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectpresident',
      }).then((response) => {
        console.log("查询总裁成功")
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
          //如果服务没有关闭
        } else if (response.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            _this.president = response.data.data.info;
            window.setTimeout(this.selectMyEndWorker, 500);
          } else {
            ElNotification.warning({
              title: '提示',
              message: "系统繁忙，请稍后再试",
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
    // 查询我的转正审批申请 待处理
    selectMyWorker() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectMyWorker',
        data: {
          //当前页
          "currentPage": this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          //当前登录者
          "staffName1": this.NowStaffName,
          //起始时间
          "startTime": this.selectTime == null ? null : this.selectTime[0],
          //结束时间
          "endTime": this.selectTime == null ? null : this.selectTime[1],
          // 审批类型
          "auditflowType": "转正"
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("查询我的转正申请-待处理");
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
    },
    // 查询我的转正审批申请 待处理 不带数据
    selectMyWorker1() {
      this.selectTime = "";
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectMyWorker',
        data: {
          //当前页
          "currentPage": this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          //当前登录者
          "staffName1": this.NowStaffName,
          // 审批类型
          "auditflowType": "转正"
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("查询我的转正申请-待处理");
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
    },
    // 查询我的转正审批申请 已处理
    selectMyEndWorker() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectMyEndWorker',
        data: {
          //当前页
          "currentPage": this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          //当前登录者
          "staffName1": this.NowStaffName,
          // 总裁
          "staffName2": this.president[1].staffname,
          //起始时间
          "startTime": this.selectTime2 == null ? null : this.selectTime2[0],
          //结束时间
          "endTime": this.selectTime2 == null ? null : this.selectTime2[1],
          // 审批类型
          "auditflowType": "转正"
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("查询我的转正申请-已处理");
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
            this.tableData1 = response.data.data.info.records;
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
    },
    // 查询我的转正审批申请 已处理 -不带数据
    selectMyEndWorker1() {
      this.selectTime = "";
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectMyEndWorker',
        data: {
          //当前页
          "currentPage": this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          //当前登录者
          "staffName1": this.NowStaffName,
          // 总裁
          "staffName2": this.president[1].staffname,
          // 审批类型
          "auditflowType": "转正"
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("查询我的转正申请-已处理");
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
            this.tableData1 = response.data.data.info.records;
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
    },
  },
// 挂载
  created() {
    // 查询总裁
    this.selectpresident();
    // 查询我的转正审批申请 待处理
    this.selectMyWorker();
  }
}
;
</script>

<style scoped>
@import url("../../css/Examine_2.css");

</style>
