<!--转正管理-->
<template>
        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table :data="tableData" stripe style="width: 100%"
                    :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column prop="staffName" label="姓名" width="180"/>
            <el-table-column prop="staffIdentity" label="证件号码" width="180"/>
            <el-table-column prop="deptname" label="部门" width="180"/>
            <el-table-column prop="postName" label="职位" width="180"/>
            <el-table-column prop="staffHiredate" label="入职日期" width="180"/>
            <!--       <el-table-column prop="testtime" label="试用期限" width="180" />-->
            <el-table-column label="试用期限" width="180">
              <template #default="scope">
                <span>三个月</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template #default="scope">
                <el-button type="text" size="small" @click="work(scope.row),id=scope.row.staffId,abandon(id)">办理转正</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>

  <br/>
        <!-- 分页插件 -->
        <div class="demo-pagination-block" style="margin-left: 25px;margin-bottom: 20px">
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
              @size-change="selectQuick()"
              @current-change="selectQuick()"
              background
          >
          </el-pagination>
        </div>
  <div>
    <el-dialog
        v-model="become"
        title="转正"
        width="50%"
        :close-on-click-modal="false"
    >
      <el-form
          ref="form_1"
          :model="become_1"
          label-width="120px"
          :rules="rules"
      >
        <el-form-item label="员工名称 :" prop="name" style="">
          <el-input v-model="become_1.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="部门名称 :" prop="dept">
          <el-input v-model="become_1.dept" disabled></el-input>
        </el-form-item>
        <el-form-item label="职位 :">
          <el-input v-model="become_1.post" disabled></el-input>
        </el-form-item>
        <el-form-item label="入职日期 :">
          <el-input v-model="become_1.entrydate" disabled></el-input>
        </el-form-item>
        <el-form-item label="试用期限 :">
          <el-input v-model="become_1.tryoutdate" disabled></el-input>
        </el-form-item>
        <el-form-item label="转正类型" prop="type" style="width:600px">
          <el-select
              v-model="become_1.type"
              placeholder="请选择"
          >
            <el-option label="转正" value="转正" style="margin-left: 20px"></el-option>
            <el-option label="提前转正" value="提前转正" style="margin-left: 20px"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转正日期 :" prop="becomedate">
          <el-date-picker
              v-model="become_1.becomedate"
              type="date"
              placeholder="选择时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="转正备注 :">
          <el-input
              v-model="become_1.remarks"
              type="textarea"
              maxlength="500"
              show-word-limit
              prop="remarks_1"
          ></el-input>
        </el-form-item>

      </el-form>
      <template #footer>
          <span class="dialog-footer">
            <el-button style="width: 60px" type="primary" @click="updateStaffState(id),updateWorkerDate(),insertWorker(),become = false"
            >确定</el-button
            >
            <el-button style="width: 60px" @click="become = false,RestForm()">取消</el-button>
          </span>
      </template>
    </el-dialog>


  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {ElMessage, ElNotification} from "element-plus";

export default defineComponent({

  data() {
    const one = (rule, value, callback) => {
      if (new Date() > value) {
        callback(new Error("转正日期不能小于当前时间"));
      } else {
        callback();
      }
    };
    return {
      url: "http://localhost:80/",
      tableData: [],
      seek: "",
      become_1: {
        name: '',
        dept: '',
        post: '',
        entrydate: '',
        tryoutdate: '',
        type: '',
        remarks: '',
        becomedate: ''
      },
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 4, // 页大小
        total: 0, // 总页数
      },
      rules: {
        type: [
          {
            required: true,
            message: '请选择转正类型',
            trigger: 'change',
          },
        ],
        becomedate: [
          {
            required: true,
            message: '请选择转正日期',
            trigger: 'change'
          },
          {
            validator: one, trigger: "change"
          },
        ],
      }
    };
  },
  setup() {
    const become = ref(false)
    return {
      become,
    }
  },
  methods: {
    RestForm() {
      this.become_1 = {
        name: '',
        dept: '',
        post: '',
        entrydate: '',
        tryoutdate: '',
        type: '',
        remarks: '',
        becomedate: ''
      }
    },
    //快转正名单
    selectQuick() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectQuick',
        data: {
          //当前页
          'currentPage': this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              _this.tableData = response.data.data.info.records
              _this.pageInfo.total = response.data.data.info.total
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
    //获取值赋值到弹出框
    work(row){
      this.become_1.name=row.staffName;
      this.become_1.dept=row.deptname;
      this.become_1.post=row.postName;
      this.become_1.entrydate=row.staffHiredate;
      this.become_1.tryoutdate="三个月";
    },
    //添加转正
    insertWorker() {
      this.axios({
        method: 'post',
        url: this.url + 'insertWorker',
        data: {
          //员工名称
          staffName:this.become_1.name,
          //部门名称
          deptName:this.become_1.dept,
          //转正类型
          workerType:this.become_1.type,
          //转正日期
          workerDate:this.become_1.becomedate,
          //转正备注
          workerRemarks:this.become_1.remarks,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              //如果是成功
              this.selectQuick();
              ElNotification({
                title: '提示',
                message: '转正成功',
                type: 'success',
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
        } else {
          ElNotification.error({
            title: '提示',
            message: response.data.message,
            offset: 100,
          })
        }
      })
    },
    //修改员工状态为正式
    updateStaffState(id) {
      var _this = this
      this.axios({
        method: 'put',
        url: this.url + 'updateStaffState',
        data: {
          staffId: this.id,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              //如果是成功
              if (response.data.data.info == 666) {
                this.selectQuick();
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
    },
    //修改转正日期
    updateWorkerDate(id) {
      var _this = this
      this.axios({
        method: 'put',
        url: this.url + 'updateWorkerDate',
        data: {
          //员工编号
          staffId: this.id,
          //转正日期
          workerDate:this.become_1.becomedate,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              //如果是成功
              if (response.data.data.info == 666) {
                this.selectQuick();
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
    },
    abandon(id){
      this.become=true;
    },
  },
  //挂载
  created() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    //快要转正名单
    this.selectQuick();
  }
})

</script>


<style scoped>
@import url("../../css/navigation.css");

/deep/ .mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}

/deep/ .cell {
  padding-left: 10px;
  text-align: center;
  color: black;
  font-size: 12px
}

/deep/ .el-form-item {
  display: flex;
  margin-bottom: 22px;
}

/deep/ .el-card__body {
  /* padding: var(--el-card-padding); */
  padding: 10px 0;
}


/deep/ .icon-p p {
  text-align: center;
}

</style>
