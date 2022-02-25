<template>
  <div class="w">
    <div class="head">

      <el-input size="small" v-model="deptName" @input="next" placeholder="请输入部门名称" style="width:150px;margin-left: 25px">
          <template #suffix>
          <el-icon style="margin-top:9px;margin-right:10px"><i-search /></el-icon>
        </template>
      </el-input>

    </div>

    <div class="y">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <p>部门负责人: {{ props.row.staffName }}</p>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="deptId" />
        <el-table-column label="部门" prop="deptName" />
		<el-table-column label="部门负责人" prop="staffName" />
		<el-table-column label="状态" prop="deptState" >
      <template #default="scope">
        <span v-if="scope.row.deptState==0" style="color: #1d95e0" >启用</span>
        <span v-else-if="scope.row.deptState==1" style="color: red">禁用</span>
      </template>
    </el-table-column>
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
import {defineComponent, reactive, toRefs, ref} from 'vue'
import {ElMessageBox, ElMessage, ElNotification} from 'element-plus'
export default {
  data() {
    return {
      //访问路径
      url: "http://localhost:80/",
      pageInfo: {
        currentPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },
      deptName:'',
      tableData: [],
    };
  },
  methods: {
    /*分页查询*/
    next() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectDept',
        data: {
          //当前页
          'currentPage': this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
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
      this.next();
    }

}
</script>

<style>

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
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

</style>

