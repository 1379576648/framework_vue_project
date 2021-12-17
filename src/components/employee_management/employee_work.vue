<!--员工花名册工作经历-->
<template>
<br/>
<div>
<!--搜索输入框-->
    <el-row style="width:200px;float:right;">
      <el-input v-model="input3" placeholder="搜索">
        <template #suffix>
          <el-icon class="el-input__icon"><i-search/></el-icon>
        </template>
      </el-input>
    </el-row>
</div>
<div>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="date" label="姓名" width="180" />
    <el-table-column prop="name" label="开始时间" width="180" />
    <el-table-column prop="name" label="结束时间" width="180" />
    <el-table-column prop="name" label="任职公司" width="180" />
    <el-table-column prop="name" label="职位" width="180" />
    <el-table-column prop="name" label="离职原因" width="180" />
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
        :page-sizes="[3, 5, 10, 50]"
        v-model:page-size="pageInfo.pagesize"
        :default-page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        :pager-count="5"
        background
        @size-change="selectUsers"
        @current-change="selectUsers"
    >
    </el-pagination>
  </div>

</template>

<script lang="ts">
export default {
  data() {
    return {
      information:'/employee/message/employee_roster/information',
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },
      input3:"",
    }
  },
}

</script>
<style scoped>
/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
}

/* 分页的样式 */
.demo-pagination-block {
  float: right;
  margin: 20px;
}

</style>