l<!--面试通过-->
<template>
  <div class="sub-Content__primary">
    <div class="ant-spin-nested-loading">
      <div class="ant-spin-container">
        <div class="mt-20 ml-20 mr-20">
          <!--搜索框-->
          <div style="float: right;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">

              <el-form-item>
                <el-input v-model="formInline.user" placeholder="姓名、招聘计划名称" clearable></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="" size="mini"><i class="iconfont">&#xeafe;</i></el-button>
              </el-form-item>
            </el-form>
          </div>

        </div>
      </div>
    </div>
    <br/>
    <!-- 表格数据 -->
    <div class="ant-table-wrapper j_statistics_layout">
      <el-table :data="tableData" style="width: 100%; cursor: pointer" size="mini" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column fixed="left"  align="center" type="selection" width="80" />
<!--        <el-table-column fixed="left"  prop="resumeId" label="序号" width="140"/>-->
        <el-table-column fixed :index="indexMethod" align="center" prop="resumeId" label="序号" type="index" min-width="100"/>
        <el-table-column fixed="left" label="姓名" width="150">
          <template #default="scope">
            <span @click="this.$parent.$parent.$parent.$data.recruit_plan_details=true">
             {{ scope.row.resumeName}}
            </span>

          </template>
        </el-table-column>
        <el-table-column fixed="left" prop="postName" label="投递部门" width="140"/>
        <el-table-column prop="resumeSex" label="性别" width="140"/>
        <el-table-column prop="resumeEducation" label="学历" width="140"/>
        <el-table-column prop="resumePhone" label="手机号" width="140"/>
        <!--        <el-table-column prop="age" label="年龄" width="140"/>-->
        <el-table-column prop="resumeMailbox" label="邮箱" width="140"/>
        <!--        <el-table-column prop="professional" label="专业" width="140"/>-->
        <el-table-column prop="resumeBirthday" label="出生日期" width="140"/>
        <el-table-column prop="interviewName" label="面试官" width="140"/>
        <!--        <el-table-column prop="face" label="政治面貌" width="140"/>-->
        <!--        <el-table-column prop="gradschool" label="毕业学校" width="140"/>-->
        <!--        <el-table-column prop="invitation" label="是否邀约" width="140"/>-->
        <!--        <el-table-column prop="state" label="状态" width="140"/>-->


        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <div style="width: 200px">
              <el-button type="text" size="small" @click="">填写评价</el-button>
              <el-button type="text" size="small" @click="(resumeId=scope.row.resumeId),employ(resumeId)">录用</el-button>

              <el-button type="text" size="small" @click="">淘汰/放弃</el-button>
            </div>

          </template>
        </el-table-column>
      </el-table>

      <div class="demo-pagination-block">
        <!-- <span class="demonstration">All combined</span> -->
        <el-pagination
            v-model:currentPage="pageInfo.currentPage"
            :page-sizes="[3, 5, 10, 50]"
            v-model:page-size="pageInfo.pagesize"
            :default-page-size="pageInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            :pager-count="5"
            background
            @size-change="selectInterviewPass"
            @current-change="selectInterviewPass"
        >
        </el-pagination>
      </div>
    </div>

    <el-dialog v-model="EmployAddRemark" title="录用">

      <el-form :model="Remark">
        <span >试用工资：</span>
        <el-input-number v-model="num" :precision="2" :step="1000" :max="5000" :min="1000" style="margin-bottom: 30px"/>
        <el-input
            v-model="evaluate"
            :rows="2"
            type="textarea"
            placeholder="填写评价"
        />
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm" :plain="true"
        >确定</el-button>
      </span>
      </template>
    </el-dialog>


  </div>

</template>

<script>
import {ref} from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

export default {
  setup() {
    const EmployAddRemark = ref(false);
    const textarea = ref('');
    const num = ref(1000);
    return {
      EmployAddRemark,
    };
  },
  data() {
    return {
      // 弹出框备注
      evaluate:"",
      // 弹出框数字输入框
      num:"",
      pageInfo: {
        currentPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },
      // 点击录用弹出框表单
      Remark:{
        name : "",
        region : "",
      },
      //筛选框显示隐藏
      icons:false,
      //访问路径
      url: "http://localhost:80/",
      //搜索框
      input: "",
      //表格数据
      tableData: [],
      formInline:[],

    }
  },
  methods:{
    selectInterviewPass(){
      this.axios({
          method:'post',
          url: this.url+ 'selectInterviewPass',
          data:{
            "currentPage": this.pageInfo.currentPage,
            "pagesize": this.pageInfo.pagesize,
          },
          responseType:'json',
          responseEncoding:'utf-8',
      }).then((response)=>{
          console.log("查询面试通过")
          console.log(response)
          this.tableData = response.data.data.succeed.records;
          this.pageInfo.pagesize = response.data.data.succeed.size;
          this.pageInfo.total = response.data.data.succeed.total;
      })
    },
    // 点击录用弹出弹出框
    employ(resumeId){
      console.log(resumeId)
      this.EmployAddRemark=true;
    },
    // 点击弹出框确定按钮
    confirm() {
      console.log(this.resumeId)
      console.log(this.num)
      console.log(this.evaluate)
      this.EmployAddRemark=false;
      this.axios({
        method: 'post',
        url: this.url + 'EmployStaff',
        data: {
          resumeId: this.resumeId,
          remarks: this.evaluate,
          employmentSalary: this.num,
          employmentState:0,
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
        console.log("添加录用成功")
        console.log(response)
      }),ElMessage({
        message: '录用成功',
        type: 'success',
      })

    },
    cancel(){
      this.EmployAddRemark=false;
    }
  },mounted() {
    this.selectInterviewPass();
  },
  //序号
  indexMethod(index) {
    let curpage = this.pageInfo.currentPage; //单前页码，具体看组件取值
    let limitpage = this.pageInfo.pagesize; //每页条数，具体是组件取值
    return index + 1 + (curpage - 1) * limitpage;
  },

}

</script>
<style type="text/css" scoped>
/*@import url("../../css/navigation.css");*/
@import url("../../css/zpdaohang.css");
.demo-pagination-block{
  margin-left:850px ;
  margin-top: 20px;
  margin-bottom: 30px;
}

.icon-s {
  width: 75%;
  height: 45px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-top: 10px;
  padding: 16px;
  margin-left: 70px;
}
.el-button--primary { /* el-input 显示时 */
  background: #085fc3 !important;
  border-color: #085fc3 !important;
}

.el-button--primary:hover {/* el-input 悬浮时 */
  background: #297ccf !important;
  border-color: #297ccf !important;
  color: #FFF !important;
}

.j-tabs {
  border-bottom: 1px solid #d9d9d9;
}

.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}

.ant-spin-nested-loading {
  position: relative;
}

.ant-spin-container {
  position: relative;
  transition: opacity 0.3s;
}

.ant-table-wrapper::after {
  clear: both;
}

.ant-table-wrapper::before, .ant-table-wrapper::after {
  display: table;
  content: '';
}

.abt:hover{
  color: #0c9c6e;
  border: 1px solid #0c9c6e;
}
</style>