<!--员工花名册工作经历-->
<template>
<br/>
<div>
<!--搜索输入框-->
    <el-row style="width:150px;float:right;">
      <el-input v-model="input3" placeholder="搜索" size="small">
        <template #suffix>
          <el-icon class="el-input__icon"><i-search/></el-icon>
        </template>
      </el-input>
    </el-row>
</div>
<div>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="staffName" label="姓名" width="190" />
    <el-table-column prop="workStareTime" label="开始时间" width="190" />
    <el-table-column prop="workEndTime" label="结束时间" width="190" />
    <el-table-column prop="companyName" label="任职公司" width="190" />
    <el-table-column prop="positionName" label="职位" width="190" />
    <el-table-column prop="positionDescribe" label="离职原因" width="190" />
    <el-table-column fixed="right" label="操作">
    <template #default>
      <router-link :to="{path:this.information,query:{path: this.$route.query.path}}">
			<el-button type="text" size="small">编辑 </el-button>
      </router-link>
	</template>
    </el-table-column>
  </el-table>
</div>

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
        @size-change="selectwork1()"
        @current-change="selectwork1()"
        background
    >
    </el-pagination>
  </div>

</template>

<script lang="ts">
export default {
  data() {
    return {
      information:'/employee/message/employee_roster/information',
      tableData: [],
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 4, // 页大小
        total: 0, // 总页数
      },
      input3:"",
    }
  },
  methods:{
    //查询工作经历
    selectwork(){
      this.axios
          .get("http://localhost:80/selectwork",{
            params:this.pageInfo,
          })
          .then((response)=>{
            console.log("查询工作经历");
            console.log(response.data.succeed.records);
            this.tableData = response.data.succeed.records;
          })
          .catch(function (error){
            console.log("失败")
            console.log(error);
          });
    },
    //分页查询工作经历
    selectwork1(){
      var _this = this
      this.axios
          .get("http://localhost:80/selectwork",{
            params:this.pageInfo,
          })
          .then((response)=>{
            console.log("分页查询工作经历");
            console.log(response);
            _this.tableData = response.data.succeed.records;
            _this.pageInfo.pagesize = response.data.succeed.size;
            _this.pageInfo.total = response.data.succeed.total;
          })
          .catch(function (error){
            console.log("失败")
            console.log(error);
          });
    },
  },
  created() {
    //查询工作经历
    this.selectwork();
    //分页查询工作经历
    this.selectwork1();
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

/* 分页的样式 */
.demo-pagination-block {
  float: right;
  margin: 20px;
}

</style>