<!-- 登录日志页面 -->

<template>
  <div class="saas-main-content" style="margin-bottom: 20px">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <div class="mt-20 ml-20 mr-20">
          <!-- 搜索导航部分-->
          <el-form :inline="true" v-model="searchOne">
            <el-form-item class="user-name" label="用户名称">
              <el-input size="small" v-model="searchOne.staffName" placeholder="请输入用户名称"></el-input>
            </el-form-item>

            <el-form-item class="phone" label="手机号码">
              <el-input size="small" v-model="searchOne.staffPhone" placeholder="请输入手机号码"></el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-select style="width: 190px" size="small" v-model="searchOne.staffState" clearable
                         placeholder="请选择角色状态">
                <el-option
                    v-for="item in state"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <span style="margin-left: 28%;cursor: pointer" @click="this.$parent.$data.allot_user=false">
            <svg t="1641819317404" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="6044" width="40" height="40"><path
                d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512z m0-992a480 480 0 1 0 480 480A480 480 0 0 0 512 32z m16 527.616v63.824a32 32 0 0 1-49.744 26.544l-192-127.632a31.856 31.856 0 0 1 0-53.104l192-127.632A32 32 0 0 1 528 368.16V432a191.728 191.728 0 0 1 192 191.44 114.624 114.624 0 0 1-16 64.368c-30.896-73.92-93.264-128.112-176-128.192zM496 464v-90.496a45.552 45.552 0 0 0-22.576 4.592L323.2 477.024a22.752 22.752 0 0 0-11.696 19.728A26.08 26.08 0 0 0 323.2 518.4l150.224 92.432a51.328 51.328 0 0 0 22.576 5.6V528c183.472 0 208.32 122.784 208.32 122.784C704.32 505.6 592 464 496 464z"
                p-id="6045" fill="#2c2c2c"></path></svg>

          </span>
          </el-form>

          <!-- 对数据的增删改按钮 -->
          <div class="button">
            <el-button class="button-new" size="mini"
                       @click="outerVisible = true,
                       searchTwo.staffPhone='',
                       searchTwo.staffName='',
                        next_two(),
                        selectPostNameList()"
                       style="margin-left: 5px;height: 33px">
              添加用户
            </el-button>
            <el-button class="button-delete" size="mini" type="danger"
                       v-bind:disabled="checkDeleteListOne.length==0?true:false" @click="checkcCancelImpower"
                       style="height: 33px;margin-right: 870px">取消授权
            </el-button>
            <el-button size="mini" class="search-ss" type="primary" @click="next_one">
              <i class="iconfont" style="font-size: 13.5px;height: 33px">
                &#xe61b
              </i>
              搜索
            </el-button>
            <el-button size="mini" class="search-cz" type="primary" @click="resetOne">
              <i class="iconfont" style="font-size: 13.5px;height: 33px">
                &#xe6b8
              </i>
              重置
            </el-button>
          </div>

          <!-- 表格内容部分 -->
          <div class="sub-Content__primary">
