<!--调动管理页面-->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <span></span>
        <br />
        <div style="width:95%;background: #e8edf2;padding-top: 30px;margin: auto;" v-show="changesadd">
          <div style="width: 90%;margin: auto;">
            <h3>
              <span>人事异动</span>
              -
              <span>添加</span>
            </h3>
            <div style="width: 80%;margin: auto;margin-top: 30px;position: relative;padding-bottom:30px ">

              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div style="display: inline-block;">

                  <el-form-item label="姓名：" prop="name">
                    <el-select v-model="tableData.staffName" placeholder="请选择" style="width: 239px;" @change="selectTransferByName(staffName=this.tableData.staffName)">
                      <el-option  style="margin-left: 20px;"
                                  v-for="item in staff_name"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item><br/>

                  <el-form-item label="调动前部门：" prop="formerdept">
                    <el-input v-model="tableDatas.deptName" style="width:240px" disabled></el-input>
                  </el-form-item><br/>

                  <el-form-item label="调动前职位：" prop="formerpost">
                    <el-input v-model="tableDatas.postName" style="width:240px" disabled></el-input>
                  </el-form-item><br/>

                  <el-form-item label="生效日期：" prop="takedate">
                    <el-col :span="11">
                      <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.takedate" style="width: 240px;"></el-date-picker>
                    </el-col>
                  </el-form-item>
                </div>
                <div style="display: inline-block;position: absolute;left:500px;" >
                  <el-form-item label="异动类型：" prop="type">
                    <el-select v-model="ruleForm.type" placeholder="请选择" style="width:240px;">
                      <el-option label="调岗" value="调岗" style="margin-left: 20px;"></el-option>
                      <el-option label="普升" value="普升" style="margin-left: 20px;"></el-option>
                      <el-option label="降职" value="降职" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item><br/>

                  <el-form-item label="调动后部门：" prop="transferdept">
                    <el-select v-model="ruleForm.transferdept" placeholder="请选择" style="width: 239px;">
                      <el-option  style="margin-left: 20px;"
                                  v-for="item in dept_name"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item><br/>

                  <el-form-item label="调动后职位：" prop="transferpost">
                    <el-select v-model="ruleForm.transferpost" placeholder="请选择" style="width: 239px;">
                      <el-option  style="margin-left: 20px;"
                                  v-for="item in post_name"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item><br/>

                  <el-form-item label="备注：">

                    <el-form-item prop="rzgs" style="width:240px;">
                      <el-input type="textarea" v-model="ruleForm.remark" style="width: 100%;"></el-input>
                    </el-form-item>

                  </el-form-item>

                </div>

                <div style="width:25%;height: 50px;margin: auto;margin-top: 20px;">
                  <el-button @click="RestForm(),changesadd=!changesadd" style="width: 60px;">取消</el-button>
                  <el-button  type="primary" style="width: 60px;" @click="updateDeptName(deptId=this.tableDatas.deptId),insertTransfer(),changesadd=!changesadd">提交</el-button>
                </div>

              </el-form>
            </div>
          </div>

        </div>
        <div style="width:100%;height: 100px;position: relative  ">
          <button @click="changesadd=!changesadd" type="button" class="ant-btn ant-btn-primary" style="position: absolute;left:20px;top:40px;">
            <i aria-label="图标: plus" class="anticon anticon-plus">
              <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
              </svg></i>
            <span>新增</span>
          </button>
        </div>
          <!--搜索输入框-->
          <div style="margin-left: 1155px;margin-top: -57px;">
          <el-row style="width: 150px;">
            <el-input v-model="seek" placeholder="搜索" size="small" @input="selectTransfer">
              <template #suffix @click="become = true">
                <el-icon class="el-input__icon"><i-search /></el-icon>
              </template>
            </el-input>
          </el-row>
            </div>

<br/>
        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table :data="tableData" stripe style="width: 100%"
                    :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column prop="staffName" label="姓名" width="180" />
            <el-table-column prop="transferType" label="异动类型" width="180" />
            <el-table-column prop="createdDeptName" label="原部门" width="180" />
            <el-table-column prop="updatedDeptName" label="变动后部门" width="180" />
            <el-table-column prop="transferRawpostName" label="原职位" width="180" />
            <el-table-column prop="transferAfterpostName" label="变动后职位" width="180" />
            <el-table-column prop="takeEffectDate" label="生效时间" width="" />
          </el-table>
        </div>
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
            @size-change="selectTransfer()"
            @current-change="selectTransfer()"
            background
        >
        </el-pagination>
      </div>
