<!--待入职员工页面-->
<template>
  <div class="saas-main-content">

    <!--搜索输入框-->
    <el-row style="width:150px;float:right;">
      <el-input v-model="seek" placeholder="搜索" size="small" @input="selectpage" >
        <template #suffix>

          <el-icon class="el-input__icon" >
            <i-search/>
          </el-icon>
        </template>
      </el-input>
    </el-row>

    <br/>
    <br/>
    <br/>
    <el-table :data="tableData" stripe style="width: 100%;cursor: pointer"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}">
      <el-table-column prop="resumeName" label="姓名" width="180"/>
      <el-table-column prop="deptName" label="部门" width="180"/>
      <el-table-column prop="postName" label="职位" width="180"/>
      <el-table-column prop="resumePhone" label="手机" width="180"/>
      <el-table-column prop="resumeMailbox" label="邮箱" width="180"/>
      <el-table-column prop="hiredate" label="入职日期" width="180"/>
      <!--      <el-table-column prop="resumeBirthday" label="出生日期" width="130" />-->
      <!--      <el-table-column prop="resumeResidence" label="户口所在地" width="130" />-->
      <!--      <el-table-column prop="resumePoliticalOutlook" label="政治面貌" width="130" />-->
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" size="small" @click="selectpage(scope.row.employmentId)
                                               ,fromValue.resumeId=scope.row.resumeId
                                               ,fromValue.employmentId=scope.row.employmentId
                                               ,fromValue.waiveReason=scope.row.waiveReason
                                               ,fromValue.resumeName=scope.row.resumeName
                                               ,fromValue.resumeSex=scope.row.resumeSex
                                               ,fromValue.resumePhone=scope.row.resumePhone
                                               ,fromValue.resumeEducation=scope.row.resumeEducation
                                               ,fromValue.resumeMailbox=scope.row.resumeMailbox
                                               ,fromValue.resumePhoto=scope.row.resumePhoto
                                               ,fromValue.resumeBirthday=scope.row.resumeBirthday
                                               ,fromValue.resumeResidence=scope.row.resumeResidence
                                               ,fromValue.resumePoliticalOutlook=scope.row.resumePoliticalOutlook
                                               ,fromValue.hiredate=scope.row.hiredate
                                               ,fromValue.deptName=scope.row.deptName
                                               ,fromValue.postName=scope.row.postName
                                               ,fromValue.workStareTime=scope.row.workStareTime
                                               ,fromValue.workEndTime=scope.row.workEndTime
                                               ,fromValue.companyName=scope.row.companyName
                                               ,fromValue.positionName=scope.row.positionName
                                               ,fromValue.positionIndustry=scope.row.positionIndustry
                                               ,fromValue.positionDescribe=scope.row.positionDescribe
                                               ,fromValue.positionSqmonthly=scope.row.positionSqmonthly
                                               ,fromValue.educationStartTime=scope.row.educationStartTime
                                               ,fromValue.educationEndTime=scope.row.educationEndTime
                                               ,fromValue.educationStudentname=scope.row.educationStudentname
                                               ,fromValue.educationMajor=scope.row.educationMajor
                                               ,fromValue.educationFullTime=scope.row.educationFullTime
                                               ,updateEmploymentState(scope.row.employmentId),insertStaff()">入职</el-button>

          <el-button @click="id=scope.row.employmentId,abandon(id)"  type="text" size="small">放弃</el-button>

        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插件 -->
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
          @size-change="selectpage()"
          @current-change="selectpage()"
          background
      >
      </el-pagination>
    </div>
    <!--  弹框  -->
    <div style="text-align: center;">
      <el-dialog
          v-model="become"
          width="30%"
          :close-on-click-modal="false">
        放弃原因：
        <el-input v-model="cause" type="textarea" style="width:240px;"></el-input>
        <div style="margin-top:30px;margin-left: 30px;">
          <el-button @click="become=false">取消</el-button>
          <el-button type="primary" @click="become=false,updateEmploymentStateAndWaiveReasonInt(id)">确定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {ElMessage, ElNotification} from "element-plus";