<!--             :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"-->
            <el-table :data="tableDataOne" style="width: 100%;margin-left: 24px;margin-bottom: 20px;"
                      :cell-style="{ textAlign: 'center' }"
                      @selection-change="deleteListOne"
            >
              <!-- 全选操作按钮 -->
              <el-table-column type="selection" min-width="70"/>
              <el-table-column fixed :index="indexMethod_one" align="center" label="序号" type="index" min-width="100"/>
              <el-table-column prop="staff.staffName" label="用户名称" sortable align="center" min-width="150"/>
              <el-table-column prop="staff.staffEmail" label="邮箱" sortable align="center" width="200"/>
              <el-table-column prop="staff.staffPhone" label="手机号码" sortable align="center" min-width="150"/>
              <el-table-column prop="staff.staffState" label="状态" sortable align="center" min-width="100">
                <template #default="scope">
                  <span v-if="scope.row.staff.staffState==0">试用</span>
                  <span v-else-if="scope.row.staff.staffState==1">正式</span>
                  <span v-else-if="scope.row.staff.staffState==2">离职</span>
                  <span v-else>未知</span>
                </template>
              </el-table-column>
              <el-table-column prop="createdTime" label="入职时间" sortable align="center" min-width="150"/>
              <el-table-column align="center" label="操作" width="200">
                <template #default="scope">
                  <span class="cancel" @click="cancelImpower(scope.row.roleStaffId)" style="cursor: pointer">
                    <i class="iconfont" style="position: absolute;top: 23px;left: 58px;">
                      &#xe631
                    </i>&nbsp;&nbsp;
                    取消权限
                  </span>
                </template>
              </el-table-column>
            </el-table>

          </div>

          <!-- 分页 -->
          <div class="demo-pagination-block">
            <el-pagination v-model:current-page="pageInfo_one.currenPage"
                           v-model:page-size="pageInfo_one.pageSize"
                           :default-page-size="pageInfo_one.pageSize"
                           :page-sizes="[5, 10,15,20]"
                           :pager-count="5"
                           :total="pageInfo_one.total"
                           background
                           layout="	total ,sizes, prev, pager, next, jumper"
                           next-text="下一页"
                           prev-text="上一页"
                           @size-change="next_one()"
                           @current-change="next_one()"
                           @prev-click="next_one()"
                           @next-click="next_one()">
            </el-pagination>
          </div>


          <!--添加用户对话框-->
          <el-dialog width="900px" title="选择用户" v-model="outerVisible" destroy-on-close="false"
                     :before-close="revocatory">
            <!-- form表单 -->
            <el-form class="announcement" :inline="true" style="margin-top: 20px;" v-model="searchTwo">


              <el-form-item class="username" label="用户名称" style="margin-left: 35px">
                <el-input size="mini" v-model="searchTwo.staffName" placeholder="请输入用户名称" clearable></el-input>
              </el-form-item>

              <el-form-item class="username" label="职位名称" style="margin-left:35px">
                <el-select v-model="searchTwo.postName" placeholder="请选择职位" clearable>
                  <el-option
                      v-for="item in postNameList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item class="phones" label="手机号码">
                <el-input size="mini" v-model="searchTwo.staffPhone" placeholder="请输入手机号码" clearable></el-input>
              </el-form-item>

              <el-form-item style="margin-top: -22px;margin-left: 660px">
                <el-button size="mini" class="dialog-box-ss" type="primary" @click="next_two">
                  <i class="iconfont" style="font-size: 13.5px;">
                    &#xe61b
                  </i>
                  &nbsp;搜索
                </el-button>
                <el-button size="mini" class="dialog-box-cz" type="primary" @click="resetTwo">
                  <i class="iconfont" style="font-size: 13px;">
                    &#xe6b8
                  </i>
                  &nbsp;重置
                </el-button>
              </el-form-item>

              <!--添加用户表格-->
              <el-form-item>
                <!-- 表格内容部分 -->
                <div class="el-form-table">
