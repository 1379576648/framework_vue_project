<!--考勤记录-->
<template>
  <!--  考勤记录页面-->
  <div class="head">
    <div class="head-right">
      <!--  搜索框-->
      <el-input v-model="staffName" placeholder="填写需要查询的！" style="width: 300px;margin-left: 10px;">
        <template #prepend>
          <el-select v-model="select" placeholder="查询" style="width: 80px">
            <el-option label="名称" value="名称"></el-option>
          </el-select>
        </template>
        <template #append>
          <el-button @click="selcetAttendanceRecord()">
            <el-icon style="font-size: 16px">
              <i-search/>
            </el-icon>
          </el-button>
        </template>
      </el-input>
      &nbsp;
      &nbsp;
      <el-upload
          :action="this.url1"
          style="display: inline-block"
          :show-file-list="false"
          accept=".xlsx"
          :on-success="ExcelImport"
          :before-upload="beforeUpload"
      >
        <el-button size="medium">
          <el-icon style="font-size: 18px">
            <i-folder-opened/>
          </el-icon>
          导入
        </el-button>
      </el-upload>
    </div>
    <div class="select">
      <span style="margin-top:2px">部门：</span>
      <!-- 查询所有部门-->
      <el-checkbox v-model="deptNameTwo" v-for="item in deptName" :label="item.label"
                   :value="item.label" label="人事部" size="medium"></el-checkbox>
    </div>
  </div>
  <!--表格-->
  <div class="bottom">
    <el-table :data="tableData" stripe sortable border style="width: 100%;" height="297">
      <el-table-column prop="staffName" fixed label="员工名称" width="100"/>
      <el-table-column prop="deptName" fixed label="员工部门" width="100"/>
      <el-table-column align="center" v-for="(item,index) in one" :key="index + item" :label="item.iName"
                       :prop="index+1">
      </el-table-column>
    </el-table>
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
          @size-change="selcetAttendanceRecord()"
          @current-change="selcetAttendanceRecord()"
          @prev-click="selcetAttendanceRecord()"
          @next-click="selcetAttendanceRecord()">
        >
      </el-pagination>
    </div>
  </div>
</template>


<script>
import {ElMessage, ElNotification} from "element-plus";

export default {
  data() {
    return {
      //访问路径
      url: "http://localhost:80/",
      input3: "",
      select: "",
      tableData: [],
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },
      // 导入地址
      url1: "http://localhost:80/importCardRecord/",
      // 当前日期
      NewDate: [],
      one: [],
      // 总裁名称
      president: "",
      deptName: [],
      // 搜索框名称
      staffName: "",
      // 部门名称
      deptNameTwo: [],
    };

  },
  methods: {
    // 导入判断
    beforeUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      const whiteList = ["xls", "xlsx"];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error('上传文件只能是xls、xlsx格式');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB');
        return false;
      }
    },
    // 导入
    ExcelImport(response) {
      console.log("登录")
      console.log(response)
      if (response.code == 200) {
        //如果服务是正常的
        if (response.data.state == 200) {
          if (response.data.info == 99) {
            ElMessage({
              type: 'success',
              message: `导入成功`,
            })
            this.$store.commit("updateToken", response.data.data.token);
          } else {
            ElNotification.error({
              title: '提示',
              message: response.data.info,
              offset: 100,
            })
          }

        } else {
          ElNotification.error({
            title: '提示',
            message: response.data.info,
            offset: 100,
          })
        }
      } else {
        ElNotification.error({
          title: '提示',
          message: response.data.message,
          offset: 100,
        })
      }
    },
    // 查询总裁
    selectpresident() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectpresident',
      }).then((response) => {
        console.log("查询总裁成功")
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              _this.president = response.data.data.info;
              this.$store.commit("updateToken", response.data.data.token);
              window.setTimeout(this.selcetAttendanceRecord, 500);
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
    // 查询当月所有考勤记录
    selcetAttendanceRecord() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selcetAttendanceRecord',
        data: {
          //当前页
          "currentPage": this.pageInfo.currenPage,
          //页大小
          "pageSize": this.pageInfo.pagesize,
          // 总裁
          "staffName": this.president[0].staffname,
          // 查询员工名称条件
          "staffName1": this.staffName,
          // 部门名称
          "deptNameTwo": this.deptNameTwo,
        }
      }).then((response) => {
        console.log("查询当月所有考勤记录")
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              this.tableData = response.data.data.info.records;
              this.pageInfo.total = response.data.data.info.total;
              this.one = [];
              for (let i = 0; i < response.data.data.info.records[0].list.length; i++) {
                let two = {
                  i: i + 1,
                  iName: response.data.data.info.records[0].list[i].moth
                }
                this.one.push(two)
              }
              for (let i = 0; i < response.data.data.info.records.length; i++) {
                for (let j = 0; j < response.data.data.info.records[i].list.length; j++) {
                  response.data.data.info.records[i][j + 1] = response.data.data.info.records[i].list[j].checkState
                }
              }

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
    // 查询所有部门
    selectDeptAll() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectDeptAll',
      }).then((response) => {
        console.log("查询所有部门")
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              // 初始化
              this.deptName = [];
              for (let i = 0; i < response.data.data.info.length; i++) {
                //一个一个存起来
                this.deptName.push({
                  value: response.data.data.info[i].deptId,
                  label: response.data.data.info[i].deptName
                })
              }
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
  }, created() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    // 查询总裁
    this.selectpresident();
    this.selectDeptAll();
  }
};

</script>
<style>
</style>
<style scoped>
/*/deep/.el-table__header-wrapper{*/
/*  overflow:unset  !important;*/
/*}*/
/*/deep/ .el-table{*/
/*  overflow-x: scroll !important;*/
/*}*/
.head {
  margin-top: 7px;
  border: 1px solid #e9e9e9;
  margin-left: 20px;
  margin-right: 5px;
  margin-bottom: 10px;
}

.head:hover {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  border-color: transparent;
}

.head-right {
  margin-top: 10px;
}

.select {
  margin-left: 15px;
  margin-top: 10px;
}

.selects {
  margin-left: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.bottom {
  margin-top: 27px;
  border: 1px solid #e9e9e9;
  margin-left: 20px;
  margin-right: 5px;
  margin-bottom: 10px;
  padding: 1%;
}

.bottom:hover {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  border-color: transparent;
}

.demo-pagination-block {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>