<!--考勤月报表-->
<template>
  <!-- 月份报表页面 -->
  <div class="head">
    <div class="head-surface">
      <span>2021 6月人事报表</span>
    </div>
    <div class="head-to">
      <el-tabs v-model="activeName">
        <el-tab-pane label="考勤统计" name="first"></el-tab-pane>
      </el-tabs>
    </div>
    <!--    搜索框-->
    <div class="head-examine">
      <el-input v-model="input" placeholder="搜索" style="width: 200px">
        <template #suffix>
          <el-icon style="margin-top: 13px; margin-right: 7px"
          >
            <i-search
            />
          </el-icon>
        </template>
      </el-input>
      <el-button type="primary" size="small" style="margin-left: 840px">
        <el-icon style="font-size: 16px">
          <i-upload/>
        </el-icon>
        导出
      </el-button>
      <el-button type="primary" size="small">
        归档2021 6月份报表
      </el-button>
    </div>
<!--表格-->
    <div class="bottom">
      <el-table :data="tableData" stripe border style="width: 100%" height="320">
        <el-table-column prop="A" fixed label="名称"/>
        <el-table-column prop="B" fixed label="部门"/>
        <el-table-column prop="C" label="正常"/>
        <el-table-column prop="D" label="迟到次数"/>
        <el-table-column prop="B" label="早退次数"/>
        <el-table-column prop="B" label="旷工次数"/>
        <el-table-column prop="B" label="是否全勤"/>
      </el-table>
    </div>
<!--分页-->
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="pageInfo.currenPage"
          :page-sizes="[3, 5, 10, 50]"
          v-model:page-size="pageInfo.pagesize"
          :default-page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          :pager-count="5"
          background
          @size-change="sele"
          @current-change="sele"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },
    };
  },
};
</script>

<style scoped>
.head {
  margin-top: 7px;
  border: 1px solid #e9e9e9;
  margin-left: 20px;
  margin-right: 5px;
  margin-bottom: 10px;
}

.head:hover {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  border-color: transparent;
}

.head-surface {
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
}

.head-to {
  margin-left: 20px;
}

.head-examine {
  margin-left: 30px;
}

/* 调整输入框的高度 */
::v-deep .el-input__inner {
  height: 32px;
}

.bottom {
  margin-left: 20px;
  margin-top: 20px;
  margin-right: 5px;
  margin-bottom: 10px;
  padding: 1%;
}

.demo-pagination-block {
  margin-left: 800px;
  margin-top: 20px;
  margin-bottom: 5px;
}
</style>