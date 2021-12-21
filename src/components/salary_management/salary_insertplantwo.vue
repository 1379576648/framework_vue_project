<!--新增编辑考勤方案 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-head">
        <div class="j-card-head-title" style="margin-left:20px;">
          <span>{{this.$route.query.name}}考勤方案</span>
        </div>
      </div>
      <div class="j-card-body">
        <div class="sub-Content__primary edit__forms">
          <div class="ant-spin-nested-loading">
            <div class="ant-spin-container">
              <div style="margin-left: 150px">
                <el-form
                    ref="ruleForm"
                    :model="ruleForm"
                    :rules="rules"
                    label-width="150px"
                    class="demo-ruleForm"
                >
                  <el-form-item label="方案名称：" prop="schemename" style="width:370px">
                    <el-input v-model="ruleForm.schemename"></el-input>
                  </el-form-item>



                  <el-form-item label="迟到：" prop="late">
                    <el-select v-model="ruleForm.late" placeholder="请选择">
                      <el-option label="按固定金额扣款" value="latebyfixed" style="margin-left: 20px;"></el-option>
                      <el-option label="按迟到时长扣款" value="latebyhour" style="margin-left: 20px;"></el-option>
                      <el-option label="按迟到次数扣款" value="latebynumber" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-if="ruleForm.late=='latebyfixed'">
                    <el-input-number
                        v-model="num"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元/月</span>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-else-if="ruleForm.late=='latebyhour'">
                    <el-input-number
                        v-model="num"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元x迟到的分钟数</span>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-else="ruleForm.late=='latebynumber'">
                    <el-input-number
                        v-model="num"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元x迟到次数</span>
                  </el-form-item>



                  <el-form-item label="早退：" prop="early">
                    <el-select v-model="ruleForm.early" placeholder="请选择">
                      <el-option label="按固定金额扣款" value="earlybyfixed" style="margin-left: 20px;"></el-option>
                      <el-option label="按早退时长扣款" value="earlybyhour" style="margin-left: 20px;"></el-option>
                      <el-option label="按早退次数扣款" value="earlybynumber" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-if="ruleForm.early=='earlybyfixed'">
                    <el-input-number
                        v-model="num2"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元/月</span>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-else-if="ruleForm.early=='earlybyhour'">
                    <el-input-number
                        v-model="num2"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元x早退的分钟数</span>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-else="ruleForm.early=='earlybynumber'">
                    <el-input-number
                        v-model="num2"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元x早退次数</span>
                  </el-form-item>




                  <el-form-item label="未签到：" prop="notsignin">
                    <el-select v-model="ruleForm.notsignin" placeholder="请选择">
                      <el-option label="按固定金额扣款" value="inbyfixed" style="margin-left: 20px;"></el-option>
                      <el-option label="按未签到时长扣款" value="inbyhour" style="margin-left: 20px;"></el-option>
                      <el-option label="按未签到次数扣款" value="inbynumber" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-if="ruleForm.notsignin=='inbyfixed'">
                    <el-input-number
                        v-model="num3"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元/月</span>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-else-if="ruleForm.notsignin=='inbyhour'">
                    <el-input-number
                        v-model="num3"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元x未签到的分钟数</span>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-else="ruleForm.notsignin=='inbynumber'">
                    <el-input-number
                        v-model="num3"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元x未签到次数</span>
                  </el-form-item>



                  <el-form-item label="未签退：" prop="notsignback">
                    <el-select v-model="ruleForm.notsignback" placeholder="请选择">
                      <el-option label="按固定金额扣款" value="backbyfixed" style="margin-left: 20px;"></el-option>
                      <el-option label="按未签退时长扣款" value="backbyhour" style="margin-left: 20px;"></el-option>
                      <el-option label="按未签退次数扣款" value="backbynumber" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-if="ruleForm.notsignback=='backbyfixed'">
                    <el-input-number
                        v-model="num4"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元/月</span>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-else-if="ruleForm.notsignback=='backbyhour'">
                    <el-input-number
                        v-model="num4"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元x未签退的分钟数</span>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-else="ruleForm.notsignback=='backbynumber'">
                    <el-input-number
                        v-model="num4"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元x未签退次数</span>
                  </el-form-item>




                  <el-form-item label="旷工：" prop="absent">
                    <el-select v-model="ruleForm.absent" placeholder="请选择">
                      <el-option label="按小时工资比例扣款" value="absentbyhour" style="margin-left: 20px;"></el-option>
                      <el-option label="按月累计旷工时长扣款" value="absentbytime" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-if="ruleForm.absent=='absentbytime'">
                    <el-input-number
                        v-model="num5"
                        :min="1"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元 × 旷工折算的小时数</span>
                  </el-form-item>

                  <el-form-item label="扣款：小时工资 X"  style="width:500px"
                                v-else="">
                    <el-input-number
                        v-model="num5"
                        :min="1"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>% × 旷工折算的小时数</span>
                  </el-form-item>






                  <el-form-item label="适用对象" prop="suitableusers">
                    <el-select v-model="ruleForm.suitableusers" placeholder="请选择">
                      <el-option label="1" value="suitableusers1" style="margin-left: 20px;"></el-option>
                      <el-option label="111" value="suitableusers2" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item>


                  <el-form-item label="职位" prop="post">
                    <el-select v-model="ruleForm.post" placeholder="请选择">
                      <el-option label="212" value="post1" style="margin-left: 20px;"></el-option>
                      <el-option label="22222" value="post2" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item>














                  <el-form-item label="备注" prop="remark" style="width:500px">
                    <el-input v-model="ruleForm.remark" type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" style="width: 60px;" @click="submitForm('ruleForm')"
                    >提交</el-button
                    >
                    <router-link to="/attendance">&nbsp;
                      <el-button @click="goblack()" style="width: 60px;">取消</el-button></router-link>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  &nbsp;
</template>




<script lang="ts">
import {ElMessage} from "element-plus";

export default {
  data() {

    return {
      ruleForm: {
        schemename: '',
        late: '',
        early: '',
        notsignin: '',
        notsignback: '',
        absent: '',
        suitableusers: '',
        post: '',
        remark: '',
      },
      num: '0',
      num2:'0',
      num3:'0',
      num4:'0',
      num5:'300',
      rules: {
        schemename:[
          {
            required: true,
            message: '请输入方案名称',
            trigger: 'blur',
          }
        ],
        late: [
          {
            required: true,
            message: '请选择迟到规则',
            trigger: 'change',
          },
        ],
        early: [
          {
            required: true,
            message: '请选择早退规则',
            trigger: 'change',
          },
        ],
        notsignin: [
          {
            required: true,
            message: '请选择未签到规则',
            trigger: 'change',
          },
        ],
        notsignback: [
          {
            required: true,
            message: '请选择未签退规则',
            trigger: 'change',
          },
        ],
        absent: [
          {
            required: true,
            message: '请选择旷工规则',
            trigger: 'change',
          },
        ],

      }
    }
  },
  methods:{
    goblack(){
      this.$router.go('-1');
    },
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
  }
}
</script>


<style scoped>
@import url("../../css/navigation.css");
@import url(../../css/dimission.css);

/deep/.el-form-item__label {
  flex: 0 0 auto;
  text-align: right;
  font-size: var(--el-form-label-font-size);
  color: var(--el-text-color-regular);
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
  width: 240px;
}
</style>