<template>

  <!-- 参保人员管理 -->
  <div class="saas-main-content" v-if="insured_scheme==false">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <div class="one">批量参保</div>

        <div class="all-input">
          参保方案:
          <el-select
              v-model="scheme_name"
              style="width: 300px"
              size="small"
              clearable
              placeholder="请选择"
              @change="nameChange"
          >
            <el-option
                v-for="item in insuredList_name"
                :key="item.defInsuredId"
                :label="item.defInsuredName"
                :value="item.defInsuredId"
            >
            </el-option>
          </el-select>
          <el-popover placement="top" :width="225" trigger="hover">
            <template #reference>
              <el-button type="text"
              ><i class="iconfont">&nbsp; &#xe619;</i></el-button
              >
            </template>
            <span style="color: #938c8c"
            >添加社保方案请前往<span @click="insured_scheme=true" style="color:#1d95e0;cursor: pointer">&nbsp;参保方案&nbsp;</span>页</span
            >
          </el-popover>
          <br/><br/>

          <!-- 填写基本参数的表单 -->
          <div style="text-align: center">
            <!-- left -->
            <div class="form-div">
              <el-switch
                  v-model="socialSwitch"
                  class="form-seitch"
                  inline-prompt
                  active-text="开"
                  inactive-text="关"
                  :disabled="scheme_name!=''?false:true"
              />
              <el-form :rules="rules" :model="formValue" ref="fromValue">
                <el-form-item prop="socialNumber">
                  社保基数：
                  <el-input-number
                      style="width: 220px"
                      v-model="socialNumber"
                      size="small"
                      :min="0"
                      controls-position="right"
                      :disabled="socialSwitch!=true"
                      placeholder="请输入社保基数"
                  />
                </el-form-item>
                <el-form-item prop="inMonth">
                  参保月份：
                  <el-date-picker
                      size="small"
                      v-model="formValue.inMonth"
                      type="month"
                      disabled
                      placeholder="选择参保月份"
                  />
                </el-form-item>
                <el-form-item>
                  计薪月份：
                  <el-date-picker
                      size="small"
                      type="month"
                      v-model="time"
                      disabled
                      placeholder="选择计薪月份"
                  />
                </el-form-item>
              </el-form>
            </div>

            <!-- right -->
            <div class="form-div">
              <el-switch
                  v-model="fundSwitch"
                  class="form-seitch"
                  inline-prompt
                  active-text="开"
                  inactive-text="关"
                  :disabled="scheme_name!=''?false:true"
              />
              <el-form :rules="rules" :model="formValue" ref="fromValue">
                <el-form-item prop="fundNumber">
                  积金基数：
                  <el-input-number
                      style="width: 220px"
                      size="small"
                      :min="0"
                      controls-position="right"
                      v-model="fundNumber"
                      :disabled="fundSwitch!=true"
                      placeholder="请输入公积金基数"
                  />
                </el-form-item>
                <el-form-item prop="inMonth">
                  参保月份：
                  <el-date-picker
                      size="small"
                      type="month"
                      v-model="formValue.inMonth"
                      disabled
                      placeholder="选择参保月份"
                  />
                </el-form-item>
                <el-form-item>
                  计薪月份：
                  <el-date-picker
                      size="small"
                      type="month"
                      disabled
                      v-model="time"
                      placeholder="选择计薪月份"
                  />
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <!-- 表格按钮部分 -->
        <div class="mt-20 ml-20 mr-20">
          <!-- 提交按钮 -->
          <el-button size="small" type="primary" @click="save" :disabled="selectStaffList==''">提交</el-button>
          <!-- 搜索框 -->
          <el-input v-model="staffName" size="small" class="resume-operation" @input="next" placeholder="输入姓名">
            <template #suffix>
              <el-icon class="el-input__icon">
                <i-search/>
              </el-icon>
            </template>
          </el-input>

          <!-- 下拉选择器 -->
          <div style="width: 200px" class="resume-operation">
            <el-select
                size="small"
                v-model="deptName"
                clearable
                placeholder="选择部门"
                @change="next"
            >
              <el-option
                  v-for="item in deptS"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptName"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table :data="staffList" stripe style="width: 100%" @selection-change="check">
            <!-- 多选框 -->
            <el-table-column type="selection" align="center" width="55"/>
            <el-table-column :index="indexMethod" type="index" align="center" label="序号"/>
            <el-table-column prop="staffName" align="center" label="姓名"/>
            <el-table-column prop="dept.deptName" align="center" label="部门"/>
            <el-table-column prop="deptPost.postName" align="center" label="职位"/>
            <el-table-column prop="staffPhone" align="center" label="电话号码"/>
            <el-table-column prop="createdTime" align="center" label="入职日期"/>
            <el-table-column prop="workerDate" align="center" label="转正日期"/>
          </el-table>
        </div>

        <!-- 分页插件 -->
        <div class="demo-pagination-block">
          <el-pagination v-model:current-page="pageInfo.currenPage"
                         v-model:page-size="pageInfo.pageSize"
                         :default-page-size="pageInfo.pageSize"
                         :page-sizes="[5, 10,15,20]"
                         :pager-count="5"
                         :total="pageInfo.total"
                         background
                         layout="	total ,sizes, prev, pager, next, jumper"
                         next-text="下一页"
                         prev-text="上一页"
                         @size-change="next()"
                         @current-change="next()"
                         @prev-click="next()"
                         @next-click="next()">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
  &nbsp;<insured_scheme v-if="insured_scheme"/>
