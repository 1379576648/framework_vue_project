<template>


  <!-- body_3 隐藏的那个框 -->
  <div class="body_3" v-show="disly">
    <h3 style="margin-top:1px;">定薪</h3><br/>
    <el-form :inline="true" ref="formInline" :model="tableData" :rules="rules" class="demo-form-inline">
      <el-form-item>
        <template #label>
          <div class="el-form-item__label">试用期基本工资</div>
        </template>
        <el-input v-model="periodpay"/>
      </el-form-item>
      <el-form-item>
        <template #label>
          <div class="el-form-item__label">正式基本工资</div>
        </template>
        <el-input v-model="duepay"  placeholder="请输入" />
      </el-form-item><br>
      <el-form-item>
        <template #label>
          <div class="el-form-item__label">试用期固定工资</div>
        </template>
        <el-input v-model="periodfixed"/>
      </el-form-item>
      <el-form-item>
        <template #label>
          <div class="el-form-item__label">正式固定工资</div>
        </template>
        <el-input v-model="duefixed"  placeholder="请输入" />
      </el-form-item><br>
      <!-- 转正日期输入框 -->
      <el-form-item>

        <template #label>
          <div class="el-form-item__label">转正日期</div>
        </template>
        <div class="block" >
          <el-date-picker style="width: 210px;" v-model="postdate" type="date" placeholder="请选择" disabled>

          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <template #label>
          <div class="el-form-item__label">备注</div>
        </template>
        <el-input v-model="remark"  placeholder="请输入" />
      </el-form-item>

      <br>
      <!-- 按钮 -->
      <div style="margin-top: 30px;">
        <el-button @click="disly=!disly,RestForm()">取消</el-button>
        <el-button type="primary" @click="disly=!disly,updateFixedwage(this.fixedwageId)">保存</el-button>
      </div>
    </el-form>
  </div>






  <!--  第二个隐藏框      -->
  <div class="body_3" v-show="disly_1">
    <h3 style="margin-top:1px;">调薪</h3><br/>
    <el-form :inline="true" :model="formInline"  :rules="rules" class="demo-form-inline">
      <el-form-item>
        <template #label>
          <div class="el-form-item__label">调薪前基本工资</div>
        </template>
        <el-input v-model="afterpay" disabled />
      </el-form-item><br/>
      <el-form-item>
        <template #label>
          <div class="el-form-item__label">调薪后基本工资</div>
        </template>
        <el-input v-model="increasepay"    />
      </el-form-item><br/>
      <el-form-item>
        <template #label>
          <div class="el-form-item__label">生效日期</div>
        </template>
        <div class="block" >
          <el-date-picker style="width: 210px;" v-model="takedate" type="date" @change="takedates()" placeholder="请选择">
          </el-date-picker>
        </div>
      </el-form-item><br/>
      <el-form-item label="调薪原因" style="margin-left: 47px;">
        <el-select v-model="cause" placeholder="请选择">
          <el-option label="晋升" value="晋升"></el-option>
          <el-option label="调岗" value="调岗"></el-option>
          <el-option label="降级" value="降级"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item><br/>


        <el-form-item >
          <template #label>
            <div class="el-form-item__label">备注</div>
          </template>
          <el-input v-model="remark2"  placeholder="请输入" />
        </el-form-item>
      <br>
      <!-- 按钮 -->
      <div style="margin-top: 30px;">
        <el-button @click="disly_1=!disly_1,RestForm()">取消</el-button>
        <el-button type="primary" @click="insertSalary(),disly_1=!disly_1">保存</el-button>
      </div>
    </el-form>

  </div>

  <div style="float: right;">
    <el-input v-model="seek" style="width: 168px;" size="small" placeholder="姓名" @input="selectFixedwage"/>
  </div>


  <br />
  <br />
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="staffName" label="姓名" width="190" />
    <el-table-column prop="postName" label="职位" width="190" />
    <el-table-column prop="staffHiredate" label="入职日期" width="190" />
<!--    <el-table-column prop="staffState" label="状态" width="190" />-->
    <el-table-column label="状态" width="190">
      <template #default="scope">
        <span class="button-await" v-if="scope.row.staffState===0"><span style="color: #5aaaff">试用</span></span>
        <span class="button-pass" v-if="scope.row.staffState===1"><span style="color: #5aaaff">正式</span></span>
        <span class="button-reject" v-if="scope.row.staffState===2"><span style="color: #5aaaff">离职</span></span>
      </template>
    </el-table-column>
    <el-table-column prop="fixedwagePeriodmoney" label="试用期基本工资" width="190" />
    <el-table-column prop="fixedwageperiodpostmoney" label="试用期固定工资" width="190" />
    <el-table-column prop="workerDate" label="转正日期" width="190" />
    <el-table-column fixed="right" label="操作" width="190">
      <template #default="scope">
        <el-button type="text" size="small" @click="disly=true,disly_1=false,fixedwage(scope.row)">定薪 </el-button>
        <el-button type="text" size="small" @click="disly_1=true,disly=false,fixedwage2(scope.row)">调薪 </el-button>
      </template>
    </el-table-column>
  </el-table>
   <!--分页插件-->
  <div class="demo-pagination-block">
    <el-pagination
        v-model:currentPage="pageInfo.currentPage"
        :page-sizes="[4, 5, 10, 50]"
        v-model:page-size="pageInfo.pagesize"
        :default-page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        :pager-count="5"
        prev-text="上一页"
        next-text="下一页"
        @size-change="selectFixedwage()"
        @current-change="selectFixedwage()"
        background
    >
    </el-pagination>
  </div>
