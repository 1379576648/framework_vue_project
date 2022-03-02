<!-- 已邀约 -->
<template>
  <div class="sub-Content__primary">
    <div class="ant-spin-nested-loading">
      <div class="ant-spin-container">
        <div class="mt-20 ml-20 mr-20">

          <!-- 批量面试签到 -->
<!--          <button style="margin-top: 4px; margin-left: 10px;" type="button" class="ant-btn abt">-->
<!--            <span>批量签到</span>-->
<!--          </button>-->


          <!--搜索框-->
          <div style="float: right;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">

              <el-form-item>
                <el-input v-model="resumeName" placeholder="姓名" clearable></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="selectInvite" size="mini"><i class="iconfont">&#xeafe;</i></el-button>
              </el-form-item>
            </el-form>
          </div>

        </div>
      </div>

    </div>
    <br/>
    <!-- 表格数据 -->
    <div class="ant-table-wrapper j_statistics_layout">
      <el-table :data="tableData" style="width: 100%; cursor: pointer" size="mini" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column fixed="left"  align="center" type="selection" width="80" />
        <el-table-column fixed :index="indexMethod" align="center" prop="resumeId" label="序号" type="index" min-width="100"/>
        <el-table-column fixed="left" label="姓名" width="150">
          <template #default="scope">
            <span @click="this.$parent.$parent.$parent.$data.recruit_plan_details=true">
             {{ scope.row.resumeName }}
            </span>

          </template>
        </el-table-column>
        <el-table-column fixed="left" prop="postName" label="投递部门" width="140"/>
        <el-table-column prop="resumeSex" label="性别" width="140"/>
        <el-table-column prop="resumeEducation" label="学历" width="140"/>
        <el-table-column prop="resumePhone" label="手机号" width="140"/>
        <!--        <el-table-column prop="age" label="年龄" width="140"/>-->
        <el-table-column prop="resumeMailbox" label="邮箱" width="140"/>
        <!--        <el-table-column prop="professional" label="专业" width="140"/>-->
        <el-table-column prop="resumeBirthday" label="出生日期" width="140"/>
        <!--        <el-table-column prop="face" label="政治面貌" width="140"/>-->
        <!--        <el-table-column prop="gradschool" label="毕业学校" width="140"/>-->
        <!--        <el-table-column prop="invitation" label="是否邀约" width="140"/>-->
        <!--        <el-table-column prop="state" label="状态" width="140"/>-->

        <el-table-column fixed="right" label="操作" width="180">
          <template #default="scope">
            <div style="width: 110px">
              <el-button type="text" size="small" @click="InterviewSign(scope.row.resumeId)">面试签到</el-button>
              <el-row class="block-col-2" style="float: right;">
                <el-col :span="8">
                  <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <el-button type="text" size="small">更多<i class="iconfont" style="font-size: 10px">&#xe772;</i></el-button>
                </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item >淘汰/放弃</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </el-col>
              </el-row>
            </div>

          </template>
        </el-table-column>
      </el-table>

      <div class="demo-pagination-block" style="margin-left: 0px">
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
            @size-change="selectInvite"
            @current-change="selectInvite"
        >
        </el-pagination>
      </div>
    </div>




  </div>

</template>

<script>
import {
  ref
} from 'vue'
import {ElMessage, ElNotification} from "element-plus";

export default {
  data() {
    return {
      resumeName:'',
      //路由地址 ：简历详情页面
      details:'/recruit/resume/details',
      pageInfo: {
        currentPage: 1,
        /* 当前的页 */
        pagesize: 5,
        total: 0,
      },
      //筛选框显示隐藏
      icons:false,
      //访问路径
      url: "http://localhost:80/",
      //搜索框
      input: "",
      //表格数据
      tableData: [],
      //筛选框数据
      formInline:[],


    }
  },
  methods: {
    //查询候选人
    selectInvite() {
      this.axios({
        method: 'post',
        url: this.url + 'selectInvite',
        data: {
          "currentPage": this.pageInfo.currentPage,
          "pagesize": this.pageInfo.pagesize,
          "resumeName":this.resumeName,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
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
    },
    //面试签到
    InterviewSign(id) {
      console.log(id)
      this.axios({
        method: 'post',
        url: this.url + 'InterviewSign',
        data: {
          resumeId:id,
          resumeName: this.resumeName,
          postName: this.postName,
          resumeSex: this.resumeSex,
          resumeEducation:this.resumeEducation,
          resumePhone:this.resumePhone,
          resumeMailbox:this.resumeMailbox,
          resumeBirthday:this.resumeBirthday,
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
        console.log("面试签到")
        console.log(response);
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              //如果是成功
              if (response.data.data.info == 666) {
                this.selectInvite();
                this.$store.commit("updateToken", response.data.data.token);
                ElMessage({
                  message: '面试签到成功',
                  type: 'success',
                })
              }
            }else {
              ElNotification.warning({
                title: '提示',
                message: response.data.data.info,
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
    },
  },mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    this.selectInvite();
  },
  //序号
  indexMethod(index) {
    let curpage = this.pageInfo.currentPage; //单前页码，具体看组件取值
    let limitpage = this.pageInfo.pagesize; //每页条数，具体是组件取值
    return index + 1 + (curpage - 1) * limitpage;
  }

}

</script>
<style type="text/css" scoped>
/*@import url("../../css/navigation.css");*/
@import url("../../css/zpdaohang.css");
.demo-pagination-block{
  margin-left:850px ;
  margin-top: 20px;
  margin-bottom: 30px;
}

.icon-s{
  width: 75%;
  height: 45px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-top: 10px;
  padding: 16px;
  margin-left: 70px;
}
.el-button--primary { /* el-input 显示时 */
  background: #085fc3 !important;
  border-color: #085fc3 !important;
}

.el-button--primary:hover {/* el-input 悬浮时 */
  background: #297ccf !important;
  border-color: #297ccf !important;
  color: #FFF !important;
}

.j-tabs {
  border-bottom: 1px solid #d9d9d9;
}

.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}

.ant-spin-nested-loading {
  position: relative;
}

.ant-spin-container {
  position: relative;
  transition: opacity 0.3s;
}

.ant-table-wrapper::after {
  clear: both;
}

.ant-table-wrapper::before, .ant-table-wrapper::after {
  display: table;
  content: '';
}

.abt:hover {
  color: #0c9c6e;
  border: 1px solid #0c9c6e;
}
</style>