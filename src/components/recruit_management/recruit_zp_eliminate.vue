<!--简历：淘汰库-->
<template>
  <div class="sub-Content__primary">
    <div class="ant-spin-nested-loading">
      <div class="ant-spin-container">
        <div class="mt-20 ml-20 mr-20">

          <!-- 批量批量删除按钮 -->
          <button style="margin-top: 4px; margin-left: 10px;" type="button" class="ant-btn abt">
            <span>批量删除</span>
          </button>

          <!--搜索框-->
          <div style="float: right;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">

              <el-form-item>
                <el-input v-model="formInline.user" placeholder="姓名、招聘计划名称" clearable></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="" size="mini"><i class="iconfont">&#xeafe;</i></el-button>
              </el-form-item>
            </el-form>
          </div>

        </div>
      </div>
      <!--
        筛选框
      -->
      <div class="icon-s" v-show="icons">

        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item>
            <el-select v-model="formInline.vlues1" placeholder="Activity zone">
              <el-option label="Zone one" value="shanghai"></el-option>
              <el-option label="Zone two" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formInline.vlues2" placeholder="Activity zone">
              <el-option label="Zone one" value="shanghai"></el-option>
              <el-option label="Zone two" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select v-model="formInline.vlues3" placeholder="Activity zone">
              <el-option label="Zone one" value="shanghai"></el-option>
              <el-option label="Zone two" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select v-model="formInline.vlues4" placeholder="Activity zone">
              <el-option label="Zone one" value="shanghai"></el-option>
              <el-option label="Zone two" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="" size="mini">确定</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="" size="mini">重置</el-button>
          </el-form-item>

          <el-form-item>
            <span style="cursor: pointer" @click="icons =! icons"> 收起 <i class="iconfont">&#xe76e;</i></span>
          </el-form-item>

        </el-form>


      </div>
    </div>
    <br/>
    <!-- 表格数据 -->
    <div class="ant-table-wrapper j_statistics_layout">
      <el-table :data="tableData" style="width: 100%; cursor: pointer" size="mini" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column fixed="left"  align="center" type="selection" width="80" />
        <el-table-column fixed="left" label="姓名" width="150" >
          <template #default="scope">
            <router-link :to="{path:this.details,query:{path:this.$route.query.path,name:scope.row.resumeName}}">{{scope.row.resumeName}}</router-link>
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

        <el-table-column fixed="right" label="操作" width="130">
          <template #default>
            <div style="width: 10px">
              <el-button type="text" size="small" @click="">删除</el-button>

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
            @size-change="selectEliminate"
            @current-change="selectEliminate"
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
import {ElNotification} from "element-plus";

export default {
  data() {
    return {
      //路由地址
      details:'/recruitment/resume/details',
      addresume:'/recruitment/recruit/addresume',
      pageInfo: {
        currentPage: 1,
        /* 当前的页 */
        pagesize: 5,
        total: 0,
      },
      //筛选框显示隐藏
      icons:false,
      //路由地址
      url: "http://localhost:80/",
      //搜索框
      input: "",
      //表格数据
      tableData: [],
      //筛选框数据
      formInline:{
        vlues1:'',
        vlues2:'',
        vlues3:'',
        vlues4:'',
        user:''

      }


    }
  },
  methods:{
    selectEliminate(){
        var _this=this
        this.axios({
            method:'post',
            url:this.url+'selectEliminate',
            data:{
              'currentPage':this.pageInfo.currentPage,
              'pagesize':this.pageInfo.pagesize
            },
            responseType: 'json',
            responseEncoding: 'utf-8',
        }).then((response)=>{
            console.log("查询淘汰库")
            console.log(response);
            if(response.data.state===300){
              ElNotification.warning({
                title: '提示',
                message: "服务发生关闭",
                offset: 100,
              })
            }else if(response.data.state===200) {
              this.tableData = response.data.succed.records;
              this.pageInfo.pagesize = response.data.succed.size;
              this.pageInfo.total = response.data.succed.total;
            } else {
              ElNotification.warning({
                title: '提示',
                message: "服务发生雪崩",
                offset: 100,
              })
            }
        }).catch(function (error){
            console.log("失败")
            console.log(error)
        })
    }
  },created() {
    this.selectEliminate();
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