</template>

<script>
import {
  defineComponent,
  ref
} from 'vue'
import {ElMessage, ElNotification} from "element-plus";



export default {
  data() {
    return {
      //请求的路径
      url: "http://localhost:80/",
      disly: false,
      disly_1:false,
      activeName: 'first',
      periodpay: '',
      duepay: '',
      periodfixed: '',
      duefixed: '',
      postdate: '',
      remark: '',
      increasepay: '',
      afterpay: '',
      takedate: '',
      cause: '',
      remark2: '',
      seek:'',
      dept2:'',
      seek2:'',
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },
      tableData: []
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)

    },
    submitForm() {
      if (this.duepay.length == 0) {
        ElMessage({
          message: '请输入正式基本工资',
          type: 'warning',
        })
      } else if (this.duefixed.length == 0) {
        ElMessage({
          message: '请输入正式固定工资',
          type: 'warning',
        })
      } else {
        alert(1111)
      }
    },
    submitForm2(){
      if (this.increasepay.length == 0) {
        ElMessage({
          message: '请输入调薪后基本工资',
          type: 'warning',
        })
      } else if (this.takedate.length == 0) {
        ElMessage({
          message: '请输入生效日期',
          type: 'warning',
        })
      } else if (this.cause.length == 0) {
        ElMessage({
          message: '请输入调薪原因',
          type: 'warning',
        })
      } else {
        alert(1111)
      }
    },
    RestForm(){
      this.periodpay='',
          this.duepay= '',
          this.periodfixed= '',
          this.duefixed= '',
          this.postdate= '',
          this.remark= '',
          this.increasepay= '',
          this.range='',
          this.takedate= '',
          this.cause= '',
          this.remark2= ''
    },
    takedates(){
      var date = new Date();
      if(this.takedate<date){
        ElMessage({
          message:'生效日期不能小于当前日期',
          type:'warning',
        })
      }
    },
    //赋值到文本框中
    fixedwage(row){
      //试用期基本工资
      this.periodpay=row.fixedwagePeriodmoney;
      //试用期固定工资
      this.periodfixed=row.fixedwageperiodpostmoney;
      //转正日期
      this.postdate=row.workerDate;
      //编号
      this.fixedwageId=row.fixedwageId;
    },
    fixedwage2(row){
      this.afterpay=row.fixedwagePeriodmoney;
      //员工名称
      this.staffName=row.staffName;
    },
    //分页查询固定工资
    selectFixedwage() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectFixedwage',
        data: {
          //当前页
          'currentPage': this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          //部门名称
          "deptName": this.$parent.$parent.$parent.$parent.$data.one,
          //员工名称
          "staffName":this.seek,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        //如果服务关闭
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
          //如果服务没有关闭
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            _this.tableData = response.data.data.info.records
            _this.pageInfo.total = response.data.data.info.total
          }
          //如果服务是雪崩的
          else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        }
      })
    },
    //修改固定工资
    updateFixedwage(id) {
      var _this = this
      this.axios({
        method: 'put',
        url: this.url + 'updateFixedwage',
        data: {
          //试用期基本工资
          fixedwageId:this.fixedwageId,
          //试用期基本工资
          fixedwagePeriodmoney: this.periodpay,
          //正式基本工资
          fixedwageOfficialmoney:this.duepay,
          //试用期固定工资
          fixedwagePeriodpostmoney:this.periodfixed,
          //正式固定工资
          fixedwageOfflcialpostmoney:this.duefixed,
          //备注
          fixedwageRemark:this.remark,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response)
        if (response.data.code === 200 && response.data.data === 666) {
          ElMessage({
            showClose: true,
            message: '操作成功',
            type: 'success',
          })
          this.selectFixedwage();
        } else if (response.data.data === 100) {
          ElMessage({
            showClose: true,
            message: '操作失败1',
            type: 'error',
          })
        } else {
          ElMessage({
            showClose: true,
            message: '操作失败2',
            type: 'error',
          })
        }
      }).catch(function (error) {
        console.log("失败")
        console.log(error);
      });
    },
    //添加调薪
    insertSalary(staffName) {
      this.axios({
        method: 'post',
        url: this.url + 'insertSalary',
        data: {
          //员工名称
          staffName:this.staffName,
          //调薪前基本工资
          frontSalary:this.afterpay,
          //调薪后基本工资
          afterSalary:this.increasepay,
          //生效日期
          takeEffectDate:this.takedate,
          //调薪原因
          salaryType:this.cause,
          //备注
          salaryRemarks:this.remark2,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("添加成功")
        console.log(response)
        //如果服务关闭
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
          //如果服务没有关闭
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.code == 200) {
            //如果是成功
            if (response.data.data == 1) {
              ElNotification({
                title: '提示',
                message: '添加成功',
                type: 'success',
              })
            } else {
              ElMessage({
                type: 'warning',
                message: '添加失败',
              })
            }
          }
          //如果服务是雪崩的
          else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        }
      })
    },
  },
  mounted() {
    //分页查询固定工资
    this.selectFixedwage(this.$parent.$parent.$parent.$parent.$data.one);
  }
}
</script>

<style scoped>
@import url("../../css/fixed.css");
/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
  font-size: 12px;
}
</style>
