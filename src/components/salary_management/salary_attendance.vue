<!--考勤方案 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <span></span>
        <div style="margin-top: 20px">

            <button type="button" class="ant-btn ant-btn-primary"

                    @click="this.$parent.$data.salary_insertplantwo=true,
                    this.$parent.$data.salary_insertplan=false,
                    this.$parent.$data.salary_checkwage=false,
                    this.$parent.$data.regular=false,
                    this.$parent.$data.callbackpay=false,
                    this.$parent.$data.attendanceplan=false,
                    this.$parent.$data.evectionplan=false,
                    this.$parent.$data.salary_insertplanthree=false,
                    this.$parent.$data.insertplantwo_name='新增'">
              <i aria-label="图标: plus" class="anticon anticon-plus">
                <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                  <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
                </svg></i>
              <span>新增</span>
            </button>

        </div>
        <div style="margin-top:-32px;">
          <!--搜索输入框-->
          <el-row style="width:140px;float:right;">
            <el-input v-model="seek" placeholder="方案名称" @input="selectAttendandce">
              <template #suffix>
                <el-icon class="el-input__icon"><i-search/></el-icon>
              </template>
            </el-input>
          </el-row>
        </div>

        <!-- 表格内容部分 -->
        <div class="sub-Content__primary" style="margin-top: 50px">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="attendandceName" label="方案名称" width="230" />
<!--            <el-table-column prop="name" label="核算规则" width="230" />-->
            <el-table-column label="核算规则" width="240">
              <template #default="scope">
                <span>迟到：扣{{this.tableData[0].attendandceLitemoney}}元x迟到次数</span><br/>
                <span>早退：扣{{this.tableData[0].attendandceLeavemoney}}元x早退次数</span><br/>
                <span>未签到：扣{{this.tableData[0].attendandceDidnotmoney}}元x未签到的次数</span><br/>
                <span>未签退：扣{{this.tableData[0].attendandceDidbackmoney}}元x未签退的次数</span><br/>
                <span>旷工：小时工资x{{this.tableData[0].attendandceAbscntmoney}}%x旷工折算的小时数</span>
              </template>
            </el-table-column>
            <el-table-column prop="deptName" label="适用对象" width="230" />
            <el-table-column prop="attendandceRemark" label="备注" width="230" />
<!--            <el-table-column prop="attendandceState" label="状态" width="230" />-->
            <el-table-column label="状态" width="230">
              <template #default="scope">
                <span class="button-await" v-if="scope.row.attendandceState===0"><span style="color: #5aaaff">启用</span></span>
                <span class="button-pass" v-if="scope.row.attendandceState===1"><span style="color: #5aaaff">禁用</span></span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="230">
              <template #default="scope">

                  <el-button type="text"  size="small"
                             @click="this.$parent.$data.salary_insertplantwo=true,
                    this.$parent.$data.salary_insertplan=false,
                    this.$parent.$data.salary_checkwage=false,
                    this.$parent.$data.regular=false,
                    this.$parent.$data.callbackpay=false,
                    this.$parent.$data.attendanceplan=false,
                    this.$parent.$data.evectionplan=false,
                    this.$parent.$data.salary_insertplanthree=false,
                    this.$parent.$data.insertplantwo_name='编辑'">
                    编辑 </el-button
                  >
                <el-button type="text" size="small" @click="handleClick">禁用 </el-button>
<!--                <el-button type="text" size="small">删除 </el-button>-->
                <el-popconfirm @confirm="deleteRow(scope.$index, tableData)"
                               title="确认要删除此方案吗?">
                  <template #reference>
                    <el-button type="text" size="small" style="color: orange">删除 </el-button>
                  </template>
                </el-popconfirm>

              </template>
            </el-table-column>
          </el-table>

        </div>

        <!-- 分页插件 -->
        <div class="demo-pagination-block" style="margin-left: 25px;margin-top: 20px;margin-bottom: 10px">
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
              @size-change="selectAttendandce()"
              @current-change="selectAttendandce()"
              background
          >
          </el-pagination>
        </div>



      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage, ElNotification} from "element-plus";

export default {
  data(){
    return{
      //请求的路径
      url: "http://localhost:80/",
      //新增编辑考勤扣款方案
      insertattendanceplan:'/salary/insertattendanceplan',
      seek:"",
      tableData: [],
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },

    }
  },
  methods:{
    // 删除行
    deleteRow(index, rows) {
      rows.splice(index, 1);
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
    },
    //分页查询考勤扣款方案
    selectAttendandce() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectAttendandce',
        data: {
          //当前页
          'currentPage': this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          //部门名称
          //"deptName":this.$parent.$data.two,
          //方案名称
          "attendandceName":this.seek,
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
  },
  created() {
    //分页查询考勤扣款方案
    this.selectAttendandce();
  }
}
</script>


<style scoped>
@import url("../../css/navigation.css");
/deep/.ant-btn-primary {
  color: #fff;
  background-color: #085fc3;
  border-color: #085fc3;
  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
  margin-left: 20px;
}
/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
}

/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
  font-size: 12px;
}
</style>