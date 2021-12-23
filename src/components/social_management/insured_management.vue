<template>

<!-- 参保人员管理 -->
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <div class="one">批量参保</div>

        <div class="all-input">
          参保方案:
          <el-select
              v-model="scheme_name"
              style="width: 300px"
              size="small"
              clearable
              placeholder="请选择"
          >
            <el-option
                v-for="item in insured_scheme"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
          <el-popover placement="top" :width="225" trigger="hover">
            <template #reference>
              <el-button type="text"
              ><i class="iconfont">&nbsp; &#xe619;</i></el-button
              >
            </template>
            <span style="color: #938c8c"
            >添加社保方案请前往<router-link :to="{path:this.path,query:{path:this.$route.query.path}}">参保方案</router-link
            >页</span
            >
          </el-popover>
          <br/><br/>

          <!-- 填写基本参数的表单 -->
          <div style="text-align: center">
            <!-- left -->
            <div class="form-div">
              <el-switch
                  class="form-seitch"
                  inline-prompt
                  active-text="开"
                  inactive-text="关"
              />

              <el-form :rules="rules">
                <el-form-item prop="name">
                  社保基数：
                  <el-input
                      v-model="name"
                      size="small"
                      placeholder="请输入社保基数"
                  />
                </el-form-item>
                <el-form-item prop="name">
                  参保月份：
                  <el-date-picker
                      size="small"
                      type="month"
                      placeholder="选择参保月份"
                  />
                </el-form-item>
                <el-form-item>
                  计薪月份：
                  <el-date-picker
                      size="small"
                      type="month"
                      placeholder="选择计薪月份"
                  />
                </el-form-item>
              </el-form>
            </div>

            <!-- right -->
            <div class="form-div">
              <el-switch
                  class="form-seitch"
                  inline-prompt
                  active-text="开"
                  inactive-text="关"
              />

              <el-form :rules="rules">
                <el-form-item prop="name">
                  公积金基数：
                  <el-input
                      size="small"
                      placeholder="请输入公积金基数"
                  />
                </el-form-item>
                <el-form-item>
                  参保月份：
                  <el-date-picker
                      size="small"
                      type="month"
                      placeholder="选择参保月份"
                  />
                </el-form-item>
                <el-form-item>
                  计薪月份：
                  <el-date-picker
                      size="small"
                      type="month"
                      placeholder="选择计薪月份"
                  />
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <!-- 表格按钮部分 -->
        <div class="mt-20 ml-20 mr-20">
          <!-- 提交按钮 -->
          <el-button size="small" type="primary">提交</el-button>

          <!-- 搜索框 -->
          <el-input v-model="search" size="small" class="resume-operation" placeholder="搜索">
            <template #suffix>
              <el-icon class="el-input__icon">
                <i-search/>
              </el-icon>
            </template>
          </el-input>

          <!-- 下拉选择器 -->
          <div style="width: 200px" class="resume-operation">
            <el-select
                size="small"
                v-model="dept_name"
                clearable
                placeholder="选择部门"
            >
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
          <el-table :data="emps_table" stripe style="width: 100%">
            <!-- 多选框 -->
            <el-table-column type="selection" width="55"/>
            <el-table-column prop="id" label="编号"/>
            <el-table-column prop="name" label="姓名"/>
            <el-table-column prop="dept" label="部门"/>
            <el-table-column prop="post" label="职位"/>
            <el-table-column prop="phone" label="电话号码"/>
            <el-table-column prop="hiredate" label="入职日期"/>
            <el-table-column prop="positive_dates" label="转正日期"/>
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
import {ref, defineComponent} from "vue";

export default {
  data() {
    return {
      path: "/social/basic_setup/insured_scheme",
      // 参保方案
      scheme_name: null,
      // 参保方案下拉选择器值
      insured_scheme: [
        {value: "1", label: "方案1"},
        {value: "2", label: "方案2"},
        {value: "3", label: "方案3"},
        {value: "4", label: "方案4"},
        {value: "5", label: "方案5"},
      ],
      name: "",
      // 分页参数
      pageInfo: {
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },
      // 部门名称
      dept_name: null,
      // 选择部门 下拉选择器
      depts: [
        {value: "1", label: "部门1"},
        {value: "2", label: "部门2"},
        {value: "3", label: "部门3"},
      ],
      // 表格上的 搜索框
      search: null,
      // 未参保人员表数据
      emps_table: [
        {
          id: 1, // 员工id
          name: "员工1", // 员工名称
          dept: "部门1", // 员工所属部门
          post: "职位1", // 员工职位
          phone: "11111", // 员工手机号
          hiredate: "1999-12-11", // 员工入职日期
          positive_dates: "2000-02-11", // 员工转正日期
        },
        {
          id: 2, // 员工id
          name: "Tom", // 员工名称
          dept: "California", // 员工所属部门
          post: "2", // 员工职位
          phone: "2", // 员工手机号
          hiredate: "2", // 员工入职日期
          positive_dates: "2", // 员工转正日期
        },
        {
          id: 3, // 员工id
          name: "3", // 员工名称
          dept: "3", // 员工所属部门
          post: "3", // 员工职位
          phone: "3", // 员工手机号
          hiredate: "3", // 员工入职日期
          positive_dates: "3", // 员工转正日期
        },
        {
          id: 4, // 员工id
          name: "4", // 员工名称
          dept: "4", // 员工所属部门
          post: "4", // 员工职位
          phone: "4", // 员工手机号
          hiredate: "4", // 员工入职日期
          positive_dates: "4", // 员工转正日期
        },
        {
          id: 5, // 员工id
          name: "5", // 员工名称
          dept: "5", // 员工所属部门
          post: "5", // 员工职位
          phone: "5", // 员工手机号
          hiredate: "5", // 员工入职日期
          positive_dates: "5", // 员工转正日期
        },
      ],
      // 表单验证
      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
      }
    };
  },
};
</script>

<style scoped>

/* 表单验证 */
::v-deep .el-form-item__error {
  margin-left: 135px;
}

/* 开关 */
.form-seitch {
  padding: 40px 0 40px 0;
  margin-left: -300px;
}

/* 表单左右div */
.form-div {
  margin: 10px;
  display: inline-block;
  border: 1px solid #e5e8ed;
  width: 400px;
  height: 300px;
}

/* 输入框 */
.el-input {
  width: 50%;
  display: inline-block;
}

/* 外div 内边距 */
.all-input {
  /*  上、右、下、左  */
  padding: 10px 40px 25px 40px;
}

/* 批量参保 */
.one {
  font-size: 18px;
  border-bottom: 1px solid #f4f5f7;
  padding-bottom: 5px;
}

.j-card-body {
  padding: 10px 25px 20px 25px;
}

/* 调整输入框的高度 */
/* ::v-deep .el-input__inner {
  height: 32px;
} */

/* 分页的样式 */
.demo-pagination-block {
  float: right;
  margin: 20px;
}

/**
	 * 下拉选择器样式
	 */
.resume-operation {
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

.j-card-body {
  padding: 2%;
}

/* 去掉路由样式 */
a {
  text-decoration: none;
  color: #4779b9;
}

@font-face {
  font-family: 'iconfont';  /* Project id 2990377 */
  src: url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.woff2?t=1639139822080') format('woff2'),
  url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.woff?t=1639139822080') format('woff'),
  url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.ttf?t=1639139822080') format('truetype');
}
</style>

