<!-- 新增招聘计划 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <!--标题-->
      <div class="j-card-head">
        <div class="j-card-head-title">
          <span>{{this.name}}招聘计划</span>
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
                <el-input v-model="ruleForm.zpname" type="text" onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')"></el-input>
              </el-form-item>

              <el-form-item label="需求部门" prop="zpdept">
                <el-select v-model="ruleForm.zpdept" style="width:380px;">
                  <el-option v-for="item in zpdept" :value="item.label" :key="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="招聘职位" prop="zpzw">
                <el-select v-model="ruleForm.zpzw" style="width:380px;">
                  <el-option v-for="item in zpzw" :value="item.label" :key="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>


              <el-form-item label="需招聘人数" prop="rs">
                <el-input-number
                    v-model="ruleForm.rs"
                    :min="1"
                    :max="50"
                    controls-position="right"
                />
              </el-form-item>

              <el-form-item label="最低学历" prop="xl">
                <el-select v-model="ruleForm.xl" placeholder="请选择">
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
                    v-model="ruleForm.sjfw"
                    type="daterange"
                    start-placeholder="Start Date"
                    end-placeholder="End Date"
                    :default-value="[new Date()]"
                    @change="judge(ruleForm.sjfw)"
                >

                </el-date-picker>
              </el-form-item>

              <el-form-item label="月薪范围" prop="yxfw">
                <el-select v-model="ruleForm.yxfw" placeholder="Activity zone">
                  <el-option v-for="item in yxfw" :value="item.label" :key="item.value" :label="item.label" ></el-option>
                </el-select>
              </el-form-item>


              <el-form-item>
                <el-button  style="margin-left: 30px; width: 100px" @click="this.$parent.$data.recruit_add_plan=false">取消</el-button>
                <el-button style="width: 100px;"  type="primary" @click="addRecruitmentPlan" :plain="true">提交</el-button>
              </el-form-item>

            </el-form>
          </div>




        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import { ref } from 'vue'
export default {
  setup() {
    const EmployAddRemark = ref(false);
    const textarea = ref('');
    const num = ref(1000);
    return {
      EmployAddRemark,
    };
  },
  props:['name'],
  data() {
    const rs = ref(1)
    return {
      //访问路径
      url: "http://localhost:80/",
      ruleForm: {
        //计划名称
        zpname: '',
        //人数
        rs:1,
        //学历
        xl: '',
        //时间范围
        sjfw:[],
        //职位
        zpzw:'',
        //需求部门
        zpdept: '',
        //月薪范围
        yxfw: [],
      },
    }
  },
  methods: {
    judge(value){
      console.log(value[0])
      console.log(value[1])
      console.log(value)
      var date = new Date();
      if (value[0]<date){
        ElMessage("时间选择有误");
        value[0]=''
      }
    },
    //提交按钮
    addRecruitmentPlan(){
      if(this.ruleForm.zpname.length===0){
        ElMessage("请填写招聘计划名称");
      }else if(this.ruleForm.zpdept.length===0){
        ElMessage("请选择需求部门");
      }else if(this.ruleForm.zpzw.length===0){
        ElMessage("请选择招聘职位");
      }else if(this.ruleForm.rs.length===0){
        ElMessage("请设置招聘人数");
      }else if(this.ruleForm.xl.length===0){
        ElMessage("请选择最低学历");
      }else if(this.ruleForm.sjfw.length===0){
        ElMessage("请选择计划时间");
      }else if(this.ruleForm.yxfw.length===0){
        ElMessage("请选择月薪范围");
      }else {
        this.axios({
          method: 'post',
          url: this.url + 'addRecruitmentPlan',
          data: {
            "recruitmentPlanName": this.ruleForm.zpname,
            "deptName": this.ruleForm.zpdept,
            "postName": this.ruleForm.zpzw,
            "recruitmentPlanNumber": this.ruleForm.rs,
            "educationName": this.ruleForm.xl,
            "recruitmentPlanStartTime": this.ruleForm.sjfw[0],
            "recruitmentPlanEndTime": this.ruleForm.sjfw[1],
            "monthlySalaryStar": this.ruleForm.yxfw != null ? this.ruleForm.yxfw.substring(0, this.ruleForm.yxfw.indexOf("-")) : '',
            "monthlySalaryEnd": this.ruleForm.yxfw != null ? this.ruleForm.yxfw.substring(this.ruleForm.yxfw.indexOf("-") + 1) : '',
          },
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          console.log("添加")
          console.log(response)
          if (response.data.code == 200) {
            if (response.data.data) {
              //如果服务是正常的
              if (response.data.data.state == 200) {
                //如果是成功
                if (response.data.data.succeed == "成功") {
                  this.$parent.$data.recruit_add_plan = false
                  this.$store.commit("updateToken", response.data.data.token);
                  ElMessage({
                    message: '录用成功',
                    type: 'success',
                  })
                }
              } else {
                ElNotification.warning({
                  title: '提示',
                  message: response.data.data.info,
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
      }
    },
    // 查询部门名称（新增招聘计划下拉列表框）
    selectDeptName1() {
      this.axios({
        method: 'post',
        url: this.url + 'selectDeptName1',
      }).then((response) => {
        console.log("查询部门名称")
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              //初始化
              this.zpdept=[];
              for(let i=0;i < response.data.data.succeed.length; i++){
                //存
                this.zpdept.push({
                  value : response.data.data.succeed[i].deptId,
                  label: response.data.data.succeed[i].deptName,
                })
              }
              this.$store.commit("updateToken", response.data.data.token);
            } else {
              ElNotification.error({
                title: '提示',
                message: response.data.data.info,
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
    // 查询部门名称（新增招聘计划下拉列表框）
    selectDeptPostName1() {
      this.axios({
        method: 'post',
        url: this.url + 'selectDeptPostName1',
      }).then((response) => {
        console.log("查询部门职位名称")
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              //初始化
              this.zpzw=[];
              for(let i=0;i < response.data.data.succeed.length; i++){
                //存
                this.zpzw.push({
                  value : response.data.data.succeed[i].deptPostId,
                  label: response.data.data.succeed[i].postName,
                })
              }
              this.$store.commit("updateToken", response.data.data.token);
            } else {
              ElNotification.error({
                title: '提示',
                message: response.data.data.info,
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
    // 查询部门名称（新增招聘计划下拉列表框）
    selectMonthlySalary() {
      this.axios({
        method: 'post',
        url: this.url + 'selectMonthlySalary',
      }).then((response) => {
        console.log("查询月薪范围")
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              //初始化
              this.yxfw=[];
              for(let i=0;i < response.data.data.succeed.length; i++){
                //存
                this.yxfw.push({
                  value : response.data.data.succeed[i].monthlySalaryId,
                  label: response.data.data.succeed[i].monthlySalaryStar+"-"+response.data.data.succeed[i].monthlySalaryEnd,
                })
              }
              this.$store.commit("updateToken", response.data.data.token);
            } else {
              ElNotification.error({
                title: '提示',
                message: response.data.data.info,
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
    }
  },mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    this.selectDeptName1()
    this.selectDeptPostName1()
    this.selectMonthlySalary()
  }
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
