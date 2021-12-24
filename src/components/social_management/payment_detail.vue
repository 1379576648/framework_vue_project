<template>
<!--社保缴费明细-->
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <!-- 计薪月份 -->
        <div class="month-div">
          <span class="month_span">2021-12</span><br /><br />
          计薪月份<br /><br />
          <el-button type="primary" size="small">重新核算</el-button>
          <el-button type="primary" size="small" style="width: 80px"
            >归档</el-button
          >
        </div>

        <!-- 月金额统计 -->
        <div class="month_sum">
          <div>
            <span>参保人数</span><br />
            <span>1</span><br /><br /><br />
          </div>

          <div>
            <span>个人缴费</span><br />
            <span>2</span><br /><br /><br />
          </div>

          <div>
            <span>企业缴费</span><br />
            <span>3</span><br /><br /><br />
          </div>

          <div>
            <span>合计缴费</span><br />
            <span>4</span><br /><br /><br />
          </div>
        </div>

        <!-- 社保总表 -->
        <!-- 表格按钮部分 -->
        <div class="mt-20 ml-20 mr-20">
          <!-- 按钮 -->
          <el-button size="small"
            ><i class="iconfont">&#xe6a2;</i>批量导出</el-button
          >
          <el-button size="small"
            ><i class="iconfont">&#xe639;</i>批量导入</el-button
          >
          <el-button size="small" type="danger" plain
            ><i class="iconfont">&#xe608;</i>批量删除</el-button
          >

          <!-- 输入框 -->
          <div class="resume-operation">
            <el-input v-model="empName_search" placeholder="员工姓名">
              <template #suffix>
                <el-icon class="el-input__icon"><i-search /></el-icon>
              </template>
            </el-input>
          </div>

          <!-- 下拉选择器 -->
          <div class="resume-operation">
            <el-select clearable size="small" v-model="empState" placeholder="员工状态">
              <el-option
                v-for="item in empState_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <!-- 部门 树形选择框 -->
          <div class="resume-operation">
            <el-select clearable v-model="dept_name" multiple placeholder="选择部门">
              <el-option
                v-for="item in depts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table size="small" :data="tableData" stripe style="width: 100%">
            <!-- 多选框 -->
            <el-table-column type="selection" width="55" />
            <el-table-column prop="date" label="编号" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="address" label="参保方案" />
            <el-table-column prop="state" label="社保缴纳月份" width="100" />
            <el-table-column prop="address" label="社保个人缴费" width="100" />
            <el-table-column prop="address" label="社保企业缴费" width="100" />
            <el-table-column prop="state" label="公积金缴纳月份" width="110" />
            <el-table-column
              prop="address"
              label="公积金个人缴费"
              width="110"
            />
            <el-table-column prop="state" label="公积金企业缴费" width="110" />
            <el-table-column prop="state" label="操作">
              <template #default>
                <router-link :to="{path:this.path,query:{path:this.$route.query.path}}">
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
    </div>
  </div>
  &nbsp;
</template>

<script>
import { ref, defineComponent } from "vue";

export default {
  data() {
    return {
      path:"/social/social_payment/someone_insured_particulars",
      // 部门名称
      dept_name: null,
      // 选择部门 下拉选择器
      depts: [
        {value: "1", label: "部门1"},
        {value: "2", label: "部门2"},
        {value: "3", label: "部门3"},
      ],
      // 员工姓名搜索框
      empName_search:"",
      //员工状态下拉选择器
      empState_options: [
        { value: "0", label: "试用期" },
        { value: "1", label: "在职" },
        { value: "2", label: "离职" },
      ],
      empState:"",//员工状态下拉选择器的值
      // 分页参数
      pageInfo: {
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
/* 月统计金额下的div下的span */
.month_sum div span {
  margin: 35px;
}

/* 月统计金额下的div */
.month_sum div {
  display: inline-block;
}

/* 月金额统计 */
.month_sum {
  display: inline-block;
  margin-left: 100px;
}

/* 计薪月份div */
.month-div {
  display: inline-block;
  margin: 40px;
  margin-left: 100px;
}

/* 计薪月份 */
.month_span {
  font-weight: bold;
  font-size: 30px;
}

/* 调整输入框的高度 */
::v-deep .el-input__inner {
  height: 32px;
}

/* 分页的样式 */
.demo-pagination-block {
  float: right;
  margin: 20px;
}

/**
	 * 下拉选择器样式
	 */
.resume-operation {
  padding-left: 8px;
  float: right;
  width: 120px;
}

/* 外层阴影 */
.saas-main-content {
  padding-top: 12px;
  min-height: 500px;
}

.j-card-bordered {
  border: 1px solid #e9e9e9;
}

.j-card {
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  margin-top: 8px;
  min-height: 100%;
}
.j-card:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: transparent;
}
.j-card-bordered {
  border: 1px solid #e9e9e9;
  border-top-color: rgb(233, 233, 233);
  border-right-color: rgb(233, 233, 233);
  border-bottom-color: rgb(233, 233, 233);
  border-left-color: rgb(233, 233, 233);
}
.j-card {
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  margin-top: 8px;
  min-height: 100%;
}

.j-card-body{
  padding:0 2%;
}

@font-face {
  font-family: 'iconfont';  /* Project id 2990377 */
  src: url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.woff2?t=1639139822080') format('woff2'),
  url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.woff?t=1639139822080') format('woff'),
  url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.ttf?t=1639139822080') format('truetype');
}

</style>