<!--      <div>-->
<!--        <el-dialog-->
<!--            v-model="become"-->
<!--            title="选择员工"-->
<!--            width="50%"-->
<!--            :close-on-click-modal="false">-->

<!--          &lt;!&ndash;搜索输入框&ndash;&gt;-->
<!--          <el-row style="width: 150px;margin-left:528px;">-->
<!--            <el-input v-model="seek2" placeholder="搜索" size="small">-->
<!--              <template #suffix @click="become = true">-->
<!--                <el-icon class="el-input__icon"><i-search /></el-icon>-->
<!--              </template>-->
<!--            </el-input>-->
<!--          </el-row>-->

<!--          <el-table-->
<!--              :data="deptData"-->
<!--              height="250"-->
<!--              style="width: 100%;margin-top: 20px;">-->
<!--            <el-table-column width="50" type="selection">-->

<!--            </el-table-column>-->

<!--            <el-table-column-->
<!--                prop="name"-->
<!--                label="姓名"-->
<!--                width="180">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                prop="dept"-->
<!--                label="部门"-->
<!--                width="180">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                prop="zw"-->
<!--                label="职位">-->
<!--            </el-table-column>-->
<!--          </el-table>-->

<!--          <div style="margin-top: 30px;margin-left:280px">-->
<!--            <el-button @click="become=false" style="width: 60px;">取消</el-button>-->
<!--            <el-button type="primary" style="width: 60px;">确定</el-button></div>-->

<!--        </el-dialog>-->
<!--      </div>-->

    </div>
  </div>
</template>

