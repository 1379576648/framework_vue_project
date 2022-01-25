<template>

  <!-- 参保记录 -->
  <div>
    <!-- 表格按钮部分 -->
    <div class="mt-20 ml-20 mr-20">
      <el-date-picker
          v-model="clearTime"
          type="monthrange"
          unlink-panels
          range-separator="-"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          style="margin-left: 985px;margin-top: 10px"
          :shortcuts="shortcuts"
          @change="next"
      ></el-date-picker>
    </div>

    <!-- 表格内容部分 -->
    <div class="sub-Content__primary">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="insArchiveSalaryMonth" label="计薪月份" align="center"/>
        <el-table-column prop="insArchiveInsuredName" label="参保方案" align="center"/>
        <el-table-column prop="insArchiveInsuredMonth" label="社保缴纳月份" align="center"/>
        <el-table-column prop="insArchiveSocialNumber" label="社保基数" align="center"/>
        <el-table-column prop="insArchiveInsuredMonth" label="公积金缴纳月份" align="center"/>
        <el-table-column prop="insArchiveFundNumber" label="公积金基数" align="center"/>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button type="text" size="small" @click="
              this.$parent.$parent.$parent.$parent.$data.insArchive=scope.row,
              this.$parent.$parent.$parent.$data.value='1',
              this.$parent.$parent.$parent.$data.key=this.$parent.$parent.$parent.$data.key+1,
              this.$parent.$parent.$parent.$parent.$data.judge=2">查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页插件 -->
    <div class="demo-pagination-block">
      <el-pagination v-model:current-page="pageInfo.currenPage"
                     v-model:page-size="pageInfo.pageSize"
                     :default-page-size="pageInfo.pageSize"
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
import {ref, defineComponent} from "vue";
import {ElNotification} from "element-plus";

export default {
  data() {
    return {
      //访问地址
      url: 'http://localhost:80/archive/',
      //日期选择器
      clearTime: [],
      //日期选择
      shortcuts: [{
        text: '当前月',
        value: [new Date(), new Date()],
      },
        {
          text: '当前年',
          value: () => {
            const end = new Date()
            const start = new Date(new Date().getFullYear(), 0)
            return [start, end]
          },
        },
        {
          text: '前六个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 6)
            return [start, end]
          }
        }],
      // 分页
      pageInfo: {
        /* 当前的页 */
        currenPage: 1,
        //页大小
        pageSize: 5,
        //总条数
        total: 0,
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
          tag: "Home",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
          tag: "Office",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
          tag: "Home",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
          tag: "Office",
        },
      ],
    };
  }, methods: {
    //查询当月所有已参保的员工
    next() {
      this.axios({
        method: 'post',
        url: this.url + 'pageSelectInsuredArchive',
        data: {
          //当前页
          currenPage: this.pageInfo.currenPage,
          //页大小
          pageSize: this.pageInfo.pageSize,
          //员工名称
          insArchiveStaffName: this.$parent.$parent.$parent.$parent.$data.detail.insDetailStaffName,
          //起始时间
          startTime: this.clearTime == null ? null : this.clearTime[0],
          //结束时间
          endTime: this.clearTime == null ? null : this.clearTime[1]
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          //如果服务关闭
          if (response.data.data.data) {
            ElNotification.error({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              this.tableData = response.data.data.info.records;
              this.pageInfo.total = response.data.data.info.total;
              this.$store.commit("updateToken", response.data.data.token);
            }
            //如果服务是雪崩的
            else {
              ElNotification.error({
                title: '提示',
                message: "服务发生雪崩",
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
    }
  }
  , mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    this.next();
  }
};
</script>

<style scoped>
/* 分页的样式 */
.demo-pagination-block {
  margin: 10px 0 10px 10px;
}

</style>

