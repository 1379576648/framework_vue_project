<!-- 登录日志页面 -->
<template>
  <div class="saas-main-content" style="margin-bottom: 20px">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <div class="mt-20 ml-20 mr-20">
          <!-- 搜索登录数据部分 -->
          <el-form :inline="true">
            <!-- 登录地址搜索 -->
            <el-form-item class="form-dizhi" label="登录地址">
              <el-input size="small" v-model="registerLogIpname" clearable placeholder="请输入登录地址"></el-input>
            </el-form-item>

            <!-- 用户名称搜索 -->
            <el-form-item class="form-name" label="用户名称">
              <el-input size="small" v-model="registerLogPeople" clearable placeholder="请输入用户名称"></el-input>
            </el-form-item>

            <!-- 登录状态搜索 -->
            <el-form-item class="form-state" label="状态">
              <el-select style="width: 190px" size="small" v-model="registerLogState" clearable placeholder="请选择登录状态">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <!-- 登录时间搜索 -->
            <el-form-item class="form-time" label="登录时间">
              <el-date-picker
                  v-model="selectTime"
                  type="datetimerange"
                  :shortcuts="shortcuts"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>

          <!-- 对数据的增删改按钮 -->
          <div class="button" style="margin-top: -30px">
            <el-button size="mini" style="width: 90px;height: 33px" type="danger" plain v-bind:disabled="disabled"
                       @click="remove">删除
            </el-button>
            <el-button class="button-empty" size="mini" @click="clearTime=[],dialogVisible=true"
                       style="margin-right: 878px"
                       v-bind:disabled="tableData==''">清除
            </el-button>
            <el-button size="mini" class="search-ss" type="primary" @click="next">
              <i class="iconfont">
                &#xe61b
              </i>
              搜索
            </el-button>
            <el-button size="mini" class="search-cz" type="primary" @click="reset()">
              <i class="iconfont">
                &#xe6b8
              </i>
              重置
            </el-button>
          </div>
        </div>
        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
<!--            :header-cell-style="{textAlign: 'center',background:'rgba(213,213,218,0.63)',color:'#6C6C6C'}"-->
          <el-table :data="tableData" style="width: 100% ;"
                    stripe
                    @selection-change="checkDelete"
          >
            <!-- 全选操作按钮 -->
            <el-table-column fixed  align="center" type="selection" min-width="50"/>
            <el-table-column  fixed :index="indexMethod" align="center" label="序号" type="index" min-width="60"/>
            <el-table-column  prop="registerLogPeople" align="center" sortable label="用户名称" min-width="132"/>
            <el-table-column prop="registerLogPhone" align="center" sortable label="手机号码" min-width="135"/>
            <el-table-column prop="registerLogIp" align="center" sortable label="IP地址" min-width="135"/>
            <el-table-column prop="registerLogIpname" align="center" sortable label="IP所在地" min-width="150"/>
            <el-table-column prop="registerLogType" align="center" sortable label="设备类型" min-width="100"/>
            <el-table-column align="center" sortable label="登录状态" min-width="120">
              <template #default="scope">
                <span class="button-enable" v-if="scope.row.registerLogState==0">成功</span>
                <span class="button-forbidden" v-if="scope.row.registerLogState==1">失败</span>
              </template>
            </el-table-column>
            <el-table-column prop="registerLogBrowser" align="center" sortable label="浏览器" min-width="110"/>
            <el-table-column prop="registerLogGenre" align="center" sortable label="登录类型" min-width="110">
              <template #default="scope">
                <span v-if="scope.row.registerLogGenre==0">人脸</span>
                <span v-if="scope.row.registerLogGenre==1">密码</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right"  prop="createdTime" align="center" sortable label="创建时间" min-width="170"/>
          </el-table>
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
  <el-dialog
      v-model="dialogVisible"
      title="请选择需要清除的时间段"
      width="29%"
      :before-close="call"
  >
    <el-date-picker
        v-model="clearTime"
        type="datetimerange"
        :shortcuts="shortcuts"
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
    >
    </el-date-picker>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="mini" @click="call" style="height: 33px">取消</el-button>
        <el-button size="mini" type="primary" @click="empty"
        >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";