<!--                    :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"-->
                  <el-table :data="tableDataTwo" style="width: 100%;margin-left: 24px;margin-bottom: 20px;"
                            :cell-style="{ textAlign: 'center' }"
                            ref="xuanzhong"
                            @selection-change="deleteListTwo">
                    <!-- 全选操作按钮 -->
                    <el-table-column type="selection" width="50"/>
                    <el-table-column fixed :index="indexMethod_two" align="center" label="序号" type="index" width="50"/>
                    <el-table-column prop="staffName" align="center" sortable label="用户名称" width="150"/>
                    <el-table-column prop="staffEmail" align="center" sortable label="邮箱" width="180"/>
                    <el-table-column prop="staffPhone" align="center" sortable label="手机号码" width="140"/>
                    <el-table-column prop="staffState" align="center" sortable label="状态" width="100">
                      <template #default="scope">
                        <span v-if="scope.row.staffState==0">试用</span>
                        <span v-else-if="scope.row.staffState==1">正式</span>
                        <span v-else-if="scope.row.staffState==2">离职</span>
                        <span v-else>未知</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="createdTime" align="center" sortable label="入职时间" width="185"/>
                  </el-table>
                </div>
              </el-form-item>

              <!-- 分页 -->
              <div class="demo-pagination-block">
                <el-pagination v-model:current-page="pageInfo_two.currenPage"
                               v-model:page-size="pageInfo_two.pageSize"
                               :default-page-size="pageInfo_two.pageSize"
                               :page-sizes="[5, 10,15,20]"
                               :pager-count="5"
                               :total="pageInfo_two.total"
                               background
                               layout="	total ,sizes, prev, pager, next, jumper"
                               next-text="下一页"
                               prev-text="上一页"
                               @size-change="next_two()"
                               @current-change="next_two()"
                               @prev-click="next_two()"
                               @next-click="next_two()">
                </el-pagination>
              </div>

              <el-form-item>
                <template #default="scope">
                  <div style="margin-left: 700px;margin-top: 10px;">
                    <el-button size="small" style="width: 60px;" @click="revocatory">
                      取消
                    </el-button>
                    <el-button size="small" style="width: 60px;" type="primary"
                               v-bind:disabled="checkDeleteListTwo.length==0?true:false"
                               @click="allot">
                      确定
                    </el-button>
                  </div>
                </template>
              </el-form-item>

            </el-form>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import {ref} from 'vue'
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";

