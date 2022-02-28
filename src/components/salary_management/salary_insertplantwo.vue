<!--新增编辑考勤方案 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-head">
        <div class="j-card-head-title" style="margin-left:20px;">
          <span>{{this.name}}考勤方案</span>
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
                    <el-input v-model="tableData.attendandceName"></el-input>
                  </el-form-item>



                  <el-form-item label="迟到：" prop="late">
                    <el-select v-model="ruleForm.late" placeholder="请选择">
<!--                      <el-option label="按固定金额扣款" value="latebyfixed" style="margin-left: 20px;"></el-option>-->
<!--                      <el-option label="按迟到时长扣款" value="latebyhour" style="margin-left: 20px;"></el-option>-->
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
<!--                      <el-option label="按固定金额扣款" value="earlybyfixed" style="margin-left: 20px;"></el-option>-->
<!--                      <el-option label="按早退时长扣款" value="earlybyhour" style="margin-left: 20px;"></el-option>-->
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




<!--                  <el-form-item label="未签到：" prop="notsignin">-->
<!--                    <el-select v-model="ruleForm.notsignin" placeholder="请选择">-->
<!--                      <el-option label="按固定金额扣款" value="inbyfixed" style="margin-left: 20px;"></el-option>-->
<!--                      <el-option label="按未签到时长扣款" value="inbyhour" style="margin-left: 20px;"></el-option>-->
<!--                      <el-option label="按未签到次数扣款" value="inbynumber" style="margin-left: 20px;"></el-option>-->
<!--                    </el-select>-->
<!--                  </el-form-item>-->

<!--                  <el-form-item label="扣款："  style="width:500px"-->
<!--                                v-if="ruleForm.notsignin=='inbyfixed'">-->
<!--                    <el-input-number-->
<!--                        v-model="num3"-->
<!--                        :min="0"-->
<!--                        :max="10000"-->
<!--                        controls-position="right"-->
<!--                        @change="handleChange"-->
<!--                        size="small"-->
<!--                    />-->
<!--                    <span>元/月</span>-->
<!--                  </el-form-item>-->

<!--                  <el-form-item label="扣款："  style="width:500px"-->
<!--                                v-else-if="ruleForm.notsignin=='inbyhour'">-->
<!--                    <el-input-number-->
<!--                        v-model="num3"-->
<!--                        :min="0"-->
<!--                        :max="10000"-->
<!--                        controls-position="right"-->
<!--                        @change="handleChange"-->
<!--                        size="small"-->
<!--                    />-->
<!--                    <span>元x未签到的分钟数</span>-->
<!--                  </el-form-item>-->

<!--                  <el-form-item label="扣款："  style="width:500px"-->
<!--                                v-else="ruleForm.notsignin=='inbynumber'">-->
<!--                    <el-input-number-->
<!--                        v-model="num3"-->
<!--                        :min="0"-->
<!--                        :max="10000"-->
<!--                        controls-position="right"-->
<!--                        @change="handleChange"-->
<!--                        size="small"-->
<!--                    />-->
<!--                    <span>元x未签到次数</span>-->
<!--                  </el-form-item>-->



<!--                  <el-form-item label="未签退：" prop="notsignback">-->
<!--                    <el-select v-model="ruleForm.notsignback" placeholder="请选择">-->
<!--                      <el-option label="按固定金额扣款" value="backbyfixed" style="margin-left: 20px;"></el-option>-->
<!--                      <el-option label="按未签退时长扣款" value="backbyhour" style="margin-left: 20px;"></el-option>-->
<!--                      <el-option label="按未签退次数扣款" value="backbynumber" style="margin-left: 20px;"></el-option>-->
<!--                    </el-select>-->
<!--                  </el-form-item>-->

