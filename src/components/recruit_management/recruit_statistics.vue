<!-- 统计：招聘计划 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <!--标题-->
      <div class="j-card-head">
        <div class="sub-Content__primary">
          <div class="j-operation-block">
            <p style="padding-top: 20px; font-size: 20px;">
              <b class="total">
                <span>招聘中</span>
                &nbsp;&nbsp;&nbsp;
              </b>
              &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <b class="total">
                <span>已结束</span>
                &nbsp;&nbsp;&nbsp;4
              </b>
            </p>
            <span style="display: block;float: right">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="" style="width: 300px">
                <el-input v-model="formInline.user" placeholder=""></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="">搜索</el-button>
                </el-form-item>
              </el-form>
           </span>
          </div>



          <!-- 表格数据 -->
          <div class="ant-table-wrapper j_statistics_layout">
            <el-table :data="tableData" style="width: 100%; cursor: pointer" size="mini" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
              <el-table-column fixed="left" prop="name" label="姓名" width="150"/>
              <el-table-column fixed="left" prop="departm" label="投递部门" width="140"/>
              <el-table-column prop="gender" label="性别" width="140"/>
              <el-table-column prop="schoolli" label="学历" width="140"/>
              <el-table-column prop="phone" label="手机号" width="140"/>
              <el-table-column prop="age" label="年龄" width="140"/>
              <el-table-column prop="email" label="邮箱" width="140"/>
              <el-table-column prop="professional" label="专业" width="140"/>
              <el-table-column prop="birth" label="出生日期" width="140"/>
              <el-table-column prop="face" label="政治面貌" width="140"/>
              <el-table-column prop="gradschool" label="毕业学校" width="140"/>
              <el-table-column prop="invitation" label="是否邀约" width="140"/>
              <el-table-column prop="state" label="状态" width="140"/>
            </el-table>

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
              >
              </el-pagination>
            </div>
          </div>





        </div>






      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      formInline: {
        user: '',
      },
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },
      //表格数据
      tableData: [
        {name:'tom',departm:'tom',gender:'tom',schoolli:'tom',phone:'tom',age:'tom',email:'tom',professional:'tom',birth:'tom',face:'tom',gradschool:'tom   ',invitation:'tom',state:'tom'},
        {name:'tom',departm:'tom',gender:'tom',schoolli:'tom',phone:'tom',age:'tom',email:'tom',professional:'tom',birth:'tom',face:'tom',gradschool:'tom   ',invitation:'tom',state:'tom'},
        {name:'tom',departm:'tom',gender:'tom',schoolli:'tom',phone:'tom',age:'tom',email:'tom',professional:'tom',birth:'tom',face:'tom',gradschool:'tom   ',invitation:'tom',state:'tom'}
      ],
    }
  }
}
</script>


<style type="text/css" scoped>
.demo-pagination-block{
  margin-left:850px ;
  margin-top: 20px;
  margin-bottom: 30px;
}
.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}

.j-operation-block {
  overflow: hidden;
  padding-bottom: 15px;
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
</style>
