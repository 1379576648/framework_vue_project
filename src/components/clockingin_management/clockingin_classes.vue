<!--班次添加-->
<template>
  <!--  新增班次页面-->
  <div class="w">
    <el-form
        ref="ruleForm"
        label-position="top"
        :model="classes"
        :rules="rules"
        label-width="100px"
    >
      <el-form-item prop="classesName" label="班次名称：" style="margin-left: 20px">
        <el-input
            v-model="classes.classesName"
            placeholder="例如：日常班"
            style="width: 250px"
            @blur="inquireClasses()"
        ></el-input>
      </el-form-item>
      <el-form-item prop="Time" label="工作时间：" style="margin-left: 20px">
        <el-time-select
            v-model="classes.classesBeginDate"
            :max-time="endTime"
            class="mr-4"
            placeholder="上班时间"
            start="08:00"
            step="00:15"
            end="9:30"
        >
        </el-time-select>
        &nbsp;
        <el-time-select
            v-model="classes.classesEndDate"
            :min-time="startTime"
            placeholder="下班时间"
            start="17:00"
            step="00:15"
            end="18:30"
            @change="judgeTime(classes.classesBeginDate,classes.classesEndDate)"
        >
        </el-time-select>
      </el-form-item>
      <el-form-item>
        <div class="u">
          <el-button @click="this.$parent.$data.clockingin_classes=false">
            <el-icon>
              <i-circle-close/>
            </el-icon>
            <span>取消</span>
          </el-button>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-button type="primary" @click="submitFormClasses()">
            <!-- el-icon 图标-->
            <el-icon>
              <i-copy-document/>
            </el-icon>
            <span>提交</span>
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
  <router-view/>
</template>

<script>
import {ElMessage, ElNotification} from "element-plus";
import {ref} from 'vue'

const startTime = ref('')
const endTime = ref('')
export default {
  data() {
    return {
      //访问路径
      url: "http://localhost:80/",
      classes: {
        classesName: "",
        classesBeginDate: "",
        classesEndDate: "",
      },
      rules: {
        classesName: [
          {
            required: true,
            message: "请填写班次名字",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 添加班次方案
    submitFormClasses() {
      if (this.classes.classesName.length === 0) {
        ElMessage("请输入班次名称");
      } else if (this.classes.classesBeginDate.length === 0) {
        ElMessage("请选择上班时间");
      } else if (this.classes.classesEndDate.length === 0) {
        ElMessage("请选择下班时间");
      } else {
        this.axios({
          method: 'post',
          url: this.url + 'submitFormClasses',
          data: {
            "classesName": this.classes.classesName,
            "classesBeginDate": this.classes.classesBeginDate,
            "classesEndDate": this.classes.classesEndDate
          }
        }).then((response) => {
          console.log("添加班次方案")
          console.log(response);
          if (response.data.data.data) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
          } else if (response.data.data) {
            if (response.data.data.state == 200) {
              if (response.data.data.info == 1) {
                ElMessage({
                  showClose: true,
                  message: '新增班次成功',
                  type: 'success',
                })
                this.$parent.$data.clockingin_classes = false;
              }
            } else {
              ElNotification.warning({
                title: '提示',
                message: "服务发生雪崩",
                offset: 100,
              })
            }
          }
        })
      }
    },
    // 判断上班时间和下班时间
    judgeTime: function (beginTime, endTime) {
      var dateBegin = new Date(beginTime);
      var dateEnd = new Date(endTime);
      var dateDiff = endTime - beginTime; //时间差的毫秒数
      var hours = Math.floor(dateDiff / (3600 * 1000)); //计算出小时数
      console.log(dateBegin)
      console.log(dateEnd.getTime())
      console.log(beginTime)
      console.log(endTime)
      console.log(dateDiff)
      console.log(hours)
    },
    // 查询方案名称
    inquireClasses() {
      this.axios({
        method: 'post',
        url: this.url + 'inquireClasses',
        data: {
          "classesName": this.classes.classesName,
        }
      }).then((response) => {
        console.log("查询方案名称")
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
        } else if (response.data.data) {
          if (response.data.data.state == 200) {
            if (response.data.data.info.length !== 0) {
              ElNotification.warning({
                title: '提示',
                message: "已有相同班次名称,请重新输入",
                offset: 100,
              })
              this.classes.classesName=""
            }
          } else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.w {
  margin-top: 20px;
  border: 1px solid #e9e9e9;
}

.w:hover {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  border-color: transparent;
}

/* 调整输入框的高度 */
::v-deep .el-input__inner {
  height: 32px;
}

.u {
  margin-left: 40%;
}
</style>
