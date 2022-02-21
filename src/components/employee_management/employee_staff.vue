<!--花名册页面-->
<template>
<div class="saas-main-content">

<div class="icon-p" style="width: 100%;float: left">
<el-row :gutter="20">
    <el-col :span="5">
      <el-card shadow="always" style="background-color: rgb(35, 102, 167);color:white;font-size:14px;">
        <p>在职</p>
        <p>{{this.tableDataTwo.tjFive+this.tableDataThree.tjSix}}</p>
      </el-card>
    </el-col>
    <el-col :span="5">
      <el-card shadow="hover" style="background-color: rgb(73, 167, 130);color:white;font-size:14px;">
        <p>本月离职</p>
        <p>{{ this.tableDatas.tjFour }}</p>
      </el-card>
    </el-col>
    <el-col :span="5">
	  <el-card shadow="never" style="background-color: rgb(233, 143, 39);color:white;font-size:14px;">
      <p>正式</p>
      <p>{{this.tableDataTwo.tjFive}}</p>
    </el-card>
    </el-col>
<!--	<el-col :span="4">-->
<!--      <el-card shadow="never" style="background-color: rgb(35, 102, 167);color:white;font-size:14px;">-->
<!--        <p>试用</p>-->
<!--        <p>3</p>-->
<!--      </el-card>-->
<!--    </el-col>-->
	<el-col :span="5">
      <el-card shadow="never" style="background-color: rgb(73, 167, 130);color:white;font-size:14px;">
        <p>试用</p>
        <p>{{ this.tableDataThree.tjSix }}</p>
      </el-card>
    </el-col>
	<el-col :span="4">
      <el-card shadow="never" style="background-color: rgb(233, 143, 39);color:white;font-size:14px;">
        <p>本月新入职</p>
        <p>{{ this.tableDataFour.tjSeven }}</p>
      </el-card>
    </el-col>
  </el-row>
</div>


<div style="margin-top:10px;">
		<!--搜索输入框-->
    <el-row style="width:150px;float:right;">
      <el-input size="small" v-model="seek" placeholder="姓名" style="margin-top: 20px;margin-right: 2px;" @input="selectStaff">
        <template #suffix>
          <el-icon class="el-input__icon"><i-search/></el-icon>
        </template>
      </el-input>
    </el-row>
</div>

<br/>
<div style="margin-top:95px;">
 <el-table :data="tableData" style="width: 100%;"
           :header-cell-style="{background:'#eef1f6',color:'#606266'}">
    <el-table-column fixed="left" prop="staffName" label="姓名" width="160"/>
    <el-table-column prop="staffBirthday" label="出生日期" width="160" />
    <el-table-column prop="deptName" label="部门" width="160" />
    <el-table-column prop="postName" label="职位" width="160" />
	 <el-table-column prop="staffPhone" label="手机" width="160" />
   <el-table-column prop="workAge" label="工龄" width="160" />
	  <!--<el-table-column prop="staffState" label="状态" width="160" />-->
   <el-table-column label="状态" width="100">
     <template #default="scope">
       <span class="button-await" v-if="scope.row.staffState===0"><span style="color: #5aaaff">试用</span></span>
       <span class="button-pass" v-if="scope.row.staffState===1"><span style="color: #5aaaff">正式</span></span>
       <span class="button-reject" v-if="scope.row.staffState===2"><span style="color: #5aaaff">离职</span></span>
     </template>
   </el-table-column>
    <el-table-column  prop="staffHiredate" label="入职日期" sortable  width="160">
	</el-table-column>
   <el-table-column  prop="workerDate" label="转正日期"   width="160"/>
    <el-table-column fixed="right" label="操作" width="160">
      <template #default="scope">
        <el-button type="text" size="small" @click="this.$parent.$parent.$parent.$data.one=scope.row.staffId,
                                                     this.$parent.$parent.$parent.$data.three=scope.row.staffName,
                                                     this.$parent.$parent.$parent.$data.two='book',
                                                     this.$parent.$parent.$parent.$data.employee_compile=true"
          >编辑 </el-button>
        <el-button type="text" size="small" @click="this.$parent.$parent.$parent.$data.one=scope.row.staffId,
                                                    this.$parent.$parent.$parent.$data.employee_dimission=true">办理离职</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
  <br/>
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
        @size-change="selectStaff()"
        @current-change="selectStaff()"
        background
    >
    </el-pagination>
  </div>


</div>
</template>
<script>
import {defineComponent,ref} from 'vue'
import {ElNotification} from "element-plus";
export default {
//操作时间
  data() {
    const value2 = ref('')
    return {
      tableDatas:[],
      tableDataTwo:[],
      tableDataThree:[],
      tableDataFour:[],
      url: "http://localhost:80/",
      tableData: [],
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 5, // 页大小
        total: 0, // 总页数
      },
      seek:"",
      value2:"",
      staffState:'',
      fromvalue:{
        staffId:'',
      },

    }
  },
  methods:{
    //查询员工花名册
    selectStaff() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectStaff',
        data: {
          //当前页
          'currentPage': this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          //名称
          "staffName": this.seek,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        //如果服务关闭
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              _this.tableData = response.data.data.info.records
              _this.pageInfo.total = response.data.data.info.total
              this.$store.commit("updateToken", response.data.data.token);
            } else {
              ElNotification.error({
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
    //本月离职
    countStateThree() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'countStateThree',
        data: {
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              _this.tableDatas = response.data.data.info[0]
              this.$store.commit("updateToken", response.data.data.token);
            } else {
              ElNotification.error({
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
    //正式
    countStateFour() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'countStateFour',
        data: {
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              _this.tableDataTwo = response.data.data.info[0]
              this.$store.commit("updateToken", response.data.data.token);
            } else {
              ElNotification.error({
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
    //试用
    countStateFive() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'countStateFive',
        data: {
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              _this.tableDataThree = response.data.data.info[0]
              this.$store.commit("updateToken", response.data.data.token);
            } else {
              ElNotification.error({
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
    //本月新入职
    countStateSix() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'countStateSix',
        data: {
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              _this.tableDataFour = response.data.data.info[0]
              this.$store.commit("updateToken", response.data.data.token);
            } else {
              ElNotification.error({
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
  },
  mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    //查询员工花名册
    this.selectStaff();
    //本月离职
    this.countStateThree();
    //正式
    this.countStateFour();
    //试用
    this.countStateFive();
    //本月新入职
    this.countStateSix();
  },
  // 挂载
  created() {
    //查询员工花名册
    //this.selectStaff();
  }
}
</script>
<style scoped>
/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
  font-size: 12px;
}
/deep/.el-card__body {
  /* padding: var(--el-card-padding); */
  padding: 10px 0;
}
/deep/.icon-p p{
  text-align: center;
}
</style>