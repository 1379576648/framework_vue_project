<!--新增编辑出差方案 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-head">
        <div class="j-card-head-title" style="margin-left:20px;">
          <span>{{ this.name }}出差方案</span>
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

                  <el-form-item label="出差工资" prop="businesswage">
                    <el-select v-model="ruleForm.businesswage" placeholder="请选择">
                      <el-option label="按出差时长" value="wagebyhour" style="margin-left: 20px;"></el-option>
                      <el-option label="按固定金额" value="wagebyfixed" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="发放：" style="width:500px"
                                v-if="ruleForm.businesswage=='wagebyhour'">
                    <el-input-number
                        v-model="num"
                        :min="1"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元 × 出差的小时数</span>
                  </el-form-item>

                  <el-form-item label="发放：" style="width:500px"
                                v-else="">
                    <el-input-number
                        v-model="num"
                        :min="1"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元/次</span>
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
                    >提交
                    </el-button
                    >
                      <el-button style="width: 60px;" @click="this.$parent.$data.salary_insertplanthree=false,this.$parent.$data.evectionplan=true">取消</el-button>
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
  props: ['name'],
  data() {

    return {
      ruleForm: {
        schemename: '',
        businesswage: '',
        suitableusers: '',
        post: '',
        remark: '',
      },
      num: '150',
      rules: {
        schemename: [
          {
            required: true,
            message: '请输入方案名称',
            trigger: 'blur',
          }
        ],
        businesswage: [
          {
            required: true,
            message: '请选择出差工资规则',
            trigger: 'change',
          },
        ],
      }
    }
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
    }
  },mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
  }
}
</script>


<style scoped>
@import url(../../css/dimission.css);
@import url("../../css/navigation.css");

/deep/ .el-form-item__label {
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