export default defineComponent({
  data() {
    return {
      url: "http://localhost:80/",
      seek: '',
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 4, // 页大小
        total: 0, // 总页数
      },
      tableData: [],
      cause: '',
      //表单数据
      fromValue: {
        //简历编号
        resumeId:'',
        //录用编号
        employmentId: '',
        //放弃原因
        waiveReason:'',
        //简历姓名
        resumeName:'',
        //简历性别
        resumeSex:'',
        //手机号码
        resumePhone:'',
        //邮箱
        resumeMailbox:'',
        //照片
        resumePhoto:'',
        //出生日期
        resumeBirthday:'',
        //政治面貌
        resumePoliticalOutlook:'',
        //学历
        resumeEducation:'',
        //入职日期
        hiredate:'',
        //户口所在地
        resumeResidence:'',
        //部门名称
        deptName:'',
        //职位名称
        postName:'',
        //开始时间
        workStareTime:'',
        //结束时间
        workEndTime:'',
        //公司名称
        companyName:'',
        //职位名称
        positionName:'',
        //所属行业
        positionIndustry:'',
        //工作描述
        positionDescribe:'',
        //税前月薪
        positionSqmonthly:'',
        //开始时间
        educationStartTime:'',
        //结束时间
        educationEndTime:'',
        //学校名称
        educationStudentname:'',
        //所属专业
        educationMajor:'',
        //是否全日制
        educationFullTime:'',
      },
    }
  }, setup() {
    const become = ref(false)
    return {
      become,
    }
  },
  methods: {
    //查询已录用待入职的员工
    selectpage() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectpage',
        data: {
          //当前页
          'currentPage': this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          //名称
          "resumeName": this.seek,
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
    //新增员工
    insertStaff() {
      this.axios({
        method: 'post',
        url: this.url + 'insertStaff',
        data: this.fromValue,
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
            //如果是成功
            if (response.data.data.info == "成功") {
              this.selectpage();
              ElNotification({
                title: '提示',
                message: '入职成功',
                type: 'success',
              })
            } else {
              ElMessage({
                type: 'warning',
                message: response.data.data.info,
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
    //修改状态为已录用
    updateEmploymentState() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'updateEmploymentState',
        data: {
          employmentId: this.fromValue.employmentId,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("修改状态")
        console.log(response)
        if (response.data.code === 200 && response.data.data === 666) {
          this.selectpage();
        } else if (response.data.data === 100) {
        } else {
        }
      }).catch(function (error) {
        console.log("失败")
        console.log(error);
      });
    },
    //修改状态为已淘汰
    updateEmploymentStateAndWaiveReasonInt(id) {
      console.log(id)
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'updateEmploymentStateAndWaiveReasonInt',
        data: {
          employmentId: this.id,
          waiveReason: this.cause,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("修改状态")
        console.log(response)
        if (response.data.code === 200 && response.data.data === 666) {
          ElMessage({
            showClose: true,
            message: '操作成功',
            type: 'success',
          })
          this.selectpage();
        } else if (response.data.data === 100) {
          ElMessage({
            showClose: true,
            message: '操作失败',
            type: 'error',
          })
        } else {
          ElMessage({
            showClose: true,
            message: '操作失败',
            type: 'error',
          })
        }
      }).catch(function (error) {
        console.log("失败")
        console.log(error);
      });
    },
    abandon(id){
      this.become=true;
    },
  },
  mounted() {
    //查询已录用待入职的员工
    this.selectpage();
  },
  // 挂载
  created() {
    //查询已录用待入职的员工
    this.selectpage();
  }
})
</script>

<style scoped>

/deep/ .mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}

/deep/ .cell {
  padding-left: 10px;
  text-align: center;
  color: black;
  font-size: 12px
}

/* 分页的样式 */
/deep/ .demo-pagination-block {
  float: right;
  margin: 20px;
}

</style>
