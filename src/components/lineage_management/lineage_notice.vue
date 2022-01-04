<!-- 公告页面 -->

<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">

        <div class="mt-20 ml-20 mr-20">
          <!-- 搜索数据部分 -->
          <el-form style="margin-bottom: -18px;" :inline="true">
            <!-- 公告标题搜索 -->
            <el-form-item class="form-gg" label="公告标题">
              <el-input size="small" placeholder="请输入公告标题关键字" clearable v-model="noticeTitle"></el-input>
            </el-form-item>
            <!-- 操作人员搜索 -->
            <el-form-item class="form-ry" label="发布人">
              <el-input size="small" placeholder="请输入发布人关键字" clearable v-model="noticePeople"></el-input>
            </el-form-item>
            <!-- 公告类型搜索 -->
            <el-form-item class="form-lx" label="类型">
              <el-select size="small" v-model="noticeType" clearable placeholder="公告类型">
                <el-option
                    v-for="item in type"
                    :key="item.value1"
                    :label="item.label"
                    :value="item.value1"
                ></el-option>

              </el-select>
            </el-form-item>
            <!-- 登录时间搜索 -->
            <el-form-item class="form-time" label="发布时间">
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

          <!-- 操作按钮部分 -->
          <div class="button">
            <!-- 新增按钮 -->
            <el-button size="mini"
                       style="width: 90px;height: 33px"
                       class="button-new"
                       @click="selectDeptList(),outerVisible = true,judge='新增',this.eliminate()">
              + 新增
            </el-button>
            <el-button size="mini" style="width: 90px;height: 33px" type="danger" class="button-delete" @click="remove"
                       v-bind:disabled="checkDeleteList.length==0?true:false">
              <i class="iconfont">&#xe61c</i>
              删除
            </el-button>
            <el-button size="mini" class="search-ss" type="primary" @click="next">
              <i class="iconfont">
                &#xe61b
              </i>
              搜索
            </el-button>
            <el-button size="mini" class="search-cz" type="primary" @click="reset">
              <i class="iconfont">
                &#xe6b8
              </i>
              重置
            </el-button>
          </div>
        </div>
        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table :data="tableData" style="width: 100% ;"
                    border
                    stripe
                    :header-cell-style="{textAlign: 'center',background:'rgba(213,213,218,0.63)',color:'#6C6C6C'}"
                    @selection-change="checkDelete"
          >
            <!-- 全选操作按钮 -->
            <el-table-column fixed align="center" type="selection" min-width="50"/>
            <el-table-column fixed :index="indexMethod" align="center" label="序号" type="index" width="100"/>
            <el-table-column fixed prop="noticeTitle" align="center" sortable label="公告标题" min-width="230"/>
            <el-table-column prop="noticePeople" align="center" sortable label="发布人" min-width="160"/>
            <el-table-column prop="noticePost" align="center" sortable label="职位" min-width="160"/>
            <el-table-column prop="noticeType" align="center" sortable label="公告类型" min-width="170">
              <template #default="scope">
                <span v-if="scope.row.noticeType==0">要事性</span>
                <span v-if="scope.row.noticeType==1">政策性</span>
                <span v-if="scope.row.noticeType==2">任免性</span>
              </template>
            </el-table-column>
            <el-table-column prop="noticeState" align="center" sortable label="公告状态" min-width="160">
              <template #default="scope">
                <span class="button-enable" v-if="scope.row.noticeState==0">启用</span>
                <span class="button-forbidden" v-if="scope.row.noticeState==1">禁用</span>
              </template>
            </el-table-column>
            <el-table-column prop="createdTime" align="center" sortable label="发布时间" min-width="170"/>
            <el-table-column fixed="right" align="center" label="操作" min-width="280">
              <template #default="scope">
                <el-button size="mini" type="success" @click="announcement = true,selectPossessDeptList(scope.row.noticeId)
                           ,peropleNoticeViewedMethod(scope.row.noticeId),unseenNoticePersonMethod(scope.row.noticeId)
                           ,fromValue.noticeType=scope.row.noticeType
                           ,fromValue.noticeTitle=scope.row.noticeTitle
                           ,fromValue.noticeState=scope.row.noticeState=='0'?'0':'1'
                           ,fromValue.noticeMatter=scope.row.noticeMatter
                           ,fromValue.noticeId=scope.row.noticeId
                           ,fromValue.postName=scope.row.noticePost">
                  <i class="iconfont">&#xe61b</i>
                  查看
                </el-button>
                <el-button size="mini" type="primary"
                           @click="outerVisible = true,judge='修改',selectDeptList(),selectPossessDeptList(scope.row.noticeId)
                           ,fromValue.noticeType=scope.row.noticeType
                           ,fromValue.noticeTitle=scope.row.noticeTitle
                           ,fromValue.noticeState=scope.row.noticeState=='0'?'0':'1'
                           ,fromValue.noticeMatter=scope.row.noticeMatter
                           ,fromValue.noticeId=scope.row.noticeId">
                  <i class="iconfont">&#xe606</i>
                  修改
                </el-button>

                <el-button size="mini" @click="radioRemove(scope.row.noticeId)" type="danger">
                  <i class="iconfont">&#xe61c</i>
                  删除
                </el-button>
              </template>
            </el-table-column>
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
  <!-- 弹出操作窗口 -->
  <el-dialog width="668px" v-model="outerVisible" destroy-on-close="false" @close="cancel">
    <span class="headline"> {{ judge }}公告</span>
    <!-- form表单 -->
    <el-form ref="fromValue" :rules="formVerify" :model="fromValue" :inline="true" style="margin-left: 30px"
             label-position="right">
      <!-- 公告标题 -->
      <el-form-item prop="noticeTitle" label="公告标题" style="margin-right: 40px">
        <el-input size="small" placeholder="请输入公告标题" v-model="fromValue.noticeTitle"></el-input>
      </el-form-item>
      <!-- 公告类型-->
      <el-form-item prop="noticeType" label="公告类型">
        <el-select size="small" v-model="fromValue.noticeType" placeholder="公告类型" style="width: 180px">
          <el-option
              v-for="item in type"
              :key="item.value1"
              :label="item.label"
              :value="item.value1"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 公告状态 -->
      <el-form-item prop="noticeState" label="状态" style="margin-right: 60px;margin-left: 35px">
        <div>
          <el-radio v-model="fromValue.noticeState" label="0">启用</el-radio>
          <el-radio v-model="fromValue.noticeState" label="1" style="margin-left: 16px">禁用</el-radio>
        </div>
      </el-form-item>
      <!-- 部门列表-->
      <el-form-item label="发布部门" prop="deptNameList">
        <el-select v-model="fromValue.deptNameList" multiple placeholder="选择部门" style="width:180px;">
          <!--  所有的部门列表             -->
          <el-option
              v-for="item in options"
              :key="item.label"
              :label="item.label"
              :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 公告内容 -->
      <el-form-item label="内容" prop="noticeMatter" style="margin-left: 20px">
        <el-input
            v-model="fromValue.noticeMatter"
            type="textarea"
            placeholder="请输入发布内容"
            style="width: 475px">
        </el-input>

      </el-form-item>

      <el-form-item style="margin-left: 400px">
        <div>
          <el-button size="mini" style="width: 65px;" @click="cancel()">
            取消
          </el-button>
          <el-button size="mini" style="width: 65px;" type="primary" @click="judges('fromValue')">
            {{ judge }}
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!--查看公告  -->
  <el-dialog
      v-model="announcement"
      title="公告详情"
      width="700px"
  >
    <el-form :model="fromValue" :inline="true" style="margin-left: 30px;margin-right: 30px">
      <!-- 公告标题 -->
      <el-form-item prop="noticeTitle" label="公告标题：" style="margin-right: 32px">
        <div style="width: 510px">
          {{ fromValue.noticeTitle }}
        </div>
      </el-form-item>
      <!-- 发布人 -->
      <el-form-item prop="noticePeople" label="发布人：" style="margin-left: 15px">
        <div style="width: 300px">{{ fromValue.noticePeople }}</div>
      </el-form-item>
      <!-- 职位 -->
      <el-form-item prop="postName" label="职位：" style="margin-left: 25px">
        <div style="width: 100px">{{ fromValue.postName }}</div>
      </el-form-item>
      <!-- 公告类型-->
      <el-form-item prop="noticeType" label="公告类型：">
        <div style="width: 300px" v-show="fromValue.noticeType==0">要事性</div>
        <div style="width: 300px" v-show="fromValue.noticeType==1">政策性</div>
        <div style="width: 300px" v-show="fromValue.noticeType==2">任免性</div>
      </el-form-item>
      <!-- 公告状态 -->
      <el-form-item prop="noticeState" label="状态：" style="margin-left: 27px">
        <div style="width: 100px">{{ fromValue.noticeState == 0 ? '启用' : '禁用' }}</div>
      </el-form-item>
      <!-- 部门列表-->
      <el-form-item label="发布部门：" prop="deptNameList">
        <div style="width: 510px">
          <span v-for="name in fromValue.deptNameList" style="margin-right: 20px">
            {{ name }}
          </span>
        </div>
      </el-form-item>
      <!-- 公告内容 -->
      <el-form-item label="内容：" prop="noticeMatter" style="margin-left: 27px;">
        <div style="width: 510px">{{ fromValue.noticeMatter }}</div>
      </el-form-item>
      <!-- 已查看人员 -->
      <el-form-item label="已看人员：" prop="peropleNoticeViewed">
        <div style="width: 510px">
          <span v-for="name in fromValue.peropleNoticeViewed" style="margin-right: 20px">{{ name.staffName }}</span>
        </div>
      </el-form-item>
      <!-- 未查看人员 -->
      <el-form-item label="未看人员：" prop="unseenNoticePerson">
        <div style="width: 510px">
          <span v-for="name in fromValue.unseenNoticePerson" style="margin-right: 20px">{{ name.staffName }}</span>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="announcement = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {ElMessageBox, ElMessage} from 'element-plus'

