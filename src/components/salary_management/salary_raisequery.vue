<template>
<div style="margin-top: 20px;margin-left: 10px;padding-bottom: 10px">
  <!-- 调薪查询 -->
    <el-select v-model="dept2" placeholder="请选择">
      <el-option label="什么什么部门" value="dept1"></el-option>
      <el-option label="上山不" value="dept2"></el-option>
    </el-select>
    <div style="float: right;">
      <div class="block">
        <span class="demonstration"></span>
        <el-date-picker
            v-model="seek2"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
        >
        </el-date-picker>
      </div>

    </div>

    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="date" label="姓名" width="150" />
      <el-table-column prop="name" label="工号" width="120" />
      <el-table-column prop="state" label="公司/中心" width="120" />
      <el-table-column prop="city" label="部门" width="120" />
      <el-table-column prop="address" label="职位" width="150" />
      <el-table-column prop="zip" label="入职日期" width="120" />
      <el-table-column prop="zip" label="状态" width="120" />
      <el-table-column prop="zip" label="基本工资" width="120" />
      <el-table-column prop="zip" label="岗位" width="120" />
      <el-table-column prop="zip" label="基本工资" width="120" />
      <el-table-column prop="zip" label="岗位" width="120" />

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
      >
        <!--  @size-change="selectUsers" @current-change="selectUsers" -->
      </el-pagination>
    </div>
</template>

<script>
export default {
  data(){
    return{
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
@import url(../../css/fixed.css);
/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
  font-size: 12px;
}
</style>