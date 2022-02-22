<!--新增编辑加班方案 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-head">
        <div class="j-card-head-title" style="margin-left:20px;">
          <span>{{ this.name }}加班方案</span>
        </div>
      </div>
      <div class="j-card-body">
        <div class="sub-Content__primary edit__forms">
          <div class="ant-spin-nested-loading">
            <div class="ant-spin-container">
              <div style="margin-left: 150px">
                <el-form
                    ref="tableData"
                    :model="tableData"
                    :rules="rules"
                    label-width="150px"
                    class="demo-ruleForm"
                >
                  <el-form-item label="方案名称" prop="schemename" style="width:370px">
                    <el-input v-model="this.tableData.workschemeName"></el-input>
                  </el-form-item>

                  <el-form-item label="工作日加班工资" prop="workday">
                    <el-select v-model="ruleForm.workday" placeholder="请选择">
                      <el-option label="按小时工资百分比计薪" style="margin-left: 20px;" value="按小时工资百分比计薪" selected="selected"></el-option>
                      <el-option label="按固定金额" value="按固定金额" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="发放：" style="width:500px"
                                v-if="ruleForm.workday=='按固定金额'">
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

                  <el-form-item label="发放：小时工资 X" style="width:500px"
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
                      <el-option label="按小时工资百分比计薪" value="按小时工资百分比计薪" style="margin-left: 20px;"></el-option>
                      <el-option label="按固定金额" value="按固定金额" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="发放：" style="width:500px"
                                v-if="ruleForm.offday=='按固定金额'">
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

                  <el-form-item label="发放：小时工资 X" style="width:500px"
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
                      <el-option label="按小时工资百分比计薪" value="按小时工资百分比计薪" style="margin-left: 20px;"></el-option>
                      <el-option label="按固定金额" value="按固定金额" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="发放：" style="width:500px"
                                v-if="ruleForm.holiday=='按固定金额'">
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

                  <el-form-item label="发放：小时工资 X" style="width:500px"
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
                    <el-select v-model="this.tableData.deptName" placeholder="请选择">
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
                    <el-input v-model="this.tableData.workschemeRemark" type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button style="width: 60px;" @click="this.$parent.$data.salary_insertplan=false,this.$parent.$data.callbackpay=true">取消</el-button>
                    <el-button type="primary" style="width: 60px;" @click="works(),this.$parent.$data.salary_insertplan=false,this.$parent.$data.callbackpay=true"
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
import {ElMessage, ElNotification} from 'element-plus'

export default {
  props: ['name'],
  data() {
    return {
      //判断添加还是修改加班方案
      workplaninsert:'',
      //请求的路径
      url: "http://localhost:80/",
      dept_name:[],
      tableData:[],
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
      // rules: {
      //   schemename: [
      //     {
      //       required: true,
      //       message: '请输入方案名称',
      //       trigger: 'blur',
      //     }
      //   ],
      //   workday: [
      //     {
      //       required: true,
      //       message: '请选择工作日加班规则',
      //       trigger: 'change',
      //     },
      //   ],
      //   offday: [
      //     {
      //       required: true,
      //       message: '请选择休息日加班规则',
      //       trigger: 'change',
      //     },
      //   ],
      //   holiday: [
      //     {
      //       required: true,
      //       message: '请选择节假日加班规则',
      //       trigger: 'change',
      //     },
      //   ],
      //
      // }
    }

  },
  methods: {
    //添加加班方案
    insertWorkScheme() {
      this.axios({
        method: 'post',
        url: this.url + 'insertWorkScheme',
        data: {
          //方案名称
          workschemeName:this.tableData.workschemeName,
          //工作日加班工资
          workschemeWorkratio:this.num,
          //休息日加班工资
          workschemeDayoffratio:this.num2,
          //节假日加班工资
          workschemeHolidayratio:this.num3,
          //适用对象
          deptName:this.tableData.deptName,
          //备注
          workschemeRemark:this.tableData.workschemeRemark,
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
              this.$parent.$parent.$parent.$parent.selectWorkScheme();
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
    //根据id查询加班方案
    selectWorkSchemeAll(id) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectWorkSchemeAll',
        data:{
          workSchemeId:this.$parent.$data.workplan,
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
    //修改加班方案
    updateWorkScheme(id) {
      var _this = this
      this.axios({
        method: 'put',
        url: this.url + 'updateWorkScheme',
        data: {
          //编号
          workSchemeId: this.tableData.workSchemeId,
          //方案名称
          workschemeName:this.tableData.workschemeName,
          //工作日加班工资
          workschemeWorkratio: this.num,
          //休息日加班工资
          workschemeDayoffratio:this.num2,
          //节假日加班工作
          workschemeHolidayratio:this.num3,
          //适用对象
          deptName:this.tableData.deptName,
          //备注
          workschemeRemark:this.tableData.workschemeRemark,
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
                this.selectWorkSchemeAll();
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
    works(){
      if(this.name=='新增'){
        this.insertWorkScheme();
      }else {
        this.updateWorkScheme(this.tableData.workSchemeId)
      }
    }
  },
  mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    //查询部门名称
    this.selectSect();
    //根据id查询加班方案
    if (this.name=="新增"){
      this.tableData={}
    }else{
      this.selectWorkSchemeAll(this.$parent.$data.workplan);
    }

  }

}
</script>


<style scoped>
@import url("../../css/navigation.css");
@import url(../../css/dimission.css);

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