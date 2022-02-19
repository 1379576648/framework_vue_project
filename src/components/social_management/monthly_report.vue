<template>
  <!--  月度报表 -->
  <div class="saas-main-content" v-if="archive==false">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <!-- 单个 -->
        <div class="main_div" v-for="value in tableData">
          <div class="interior_left_div">
            <span class="social_accumulation">
             {{ value.insArchiveName }}</span>
            <span style="font-size: 12px"> &nbsp;已归档</span>
            <br/>
            <el-button type="text" @click="archivedInMonth(value.insArchiveName)">导出参保明细</el-button>
          </div>

          <div class="interior_right_div">
            <div style="display: inline-block">
              <span style="margin: 35px">参保人数</span><br/>
              <span style="margin: 35px">{{ value.quantity }}</span>
            </div>

            <div style="display: inline-block">
              <span style="margin: 35px">个人缴费</span><br/>
              <span style="margin: 35px">{{ value.insArchiveSocialPersonPay }}</span>
            </div>

            <div style="display: inline-block">
              <span style="margin: 35px">企业缴费</span><br/>
              <span style="margin: 35px">{{ value.insArchiveSocialFirmPay }}</span>
            </div>

            <div style="display: inline-block; margin-left: 20px">
              <el-button type="text" @click="archive=true,month=value.insArchiveName">详情></el-button>
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
    </div>
  </div>
  &nbsp;<archive_detail v-if="archive"/>
</template>

<script>
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import {export_json_to_excel} from "../../excal/Export2Excel";
import archive_detail from './archive_detail.vue';

export default {
  components: {
    archive_detail,
  },
  data() {
    return {
      //访问地址
      url: 'http://localhost:80/detail/',
      //详情页显示隐藏
      archive: false,
      //需要查看的日期
      month: '',
      // 分页
      pageInfo: {
        /* 当前的页 */
        currenPage: 1,
        //页大小
        pageSize: 5,
        //总条数
        total: 0,
      },
      //所有的归档分页数据
      tableData: [],
      //某一个月的归档明细
      monthData: [],
      multipleSelection: [],
    };
  }, methods: {
    //分页查询所有的归档数据
    next() {
      this.axios({
        method: 'post',
        url: this.url + 'archived',
        data: {
          //当前页
          currenPage: this.pageInfo.currenPage,
          //页大小
          pageSize: this.pageInfo.pageSize
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          if (response.data.data) {
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
    //查询某一个月份的归档明细
    archivedInMonth(name) {
      this.axios({
        method: 'get',
        url: this.url + 'archivedInMonth/' + name,
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
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
    //删除某一个月的归档数据
    deleteArchived(name) {
      this.axios({
        method: 'delete',
        url: this.url + 'deleteArchived',
        data: {
          name: name
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {

        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              //如果是成功
              if (response.data.data.info == "成功") {
                this.next();
                ElMessage({
                  type: 'success',
                  message: '删除成功',
                })
                this.$store.commit("updateToken", response.data.data.token);
              } else {
                ElMessage({
                  type: 'warning',
                  message: response.data.data.info,
                })
              }
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
    },  // 导出方法
    export2Excel() {
      var that = this;
      let tHeader = ["姓名", "参保方案", "社保缴纳月份", "社保个人缴费", "社保企业缴费", "积金缴纳月份", "积金个人缴费", "积金企业缴费", "缴纳时间"]; // 导出的表头名
      let filterVal = ["insArchiveStaffName", "insArchiveInsuredName", "insArchiveInsuredMonth", "insArchiveSocialPersonPay", "insArchiveSocialFirmPay", "insArchiveInsuredMonth", "insArchiveFundPersonPay", "insArchiveFundFirmPay", "createdTime"];
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
  }
  , mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    this.next();
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
