<!--班次管理页面-->
<template>
  <div class="w" v-if="clockingin_classes==false">
    <el-button color="#409eff" style="color:black;margin-left:20px;margin-top:20px;" @click="clockingin_classes=true">
      <el-icon>
        <i-plus/>
      </el-icon>
      <span>新增</span>
    </el-button>
    <el-button @click="selectClassesAll1()">重置</el-button>
    &nbsp;
    <el-input
        v-model="classesName"
        placeholder="根据方案名称"
        style="width: 150px"
    />
    &nbsp;
    <el-date-picker
        v-model="selectTime"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-value="[new Date, new Date]"
    >
    </el-date-picker>
    &nbsp;
    <el-button type="success" plain @click="selectClassesAll()">搜索</el-button>
    <!--  表格-->
    <div class="y">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="classesName" label="班次名称"/>
        <el-table-column prop="classesBeginDate" label="上班时间"/>
        <el-table-column prop="classesEndDate" label="下班时间"/>
        <el-table-column label="状态" width="100">
          <template #default="scope">
            <span class="button-await" v-if="scope.row.classesState===0">启用</span>
            <span class="button-reject" v-if="scope.row.classesState===1">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdTime" label="创建时间"/>
        <el-table-column prop="operate" label="操作">
          <template #default="scope">
            <el-button type="text" size="small" @click="this.$parent.$parent.$data.classesId=scope.row.classesId,
                                                        this.$parent.$parent.$data.judge=0,
                                                        clockingin_classes=true"
            >编辑</el-button>
            <span style="color:#e8e8e8">|</span>
            <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                :icon="InfoFilled"
                icon-color="red"
                title="确定禁用吗?"
                @confirm="updateClassesStateTwo()"
                v-if="scope.row.classesState===0"
            >
              <template #reference v-if="scope.row.classesState===0">
                <el-button type="text" size="small" @click="(classesId=scope.row.classesId)">禁用</el-button>
              </template>
            </el-popconfirm>
            <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                :icon="InfoFilled"
                icon-color="blue"
                title="确定启用吗?"
                @confirm="selectClassesAllTwo()"
                v-if="scope.row.classesState===1"
            >
              <template #reference v-if="scope.row.classesState===1">
                <el-button type="text" size="small" @click="(classesId=scope.row.classesId)">启用</el-button>
              </template>
            </el-popconfirm>
            <span style="color:#e8e8e8">|</span>
            <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                :icon="InfoFilled"
                icon-color="red"
                title="确定删除吗?"
                @confirm=inquireStateOne(classesId)
            >
              <template #reference>
                <el-button type="text" size="small" style="color:darkorange"
                           @click="(classesId=scope.row.classesId)"
                >删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--  分页-->
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="pageInfo.currenPage"
          :page-sizes="[1,3,5,7]"
          v-model:page-size="pageInfo.pagesize"
          :default-page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          :pager-count="5"
          background
          next-text="下一页"
          prev-text="上一页"
          @size-change="selectClassesAll()"
          @current-change="selectClassesAll()"
          @prev-click="selectClassesAll()"
          @next-click="selectClassesAll()">
        >
      </el-pagination>
    </div>
  </div>
  <!--  添加班次-->
  <clockingin_classes v-if="clockingin_classes"/>
</template>

<script>
//添加班次
import clockingin_classes from '../clockingin_management/clockingin_classes.vue';
import {ElMessage, ElNotification} from "element-plus";


