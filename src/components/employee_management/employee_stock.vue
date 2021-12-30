<!--待入职员工页面-->
<template>
  <div class="saas-main-content">

    <!--搜索输入框-->
    <el-row style="width:150px;float:right;">
      <el-input v-model="seek" placeholder="搜索" size="small" @click="selectpage">
        <template #suffix>

          <el-icon class="el-input__icon">
            <i-search/>
          </el-icon>
        </template>
      </el-input>
    </el-row>

    <br/>
    <br/>
    <br/>
    <el-table :data="tableData" stripe style="width: 100%;cursor: pointer"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}">
      <el-table-column prop="resumeName" label="姓名" width="180"/>
      <el-table-column prop="deptName" label="部门" width="180"/>
      <el-table-column prop="postName" label="职位" width="180"/>
      <el-table-column prop="resumePhone" label="手机" width="180"/>
      <el-table-column prop="resumeMailbox" label="邮箱" width="180"/>
      <el-table-column prop="hiredate" label="入职日期" width="180"/>
      <!--      <el-table-column prop="resumeBirthday" label="出生日期" width="130" />-->
      <!--      <el-table-column prop="resumeResidence" label="户口所在地" width="130" />-->
      <!--      <el-table-column prop="resumePoliticalOutlook" label="政治面貌" width="130" />-->
      <el-table-column label="操作">
        <template #default>
          <el-button type="text" size="small">入职</el-button>

          <el-button @click="become=true" type="text" size="small">放弃</el-button>

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
          @size-change="selectpage()"
          @current-change="selectpage()"
          background
      >
      </el-pagination>
    </div>
    <!--  弹框  -->
    <div style="text-align: center;">
      <el-dialog
          v-model="become"
          width="30%"
          :close-on-click-modal="false">
        放弃原因：
        <el-input v-model="cause" type="textarea" style="width:240px;"></el-input>
        <div style="margin-top:30px;margin-left: 30px;">
          <el-button @click="become=false">取消</el-button>
          <el-button type="primary" @click="become=false">确定</el-button>
        </div>

      </el-dialog>
    </div>

  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {ElNotification} from "element-plus";

export default defineComponent({
  data() {
    return {
      url: "http://localhost:80/",
      seek: '',
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 4, // 页大小
        total: 0, // 总页数
      },
      tableData: [],
      cause: '',

    }
  }, setup() {
    const become = ref(false)
    return {
      become,
    }
  },
  methods: {
    //查询已录用待入职的员工
    selectpage() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectpage',
        data: {
          //当前页
          'currentPage': this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          //员工名称
          "resumeName": this.resumeName,
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
    //查询已录用待入职的员工
    this.selectpage();
  }
})
</script>

<style scoped>

/deep/ .mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}

/deep/ .cell {
  padding-left: 10px;
  text-align: center;
  color: black;
  font-size: 12px
}

/* 分页的样式 */
/deep/ .demo-pagination-block {
  float: right;
  margin: 20px;
}

</style>
