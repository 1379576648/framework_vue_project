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

              <el-form :model="tableData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div style="display: inline-block;">

                  <el-form-item label="姓名：" prop="name">
                    <el-select v-model="ruleForm.name" placeholder="请选择" style="width: 239px;">
                      <el-option label="88" value="xm" style="margin-left: 20px;"></el-option>
                      <el-option label="小花" value="xm2" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item><br/>

                  <el-form-item label="调动前部门：" prop="formerdept">
                    <el-input v-model="ruleForm.formerdept" style="width:240px" disabled></el-input>
                  </el-form-item><br/>

                  <el-form-item label="调动前职位：" prop="formerpost">
                    <el-input v-model="tableData.transferRawpostName" style="width:240px" disabled></el-input>
                  </el-form-item><br/>

                  <el-form-item label="生效日期：" prop="takedate">
                    <el-col :span="11">
                      <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.takedate" style="width: 240px;"></el-date-picker>
                    </el-col>
                  </el-form-item>
                </div>
                <div style="display: inline-block;position: absolute;left:500px;" >
                  <el-form-item label="异动类型：" prop="type">
                    <el-select v-model="ruleForm.type" placeholder="请选择活动区域" style="width:240px;">
                      <el-option label="调岗" value="tg" style="margin-left: 20px;"></el-option>
                      <el-option label="普升" value="ps" style="margin-left: 20px;"></el-option>
                      <el-option label="降职" value="jj" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item><br/>

                  <el-form-item label="调动后部门：" prop="transferdept">
                    <el-input v-model="ruleForm.transferdept" style="width:240px"></el-input>
                  </el-form-item><br/>

                  <el-form-item label="调动后职位：" prop="transferpost">
                    <el-input v-model="ruleForm.transferpost" style="width:240px"></el-input>
                  </el-form-item>

                </div>

                <div style="width:25%;height: 50px;margin: auto;margin-top: 20px;">
                  <el-button @click="RestForm(),changesadd=!changesadd" style="width: 60px;">取消</el-button>
                  <el-button  type="primary" style="width: 60px;" @click="submitForm('ruleForm')">提交</el-button>
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
// import {ref} from "vue/dist/vue";
import { defineComponent, ref } from 'vue'
import {ElNotification} from "element-plus";
export default defineComponent({
  data(){
    const one = (rule, value, callback) => {
      if (new Date()>value){
        callback(new Error("生效日期不能小于当前时间"));
      }else{
        callback();
      }

    };
    return{
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
      ruleForm: {
        name: '',
        formerdept: '',
        formerpost: '',
        takedate: '',
        type: '',
        transferdept: '',
        transferpost: ''
      },
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
      radio:"",
      tableData: [],
    }
  },
  methods: {
    getCurrentRow(row){ //获取选中数据this.templateSelection = row;
    },
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
    RestForm(){
      this.ruleForm= {
        name: '',
            formerdept: '',
            formerpost: '',
            takedate: '',
            type: '',
            transferdept: '',
            transferpost: ''
      }
    },
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
  },
  mounted() {
    this.selectTransfer();
  },
  setup() {
    const become = ref(false)
    return{
      become,
    }
  }


})
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