export default {
  components: {
    //添加班次
    clockingin_classes,
  },
  data() {
    return {
      //添加班次
      clockingin_classes: false,
      //访问路径
      url: "http://localhost:80/",
      // 当前登录者
      NowStaffName: this.$store.state.staffMessage.staffName,
      // 班次方案名称
      classesName: "",
      // 分页参数
      pageInfo: {
        currentPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },
      // 选择开始日期/结束日期
      selectTime: [],
      // 表格数据
      tableData: [],
      // 判断状态
      op: 0,
    }
  },
  methods: {
    // 点击编辑跳转
    redact() {
      this.$router.push({
        path: this.one,
        query: {path: this.$route.query.path}
      })
    },
    // 点击禁用确认按钮触发
    through1() {
      alert(1)
    },
    // 点击删除确认按钮触发
    through2() {
      alert(1)
    },
    // 查询所有班次方案
    selectClassesAll() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'selectClassesAll',
        data: {
          // 当前页
          "currentPage": this.pageInfo.currentPage,
          // 页大小
          "pagesize": this.pageInfo.pagesize,
          // 起始时间
          "startTime": this.selectTime == null ? null : this.selectTime[0],
          // 结束时间
          "endTime": this.selectTime == null ? null : this.selectTime[1],
          // 班次方案名称
          classesName: this.classesName,
        }
      }).then((response) => {
        console.log("查询所有班次方案");
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            this.tableData = response.data.data.info.records;
          } else {
            ElNotification.warning({
              title: '提示',
              message: "查询部门职位有误，请联系管理员",
              offset: 100,
            })
          }
        } else {
          ElNotification.warning({
            title: '提示',
            message: "服务发生雪崩",
            offset: 100,
          })
        }
      })
    },
    // 查询所有班次方案(不带参数)
    selectClassesAll1() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'selectClassesAll',
        data: {
          // 当前页
          "currentPage": this.pageInfo.currentPage,
          // 页大小
          "pagesize": this.pageInfo.pagesize,
        }
      }).then((response) => {
        console.log("查询所有班次方案");
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            this.tableData = response.data.data.info.records;
          } else {
            ElNotification.warning({
              title: '提示',
              message: "查询部门职位有误，请联系管理员",
              offset: 100,
            })
          }
        } else {
          ElNotification.warning({
            title: '提示',
            message: "服务发生雪崩",
            offset: 100,
          })
        }
      })
    },
    // 查询班次方案状态（删除时）
    inquireStateOne() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'inquireClasses',
        data: {
          "classesId": this.classesId,
        }
      }).then((response) => {
        console.log("查询班次方案状态");
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            // 等于1则为禁用，则可以删除
            if (response.data.data.info[0].classesState == 1) {
              window.setTimeout(this.deleteClasses, 500);
            } else {
              ElNotification.warning({
                title: '提示',
                message: "当前方案正在启用，无法进行删除操作",
                offset: 100,
              })
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "查询方案状态有误，请联系管理员",
              offset: 100,
            })
          }
        } else {
          ElNotification.warning({
            title: '提示',
            message: "服务发生雪崩",
            offset: 100,
          })
        }
      })
    },
    // 查询所有班次方案（点击启用查询）
    selectClassesAllTwo() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'selectClasses',
        data: {}
      }).then((response) => {
        console.log("查询所有班次方案");
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            this.op = 0;
            for (let i = 0; i < response.data.data.info.length; i++) {
              // 循环如果状态有为0的则为目前有启用的方案
              if (response.data.data.info[i].classesState === 1 && response.data.data.info[i].classesState !== 0) {
              } else if (response.data.data.info[i].classesState === 0) {
                this.op = 1;
              } else {
                ElNotification.warning({
                  title: '提示',
                  message: "班次方案状态数据有误！请联系管理员",
                  offset: 100,
                })
              }
            }
            window.setTimeout(this.updateClassesState, 500);
          } else {
            ElNotification.warning({
              title: '提示',
              message: "查询方案状态有误，请联系管理员",
              offset: 100,
            })
          }
        } else {
          ElNotification.warning({
            title: '提示',
            message: "服务发生雪崩",
            offset: 100,
          })
        }
      })
    },
    // 修改班次方案状态(启用)
    updateClassesState() {
      if (this.op == 1) {
        ElNotification.warning({
          title: '提示',
          message: "查询到班次方案中有正在启用的方案！",
          offset: 100,
        })
      } else if (this.op == 0) {
        var _this = this;
        this.axios({
          method: 'post',
          url: this.url + 'updateClassesState',
          data: {
            "classesId": this.classesId,
          }
        }).then((response) => {
          console.log("修改班次方案状态(启用)");
          console.log(response);
          if (response.data.data.data) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
          } else if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              if (response.data.data.info == 1) {
                ElMessage({
                  showClose: true,
                  message: '启用成功',
                  type: 'success',
                })
                this.selectClassesAll();
              }
            } else {
              ElNotification.warning({
                title: '提示',
                message: "修改班次方案状态有误，请联系管理员",
                offset: 100,
              })
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        })
      }
    },
    // 修改班次方案状态（禁用）
    updateClassesStateTwo() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'updateClassesStateTwo',
        data: {
          "classesId": this.classesId,
        }
      }).then((response) => {
        console.log("修改班次方案状态(禁用)");
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            if (response.data.data.info == 1) {
              ElMessage({
                showClose: true,
                message: '禁用成功',
                type: 'success',
              })
              this.selectClassesAll();
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "修改班次方案状态有误，请联系管理员",
              offset: 100,
            })
          }
        } else {
          ElNotification.warning({
            title: '提示',
            message: "服务发生雪崩",
            offset: 100,
          })
        }
      })
    },
    // 删除班次方案
    deleteClasses() {
      var _this = this;
      this.axios({
        method: 'post',
        url: this.url + 'deleteClasses',
        data: {
          "classesId": this.classesId,
        }
      }).then((response) => {
        console.log("删除班次方案");
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            if (response.data.data.info == 1) {
              ElMessage({
                showClose: true,
                message: '删除成功',
                type: 'success',
              })
              this.selectClassesAll();
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "删除班次方案有误，请联系管理员",
              offset: 100,
            })
          }
        } else {
          ElNotification.warning({
            title: '提示',
            message: "服务发生雪崩",
            offset: 100,
          })
        }
      })
    }
  },
  created() {
    // 查询所有班次方案
    this.selectClassesAll();
  }
}
</script>

<style scoped>
/*居中*/
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

.demo-pagination-block {
  margin-left: 850px;
  margin-top: 20px;
  margin-bottom: 30px;
}

/* 调整输入框的高度 */
::v-deep .el-input__inner {
  height: 32px;
}

.button-await {
  background: #ecf5ff;
  border: 1px #cfe6ff solid;
  color: #5aaaff;
  display: inline-block;
  line-height: 1;
  min-height: 20px;
  white-space: nowrap;
  text-align: center;
  margin: 0;
  padding: 10px 15px;
  border-radius: var(--el-border-radius-base);
}

.button-reject {
  /*背景*/
  background: #fef0f0;
  /*边框*/
  border: 1px #f2c5c5 solid;
  /*字的颜色*/
  color: #f57a7a;
  display: inline-block;
  line-height: 1;
  min-height: 20px;
  white-space: nowrap;
  text-align: center;
  margin: 0;
  padding: 10px 15px;
  border-radius: var(--el-border-radius-base);
}
</style>