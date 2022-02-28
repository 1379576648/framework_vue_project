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
                    <el-input v-model="tableData.businessName"></el-input>
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
                    <el-input v-model="tableData.businessRemark" type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button style="width: 60px;" @click="this.$parent.$data.salary_insertplanthree=false,this.$parent.$data.evectionplan=true">取消</el-button>
                    <el-button type="primary" style="width: 60px;" @click="evect(),this.$parent.$data.salary_insertplanthree=false,this.$parent.$data.evectionplan=true"
                    >提交
                    </el-button>
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


<script>
import {ElMessage, ElNotification} from "element-plus";

export default {
  props: ['name'],
  data() {

    return {
      //请求的路径
      url: "http://localhost:80/",
      tableData:[],
      ruleForm: {
        schemename: '',
        businesswage: '',
        suitableusers: '',
        post: '',
        remark: '',
      },
      num: '150',
      // rules: {
      //   schemename: [
      //     {
      //       required: true,
      //       message: '请输入方案名称',
      //       trigger: 'blur',
      //     }
      //   ],
      //   businesswage: [
      //     {
      //       required: true,
      //       message: '请选择出差工资规则',
      //       trigger: 'change',
      //     },
      //   ],
      // }
    }
  },
  methods: {
    //添加出差方案
    insertBusiness() {
      this.axios({
        method: 'post',
        url: this.url + 'insertBusiness',
        data: {
          //方案名称
          businessName:this.tableData.businessName,
          //出差一次金额
          businessOnemoney:this.num,
          //适用对象
          deptName:this.tableData.deptName,
          //备注
          businessRemark:this.tableData.businessRemark,
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
              this.$parent.$parent.$data.selectBusiness();
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
    //根据id查询出差方案
    selectBusinessAll(id) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectBusinessAll',
        data:{
          businessId:this.$parent.$data.evections,
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
    updateBusiness(id) {
      var _this = this
      this.axios({
        method: 'put',
        url: this.url + 'updateBusiness',
        data: {
          //编号
          businessId: this.tableData.businessId,
          //方案名称
          businessName:this.tableData.businessName,
          //出差一次金额
          businessOnemoney:this.num,
          //适用对象
          deptName:this.tableData.deptName,
          //备注
          businessRemark:this.tableData.businessRemark,
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
                this.selectBusinessAll();
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
    evect(){
      if(this.name=='新增'){
        this.insertBusiness();
      }else {
        this.updateBusiness(this.tableData.businessId)
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
      this.selectBusinessAll(this.$parent.$data.evections);
    }
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