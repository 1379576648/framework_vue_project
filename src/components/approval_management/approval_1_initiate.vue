<template>
  <!-- 发起审批流程的页面 -->
  <div class="body_1 ant-spin-nested-loading">
    <div class="ant-spin-containers">
      <!-- 人事 -->
      <div class="process-box" style="margin-top: 40px">
        <h2 class="big-title">人事</h2>
        <div class="link-list">

          <!-- 转正 -->
          <div
              title="转正"
              class="link-list-item"
              v-on:click="this.become_1.type_1 = '提前转正'"
          >
            <el-button
                type="text"
                @click="selectStaffState()"
                style="color: #606c82; font-size: 12px"
            >
              <img class="icon" src="../../assets/process_3.svg"/>
              <p class="link-text">转正</p>
            </el-button>
          </div>

          <!-- 调岗 -->
          <div
              title="调岗"
              class="link-list-item"
              v-on:click="this.Change_1.type_1 = '调岗'"
          >
            <el-button
                type="text"
                @click="selectTransferExamine(),variaTion()"
                style="color: #606c82; font-size: 12px"
            >
              <img class="icon" src="../../assets/process_4.svg"/>
              <p class="link-text">调岗</p>
            </el-button>
          </div>

          <!-- 调薪 -->
          <div title="调薪" class="link-list-item">
            <el-button
                type="text"
                @click="selectAdjustExamine(),selectPay()"
                style="color: #606c82; font-size: 12px"
            >
              <img class="icon" src="../../assets/process_5.svg"/>
              <p class="link-text">调薪</p>
            </el-button>
          </div>

          <!-- 离职 -->
          <div title="离职" class="link-list-item">
            <el-button
                type="text"
                @click="selectDimissionExamine()"
                style="color: #606c82; font-size: 12px"
            >
              <img class="icon" src="../../assets/process_6.svg"/>
              <p class="link-text">离职</p>
            </el-button>
          </div>
        </div>
      </div>
      <!-- 考勤 -->
      <div class="process-box">
        <h2 class="big-title">考勤</h2>
        <div class="link-list">
          <!-- 加班 -->
          <div title="加班" class="link-list-item">
            <el-button
                type="text"
                @click="selectOvertimeExamine()"
                style="color: #606c82; font-size: 12px"
            >
              <img class="icon" src="../../assets/process_18.svg"/>
              <p class="link-text">加班</p>
            </el-button>
          </div>

          <!-- 补打卡 -->
          <div title="补打卡" class="link-list-item">
            <el-button
                type="text"
                @click="selectCardExamine()"
                style="color: #606c82; font-size: 12px"
            >
              <img class="icon" src="../../assets/process_19.svg"/>
              <p class="link-text">补打卡</p>
            </el-button>
          </div>

          <!-- 出差 -->
          <div title="出差" class="link-list-item">
            <el-button
                type="text"
                @click="selectEvectionExamine()"
                style="color: #606c82; font-size: 12px"
            >
              <img class="icon" src="../../assets/process_21.svg"/>
              <p class="link-text">出差</p>
            </el-button>
          </div>
        </div>
      </div>
      <!-- 请假 -->
      <div class="process-box">
        <h2 class="big-title">请假</h2>
        <div class="link-list">
          <!-- 病假 -->
          <div
              title="病假"
              class="link-list-item"
              v-on:click="this.sick_1.type_1 = '病假'"
          >
            <el-button
                type="text"
                @click="selectLeaveExamine(type=this.sick_1.type_1 = '病假')"
                style="color: #606c82; font-size: 12px"
            >
              <img class="icon" src="../../assets/process_9.svg"/>
              <p class="link-text">病假</p>
            </el-button>
          </div>

          <!-- 事假 -->
          <div
              title="事假"
              class="link-list-item"
              v-on:click="this.sick_1.type_1 = '事假'"
          >
            <el-button
                type="text"
                @click="selectLeaveExamine(type=this.sick_1.type_1 = '事假')"
                style="color: #606c82; font-size: 12px"
            >
              <img class="icon" src="../../assets/process_10.svg"/>
              <p class="link-text">事假</p>
            </el-button>
          </div>

          <!-- 丧假 -->
          <div
              title="丧假"
              class="link-list-item"
              v-on:click="this.sick_1.type_1 = '丧假'"
          >
            <el-button
                type="text"
                @click="selectLeaveExamine(type=this.sick_1.type_1 = '丧假')"
                style="color: #606c82; font-size: 12px"
            >
              <img class="icon" src="../../assets/process_15.svg"/>
              <p class="link-text">丧假</p>
            </el-button>
          </div>

          <!-- 婚假 -->
          <div
              title="婚假"
              class="link-list-item"
              v-on:click="this.sick_1.type_1 = '婚假'"
          >
            <el-button
                type="text"
                @click="selectLeaveExamine(type=this.sick_1.type_1 = '婚假')"
                style="color: #606c82; font-size: 12px"
            >
              <img class="icon" src="../../assets/process_11.svg"/>
              <p class="link-text">婚假</p>
            </el-button>
          </div>

          <!-- 产假 -->
          <div
              title="产假"
              class="link-list-item"
              v-on:click="this.sick_1.type_1 = '产假'"
          >
            <el-button
                type="text"
                @click="selectLeaveExamine(type=this.sick_1.type_1 = '产假')"
                style="color: #606c82; font-size: 12px"
            >
              <img class="icon" src="../../assets/process_12.svg"/>
              <p class="link-text">产假</p>
            </el-button>
          </div>

          <!-- 工伤假 -->
          <div
              title="工伤假"
              class="link-list-item"
              v-on:click="this.sick_1.type_1 = '工伤假'"
          >
            <el-button
                type="text"
                @click="selectLeaveExamine(type=this.sick_1.type_1 = '工伤假')"
                style="color: #606c82; font-size: 12px"
            >
              <img class="icon" src="../../assets/process_16.svg"/>
              <p class="link-text">工伤假</p>
            </el-button>
          </div>
        </div>
      </div>

      <!-- 转正弹出框 -->
      <el-dialog
          v-model="become"
          title="转正"
          width="50%"
          :close-on-click-modal="false"
          @close="cancel_1"
      >
        <el-form ref="form_1" :model="become_1" label-width="120px">
          <el-form-item label="员工名称 :">
            <el-input v-model="NowStaffName" disabled></el-input>
          </el-form-item>
          <el-form-item label="部门名称 :">
            <el-input v-model="NowDeptName" disabled></el-input>
          </el-form-item>
          <el-form-item label="转正类型 :">
            <el-input v-model="become_1.type_1" disabled></el-input>
          </el-form-item>
          <el-form-item label="转正备注 :">
            <el-input
                v-model="become_1.remarks_1"
                type="textarea"
                maxlength="100"
                show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="申请转正日期 :">
            <el-date-picker
                v-model="become_1.date1"
                type="date"
                placeholder="选择时间"
                @change="difference7"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 审批人 -->
          <!-- 判断审批人是否相同 为0代表相同，则显示两个审批人 -->
          <el-form-item label="审批人 :"
                        v-if="this.judging === 0">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ personnel_manager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ president[1].staffname }}
                </div>
              </div>
            </el-col>
          </el-form-item>
          <!-- 判断审批人是否相同 为1代表不相同，则显示三个审批人 -->
          <el-form-item label="审批人 :"
                        v-if="this.judging === 1">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ NowManager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ personnel_manager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ president[1].staffname }}
                </div>
              </div>
            </el-col>
          </el-form-item>
        </el-form>
        <!-- 审批人不同 调用方法不同  -->
        <template #footer>
          <span class="dialog-footer">
              <el-button @click="cancel_1">取消</el-button>
            <!-- 判断为1，则代表审批人不相同，则去调用添加三个审批人的方法-->
            <el-button type="primary" @click="Submit_to_positive3(become_1)" v-if="this.judging === 1">
              确定
            </el-button>
            <!-- 判断为0，则代表审批人相同，则去调用添加两个审批人的方法-->
            <el-button type="primary" @click="Submit_to_positive2(become_1)" v-if="this.judging === 0">
              确定
            </el-button>
          </span>
        </template>


      </el-dialog>
      <!-- 调岗弹出框 -->
      <el-dialog
          v-model="Change"
          title="调岗"
          width="50%"
          :close-on-click-modal="false"
          @close="cancel_2"
      >
        <el-form ref="form_2" :model="Change_1" label-width="120px">
          <el-form-item label="员工名称">
            <el-input v-model="NowStaffName" disabled></el-input>
          </el-form-item>
          <el-form-item label="调岗类型">
            <el-input v-model="Change_1.type_1" disabled></el-input>
          </el-form-item>
          <el-form-item label="原部门">
            <el-input v-model="NowDeptName" disabled></el-input>
          </el-form-item>
          <el-form-item label="调岗后部门">
            <el-select v-model="Change_1.dept_1" placeholder="部门名称" @change="judgingDept">
              <el-option
                  v-for="item in variation_dept"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"

              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调动备注 :">
            <el-input
                v-model="Change_1.remarks_1"
                type="textarea"
                maxlength="100"
                show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="申请调动日期 :">
            <el-date-picker
                v-model="Change_1.date1"
                type="date"
                placeholder="选择时间"
                @change="difference7"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 审批人 -->
          <!-- 判断审批人是否相同 为0代表相同，则显示两个审批人 -->
          <el-form-item label="审批人 :"
                        v-if="this.judging === 0">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ personnel_manager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ president[1].staffname }}
                </div>
              </div>
            </el-col>
          </el-form-item>
          <!-- 判断审批人是否相同 为1代表不相同，则显示三个审批人 -->
          <el-form-item label="审批人 :"
                        v-if="this.judging === 1">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ NowManager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ personnel_manager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ president[1].staffname }}
                </div>
              </div>
            </el-col>
          </el-form-item>
        </el-form>
        <!-- 审批人不同 调用方法不同  -->
        <template #footer>
          <span class="dialog-footer">
             <el-button @click="cancel_2">取消</el-button>
            <!-- 判断为1，则代表审批人不相同，则去调用添加三个审批人的方法-->
            <el-button type="primary" @click="Submit_to_transfer3" v-if="this.judging === 1">
              确定
            </el-button>
            <!-- 判断为0，则代表审批人相同，则去调用添加两个审批人的方法-->
            <el-button type="primary" @click="Submit_to_transfer2" v-if="this.judging === 0">
              确定
            </el-button>
          </span>
        </template>

      </el-dialog>
      <!-- 调薪弹出框 -->
      <el-dialog
          v-model="salary"
          title="调薪"
          width="50%"
          :close-on-click-modal="false"
          @close="cancel_3"
      >
        <el-form ref="form" :model="salary_1" label-width="120px">
          <el-form-item label="员工名称">
            <el-input v-model="NowStaffName" disabled></el-input>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="NowDeptName" disabled></el-input>
          </el-form-item>
          <el-form-item label="调薪前基本工资">
            <el-input v-model="base_pay" disabled></el-input>
          </el-form-item>
          <el-form-item label="调薪后基本工资">
            <el-input-number :precision="2" :step="100" :max="30000" :min="0"
                             v-model="salary_1.hjbgz"
                             oninput="value.toString().match(/^\d+(?:\.\d{0,2})?/)"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="调薪备注">
            <el-input
                v-model="salary_1.remarks_1"
                type="textarea"
                maxlength="100"
                show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="期望调薪日期">
            <el-date-picker
                v-model="salary_1.date1"
                type="date"
                placeholder="选择日期"
                @change="difference6"
            ></el-date-picker>
          </el-form-item>
          <!-- 审批人 -->
          <!-- 判断审批人是否相同 为0代表相同，则显示两个审批人 -->
          <el-form-item label="审批人 :"
                        v-if="this.judging === 0">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ personnel_manager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ president[1].staffname }}
                </div>
              </div>
            </el-col>
          </el-form-item>
          <!-- 判断审批人是否相同 为1代表不相同，则显示三个审批人 -->
          <el-form-item label="审批人 :"
                        v-if="this.judging === 1">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ NowManager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ personnel_manager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ president[1].staffname }}
                </div>
              </div>
            </el-col>
          </el-form-item>
        </el-form>
        <!-- 审批人不同 调用方法不同  -->
        <template #footer>
          <span class="dialog-footer">
             <el-button @click="cancel_3">取消</el-button>
            <!-- 判断为1，则代表审批人不相同，则去调用添加三个审批人的方法-->
            <el-button type="primary" @click="Submit_to_salary3" v-if="this.judging === 1">
              确定
            </el-button>
            <!-- 判断为0，则代表审批人相同，则去调用添加两个审批人的方法-->
            <el-button type="primary" @click="Submit_to_salary2" v-if="this.judging === 0">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 离职弹出框 -->
      <el-dialog
          v-model="quit"
          title="离职"
          width="50%"
          :close-on-click-modal="false"
          @close="cancel_4"
      >
        <el-form ref="form" :model="quit_1" label-width="120px">
          <el-form-item label="员工名称">
            <el-input v-model="NowStaffName" disabled></el-input>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="NowDeptName" disabled></el-input>
          </el-form-item>
          <el-form-item label="离职原因">
            <el-select v-model="quit_1.type_1" placeholder="请选择离职原因">
              <el-option label="家庭原因" value="家庭原因"></el-option>
              <el-option label="实习生返校" value="实习生返校"></el-option>
              <el-option label="回校深造" value="回校深造"></el-option>
              <el-option label="交通不便" value="交通不便"></el-option>
              <el-option label="身体健康因素" value="身体健康因素"></el-option>
              <el-option
                  label="合同到期发起续签"
                  value="合同到期发起续签"
              ></el-option>
              <el-option label="薪资问题" value="薪资问题"></el-option>
              <el-option label="福利原因" value="福利原因"></el-option>
              <el-option label="个人发展原因" value="个人发展原因"></el-option>
              <el-option
                  label="人际关系不融洽"
                  value="人际关系不融洽"
              ></el-option>
              <el-option
                  label="工作环境不适应"
                  value="工作环境不适应"
              ></el-option>
              <el-option
                  label="团队气氛不适应"
                  value="团队气氛不适应"
              ></el-option>
              <el-option
                  label="企业文化不适应"
                  value="企业文化不适应"
              ></el-option>
              <el-option
                  label="工作职责及目标不明确"
                  value="工作职责及目标不明确"
              ></el-option>
              <el-option
                  label="未得到充分的支持和授权"
                  value="未得到充分的支持和授权"
              ></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="离职说明">
            <el-input
                v-model="quit_1.remarks_1"
                type="textarea"
                maxlength="100"
                show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="申请离职日期">
            <el-date-picker
                v-model="quit_1.date1"
                type="date"
                placeholder="选择日期"
                @change="difference5"
            ></el-date-picker>
          </el-form-item>
          <!-- 审批人 -->
          <!-- 判断审批人是否相同 为0代表相同，则显示两个审批人 -->
          <el-form-item label="审批人 :"
                        v-if="this.judging === 0">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ personnel_manager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ president[1].staffname }}
                </div>
              </div>
            </el-col>
          </el-form-item>
          <!-- 判断审批人是否相同 为1代表不相同，则显示三个审批人 -->
          <el-form-item label="审批人 :"
                        v-if="this.judging === 1">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ NowManager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ personnel_manager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ president[1].staffname }}
                </div>
              </div>
            </el-col>
          </el-form-item>
        </el-form>
        <!-- 审批人不同 调用方法不同  -->
        <template #footer>
          <span class="dialog-footer">
             <el-button @click="cancel_4">取消</el-button>
            <!-- 判断为1，则代表审批人不相同，则去调用添加三个审批人的方法-->
            <el-button type="primary" @click="submitToLeave3" v-if="this.judging === 1">
              确定
            </el-button>
            <!-- 判断为0，则代表审批人相同，则去调用添加两个审批人的方法-->
            <el-button type="primary" @click="submitToLeave2" v-if="this.judging === 0">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 加班弹出框 -->
      <el-dialog
          v-model="overtime"
          title="加班"
          width="50%"
          :close-on-click-modal="false"
          @close="cancel_5"
      >
        <el-form ref="form" :model="overtime_1" label-width="120px">
          <el-form-item label="员工名称">
            <el-input v-model="this.NowStaffName" disabled></el-input>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="NowDeptName" disabled></el-input>
          </el-form-item>
          <el-form-item label="加班类型">
            <el-select v-model="overtime_1.type_1" placeholder="选择类型">
              <el-option label="工作日加班" value="工作日加班"></el-option>
              <el-option label="休息日加班" value="休息日加班"></el-option>
              <el-option label="节假日加班" value="节假日加班"></el-option>
            </el-select>

          </el-form-item>
          <!-- 加班开始 -->
          <el-form-item label="加班开始时间">
            <el-date-picker
                v-model="overtime_1.date1"
                type="datetime"
                placeholder="选择时间"
                @change="difference1_1(overtime_1.date1)"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 加班结束 -->
          <el-form-item label="加班结束时间">
            <el-date-picker
                v-model="overtime_1.date2"
                type="datetime"
                placeholder="选择时间"
                @change="difference1_2(overtime_1.date1, overtime_1.date2)"
            >
            </el-date-picker>
          </el-form-item>
          <!--  加班总时长-->
          <el-form-item label="加班时长(小时)">
            <el-input v-model="overtime_1.date3" disabled></el-input>
          </el-form-item>
          <el-form-item label="加班事由">
            <el-input
                v-model="overtime_1.remarks_1"
                type="textarea"
                maxlength="100"
                show-word-limit
            ></el-input>
          </el-form-item>
          <!-- 审批人 -->
          <!-- 判断审批人是否相同 为0代表相同，则显示两个审批人 -->
          <el-form-item label="审批人 :"
                        v-if="this.judging === 0">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ personnel_manager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ president[1].staffname }}
                </div>
              </div>
            </el-col>
          </el-form-item>
          <!-- 判断审批人是否相同 为1代表不相同，则显示三个审批人 -->
          <el-form-item label="审批人 :"
                        v-if="this.judging === 1">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ NowManager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ personnel_manager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ president[1].staffname }}
                </div>
              </div>
            </el-col>
          </el-form-item>
        </el-form>
        <!-- 审批人不同 调用方法不同  -->
        <template #footer>
          <span class="dialog-footer">
             <el-button @click="cancel_5">取消</el-button>
            <!-- 判断为1，则代表审批人不相同，则去调用添加三个审批人的方法-->
            <el-button type="primary" @click="submitToOvertime3()" v-if="this.judging === 1">
              确定
            </el-button>
            <!-- 判断为0，则代表审批人相同，则去调用添加两个审批人的方法-->
            <el-button type="primary" @click="submitToOvertime2()" v-if="this.judging === 0">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 补打卡弹出框 -->
      <el-dialog
          v-model="punch"
          title="补打卡"
          width="50%"
          :close-on-click-modal="false"
          @close="cancel_6"
      >
        <el-form ref="form" :model="punch_1" label-width="120px">
          <el-form-item label="员工名称">
            <el-input v-model="NowStaffName" disabled></el-input>
          </el-form-item>
          <el-form-item label="补打卡类型">
            <el-select v-model="punch_1.type_1" placeholder="选择类型">
              <el-option label="未签到" value="未签到"></el-option>
              <el-option label="未签退" value="未签退"></el-option>
            </el-select>
          </el-form-item>
          <!-- 补打卡时间 -->
          <el-form-item label="实际打卡时间">
            <el-date-picker
                v-model="punch_1.date1"
                type="datetime"
                placeholder="选择时间"
                @change="difference4"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="补打卡备注">
            <el-input
                v-model="punch_1.remarks_1"
                type="textarea"
                maxlength="100"
                show-word-limit
            ></el-input>
          </el-form-item>
          <!-- 审批人 -->
          <!-- 判断审批人是否相同 为0代表相同，则显示两个审批人 -->
          <el-form-item label="审批人 :"
                        v-if="this.judging === 0">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ personnel_manager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ president[1].staffname }}
                </div>
              </div>
            </el-col>
          </el-form-item>
          <!-- 判断审批人是否相同 为1代表不相同，则显示三个审批人 -->
          <el-form-item label="审批人 :"
                        v-if="this.judging === 1">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ NowManager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ personnel_manager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ president[1].staffname }}
                </div>
              </div>
            </el-col>
          </el-form-item>
        </el-form>
        <!-- 审批人不同 调用方法不同  -->
        <template #footer>
          <span class="dialog-footer">
             <el-button @click="cancel_6">取消</el-button>
            <!-- 判断为1，则代表审批人不相同，则去调用添加三个审批人的方法-->
            <el-button type="primary" @click="submitToCard3()" v-if="this.judging === 1">
              确定
            </el-button>
            <!-- 判断为0，则代表审批人相同，则去调用添加两个审批人的方法-->
            <el-button type="primary" @click="submitToCard2()" v-if="this.judging === 0">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 出差弹出框 -->
      <el-dialog
          v-model="travel"
          title="出差"
          width="50%"
          :close-on-click-modal="false"
          @close="cancel_7"
      >
        <el-form ref="form" :model="travel_1" label-width="120px">
          <el-form-item label="员工名称">
            <el-input v-model="NowStaffName" disabled></el-input>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="NowDeptName" disabled></el-input>
          </el-form-item>
          <!-- 出差地址选择器 -->
          <el-form-item label="出差地址">
            <div>
              <div>
                <el-cascader
                    size="large"
                    :options="options"
                    v-model="travel_1.remarks_1"
                    @change="handleChange1"
                >
                </el-cascader>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="出差事由">
            <el-input
                v-model="travel_1.remarks_2"
                type="textarea"
                maxlength="100"
                show-word-limit
            ></el-input>
          </el-form-item>
          <!-- 出差开始时间 -->
          <el-form-item label="出差开始时间">
            <el-date-picker
                v-model="travel_1.date1"
                type="date"
                @change="difference2_1(travel_1.date1)"
                placeholder="选择时间"
            ></el-date-picker>
          </el-form-item>
          <!-- 出差结束时间 -->
          <el-form-item label="出差结束时间">
            <el-date-picker
                v-model="travel_1.date2"
                type="date"
                placeholder="选择时间"
                @change="difference2_2(travel_1.date1, travel_1.date2)"
            ></el-date-picker>
          </el-form-item>
          <!-- 出差总时长 -->
          <el-form-item label="请假总时长">
            <el-input v-model="travel_1.date3" disabled></el-input>
          </el-form-item>
          <!-- 审批人 -->
          <!-- 判断审批人是否相同 为0代表相同，则显示两个审批人 -->
          <el-form-item label="审批人 :"
                        v-if="this.judging === 0">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ personnel_manager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ president[1].staffname }}
                </div>
              </div>
            </el-col>
          </el-form-item>
          <!-- 判断审批人是否相同 为1代表不相同，则显示三个审批人 -->
          <el-form-item label="审批人 :"
                        v-if="this.judging === 1">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ NowManager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ personnel_manager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ president[1].staffname }}
                </div>
              </div>
            </el-col>
          </el-form-item>
        </el-form>
        <!-- 审批人不同 调用方法不同  -->
        <template #footer>
          <span class="dialog-footer">
             <el-button @click="cancel_7">取消</el-button>
            <!-- 判断为1，则代表审批人不相同，则去调用添加三个审批人的方法-->
            <el-button type="primary" @click="submitToTravel3()" v-if="this.judging === 1">
              确定
            </el-button>
            <!-- 判断为0，则代表审批人相同，则去调用添加两个审批人的方法-->
            <el-button type="primary" @click="submitToTravel2()" v-if="this.judging === 0">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 请假弹出框 -->
      <el-dialog
          v-model="sick"
          title="请假"
          width="50%"
          :close-on-click-modal="false"
          @close="cancel_8"
      >
        <el-form ref="form" :model="sick_1" label-width="120px">
          <el-form-item label="员工名称">
            <el-input v-model="NowStaffName" disabled></el-input>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="NowDeptName" disabled></el-input>
          </el-form-item>
          <el-form-item label="请假类型">
            <el-input v-model="sick_1.type_1" disabled></el-input>
          </el-form-item>
          <el-form-item label="请假事由">
            <el-input
                v-model="sick_1.remarks_1"
                type="textarea"
                maxlength="100"
                show-word-limit
            ></el-input>
          </el-form-item>
          <!-- 请假开始时间 -->
          <el-form-item label="请假开始时间">
            <el-col :span="11">
              <el-date-picker
                  v-model="sick_1.date1"
                  type="datetime"
                  placeholder="选择时间"
                  @change="difference3_1(sick_1.date1)"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <!-- 请假结束时间 -->
          <el-form-item label="请假结束时间">
            <el-col :span="11">
              <el-date-picker
                  v-model="sick_1.date2"
                  type="datetime"
                  placeholder="选择时间"
                  @change="difference3_2(sick_1.date1, sick_1.date2)"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <!-- 总时长 -->
          <el-form-item label="出差总时长">
            <el-input v-model="sick_1.date3" disabled></el-input>
          </el-form-item>
          <!-- 审批人 -->
          <!-- 判断审批人是否相同 为0代表相同，则显示两个审批人 -->
          <el-form-item label="审批人 :"
                        v-if="this.judging === 0">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ personnel_manager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ president[1].staffname }}
                </div>
              </div>
            </el-col>
          </el-form-item>
          <!-- 判断审批人是否相同 为1代表不相同，则显示三个审批人 -->
          <el-form-item label="审批人 :"
                        v-if="this.judging === 1">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ NowManager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ personnel_manager[0].staffname }}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  {{ president[1].staffname }}
                </div>
              </div>
            </el-col>
          </el-form-item>
        </el-form>
        <!-- 审批人不同 调用方法不同  -->
        <template #footer>
          <span class="dialog-footer">
             <el-button @click="cancel_8">取消</el-button>
            <!-- 判断为1，则代表审批人不相同，则去调用添加三个审批人的方法-->
            <el-button type="primary" @click="submitToAskForLeave3()" v-if="this.judging === 1">
              确定
            </el-button>
            <!-- 判断为0，则代表审批人相同，则去调用添加两个审批人的方法-->
            <el-button type="primary" @click="submitToAskForLeave2()" v-if="this.judging === 0">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="js">

