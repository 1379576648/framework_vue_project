<!--花名册页面-->
<template>
<div class="saas-main-content">
<div class="icon-p">

<el-row :gutter="20">
    <el-col :span="4">
      <el-card shadow="always" style="background-color: rgb(35, 102, 167);color:white;font-size:14px;">
        <p>在职</p>
        <p>24</p>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card shadow="hover" style="background-color: rgb(73, 167, 130);color:white;font-size:14px;">
        <p>本月离职</p>
        <p>0</p>
      </el-card>
    </el-col>
    <el-col :span="4">
	  <el-card shadow="never" style="background-color: rgb(233, 143, 39);color:white;font-size:14px;">
      <p>正式</p>
      <p>21</p>
    </el-card>
    </el-col>
	<el-col :span="4">
      <el-card shadow="never" style="background-color: rgb(35, 102, 167);color:white;font-size:14px;">
        <p>试用</p>
        <p>3</p>
      </el-card>
    </el-col>
	<el-col :span="4">
      <el-card shadow="never" style="background-color: rgb(73, 167, 130);color:white;font-size:14px;">
        <p>实习</p>
        <p>0</p>
      </el-card>
    </el-col>
	<el-col :span="4">
      <el-card shadow="never" style="background-color: rgb(233, 143, 39);color:white;font-size:14px;">
        <p>本月新入职</p>
        <p>2</p>
      </el-card>
    </el-col>
  </el-row>
</div>

<div style="margin-top:10px;">
		<!--搜索输入框-->
    <el-row style="width:200px;float:right;">
      <el-input v-model="input3" placeholder="搜索">
        <template #suffix>
          <el-icon class="el-input__icon"><i-search/></el-icon>
        </template>
      </el-input>
    </el-row>
</div>
<br/>
<div style="margin-top:30px;">
 <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="date" label="姓名" width="150" />
    <el-table-column prop="name" label="工号" width="150" />
    <el-table-column prop="state" label="所属公司/中心" width="150" />
    <el-table-column prop="city" label="部门" width="150" />
    <el-table-column prop="state" label="职位" width="150" />
	 <el-table-column prop="state" label="手机" width="150" />
	  <el-table-column prop="state" label="状态" width="150" />
    <el-table-column  prop="date" label="入职日期" sortable  width="150">
	</el-table-column>
    <el-table-column fixed="right" label="操作" width="150">
      <template #default>
        <router-link :to="{path:this.staffedit,query:{path: this.$route.query.path}}">
        <el-button type="text" size="small" @click="handleClick"
          >编辑 </el-button>
        </router-link>
        <router-link :to="{path:this.leave,query:{path: this.$route.query.path}}" style="text-decoration: none">&nbsp;
        <el-button type="text" size="small">办理离职</el-button></router-link>
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


</div>
</template>
<script lang="ts">
import {defineComponent,ref} from 'vue'
export default {
//操作时间

  data() {
    const value2 = ref('')
    return {
      leave:'/employee/message/employee_roster/leave',
      staffedit:'/employee/message/employee_roster/staffedit',
      tableData: [
        {
          date: '2016-03-03',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Home',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office',
        },
		{
          date: '2016-07-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office',
        },
		{
          date: '2016-08-06',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office',
        },
		{
          date: '2016-06-07',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office',
        },
      ],
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },
      input3:"",
      value2:"",
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
/deep/.el-card__body {
  /* padding: var(--el-card-padding); */
  padding: 10px 0;
}
/deep/.icon-p p{
  text-align: center;
}
/* 分页的样式 */
/deep/.demo-pagination-block {
  float: right;
  margin: 20px;
}

</style>