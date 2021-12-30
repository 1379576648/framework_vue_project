
<!--  放弃入职员工页面  -->
<template>
  <div class="saas-main-content">

    <!--搜索输入框-->
    <el-row style="width:150px;float:right;">
      <el-input v-model="input3" placeholder="搜索" size="small">
        <template #suffix>
          <el-icon class="el-input__icon"><i-search/></el-icon>
        </template>
      </el-input>
    </el-row>
	<br/>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="resumeName" label="姓名" width="200" />
      <el-table-column prop="deptName" label="部门" width="200" />
      <el-table-column prop="postName" label="职位" width="200" />
      <el-table-column prop="resumePhone" label="手机号" width="200" />
      <el-table-column prop="hiredate" label="入职日期" width="200" />
	  <el-table-column prop="waiveReason" label="放弃原因" width="" />

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
          @size-change="selectabandon1()"
          @current-change="selectabandon1()"
          background
      >
      </el-pagination>
    </div>
  </div>

</template>
<script lang="ts">
export default {
  data() {
    return {
      tableData: [],
      input3:'',
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 4, // 页大小
        total: 0, // 总页数
      },

    }
  },
  methods:{
    //查询已经淘汰的员工
    selectabandon(){
      this.axios
          .get("http://localhost:80/selectabandon",{
            params:this.pageInfo,
          })
          .then((response)=>{
            console.log("查询已经淘汰的员工");
            console.log(response.data.succeed.records);
            this.tableData = response.data.succeed.records;
          })
          .catch(function (error){
            console.log("失败")
            console.log(error);
          });
    },
    //分页查询已经淘汰的员工
    selectabandon1(){
      var _this = this
      this.axios
          .get("http://localhost:80/selectabandon",{
            params:this.pageInfo,
          })
          .then((response)=>{
            console.log("分页查询已录用待入职的员工");
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
    //查询已经淘汰的员工
    this.selectabandon();
    //分页查询已经淘汰的员工
    this.selectabandon1();
  }
}
</script>


<style scoped>
/deep/.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}
/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
  font-size: 12px
}
/* 分页的样式 */
/deep/.demo-pagination-block {
  float: right;
  margin: 20px;
}

</style>
