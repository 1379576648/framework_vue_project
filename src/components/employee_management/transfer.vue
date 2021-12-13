<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <span></span>
        <br />
        <!--搜索输入框-->
        <el-row style="width: 200px; margin-left: 1090px">
          <el-input v-model="input3" placeholder="搜索">
            <template #suffix>
              <el-icon class="el-input__icon"><i-search /></el-icon>
            </template>
          </el-input>
        </el-row>

        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="type" label="异动类型" width="180" />
            <el-table-column prop="ydept" label="原部门" width="180" />
            <el-table-column prop="bdhdept" label="变动后部门" width="180" />
            <el-table-column prop="ypost" label="原职位" width="180" />
            <el-table-column prop="bdhpost" label="变动后职位" width="180" />
            <el-table-column prop="date" label="生效时间" width="180" />
          </el-table>
        </div>
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
  </div>
</template>

<script>
export default {
  data(){
    return{
      input3:"",
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },

    }
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
}
/* 分页的样式 */
/deep/.demo-pagination-block {
  float: right;
  margin: 20px;
}

</style>
