<!--加班方案 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <span></span>
        <div style="margin-top: 20px">
          <button type="button" class="ant-btn ant-btn-primary"
                  @click="
                  this.$parent.$data.salary_insertplan=true,
                  this.$parent.$data.salary_checkwage=false,
                  this.$parent.$data.regular=false,
                  this.$parent.$data.callbackpay=false,
                  this.$parent.$data.attendanceplan=false,
                  this.$parent.$data.evectionplan=false,
                  this.$parent.$data.salary_insertplanthree=false,
                  this.$parent.$data.salary_insertplantwo=false,
                  this.$parent.$data.insertplan_name='新增'">
            <i aria-label="图标: plus" class="anticon anticon-plus">
              <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="plus" width="1em" height="1em"
                   fill="currentColor" aria-hidden="true">
                <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
              </svg>
            </i>
            <span>新增</span>
          </button>
        </div>
        <div style="margin-top:-32px;">
          <!--搜索输入框-->
          <el-row style="width:140px;float:right;">
            <el-input v-model="seek" placeholder="方案名称" @input="selectWorkScheme">
              <template #suffix>
                <el-icon class="el-input__icon">
                  <i-search/>
                </el-icon>
              </template>
            </el-input>
          </el-row>
        </div>
        <!-- 表格内容部分 -->
        <div class="sub-Content__primary" style="margin-top: 50px">

          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="workSchemeName" label="方案名称" width="220"/>
