
<!--  放弃入职员工页面  -->
<template>
  <div class="saas-main-content">

    <!--搜索输入框-->
    <el-row style="width:150px;float:right;">
      <el-input v-model="seek" placeholder="姓名" size="small" @input="selectabandon">
        <template #suffix>
          <el-icon class="el-input__icon"><i-search/></el-icon>
        </template>
      </el-input>
    </el-row>
	<br/>
  <br/>
  <br/>
    <el-table :data="tableData" stripe style="width: 100%"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}">
      <el-table-column prop="resumeName" label="姓名" width="200" />
      <el-table-column prop="deptName" label="部门" width="200" />
      <el-table-column prop="postName" label="职位" width="200" />
      <el-table-column prop="resumePhone" label="手机号" width="200" />
      <el-table-column prop="hiredate" label="入职日期" width="200" />
	  <el-table-column prop="waiveReason" label="放弃原因" width="" />

    </el-table>
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
          @size-change="selectabandon()"
          @current-change="selectabandon()"
          background
      >
      </el-pagination>
    </div>
  </div>

</template>
<script>
import {ElNotification} from "element-plus";
export default {
  data() {
    return {
      url: "http://localhost:80/",
      tableData: [],
      seek:'',
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 4, // 页大小
        total: 0, // 总页数
      },

    }
  },
  methods:{
    //查询已经淘汰的员工
    selectabandon() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectabandon',
        data: {
          //当前页
          'currentPage': this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          //名称
          "resumeName": this.seek,
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
  },
  // 挂载
  created() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    //分页查询已经淘汰的员工
    this.selectabandon();
  }
}
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

</style>
