<!--待入职员工页面-->
<template>
  <div class="saas-main-content">

    <!--搜索输入框-->
    <el-row style="width:200px;float:right;">
      <el-input v-model="input3" placeholder="搜索">
        <template #suffix>
          <el-icon class="el-input__icon"><i-search/></el-icon>
        </template>
      </el-input>
    </el-row>

    <br/>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="depart" label="部门" width="180" />
      <el-table-column prop="post" label="职位" width="180" />
      <el-table-column prop="phone" label="手机号" width="180" />
      <el-table-column prop="email" label="邮箱" width="180" />
      <el-table-column prop="entrydate" label="入职日期" width="180" />
      <el-table-column  label="操作">
        <template #default>
          <el-button type="text" size="small">入职 </el-button>

          <el-button @click="become=true" type="text" size="small">放弃 </el-button>

        </template>
      </el-table-column>
    </el-table>

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

    <!--  弹框  -->
    <div >
      <el-dialog
          v-model="become"
          width="30%"
          :close-on-click-modal="false" >
        放弃原因：<el-input type="textarea" style="width:240px;"></el-input>
        <div style="margin-top:30px;margin-left: 120px;">
          <el-button @click="become=false">取消</el-button>
          <el-button type="primary">确定</el-button></div>

      </el-dialog>
    </div>



  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  data(){
    return{
      input3:"",
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },
      tableData: [
        {
          entrydate: '2016-05-03',
          name: 'Tom',
          depart: 'California',
          post: 'Los Angeles',
          email: 'No. 189, Grove St, Los Angeles',
          phone: 'CA 90036',
          cause: 'Home',
        },
        {
          entrydate: '2016-05-02',
          name: 'Tom',
          depart: 'California',
          post: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          phone: 'CA 90036',
          email: 'Office',
        },
        {
          entrydate: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Home',
        },
        {
          entrydate: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office',
        },
      ],
      form:[
        {
          desc:""
        }
      ]

    }
  },setup() {
    const become = ref(false)
    return{
      become,
    }
  }
})
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
}
/* 分页的样式 */
/deep/.demo-pagination-block {
  float: right;
  margin: 20px;
}


</style>
