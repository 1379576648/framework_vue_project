<!--历史归档-->
<template>
  <!--  员工考勤历史归档页面-->
  <div class="saas-main-content"  v-if="archive==false">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <!-- 单个 -->
        <div class="main_div" v-for="value in tableData">
          <div class="interior_left_div">
            <!-- 归档名称 -->
            <span class="social_accumulation">{{ value.archiveName }}</span>
            <span style="font-size: 12px"> &nbsp;已归档</span>
            <br/>
            <el-button type="text" @click="exportChecking(name= value.archiveName)">导出考勤报表</el-button>
          </div>

          <div class="interior_right_div">

            <div style="display: inline-block; margin-left: 20px">
              <el-button type="text" @click="archive=true,archiveName=value.archiveName">详情></el-button>
            </div>
          </div>
          <br/>
          <!-- 分割线 -->
          <div class="cut_off"></div>
        </div>
        <div v-if="tableData==''" style="text-align: center;line-height: 30px">
          暂无归档数据
          <br/>
          <!-- 分割线 -->
          <div class="cut_off"></div>
        </div>

        <!-- 分页 -->
        <div class="demo-pagination-block">
          <el-pagination v-model:current-page="pageInfo.currenPage"
                         v-model:page-size="pageInfo.pagesize"
                         :default-page-size="pageInfo.pagesize"
                         :page-sizes="[1, 3, 5, 7]"
                         :pager-count="5"
                         :total="pageInfo.total"
                         background
                         layout="	total ,sizes, prev, pager, next, jumper"
                         next-text="下一页"
                         prev-text="上一页"
                         @size-change="selectArchiveAll()"
                         @current-change="selectArchiveAll()"
                         @prev-click="selectArchiveAll()"
                         @next-click="selectArchiveAll()">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
  <archive_detail v-if="archive"/>
</template>

<script>


import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import {export_json_to_excel} from "../../excal/Export2Excel";
import archive_detail from './clockingin_archive.vue';



export default {
  components: {
    archive_detail,
  },
  data() {
    return {
      //访问路径
      url: "http://localhost:80/",
      //详情页显示隐藏
      archive: false,
      // 归档名称
      archiveName:"",
      // 分页
      pageInfo: {
        /* 当前的页 */
        currenPage: 1,
        //页大小
        pagesize: 5,
        //总条数
        total: 0,
      },
      activeName: "first",
      value2: "",
      // 历史归档数据
      tableData: []

    };
  },
  methods: {
    // 查询所有历史归档
    selectArchiveAll() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectArchiveAll',
        data: {
          //当前页
          "currentPage": this.pageInfo.currenPage,
          //页大小
          "pageSize": this.pageInfo.pagesize,
        },
      }).then((response) => {
        console.log("查询所有历史归档")
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              this.pageInfo.total = response.data.data.info.total;
              this.tableData = response.data.data.info.records;
              window.setTimeout(this.selectStaffNameAll, 500);
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
    // 导出考勤报表明细
    exportChecking(name) {
      // 先根据归档表名称去查询数据
      this.axios({
        method: 'post',
        url: this.url + 'selectArchiveByName',
        data: {
          "archiveName": name
        },
      }).then((response) => {
        console.log("查询对应归档表数据")
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              this.monthData = response.data.data.info;
              this.export2Excel();
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
    // 导出方法
    export2Excel() {
      var that = this;
      let tHeader = ["归档名称", "员工名称", "部门名称", "正常次数", "迟到次数", "旷工次数", "早退次数", "是否全勤"]; // 导出的表头名
      let filterVal = ["archiveName", "staffName", "deptName", "normalFrequency", "lateFrequency", "absenteeismFrequency", "leaveEarlyFrequency", "present"];
      ElMessageBox.prompt('请输入文件名', '提示', {
        confirmButtonText: '生成',
        cancelButtonText: '取消',
      }).then(({value}) => {
        let data = that.formatJson(filterVal, that.monthData);
        export_json_to_excel(tHeader, data, value);
        ElMessage({
          type: 'success',
          message: `生成成功`,
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
  },
  created() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    // 查询所有历史归档
    this.selectArchiveAll();
  }
};
</script>

<style scoped>
/* 分割线 */
.cut_off {
  width: 100%;
  border-bottom: 1px solid #ededed;
}

/* 右div */
.interior_right_div {
  display: inline-block;
  float: right;
  margin-top: 10px;
}

/* 社保公积金 */
.social_accumulation {
  font-weight: bold;
  font-size: 16px;
}

/* 左div */
.interior_left_div {
  display: inline-block;
}

/* 大div */
.main_div {
  margin-bottom: 10px;
}

/* 分页的样式 */
.demo-pagination-block {
  margin: 10px 0 10px 10px;
}


/* 外层div 内边距 */
.j-card-body {
  padding: 20px 25px 20px 25px;
}

/* 外层阴影 */
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

.j-card-body {
  padding: 2% 2% 0 2%;
}

</style>
