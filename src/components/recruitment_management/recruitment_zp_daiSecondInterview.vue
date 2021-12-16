<!--待复试-->
<template>
  <div class="saas-main-content">
    <div class="j-card-body ">
      <span></span>

      <!-- 表格按钮部分 -->
      <div>
        <!-- 下拉选择器 -->
        <div class="resume-operation">
          <el-select v-model="value1" clearable placeholder="专业">
            <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
          &nbsp;&nbsp;&nbsp;
          <el-select v-model="value2" clearable placeholder="手机号码">
            <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
          <!--搜索输入框-->
          &nbsp;&nbsp;&nbsp;
          <el-input style="width: 200px;" v-model="input" placeholder="面试人名称" clearable />
          <!--搜索按钮-->
          &nbsp;&nbsp;&nbsp;
          <el-button style="background-color: #085fc3; color: white;" size="small">搜索</el-button>
        </div>


      </div>

      <!-- 表格内容部分 -->
      <div class="sub-Content__primary">

        <el-table :data="tableData" style="width: 100%" size="mini">
          <el-table-column prop="names" label="名字" width="100"/>
          <el-table-column prop="sex" label="性别" width="100" />
          <el-table-column prop="phone" label="手机号码" width="150" />
          <el-table-column prop="education" label="学历" width="120" />
          <el-table-column prop="mailbox" label="邮箱" width="200" />
          <el-table-column prop="major" label="专业" width="150" />
          <el-table-column prop="birthday" label="出生日期" width="150" />
          <el-table-column prop="politics" label="政治面貌" width="100"/>
          <el-table-column fixed="right" label="操作" width="200">
            <template #default>
              <el-button type="text" size="small" @click="">Detail</el-button>
              <el-button type="text" size="small">Edit</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页插件 -->
      <div class="demo-pagination-block" style="float:right">
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
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default {
  data(){
    return {
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

<style type="text/css" scoped>
@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");
.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}
.abt:hover{
  border: 1px solid #085FC3;
  color: #085FC3;
}


/deep/.el-table th.el-table__cell > .cell {
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  vertical-align: middle;
  width: 100%;
  font-weight: initial;
  color: black;
}

</style>