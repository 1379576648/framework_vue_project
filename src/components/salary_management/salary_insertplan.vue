<!--新增编辑加班方案 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-head">
        <div class="j-card-head-title" style="margin-left:20px;">
          <span>{{this.$route.query.name}}加班方案</span>
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
            <el-form-item label="方案名称" prop="schemename" style="width:370px">
              <el-input v-model="ruleForm.schemename"></el-input>
            </el-form-item>

            <el-form-item label="工作日加班工资" prop="workday">
              <el-select v-model="ruleForm.workday" placeholder="请选择">
                <el-option label="按小时工资百分比计薪" style="margin-left: 20px;" value="workbyhour"></el-option>
                <el-option label="按固定金额" value="workbyfixed" style="margin-left: 20px;"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="发放："  style="width:500px"
             v-if="ruleForm.workday=='workbyfixed'">
                <el-input-number
                  v-model="num"
                  :min="1"
                  :max="10000"
                  controls-position="right"
                  @change="handleChange"
                  size="small"
              />
              <span>元 × 工作日加班折算的小时数</span>
            </el-form-item>

            <el-form-item label="发放：小时工资 X"  style="width:500px"
            v-else="">
              <el-input-number
                  v-model="num"
                  :min="1"
                  :max="10000"
                  controls-position="right"
                  @change="handleChange"
                  size="small"
              />
              <span>% × 工作日加班折算的小时数</span>
            </el-form-item>


            <el-form-item label="休息日加班工资" prop="offday">
              <el-select v-model="ruleForm.offday" placeholder="请选择">
                <el-option label="按小时工资百分比计薪" value="offbyhour" style="margin-left: 20px;"></el-option>
                <el-option label="按固定金额" value="offbyfixed" style="margin-left: 20px;"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="发放："  style="width:500px"
                          v-if="ruleForm.offday=='offbyfixed'">
              <el-input-number
                  v-model="num2"
                  :min="1"
                  :max="10000"
                  controls-position="right"
                  @change="handleChange"
                  size="small"
              />
              <span>元 × 休息日加班折算的小时数</span>
            </el-form-item>

            <el-form-item label="发放：小时工资 X"  style="width:500px"
                          v-else="">
              <el-input-number
                  v-model="num2"
                  :min="1"
                  :max="10000"
                  controls-position="right"
                  @change="handleChange"
                  size="small"
              />
              <span>% × 休息日加班折算的小时数</span>
            </el-form-item>


            <el-form-item label="节假日加班工资" prop="holiday">
              <el-select v-model="ruleForm.holiday" placeholder="请选择">
                <el-option label="按小时工资百分比计薪" value="holibyhour" style="margin-left: 20px;"></el-option>
                <el-option label="按固定金额" value="holibyfixed" style="margin-left: 20px;"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="发放："  style="width:500px"
                          v-if="ruleForm.holiday=='holibyfixed'">
              <el-input-number
                  v-model="num3"
                  :min="1"
                  :max="10000"
                  controls-position="right"
                  @change="handleChange"
                  size="small"
              />
              <span>元 × 节假日加班折算的小时数</span>
            </el-form-item>

            <el-form-item label="发放：小时工资 X"  style="width:500px"
                          v-else="">
              <el-input-number
                  v-model="num3"
                  :min="1"
                  :max="10000"
                  controls-position="right"
                  @change="handleChange"
                  size="small"
              />
              <span>% × 节假日加班折算的小时数</span>
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
              <el-button style="width: 60px;" @click="goblack()">取消</el-button>
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
import { ElMessage } from 'element-plus'
export default {
  data() {

    return {
      ruleForm: {
        schemename: '',
        workday: '',
        offday: '',
        holiday: '',
        suitableusers: '',
        post: '',
        remark: '',
      },
      num: '150',
      num2: '200',
      num3: '300',
      rules: {
        schemename:[
          {
            required: true,
            message: '请输入方案名称',
            trigger: 'blur',
          }
          ],
        workday: [
          {
            required: true,
            message: '请选择工作日加班规则',
            trigger: 'change',
          },
        ],
        offday: [
          {
            required: true,
            message: '请选择休息日加班规则',
            trigger: 'change',
          },
        ],
        holiday: [
          {
            required: true,
            message: '请选择节假日加班规则',
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