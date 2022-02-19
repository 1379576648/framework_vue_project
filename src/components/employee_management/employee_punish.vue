<!--员工花名册奖惩记录-->
<template>
  <div>
    <!--搜索输入框-->
    <el-row style="width:150px;float:right;">
      <el-input v-model="seek" placeholder="奖罚名称" size="small" @input="selectPunishGlory">
        <template #suffix>
          <el-icon class="el-input__icon"><i-search/></el-icon>
        </template>
      </el-input>
    </el-row>
  </div>
  <br/>
  <br/>
  <div>
    <el-table :data="tableData" stripe style="width: 100%"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}">
      <el-table-column label="荣誉与奖励" >
        <el-table-column prop="gloryName" label="荣誉/奖项名称" width="130" />
        <el-table-column prop="createdTime" label="奖励日期" width="130" />
        <el-table-column prop="gloryUnitname" label="颁发单位名称" width="130" />
        <el-table-column prop="gloryRemark" label="备注" width="130" />
      </el-table-column>
      <el-table-column label="惩罚" >
        <el-table-column prop="punishType" label="惩罚类型" width="130" />
        <el-table-column prop="punishCause" label="惩罚原因" width="130" />
        <el-table-column prop="punishUnit" label="惩罚单位" width="130" />
        <el-table-column label="是否撤销" width="130">
          <template #default="scope">
            <span class="button-await" v-if="scope.row.isRevocation===0">否</span>
            <span class="button-pass" v-if="scope.row.isRevocation===1">是</span>
          </template>
        </el-table-column>
        <el-table-column prop="punishRemark" label="备注" width="130" />
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button type="text" size="small" @click="
			this.$parent.$parent.$parent.$data.one=scope.row.staffId,
			this.$parent.$parent.$parent.$data.two='second',
			this.$parent.$parent.$parent.$data.employee_compile=true">编辑 </el-button>
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
        @size-change="selectPunishGlory()"
        @current-change="selectPunishGlory()"
        background
    >
    </el-pagination>
  </div>
</template>

<script>
import {ElNotification} from "element-plus";

export default {
  data() {
    return {
      url: "http://localhost:80/",
      information:'/employee/message/employee_roster/staffedit',
      tableData: [],
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 4, // 页大小
        total: 0, // 总页数
      },
      seek:"",
    }
  },
  methods:{
    //查询奖励和惩罚
    selectPunishGlory() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectPunishGlory',
        data: {
          //当前页
          'currentPage': this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
           //奖励名称
          "gloryName": this.seek,
          //惩罚类型
          "punishType":this.seek,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        //如果服务关闭
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
          //如果服务没有关闭
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            _this.tableData = response.data.data.info.records
            _this.pageInfo.total = response.data.data.info.total
          }
          //如果服务是雪崩的
          else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        }
      })
    },
  },
  mounted() {
    //分页查询奖励和惩罚
    this.selectPunishGlory();
  }
}

</script>
<style scoped>
/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
  font-size: 12px
}

</style>