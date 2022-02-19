<!--员工花名册工作经历-->
<template>
<div>
<!--搜索输入框-->
    <el-row style="width:150px;float:right;">
      <el-input v-model="seek" placeholder="姓名" size="small" @input="selectwork">
        <template #suffix>
          <el-icon class="el-input__icon"><i-search/></el-icon>
        </template>
      </el-input>
    </el-row>
</div>
  <br/>
  <br/>
<div>
  <el-table :data="tableData" stripe style="width: 100%"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}">
    <el-table-column prop="staffName" label="姓名" width="190" />
    <el-table-column prop="workStareTime" label="开始时间" width="190" />
    <el-table-column prop="workEndTime" label="结束时间" width="190" />
    <el-table-column prop="companyName" label="任职公司" width="190" />
    <el-table-column prop="positionName" label="职位" width="190" />
    <el-table-column prop="positionDescribe" label="离职原因" width="190" />
    <el-table-column fixed="right" label="操作">
    <template #default="scope">
			<el-button type="text" size="small" @click="
			this.$parent.$parent.$parent.$data.one=scope.row.staffId,
			this.$parent.$parent.$parent.$data.three=scope.row.staffName,
			this.$parent.$parent.$parent.$data.two='second',
			this.$parent.$parent.$parent.$data.employee_compile=true">编辑 </el-button>
	</template>
    </el-table-column>
  </el-table>
</div>
  <br/>
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
        @size-change="selectwork()"
        @current-change="selectwork()"
        background
    >
    </el-pagination>
  </div>

</template>

<script>
import {ElNotification} from "element-plus";

export default {
  data() {
    return {
      url: "http://localhost:80/",
      information:'/employee/message/employee_roster/staffedit',
      tableData: [],
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 4, // 页大小
        total: 0, // 总页数
      },
      seek:"",
    }
  },
  methods:{
    //查询工作经历
    selectwork() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectwork',
        data: {
          //当前页
          'currentPage': this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          //名称
          "staffName": this.seek,
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
  mounted() {
    //分页查询工作经历
    this.selectwork();
  }
}

</script>
<style scoped>
/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
  font-size: 12px
}

</style>