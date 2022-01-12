<!--员工花名册办理离职页面-->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-head">
        <div class="j-card-head-title" style="margin-left:20px;">
          <span>办理离职</span>
        </div>
      </div>
      <div class="j-card-body">
        <div class="sub-Content__primary edit__forms">
          <div class="ant-spin-nested-loading">
            <div class="ant-spin-container">
              <div style="height:100%; width:50%; margin:auto;">
                <el-form
                    ref="ruleForm"
                    :model="tableData"
                    :rules="rules"
                    label-width="120px"
                    class="demo-ruleForm"
                >
                  <el-form-item label="名称" prop="name" style="width:500px">
                    <el-input v-model="tableData.staffName" disabled></el-input>
                  </el-form-item>

                  <el-form-item label="状态" style="width:500px">
                    <el-input v-model="tableData.staffState" disabled></el-input>
                  </el-form-item>

                  <el-form-item label="离职原因" prop="cause" style="width:500px;">
                    <el-select
                        v-model="tableData.cause"
                        placeholder="请选择"
                    >
                      <el-option label="家庭原因" value="家庭原因" style="margin-left: 20px"></el-option>
                      <el-option label="实习生返校" value="实习生返校" style="margin-left: 20px"></el-option>
                      <el-option label="回校深造" value="回校深造" style="margin-left: 20px"></el-option>
                      <el-option label="交通不便" value="交通不便" style="margin-left: 20px"></el-option>
                      <el-option label="身体健康因素" value="身体健康因素" style="margin-left: 20px"></el-option>
                      <el-option label="薪资原因" value="薪资原因" style="margin-left: 20px"></el-option>
                      <el-option label="福利原因" value="福利原因" style="margin-left: 20px"></el-option>
                      <el-option label="个人发展原因" value="个人发展原因" style="margin-left: 20px"></el-option>
                      <el-option label="人际关系不融洽" value="人际关系不融洽" style="margin-left: 20px"></el-option>
                      <el-option label="工作环境不适应" value="工作环境不适应" style="margin-left: 20px"></el-option>
                      <el-option label="团队气氛不适应" value="团队气氛不适应" style="margin-left: 20px"></el-option>
                      <el-option label="企业文化不适应" value="企业文化不适应" style="margin-left: 20px"></el-option>
                      <el-option label="工作职责及目标不明确" value="工作职责及目标不明确" style="margin-left: 20px"></el-option>
                      <el-option label="未得到充分的支持和授权" value="未得到充分的支持和授权" style="margin-left: 20px"></el-option>
                      <el-option label="其它" value="其它" style="margin-left: 20px"></el-option>
                    </el-select>
                  </el-form-item>

<!--                  <el-form-item label="最后工作时间" required style="width:600px;height: 40.8px;">-->
<!--                    <el-col :span="11">-->
<!--                      <el-form-item prop="workdate">-->
<!--                        <el-date-picker-->
<!--                            v-model="ruleForm.workdate"-->
<!--                            type="date"-->
<!--                            placeholder="请选择日期"-->
<!--                            style="width: 100%"-->
<!--                        ></el-date-picker>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                  </el-form-item>-->

                  <el-form-item label="离职生效时间" required style="width:600px;height: 40.8px;">
                    <el-col :span="11">
                      <el-form-item prop="dimisiondate">
                        <el-date-picker
                            v-model="tableData.dimisiondate"
                            type="date"
                            placeholder="请选择日期"
                            style="width: 100%"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="备注" style="width:500px" prop="remark">
                    <el-input v-model="tableData.remark" type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button style="width: 80px;"
                               @click="this.$parent.$data.employee_dimission=false">取消
                    </el-button>
                    <el-button style="width: 80px" type="primary" @click="submitForm('ruleForm')"
                    >提交
                    </el-button
                    >

                  </el-form-item>
                </el-form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage, ElNotification} from "element-plus";

export default {
  data() {
    // const one = (rule, value, callback) => {
    //   if (new Date() > value) {
    //     callback(new Error("最后工作时间不能小于当前时间"));
    //   } else if (this.ruleForm.dimisiondate < value) {
    //     callback(new Error("最后工作时间不能大于离职生效时间"));
    //   } else {
    //     callback();
    //   }
    //
    // };
    // var date1=this.ruleForm.workdate;
    const two = (rule, value, callback) => {
      // if (this.ruleForm.workdate > value) {
      //   callback(new Error("离职生效时间不能小于最后工作时间"));} else
      if (new Date() > value) {
        callback(new Error("离职生效时间不能小于当前时间"));
      } else {
        callback();
      }
    };
    return {
      tableData: {
        cause: "",
        workdate: '',
        dimisiondate: '',
        remark: "",
      },
      url: "http://localhost:80/",
      //员工花名册
      book: '/employee/message/employee_roster/book',
      // ruleForm: {
      //   name: "",
      //   state: "",
      //
      // },
      rules: {
        cause: [
          {
            required: true,
            message: "请选择离职原因",
            trigger: "change",
          },
        ],
        // workdate: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "请选择最后工作时间",
        //     trigger: "change",
        //   },
        //   // {
        //   //   validator: one, trigger: "change"
        //   // }
        // ],
        dimisiondate: [
          {
            type: "date",
            required: true,
            message: "请选择离职生效时间",
            trigger: "change",
          },
          {
            validator: two, trigger: "change"
          }
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //根据id查询员工信息
    selectStaffAll(id) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectStaffAll',
        data: {
          staffId: this.$parent.$data.one,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
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
            _this.tableData = response.data.data.info[0];
            if(this.tableData.staffState==0){
              this.tableData.staffState="试用";
            }else if(this.tableData.staffState==1){
              this.tableData.staffState="正式";
            }else if(this.tableData.staffState==2){
              this.tableData.staffState="离职";
            }


          }
          //如果服务是雪崩的
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
  },mounted() {
    console.log(this)
    this.selectStaffAll(this.$parent.$data.one)
  }
}
</script>

<style scoped>
@import url("../../css/dimission.css");
@import url("../../css/navigation.css");
</style>
