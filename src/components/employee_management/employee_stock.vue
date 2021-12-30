<!--待入职员工页面-->
<template>
  <div class="saas-main-content">

    <!--搜索输入框-->
    <el-row style="width:150px;float:right;">
      <el-input v-model="input3" placeholder="搜索" size="small">
        <template #suffix>
          <el-icon class="el-input__icon"><i-search/></el-icon>
        </template>
      </el-input>
    </el-row>

    <br/>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="resumeName" label="姓名" width="180" />
      <el-table-column prop="deptName" label="部门" width="180" />
      <el-table-column prop="postName" label="职位" width="180" />
      <el-table-column prop="resumePhone" label="手机" width="180" />
      <el-table-column prop="resumeMailbox" label="邮箱" width="180" />
      <el-table-column prop="hiredate" label="入职日期" width="180" />
<!--      <el-table-column prop="resumeBirthday" label="出生日期" width="130" />-->
<!--      <el-table-column prop="resumeResidence" label="户口所在地" width="130" />-->
<!--      <el-table-column prop="resumePoliticalOutlook" label="政治面貌" width="130" />-->
      <el-table-column  label="操作">
        <template #default>
          <el-button type="text" size="small">入职 </el-button>

          <el-button @click="become=true" type="text" size="small">放弃 </el-button>

        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插件 -->
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="pageInfo.currentPage"
          :page-sizes="[4, 5, 10, 50]"
          v-model:page-size="pageInfo.pagesize"
          :default-page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          :pager-count="5"
          prev-text="上一页"
          next-text="下一页"
          @size-change="selectpage1()"
          @current-change="selectpage1()"
          background
      >
      </el-pagination>
    </div>
    <!--  弹框  -->
    <div style="text-align: center;">
      <el-dialog
          v-model="become"
          width="30%"
          :close-on-click-modal="false" >
        放弃原因：<el-input v-model="cause" type="textarea" style="width:240px;"></el-input>
        <div style="margin-top:30px;margin-left: 30px;">
          <el-button @click="become=false">取消</el-button>
          <el-button type="primary" @click="become=false">确定</el-button></div>

      </el-dialog>
    </div>

  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  data(){
    return{
      input3:"",
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 4, // 页大小
        total: 0, // 总页数
      },
      tableData: [],
      cause:'',

    }
  },setup() {
    const become = ref(false)
    return{
      become,
    }
  },
  methods:{
    //查询已录用待入职的员工
    selectpage(){
      this.axios
          .get("http://localhost:80/selectpage",{
          params:this.pageInfo,
          })
           .then((response)=>{
             console.log("查询已录用待入职的员工");
             console.log(response.data.succeed.records);
             this.tableData = response.data.succeed.records;
           })
            .catch(function (error){
              console.log("失败")
              console.log(error);
            });
    },
    //分页查询已录用待入职的员工
    selectpage1(){
      var _this = this
      this.axios
          .get("http://localhost:80/selectpage",{
            params:this.pageInfo,
          })
          .then((response)=>{
            console.log("分页查询已录用待入职的员工");
            console.log(response);
            _this.tableData = response.data.succeed.records;
            _this.pageInfo.pagesize = response.data.succeed.size;
            _this.pageInfo.total = response.data.succeed.total;
          })
          .catch(function (error){
            console.log("失败")
            console.log(error);
          });
    },
  },
  created() {
    //查询已录用待入职的员工
      this.selectpage();
    //分页查询已录用待入职的员工
      this.selectpage1();
  }
})
</script>

<style scoped>

/deep/.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}
/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
  font-size: 12px
}
/* 分页的样式 */
/deep/.demo-pagination-block {
  float: right;
  margin: 20px;
}

</style>