</template>

<script>
import {ref, defineComponent} from "vue";
import insured_scheme from '../social_management/insured_scheme.vue';
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";

export default {
  components: {
    insured_scheme
  },
  data() {
    let time = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('请选择参保月份'));
      } else if (value > new Date()) {
        return callback(new Error('暂不支持提前参保'));
      } else {
        callback();
      }
    }
    return {
      //当前时间
      time: new Date(),
      //访问地址
      url: 'http://localhost:80/social/',
      // 参保方案
      scheme_name: '',
      //社保开关
      socialSwitch: false,
      //积金开关
      fundSwitch: false,
      // 参保方案下拉选择器值
      insured_scheme: false,
      //社保基数
      socialNumber: '',
      //积金基数
      fundNumber: '',
      //参保月份
      formValue: {
        inMonth: new Date(),
      },
      //员工名称
      staffName: '',
      //部门名称
      deptName: '',
      //员工列表
      staffList: [],
      //参保方案列表
      insuredList_name: [],
      // 分页
      pageInfo: {
        /* 当前的页 */
        currenPage: 1,
        //页大小
        pageSize: 5,
        //总条数
        total: 0,
      },
      // 选择部门 下拉选择器
      deptS: [],
      // 表单验证
      rules: {
        // //积金月份
        // inMonth: [
        //   {
        //     required: true,
        //     validator: time,
        //     trigger: 'change',
        //   }
        // ]
      },
      //选择的员工列表
      selectStaffList: [],
    };
  }, methods: {
    //选择器
    check(val) {
      this.selectStaffList = val;
    },
    //提交按钮操作
    save() {
      this.$refs['fromValue'].validate((valid) => {
        if (valid) {
          if (this.scheme_name != '') {
            ElMessageBox.confirm(
                '是否确认提交所选数据项?',
                '系统提示',
                {
                  cancelButtonText: '取消',
                  confirmButtonText: '确认',
                  type: 'warning',
                }
            ).then(() => {
              this.axios({
                method: 'post',
                url: this.url + 'insuredSubmit',
                data: {
                  //选择的员工列表
                  selectStaffList: this.selectStaffList,
                  //社保方案编号
                  scheme_id: this.scheme_name,
                  //操作人
                  staffName: this.$store.state.staffMessage.staffName,
                  //缴纳的社保积金
                  payment: {
                    //社保基数
                    socialNumber: this.socialNumber,
                    //积金基数
                    fundNumber: this.fundNumber,
                    //参保月份
                    inMonth: this.formValue.inMonth,
                    //计薪月份
                    time: this.time,
                  }
                },
                responseType: 'json',
                responseEncoding: 'utf-8',
              }).then((response) => {
                if (response.data.code == 200) {
                 if (response.data.data) {
                    //如果服务是正常的
                    if (response.data.data.state == 200) {
                      //如果是成功
                      if (response.data.data.info == "成功") {
                        this.next();
                        ElMessage({
                          type: 'success',
                          message: '提交成功',
                        })
                        this.$store.commit("updateToken", response.data.data.token);
                      } else {
                        ElMessage({
                          type: 'warning',
                          message: response.data.data.info,
                        })
                      }
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
            }).catch(() => {
              ElMessage({
                type: 'info',
                message: '取消成功',
              })
            })
          } else {
            ElMessage({
              type: 'warning',
              message: "请选择参保方案",
            })
          }
        } else {
          return false
        }
      })
    },
    //名称选择
    nameChange() {
      //判断名称是否有值
      if (this.scheme_name != '') {
        this.fundSwitch = true;
        this.socialSwitch = true;
      } else {
        this.fundSwitch = false;
        this.socialSwitch = false;
        // 参保方案
        this.scheme_name = '';
        //社保基数
        this.socialNumber = '';
        //积金基数
        this.fundNumber = '';
      }
    },
    //部门列表
    deptList() {
      this.axios({
        method: 'get',
        url: this.url + 'deptList',
        responseEncoding: 'utf-8',
      }).then((response) => {

        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              this.deptS = response.data.data.info;
              this.$store.commit("updateToken", response.data.data.token);
            }
            //如果服务是雪崩的
            else {
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
    /*序号*/
    indexMethod(index) {
      let curpage = this.pageInfo.currenPage; //单前页码，具体看组件取值
      let limitpage = this.pageInfo.pageSize; //每页条数，具体是组件取值
      return index + 1 + (curpage - 1) * limitpage;
    },
    //查询所有的员工
    next() {
      this.axios({
        method: 'post',
        url: this.url + 'pageStaff',
        data: {
          //当前页
          currenPage: this.pageInfo.currenPage,
          //页大小
          pageSize: this.pageInfo.pageSize,
          //员工名称
          staffName: this.staffName,
          //部门名称
          deptName: this.deptName,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {

        if (response.data.code == 200) {
         if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              this.staffList = response.data.data.info.records;
              this.pageInfo.total = response.data.data.info.total
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
    //查询所有的社保方案
    selectDefInsuredListName() {
      this.axios({
        method: 'get',
        url: this.url + 'selectDefInsuredListName',
        responseEncoding: 'utf-8',
      }).then((response) => {

        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              this.insuredList_name = response.data.data.info;
              this.$store.commit("updateToken", response.data.data.token);
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
  }, mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    //参保方案
    this.selectDefInsuredListName();
    //查询所有的员工
    this.next();
    //部门列表
    this.deptList();
  }
};
</script>

<style scoped>

/* 表单验证 */
::v-deep .el-form-item__error {
  margin-left: 135px;
}

/* 开关 */
.form-seitch {
  padding: 40px 0 40px 0;
  margin-left: -300px;
}

/* 表单左右div */
.form-div {
  margin: 10px;
  display: inline-block;
  border: 1px solid #e5e8ed;
  width: 400px;
  height: 300px;
}

/* 输入框 */
.el-input {
  width: 50%;
  display: inline-block;
}

/* 外div 内边距 */
.all-input {
  /*  上、右、下、左  */
  padding: 10px 40px 25px 40px;
}

/* 批量参保 */
.one {
  font-size: 18px;
  border-bottom: 1px solid #f4f5f7;
  padding-bottom: 5px;
}

.j-card-body {
  padding: 10px 25px 20px 25px;
}

/* 调整输入框的高度 */
/* ::v-deep .el-input__inner {
  height: 32px;
} */

/* 分页 */
.demo-pagination-block {
  margin: 10px 0 10px 10px;
}


/**
	 * 下拉选择器样式
	 */
.resume-operation {
  float: right;
  width: 140px;
}

/* 外层阴影 */
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

.j-card-body {
  padding: 2%;
}

/* 去掉路由样式 */
a {
  text-decoration: none;
  color: #4779b9;
}

@font-face {
  font-family: 'iconfont';  /* Project id 2990377 */
  src: url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.woff2?t=1639139822080') format('woff2'),
  url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.woff?t=1639139822080') format('woff'),
  url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.ttf?t=1639139822080') format('truetype');
}
</style>

