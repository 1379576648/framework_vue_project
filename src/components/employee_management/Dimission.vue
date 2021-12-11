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
                :model="ruleForm"
                :rules="rules"
                label-width="120px"
                class="demo-ruleForm"
              >
                <el-form-item label="名称" prop="name"  style="width:500px">
                  <el-input v-model="ruleForm.name" disabled></el-input>
                </el-form-item>

                <el-form-item label="状态" style="width:500px">
                  <el-input v-model="ruleForm.state" disabled></el-input>
                </el-form-item>

                <el-form-item label="离职原因" prop="region" style="width:500px">
                  <el-select
                    v-model="ruleForm.region"
                    placeholder="请选择"
                  >
                    <el-option label="家庭原因" value="jtyy"></el-option>
                    <el-option label="实习生返校" value="sxsfx"></el-option>
                    <el-option label="回校深造" value="hxsz"></el-option>
                    <el-option label="交通不便" value="jtbb"></el-option>
                    <el-option label="身体健康因素" value="stjkys"></el-option>
                    <el-option label="薪资原因" value="xzyy"></el-option>
                    <el-option label="福利原因" value="flyy"></el-option>
                    <el-option label="个人发展原因" value="grfzyy"></el-option>
                    <el-option label="人际关系不融洽" value="rjgxyy"></el-option>
                    <el-option label="工作环境不适应" value="gzhjbsy"></el-option>
                    <el-option label="团队气氛不适应" value="tdqfbsy"></el-option>
                    <el-option label="企业文化不适应" value="qyehbsy"></el-option>
                    <el-option label="工作职责及目标不明确" value="gzzejmbbmq"></el-option>
                    <el-option label="未得到充分的支持和授权" value="wddcfdzchsq"></el-option>
                    <el-option label="其它" value="qt"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="最后工作时间" required style="width:500px">
                  <el-col :span="11">
                    <el-form-item prop="date1">
                      <el-date-picker
                        v-model="ruleForm.date1"
                        type="date"
                        placeholder="请选择日期"
                        style="width: 100%"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>

                 <el-form-item label="离职生效时间" required style="width:500px">
                  <el-col :span="11">
                    <el-form-item prop="date2">
                      <el-date-picker
                        v-model="ruleForm.date2"
                        type="date"
                        placeholder="请选择日期"
                        style="width: 100%"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>

                <el-form-item label="备注" style="width:500px">
                  <el-input v-model="ruleForm.desc" type="textarea"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')"
                    >提交</el-button
                  >
                 <router-link to="/staff" style="text-decoration: none">&nbsp;
                  <el-button>取消</el-button></router-link>
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

<script lang="ts">
export default {
  data() {
    return {
      ruleForm: {
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
        ],
        region: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
@import url(../../css/dimission.css);
</style>
