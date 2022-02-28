<template>
  <div class="w">
    <div class="head">
      <el-input v-if="two" size="small" v-model="deptPostName" @input="next" placeholder="请输入职位名称" style="width:150px;margin-left: 25px">
          <template #suffix>
          <el-icon style="margin-top:9px;margin-right:10px"><i-search /></el-icon>
        </template>
      </el-input>

      <el-input v-else size="small" v-model="deptName" @input="next" placeholder="请输入部门名称" style="width:150px;margin-left: 25px">
        <template #suffix>
          <el-icon style="margin-top:9px;margin-right:10px"><i-search /></el-icon>
        </template>
      </el-input>

      <el-button @click="two=!two">切换</el-button>
    </div>

    <div class="y">
    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="postName" label="职位"/>
		<el-table-column prop="deptName" label="所属部门"/>
		<el-table-column prop="staffName" label="部门负责人" />
		<el-table-column prop="deptState" label="状态" >
      <template #default="scope">
        <span v-if="scope.row.deptState==0" style="color: #1d95e0" >启用</span>
        <span v-else-if="scope.row.deptState==1" style="color: red">禁用</span>
      </template>
    </el-table-column>
		<!-- <el-table-column prop="operate" label="操作" >
      <template #default>
        <el-button type="text" size="small" style="color:darkorange">删除</el-button>
      </template>
    </el-table-column> -->
    </el-table>
    </div>

    <!-- 分页 -->
    <div class="demo-pagination-block">
      <el-pagination v-model:current-page="pageInfo.currentPage"
                     v-model:page-size="pageInfo.pagesize"
                     :default-page-size="pageInfo.pagesize"
                     :page-sizes="[5, 10,15,20]"
                     :pager-count="5"
                     :total="pageInfo.total"
                     background
                     layout="	total ,sizes, prev, pager, next, jumper"
                     next-text="下一页"
                     prev-text="上一页"
                     @size-change="next()"
                     @current-change="next()"
                     @prev-click="next()"
                     @next-click="next()">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import {ElNotification} from "element-plus/es";
export default {
  data() {
    return {
      url: "http://localhost:80/",
        pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 5,
        total: 0,
      },
      two:true,
      deptPostName:'',
      deptName: '',
      options: ref([]),
      tableData: [],
      value1: "", //日期
      value: ref(""), //选择
    };
  },
  methods: {

    /*分页查询*/
    next() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectDeptPostF',
        data: {
          //当前页
          'currentPage': this.pageInfo.currenPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          //职位名称
          "postName":this.deptPostName,
          //部门名称
          "deptName":this.deptName,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              _this.tableData = response.data.data.info.records
              _this.pageInfo.total = response.data.data.info.total
              this.$store.commit("updateToken", response.data.data.token);
            } else {
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
    this.next();
  }
};
</script>

<style scoped>

table *{
  text-align: center;
}
.w {
  margin-top: 20px;
  border: 1px solid #e9e9e9;
}
.w:hover {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  border-color: transparent;
}
.y{
    margin-top: 20px;
}
.head {
  margin-left: 2%;
  margin-top: 2%;
}

.demo-pagination-block{
  margin-left:50px ;
  margin-top: 20px;
  margin-bottom: 30px;
}

</style>

