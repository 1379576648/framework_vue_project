<!--补打卡记录-->
<template>
  <!-- 补打卡页面-->
  <div class="w">
    <div class="head">
      <el-button size="medium" @click="derive()">
        <el-icon style="font-size: 18px">
          <i-upload/>
        </el-icon>
        导出
      </el-button>
      <!--选择开始日期和结束日期-->
      <el-date-picker
          v-model="selectTime"
          type="daterange"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="shortcuts"
          style="margin-left: 10px"
      >
      </el-date-picker>
      &nbsp;
      <el-button type="success" plain @click="selectReissueCardRecordAll()">搜索</el-button>

    </div>
    <div class="y">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="staffName" label="申请名称"/>
        <el-table-column prop="cardType" label="补打卡类型"/>
        <el-table-column prop="cardDate" label="补打卡时间"/>
        <el-table-column prop="cardRemarks" label="备注"/>
        <el-table-column prop="operate" label="操作">
          <template #default="scope">
            <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                :icon="InfoFilled"
                icon-color="red"
                title="确定删除吗?"
                @confirm=deleteCard(cardId)
            >
              <template #reference>
                <el-button type="text" size="small" style="color:darkorange"
                           @click="(cardId=scope.row.cardId)"
                >删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="pageInfo.currenPage"
          :page-sizes="[3, 5, 10, 50]"
          v-model:page-size="pageInfo.pagesize"
          :default-page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          :pager-count="5"
          background
          @size-change="sele"
          @current-change="sele"
      >
      </el-pagination>
    </div>
{{tableData}}
  </div>
</template>

<script>
import {ref, defineComponent} from "vue";
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import {export_json_to_excel} from "../../excal/Export2Excel";
export default {
  data() {
    return {
      //访问路径
      url: "http://localhost:80/",
      // 当前登录者
      NowStaffName: this.$store.state.staffMessage.staffName,
      pageInfo: {
        currentPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },
      shortcuts: [
        {
          text: "最近一周",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          },
        },
        {
          text: "最近一个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          },
        },
        {
          text: "最近三个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          },
        },
      ],
      // 选择开始日期/结束日期
      selectTime: [],
      tableData: [],
      value: ref(""), //选择
    };
  },
  methods: {
    // 点击导出操作
    derive() {
      ElMessageBox.confirm(
          '此操作将导出excel文件, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        this.deriveExcel();
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
    },
    // 导出方法
    deriveExcel() {
      let _this= this;
      let tHeader = ["申请人", "补打卡类型", "补打卡时间", "备注"]; // 导出的表头名
      let filterVal = ["staffName", "cardType", "cardDate", "cardRemarks"];//导出其prop属性
      ElMessageBox.prompt('请输入文件名', '提示', {
        confirmButtonText: '生成',
        cancelButtonText: '取消',
      }).then(({value}) => {
        let data = _this.formatJson(filterVal, _this.tableData);
        export_json_to_excel(tHeader, data, value);
        ElMessage({
          type: 'success',
          message: '生成成功',
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
    // 根据员工名称查询补打卡
    selectReissueCardRecordAll() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'selectReissueCardRecordAll',
        data: {
          // 当前登陆者
          "staffName": this.NowStaffName,
          // 当前页
          "currentPage": this.pageInfo.currentPage,
          // 页大小
          "pagesize": this.pageInfo.pagesize,
          // 起始时间
          "startTime": this.selectTime == null ? null : this.selectTime[0],
          // 结束时间
          "endTime": this.selectTime == null ? null : this.selectTime[1],
        }
      }).then((response) => {
        console.log("查询补打卡记录");
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              this.tableData = response.data.data.info.records;
              this.pageInfo.total = response.data.data.info.total;
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
    // 删除补打卡记录
    deleteCard() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'deleteCard',
        data: {
          "cardId": this.cardId,
        }
      }).then((response) => {
        console.log("删除补打卡记录");
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              if (response.data.data.info === 1) {
                ElMessage({
                  showClose: true,
                  message: '删除成功',
                  type: 'success',
                })
                this.$store.commit("updateToken", response.data.data.token);
                this.selectReissueCardRecordAll();
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
    },
  },
  created() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    // 根据员工名称查询补打卡
    this.selectReissueCardRecordAll();
  },
};
</script>

<style>

table * {
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

.y {
  margin-top: 20px;
}

.head {
  margin-left: 2%;
  margin-top: 2%;
}

.demo-pagination-block {
  margin-top: 20px;
  margin-bottom: 30px;
}

</style>