import VDistpicker from 'v-distpicker'
import {defineComponent, reactive, ref, toRefs, withScopeId} from "vue";
import {ElMessage, ElNotification} from "element-plus";
import {regionData, CodeToText} from "element-china-area-data"; //地址选择器导入

export default defineComponent({
  components: {VDistpicker},
  data() {
    return {
      // 地址选择器 值
      address: "",
      //判断
      judging: "",
      //当前登录用户所在部门编号
      NowDeptId: this.$store.state.staffMessage.deptId,
      // 当前登录者
      NowStaffName: this.$store.state.staffMessage.staffName,
      // 当前登陆者ID
      staffid: this.$store.state.staffMessage.staffId,
      // 人事部经理名称(审批人2)
      personnel_manager: "",
      // 总裁名称(审批人3)
      president: "",
      // 根据当前部门编号查询其部门经理(审批人1)
      NowManager: "",
      // 当前登录者所在部门
      NowDeptName: "",
      // 调薪前基本工资
      base_pay: "",
      // 地址选择器
      options: regionData,
      // 地址选择器
      selectedOptions: [],
      //转正表单
      become_1: {
        type_1: "",
        remarks_1: "",
        date1: "",
      },
      //调岗表单
      Change_1: {
        //名称
        name: "",
        //类型
        type_1: "",
        //部门
        dept: "",
        //部门二
        dept_1: "",
        // 备注
        remarks_1: "",
        // 调动日期
        date1: "",
      },
      //调薪表单
      salary_1: {
        //名称
        name: "",
        //部门
        dept: "",
        //调薪后基本工资
        qjbgz: "",
        //调薪后基本工资
        hjbgz: "",
        //日期
        date1: "",
        //备注
        remarks_1: "",
      },
      //离职表单
      quit_1: {
        //名称
        name: "",
        //部门
        dept: "",
        //原因
        type_1: "",
        //备注
        remarks_1: "",
        //日期
        date1: "",
      },
      //加班表单
      overtime_1: {
        //名称
        name: "",
        //部门
        dept: "",
        //类型
        type_1: "",
        //开始时间
        date1: "",
        //结束时间
        date2: "",
        // 总时长
        date3: "",
        //备注
        remarks_1: "",
      },
      //补打卡表单
      punch_1: {
        //名称
        name: "",
        //类型
        type_1: "",
        //打卡时间
        date1: "",
        // 备注
        remarks_1: "",
      },
      //出差表单
      travel_1: {
        //名称
        name: "",
        //部门
        dept: "",
        //出差地点
        remarks_1: "",
        //出差事由
        remarks_2: "",
        //开始时间
        date1: "",
        //结束时间
        date2: "",
        //出差总时长
        date3: "",
      },
      //请假表单
      sick_1: {
        //名称
        name: "",
        //部门
        dept: "",
        //请假类型
        type_1: "",
        //请假事由
        remarks_1: "",
        //开始日期
        date1: "",
        //结束时间
        date2: "",
        //请假总时长
        date3: "",
      },
      // 调岗后查部门
      variation_dept: [],
    };
  },
  setup() {
    const dialogVisible = ref(false);
    // 弹出框
    const become = ref(false);
    const Change = ref(false);
    const salary = ref(false);
    const quit = ref(false);
    const overtime = ref(false);
    const punch = ref(false);
    const travel = ref(false);
    const sick = ref(false);
    // 审批人图标
    const state = reactive({
      circleUrl:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl:
          "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["large", "medium", "small"],
    });
    return {
      dialogVisible,
      Change,
      salary,
      quit,
      overtime,
      become,
      punch,
      travel,
      sick,
      ...toRefs(state),
      //访问路径
      url: "http://localhost:80/",
    };
  },
  methods: {
    // 提交转正 （提交三个审批人）
    Submit_to_positive3() {
      if (this.become_1.remarks_1.length === 0) {
        ElMessage("备注不能为空");
      } else if (this.become_1.date1.length === 0) {
        ElMessage("日期不能为空");
      } else {
        this.axios({
          method: 'post',
          url: this.url + 'SubmitPositive3',
          data: {
            // 申请人
            staffName: this.NowStaffName,
            // 部门名称
            deptname: this.NowDeptName,
            // 转正类型
            workertype: this.become_1.type_1,
            // 转正备注
            auditflowdetaiRemarks: this.become_1.remarks_1,
            // 转正日期
            workerdate: this.become_1.date1,
            // 审批人1
            staffName1: this.NowManager[0].staffname,
            // 审批人2
            staffName2: this.personnel_manager[0].staffname,
            // 审批人3
            staffName3: this.president[1].staffname,
            // 审批类型
            auditflowType: "转正",
            // 审批标题
            auditflowTitle: this.NowStaffName + "的" + this.become_1.type_1 + "审批" + Math.round(Math.random() * 100000000)
          }
        }).then((response) => {
          console.log("添加转正成功")
          console.log(response);
          if (response.data.code == 300) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data) {
            //如果服务是正常的
            if (response.data.code == 200 && response.data.data == 1111) {
              ElMessage({
                showClose: true,
                message: '操作成功，请等待审批结果',
                type: 'success',
              })
              this.become = false;
            } else {
              ElNotification.warning({
                title: '提示',
                message: "操作失败，请稍后再试",
                offset: 100,
              })
              this.become = false;
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        })
      }
    },
    // 提交转正 （提交两个审批人）
    Submit_to_positive2() {
      if (this.become_1.remarks_1.length === 0) {
        ElMessage("备注不能为空");
      } else if (this.become_1.date1.length === 0) {
        ElMessage("日期不能为空");
      } else {
        this.axios({
          method: 'post',
          url: this.url + 'SubmitPositive2',
          data: {
            // 申请人
            staffName: this.NowStaffName,
            // 部门名称
            deptname: this.NowDeptName,
            // 转正类型
            workertype: this.become_1.type_1,
            // 转正备注
            auditflowdetaiRemarks: this.become_1.remarks_1,
            // 转正日期
            workerdate: this.become_1.date1,
            // 审批人1
            staffName1: this.personnel_manager[0].staffname,
            // 审批人3
            staffName2: this.president[1].staffname,
            // 审批类型
            auditflowType: "转正",
            // 审批标题
            auditflowTitle: this.NowStaffName + "的" + this.become_1.type_1 + "审批" + Math.round(Math.random() * 100000000)
          }
        }).then((response) => {
          console.log("添加转正成功")
          console.log(response);
          if (response.data.code == 300) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data) {
            //如果服务是正常的
            if (response.data.code == 200 && response.data.data == 1111) {
              ElMessage({
                showClose: true,
                message: '操作成功，请等待审批结果',
                type: 'success',
              })
              this.become = false;
            } else {
              ElNotification.warning({
                title: '提示',
                message: "操作失败，请稍后再试",
                offset: 100,
              })
              this.become = false;
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        })
      }
    },
    // 提交调动 （提交三个审批人）
    Submit_to_transfer3() {
      if (this.Change_1.dept_1.length === 0) {
        ElMessage("请选择调岗后部门");
      } else if (this.Change_1.remarks_1.length === 0) {
        ElMessage("备注不能为空");
      } else if (this.Change_1.date1.length === 0) {
        ElMessage("调动日期不能为空");
      } else {
        this.axios({
          method: 'post',
          url: this.url + 'SubmitTransfer3',
          data: {
            // 申请人
            staffName: this.NowStaffName,
            // 调岗类型
            transferType: this.Change_1.type_1,
            //　原部门
            createddeptname: this.NowDeptName,
            //　调岗后部门
            updatedeptname: this.Change_1.dept_1,
            // 调岗备注
            transferremark: this.Change_1.remarks_1,
            // 调动日期
            takeeffectdate: this.Change_1.date1,
            // 审批人1
            staffName1: this.NowManager[0].staffname,
            // 审批人2
            staffName2: this.personnel_manager[0].staffname,
            // 审批人3
            staffName3: this.president[1].staffname,
            // 审批类型
            auditflowType: "调动",
            // 审批标题
            auditflowTitle: this.NowStaffName + "的" + this.Change_1.type_1 + "审批" + Math.round(Math.random() * 100000000)
          }
        }).then((response) => {
          console.log("添加调动成功")
          console.log(response);
          if (response.data.code == 300) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data) {
            //如果服务是正常的
            if (response.data.code == 200 && response.data.data == 1111) {
              ElMessage({
                showClose: true,
                message: '操作成功，请等待审批结果',
                type: 'success',
              })
              this.Change = false;
            } else {
              ElNotification.warning({
                title: '提示',
                message: "操作失败，请稍后再试",
                offset: 100,
              })
              this.Change = false;
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        })
      }
    },
    // 提交调动 （提交两个审批人）
    Submit_to_transfer2() {
      if (this.Change_1.dept_1.length === 0) {
        ElMessage("请选择调岗后部门");
      } else if (this.Change_1.remarks_1.length === 0) {
        ElMessage("备注不能为空");
      } else if (this.Change_1.date1.length === 0) {
        ElMessage("调动日期不能为空");
      } else {
        this.axios({
          method: 'post',
          url: this.url + 'SubmitTransfer2',
          data: {
            // 申请人
            staffName: this.NowStaffName,
            // 调岗类型
            transferType: this.Change_1.type_1,
            //　原部门
            createddeptname: this.NowDeptName,
            //　调岗后部门
            updatedeptname: this.Change_1.dept_1,
            // 调岗备注
            transferremark: this.Change_1.remarks_1,
            // 调动日期
            takeeffectdate: this.Change_1.date1,
            // 审批人1
            staffName1: this.NowManager[0].staffname,
            // 审批人3
            staffName2: this.president[1].staffname,
            // 审批类型
            auditflowType: "调动",
            // 审批标题
            auditflowTitle: this.NowStaffName + "的" + this.Change_1.type_1 + "审批" + Math.round(Math.random() * 100000000)
          }
        }).then((response) => {
          console.log("添加转正成功")
          console.log(response);
          if (response.data.code == 300) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data) {
            //如果服务是正常的
            if (response.data.code == 200 && response.data.data == 1111) {
              ElMessage({
                showClose: true,
                message: '操作成功，请等待审批结果',
                type: 'success',
              })
              this.Change = false;
            } else {
              ElNotification.warning({
                title: '提示',
                message: "操作失败，请稍后再试",
                offset: 100,
              })
              this.Change = false;
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        })
      }
    },
    // 提交调薪 （提交三个审批人）
    Submit_to_salary3() {
      if (this.salary_1.hjbgz === 0) {
        ElMessage("请选择调薪后基本工资");
      } else if (this.salary_1.remarks_1.length === 0) {
        ElMessage("备注不能为空");
      } else if (this.salary_1.date1.length === 0) {
        ElMessage("日期不能为空");
      } else {
        this.axios({
          method: 'post',
          url: this.url + 'SubmitSalary3',
          data: {
            // 申请人
            staffName: this.NowStaffName,
            //　部门
            deptname: this.NowDeptName,
            // 调薪前基本工资
            frontsalary: this.base_pay,
            // 调薪后基本工资
            aftersalary: this.salary_1.hjbgz,
            // 备注
            salaryremarks: this.salary_1.remarks_1,
            // 期望调薪日期
            takeEffectDate: this.salary_1.date1,
            // 审批人1
            staffName1: this.NowManager[0].staffname,
            // 审批人2
            staffName2: this.personnel_manager[0].staffname,
            // 审批人3
            staffName3: this.president[1].staffname,
            // 审批类型
            auditflowType: "调薪",
            // 审批标题
            auditflowTitle: this.NowStaffName + "的" + "调薪" + "审批" + Math.round(Math.random() * 100000000)
          }
        }).then((response) => {
          console.log("添加调动成功")
          console.log(response);
          if (response.data.code == 300) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data) {
            //如果服务是正常的
            if (response.data.code == 200 && response.data.data == 1111) {
              ElMessage({
                showClose: true,
                message: '操作成功，请等待审批结果',
                type: 'success',
              })
              this.salary = false;
            } else {
              ElNotification.warning({
                title: '提示',
                message: "操作失败，请稍后再试",
                offset: 100,
              })
              this.salary = false;
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        })
      }
    },
    // 提交调薪 （提交两个审批人）
    Submit_to_salary2() {
      if (this.salary_1.remarks_1.length === 0) {
        ElMessage("备注不能为空");
      } else if (this.salary_1.date1.length === 0) {
        ElMessage("日期不能为空");
      } else {
        this.axios({
          method: 'post',
          url: this.url + 'SubmitSalary2',
          data: {
            // 申请人
            staffName: this.NowStaffName,
            //　部门
            deptname: this.NowDeptName,
            // 调薪前基本工资
            frontsalary: this.base_pay,
            // 调薪后基本工资
            aftersalary: this.salary_1.hjbgz,
            // 备注
            salaryremarks: this.salary_1.remarks_1,
            // 期望调薪日期
            takeEffectDate: this.salary_1.date1,
            // 审批人1
            staffName1: this.NowManager[0].staffname,
            // 审批人2
            staffName2: this.president[1].staffname,
            // 审批类型
            auditflowType: "调薪",
            // 审批标题
            auditflowTitle: this.NowStaffName + "的" + "调薪" + "审批" + Math.round(Math.random() * 100000000)
          }
        }).then((response) => {
          console.log("添加转正成功")
          console.log(response);
          if (response.data.code == 300) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data) {
            //如果服务是正常的
            if (response.data.code == 200 && response.data.data == 1111) {
              ElMessage({
                showClose: true,
                message: '操作成功，请等待审批结果',
                type: 'success',
              })
              this.salary = false;
            } else {
              ElNotification.warning({
                title: '提示',
                message: "操作失败，请稍后再试",
                offset: 100,
              })
              this.salary = false;
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        })
      }
    },
    // 提交离职 (提交三个审批人)
    submitToLeave3() {
      if (this.quit_1.type_1.length === 0) {
        ElMessage("请选择您的离职原因");
      } else if (this.quit_1.remarks_1.length === 0) {
        ElMessage("请输入您的离职说明");
      } else if (this.quit_1.date1.length === 0) {
        ElMessage("请选择日期");
      } else {
        this.axios({
          method: 'post',
          url: this.url + 'submitToLeave3',
          data: {
            // 申请人
            staffName: this.NowStaffName,
            //　部门
            deptName: this.NowDeptName,
            // 离职原因
            quitType: this.quit_1.type_1,
            // 离职说明
            quitExplain: this.quit_1.remarks_1,
            // 离职日期
            applyQuitDate: this.quit_1.date1,
            // 审批人1
            staffName1: this.NowManager[0].staffname,
            // 审批人2
            staffName2: this.personnel_manager[0].staffname,
            // 审批人3
            staffName3: this.president[1].staffname,
            // 审批类型
            auditflowType: "离职",
            // 审批标题
            auditflowTitle: this.NowStaffName + "的" + "离职" + "审批" + Math.round(Math.random() * 100000000)
          }
        }).then((response) => {
          console.log("添加调动成功")
          console.log(response);
          if (response.data.code == 300) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data) {
            //如果服务是正常的
            if (response.data.code == 200 && response.data.data == 1111) {
              ElMessage({
                showClose: true,
                message: '操作成功，请等待审批结果',
                type: 'success',
              })
              this.quit = false;
            } else {
              ElNotification.warning({
                title: '提示',
                message: "操作失败，请稍后再试",
                offset: 100,
              })
              this.quit = false;
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        })
      }
    },
    // 提交离职 （提交两个审批人）
    submitToLeave2() {
      if (this.quit_1.type_1.length === 0) {
        ElMessage("请选择您的离职原因");
      } else if (this.quit_1.remarks_1.length === 0) {
        ElMessage("请输入您的离职说明");
      } else if (this.quit_1.date1.length === 0) {
        ElMessage("请选择日期");
      } else {
        this.axios({
          method: 'post',
          url: this.url + 'submitToLeave2',
          data: {
            // 申请人
            staffName: this.NowStaffName,
            //　部门
            deptName: this.NowDeptName,
            // 离职原因
            quitType: this.quit_1.type_1,
            // 离职说明
            quitExplain: this.quit_1.remarks_1,
            // 申请离职日期
            applyQuitDate: this.quit_1.date1,
            // 审批人1
            staffName1: this.NowManager[0].staffname,
            // 审批人2
            staffName2: this.president[1].staffname,
            // 审批类型
            auditflowType: "离职",
            // 审批标题
            auditflowTitle: this.NowStaffName + "的" + "离职" + "审批" + Math.round(Math.random() * 100000000)
          }
        }).then((response) => {
          console.log("添加调动成功")
          console.log(response);
          if (response.data.code == 300) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data) {
            //如果服务是正常的
            if (response.data.code == 200 && response.data.data == 1111) {
              ElMessage({
                showClose: true,
                message: '操作成功，请等待审批结果',
                type: 'success',
              })
              this.quit = false;
            } else {
              ElNotification.warning({
                title: '提示',
                message: "操作失败，请稍后再试",
                offset: 100,
              })
              this.quit = false;
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        })
      }
    },
    // 提交加班 (提交三个审批人)
    submitToOvertime3() {
      if (this.overtime_1.type_1.length === 0) {
        ElMessage("请选择您的加班类型");
      } else if (this.overtime_1.date1.length === 0) {
        ElMessage("请选择开始时间");
      } else if (this.overtime_1.date2.length === 0) {
        ElMessage("请选择结束时间");
      } else if (this.overtime_1.remarks_1.length === 0) {
        ElMessage("请输入加班事由");
      } else {
        this.axios({
          method: 'post',
          url: this.url + 'submitToOvertime3',
          data: {
            // 申请人
            staffName: this.NowStaffName,
            // 部门名称
            deptName: this.NowDeptName,
            // 加班类型
            overtimeaskType: this.overtime_1.type_1,
            // 加班开始时间
            overtimeaskSDate: this.overtime_1.date1,
            // 加班结束时间
            overtimeaskEDate: this.overtime_1.date2,
            // 加班总时长
            overtimeaskTotalDate: this.overtime_1.date3,
            //加班事由
            overtimeaskMatter: this.overtime_1.remarks_1,
            // 审批人1
            staffName1: this.NowManager[0].staffname,
            // 审批人2
            staffName2: this.personnel_manager[0].staffname,
            // 审批人3
            staffName3: this.president[1].staffname,
            // 审批类型
            auditflowType: "加班",
            // 审批标题
            auditflowTitle: this.NowStaffName + "的" + this.overtime_1.type_1 + "审批" + Math.round(Math.random() * 100000000)
          }
        }).then((response) => {
          console.log("添加调动成功")
          console.log(response);
          if (response.data.code == 300) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data) {
            //如果服务是正常的
            if (response.data.code == 200 && response.data.data == 1111) {
              ElMessage({
                showClose: true,
                message: '操作成功，请等待审批结果',
                type: 'success',
              })
              this.overtime = false;
            } else {
              ElNotification.warning({
                title: '提示',
                message: "操作失败，请稍后再试",
                offset: 100,
              })
              this.overtime = false;
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        })
      }
    },
    // 提交加班 (提交两个审批人)
    submitToOvertime2() {
      if (this.overtime_1.type_1.length === 0) {
        ElMessage("请选择您的加班类型");
      } else if (this.overtime_1.date1.length === 0) {
        ElMessage("请选择开始时间");
      } else if (this.overtime_1.date2.length === 0) {
        ElMessage("请选择结束时间");
      } else if (this.overtime_1.remarks_1.length === 0) {
        ElMessage("请输入加班事由");
      } else {
        this.axios({
          method: 'post',
          url: this.url + 'submitToOvertime2',
          data: {
            // 申请人
            staffName: this.NowStaffName,
            // 部门名称
            deptName: this.NowDeptName,
            // 加班类型
            overtimeaskType: this.overtime_1.type_1,
            // 加班开始时间
            overtimeaskSDate: this.overtime_1.date1,
            // 加班结束时间
            overtimeaskEDate: this.overtime_1.date2,
            // 加班总时长
            overtimeaskTotalDate: this.overtime_1.date3,
            //加班事由
            overtimeaskMatter: this.overtime_1.remarks_1,
            // 审批人1
            staffName1: this.personnel_manager[0].staffname,
            // 审批人2
            staffName2: this.president[1].staffname,
            // 审批类型
            auditflowType: "加班",
            // 审批标题
            auditflowTitle: this.NowStaffName + "的" + this.overtime_1.type_1 + "审批" + Math.round(Math.random() * 100000000)
          }
        }).then((response) => {
          console.log("添加调动成功")
          console.log(response);
          if (response.data.code == 300) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data) {
            //如果服务是正常的
            if (response.data.code == 200 && response.data.data == 1111) {
              ElMessage({
                showClose: true,
                message: '操作成功，请等待审批结果',
                type: 'success',
              })
              this.overtime = false;
            } else {
              ElNotification.warning({
                title: '提示',
                message: "操作失败，请稍后再试",
                offset: 100,
              })
              this.overtime = false;
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        })
      }
    },
    // 提交补打卡 (提交三个审批人)
    submitToCard3() {
      if (this.punch_1.type_1.length === 0) {
        ElMessage("请选择您的补打卡类型");
      } else if (this.punch_1.date1.length === 0) {
        ElMessage("请选择实际打卡时间");
      } else if (this.punch_1.remarks_1.length === 0) {
        ElMessage("请输入补打卡备注");
      } else {
        this.axios({
          method: 'post',
          url: this.url + 'submitToCard3',
          data: {
            // 申请人
            staffName: this.NowStaffName,
            // 部门名称
            deptName: this.NowDeptName,
            // 补打卡类型
            cardType: this.punch_1.type_1,
            // 补打卡时间
            cardDate: this.punch_1.date1,
            // 补打卡备注
            cardRemarks: this.punch_1.remarks_1,
            // 审批人1
            staffName1: this.NowManager[0].staffname,
            // 审批人2
            staffName2: this.personnel_manager[0].staffname,
            // 审批人3
            staffName3: this.president[1].staffname,
            // 审批类型
            auditflowType: "补打卡",
            // 审批标题
            auditflowTitle: this.NowStaffName + "的" + this.punch_1.type_1 + "审批" + Math.round(Math.random() * 100000000)
          }
        }).then((response) => {
          console.log("添加调动成功")
          console.log(response);
          if (response.data.code == 300) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data) {
            //如果服务是正常的
            if (response.data.code == 200 && response.data.data == 1111) {
              ElMessage({
                showClose: true,
                message: '操作成功，请等待审批结果',
                type: 'success',
              })
              this.punch = false;
            } else {
              ElNotification.warning({
                title: '提示',
                message: "操作失败，请稍后再试",
                offset: 100,
              })
              this.punch = false;
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        })
      }
    },
    // 提交补打卡 (提交两个审批人)
    submitToCard2() {
      if (this.punch_1.type_1.length === 0) {
        ElMessage("请选择您的补打卡类型");
      } else if (this.punch_1.date1.length === 0) {
        ElMessage("请选择实际打卡时间");
      } else if (this.punch_1.remarks_1.length === 0) {
        ElMessage("请输入补打卡备注");
      } else {
        this.axios({
          method: 'post',
          url: this.url + 'submitToCard2',
          data: {
            // 申请人
            staffName: this.NowStaffName,
            // 部门名称
            deptName: this.NowDeptName,
            // 补打卡类型
            cardType: this.punch_1.type_1,
            // 补打卡时间
            cardDate: this.punch_1.date1,
            // 补打卡备注
            cardRemarks: this.punch_1.remarks_1,
            // 审批人1
            staffName1: this.NowManager[0].staffname,
            // 审批人3
            staffName2: this.president[1].staffname,
            // 审批类型
            auditflowType: "补打卡",
            // 审批标题
            auditflowTitle: this.NowStaffName + "的" + this.punch_1.type_1 + "审批" + Math.round(Math.random() * 100000000)
          }
        }).then((response) => {
          console.log("添加补打卡成功")
          console.log(response);
          if (response.data.code == 300) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data) {
            //如果服务是正常的
            if (response.data.code == 200 && response.data.data == 1111) {
              ElMessage({
                showClose: true,
                message: '操作成功，请等待审批结果',
                type: 'success',
              })
              this.punch = false;
            } else {
              ElNotification.warning({
                title: '提示',
                message: "操作失败，请稍后再试",
                offset: 100,
              })
              this.punch = false;
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        })
      }
    },
    // 提交出差(提交三个审批人)
    submitToTravel3() {
      if (this.travel_1.remarks_1.length === 0) {
        ElMessage("请输入出差地址");
      } else if (this.travel_1.remarks_2.length === 0) {
        ElMessage("请输入出差事由");
      } else if (this.travel_1.date1.length === 0) {
        ElMessage("请选择开始时间");
      } else if (this.travel_1.date2.length === 0) {
        ElMessage("请选择结束时间");
      } else {
        this.axios({
          method: 'post',
          url: this.url + 'submitToTravel3',
          data: {
            // 申请人
            staffName: this.NowStaffName,
            // 部门名称
            deptName: this.NowDeptName,
            // 出差地址
            travelPlace: this.address,
            // 出差事由
            travelMatter: this.travel_1.remarks_2,
            // 出差开始时间
            travelSDate: this.travel_1.date1,
            // 出差结束时间
            travelEDate: this.travel_1.date2,
            // 请假时长
            travelTotalDate: this.travel_1.date3,
            // 审批人1
            staffName1: this.NowManager[0].staffname,
            // 审批人2
            staffName2: this.personnel_manager[0].staffname,
            // 审批人3
            staffName3: this.president[1].staffname,
            // 审批类型
            auditflowType: "出差",
            // 审批标题
            auditflowTitle: this.NowStaffName + "的" + "出差" + "审批" + Math.round(Math.random() * 100000000)
          }
        }).then((response) => {
          console.log("添加出差成功")
          console.log(response);
          if (response.data.code == 300) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data) {
            //如果服务是正常的
            if (response.data.code == 200 && response.data.data == 1111) {
              ElMessage({
                showClose: true,
                message: '操作成功，请等待审批结果',
                type: 'success',
              })
              this.travel = false;
            } else {
              ElNotification.warning({
                title: '提示',
                message: "操作失败，请稍后再试",
                offset: 100,
              })
              this.travel = false;
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        })
      }
    },
    // 提交出差(提交两个审批人)
    submitToTravel2() {
      if (this.travel_1.remarks_1.length === 0) {
        ElMessage("请输入出差地址");
      } else if (this.travel_1.remarks_2.length === 0) {
        ElMessage("请输入出差事由");
      } else if (this.travel_1.date1.length === 0) {
        ElMessage("请选择开始时间");
      } else if (this.travel_1.date2.length === 0) {
        ElMessage("请选择结束时间");
      } else {
        this.axios({
          method: 'post',
          url: this.url + 'submitToTravel2',
          data: {
            // 申请人
            staffName: this.NowStaffName,
            // 部门名称
            deptName: this.NowDeptName,
            // 出差地址
            travelPlace: this.address,
            // 出差事由
            travelMatter: this.travel_1.remarks_2,
            // 出差开始时间
            travelSDate: this.travel_1.date1,
            // 出差结束时间
            travelEDate: this.travel_1.date2,
            // 请假时长
            travelTotalDate: this.travel_1.date3,
            // 审批人1
            staffName1: this.NowManager[0].staffname,
            // 审批人3
            staffName2: this.president[1].staffname,
            // 审批类型
            auditflowType: "出差",
            // 审批标题
            auditflowTitle: this.NowStaffName + "的" + "出差" + "审批" + Math.round(Math.random() * 100000000)
          }
        }).then((response) => {
          console.log("添加出差成功")
          console.log(response);
          if (response.data.code == 300) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data) {
            //如果服务是正常的
            if (response.data.code == 200 && response.data.data == 1111) {
              ElMessage({
                showClose: true,
                message: '操作成功，请等待审批结果',
                type: 'success',
              })
              this.travel = false;
            } else {
              ElNotification.warning({
                title: '提示',
                message: "操作失败，请稍后再试",
                offset: 100,
              })
              this.travel = false;
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        })
      }
    },
    // 提交请假 (提交三个审批人)
    submitToAskForLeave3() {
      if (this.sick_1.remarks_1.length === 0) {
        ElMessage("请输入请假事由");
      } else if (this.sick_1.date1.length === 0) {
        ElMessage("请选择开始时间");
      } else if (this.sick_1.date2.length === 0) {
        ElMessage("请选择结束时间");
      } else {
        this.axios({
          method: 'post',
          url: this.url + 'submitToAskForLeave3',
          data: {
            // 申请人
            staffName: this.NowStaffName,
            // 部门名称
            deptname: this.NowDeptName,
            // 请假类型
            leaveType: this.sick_1.type_1,
            // 请假事由
            leaveMatter: this.sick_1.remarks_1,
            // 请假开始时间
            leaveSDate: this.sick_1.date1,
            // 请假结束时间
            leaveEDate: this.sick_1.date2,
            // 出差时长
            leaveTotalDate: this.sick_1.date3,
            // 审批人1
            staffName1: this.NowManager[0].staffname,
            // 审批人2
            staffName2: this.personnel_manager[0].staffname,
            // 审批人3
            staffName3: this.president[1].staffname,
            // 审批类型
            auditflowType: "请假",
            // 审批标题
            auditflowTitle: this.NowStaffName + "的" + this.sick_1.type_1 + "审批" + Math.round(Math.random() * 100000000)
          }
        }).then((response) => {
          console.log("添加出差成功")
          console.log(response);
          if (response.data.code == 300) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data) {
            //如果服务是正常的
            if (response.data.code == 200 && response.data.data == 1111) {
              ElMessage({
                showClose: true,
                message: '操作成功，请等待审批结果',
                type: 'success',
              })
              this.sick = false;
            } else {
              ElNotification.warning({
                title: '提示',
                message: "操作失败，请稍后再试",
                offset: 100,
              })
              this.sick = false;
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        })
      }
    },
    // 提交请假 (提交两个审批人)
    submitToAskForLeave2() {
      if (this.sick_1.remarks_1.length === 0) {
        ElMessage("请输入请假事由");
      } else if (this.sick_1.date1.length === 0) {
        ElMessage("请选择开始时间");
      } else if (this.sick_1.date2.length === 0) {
        ElMessage("请选择结束时间");
      } else {
        this.axios({
          method: 'post',
          url: this.url + 'submitToAskForLeave2',
          data: {
            // 申请人
            staffName: this.NowStaffName,
            // 部门名称
            deptname: this.NowDeptName,
            // 请假类型
            leaveType: this.sick_1.type_1,
            // 请假事由
            leaveMatter: this.sick_1.remarks_1,
            // 请假开始时间
            leaveSDate: this.sick_1.date1,
            // 请假结束时间
            leaveEDate: this.sick_1.date2,
            // 出差时长
            leaveTotalDate: this.sick_1.date3,
            // 审批人1
            staffName1: this.NowManager[0].staffname,
            // 审批人3
            staffName2: this.president[1].staffname,
            // 审批类型
            auditflowType: "请假",
            // 审批标题
            auditflowTitle: this.NowStaffName + "的" + this.sick_1.type_1 + "审批" + Math.round(Math.random() * 100000000)
          }
        }).then((response) => {
          console.log("添加出差成功")
          console.log(response);
          if (response.data.code == 300) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data) {
            //如果服务是正常的
            if (response.data.code == 200 && response.data.data == 1111) {
              ElMessage({
                showClose: true,
                message: '操作成功，请等待审批结果',
                type: 'success',
              })
              this.sick = false;
            } else {
              ElNotification.warning({
                title: '提示',
                message: "操作失败，请稍后再试",
                offset: 100,
              })
              this.sick = false;
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        })
      }
    },
    // 转正取消
    cancel_1() {
      this.become_1 = {
        name: "",
        dept: "",
        type_1: "",
        remarks_1: "",
        date1: "",
      };
      this.become = false;
    },
    // 调岗取消
    cancel_2() {
      this.Change_1 = {
        name: "",
        type_1: "",
        dept: "",
        dept_1: "",
        remarks_1: "",
        date1: "",
      };
      this.Change = false;
    },
    // 取消调薪
    cancel_3() {
      this.salary_1 = {
        name: "",
        dept: "",
        qjbgz: "",
        qgwgz: "",
        hjbgz: "",
        hgwgz: "",
        date1: "",
        remarks_1: "",
      };
      this.salary = false;
    },
    // 取消离职
    cancel_4() {
      this.quit_1 = {
        name: "",
        dept: "",
        type_1: "",
        remarks_1: "",
        date1: "",
      };
      this.quit = false;
    },
    // 取消加班
    cancel_5() {
      this.overtime_1 = {
        name: "",
        dept: "",
        type_1: "",
        date1: "",
        date2: "",
        date3: "",
        remarks_1: "",
      };
      this.overtime = false;
    },
    // 清空时间
    cancel_date() {
      this.overtime_1.type_1 = "";
      this.overtime_1.date1 = "";
      this.overtime_1.date2 = "";
      this.overtime_1.date3 = "";
    },
    // 取消补打卡
    cancel_6() {
      this.punch_1 = {
        //名称
        name: "",
        //类型
        type_1: "",
        //打卡时间
        date1: "",
        // 备注
        remarks_1: "",
      };
      this.punch = false;
    },
    // 时间
    cancel_date4() {
      this.punch_1.date1 = "";
    },
    // 取消出差
    cancel_7() {
      this.travel_1 = {
        name: "",
        dept: "",
        remarks_1: "",
        remarks_2: "",
        date1: "",
        date2: "",
        date3: "",
      };
      this.travel = false;
    },
    // 时间
    cancel_date2() {
      this.travel_1.date1 = "";
      this.travel_1.date2 = "";
      this.travel_1.date3 = "";
    },
    // 取消请假
    cancel_8() {
      this.sick_1 = {
        //名称
        name: "",
        //部门
        dept: "",
        //请假类型
        type_1: "",
        //请假事由
        remarks_1: "",
        //开始日期
        date1: "",
        //结束时间
        date2: "",
        //请假总时长
        date3: "",
      };
      this.sick = false;
    },
    // 时间
    cancel_date3() {
      this.sick_1.date1 = "";
      this.sick_1.date2 = "";
      this.sick_1.date3 = "";
    },
    // 地址选择器
    handleChange1(value) {
      if (value[1] != null && value[2] != null) {
        var dz = CodeToText[value[0]] + '/' + CodeToText[value[1]] + '/' + CodeToText[value[2]]
        this.addressid = value[2]
      } else {
        if (value[1] != null) {
          dz = CodeToText[value[0]] + '/' + CodeToText[value[1]]
          this.addressid = value[1]
        } else {
          dz = CodeToText[value[0]]
          this.addressid = value[0]
        }
      }
      this.address = dz

      console.log(dz)
      console.log(value)
    },
    // 判断部门是否相同
    judgingDept() {
      if (this.NowDeptName == this.Change_1.dept_1) {
        ElMessage({
          message: "原部门与变动后部门相同，请重新选择!",
          type: "warning",
        });
        this.emptyDept();
      }
    },
    // 清空变动后部门
    emptyDept() {
      this.Change_1.dept_1 = ""
    },
    // 判断加班开始时间
    difference1_1: function (beginTime) {
      var jbtype = this.overtime_1.type_1; //获取加班类型
      var date = new Date();
      if (jbtype.length === 0) {
        ElMessage({
          message: "请选择加班类型!",
          type: "warning",
        });
        this.cancel_date();
      } else if (beginTime < date) {
        ElMessage({
          message: "加班开始时间小于当前时间，请重新选择!",
          type: "warning",
        });
        this.cancel_date();
      }
    },
    // 计算加班天数
    difference1_2: function (beginTime, endTime) {
      var jbtype = this.overtime_1.type_1; //获取加班类型
      if (jbtype.length === 0) {
        ElMessage({
          message: "请选择加班类型!",
          type: "warning",
        });
        this.cancel_date();
      }
      // 判断是否选择加班时间
      else if (beginTime.length == 0) {
        ElMessage({
          message: "请选择加班开始时间!",
          type: "warning",
        });
        this.cancel_date();
        // 判断加班结束时间是否小于加班出差开始时间
      } else if (endTime < beginTime) {
        ElMessage({
          message: "加班结束时间小于加班出差开始时间，请重新选择!",
          type: "warning",
        });
        this.cancel_date();
      } else {
        var dateBegin = new Date(beginTime);
        var dateEnd = new Date(endTime);
        var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
        var hours = Math.floor(dateDiff / (3600 * 1000)); //计算出小时数
        var leave1 = dateDiff % (3600 * 1000); //计算小时数后剩余的分钟数
        //计算相差分钟数
        var minutes = Math.floor(leave1 / (60 * 1000)); //计算相差分钟数
        if (minutes >= 40) {
          var hours = hours + 1;
        }
        if (hours == 0) {
          ElMessage({
            message: "开始时间与结束时间相同，请重新选择!",
            type: "warning",
          });
          this.cancel_date();
        } else if (jbtype === "工作日加班") {
          if (hours > 3) {
            ElMessage({
              message: "工作日加班时间不能大于3小时，请重新选择!",
              type: "warning",
            });
            this.cancel_date();
          } else {
            this.overtime_1.date3 = hours;
          }
        } else if (jbtype === "休息日加班") {
          if (hours > 8) {
            ElMessage({
              message: "休息日加班时间不能大于8小时，请重新选择!",
              type: "warning",
            });
            this.cancel_date();
          } else {
            this.overtime_1.date3 = hours;
          }
        } else if (jbtype === "节假日加班") {
          if (hours > 8) {
            ElMessage({
              message: "节假日加班时间不能大于8小时，请重新选择!",
              type: "warning",
            });
            this.cancel_date();
          } else {
            this.overtime_1.date3 = hours;
          }
        }
      }
    },
    // 判断出差开始时间
    difference2_1: function (beginTime) {
      var date = new Date();
      if (beginTime < date) {
        ElMessage({
          message: "加班开始时间小于当前时间，请重新选择!",
          type: "warning",
        });
        this.cancel_date2();
      }
    },
    // 计算出差开始天数
    difference2_2: function (beginTime, endTime) {
      if (beginTime.length == 0) {
        ElMessage({
          message: "请选择出差开始时间!",
          type: "warning",
        });
        this.cancel_date();
      } else if (endTime < beginTime) {
        ElMessage({
          message: "出差结束时间小于出差开始时间，请重新选择!",
          type: "warning",
        });
        this.cancel_date2();
      } else {
        var dateBegin = new Date(beginTime);
        var dateEnd = new Date(endTime);
        var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
        var days = Math.floor(dateDiff / (24 * 60 * 60 * 1000));
        var hours = Math.floor(days * 8);
        if (hours == 0) {
          ElMessage({
            message: "开始时间与结束时间相同，请重新选择!",
            type: "warning",
          });
          this.cancel_date2();
        } else {
          this.travel_1.date3 = hours;
        }
      }
    },
    // 判断请假开始时间
    difference3_1: function (beginTime) {
      var date = new Date();
      if (beginTime < date) {
        ElMessage({
          message: "请假开始时间小于当前时间，请重新选择!",
          type: "warning",
        });
        this.cancel_date3();
      }
    },
    // 计算请假时长
    difference3_2: function (beginTime, endTime) {
      if (beginTime.length == 0) {
        ElMessage({
          message: "请选择请假开始时间!",
          type: "warning",
        });
        this.cancel_date3();
      } else if (endTime < beginTime) {
        ElMessage({
          message: "请假结束时间小于请假开始时间，请重新选择!",
          type: "warning",
        });
        this.cancel_date3();
      } else {
        var dateBegin = new Date(beginTime);
        var dateEnd = new Date(endTime);
        var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
        var days = Math.floor(dateDiff / (24 * 60 * 60 * 1000));
        var hours = Math.floor(days * 8);
        if (hours == 0) {
          ElMessage({
            message: "开始时间与结束时间相同，请重新选择!",
            type: "warning",
          });
          this.cancel_date3();
        } else {
          this.sick_1.date3 = hours;
        }
      }
    },
    // 判断补打卡
    difference4: function (beginTime) {
      let now = new Date();
      if (beginTime > now) {
        ElMessage({
          message: "补卡时间不能大于当前时间，请重新选择!",
          type: "warning",
        });
        this.cancel_date4();
      }
    },
    // 判断离职
    difference5: function (endTime) {
      let now = new Date();
      if (endTime < now) {
        ElMessage({
          message: "离职时间不能小于当前时间，请重新选择!",
          type: "warning",
        });
        this.cancel_date5();
      }
    },
    cancel_date5() {
      this.quit_1.date1 = "";
    },
    // 判断调薪
    difference6: function (endTime) {
      let now = new Date();
      if (endTime < now) {
        ElMessage({
          message: "调薪时间不能小于当前时间，请重新选择!",
          type: "warning",
        });
        this.cancel_date6();
      }
    },
    cancel_date6() {
      this.salary_1.date1 = "";
    },
    // 判断转正
    difference7: function (endTime) {
      let now = new Date();
      if (endTime < now) {
        ElMessage({
          message: "转正时间不能小于当前时间，请重新选择!",
          type: "warning",
        });
        this.cancel_date7();
      }
    },
    cancel_date7() {
      this.become_1.date1 = "";
    },
    // 点击调岗根据员工名称查询该员工是否有调岗审批记录
    selectTransferExamine() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'selectTransferRecord',
        data: {
          staffName: this.NowStaffName
        }
      }).then((response) => {
        //如果服务是正常的
        console.log("查询是否有调动记录成功")
        console.log(response);
        //如果服务关闭
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })//如果服务没有关闭
        } else if (response.data) {
          // 审批状态2代表驳回过，3代表撤销，则可以再次申请转正，则去查询该员工的部门经理，返回5则代表暂无记录 返回1则代表有记录且成功过
          if (response.data.code === 200 && response.data.data === 5 || response.data.data === 3
              || response.data.data === 2 || response.data.data === 1) {
            // 去查询是否是离职员工，根据员工名称
            this.axios({
              method: 'post',
              url: this.url + 'selectStaffState',
              data: {
                staffName: this.NowStaffName
              }
            }).then((response) => {
              console.log("查询是否是离职员工")
              console.log(response);
              if (response.data.data.data) {
                ElNotification.warning({
                  title: '提示',
                  message: "服务发生关闭",
                  offset: 100,
                })//如果服务没有关闭
              } else if (response.data) {
                // 等于0或者1则为试用期员工或正式员工
                if (response.data.data.info == 0 || response.data.data.info == 1) {
                  // 符合条件再根据部门编号去查询其部门经理
                  this.axios({
                    method: 'post',
                    url: this.url + 'selectDeptPostName',
                    data: {
                      deptId: _this.NowDeptId,
                    }
                  }).then((response) => {
                    console.log("根据部门编号去查其部门经理成功")
                    console.log(response)
                    if (response.data === 300) {
                      ElNotification.warning({
                        title: '提示',
                        message: "服务发生关闭",
                        offset: 100,
                      })//如果服务没有关闭
                    } else if (response.data.data.state === 200) {
                      //如果服务是正常的
                      this.NowManager = response.data.data.info;
                      // 判断其部门经理和人事经理是否相同 为0则是相同 为1则不相同
                      if (this.NowManager[0].staffname === this.personnel_manager[0].staffname) {
                        this.judging = 0;
                      } else {
                        this.judging = 1;
                      }
                      this.Change = true;
                    }
                  })
                } else if (response.data.data.info == 2) {
                  ElNotification.warning({
                    title: '提示',
                    message: "系统查询到您已离职,没有权限进行改操作",
                    offset: 100,
                  })
                } else {
                  ElNotification.warning({
                    title: '提示',
                    message: "数据有误，请联系管理员",
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
            // 查询成功，审批状态0代表正在审批中，则不能让登陆者再次申请调动
          } else if (response.data.code === 200 && response.data.data === 0) {
            ElNotification.warning({
              title: '提示',
              message: "查询到您有正在审批中的调动审批，请耐心等候结果！",
              offset: 100,
            })
          }
        }
      })
    },
    // 点击调岗查询全部部门
    variaTion() {
      this.axios({
        method: 'get',
        url: this.url + 'selectDeptList',
      }).then((response) => {
        console.log("点击调岗查询全部部门成功")
        console.log(response)
        //如果服务关闭
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
          //如果服务没有关闭
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            //初始化
            this.variation_dept = [];
            //循环部门列表
            for (let i = 0; i < response.data.data.info.length; i++) {
              //一个一个存起来
              this.variation_dept.push({
                value: response.data.data.info[i].deptId,
                label: response.data.data.info[i].deptName
              })
            }
          }//如果服务是雪崩的
          else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        }
      })
    },
    // 点击转正根据员工名称查询其员工状态 查询一系列 满足则显示弹出框
    selectStaffState() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectStaffState',
        data: {
          staffName: this.NowStaffName,
        }
      }).then((response) => {
        console.log("点击转正根据员工名称查询其员工状态成功")
        console.log(response)
        //如果服务是正常的
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })//如果服务没有关闭
        } else if (response.data) {
          // 等于0则为试用员工，则去查询是否有转正记录
          if (response.data.data.info === 0) {
            this.axios({
              method: 'post',
              url: this.url + 'selectexaminerecord',
              data: {
                staffName: _this.NowStaffName,
              }
            }).then((response) => {
              console.log("查询当前登陆者是否有转正记录成功")
              console.log(response)
              if (response.data === 300) {
                ElNotification.warning({
                  title: '提示',
                  message: "服务发生关闭",
                  offset: 100,
                })//如果服务没有关闭
              } else if (response.data) {
                //如果服务是正常的
                console.log("查询是否有转正记录成功")
                console.log(response);
                // 查询成功，审批状态0代表正在审批中，则不能让登陆者再次申请转正
                if (response.data.code === 200 && response.data.data == 5 || response.data.data === 3
                    || response.data.data === 2) {
                  this.axios({
                    method: 'post',
                    url: this.url + 'selectDeptPostName',
                    data: {
                      deptId: _this.NowDeptId,
                    }
                  }).then((response) => {
                    console.log("根据部门编号去查其部门经理成功")
                    console.log(response)
                    if (response.data === 300) {
                      ElNotification.warning({
                        title: '提示',
                        message: "服务发生关闭",
                        offset: 100,
                      })//如果服务没有关闭
                    } else if (response.data.data.state === 200) {
                      //如果服务是正常的
                      this.NowManager = response.data.data.info;
                      // 判断其部门经理和人事经理是否相同 为0则是相同 为1则不相同
                      if (this.NowManager[0].staffname === this.personnel_manager[0].staffname) {
                        this.judging = 0;
                      } else {
                        this.judging = 1;
                      }
                      _this.become = true;
                    }
                  })
                  // 查询成功，审批状态2代表驳回过，3代表撤销，则可以再次申请转正，则去查询该员工的部门经理
                } else if (response.data.code === 200 && response.data.data === 0) {
                  ElNotification.warning({
                    title: '提示',
                    message: "查询到您有正在审批中的转正审批，请耐心等候结果！",
                    offset: 100,
                  })
                }
              }
            })
          } else if (response.data.data.info == 1) {
            // 已是正式员工
            ElNotification.warning({
              title: '提示',
              message: "您已是正式员工，不能发起转正申请",
              offset: 100,
            })
          } else if (response.data.data.info == 2) {
            // 已是离职员工
            ElNotification.warning({
              title: '提示',
              message: "系统查询到您已离职，没有权限进行该操作，如有纰漏，请联系管理员",
              offset: 100,
            })
          } else {
            // 如果没有以上数据,可能是数据有误出错了
            ElNotification.warning({
              title: '提示',
              message: "数据有误！请尽快联系管理员",
              offset: 100,
            })
          }
          //如果服务是雪崩的
        } else {
          ElNotification.warning({
            title: '提示',
            message: "服务发生雪崩",
            offset: 100,
          })
        }
      })
    },
    // 查询人事经理和总裁
    selectpresident() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectpresident',
      }).then((response) => {
        console.log("查询人事经理及总裁成功")
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
            _this.personnel_manager = response.data.data.info;
            _this.president = response.data.data.info;
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
    //根据其部门编号查询部门名称
    selectDeptName() {
      this.axios({
        method: 'post',
        url: this.url + 'selectDeptName',
        data: {
          deptId: this.NowDeptId,
        }
      }).then((response) => {
        console.log("查询部门名称成功")
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
            this.NowDeptName = response.data.data.info[0].deptName;
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
    // 点击调薪 去查询是否符合条件
    selectAdjustExamine() {
      var _this = this;
      // 去查询员工状态，根据员工名称
      this.axios({
        method: 'post',
        url: this.url + 'selectStaffState',
        data: {
          staffName: this.NowStaffName
        }
      }).then((response) => {
        console.log("查询员工状态")
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })//如果服务没有关闭
        } else if (response.data) {
          // 等于1为正式员工,则进行后面的操作 根据名称去查询是否目前有调薪审批记录
          if (response.data.data.info == 1) {
            this.axios({
              method: 'post',
              url: this.url + 'selectSalaryRecord',
              data: {
                staffName: this.NowStaffName
              }
            }).then((response) => {
              //如果服务是正常的
              console.log("查询是否有调薪记录成功")
              console.log(response);
              //如果服务关闭
              if (response.data.data.data) {
                ElNotification.warning({
                  title: '提示',
                  message: "服务发生关闭",
                  offset: 100,
                })//如果服务没有关闭
              } else if (response.data) {
                // 审批状态2代表驳回过，3代表撤销，则可以再次申请转正，则去查询该员工的部门经理，返回5则代表暂无记录 返回1则代表有记录且成功
                if (response.data.code === 200 && response.data.data == 5 || response.data.data === 3
                    || response.data.data === 2 || response.data.data === 1) {
                  // 符合条件再根据部门编号去查询其部门经理
                  this.axios({
                    method: 'post',
                    url: this.url + 'selectDeptPostName',
                    data: {
                      deptId: _this.NowDeptId,
                    }
                  }).then((response) => {
                    console.log("根据部门编号去查其部门经理成功")
                    console.log(response)
                    if (response.data === 300) {
                      ElNotification.warning({
                        title: '提示',
                        message: "服务发生关闭",
                        offset: 100,
                      })//如果服务没有关闭
                    } else if (response.data.data.state === 200) {
                      //如果服务是正常的
                      this.NowManager = response.data.data.info;
                      // 判断其部门经理和人事经理是否相同 为0则是相同 为1则不相同
                      if (this.NowManager[0].staffname === this.personnel_manager[0].staffname) {
                        this.judging = 0;
                      } else {
                        this.judging = 1;
                      }
                      this.salary = true
                    }
                  })
                  // 查询成功，审批状态0代表正在审批中，则不能让登陆者再次申请调动
                } else if (response.data.code === 200 && response.data.data === 0) {
                  ElNotification.warning({
                    title: '提示',
                    message: "查询到您有正在审批中的调薪审批，请耐心等候结果！",
                    offset: 100,
                  })
                }
              }
            })
          } else if (response.data.data.info == 0) {
            ElNotification.warning({
              title: '提示',
              message: "您是试用期员工，暂时不能进行改操作",
              offset: 100,
            })
          } else if (response.data.data.info == 2) {
            ElNotification.warning({
              title: '提示',
              message: "系统查询到您已离职,没有权限进行改操作",
              offset: 100,
            })
          } else {
            ElNotification.warning({
              title: '提示',
              message: "数据有误，请及时联系管理员",
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
    // 查询当前员工的基本工资
    selectPay() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'selectPay',
        data: {
          staffid: this.staffid,
        }
      }).then((response) => {
        //如果服务是正常的
        console.log("查询其基本工资成功")
        console.log(response);
        if (response.data.code == 200) {
          this.base_pay = response.data.data;
        } else {
          ElNotification.warning({
            title: '提示',
            message: "系统繁忙，请稍后再试",
            offset: 100,
          })
        }
      })
    },
    // 根据名称去查询是否目前有离职审批记录
    selectDimissionExamine() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'selectStaffState',
        data: {
          staffName: this.NowStaffName
        }
      }).then((response) => {
        console.log("查询员工状态")
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })//如果服务没有关闭
        } else if (response.data) {
          // 等于1或0则为正式员工或试用员工,则进行后面的操作 根据名称去查询是否目前有离职审批记录
          if (response.data.data.info == 1 || response.data.data.info == 0) {
            this.axios({
              method: 'post',
              url: this.url + 'selectDimissionRecord',
              data: {
                staffName: this.NowStaffName
              }
            }).then((response) => {
              //如果服务是正常的
              console.log("查询是否有离职记录成功")
              console.log(response);
              //如果服务关闭
              if (response.data.data.data) {
                ElNotification.warning({
                  title: '提示',
                  message: "服务发生关闭",
                  offset: 100,
                })//如果服务没有关闭
              } else if (response.data) {
                // 审批状态2代表驳回过，3代表撤销，则可以再次申请转正，则去查询该员工的部门经理，返回5则代表暂无记录
                if (response.data.code === 200 && response.data.data == 5 || response.data.data === 3
                    || response.data.data === 2 ) {
                  // 符合条件再根据部门编号去查询其部门经理
                  this.axios({
                    method: 'post',
                    url: this.url + 'selectDeptPostName',
                    data: {
                      deptId: _this.NowDeptId,
                    }
                  }).then((response) => {
                    console.log("根据部门编号去查其部门经理成功")
                    console.log(response)
                    if (response.data === 300) {
                      ElNotification.warning({
                        title: '提示',
                        message: "服务发生关闭",
                        offset: 100,
                      })//如果服务没有关闭
                    } else if (response.data.data.state === 200) {
                      //如果服务是正常的
                      this.NowManager = response.data.data.info;
                      // 判断其部门经理和人事经理是否相同 为0则是相同 为1则不相同
                      if (this.NowManager[0].staffname === this.personnel_manager[0].staffname) {
                        this.judging = 0;
                      } else {
                        this.judging = 1;
                      }
                      this.quit = true
                    }
                  })
                  // 查询成功，审批状态0代表正在审批中，则不能让登陆者再次申请调动
                } else if (response.data.code === 200 && response.data.data === 0) {
                  ElNotification.warning({
                    title: '提示',
                    message: "查询到您有正在审批中的离职审批，请耐心等候结果！",
                    offset: 100,
                  })
                }
              }
            })
          } else if (response.data.data.info == 2) {
            ElNotification.warning({
              title: '提示',
              message: "系统查询到您已离职,没有权限进行改操作",
              offset: 100,
            })
          } else {
            ElNotification.warning({
              title: '提示',
              message: "数据有误，请及时联系管理员",
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
    // 根据名称去查询是否目前有加班审批记录
    selectOvertimeExamine() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'selectStaffState',
        data: {
          staffName: this.NowStaffName
        }
      }).then((response) => {
        console.log("查询员工状态")
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })//如果服务没有关闭
        } else if (response.data) {
          // 等于1或0则为正式员工或试用员工,则进行后面的操作 根据名称去查询是否目前有加班审批记录
          if (response.data.data.info == 1 || response.data.data.info == 0) {
            this.axios({
              method: 'post',
              url: this.url + 'selectOvertimeExamine',
              data: {
                staffName: this.NowStaffName
              }
            }).then((response) => {
              //如果服务是正常的
              console.log("查询是否有加班记录成功")
              console.log(response);
              //如果服务关闭
              if (response.data.data.data) {
                ElNotification.warning({
                  title: '提示',
                  message: "服务发生关闭",
                  offset: 100,
                })//如果服务没有关闭
              } else if (response.data) {
                // 审批状态2代表驳回过，3代表撤销，则可以再次申请加班，则去查询该员工的部门经理，返回5则代表暂无记录 1为有成功的记录
                if (response.data.code === 200 && response.data.data == 5 || response.data.data === 3
                    || response.data.data === 2 || response.data.data === 1) {
                  // 符合条件再根据部门编号去查询其部门经理
                  this.axios({
                    method: 'post',
                    url: this.url + 'selectDeptPostName',
                    data: {
                      deptId: _this.NowDeptId,
                    }
                  }).then((response) => {
                    console.log("根据部门编号去查其部门经理成功")
                    console.log(response)
                    if (response.data === 300) {
                      ElNotification.warning({
                        title: '提示',
                        message: "服务发生关闭",
                        offset: 100,
                      })//如果服务没有关闭
                    } else if (response.data.data.state === 200) {
                      //如果服务是正常的
                      this.NowManager = response.data.data.info;
                      // 判断其部门经理和人事经理是否相同 为0则是相同 为1则不相同
                      if (this.NowManager[0].staffname === this.personnel_manager[0].staffname) {
                        this.judging = 0;
                      } else {
                        this.judging = 1;
                      }
                      this.overtime = true
                    }
                  })
                  // 查询成功，审批状态0代表正在审批中，则不能让登陆者再次申请调动
                } else if (response.data.code === 200 && response.data.data === 0) {
                  ElNotification.warning({
                    title: '提示',
                    message: "查询到您有正在审批中的加班审批，请耐心等候结果！",
                    offset: 100,
                  })
                }
              }
            })
          } else if (response.data.data.info == 2) {
            ElNotification.warning({
              title: '提示',
              message: "系统查询到您已离职,没有权限进行改操作",
              offset: 100,
            })
          } else {
            ElNotification.warning({
              title: '提示',
              message: "数据有误，请及时联系管理员",
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
    // 根据名称去查询是否目前有补打卡审批记录
    selectCardExamine() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'selectStaffState',
        data: {
          staffName: this.NowStaffName
        }
      }).then((response) => {
        console.log("查询员工状态")
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })//如果服务没有关闭
        } else if (response.data) {
          // 等于1或0则为正式员工或试用员工,则进行后面的操作 根据名称去查询是否目前有补打卡审批记录
          if (response.data.data.info == 1 || response.data.data.info == 0) {
            this.axios({
              method: 'post',
              url: this.url + 'selectCardExamine',
              data: {
                staffName: this.NowStaffName
              }
            }).then((response) => {
              //如果服务是正常的
              console.log("查询是否有补打卡记录成功")
              console.log(response);
              //如果服务关闭
              if (response.data.data.data) {
                ElNotification.warning({
                  title: '提示',
                  message: "服务发生关闭",
                  offset: 100,
                })//如果服务没有关闭
              } else if (response.data) {
                // 审批状态2代表驳回过，3代表撤销，则可以再次申请加班，则去查询该员工的部门经理，返回5则代表暂无记录 1为有成功记录
                if (response.data.code === 200 && response.data.data == 5 || response.data.data === 3
                    || response.data.data === 2 || response.data.data === 1) {
                  // 符合条件再根据部门编号去查询其部门经理
                  this.axios({
                    method: 'post',
                    url: this.url + 'selectDeptPostName',
                    data: {
                      deptId: _this.NowDeptId,
                    }
                  }).then((response) => {
                    console.log("根据部门编号去查其部门经理成功")
                    console.log(response)
                    if (response.data === 300) {
                      ElNotification.warning({
                        title: '提示',
                        message: "服务发生关闭",
                        offset: 100,
                      })//如果服务没有关闭
                    } else if (response.data.data.state === 200) {
                      //如果服务是正常的
                      this.NowManager = response.data.data.info;
                      // 判断其部门经理和人事经理是否相同 为0则是相同 为1则不相同
                      if (this.NowManager[0].staffname === this.personnel_manager[0].staffname) {
                        this.judging = 0;
                      } else {
                        this.judging = 1;
                      }
                      this.punch = true
                    }
                  })
                  // 查询成功，审批状态0代表正在审批中，则不能让登陆者再次申请调动
                } else if (response.data.code === 200 && response.data.data === 0) {
                  ElNotification.warning({
                    title: '提示',
                    message: "查询到您有正在审批中的补打卡审批，请耐心等候结果！",
                    offset: 100,
                  })
                }
              }
            })
          } else if (response.data.data.info == 2) {
            ElNotification.warning({
              title: '提示',
              message: "系统查询到您已离职,没有权限进行改操作",
              offset: 100,
            })
          } else {
            ElNotification.warning({
              title: '提示',
              message: "数据有误，请及时联系管理员",
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
    // 根据名称去查询是否目前有出差审批记录
    selectEvectionExamine() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'selectStaffState',
        data: {
          staffName: this.NowStaffName
        }
      }).then((response) => {
        console.log("查询员工状态")
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })//如果服务没有关闭
        } else if (response.data) {
          // 等于1或0则为正式员工或试用员工,则进行后面的操作 根据名称去查询是否目前有出差审批记录
          if (response.data.data.info == 1 || response.data.data.info == 0) {
            this.axios({
              method: 'post',
              url: this.url + 'selectEvectionExamine',
              data: {
                staffName: this.NowStaffName
              }
            }).then((response) => {
              //如果服务是正常的
              console.log("查询是否有出差记录成功")
              console.log(response);
              //如果服务关闭
              if (response.data.data.data) {
                ElNotification.warning({
                  title: '提示',
                  message: "服务发生关闭",
                  offset: 100,
                })//如果服务没有关闭
              } else if (response.data) {
                // 审批状态2代表驳回过，3代表撤销，则可以再次申请加班，则去查询该员工的部门经理，返回5则代表暂无记录 返回1则为有成功记录
                if (response.data.code === 200 && response.data.data == 5 || response.data.data === 3
                    || response.data.data === 2 || response.data.data === 1) {
                  // 符合条件再根据部门编号去查询其部门经理
                  this.axios({
                    method: 'post',
                    url: this.url + 'selectDeptPostName',
                    data: {
                      deptId: _this.NowDeptId,
                    }
                  }).then((response) => {
                    console.log("根据部门编号去查其部门经理成功")
                    console.log(response)
                    if (response.data === 300) {
                      ElNotification.warning({
                        title: '提示',
                        message: "服务发生关闭",
                        offset: 100,
                      })//如果服务没有关闭
                    } else if (response.data.data.state === 200) {
                      //如果服务是正常的
                      this.NowManager = response.data.data.info;
                      // 判断其部门经理和人事经理是否相同 为0则是相同 为1则不相同
                      if (this.NowManager[0].staffname === this.personnel_manager[0].staffname) {
                        this.judging = 0;
                      } else {
                        this.judging = 1;
                      }
                      this.travel = true
                    }
                  })
                  // 查询成功，审批状态0代表正在审批中，则不能让登陆者再次申请调动
                } else if (response.data.code === 200 && response.data.data === 0) {
                  ElNotification.warning({
                    title: '提示',
                    message: "查询到您有正在审批中的出差审批，请耐心等候结果！",
                    offset: 100,
                  })
                }
              }
            })
          } else if (response.data.data.info == 2) {
            ElNotification.warning({
              title: '提示',
              message: "系统查询到您已离职,没有权限进行改操作",
              offset: 100,
            })
          } else {
            ElNotification.warning({
              title: '提示',
              message: "数据有误，请及时联系管理员",
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
    // 根据名称及请假类型去查询是否目前有请假审批记录
    selectLeaveExamine() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'selectStaffState',
        data: {
          staffName: this.NowStaffName
        }
      }).then((response) => {
        console.log("查询员工状态")
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })//如果服务没有关闭
        } else if (response.data) {
          // 等于1或0则为正式员工或试用员工,则进行后面的操作 根据名称去查询是否目前有请假审批记录
          if (response.data.data.info == 1 || response.data.data.info == 0) {
            this.axios({
              method: 'post',
              url: this.url + 'selectLeaveExamine',
              data: {
                staffName: this.NowStaffName,
                leaveType: this.sick_1.type_1,
              }
            }).then((response) => {
              //如果服务是正常的
              console.log("查询是否有请假记录成功")
              console.log(response);
              //如果服务关闭
              if (response.data.data.data) {
                ElNotification.warning({
                  title: '提示',
                  message: "服务发生关闭",
                  offset: 100,
                })//如果服务没有关闭
              } else if (response.data) {
                // 审批状态2代表驳回过，3代表撤销，则可以再次申请加班，则去查询该员工的部门经理，返回5则代表暂无记录 返回1为有成功记录
                if (response.data.code === 200 && response.data.data == 5 || response.data.data === 3
                    || response.data.data === 2 || response.data.data === 1) {
                  // 符合条件再根据部门编号去查询其部门经理
                  this.axios({
                    method: 'post',
                    url: this.url + 'selectDeptPostName',
                    data: {
                      deptId: _this.NowDeptId,
                    }
                  }).then((response) => {
                    console.log("根据部门编号去查其部门经理成功")
                    console.log(response)
                    if (response.data === 300) {
                      ElNotification.warning({
                        title: '提示',
                        message: "服务发生关闭",
                        offset: 100,
                      })//如果服务没有关闭
                    } else if (response.data.data.state === 200) {
                      //如果服务是正常的
                      this.NowManager = response.data.data.info;
                      // 判断其部门经理和人事经理是否相同 为0则是相同 为1则不相同
                      if (this.NowManager[0].staffname === this.personnel_manager[0].staffname) {
                        this.judging = 0;
                      } else {
                        this.judging = 1;
                      }
                      this.sick = true
                    }
                  })
                  // 查询成功，审批状态0代表正在审批中，则不能让登陆者再次申请调动
                } else if (response.data.code === 200 && response.data.data === 0) {
                  ElNotification.warning({
                    title: '提示',
                    message: "查询到您有正在审批中的该类型请假审批，请耐心等候结果！",
                    offset: 100,
                  })
                }
              }
            })
          } else if (response.data.data.info == 2) {
            ElNotification.warning({
              title: '提示',
              message: "系统查询到您已离职,没有权限进行改操作",
              offset: 100,
            })
          } else {
            ElNotification.warning({
              title: '提示',
              message: "数据有误，请及时联系管理员",
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
  // 挂载
  created() {
    // 根据其部门编号查询部门名称
    this.selectDeptName();
    // 查询人事经理及总裁
    this.selectpresident();
  }
})
;
</script>

<style scoped>
@import url("../../css/Examine_1.css");
</style>