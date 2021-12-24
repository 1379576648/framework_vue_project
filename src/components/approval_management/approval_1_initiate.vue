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
                @click="become = true"
                style="color: #606c82; font-size: 12px"
            >
              <img class="icon" src="../../assets/process_3.svg"/>
              <p class="link-text">转正</p>
            </el-button>
          </div>

          <!-- 异动 -->
          <div
              title="异动"
              class="link-list-item"
              v-on:click="this.Change_1.type_1 = '调岗'"
          >
            <el-button
                type="text"
                @click="Change = true"
                style="color: #606c82; font-size: 12px"
            >
              <img class="icon" src="../../assets/process_4.svg"/>
              <p class="link-text">异动</p>
            </el-button>
          </div>

          <!-- 调薪 -->
          <div title="调薪" class="link-list-item">
            <el-button
                type="text"
                @click="salary = true"
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
                @click="quit = true"
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
                @click="overtime = true"
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
                @click="punch = true"
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
                @click="travel = true"
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
                @click="sick = true"
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
                @click="sick = true"
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
                @click="sick = true"
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
                @click="sick = true"
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
                @click="sick = true"
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
                @click="sick = true"
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
            <el-input v-model="become_1.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="部门名称 :">
            <el-input v-model="become_1.dept" disabled></el-input>
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
          <el-form-item label="审批人 :">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                  <div class="sub-title" style="line-height: 10px">
                    管理一号
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  管理二号
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">
                  管理三号
                 </div>
              </div>
            </el-col>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitForm_1">确定</el-button>
            <el-button @click="cancel_1">取消</el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 异动弹出框 -->
      <el-dialog
          v-model="Change"
          title="异动"
          width="50%"
          :close-on-click-modal="false"
          @close="cancel_2"
      >
        <el-form ref="form_2" :model="Change_1" label-width="120px">
          <el-form-item label="员工名称">
            <el-input v-model="Change_1.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="异动类型">
            <el-input v-model="Change_1.type_1" disabled></el-input>
          </el-form-item>
          <el-form-item label="原部门">
            <el-input v-model="Change_1.dept" disabled></el-input>
          </el-form-item>
          <el-form-item label="异动后部门">
            <el-select v-model="Change_1.dept_1" placeholder="部门名称">
              <el-option
                  v-for="item in dept"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 头像 -->
          <el-form-item label="审批人">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                  <div class="sub-title" style="line-height: 10px">
                    管理一号
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">管理二号</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">管理三号</div>
              </div>
            </el-col>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitForm_2">确定</el-button>
            <el-button @click="cancel_2">取消</el-button>
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
            <el-input v-model="salary_1.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="salary_1.dept" disabled></el-input>
          </el-form-item>
          <el-form-item label="调薪前基本工资">
            <el-input v-model="salary_1.qjbgz" disabled></el-input>
          </el-form-item>
          <el-form-item label="调薪前岗位工资">
            <el-input v-model="salary_1.qgwgz" disabled></el-input>
          </el-form-item>
          <el-form-item label="调薪后基本工资">
            <el-input-number :precision="2" :step="100" :max="30000" :min="0"
                             v-model="salary_1.hjbgz"
                             oninput="value=value.toString().match(/^\d+(?:\.\d{0,2})?/)"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="调薪后岗位工资">
            <el-input v-model="salary_1.hgwgz" disabled></el-input>
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
          <el-form-item label="审批人">
            <!-- 头像 -->
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                  <div class="sub-title" style="line-height: 10px">
                    管理一号
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">管理二号</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">管理三号</div>
              </div>
            </el-col>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitForm_3">确定</el-button>
            <el-button @click="cancel_3">取消</el-button>
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
            <el-input v-model="quit_1.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="quit_1.dept" disabled></el-input>
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
          <!-- 头像 -->
          <el-form-item label="审批人">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                  <div class="sub-title" style="line-height: 10px">
                    管理一号
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">管理二号</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">管理三号</div>
              </div>
            </el-col>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitForm_4">确定</el-button>
            <el-button @click="cancel_4">取消</el-button>
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
            <el-input v-model="overtime_1.name" disabled></el-input>
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
          <el-form-item label="加班总时长">
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
          <!-- 头像（审批人） -->
          <el-form-item label="审批人">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                  <div class="sub-title" style="line-height: 10px">
                    管理一号
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">管理二号</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">管理三号</div>
              </div>
            </el-col>
          </el-form-item>
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitForm_5">确定</el-button>
            <el-button @click="cancel_5">取消</el-button>
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
            <el-input v-model="punch_1.name" disabled></el-input>
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
          <!-- 头像（审批人） -->
          <el-form-item label="审批人">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                  <div class="sub-title" style="line-height: 10px">
                    管理一号
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">管理二号</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">管理三号</div>
              </div>
            </el-col>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitForm_6">确定</el-button>
            <el-button @click="cancel_6">取消</el-button>
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
            <el-input v-model="travel_1.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="travel_1.dept" disabled></el-input>
          </el-form-item>
          <!-- 出差地址选择器 -->
          <el-form-item label="出差地址">
            <div id="app">
              <div>
                <el-cascader
                    size="large"
                    :options="options"
                    v-model="travel_1.remarks_1"
                    @change="handleChange"
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
          <!-- 头像（审批人） -->
          <el-form-item label="审批人">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                  <div class="sub-title" style="line-height: 10px">
                    管理一号
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">管理二号</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">管理三号</div>
              </div>
            </el-col>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitForm_7">确定</el-button>
            <el-button @click="cancel_7">取消</el-button>
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
            <el-input v-model="sick_1.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="sick_1.dept" disabled></el-input>
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
          <!-- 头像（审批人） -->
          <el-form-item label="审批人">
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                  <div class="sub-title" style="line-height: 10px">
                    管理一号
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">管理二号</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <div class="sub-title" style="line-height: 10px">管理三号</div>
              </div>
            </el-col>
          </el-form-item>
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitForm_8">确定</el-button>
            <el-button @click="cancel_8">取消</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="js">
