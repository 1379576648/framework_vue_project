<template>

<!-- 参保记录 -->
  <div>
    <!-- 表格按钮部分 -->
    <div class="mt-20 ml-20 mr-20">
      <!-- 导出按钮 -->
      <el-button size="small"><i class="iconfont">&#xe6a2;</i>导出</el-button>

      <!-- 搜索框 -->
      <el-input v-model="search" size="small" class="resume-operation" placeholder="搜索">
        <template #suffix>
          <el-icon class="el-input__icon"><i-search /></el-icon>
        </template>
      </el-input>
    </div>

    <!-- 表格内容部分 -->
    <div class="sub-Content__primary">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="计薪月份" />
        <el-table-column prop="name" label="参保方案" />
        <el-table-column prop="address" label="社保缴纳月份" />
        <el-table-column prop="state" label="社保基数" />
        <el-table-column prop="address" label="公积金缴纳月份" />
        <el-table-column prop="state" label="公积金基数" />
        <el-table-column prop="cz" label="操作">
          <template #default>
            <router-link to="sb3_2new1">
              <el-button type="text" size="small">查看 </el-button>
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
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";

export default {
  data() {
    return {
      // 搜索框
      search:"",
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
          tag: "Home",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
          tag: "Office",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
          tag: "Home",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
          tag: "Office",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* 分页的样式 */
.demo-pagination-block {
  float: right;
  margin: 20px;
}

/**
	 * 下拉选择器样式
	 */
.resume-operation {
  text-align: right;
  padding-left: 8px;
  float: right;
  width: 120px;
}
</style>

