<!-- 招聘计划 -->
<template>
  <div class="saas-main-content" v-if="recruit_add_plan==false&&recruit_plan_details==false">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <span></span>

        <!-- 表格按钮部分 -->
        <div class="mt-20 ml-20 mr-20">
          <!-- 新增招聘计划按钮 -->
          <a style="margin-top: 4px;">
              <button type="button" class="ant-btn ant-btn-primary"  @click="recruit_add_plan=true,recruit_add_plan_name='新增'">
                <span>新增招聘计划</span>
              </button>
          </a>

          <!-- 下拉选择器 -->
          <div class="resume-operation">

            <!--搜索输入框-->
            &nbsp;&nbsp;&nbsp;
            <el-input style="width: 200px;" v-model="recruitmentPlanName" placeholder="招聘计划名称" clearable/>
            <!--搜索按钮-->
            &nbsp;&nbsp;&nbsp;
            <el-button style="background-color: #085fc3; color: white;" size="small" @click="selectRecruitment">搜索</el-button>
          </div>


        </div>

        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table :data="tableData" style="width: 100%; cursor: pointer" size="mini"
                    :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column fixed :index="indexMethod" align="center" prop="recruitmentPlanId" label="序号" type="index" min-width="100"/>
            <el-table-column prop="recruitmentPlanName" label="招聘计划名称" width="200">
              <template #default="scope" >
                <span @click="this.recruit_plan_details=true">
                 {{ scope.row.recruitmentPlanName }}
                </span>

              </template>
            </el-table-column>
            <el-table-column prop="postName" label="招聘职位" width="200"/>
            <el-table-column prop="deptName" label="需求部门" width="200"/>
            <el-table-column prop="recruitmentPlanNumber" label="招聘人数" width="200"/>
            <el-table-column prop="recruitmentPlanStartTime" label="发布时间" width="200"/>
            <el-table-column prop="recruitmentZt" label="招聘状态" width="200">
              <template #default="scope">
                <span class="button-await" v-if="scope.row.recruitmentZt===0">招聘中</span>
                <span class="button-pass" v-if="scope.row.recruitmentZt===1">已结束</span>
              </template>
            </el-table-column>
            <el-table-column prop="zpzt" label="负责人" width="200"/>
            <el-table-column fixed="right" label="操作" width="180">
              <template #default="scope">
                <div style="width: 140px">
<!--                  <el-button type="text" size="small" @click="">删除</el-button>-->
                </div>
                <div v-if="tableData[scope.$index].zpzt=='招聘中'">
<!--                    <el-button type="text" size="small" @click="recruit_add_plan=true,recruit_add_plan_name='编辑'">编辑</el-button>
                  &nbsp;
                  <el-popconfirm title="是否确定关闭?" @confirm="confirmgb()" @cancel="cancelgb()">
                    <template #reference>
                      <el-button type="text" size="small">关闭</el-button>
                    </template>
                  </el-popconfirm>-->

                </div>
                <div v-else-if="tableData[scope.$index].zpzt=='已结束'">
<!--                  <el-button type="text" size="small" @click="">查看</el-button>

                  <el-popconfirm title="是否确认删除该招聘计划?" @confirm="confirmsc()" @cancel="cancelsc()">
                    <template #reference>
                      <el-button type="text" size="small">删除</el-button>
                    </template>
                  </el-popconfirm>-->

                </div>
              </template>
            </el-table-column>
          </el-table>

        </div>
      </div>
      <div class="demo-pagination-block" style="margin-left: 30px">
        <!-- <span class="demonstration">All combined</span> -->
        <el-pagination
            v-model:currentPage="pageInfo.currentPage"
            :page-sizes="[3, 5, 10, 50]"
            v-model:page-size="pageInfo.pagesize"
            :default-page-size="pageInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            :pager-count="5"
            background
            @size-change="selectRecruitment"
            @current-change="selectRecruitment"
            prev-text="上一页"
            next-text="下一页"
        >
        </el-pagination>
      </div>
    </div>
<!--    {{ this.$store.state.staffMessage.staffName}}-->
  </div>
<!--  新增招聘计划-->
  <recruit_add_plan v-if="recruit_add_plan" :name="recruit_add_plan_name"/>
<!--  招聘计划详情页面-->
  <recruit_plan_details v-if="recruit_plan_details"/>
</template>

<script>
import {ElMessage, ElNotification} from 'element-plus'
import {ref} from 'vue'
//新增招聘计划
import recruit_add_plan from '../recruit_management/recruit_add_plan.vue';
//招聘计划详情页面
import recruit_plan_details from '../recruit_management/recruit_plan_details.vue';
export default {
  //注册组件
  components: {
    //新增招聘计划
    recruit_add_plan,
    //招聘计划详情页面
    recruit_plan_details
  },

  data() {
    return {
      recruitmentPlanName:"",
      //新增招聘计划
      recruit_add_plan:false,
      //判断是新增还是编辑
      recruit_add_plan_name:'',
      //招聘计划详情页面
      recruit_plan_details:false,
      //访问路径
      url:'http://localhost:80/',
      //招聘状态
      recruitmentZt:'',
      //分页
      pageInfo: {
        currentPage: 1,
        /* 当前的页 */
        pagesize: 5,
        total: 0,
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
      //输入框数据
      input: "",
      tableData: []
    }
  },
  methods: {
    //消息提示框确认按钮事件
    confirmgb() {
      ElMessage({
        message: '操作成功',
        type: 'success',
      })
    },
    //消息提示框取消按钮事件
    cancelgb() {
      ElMessage({
        message: '已取消该操作',
        type: 'warning',
      })
    },
    //消息提示框确认按钮事件
    confirmsc() {
      ElMessage({
        message: '操作成功',
        type: 'success',
      })
    },
    //消息提示框取消按钮事件
    cancelsc() {
      ElMessage({
        message: '已取消该操作',
        type: 'warning',
      })
    },
    selectRecruitment(){
        this.axios({
          method: 'post',
          url: this.url + 'selectRecruitment',
          data: {
            "currentPage": this.pageInfo.currentPage,
            "pagesize": this.pageInfo.pagesize,
            "recruitmentPlanName":this.recruitmentPlanName,
          },
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          console.log(response)
          if (response.data.code === 200) {
            if (response.data.data) {
              //如果服务是正常的
              if (response.data.data.state === 200) {
                this.tableData = response.data.data.succeed.records;
                this.pageInfo.pagesize = response.data.data.succeed.size;
                this.pageInfo.total = response.data.data.succeed.total;
                this.$store.commit("updateToken", response.data.data.token);
              } else {
                ElNotification.error({
                  title: '提示',
                  message: "",
                  offset: 100,
                })
              }
            }
          } else {
            ElNotification.error({
              title: '提示',
              message: response.data.message,
              offset: 100,
            })
          }
        })

    }
  },mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    this.selectRecruitment();
  },
  //序号
  indexMethod(index) {
    let curpage = this.pageInfo.currentPage; //单前页码，具体看组件取值
    let limitpage = this.pageInfo.pagesize; //每页条数，具体是组件取值
    return index + 1 + (curpage - 1) * limitpage;
  },
}

</script>


<style type="text/css" scoped>
@import url("../../css/zpdaohang.css");

.demo-pagination-block {
  margin-left: 850px;
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

