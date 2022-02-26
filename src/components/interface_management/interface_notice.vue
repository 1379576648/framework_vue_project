<template>
  <!--
    公司系统公告
    -->
  <div class="home_public_card home_notice_card">
    <div class="home_notice_card_title">
      <a>
        <span style="font-weight: bold; font-size: 14px; color: #333333;">公司公告</span>
      </a>
    </div>

    <div class="home_notice_card_content">
      <ul class="infinite-list" style="overflow: auto" infinite-scroll-delay="5000" v-if="tableData!=''">
        <li v-for="value in tableData" :key="value.noticeId" class="infinite-list-item" :style="value.state==0?one:two">
          <span
              style="position:relative;top:15px;margin-top: 10px;margin-right: 10px;font-weight: bold"
              v-if="value.noticeType==0">增发</span>
          <span
              style="position:relative;top:15px;margin-top: 10px;margin-right: 10px;font-weight: bold"
              v-else-if="value.noticeType==1">一般公告</span>
          <span
              style="position:relative;top:15px;margin-top: 10px;margin-right: 10px;font-weight: bold"
              v-else>重大事项</span>
          <span
              style="position:relative;top:15px;">{{ value.noticeTitle.substring(0, 19) }}...</span>
          <el-button type="primary" style="width: 50px;margin-top: 5px;margin-right: 5px;float: right;"
                     @click="updateNoticeOrId(value.noticeId,value)">查看
          </el-button>
        </li>
      </ul>
      <!--无数据显示-->
      <el-empty description="暂无数据" style="height: 250px;" v-if="tableData==''"></el-empty>
    </div>
  </div>
  <!--查看公告  -->
  <el-dialog
      v-model="announcement"
      title="公告查看"
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
      <el-form-item prop="noticePeople" label="发布人：" style="margin-left: 0px">
        <div style="width: 300px">{{ fromValue.noticePeople }}</div>
      </el-form-item>
      <!-- 职位 -->
      <el-form-item prop="postName" label="职位：" style="margin-left: 25px">
        <div style="width: 100px">{{ fromValue.noticePost }}</div>
      </el-form-item>
      <!-- 公告类型-->
      <el-form-item prop="noticeType" label="公告类型：">
        <div style="width: 300px" v-show="fromValue.noticeType==0">增发</div>
        <div style="width: 300px" v-show="fromValue.noticeType==1">一般公告</div>
        <div style="width: 300px" v-show="fromValue.noticeType==2">重要事项</div>
      </el-form-item>
      <!-- 公告内容 -->
      <el-form-item label="公告内容：" prop="noticeMatter" style="margin-left: 0px;">
        <div style="width: 510px">{{ fromValue.noticeMatter }}</div>
      </el-form-item>
      <el-form-item label="发布时间：" prop="noticeTime">
        <div style="width: 510px">{{ fromValue.createdTime }}</div>
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
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";

export default {
  data() {
    return {
      one: 'background: var(--el-color-danger-lighter); width: 410px;height:50px;margin-bottom: 10px;color: var(--el-color-danger);',
      two: 'background: var(--el-color-primary-light-9); width: 410px;height:50px;margin-bottom: 10p;color: var(--el-color-primary);',
      //访问路径
      url: "http://localhost:80/notice/",
      //所有的公告数据
      tableData: [],
      //表单数据
      fromValue: {},
      //弹出框关闭
      announcement: false
    }
  }, methods: {
    /*通过员工编号查询公告信息*/
    selectNoticeStaffId() {
      var _this = this
      this.axios({
        method: 'get',
        url: this.url + 'selectNoticeStaffId/' + this.$store.state.staffMessage.staffId,
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              _this.tableData = response.data.data.info
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
    /*通过公告编号修改公告员工状态*/
    updateNoticeOrId(id, value) {
      if (value.state == 0) {
        this.axios({
          method: 'put',
          url: this.url + 'updateNoticeOrId/' + id + "/" + this.$store.state.staffMessage.staffId,
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          if (response.data.code == 200) {
            if (response.data.data) {
              //如果服务是正常的
              if (response.data.data.state == 200) {
                //如果是成功
                if (response.data.data.info == "成功") {
                  //弹出对话框
                  this.announcement = true;
                  this.fromValue = value;
                  this.selectNoticeStaffId();
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
      } else {
        //弹出对话框
        this.announcement = true;
        this.fromValue = value;
      }

    },
  }, mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    this.selectNoticeStaffId();
  }
}
</script>

<style type="text/css" scoped>
@import url("../../css/navigation.css");

/deep/ .el-form-item__label {
  font-weight: bold !important;
}

/deep/ .el-button {
  width: 50px;
}

.demo-shadow-text {
  line-height: 50px;
  color: var(--el-text-color-regular);
  font-size: 14px;
}

.home_notice_card_title::before,
.home_notice_card_title::after {
  content: '';
  display: block;
}

.ant-result {
  padding: 48px 32px;
}

.ant-result-extra {
  margin-top: 32px;
  text-align: center;
}

::selection {
  color: #fff;
  background: #085fc3;
}

::selection {
  color: #fff;
  background: #366cb3;
}

.ant-result-icon {
  margin-bottom: 24px;
  text-align: center;
}

.ant-btn-background-ghost.ant-btn-primary {
  color: #366cb3;
  background-color: transparent;
  border-color: #366cb3;
  text-shadow: none;
}
</style>
