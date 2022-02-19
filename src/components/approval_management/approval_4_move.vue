<template>
  <!--  调动审批页面-->
  <div class="body_1">
    <el-tabs type="border-card">
      <!-- 待办申请页面 -->
      <el-tab-pane label="待办申请">
        <el-button @click="selectTransferAll2()">重置</el-button>
        &nbsp;
        <el-input
            v-model="staffName"
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
        <el-button type="success" plain @click="selectTransferAll()">搜索</el-button>
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
              <el-button type="success" plain
                         @click="(auditflowId=scope.row.auditflowId,auditflowType=scope.row.auditflowType,StaffName=scope.row.staffName1),
                         queryDetail(auditflowId,handle='通过',auditflowType,StaffName)">
                通过
              </el-button>
              <el-button type="danger" plain
                         @click="(auditflowId=scope.row.auditflowId,auditflowType=scope.row.auditflowType,StaffName=scope.row.staffName1),
                         queryDetail(auditflowId,handle='驳回',auditflowType,StaffName)">
                驳回
              </el-button>
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
              @size-change="selectTransferAll()"
              @current-change="selectTransferAll()"
              @prev-click="selectTransferAll()"
              @next-click="selectTransferAll()">
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
          <el-form-item label="标题：">
            <el-input v-model="details[0].auditflowTitle" disabled></el-input>
          </el-form-item>
          <el-form-item label="申请人：">
            <el-input v-model="details[0].staffName1" disabled></el-input>
          </el-form-item>
          <el-form-item label="异动类型：">
            <el-input v-model="details[0].transfertype" disabled></el-input>
          </el-form-item>
          <el-form-item label="原部门名称：">
            <el-input v-model="details[0].createddeptname" disabled></el-input>
          </el-form-item>
          <el-form-item label="变动后部门名称：">
            <el-input v-model="details[0].updateddeptname" disabled></el-input>
          </el-form-item>
          <el-form-item label="生效日期：">
            <el-input v-model="details[0].takeeffectdate" disabled></el-input>
          </el-form-item>
          <el-form-item label="当前审核状态：">
            <el-input v-if="details[0].auditflowdetaiState===0" v-model="state.ongoing" disabled></el-input>
            <el-input v-if="details[0].auditflowdetaiState===1" v-model="state.approval" disabled></el-input>
            <el-input v-if="details[0].auditflowdetaiState===2" v-model="state.through" disabled></el-input>
            <el-input v-if="details[0].auditflowdetaiState===3" v-model="state.rejected" disabled></el-input>
          </el-form-item>
          <el-form-item label="申请状态：">
            <el-input v-if="details[0].auditflowstate===0" v-model="state.pending" disabled></el-input>
            <el-input v-if="details[0].auditflowstate===1" v-model="state.through" disabled></el-input>
            <el-input v-if="details[0].auditflowstate===2" v-model="state.rejected" disabled></el-input>
            <el-input v-if="details[0].auditflowstate===3" v-model="state.undo" disabled></el-input>
          </el-form-item>
          <el-form-item label="审批人：">
            <el-input v-model="details[0].staffName2" disabled></el-input>
          </el-form-item>
          <el-form-item label="审批备注：">
            <el-input v-model="details[0].auditflowdetaiRemarks" disabled></el-input>
          </el-form-item>
          <el-form-item label="审核时间：">
            <el-input v-model="details[0].auditflowdetaiDate" disabled></el-input>
          </el-form-item>
        </el-form>
      </el-drawer>
      <!-- 已办申请页面 -->
      <el-tab-pane label="已办申请">
        <el-button @click="selectEndTransferAll2()">重置</el-button>
        &nbsp;
        <el-input
            v-model="staffName1"
            placeholder="根据申请人搜索"
            style="width: 130px"
        />
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
        <el-button type="success" plain @click="selectEndTransferAll()">搜索</el-button>
        <el-table
            ref="filterTable"
            row-key="date"
            :data="tableData1"
            style="width: 100%"
        >
          <el-table-column fixed :index="indexMethod2" align="center" label="序号" type="index" min-width="100"/>
          <el-table-column
              prop="createdTime"
              label="日期"
              sortable
              width="140"
              column-key="date1"
          />
          <!--          <el-table-column prop="auditflowId" label="审批编号" width="100"/>-->
          <el-table-column prop="auditflowType" label="流程" width="100"/>
          <el-table-column prop="staffName1" label="申请人" width="150"/>
          <el-table-column label="状态" width="100">
            <template #default="scope">
              <span class="button-await" v-if="scope.row.auditflowstate===0">待审</span>
              <span class="button-pass" v-if="scope.row.auditflowstate===1">通过</span>
              <span class="button-reject" v-if="scope.row.auditflowstate===2">驳回</span>
              <span class="button-underway" v-if="scope.row.auditflowstate===3">撤销</span>
            </template>
          </el-table-column>
          <el-table-column prop="staffName2" label="历史审批人" width="150"/>
          <el-table-column prop="updatedTime" label="最近处理" width="150"/>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                  type="primary"
                  style="margin-left: 5px"
                  @click="
                  (value2 = {
                    id: scope.row.auditflowId,
                    name1: scope.row.staffName1,
                    name2: scope.row.staffName2,
                    }),
                   particulars2(value2)"
              >
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 点击详情，弹出抽屉-->
        <el-drawer v-model="drawer2" title="I am the title" :with-header="false">
          <el-form ref="form" :model="details2">
            <el-form-item label="标题：">
              <el-input v-model="details2[0].auditflowTitle" disabled></el-input>
            </el-form-item>
            <el-form-item label="申请人：">
              <el-input v-model="details2[0].staffName1" disabled></el-input>
            </el-form-item>
            <el-form-item label="异动类型：">
              <el-input v-model="details2[0].transfertype" disabled></el-input>
            </el-form-item>
            <el-form-item label="原部门名称：">
              <el-input v-model="details2[0].createddeptname" disabled></el-input>
            </el-form-item>
            <el-form-item label="变动后部门名称：">
              <el-input v-model="details2[0].updateddeptname" disabled></el-input>
            </el-form-item>
            <el-form-item label="生效日期：">
              <el-input v-model="details2[0].takeeffectdate" disabled></el-input>
            </el-form-item>
            <el-form-item label="当前审核状态：">
              <el-input v-if="details2[0].auditflowdetaiState===0" v-model="state.ongoing" disabled></el-input>
              <el-input v-if="details2[0].auditflowdetaiState===1" v-model="state.approval" disabled></el-input>
              <el-input v-if="details2[0].auditflowdetaiState===2" v-model="state.through" disabled></el-input>
              <el-input v-if="details2[0].auditflowdetaiState===3" v-model="state.rejected" disabled></el-input>
              <el-input v-if="details2[0].auditflowdetaiState===4" v-model="state.undo" disabled></el-input>
            </el-form-item>
            <el-form-item label="申请状态：">
              <el-input v-if="details2[0].auditflowstate===0" v-model="state.pending" disabled></el-input>
              <el-input v-if="details2[0].auditflowstate===1" v-model="state.through" disabled></el-input>
              <el-input v-if="details2[0].auditflowstate===2" v-model="state.rejected" disabled></el-input>
              <el-input v-if="details2[0].auditflowstate===3" v-model="state.undo" disabled></el-input>
            </el-form-item>
            <el-form-item label="审批人：">
              <el-input v-model="details2[0].staffName2" disabled></el-input>
            </el-form-item>
            <el-form-item label="审批备注：">
              <el-input v-model="details2[0].auditflowdetaiRemarks" disabled></el-input>
            </el-form-item>
            <el-form-item label="审核时间：">
              <el-input v-model="details2[0].auditflowdetaiDate" disabled></el-input>
            </el-form-item>
          </el-form>
        </el-drawer>
        <!-- 分页插件 -->
        <div class="demo-pagination-block">
          <el-pagination v-model:current-page="pageInfo1.currentPage"
                         v-model:page-size="pageInfo1.pagesize"
                         :default-page-size="pageInfo1.pagesize"
                         :page-sizes="[1,3,5,7]"
                         :pager-count="5"
                         :total="pageInfo1.total"
                         background
                         layout="	total ,sizes, prev, pager, next, jumper"
                         next-text="下一页"
                         prev-text="上一页"
                         @size-change="selectEndTransferAll()"
                         @current-change="selectEndTransferAll()"
                         @prev-click="selectEndTransferAll()"
                         @next-click="selectEndTransferAll()">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  <!-- 添加通过备注弹出框(适用最后一个审批人)-->
  <el-dialog
      v-model="add_pass_remark2"
      title="添加该记录的通过备注"
      width="30%"
      :close-on-click-modal=false
      :show-close=false
  >
    <template #footer>
      <el-form :model="formInline" class="demo-form-inline">
        <el-input :rows="2" maxlength="50" show-word-limit type="textarea" v-model="remark"></el-input>
        &nbsp;
        <el-form-item>
          <el-button type="primary" @click="pass_overtime2()"
          >确定
          </el-button
          >
          <el-button @click="add_pass_remark2=false,remark=''">取消</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
  <!-- 添加通过备注弹出框(适用查到两个审批人或三个审批人)-->
  <el-dialog
      v-model="add_pass_remark1"
      title="添加该记录的通过备注11111"
      width="30%"
      :close-on-click-modal=false
      :show-close=false
  >
    <template #footer>
      <el-form :model="formInline" class="demo-form-inline">
        <el-input :rows="2" maxlength="50" show-word-limit type="textarea" v-model="remark"></el-input>
        &nbsp;
        <el-form-item>
          <el-button type="primary" @click="pass_overtime()"
          >确定
          </el-button
          >
          <el-button @click="add_pass_remark1=false,remark=''">取消</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>

  <!-- 添加驳回备注弹出框 (适用查到三个审批人)-->
  <el-dialog
      v-model="add_reject_remark1"
      title="添加该记录的驳回备注"
      width="30%"
      :close-on-click-modal=false
      :show-close=false
  >
    <template #footer>
      <el-form :model="formInline" class="demo-form-inline">
        <el-input :rows="2" maxlength="50" show-word-limit type="textarea" v-model="remark"></el-input>
        &nbsp;
        <el-form-item>
          <el-button type="primary" @click="reject_overtime()"
          >确定
          </el-button
          >
          <el-button @click="add_reject_remark1=false,remark=''">取消</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
  <!-- 添加驳回备注弹出框 (适用查到两个审批人)-->
  <el-dialog
      v-model="add_reject_remark2"
      title="添加该记录的驳回备注"
      width="30%"
      :close-on-click-modal=false
      :show-close=false
  >
    <template #footer>
      <el-form :model="formInline" class="demo-form-inline">
        <el-input :rows="2" maxlength="50" show-word-limit type="textarea" v-model="remark"></el-input>
        &nbsp;
        <el-form-item>
          <el-button type="primary" @click="reject_overtime2()"
          >确定
          </el-button
          >
          <el-button @click="add_reject_remark2=false,remark=''">取消</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
  <!-- 添加驳回备注弹出框 (适用查到一个审批人)-->
  <el-dialog
      v-model="add_reject_remark3"
      title="添加该记录的驳回备注"
      width="30%"
      :close-on-click-modal=false
      :show-close=false
  >
    <template #footer>
      <el-form :model="formInline" class="demo-form-inline">
        <el-input :rows="2" maxlength="50" show-word-limit type="textarea" v-model="remark"></el-input>
        &nbsp;
        <el-form-item>
          <el-button type="primary" @click="reject_overtime3()"
          >确定
          </el-button
          >
          <el-button @click="add_reject_remark3=false,remark=''">取消</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>

