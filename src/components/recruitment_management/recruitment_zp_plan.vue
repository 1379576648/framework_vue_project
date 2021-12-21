<!-- 招聘计划 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <span></span>

        <!-- 表格按钮部分 -->
        <div class="mt-20 ml-20 mr-20">
          <!-- 新增招聘计划按钮 -->
          <a style="margin-top: 4px;">
            <router-link :to="{path:this.one,query:{path:this.$route.query.path,name:'新增'}}">
              <button type="button" class="ant-btn ant-btn-primary">
                <span>新增招聘计划</span>
              </button>
            </router-link>
          </a>
          <!-- 批量导入按钮 -->
          <button style="margin-top: 4px; margin-left: 10px;" type="button" class="ant-btn abt">
            <span>批量导入</span>
          </button>

          <!-- 下拉选择器 -->
          <div class="resume-operation">
            <el-select v-model="value1" clearable placeholder="招聘职位">
              <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
            &nbsp;&nbsp;&nbsp;
            <el-select v-model="value2" clearable placeholder="招聘状态">
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
            <el-input style="width: 200px;" v-model="input" placeholder="招聘计划名称" clearable/>
            <!--搜索按钮-->
            &nbsp;&nbsp;&nbsp;
            <el-button style="background-color: #085fc3; color: white;" size="small">Custom</el-button>
          </div>


        </div>

        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table :data="tableData" style="width: 100%; cursor: pointer" size="mini" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column prop="ID" label="序号" width="150"/>
            <el-table-column label="招聘计划名称" width="200">
              <template #default="scope">
                <router-link :to="{path:this.two,query:{path:this.$route.query.path,name:scope.row.zpname}}">{{scope.row.zpname}}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="zpzw" label="招聘职位" width="200"/>
            <el-table-column prop="zpdept" label="需求部门" width="200"/>
            <el-table-column prop="zpnum" label="招聘人数" width="200"/>
            <el-table-column prop="statetime" label="发布时间" width="200"/>
            <el-table-column prop="zpzt" label="招聘状态" width="200"/>
            <el-table-column fixed="right" label="操作" width="180">
              <template #default="scope">
                <div v-if="tableData[scope.$index].zpzt=='招聘中'">
                  <router-link :to="{path:this.one,query:{path:this.$route.query.path,name: '修改'}}">
                  <el-button type="text" size="small" >编辑</el-button>
                  </router-link>
                  &nbsp;
                  <el-popconfirm title="是否确定关闭?" @confirm="confirmgb()" @cancel="cancelgb()">
                    <template #reference>
                      <el-button type="text" size="small">关闭</el-button>
                    </template>
                  </el-popconfirm>

                </div>
                <div v-else-if="tableData[scope.$index].zpzt=='已结束'">
                  <el-button type="text" size="small" @click="">查看</el-button>

                  <el-popconfirm title="是否确认删除该招聘计划?" @confirm="confirmsc()" @cancel="cancelsc()">
                    <template #reference>
                       <el-button type="text" size="small">删除</el-button>
                    </template>
                  </el-popconfirm>

                </div>
              </template>
            </el-table-column>
          </el-table>

        </div>
      </div>
      <div class="demo-pagination-block">
        <!-- <span class="demonstration">All combined</span> -->
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
            prev-text="上一页"
            next-text="下一页"
        >
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      one: '/recruitment/addplan/addplan',
      two:'/recruitment/plan/details',
      //分页
      pageInfo: {
        currenPage: 3,
        /* 当前的页 */
        pagesize: 3,
        total: 3,
      },
      //下拉选择器
      options1: [
        {value: '人力资源师', label: '人力资源师'},
        {value: '数据挖掘工程师', label: '数据挖掘工程师'},
        {value: '法务经理', label: '法务经理'},
        {value: '测试工程师', label: '测试工程师'}
      ],
      options2: [
        {value: '招聘中', label: '招聘中'},
        {value: '已结束', label: '已结束'}
      ],
      value1: "",
      value2: "",
      row1:{
        ID: null,
        zpname: null,
        zpzw: null,
        zpdept: null,
        zpnum: null,
        statetime: null,
        zpzt: null
      },
      //输入框数据
      input: "",
      tableData: [
        {
          ID: '1',
          zpname: 'HTR2001招聘计划',
          zpzw: '研发人员',
          zpdept: '市场部',
          zpnum: '10',
          statetime: '2016-05-03',
          zpzt: '招聘中'
        },
        {
          ID: '1',
          zpname: 'HTR2001招聘计划',
          zpzw: '研发人员',
          zpdept: '市场部',
          zpnum: '10',
          statetime: '2016-05-03',
          zpzt: '已结束'
        },
      ]
    }
  },
  methods:{
    //消息提示框确认按钮事件
    confirmgb(){
      ElMessage({
        message: '操作成功',
        type: 'success',
      })
    },
    //消息提示框取消按钮事件
    cancelgb(){
      ElMessage({
        message: '已取消该操作',
        type: 'warning',
      })
    },
    //消息提示框确认按钮事件
    confirmsc(){
      ElMessage({
        message: '操作成功',
        type: 'success',
      })
    },
    //消息提示框取消按钮事件
    cancelsc(){
      ElMessage({
        message: '已取消该操作',
        type: 'warning',
      })
    }
  }
}

</script>


<style type="text/css" scoped>
@import url("../../css/zpdaohang.css");
.demo-pagination-block{
  margin-left:850px ;
  margin-top: 20px;
  margin-bottom: 30px;
}
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

.mr-20 {
  margin-right: 20px;
}

.ml-20 {
  margin-left: 20px;
}

.mt-20 {
  margin-top: 20px;
}

a {
  color: #085fc3;
  background-color: transparent;
}

a, area, button, [role="button"], input:not([type="range"]), label, select, summary, textarea {
  touch-action: manipulation;
}

a {
  color: #366cb3;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
  -webkit-text-decoration-skip: objects;
}

button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner {
  border-style: none;
}

button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner {
  padding: 0;
  border-style: none;
}

.ant-btn::before {
  background: #fff;
  border-radius: inherit;
}

.ant-btn::before {
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -1px;
  left: -1px;
  z-index: 1;
  display: none;
  background: #fff;
  border-radius: inherit;
  opacity: 0.35;
  transition: opacity 0.2s;
  content: '';
  pointer-events: none;
}

button, html [type="button"], [type="reset"], [type="submit"] {
  -webkit-appearance: button;
}

.ant-btn-primary {
  color: #fff;
  background-color: #085fc3;
  border-color: #085fc3;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}

.ant-btn-primary {
  color: #fff;
  background-color: #366cb3;
  border-color: #366cb3;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}

.ant-btn, .ant-btn:active, .ant-btn:focus {
  outline: 0;
}

.ant-btn {
  line-height: 1.499;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 3px;
  color: #606c82;
  background-color: #fff;
  border-color: #d3dae2;
}

.ant-btn-primary {
  color: #fff;
  background-color: #085fc3;
  border-color: #085fc3;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}


/**
 * 下拉选择器样式
 */
.resume-operation {
  text-align: right;
  padding-left: 8px;
}

.resume-operation .ant-form-item {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 4px;
  width: 200px;
}

.ant-form-item {
  color: rgba(0, 0, 0, 0.65);
}


.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}

.abt:hover {
  border: 1px solid #085FC3;
  color: #085FC3;
}

/deep/ .el-table th.el-table__cell > .cell {
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  vertical-align: middle;
  width: 100%;
  font-weight: initial;
  color: black;
}


/**
修改样式
 */

</style>