export default {
  data() {
    return {
      //清空弹出框
      dialogVisible: false,
      //清除时间段
      clearTime: [],
      //访问路径
      url: "http://localhost:80/registerLog/",
      //ip所在地
      registerLogIpname: '',
      //用户名称
      registerLogPeople: '',
      //状态
      registerLogState: '',
      // 分页
      pageInfo: {
        /* 当前的页 */
        currenPage: 1,
        //页大小
        pageSize: 5,
        //总条数
        total: 0,
      },
      //选择状态
      options: [
        {
          value: 0,
          label: '成功',
        },
        {
          value: 1,
          label: '失败',
        },
      ],
      //选择时间
      selectTime: [],
      //表格数据
      tableData: [],
      //复选框选择的结果
      checkDeleteList: [],
      //删除按钮是否可用
      disabled: true,
      //存放复选的id列表
      listId: [],
      //日期选择组件
      shortcuts: [
        {
          text: '过去一周',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          },
        },
        {
          text: '过去一个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          },
        },
        {
          text: '过去三个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          },
        },
      ],
    }
  },
  methods: {
    //重置操作
    reset() {
      //ip所在地
      this.registerLogIpname = '';
      //用户名称
      this.registerLogPeople = '';
      //状态
      this.registerLogState = '';
      //选择时间
      this.selectTime = [];
      //刷新表格
      this.next();
    },
    //复选框选择事件
    checkDelete(val) {
      this.checkDeleteList = val;
      //如果有被选择的值则删除按钮可用
      if (this.checkDeleteList != '') {
        this.disabled = false;
      }
      //如果没有被选择的值删除按钮不可用
      if (this.checkDeleteList == '') {
        this.disabled = true;
      }
    },
    //清除取消按钮
    call() {
      this.dialogVisible = false
      ElMessage({
        type: 'info',
        message: '取消成功',
      })
    },
    //清空提示框
    empty() {
      if (this.clearTime == null || this.clearTime == '') {
        ElMessage({
          type: 'warning',
          message: '请选择具体时间段',
        })
      } else {
        this.axios({
          method: 'delete',
          url: this.url + 'emptyRegisterLogList',
          data: {
            //起始时间
            "startTime": this.clearTime == null ? null : this.clearTime[0],
            //结束时间
            "endTime": this.clearTime == null ? null : this.clearTime[1]
          },
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          if (response.data.code == 200) {
           if (response.data.data) {
              //如果服务是正常的
              if (response.data.data.state == 200) {
                //如果返回成功
                if (response.data.data.info == "成功") {
                  this.next();
                  this.dialogVisible = false;
                  ElMessage({
                    type: 'success',
                    message: '清除成功',
                  })
                  this.$store.commit("updateToken", response.data.data.token);
                } else {
                  ElMessage({
                    type: 'warning',
                    message: response.data.data.info,
                  })
                }
              }else {
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
      }

    },
    //批量删除提示框
    remove() {
      ElMessageBox.confirm(
          '是否确认删除所选数据项?',
          '系统提示',
          {
            cancelButtonText: '取消',
            confirmButtonText: '确认',
            type: 'warning',
          }
      ).then(() => {
        /*清空*/
        this.listId = [];
        for (let i = 0; i < this.checkDeleteList.length; i++) {
          this.listId.push(this.checkDeleteList[i].registerLogId)
        }
        this.axios({
          method: 'delete',
          url: this.url + 'checkRegisterLogDelete',
          data: this.listId,
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          if (response.data.code == 200) {
           if (response.data.data) {
              //如果服务是正常的
              if (response.data.data.state == 200) {
                //如果返回成功
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
              }else {
                ElNotification.error({
                  title: '提示',
                  message:response.data.data.info,
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
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
    },
    /*分页查询*/
    next() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectRegisterLogAll',
        data: {
          //当前页
          'currenPage': this.pageInfo.currenPage,
          //页大小
          "pageSize": this.pageInfo.pageSize,
          //员工名称
          "registerLogPeople": this.registerLogPeople,
          //IP所在地
          "registerLogIpname": this.registerLogIpname,
          //起始时间
          "startTime": this.selectTime == null ? null : this.selectTime[0],
          //结束时间
          "endTime": this.selectTime == null ? null : this.selectTime[1],
          //状态
          "registerLogState": this.registerLogState,
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
            }else {
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
    /*序号*/
    indexMethod(index) {
      let curpage = this.pageInfo.currenPage; //单前页码，具体看组件取值
      let limitpage = this.pageInfo.pageSize; //每页条数，具体是组件取值
      return index + 1 + (curpage - 1) * limitpage;
    }
  }, mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token;
    this.next();
  }
}
</script>

<style type="text/css" scoped>
@import url("../../css/zpdaohang.css");
/* 图标 */
@font-face {
  font-family: 'iconfont';
  /* Project id 2994452 */
  src: url('//at.alicdn.com/t/font_2994452_60uvtx3m6is.woff2?t=1638864192788') format('woff2'),
  url('//at.alicdn.com/t/font_2994452_60uvtx3m6is.woff?t=1638864192788') format('woff'),
  url('//at.alicdn.com/t/font_2994452_60uvtx3m6is.ttf?t=1638864192788') format('truetype');
}

.saas-main-content .j-card {
  margin: 10px 0 20px 0;
}

/deep/ .el-range-editor.el-input__inner {
  height: 32px;
}

/deep/ .el-range-editor.el-input__inner .el-range-separator {
  position: relative;
  top: -4px;
}

.button-enable {
  background: #ecf5ff;
  border: 1px #cfe6ff solid;
  color: #5aaaff;
  display: inline-block;
  line-height: 1;
  min-height: 15px;
  white-space: nowrap;
  text-align: center;
  margin: 0;
  padding: 12px 20px;
  border-radius: var(--el-border-radius-base);
}

.button-forbidden {
  background: #fef0f0;
  border: 1px #f2c5c5 solid;
  color: #f57a7a;
  display: inline-block;
  line-height: 1;
  min-height: 15px;
  white-space: nowrap;
  text-align: center;
  margin: 0;
  padding: 12px 20px;
  border-radius: var(--el-border-radius-base);
}

/*表格样式*/
.sub-Content__primary {
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

/* 分页 */
.demo-pagination-block {
  margin: 10px 0 10px 10px;
}

.button {
  margin-bottom: 10px;
  margin-top: -55px;

}

/* 删除表格数据按钮 */
.button-delete {
  color: #ff4949;
  background: #ffeded;
  border-color: #ffb6b6;
  border: none;
  width: 90px;
}

.el-button--default {
  height: 33.6px;
}

.button-delete:hover {
  background: #ff4949;
  border-color: #ff4949;
  color: #fff;
  border: none;
  width: 90px;
}

/* 清空表格数据按钮 */
.button-empty {
  width: 90px;
  height: 33.6px;
  color: #13ce66;
  background: #e7faf0;
  border-color: #a1ebc2;
  border: none;
}

.button-empty:hover {
  width: 90px;
  background: #13ce66;
  border-color: #13ce66;
  color: #fff;
  border: none;
}


/* 搜索按钮 */

.search-ss {
  background-color: #085FC3;
  color: white;
  margin: 29px 0px 0px 5px;
  width: 90px;
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
}

.search-ss:hover {
  background-color: #085FC3;
  color: white;
  margin: 29px 0px 0px 5px;
  width: 90px;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}

/* 重置按钮 */
.search-cz {
  color: black;
  margin: 29px 0px 0px 10px;
  width: 90px;
  height: 34px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-top-color: rgb(220, 223, 230);
  border-right-color: rgb(220, 223, 230);
  border-bottom-color: rgb(220, 223, 230);
  border-left-color: rgb(220, 223, 230);
  border-color: #dcdfe6;
  color: #606266;
}

.search-cz:hover {
  color: black;
  margin: 29px 0px 0px 10px;
  width: 90px;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}

/* 登录时间搜索按钮 */
.form-time {
  width: 270px;
  margin-left: -20px;
}

.form-state {
  width: 270px;
  margin-left: 20px;
}

/* 登录地址搜索样式 */
.form-name {
  width: 270px;
  margin-left: 20px;
}

/* 登录地址搜索样式 */
.form-dizhi {
  width: 270px;
}


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


.mr-20 {
  margin-right: 20px;
}

.ml-20 {
  margin-left: 20px;
}

.mt-20 {
  margin-top: 20px;
}

a {
  color: #085fc3;
  background-color: transparent;
}

a, area, button, [role="button"], input:not([type="range"]), label, select, summary, textarea {
  touch-action: manipulation;
}

a {
  color: #366cb3;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
  -webkit-text-decoration-skip: objects;
}

button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner {
  border-style: none;
}

button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner {
  padding: 0;
  border-style: none;
}

.ant-btn::before {
  background: #fff;
  border-radius: inherit;
}

.ant-btn::before {
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -1px;
  left: -1px;
  z-index: 1;
  display: none;
  background: #fff;
  border-radius: inherit;
  opacity: 0.35;
  transition: opacity 0.2s;
  content: '';
  pointer-events: none;
}

button, html [type="button"], [type="reset"], [type="submit"] {
  -webkit-appearance: button;
}

.ant-btn-primary {
  color: #fff;
  background-color: #085fc3;
  border-color: #085fc3;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}

.ant-btn-primary {
  color: #fff;
  background-color: #366cb3;
  border-color: #366cb3;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}

.el-form--inline .el-form-item {
  margin-right: -10px;
}

.ant-btn, .ant-btn:active, .ant-btn:focus {
  outline: 0;
}

.ant-btn {
  line-height: 1.499;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 3px;
  color: #606c82;
  background-color: #fff;
  border-color: #d3dae2;
}

.ant-btn-primary {
  color: #fff;
  background-color: #085fc3;
  border-color: #085fc3;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}


</style>
