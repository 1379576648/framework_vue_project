<!--转正管理-->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <span></span>
        <br/>
        <!--搜索输入框-->
        <div style="margin-left: 1161px">
          <el-row style="width: 150px;">
            <el-input v-model="seek" placeholder="搜索" size="small" @input="selectpost">
              <template #suffix>
                <el-icon class="el-input__icon">
                  <i-search/>
                </el-icon>
              </template>
            </el-input>
          </el-row>
        </div>

        <div style="margin-top:20px;margin-left:20px;" class="icon-p">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card
                  shadow="always"
                  style="
                  background-color: rgb(35, 102, 167);
                  color: white;
                  font-size: 14px;
                 
                "
              >
                <p>试用期人员</p>
                <p>2</p>
              </el-card>
            </el-col>

            <el-col :span="12" style="margin-left:-20px;">
              <el-card
                  shadow="never"
                  style="
                  background-color: rgb(233, 143, 39);
                  color: white;
                  font-size: 14px;
                  margin-left:20px;
                "
              >
                <p>转正已生效</p>
                <p>21</p>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <br/>

        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table :data="tableData" stripe style="width: 100%"
                    :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column prop="staffName" label="姓名" width="180"/>
            <el-table-column prop="staffIdentity" label="证件号码" width="180"/>
            <el-table-column prop="deptName" label="部门" width="180"/>
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
                <el-button type="text" size="small" @click="become = true,work(scope.row)">办理转正</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>


        <!-- 分页插件 -->
        <div class="demo-pagination-block">
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
              @size-change="selectpost()"
              @current-change="selectpost()"
              background
          >
          </el-pagination>
        </div>

      </div>
    </div>
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
            <el-option label="转正" value="zz" style="margin-left: 20px"></el-option>
            <el-option label="提前转正" value="tqzz" style="margin-left: 20px"></el-option>
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
            <el-button style="width: 60px" type="primary" @click="submitForm('form_1')"
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
import {ElNotification} from "element-plus";

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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
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
    //查询转正记录
    selectpost(index,row) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectpost',
        data: {
          //当前页
          'currentPage': this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          //员工名称
          "staffName": this.seek,
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
    work(row){
      this.become_1.name=row.staffName;
      this.become_1.dept=row.deptName;
      this.become_1.post=row.postName;
      this.become_1.entrydate=row.staffHiredate;
      this.become_1.tryoutdate="三个月";
    }
  },
  mounted() {
    //分页查询工作经历
    this.selectpost();
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

/* 分页的样式 */
/deep/ .demo-pagination-block {
  float: right;
  margin: 20px;
}

</style>