import {defineComponent, reactive, ref, toRefs} from "vue";
import {ElMessage} from "element-plus";
import {regionData, CodeToText} from "element-china-area-data"; //地址选择器导入
export default defineComponent({
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      //转正表单
      become_1: {
        //名称
        name: "",
        //部门
        dept: "",
        //类型
        type_1: "",
        //备注
        remarks_1: "",
        //日期
        date1: "",
      },
      //异动表单
      Change_1: {
        //名称
        name: "",
        //类型
        type_1: "",
        //部门
        dept: "",
        //部门二
        dept_1: "",
      },
      //调薪表单
      salary_1: {
        //名称
        name: "",
        //部门
        dept: "",
        //调薪后基本工资
        qjbgz: "",
        //调薪前岗位工资
        qgwgz: "",
        //调薪后基本工资
        hjbgz: "",
        //调薪后岗位工资
        hgwgz: "",
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
      // 异动后查部门
      dept: ref([
        {
          value: '部门1',
          label: '部门1',
        },
        {
          value: '部门2',
          label: '部门2',
        }
      ]),
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
    };
  },
  methods: {
    // 提交转正
    submitForm_1() {
      if (this.become_1.remarks_1.length === 0) {
        ElMessage("备注不能为空");
      } else if (this.become_1.date1.length === 0) {
        ElMessage("日期不能为空");
      } else {
        alert(1);
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
    // 提交异动
    submitForm_2() {
      if (this.Change_1.dept_1.length === 0) {
        ElMessage("部门不能为空");
      } else {
        alert(1);
      }
    },
    // 异动取消
    cancel_2() {
      this.Change_1 = {
        name: "",
        type_1: "",
        dept: "",
        dept_1: "",
      };
      this.Change = false;
    },
    // 提交调薪
    submitForm_3() {
      if (this.salary_1.hjbgz.length === 0) {
        ElMessage("请输入您期望的调薪后基本工资");
      } else if (this.salary_1.remarks_1.length === 0) {
        ElMessage("请输入备注");
      } else if (this.salary_1.date1.length === 0) {
        ElMessage("请选择日期");
      } else {
        alert(1);
      }
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
    // 提交离职
    submitForm_4() {
      if (this.quit_1.type_1.length === 0) {
        ElMessage("请选择您的离职原因");
      } else if (this.quit_1.remarks_1.length === 0) {
        ElMessage("请输入您的离职说明");
      } else if (this.quit_1.date1.length === 0) {
        ElMessage("请选择日期");
      } else {
        alert(1);
      }
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
    // 提交加班
    submitForm_5() {
      if (this.overtime_1.type_1.length === 0) {
        ElMessage("请选择您的加班类型");
      } else if (this.overtime_1.date1.length === 0) {
        ElMessage("请选择开始时间");
      } else if (this.overtime_1.date2.length === 0) {
        ElMessage("请选择结束时间");
      } else if (this.overtime_1.remarks_1.length === 0) {
        ElMessage("请输入加班事由");
      } else {
        alert(1);
      }
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
    // 时间
    cancel_date() {
      this.overtime_1.type_1 = "";
      this.overtime_1.date1 = "";
      this.overtime_1.date2 = "";
      this.overtime_1.date3 = "";
    },
    // 提交补打卡
    submitForm_6() {
      if (this.punch_1.type_1.length === 0) {
        ElMessage("请选择您的补打卡类型");
      } else if (this.punch_1.date1.length === 0) {
        ElMessage("请选择实际打卡时间");
      } else if (this.punch_1.remarks_1.length === 0) {
        ElMessage("请输入补打卡备注");
      } else {
        alert(1);
      }
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
    // 提交出差
    submitForm_7() {
      if (this.travel_1.remarks_1.length === 0) {
        ElMessage("请输入出差地址");
      } else if (this.travel_1.remarks_2.length === 0) {
        ElMessage("请输入出差事由");
      } else if (this.travel_1.date1.length === 0) {
        ElMessage("请选择开始时间");
      } else if (this.travel_1.date2.length === 0) {
        ElMessage("请选择结束时间");
      } else {
        alert(1);
      }
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
    // 提交请假
    submitForm_8() {
      if (this.sick_1.remarks_1.length === 0) {
        ElMessage("请输入请假事由");
      } else if (this.sick_1.date1.length === 0) {
        ElMessage("请选择开始时间");
      } else if (this.sick_1.date2.length === 0) {
        ElMessage("请选择结束时间");
      } else {
        alert(1);
      }
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
    handleChange() {
      for (let i = 0; i < this.selectedOptions.length; i++) {
        this.travel_1.remarks_1 += CodeToText[this.selectedOptions[i]];
      }
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
      console.log(jbtype);
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
        console.log("minutes " + minutes);
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
            this.overtime_1.date3 = hours + "小时";
          }
        } else if (jbtype === "休息日加班") {
          if (hours > 8) {
            ElMessage({
              message: "休息日加班时间不能大于8小时，请重新选择!",
              type: "warning",
            });
            this.cancel_date();
          } else {
            this.overtime_1.date3 = hours + "小时";
          }
        } else if (jbtype === "节假日加班") {
          if (hours > 8) {
            ElMessage({
              message: "节假日加班时间不能大于8小时，请重新选择!",
              type: "warning",
            });
            this.cancel_date();
          } else {
            this.overtime_1.date3 = hours + "小时";
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
        console.log("天数：" + days);
        var hours = Math.floor(days * 8);
        console.log("时间差：" + hours);
        if (hours == 0) {
          ElMessage({
            message: "开始时间与结束时间相同，请重新选择!",
            type: "warning",
          });
          this.cancel_date2();
        } else {
          this.travel_1.date3 = hours + "小时";
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
        console.log("天数：" + days);
        var hours = Math.floor(days * 8);
        console.log("时间差：" + hours);
        if (hours == 0) {
          ElMessage({
            message: "开始时间与结束时间相同，请重新选择!",
            type: "warning",
          });
          this.cancel_date3();
        } else {
          this.sick_1.date3 = hours + "小时";
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
  },
});
</script>

<style scoped>
@import url("../../css/Examine_1.css");
</style>