<!--            <el-table-column prop="工作日加班工资：小时X" label="核算规则" width="220"/>-->
            <el-table-column label="核算方案" width="220">
              <template #default="scope">
                <span>工作日加班工资：小时工资x{{this.tableData[0].workSchemeWorkratio}}%</span><br/>
                <span>休息日加班工资：小时工资x{{this.tableData[0].workSchemeDayoffratio}}%</span><br/>
                <span>节假日加班工资：小时工资x{{this.tableData[0].workSchemeHolidayratio}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="deptName" label="适用对象" width="230"/>
            <el-table-column prop="workschemeRemark" label="备注" width="220"/>
<!--            <el-table-column prop="workSchemeState" label="状态" width="210"/>-->
            <el-table-column label="状态" width="210">
              <template #default="scope">
                <span class="button-await" v-if="scope.row.workSchemeState===0"><span style="color: #5aaaff">启用</span></span>
                <span class="button-pass" v-if="scope.row.workSchemeState===1"><span style="color: #5aaaff">禁用</span></span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="230">
              <template #default="scope">
                <el-button type="text" size="small" @click="
                  this.$parent.$data.workplan=scope.row.workSchemeId,
                  this.$parent.$data.salary_insertplan=true,
                  this.$parent.$data.salary_checkwage=false,
                  this.$parent.$data.regular=false,
                  this.$parent.$data.callbackpay=false,
                  this.$parent.$data.attendanceplan=false,
                  this.$parent.$data.evectionplan=false,
                  this.$parent.$data.salary_insertplanthree=false,
                   this.$parent.$data.salary_insertplantwo=false,
                  this.$parent.$data.insertplan_name='编辑'"

                >编辑
                </el-button
                >
<!--                <el-button type="text" size="small" @click="updateWorkSchemeState(workSchemeId=scope.row.workSchemeId)">禁用</el-button>-->
                <el-popconfirm
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    :icon="InfoFilled"
                    icon-color="red"
                    title="确定禁用吗?"
                    @confirm="updateWorkSchemeState(workSchemeId=scope.row.workSchemeId)"
                    v-if="scope.row.workSchemeState===0"
                >
                  <template #reference v-if="scope.row.workSchemeState===0">
                    <el-button type="text" size="small" @click="(workSchemeId=scope.row.workSchemeId)">禁用</el-button>
                  </template>
                </el-popconfirm>
                <el-popconfirm
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    :icon="InfoFilled"
                    icon-color="blue"
                    title="确定启用吗?"
                    @confirm="updateWorkSchemeStateTwo(workSchemeId=scope.row.workSchemeId)"
                    v-if="scope.row.workSchemeState===1"
                >
                  <template #reference v-if="scope.row.workSchemeState===1">
                    <el-button type="text" size="small" @click="(workSchemeId=scope.row.workSchemeId)">启用</el-button>
                  </template>
                </el-popconfirm>
                <!--              <el-button type="text" size="small">删除 </el-button>-->
                <el-popconfirm @confirm="deleteWorkScheme(workSchemeId=scope.row.workSchemeId)"
                               title="确认要删除此方案吗?">
                  <template #reference>
                    <el-button type="text" size="small" style="color: orange">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

        </div>

        <!-- 分页插件 -->
        <div class="demo-pagination-block" style="margin-left: 25px;margin-top: 20px;margin-bottom: 10px">
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
              @size-change="selectWorkScheme()"
              @current-change="selectWorkScheme()"
              background
          >
          </el-pagination>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";

export default {
  methods: {
    // 删除加班方案
    deleteWorkScheme(id) {
        var _this = this
        this.axios({
          method: 'delete',
          url: this.url + 'deleteWorkScheme',
          data:[id],
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
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
              //如果是成功
              if (response.data.data.info == "成功") {
                ElMessage({
                  type: 'success',
                  message: '删除成功',
                })
                this.selectWorkScheme();
              } else {
                ElMessage({
                  type: 'warning',
                  message: response.data.data.info,
                })
              }
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
      })
    },
    //分页查询加班方案
    selectWorkScheme() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectWorkScheme',
        data: {
          //当前页
          'currentPage': this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          //部门名称
          //"deptName":this.$parent.$data.two,
          //方案名称
          "workSchemeName":this.seek,
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
    //修改状态为禁用
    updateWorkSchemeState(workSchemeId) {
      var _this = this
      this.axios({
        method: 'put',
        url: this.url + 'updateWorkSchemeState',
        data: {
          workSchemeId: this.workSchemeId,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("修改状态")
        console.log(response)
        if (response.data.code === 200 && response.data.data === 666) {
          ElMessage({
            showClose: true,
            message: '操作成功',
            type: 'success',
          })
          this.selectWorkScheme();
        } else if (response.data.data === 100) {
          ElMessage({
            showClose: true,
            message: '操作失败1',
            type: 'error',
          })
        } else {
          ElMessage({
            showClose: true,
            message: '操作失败2',
            type: 'error',
          })
        }
      }).catch(function (error) {
        console.log("失败")
        console.log(error);
      });
    },
    //修改状态为启用
    updateWorkSchemeStateTwo(workSchemeId) {
      var _this = this
      this.axios({
        method: 'put',
        url: this.url + 'updateWorkSchemeStateTwo',
        data: {
          workSchemeId: this.workSchemeId,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("修改状态")
        console.log(response)
        if (response.data.code === 200 && response.data.data === 666) {
          ElMessage({
            showClose: true,
            message: '操作成功',
            type: 'success',
          })
          this.selectWorkScheme();
        } else if (response.data.data === 100) {
          ElMessage({
            showClose: true,
            message: '操作失败1',
            type: 'error',
          })
        } else {
          ElMessage({
            showClose: true,
            message: '操作失败2',
            type: 'error',
          })
        }
      }).catch(function (error) {
        console.log("失败")
        console.log(error);
      });
    },
  },
  created() {
    //分页查询加班方案
    this.selectWorkScheme();
  },
  data() {
    return {
      //请求的路径
      url: "http://localhost:80/",
      //新增编辑加班方案
      insertcallbackpay: '/salary/insertcallbackpay',
      workplan:'',
      seek: "",
      tableData: [],
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },

    }
  }
}
</script>


<style scoped>
@import url("../../css/navigation.css");

/deep/ .ant-btn-primary {
  color: #fff;
  background-color: #085fc3;
  border-color: #085fc3;
  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
  margin-left: 20px;
}

/deep/ .cell {
  padding-left: 10px;
  text-align: center;
  color: black;
}

/deep/ .cell {
  padding-left: 10px;
  text-align: center;
  color: black;
  font-size: 12px;
}
</style>