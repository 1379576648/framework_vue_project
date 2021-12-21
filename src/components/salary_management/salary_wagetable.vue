<!--查看工资表 -->
<template>
  <div style="width:100%;">
  <div style="width:100%;height:10px;">
    <!--搜索输入框-->
    <el-row style="width:200px;float:right;">
      <el-input v-model="seek" placeholder="搜索">
        <template #suffix>
          <el-icon class="el-input__icon"><i-search/></el-icon>
        </template>
      </el-input>
    </el-row>
  </div>
    <div style="width:100%;margin-top: 50px;" class="icon-p">
<!--      <div style="width:80%;height:100px;margin: auto;background: #42b983">-->
      <el-row>
        <el-col :span="4">
          <el-card shadow="always" style="background-color: rgb(35, 102, 167);font-size:14px;color: white">
           <p>29</p>
            <p>全部</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" style="background-color: rgb(73, 167, 130);font-size:14px;color: white">
            <p>29</p>
            <p>正式员工</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="never" style="background-color: rgb(57, 146, 193);font-size:14px;color: white">
            <p>22</p>
            <p>试用员工</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always" style="background-color: rgb(233, 143, 39);font-size:14px;color: white">
            <p>22</p>
            <p>本月新入职</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always" style="background-color: rgb(35, 102, 167);font-size:14px;color: white">
            <p>22</p>
            <p>本月调薪</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always" style="background-color: rgb(73, 167, 130);font-size:14px;color: white">
            <p>22</p>
            <p>本月离职</p>
          </el-card>
        </el-col>
      </el-row>
      </div>


    <div style="text-align: center;">
      <el-table :data="tableData" style="width: 100%;font-size: 12px;color:black;font-weight: normal;">
          <el-table-column  label="基本信息">
            <el-table-column     prop="name" label="姓名" width="100" />
            <el-table-column   prop="name" label="部门" width="100" />
            <el-table-column   prop="name" label="职位" width="100" />
<!--            <el-table-column   prop="name" label="本月变动" width="100" />-->
        </el-table-column>
<!--        <el-table-column label="考勤数据" >
          <el-table-column prop="name" label="应出勤天数" width="100" />
          <el-table-column prop="name" label="实际出勤天数" width="100" />
          <el-table-column prop="name" label="月计薪天数" width="100" />
        </el-table-column>-->

          <el-table-column prop="name" label="基本工资" width="110" />
<!--          <el-table-column prop="name" label="实发固定工资" width="100" />-->
        <el-table-column label="加班工资" >
          <el-table-column prop="name" label="工作日加班工资" width="110" />
          <el-table-column prop="name" label="休息日加班工资" width="110" />
          <el-table-column prop="name" label="节假日加班工资" width="110" />
        </el-table-column>
        <el-table-column prop="name" label="工资合计" width="100" />
        <el-table-column label="考勤扣款" >
          <el-table-column prop="name" label="迟到" width="100" />
          <el-table-column prop="name" label="早退" width="100" />
          <el-table-column prop="name" label="未签到" width="100" />
          <el-table-column prop="name" label="未签退" width="100" />
          <el-table-column prop="name" label="旷工" width="100" />
          <el-table-column prop="name" label="事假" width="100" />
          <el-table-column prop="name" label="病假" width="100" />
<!--          <el-table-column prop="name" label="不在职免发" width="100" />-->
        </el-table-column>
        <el-table-column label="社保" >
          <el-table-column prop="name" label="个人缴纳社保" width="100" />
          <el-table-column prop="name" label="公司缴纳社保" width="100" />
        </el-table-column>
        <el-table-column label="公积金" >
          <el-table-column prop="name" label="个人缴纳公积金" width="100" />
          <el-table-column prop="name" label="公司缴纳公积金" width="100" />
        </el-table-column>
        <el-table-column prop="name" label="应发工资" width="100" fixed="right"/>
        <el-table-column prop="name" label="实发工资" width="100" fixed="right"/>
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
<!--  </div>-->
</template>


<script  lang="ts">
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },

      ],
      seek:"",
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },

    }
  },
}
</script>
<style scoped>
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