<!--                  <el-form-item label="扣款："  style="width:500px"-->
<!--                                v-if="ruleForm.notsignback=='backbyfixed'">-->
<!--                    <el-input-number-->
<!--                        v-model="num4"-->
<!--                        :min="0"-->
<!--                        :max="10000"-->
<!--                        controls-position="right"-->
<!--                        @change="handleChange"-->
<!--                        size="small"-->
<!--                    />-->
<!--                    <span>元/月</span>-->
<!--                  </el-form-item>-->

<!--                  <el-form-item label="扣款："  style="width:500px"-->
<!--                                v-else-if="ruleForm.notsignback=='backbyhour'">-->
<!--                    <el-input-number-->
<!--                        v-model="num4"-->
<!--                        :min="0"-->
<!--                        :max="10000"-->
<!--                        controls-position="right"-->
<!--                        @change="handleChange"-->
<!--                        size="small"-->
<!--                    />-->
<!--                    <span>元x未签退的分钟数</span>-->
<!--                  </el-form-item>-->

<!--                  <el-form-item label="扣款："  style="width:500px"-->
<!--                                v-else="ruleForm.notsignback=='backbynumber'">-->
<!--                    <el-input-number-->
<!--                        v-model="num4"-->
<!--                        :min="0"-->
<!--                        :max="10000"-->
<!--                        controls-position="right"-->
<!--                        @change="handleChange"-->
<!--                        size="small"-->
<!--                    />-->
<!--                    <span>元x未签退次数</span>-->
<!--                  </el-form-item>-->




                  <el-form-item label="旷工：" prop="absent">
                    <el-select v-model="ruleForm.absent" placeholder="请选择">
                      <el-option label="按旷工次数" value="absentbyhour" style="margin-left: 20px;"></el-option>
<!--                      <el-option label="按月累计旷工时长扣款" value="absentbytime" style="margin-left: 20px;"></el-option>-->
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

                  <el-form-item label="扣款："  style="width:500px"
                                v-else="">
                    <el-input-number
                        v-model="num5"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元x旷工次数</span>
                  </el-form-item>






                  <el-form-item label="适用对象" prop="suitableusers">
                    <el-select v-model="tableData.deptName" placeholder="请选择">
                      <el-option  style="margin-left: 20px;"
                                  v-for="item in dept_name"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>


<!--                  <el-form-item label="职位" prop="post">-->
<!--                    <el-select v-model="ruleForm.post" placeholder="请选择">-->
<!--                      <el-option label="212" value="post1" style="margin-left: 20px;"></el-option>-->
<!--                      <el-option label="22222" value="post2" style="margin-left: 20px;"></el-option>-->
<!--                    </el-select>-->
<!--                  </el-form-item>-->














                  <el-form-item label="备注" prop="remark" style="width:500px">
                    <el-input v-model="tableData.attendandceRemark" type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button style="width: 60px;" @click="this.$parent.$data.salary_insertplantwo=false,this.$parent.$data.attendanceplan=true
