<template>
<div style="margin-top: 20px;margin-left: 10px;padding-bottom: 10px">
  <!-- 调薪查询 -->
    <el-select v-model="dept2" placeholder="请选择" @change="selectSalary">
      <el-option  style="margin-left: 20px;"
                  v-for="item in dept_name"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
      >
      </el-option>
    </el-select>
<!--    <div style="float: right;">-->
<!--      <div class="block">-->
<!--        <span class="demonstration"></span>-->
<!--        <el-date-picker-->
<!--            v-model="seek2"-->
<!--            type="datetimerange"-->
<!--            range-separator="-"-->
<!--            start-placeholder="开始时间"-->
<!--            end-placeholder="结束时间"-->
<!--        >-->
<!--        </el-date-picker>-->
<!--      </div>-->

<!--    </div>-->

    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="staffName" label="姓名" width="150" />
      <el-table-column prop="deptName" label="部门" width="120" />
      <el-table-column prop="postName" label="职位" width="150" />
      <el-table-column prop="frontSalary" label="调薪前基本工资" width="150" />
      <el-table-column prop="afterSalary" label="调薪后基本工资" width="150" />
      <el-table-column prop="takeEffectDate" label="调薪生效日期" width="150" />
      <el-table-column prop="salaryType" label="调薪原因" width="150" />
      <el-table-column prop="salaryRemarks" label="备注" width="150" />
      <el-table-column prop="operator" label="操作人" width="150" />
<!--      <el-table-column prop="salaryState" label="状态" width="150" />-->
      <el-table-column label="状态" width="150">
        <template #default="scope">
          <span class="button-await" v-if="scope.row.salaryState===0"><span style="color: #5aaaff">未生效</span></span>
          <span class="button-pass" v-if="scope.row.salaryState===1"><span style="color: #5aaaff">已生效</span></span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页插件 -->
  <div class="demo-pagination-block" style="margin-left: 25px;margin-top: 20px;">
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
        @size-change="selectSalary()"
        @current-change="selectSalary()"
        background
    >
    </el-pagination>
  </div>
</template>

<script>
import {ElNotification} from "element-plus";

export default {
  data(){
    return{
      //请求的路径
      url: "http://localhost:80/",
      tableData:[],
      dept_name:[],
      dept2:'',
      seek2:'',
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },
    }
  },
  methods:{
    //分页查询调薪
    selectSalary() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectSalary',
        data: {
          //当前页
          'currentPage': this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          //部门名称
          "deptName":this.dept2,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              _this.tableData = response.data.data.info.records
              _this.pageInfo.total = response.data.data.info.total
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
  },
  mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    //分页查询调薪
    this.selectSalary();
    //查询部门名称
    this.selectSect();
  }
}
</script>

<style scoped>
@import url(../../css/fixed.css);
/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
  font-size: 12px;
}
</style>