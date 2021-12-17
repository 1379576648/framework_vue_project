<!-- 新增招聘计划 -->

<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <!--标题-->
      <div class="j-card-head">
        <div class="j-card-head-title">
          <span>{{this.$route.query.name}}招聘计划</span>
        </div>
      </div>
      <!--内容-->
      <div class="j-card-body ">
        <span></span>
        <div class="sub-Content__primary ">
          <div style="width: 50%; margin: auto;">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px"
                     class="demo-ruleForm">


              <el-form-item label="招聘计划名称" prop="zpname" style="width:500px;">
                <el-input v-model="ruleForm.zpname"></el-input>
              </el-form-item>

              <el-form-item label="需求部门" prop="zpdept">
                <el-select v-model="ruleForm.zpdept" style="width:380px;">
                  <el-option label="市场部" value="市场部"></el-option>
                  <el-option label="销售部" value="销售部"></el-option>
                  <el-option label="秘书办" value="秘书办"></el-option>
                  <el-option label="人才部" value="人才部"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="招聘职位" prop="zpzw">
                <el-select v-model="ruleForm.zpzw" style="width:380px;">
                  <el-option label="客服主管" value="客服主管"></el-option>
                  <el-option label="前端工程师" value="前端工程师"></el-option>
                  <el-option label="生产主管" value="生产主管"></el-option>
                  <el-option label="劳动关系专员" value="劳动关系专员"></el-option>
                </el-select>
              </el-form-item>


              <el-form-item label="需招聘人数" prop="zpnum">
                <el-input-number
                    v-model="ruleForm.zpnum"
                    :min="1"
                    :max="50"
                    controls-position="right"
                />
              </el-form-item>

              <el-form-item label="最低学历" prop="zpxl">
                <el-select v-model="ruleForm.zpxl" placeholder="请选择">
                  <el-option label="不限" value="不限"></el-option>
                  <el-option label="初中" value="初中"></el-option>
                  <el-option label="高中" value="高中"></el-option>
                  <el-option label="大专" value="大专"></el-option>
                  <el-option label="本科" value="本科"></el-option>
                  <el-option label="硕士" value="硕士"></el-option>
                  <el-option label="博士" value="博士"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="计划开始时间" required style="width:380px">
                <el-date-picker
                    v-model="ruleForm.timef"
                    type="daterange"
                    start-placeholder="Start Date"
                    end-placeholder="End Date"
                    :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="月薪范围" prop="zpxqf">
                <el-select v-model="ruleForm.zpxqf" placeholder="Activity zone">
                  <el-option label="3000-5000" value="3000-5000"></el-option>
                  <el-option label="5000-8000" value="5000-8000"></el-option>
                  <el-option label="8000-12000" value="8000-12000"></el-option>
                  <el-option label="12000以上" value="12000以上"></el-option>
                </el-select>
              </el-form-item>


              <el-form-item>
                <el-button style="width: 100px;"  type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button  style="margin-left: 30px; width: 100px" @click="goback()">取消</el-button>
              </el-form-item>

            </el-form>
          </div>




        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  data() {
    const zpnum = ref(1)
    return {
      ruleForm: {
        //计划名称
        zpname: '',
        //需求部门
        zpdept: '',
        //职位
        zpzw:'',
        //人数
        zpnum:1,
        //学历
        zpxl: '',
        //时间范围
        timef:'',
        //薪酬范围
        zpxqf: ''
      },
      rules: {
        zpname: [{
          required: true,
          message: '招聘计划名称不能为空!!!',
          trigger: 'blur',
        },
        ],
        zpdept: [{
          required: true,
          message: '请选择需求部门!!!',
          trigger: 'change',
        }, ],
        zpzw: [{
          required: true,
          message: '请设置招聘职位!!!',
          trigger: 'change',
        }, ],
        zpnum: [{
          required: true,
          message: '计划招聘人数不能为空!!!',
          trigger: 'blur',
        }, ],
        zpxl: [{
          required: true,
          message: '最低学历不能为空!!!',
          trigger: 'change',
        }, ],
        timef: [{
          required: true,
          message: '请选择招聘时间范围!!!',
          trigger: 'change',
        }, ],
        zpxqf: [{
          required: true,
          message: '请选择薪酬范围!!!',
          trigger: 'change',
        }, ],
      },
    }
  },
  methods: {
    //提交按钮
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
    //取消：跳转上一级目录
    goback(){
      this.$router.go('-1');
    }
  },
}
</script>



<style type="text/css" scoped>
.j-card-head {
  height: 48px;
  line-height: 48px;
  background: #fff;
  border-bottom: 1px solid #e9e9e9;
  margin: 0 24px;
  overflow: hidden;
}

/deep/.el-form-item {
  display: flex;
  margin-bottom: 35px;
}
	.j-card-head-title {
		float: left;
		font-size: 18px;
		display: inline-block;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		color: rgba(0, 0, 0, 0.85);
		font-weight: 500;
		letter-spacing: 0.3px;
	}

	.mainContent .sub-Content__primary {
		padding: 12px 24px;
		background: #fff;
		border-radius: 4px;
	}
.saas-main-content {
  padding-top: 12px;
  min-height: 500px;
}

.j-card-bordered {
  border: 1px solid #e9e9e9;
}

.j-card {
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  margin-top: 8px;
  min-height: 100%;
}
.j-card:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: transparent;
}
.j-card-bordered {
  border: 1px solid #e9e9e9;
  border-top-color: rgb(233, 233, 233);
  border-right-color: rgb(233, 233, 233);
  border-bottom-color: rgb(233, 233, 233);
  border-left-color: rgb(233, 233, 233);
}
.j-card {
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  margin-top: 8px;
  min-height: 100%;
}
</style>