</template>

<script>
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
      // 审批明细编号
      serialID: [],
      // 审批主表编号
      auditflowId: "",
      // 审批流程
      auditflowType: "",
      // 当前登录者
      NowStaffName: this.$store.state.staffMessage.staffName,
      // 添加通过备注弹出框(适用查到两个审批人或三个审批人)
      add_pass_remark1: false,
      // 添加通过备注弹出框(适用查到一个审批人)
      add_pass_remark2: false,

      // 添加驳回备注弹出框 (适用查到三个审批人)
      add_reject_remark1: false,
      // 添加驳回备注弹出框(适用查到两个审批人)
      add_reject_remark2: false,
      // 添加驳回备注弹出框(适用查到一个审批人)
      add_reject_remark3: false,
      // 详情抽屉1
      drawer: false,
      // 详情抽屉2
      drawer2: false,
      // 选择开始日期/结束日期
      selectTime: [],
      // 选择开始日期/结束日期
      selectTime2: [],
      // 待审批查询申请人
      StaffName: "",
      // 待审批查询申请人
      staffName: "",
      // 已审批查询申请人
      staffName1: "",
      // 通过时备注
      remark: "",
      //访问路径
      url: "http://localhost:80/",
      // 待办异动审批列表
      tableData: [],
      // 已办转正审批列表
      tableData1: [],
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
        //审批状态
        auditflowstate: "",
        // 异动类型
        transfertype: "",
        // 原部门名称
        createddeptname: "",
        //变动后部门名称
        updateddeptname: "",
        // 生效日期
        takeeffectdate: "",
        // 审核人
        staffName2: "",
        //审核时间
        auditflowdetaiDate: "",
        // 审核备注
        auditflowdetaiRemarks: "",
      },
      // 详情抽屉表单
      details2: {
        //审批标题
        auditflowtitle: "",
        //申请人
        staffName1: "",
        //审核状态
        auditflowdetaiState: "",
        //审批状态
        auditflowstate: "",
        // 异动类型
        transfertype: "",
        // 原部门名称
        createddeptname: "",
        //变动后部门名称
        updateddeptname: "",
        // 生效日期
        takeeffectdate: "",
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
        ongoing: "审批中",
        approval: "待我审批",
      },
      // 审批明细表状态
      state1: {
        auditflowdetailId: ""
      }
    };
  },
  methods: {
    // 查询待审批异动数据
    selectTransferAll() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectTransferAll',
        data: {
          //当前页
          "currentPage": this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          //申请人名称
          "staffName1": this.staffName,
          // 审批人名称
          "staffName2": this.NowStaffName,
          //起始时间
          "startTime": this.selectTime == null ? null : this.selectTime[0],
          //结束时间
          "endTime": this.selectTime == null ? null : this.selectTime[1],
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("查询待审批异动数据");
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              this.tableData = response.data.data.info.records;
              this.pageInfo.pagesize = response.data.data.info.size;
              this.pageInfo.total = response.data.data.info.total;
              this.$store.commit("updateToken", response.data.data.token);
            } else {
              ElNotification.error({
                title: '提示',
                message: "查询待审批异动数据失败",
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
    // 查询待审批异动数据-不带数据
    selectTransferAll2() {
      this.staffName = "";
      this.selectTime = "";
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectTransferAll',
        data: {
          //当前页
          "currentPage": this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          // 审批人名称
          "staffName2": this.NowStaffName,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("查询待审批异动数据");
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              this.tableData = response.data.data.info.records;
              this.pageInfo.pagesize = response.data.data.info.size;
              this.pageInfo.total = response.data.data.info.total;
              this.$store.commit("updateToken", response.data.data.token);
            } else {
              ElNotification.error({
                title: '提示',
                message: "查询待审批异动数据失败",
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
    // 查询已办审批异动数据
    selectEndTransferAll() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectEndTransferAll',
        data: {
          //当前页
          "currentPage": this.pageInfo1.currentPage,
          //页大小
          "pagesize": this.pageInfo1.pagesize,
          //申请人名称
          "staffName1": this.staffName1,
          // 审批人名称
          "staffName2": this.NowStaffName,
          //起始时间
          "startTime": this.selectTime2[0],
          //结束时间
          "endTime": this.selectTime2[1],
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("查询已办审批异动数据")
        console.log(response)
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              _this.tableData1 = response.data.data.info.records;
              this.pageInfo1.pagesize = response.data.data.info.size;
              this.pageInfo1.total = response.data.data.info.total;
              this.$store.commit("updateToken", response.data.data.token);
            } else {
              ElNotification.error({
                title: '提示',
                message: "查询已办审批异动数据失败",
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
    // 查询已办审批异动数据-不带数据
    selectEndTransferAll2() {
      this.staffName1 = "";
      this.selectTime2 = "";
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectEndTransferAll',
        data: {
          //当前页
          "currentPage": this.pageInfo1.currentPage,
          //页大小
          "pagesize": this.pageInfo1.pagesize,
          // 审批人名称
          "staffName2": this.NowStaffName,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("查询已办审批异动数据")
        console.log(response)
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              _this.tableData1 = response.data.data.info.records;
              this.pageInfo1.pagesize = response.data.data.info.size;
              this.pageInfo1.total = response.data.data.info.total;
              this.$store.commit("updateToken", response.data.data.token);
            } else {
              ElNotification.error({
                title: '提示',
                message: "查询已办审批异动数据失败",
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
    // 待我审批的异动数据详情
    particulars(value) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectDetailsTransfer',
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
        console.log("查询已审批异动数据详情");
        console.log(response)
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              this.details = response.data.data.info;
              this.$store.commit("updateToken", response.data.data.token);
            } else {
              ElNotification.error({
                title: '提示',
                message: "查询已审批异动数据详情失败",
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
    // 已审批的异动数据详情
    particulars2(value2) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectDetailsTransfer',
        data: {
          //审批编号
          "auditflowId": value2.id,
          //申请人
          "staffName1": value2.name1,
          //审批人
          "staffName2": value2.name2,
        }, responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.drawer2 = true;
        console.log("查询已审批异动数据详情");
        console.log(response)
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              this.details2 = response.data.data.info;
              this.$store.commit("updateToken", response.data.data.token);
            } else {
              ElNotification.error({
                title: '提示',
                message: "查询已审批异动数据详情失败",
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
    // 根据审批编号查询审批明细表编号
    queryDetail(auditflowId, handle) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'queryDetail',
        data: {
          //审批编号
          "auditflowId": auditflowId,
        }, responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("根据审批编号查询审批明细表编号成功")
        console.log(response)
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              // 当查询只有一个明细编号时，说明是最后一个审批人
              if (response.data.data.info.length === 1) {
                this.serialID = response.data.data.info[0]
                this.auditflowId = auditflowId
                if (handle === '通过') {
                  this.add_pass_remark2 = true;
                } else if (handle === '驳回') {
                  this.add_reject_remark3 = true;
                }
                // 当查询有两个明细编号时，说明还有下一个审批人
              } else if (response.data.data.info.length === 2) {
                this.serialID = response.data.data.info
                this.auditflowId = auditflowId
                if (handle === '通过') {
                  this.add_pass_remark1 = true;
                } else if (handle === '驳回') {
                  this.add_reject_remark2 = true;
                }
                // 当查询有三个明细编号时，说明还有两个审批人
              } else if (response.data.data.info.length === 3) {
                this.serialID = response.data.data.info
                this.auditflowId = auditflowId
                if (handle === '通过') {
                  this.add_pass_remark1 = true;
                } else if (handle === '驳回') {
                  this.add_reject_remark1 = true;
                }
                this.$store.commit("updateToken", response.data.data.token);
              } else {
                ElNotification.error({
                  title: '提示',
                  message: "数据有误，请联系管理员",
                  offset: 100,
                })
              }
            } else {
              ElNotification.error({
                title: '提示',
                message: "查询审批明细表编号失败",
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
    // 备注弹出框点击确定 通过当前审批 (两三个审批人)
    pass_overtime() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'update_Approval_State',
        data: {
          auditflowdetailId: this.serialID[0].auditflowdetailId,
          auditflowdetailId2: this.serialID[1].auditflowdetailId,
          auditflowdetaiRemarks: this.remark,
          auditflowId: this.auditflowId,
          // 审批申请人
          staffName1: this.StaffName,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("修改状态")
        console.log(response)
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              if (response.data.data.info === 666) {
                ElMessage({
                  showClose: true,
                  message: '操作成功',
                  type: 'success',
                })
                // 查询待处理的异动审批
                this.selectTransferAll();
                // 查询已处理的异动审批
                this.selectEndTransferAll();
                this.add_pass_remark1 = false;
                this.remark = "";
                this.$store.commit("updateToken", response.data.data.token);
              } else if (response.data.data.info === "999") {
                ElMessage({
                  showClose: true,
                  message: '操作失败',
                  type: 'success',
                })
                this.add_pass_remark1 = false;
                this.remark = "";
              } else {
                ElNotification.error({
                  title: '提示',
                  message: "数据有误",
                  offset: 100,
                })
                this.add_pass_remark1 = false;
                this.remark = "";
              }
            } else {
              ElNotification.error({
                title: '提示',
                message: "通过当前审批失败",
                offset: 100,
              })
              this.add_pass_remark1 = false;
              this.remark = "";
            }
          }
        } else {
          ElNotification.error({
            title: '提示',
            message: response.data.message,
            offset: 100,
          })
          this.add_pass_remark1 = false;
          this.remark = "";
        }
      })
    },
    // 备注弹出框点击确定 通过当前审批 (一个审批人)
    pass_overtime2() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'update_Approval_State',
        data: {
          // 明细编号
          auditflowdetailId: this.serialID.auditflowdetailId,
          // 备注
          auditflowdetaiRemarks: this.remark,
          // 审批主表编号
          auditflowId: this.auditflowId,
          // 审批类型（流程名称）
          auditflowType: this.auditflowType,
          // 审批申请人
          staffName1: this.StaffName,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("修改状态")
        console.log(response)
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              if (response.data.data.info === 666) {
                ElMessage({
                  showClose: true,
                  message: '操作成功',
                  type: 'success',
                })
                // 查询待处理的异动审批
                this.selectTransferAll();
                // 查询已处理的异动审批
                this.selectEndTransferAll();
                this.add_pass_remark2 = false;
                this.remark = "";
                this.$store.commit("updateToken", response.data.data.token);
              } else if (response.data.data.info === "999") {
                ElMessage({
                  showClose: true,
                  message: '操作失败',
                  type: 'success',
                })
                this.add_pass_remark2 = false;
                this.remark = "";
              } else {
                ElNotification.error({
                  title: '提示',
                  message: "数据有误",
                  offset: 100,
                })
                this.add_pass_remark2 = false;
                this.remark = "";
              }
            } else {
              ElNotification.error({
                title: '提示',
                message: "通过当前审批失败",
                offset: 100,
              })
              this.add_pass_remark2 = false;
              this.remark = "";
            }
          }
        } else {
          ElNotification.error({
            title: '提示',
            message: response.data.message,
            offset: 100,
          })
          this.add_pass_remark2 = false;
          this.remark = "";
        }
      })
    },
    // 备注弹出框点击确定 驳回当前审批 (三个审批人)
    reject_overtime() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'reject_Approval_State',
        data: {
          auditflowdetailId: this.serialID[0].auditflowdetailId,
          auditflowdetailId2: this.serialID[1].auditflowdetailId,
          auditflowdetailId3: this.serialID[2].auditflowdetailId,
          auditflowId: this.auditflowId,
          auditflowdetaiRemarks: this.remark,
          // 审批类型（流程名称）
          auditflowType: this.auditflowType,
          // 审批申请人
          staffName1: this.StaffName,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("驳回该审批")
        console.log(response)
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              if (response.data.data.info === 666) {
                ElMessage({
                  showClose: true,
                  message: '驳回成功',
                  type: 'success',
                })
                // 查询待处理的异动审批
                this.selectTransferAll();
                // 查询已处理的异动审批
                this.selectEndTransferAll();
                this.add_reject_remark1 = false;
                this.remark = "";
                this.$store.commit("updateToken", response.data.data.token);
              } else if (response.data.data.info === "999") {
                ElMessage({
                  showClose: true,
                  message: '驳回失败',
                  type: 'success',
                })
                this.add_reject_remark1 = false;
                this.remark = "";
              } else {
                ElNotification.warning({
                  title: '提示',
                  message: "数据有误",
                  offset: 100,
                })
                this.add_reject_remark1 = false;
                this.remark = "";
              }
            } else {
              ElNotification.error({
                title: '提示',
                message: "驳回该审批失败",
                offset: 100,
              })
              this.add_reject_remark1 = false;
              this.remark = "";
            }
          }
        } else {
          ElNotification.error({
            title: '提示',
            message: response.data.message,
            offset: 100,
          })
          this.add_reject_remark1 = false;
          this.remark = "";
        }
      })
    },
    // 备注弹出框点击确定 驳回当前审批 (两个审批人)
    reject_overtime2() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'reject_Approval_State',
        data: {
          auditflowdetailId: this.serialID[0].auditflowdetailId,
          auditflowdetailId2: this.serialID[1].auditflowdetailId,
          auditflowId: this.auditflowId,
          auditflowdetaiRemarks: this.remark,
          // 审批类型（流程名称）
          auditflowType: this.auditflowType,
          // 审批申请人
          staffName1: this.StaffName,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("驳回该审批")
        console.log(response)
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              if (response.data.data.info === 666) {
                ElMessage({
                  showClose: true,
                  message: '驳回成功',
                  type: 'success',
                })
                // 查询待处理的异动审批
                this.selectTransferAll();
                // 查询已处理的异动审批
                this.selectEndTransferAll();
                this.add_reject_remark2 = false;
                this.remark = "";
                this.$store.commit("updateToken", response.data.data.token);
              } else if (response.data.data.info === "999") {
                ElMessage({
                  showClose: true,
                  message: '驳回失败',
                  type: 'success',
                })
                this.add_reject_remark2 = false;
                this.remark = "";
              } else {
                ElNotification.warning({
                  title: '提示',
                  message: "数据有误",
                  offset: 100,
                })
                this.add_reject_remark2 = false;
                this.remark = "";
              }
            } else {
              ElNotification.error({
                title: '提示',
                message: "驳回该审批失败",
                offset: 100,
              })
              this.add_reject_remark2 = false;
              this.remark = "";
            }
          }
        } else {
          ElNotification.error({
            title: '提示',
            message: response.data.message,
            offset: 100,
          })
          this.add_reject_remark2 = false;
          this.remark = "";
        }
      })
    },
    // 备注弹出框点击确定 驳回当前审批 (一个审批人)
    reject_overtime3() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'reject_Approval_State',
        data: {
          auditflowdetailId: this.serialID.auditflowdetailId,
          auditflowId: this.auditflowId,
          auditflowdetaiRemarks: this.remark,
          // 审批类型（流程名称）
          auditflowType: this.auditflowType,
          // 审批申请人
          staffName1: this.StaffName,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("驳回该审批")
        console.log(response)
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              if (response.data.data.info === 666) {
                ElMessage({
                  showClose: true,
                  message: '驳回成功',
                  type: 'success',
                })
                // 查询待处理的异动审批
                this.selectTransferAll();
                // 查询已处理的异动审批
                this.selectEndTransferAll();
                this.add_reject_remark3 = false;
                this.remark = "";
                this.$store.commit("updateToken", response.data.data.token);
              } else if (response.data.data.info === "999") {
                ElMessage({
                  showClose: true,
                  message: '驳回失败',
                  type: 'success',
                })
                this.add_reject_remark3 = false;
                this.remark = "";
              } else {
                ElNotification.warning({
                  title: '提示',
                  message: "数据有误",
                  offset: 100,
                })
                this.add_reject_remark3 = false;
                this.remark = "";
              }
            } else {
              ElNotification.error({
                title: '提示',
                message: "驳回该审批失败",
                offset: 100,
              })
              this.add_reject_remark3 = false;
              this.remark = "";
            }
          }
        } else {
          ElNotification.error({
            title: '提示',
            message: response.data.message,
            offset: 100,
          })
          this.add_reject_remark3 = false;
          this.remark = "";
        }
      })
    },
    //序号1
    indexMethod(index) {
      let curpage = this.pageInfo.currentPage; //单前页码，具体看组件取值
      let limitpage = this.pageInfo.pagesize; //每页条数，具体是组件取值
      return index + 1 + (curpage - 1) * limitpage;
    },
    //序号2
    indexMethod2(index) {
      let curpage = this.pageInfo1.currentPage; //单前页码，具体看组件取值
      let limitpage = this.pageInfo1.pagesize; //每页条数，具体是组件取值
      return index + 1 + (curpage - 1) * limitpage;
    },
  },
  // 挂载
  created() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    // 查询待处理的异动审批
    this.selectTransferAll();
    // 查询已处理的异动审批
    this.selectEndTransferAll();
  }
};
</script>

<style scoped>
@import url("../../css/Examine_2.css");
</style>