export default {
  data() {
    return {
      url: 'http://localhost:80/role/',
      // 搜索用户状态下拉框
      state: ref([
        {
          value: 0,
          label: '试用',
        },
        {
          value: 1,
          label: '正式',
        },
        {
          value: 2,
          label: '离职',
        },
      ]),

      // 分页
      pageInfo_one: {
        /* 当前的页 */
        currenPage: 1,
        //页大小
        pageSize: 5,
        //总条数
        total: 0,
      },
      //职位列表
      postNameList:[],
      // 分页
      pageInfo_two: {
        /* 当前的页 */
        currenPage: 1,
        //页大小
        pageSize: 5,
        //总条数
        total: 0,
      },
      //搜索重置form
      searchOne: {
        //员工状态
        staffState: '',
        //员工姓名
        staffName: '',
        //员工手机号
        staffPhone: '',
      },
      //搜索重置form
      searchTwo: {
        //员工姓名
        staffName: '',
        //员工手机号
        staffPhone: '',
        //职位名称
        postName:'',
      },
      //表格
      tableDataOne: [],
      tableDataTwo: [],
      //添加用户对话框
      outerVisible: false,
      //复选框选择的列表
      checkDeleteListOne: [],
      //复选框选择的列表
      checkDeleteListTwo: [],
      //批量取消授权编号集合
      listIdOne: [],
      //批量取消授权编号集合
      listIdTwo: [],
    }
  },
  methods: {
    revocatory() {
      this.outerVisible = false;
      ElMessage({
        message: '取消成功',
        type: 'info',
      })
    },
    //批量取消授权
    checkcCancelImpower() {
      ElMessageBox.confirm(
          '是否确认对所选数据项取消授权?',
          '系统提示',
          {
            cancelButtonText: '取消',
            confirmButtonText: '确认',
            type: 'warning',
          }
      ).then(() => {
        //初始化
        this.listIdOne = [];
        for (let i = 0; i < this.checkDeleteListOne.length; i++) {
          this.listIdOne.push(this.checkDeleteListOne[i].roleStaffId)
        }
        this.axios({
          method: 'delete',
          url: this.url + 'cancelImpower',
          data: this.listIdOne,
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          if (response.data.code == 200) {
           if (response.data.data) {
              //如果服务是正常的
              if (response.data.data.state == 200) {
                //如果是成功
                if (response.data.data.info == "成功") {
                  this.next_one();
                  ElMessage({
                    type: 'success',
                    message: '取消授权成功',
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
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
    },
    //取消授权
    cancelImpower(id) {
      ElMessageBox.confirm(
          '是否确认对点击数据项取消授权?',
          '系统提示',
          {
            cancelButtonText: '取消',
            confirmButtonText: '确认',
            type: 'warning',
          }
      ).then(() => {
        this.axios({
          method: 'delete',
          url: this.url + 'cancelImpower',
          data: [id],
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          if (response.data.code == 200) {
           if (response.data.data) {
              //如果服务是正常的
              if (response.data.data.state == 200) {
                //如果是成功
                if (response.data.data.info == "成功") {
                  this.next_one();
                  ElMessage({
                    type: 'success',
                    message: '取消授权成功',
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
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
    },
    //序列
    indexMethod_one(index) {
      let curpage = this.pageInfo_one.currenPage; //单前页码，具体看组件取值
      let limitpage = this.pageInfo_one.pageSize; //每页条数，具体是组件取值
      return index + 1 + (curpage - 1) * limitpage;
    },
    //序列
    indexMethod_two(index) {
      let curpage = this.pageInfo_two.currenPage; //单前页码，具体看组件取值
      let limitpage = this.pageInfo_two.pageSize; //每页条数，具体是组件取值
      return index + 1 + (curpage - 1) * limitpage;
    },
    //分页查询通过角色编号分配的角色
    next_one() {
      this.axios({
        method: 'post',
        url: this.url + 'selectRoleStaff',
        data: {
          //当前页
          'currenPage': this.pageInfo_one.currenPage,
          //页大小
          "pageSize": this.pageInfo_one.pageSize,
          //角色编号
          "roleId": this.$parent.$data.fromValue.roleId,
          //用户名称
          "staffName": this.searchOne.staffName,
          //用户手机号码
          "staffPhone": this.searchOne.staffPhone,
          //用户状态
          "staffState": this.searchOne.staffState,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
         if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              this.tableDataOne = response.data.data.info.records
              this.pageInfo_one.total = response.data.data.info.total
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
    //查询所有的职位
    selectPostNameList() {
      this.axios({
        method: 'get',
        url: this.url + 'selectDeptPostAll',
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              //初始化
              this.postNameList=[]
              //循环结果
              for (let i = 0; i <response.data.data.info.length; i++) {
                  let one ={
                    label:response.data.data.info[i],
                    value:response.data.data.info[i]
                  }
                  this.postNameList.push(one);
              }
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
    //分页查询所以的在职员工
    next_two() {
      this.axios({
        method: 'post',
        url: this.url + 'selectStaffInState',
        data: {
          //当前页
          'currenPage': this.pageInfo_two.currenPage,
          //页大小
          "pageSize": this.pageInfo_two.pageSize,
          //用户名称
          "staffName": this.searchTwo.staffName,
          //用户手机号码
          "staffPhone": this.searchTwo.staffPhone,
          //角色编号
          'roleId': this.$parent.$data.fromValue.roleId,
          //职位名称
          'deptPostName':this.searchTwo.postName
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              console.log(response.data.data)
              this.tableDataTwo = response.data.data.info.records
              this.pageInfo_two.total = response.data.data.info.total
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
    //分配用户
    allot() {
      ElMessageBox.confirm(
          '是否确认对选择数据项进行授权?',
          '系统提示',
          {
            cancelButtonText: '取消',
            confirmButtonText: '确认',
            type: 'warning',
          }
      ).then(() => {
        //初始化
        this.listIdTwo = [];
        for (let i = 0; i < this.checkDeleteListTwo.length; i++) {
          this.listIdTwo.push(this.checkDeleteListTwo[i].staffId)
        }
        this.axios({
          method: 'post',
          url: this.url + 'allotStaff',
          data: {
            //角色编号
            'roleId': this.$parent.$data.fromValue.roleId,
            //员工编号列表
            "list": this.listIdTwo,
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
                  this.next_one();
                  this.next_two();
                  ElMessage({
                    type: 'success',
                    message: '授权成功',
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
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
    },
    //判断删除按钮是否可用
    deleteListOne(val) {
      this.checkDeleteListOne = val;
    },
    deleteListTwo(val) {
      this.checkDeleteListTwo = val;
    },
    //对话框搜索重置方法
    resetOne() {
      //搜索重置form
      this.searchOne = {
        //员工状态
        staffState: '',
        //员工姓名
        staffName: '',
        //员工手机号
        staffPhone: '',
      }
    },
    //搜索重置方法
    resetTwo() {
      //搜索重置form
      this.searchTwo = {
        //员工姓名
        staffName: '',
        //员工手机号
        staffPhone: '',
        //职位名称
        postName:'',
      }

    }
  }, mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    this.next_one();
  }

}
</script>

<style type="text/css" scoped>

@import url("../../css/zpdaohang.css");

@font-face {
  font-family: 'iconfont';  /* Project id 2994452 */
  src: url('//at.alicdn.com/t/font_2994452_zc48m96iud.woff2?t=1639381525619') format('woff2'),
  url('//at.alicdn.com/t/font_2994452_zc48m96iud.woff?t=1639381525619') format('woff'),
  url('//at.alicdn.com/t/font_2994452_zc48m96iud.ttf?t=1639381525619') format('truetype');
}

.el-form-item {
  margin-bottom: 10px;
}

.sub-Content__primary .el-table--fit {
  margin-left: 0px !important;
}

/* 分页 */
.demo-pagination-block {
  margin: 10px 0 10px 10px;
}


/*对话框表格*/
.el-form-table {
  margin-left: -24px;
}


/*新增按钮样式*/
.button-new {
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
  border: none;
  width: 90px;
}

.button-new:hover {
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
  border: none;
  width: 90px;
}

/* 删除表格数据按钮 */
.button-delete {
  border: none;
  width: 90px;
}

/*添加用户权限对话框*/
.search {
  margin-top: -22px;
  margin-left: 10px;
}

/*对话框搜索按钮样式*/
.dialog-box-ss {
  background-color: #085FC3;
  color: white;
  margin: 29px 0px 0px 5px;
  width: 90px;
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;

}

.dialog-box-ss:hover {
  background-color: #085FC3;
  color: white;
  margin: 29px 0px 0px 5px;
  width: 90px;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}

/* 对话框重置按钮样式 */
.dialog-box-cz {
  color: black;
  margin: 29px 0px 0px 5px;
  width: 90px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-top-color: rgb(220, 223, 230);
  border-right-color: rgb(220, 223, 230);
  border-bottom-color: rgb(220, 223, 230);
  border-left-color: rgb(220, 223, 230);
  border-color: #dcdfe6;
  color: #606266;
}

.dialog-box-cz:hover {
  color: black;
  margin: 29px 0px 0px 5px;
  width: 90px;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}

.phones {
  width: 250px;
  margin-top: -10px;
  margin-left: 10px;
}

/**/
.username {
  width: 250px;
  margin-top: -10px;
  margin-left: 10px;
}
/deep/ .el-input__inner{
  height: 30px;
}

.cancel {
  color: #5aaaff;
}


.button {

  margin-bottom: 15px;

}

/*新增按钮样式*/
.button-new {
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
  border: none;
  width: 110px;
}

.button-new:hover {
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
  border: none;
  width: 110px;
}


/* 搜索按钮 */
.search-ss {
  background-color: #085FC3;
  color: white;
  height: 33px !important;
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
  height: 33px !important;
  background: #e8f4ff;
  border-color: #a3d3ff;
}

/* 重置按钮 */
.search-cz {
  color: black;
  margin: 29px 0px 0px 5px;
  width: 90px;
  height: 33px !important;
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
  height: 33px !important;
  color: black;
  margin: 29px 0px 0px 5px;
  width: 90px;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}

/*手机号码搜索样式*/
.phone {
  width: 300px;
}

/*用户名称搜索样式*/
.user-name {
  width: 300px;
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