import {ElNotification} from 'element-plus'

export default {
  data() {
    return {
      //访问路径
      url: "http://localhost:80/notice/",
      //公告标题
      noticeTitle: "",
      //公告类型
      noticeType: "",
      //发布人
      noticePeople: "",
      //选择时间
      selectTime: [],
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
      // 分页
      pageInfo: {
        /* 当前的页 */
        currenPage: 1,
        //页大小
        pageSize: 5,
        //总条数
        total: 0,
      },
      //表格数据
      tableData: [],
      //表单数据
      fromValue: {
        //公告编号
        noticeId: '',
        //公告标题
        noticeTitle: '',
        //公告状态
        noticeState: "0",
        //发布人
        noticePeople: this.$store.state.staffMessage.staffName,
        //部门职位编号
        deptPostId: this.$store.state.staffMessage.deptPostId,
        //发布内容
        noticeMatter: '',
        //公告类型
        noticeType: '',
        //员工编号
        staffId: this.$store.state.staffMessage.staffId,
        //部门名称集合
        deptNameList: [],
        //职位名称
        postName: '',
        //未看公告人员集合
        peropleNoticeViewed: [],
        //已看公告人员集合
        unseenNoticePerson: [],
      },
      //表单验证
      formVerify: {
        //公告标题
        noticeTitle: [
          {
            required: true,
            message: '标题不为空',
            trigger: 'blur',
          }, {
            min: 0,
            max: 25,
            message: '标题不能超过25个字符',
            trigger: 'blur',
          }
        ],
        //发布内容
        noticeMatter: [
          {
            required: true,
            message: '发布内容不为空',
            trigger: 'blur',
          },
          {
            min: 0,
            max: 500,
            message: '发布内容不能超过500个字符',
            trigger: 'blur',
          }
        ],
        //公告类型
        noticeType: [
          {
            required: true,
            message: '未选择公告类型',
            trigger: 'change',
          }
        ],
        //部门编号集合
        deptNameList: [
          {
            required: true,
            message: '未选择部门',
            trigger: 'change',
          }
        ],
      },
      //部门列表
      options: [],
      //查看公告弹出框
      announcement: false,
      //公告类型
      type: ([
        {
          value1: 0,
          label: '要事性',
        },
        {
          value1: 1,
          label: '政策性',
        },
        {
          value1: 2,
          label: '任免性',
        }
      ]),
      //显示添加还是有修改的状态
      outerVisible: false,
      //被选择的列表
      checkDeleteList: [],
      // 判断添加还是编辑
      judge: "添加",
      //复选框选中的ID
      listId: [],
    }
  },
  methods: {
    /*分页查询*/
    next() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectNoticeAll',
        data: {
          //当前页
          'currenPage': this.pageInfo.currenPage,
          //页大小
          "pageSize": this.pageInfo.pageSize,
          //公告标题
          "noticeTitle": this.noticeTitle,
          //发布人
          "noticePeople": this.noticePeople,
          //起始时间
          "startTime": this.selectTime == null ? null : this.selectTime[0],
          //结束时间
          "endTime": this.selectTime == null ? null : this.selectTime[1],
          //公告类型
          "noticeType": this.noticeType,
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
    //删除提示框
    radioRemove(id) {
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
          this.listId.push(this.checkDeleteList[i].noticeId)
        }
        this.axios({
          method: 'delete',
          url: this.url + 'checkNoticeDelete',
          data: [id],
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
              //如果是成功
              if (response.data.data.info == "成功") {
                this.next();
                ElMessage({
                  type: 'success',
                  message: '删除成功',
                })
              } else {
                ElMessage({
                  type: 'warning',
                  message: response.data.data.info,
                })
              }
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
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
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
          this.listId.push(this.checkDeleteList[i].noticeId)
        }
        this.axios({
          method: 'delete',
          url: this.url + 'checkNoticeDelete',
          data: this.listId,
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
              //如果是成功
              if (response.data.data.info == "成功") {
                this.next();
                ElMessage({
                  type: 'success',
                  message: '删除成功',
                })
              } else {
                ElMessage({
                  type: 'warning',
                  message: response.data.data.info,
                })
              }
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
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
    },
    //复选框选择事件
    checkDelete(val) {
      this.checkDeleteList = val;
    },
    //新增对话框表单验证
    new() {
      this.axios({
        method: 'post',
        url: this.url + 'insertNotice',
        data: this.fromValue,
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
            //如果是成功
            if (response.data.data.info == "成功") {
              this.next();
              ElMessage({
                type: 'success',
                message: '新增成功',
              })
              //清空数据
              this.eliminate();
              this.outerVisible = false
            } else {
              ElMessage({
                type: 'warning',
                message: response.data.data.info,
              })
            }
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
    //修改对话框表单验证
    amend() {
      this.axios({
        method: 'put',
        url: this.url + 'updateNotice',
        data: this.fromValue,
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
            //如果是成功
            if (response.data.data.info == "成功") {
              this.next();
              ElMessage({
                type: 'success',
                message: '修改成功',
              })
              //清空数据
              this.eliminate();
              this.outerVisible = false
            } else {
              ElMessage({
                type: 'warning',
                message: response.data.data.info,
              })
            }
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
    //新增或修改方法判断方法
    judges(fromValue) {
      this.$refs[fromValue].validate((valid) => {
        if (valid) {
          if (this.judge === "新增") {
            //新增
            this.new();
          } else {
            //删除
            this.amend()
          }
        } else {
          return false
        }
      })
    },
    //清空数据
    eliminate() {
      this.fromValue = {
        //公告编号
        noticeId: '',
        //公告标题
        noticeTitle: '',
        //公告状态
        noticeState: '0',
        //发布人
        noticePeople: this.$store.state.staffMessage.staffName,
        //部门职位编号
        deptPostId: this.$store.state.staffMessage.deptPostId,
        //发布内容
        noticeMatter: '',
        //公告类型
        noticeType: '',
        //员工编号
        staffId: this.$store.state.staffMessage.staffId,
        //部门名称集合
        deptNameList: [],
        //职位名称
        postName: '',
      }
    },
    //取消按钮方法
    cancel() {
      //清空数据
      this.eliminate();
      this.outerVisible = false
    },
    //重置
    reset() {
      //公告标题
      this.noticeTitle = "";
      //公告类型
      this.noticeType = "";
      //发布人
      this.noticePeople = "";
      //选择时间
      this.selectTime = [];
      //刷新表格
      this.next();
    },
    /*序号*/
    indexMethod(index) {
      let curpage = this.pageInfo.currenPage; //单前页码，具体看组件取值
      let limitpage = this.pageInfo.pageSize; //每页条数，具体是组件取值
      return index + 1 + (curpage - 1) * limitpage;
    },
    /*查询所有的部门列表*/
    selectDeptList() {
      this.axios({
        method: 'get',
        url: this.url + 'selectDeptList',
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
            //初始化
            this.options = [];
            //循环部门列表
            for (let i = 0; i < response.data.data.info.length; i++) {
              //一个一个存起来
              this.options.push({value: response.data.data.info[i].deptId, label: response.data.data.info[i].deptName})
            }
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
    //查询当前公告绑定的部门信息
    selectPossessDeptList(id) {
      this.axios({
        method: 'get',
        url: this.url + 'selectPossessDeptList?id=' + id
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
            //初始化
            this.fromValue.deptNameList = [];
            //循环部门列表
            for (let i = 0; i < response.data.data.info.length; i++) {
              this.fromValue.deptNameList.push(response.data.data.info[i].deptName)
            }
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
    //已看公告人员
    peropleNoticeViewedMethod(id) {
      this.axios({
        method: 'get',
        url: this.url + 'peropleNoticeViewed?id=' + id,
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
            //初始化
            this.fromValue.peropleNoticeViewed = response.data.data.info;
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
    //未看公告人员
    unseenNoticePersonMethod(id) {
      this.axios({
        method: 'get',
        url: this.url + 'unseenNoticePerson?id=' + id,
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
            //初始化
            this.fromValue.unseenNoticePerson = response.data.data.info;
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
    }
  }, mounted() {
    this.next();
  }
}
</script>
<style>
.el-dialog__body {
  padding-bottom: 5px !important;
}
</style>
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

/deep/ .el-form-item__label {
  font-weight: bold !important;
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

.button .button-delete {
  margin-right: 895px;
}

.el-form--inline .el-form-item {
  margin-right: 5px;
}

.sub-Content__primary {
  margin-right: 10px;
  margin-left: 10px;
}

/deep/ .form-time .el-form-item__label {
  position: relative;
  top: 10px;
  left: 10px;
}

/deep/ .form-time .el-form-item__content {
  position: relative;
  top: 10px;
  left: 10px;
}

/deep/ form .form-gg {
  margin-left: 2px;
}

/deep/ form div {
  margin-right: 10px;
}

/deep/ .el-range-editor.el-input__inner {
  height: 32px;
}

/*内容*/
.neirong {
  font-weight: bold;
  size: 14px;
  margin-left: 37px;
  position: absolute;
  top: 192px;
}

/* 分页 */
.demo-pagination-block {
  margin: 10px 0 10px 10px;
}

.headline {
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  top: 16px;
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.tck {
  width: 600px;
  height: 200px;
  background: green;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}


.button {
  margin-bottom: 10px;

}

/* 表头新增按钮 */
.button .button-new {
  height: 30px;
  width: 90px;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
  border: none;
  width: 106px;
}


.button .button-new:hover {
  height: 30px;
  width: 90px;
  color: white;
  background-color: #1890FF;
  border: none;
  width: 106px;
}

/* 表头批量删除按钮样式 */
.button-delete {
  height: 30px;
  width: 90px;
  margin: 0px 0px 0px 5px;
  border: none;
  width: 106px;
}

/* 搜索 */
.form-gg {
  margin: 0px 0px 0px 10px;
}

.form-lx {
  margin: 0px 0px 0px 10px;
}

.form-ry {
  margin: 0px 0px 0px 10px;
}

.op {
  display: none;
}

/* 搜索按钮 */
.search-ss {
  background-color: #085FC3;
  color: white;
  margin: 29px 0px 0px 5px;
  width: 85px;
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
}

.search-ss:hover {
  background-color: #085FC3;
  color: white;
  margin: 29px 0px 0px 5px;
  width: 85px;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}

/* 重置按钮 */
.search-cz {
  color: black;
  margin: 29px 0px 0px 5px;
  width: 85px;
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
  margin: 29px 0px 0px 5px;
  width: 85px;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
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
  margin-top: 0px;
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