<script>
import {ElMessage, ElNotification} from "element-plus";
export default{
  data(){
    //对生效日期做判断
    const one = (rule, value, callback) => {
      if (new Date()>value){
        callback(new Error("生效日期不能小于当前时间"));
      }else{
        callback();
      }

    };
    return{
      //请求的路径
      url: "http://localhost:80/",
      seek:"",
      seek2:'',
      changesadd:false,
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },
      //新增调动的表单
      ruleForm: {
        takedate: '',
        type: '',
        remark:'',
        transferdept: '',
        transferpost:'',
      },
      //验证
      rules: {
        takedate: [
          {
            required: true,
            message: '请选择生效日期',
            trigger: 'change',
          },
          {
            validator: one, trigger: "change"
          }
        ],
        type:[
          {
            required:true,
            message:'请选择异动类型',
            trigger:'change',
          }
        ]
      },
      //radio:"",
      //表格数据
      tableData: [],
      tableDatas: {},
      //员工名称
      staff_name:[],
      //部门名称
      dept_name:[],
      //职位名称
      post_name:[],
    }
  },
  methods: {
    //清空表单
    RestForm(){
      this.ruleForm= {
            takedate: '',
            type: '',
            transferdept: '',
            transferpost: '',
            remark:'',
      }
    },
    //分页查询调动管理
    selectTransfer() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectTransfer',
        data: {
          //当前页
          'currentPage': this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
          //名称
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
    //查询所有的员工名称
    selectStaffName() {
      this.axios({
        method: 'post',
        url: this.url + 'selectStaffName',
        data: {
          staffId:this.tableData.staffId,
        }
      }).then((response) => {
        console.log("查询员工名称成功")
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
          //如果服务没有关闭
        } else if (response.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            //初始化
            this.staff_name = [];
            //循环部门列表
            for (let i = 0; i < response.data.data.info.length; i++) {
              //一个一个存起来
              this.staff_name.push({
                value: response.data.data.info[i].staffName,
                label: response.data.data.info[i].staffName
              })
            }

          }
        }
      })
    },
    //查询部门名称
    selectSect() {
      this.axios({
        method: 'post',
        url: this.url + 'selectSect',
        data: {
          staffId:this.tableData.staffId,
        }
      }).then((response) => {
        console.log("查询部门名称成功")
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
          //如果服务没有关闭
        } else if (response.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            //初始化
            this.dept_name = [];
            //循环部门列表
            for (let i = 0; i < response.data.data.info.length; i++) {
              //一个一个存起来
              this.dept_name.push({
                value: response.data.data.info[i].deptName,
                label: response.data.data.info[i].deptName
              })
            }

          }
        }
      })
    },
    //查询职位名称
    selectJob() {
      this.axios({
        method: 'post',
        url: this.url + 'selectJob',
        data: {
          staffId:this.tableData.staffId,
        }
      }).then((response) => {
        console.log("查询职位名称成功")
        console.log(response);
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
          //如果服务没有关闭
        } else if (response.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            //初始化
            this.post_name = [];
            //循环部门列表
            for (let i = 0; i < response.data.data.info.length; i++) {
              //一个一个存起来
              this.post_name.push({
                value: response.data.data.info[i].postName,
                label: response.data.data.info[i].postName
              })
            }

          }
        }
      })
    },
    //根据名称查询部门名称和职位名称
    selectTransferByName(staffName) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectTransferByName',
        data:{
          staffName:this.tableData.staffName,
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
            _this.tableDatas = response.data.data.info[0]
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
    //添加调动记录
    insertTransfer() {
      this.axios({
        method: 'post',
        url: this.url + 'insertTransfer',
        data: {
          //员工姓名
          staffName:this.tableData.staffName,
          //异动类型
          transferType:this.ruleForm.type,
          //调动前部门
          createdDeptName:this.tableDatas.deptName,
          //调动后部门
          updatedDeptName:this.ruleForm.transferdept,
          //调动前职位
          transferRawpostName:this.tableDatas.postName,
          //调动后职位
          transferAfterpostName:this.ruleForm.transferpost,
          //生效日期
          takeEffectDate:this.ruleForm.takedate,
          //备注
          transferRemark:this.ruleForm.remark,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("添加成功")
        console.log(response)
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
          if (response.data.code == 200) {
            //如果是成功
            if (response.data.data == 1) {
              ElNotification({
                title: '提示',
                message: '添加成功',
                type: 'success',
              })
              this.selectTransfer()
            } else {
              ElMessage({
                type: 'warning',
                message: '添加失败',
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
    //修改部门
    updateDeptName(deptId) {
      var _this = this
      this.axios({
        method: 'put',
        url: this.url + 'updateDeptName',
        data: {
          //部门编号
          deptId:this.tableDatas.deptId,
          //部门名称
          deptName:this.ruleForm.transferdept,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("修改状态")
        console.log(response)
        if (response.data.code === 200 && response.data.data === 666) {
        } else if (response.data.data === 100) {
        } else {
        }
      }).catch(function (error) {
        console.log("失败")
        console.log(error);
      });
    },
  },
  //挂载
  created() {
    //查询所有员工名称
    this.selectStaffName();
    //查询所有部门名称
    this.selectSect();
    //查询所有职位名称
    this.selectJob();
    //根据名称查询部门名称和职位名称
    // alert(this.tableData.staffName)
    // this.selectTransferByName(this.tableData.staffName);
  },
  mounted() {
    //分页查询调动管理
    this.selectTransfer();
  },
  // setup() {
  //   const become = ref(false)
  //   return{
  //     become,
  //   }
  // }


}
</script>


<style scoped>
@import url("../../css/navigation.css");
/deep/.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}
/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
  font-size: 12px
}
/* 分页的样式 */
/deep/.demo-pagination-block {
  float: right;
  margin: 20px;
}

.name_tb{
  width:240px;
  height:40px;
  border:1px solid silver;
  border-radius: 3px;
  background: white;
  position: relative;
}


@font-face {
  font-family: 'iconfont';  /* Project id 2982823 */
  src: url('//at.alicdn.com/t/font_2982823_fi6h9uqcpu6.woff2?t=1639378694122') format('woff2'),
  url('//at.alicdn.com/t/font_2982823_fi6h9uqcpu6.woff?t=1639378694122') format('woff'),
  url('//at.alicdn.com/t/font_2982823_fi6h9uqcpu6.ttf?t=1639378694122') format('truetype');
}

</style>