">取消</el-button>&nbsp;
                    <el-button type="primary" style="width: 60px;" @click="attands(),this.$parent.$data.salary_insertplantwo=false,this.$parent.$data.attendanceplan=true
                                                              "
                    >提交</el-button
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
  props:['name'],
  data() {

    return {
      tableData:[],
      //请求的路径
      url: "http://localhost:80/",
      dept_name:[],
      //考勤扣款
      attendanceplan:'/salary/attendanceplan',
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
      // rules: {
      //   schemename:[
      //     {
      //       required: true,
      //       message: '请输入方案名称',
      //       trigger: 'blur',
      //     }
      //   ],
      //   late: [
      //     {
      //       required: true,
      //       message: '请选择迟到规则',
      //       trigger: 'change',
      //     },
      //   ],
      //   early: [
      //     {
      //       required: true,
      //       message: '请选择早退规则',
      //       trigger: 'change',
      //     },
      //   ],
      //   notsignin: [
      //     {
      //       required: true,
      //       message: '请选择未签到规则',
      //       trigger: 'change',
      //     },
      //   ],
      //   notsignback: [
      //     {
      //       required: true,
      //       message: '请选择未签退规则',
      //       trigger: 'change',
      //     },
      //   ],
      //   absent: [
      //     {
      //       required: true,
      //       message: '请选择旷工规则',
      //       trigger: 'change',
      //     },
      //   ],
      //
      // }
    }
  },
  methods:{
    //添加考勤扣款方案
    insertAttendandce() {
      this.axios({
        method: 'post',
        url: this.url + 'insertAttendandce',
        data: {
          //方案名称
          attendandceName:this.tableData.attendandceName,
          //迟到一次金额
          attendandceLitemoney:this.num,
          //早退一次金额
          attendandceLeavemoney:this.num2,
          //未签到一次金额
          attendandceDidnotmoney:this.num3,
          //未签退一次金额
          attendandceDidbackmoney:this.num4,
          //旷工一次金额
          attendandceAbscntmoney:this.num5,
          //适用对象
          deptName:this.tableData.deptName,
          //备注
          attendandceRemark:this.tableData.attendandceRemark,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              //如果是成功
              ElNotification({
                title: '提示',
                message: '添加成功',
                type: 'success',
              })
              this.$parent.$parent.$data.selectAttendandce();
              this.$store.commit("updateToken", response.data.data.token);
            } else {
              ElMessage({
                type: 'warning',
                message: response.data.data.info,
              })
            }
          }else {
            ElNotification.error({
              title: '提示',
              message: response.data.data.info,
              offset: 100,
            })
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
    //查询部门名称
    selectSect() {
      this.axios({
        method: 'post',
        url: this.url + 'selectSect',
        data: {
          //staffId:this.tableData.staffId,
        }
      }).then((response) => {
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              //初始化
              this.dept_name = [];
              //循环部门列表
              for (let i = 0; i < response.data.data.info.length; i++) {
                //一个一个存起来
                this.dept_name.push({
                  value: response.data.data.info[i].deptName,
                  label: response.data.data.info[i].deptName
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
    //根据id查询考勤扣款方案
    selectAttendandceAll(id) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectAttendandceAll',
        data:{
          attendandceId:this.$parent.$data.attendancePlan,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              _this.tableData = response.data.data.info[0];
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
    //修改考勤扣款方案
    updateAttendandce(id) {
      var _this = this
      this.axios({
        method: 'put',
        url: this.url + 'updateAttendandce',
        data: {
          //编号
          attendandceId: this.tableData.attendandceId,
          //方案名称
          attendandceName:this.tableData.attendandceName,
          //迟到一次金额
          attendandceLitemoney:this.num,
          //早退一次金额
          attendandceLeavemoney:this.num2,
          //未签到一次金额
          attendandceDidnotmoney:this.num3,
          //未签退一次金额
          attendandceDidbackmoney:this.num4,
          //旷工一次金额
          attendandceAbscntmoney:this.num5,
          //适用对象
          deptName:this.tableData.deptName,
          //备注
          attendandceRemark:this.tableData.attendandceRemark,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              //如果是成功
              if (response.data.data.info == 999) {
                this.selectAttendandceAll();
                ElNotification({
                  title: '提示',
                  message: '修改成功',
                  type: 'success',
                })
                this.$store.commit("updateToken", response.data.data.token);
              } else {
                ElMessage({
                  type: 'warning',
                  message: response.data.data.info,
                })
              }
            }else {
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
    //添加或者修改方法
    attands(){
      if(this.name=='新增'){
        this.insertAttendandce();
      }else {
        this.updateAttendandce(this.tableData.attendandceId)
      }
    }
  },mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    //查询部门名称
    this.selectSect();
    //根据id查询加班方案
    if (this.name=="新增"){
      this.tableData={}
    }else{
      this.selectAttendandceAll(this.$parent.$data.attendancePlan);
    }

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