<!--薪酬结构 -->
<template>
  <div class="demo-collapse">
    <div style="width: 95%;margin: auto">
      <div class="">
        <!--      <span style="font-size: 14px;">1、选择一个部门</span>&nbsp;-->
        <!--选择部门的下拉框-->
        <el-form>
          <el-form-item label="1、选择一个部门：" prop="dept">
            <el-select v-model="ruleForm.dept" placeholder="请选择" style="width: 239px;">
              <el-option  style="margin-left: 20px;"
                          v-for="item in dept_name"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
<!--        <br>-->
<!--        <p class="font_size_p">2.根据您企业薪酬制度，选择需要的薪酬类别（勾选则表示系统需核算）</p>-->

<!--        <br>-->

<!--        <el-checkbox-group v-model="checkList">-->
<!--          <el-tooltip class="item" effect="dark" content="固定员工核算基础数据,不可更改" placement="top-start">-->
<!--            <el-icon :size="16" style="margin-left: 20px;">-->
<!--              <i-question-filled/>-->
<!--            </el-icon>-->

<!--          </el-tooltip>-->
<!--          <el-checkbox label="固定工资" disabled style=" margin-left: 20px;"/>-->
<!--          <el-checkbox label="加班工资" disabled style=" margin-left: 20px;"/>-->
<!--          <el-checkbox label="考勤扣款" style=" margin-left: 20px;"/>-->
<!--          <el-checkbox label="社保" style=" margin-left: 20px;"/>-->
<!--          <el-checkbox label="公积金" style=" margin-left: 20px;"/>-->
<!--        </el-checkbox-group>-->
      </div>
      <br/>
      <div class="">

        <span class="font_size_p">2、设置各薪酬类别下面的薪资项目（开启后在工资表中显示该项目）</span>

        <br>
        <br>
        <div class="">
          <el-collapse v-model="activeNames" @change="handleChange">

            <el-collapse-item name="2" disabled>
              <template #title>
                <h3 style="margin-left: 20px;">固定工资</h3>
                <span class="span_1_zhe">【加项】针对员工定薪、调薪等，可设置固定工资方案
                <span @click="
                this.$parent.$data.one=this.ruleForm.dept,
              this.$parent.$data.salary_checkwage=false,
              this.$parent.$data.regular=true,
              this.$parent.$data.callbackpay=false,
              this.$parent.$data.attendanceplan=false,
              this.$parent.$data.evectionplan=false,
              this.$parent.$data.salary_insertplan=false,
              this.$parent.$data.salary_insertplanthree=false,this.$parent.$data.social=false"
                      style="color: #040711;cursor: pointer">去设置</span> </span>
              </template>
            </el-collapse-item>
            <br/>

            <el-collapse-item name="3" disabled>
              <template #title>
                <h3 style="margin-left: 20px;">加班工资</h3>
                <span class="span_1_zhe">【加项】针对员工工作日、休息日、节假日加班工资，可设置加班工资方案
                  <span
                      @click="
                      this.$parent.$data.salary_checkwage=false,
              this.$parent.$data.regular=false,
              this.$parent.$data.callbackpay=true,
              this.$parent.$data.attendanceplan=false,
              this.$parent.$data.evectionplan=false,
              this.$parent.$data.salary_insertplan=false,
              this.$parent.$data.salary_insertplanthree=false,this.$parent.$data.social=false"
                      style="color: #040711;cursor: pointer">去设置</span> </span>
              </template>
            </el-collapse-item>
            <br/>


            <el-collapse-item title="Efficiency" name="4" disabled>
              <template #title>
                <h3 style="margin-left: 20px;">考勤扣款</h3>
                <span class="span_1_zhe">【加项】该部分工资，系统根据考勤扣款方案自动核算数据，可针对每项设置扣款方案
                  <span
                      @click="
                       this.$parent.$data.salary_checkwage=false,
              this.$parent.$data.regular=false,
              this.$parent.$data.callbackpay=false,
              this.$parent.$data.attendanceplan=true,
              this.$parent.$data.evectionplan=false,
              this.$parent.$data.salary_insertplan=false,
              this.$parent.$data.salary_insertplanthree=false,this.$parent.$data.social=false"
                      style="color: #040711;cursor: pointer">去设置</span></span>
              </template>
            </el-collapse-item>

            <br/>

            <el-collapse-item title="Efficiency" name="5" disabled>
              <template #title>
                <h3 style="margin-left: 20px;">出差工资</h3>
                <span class="span_1_zhe">【加项】针对员工出差，计算工资
                  <span
                      @click="
                        this.$parent.$data.salary_checkwage=false,
              this.$parent.$data.regular=false,
              this.$parent.$data.callbackpay=false,
              this.$parent.$data.attendanceplan=false,
              this.$parent.$data.evectionplan=true,
              this.$parent.$data.salary_insertplan=false,
              this.$parent.$data.salary_insertplanthree=false,
this.$parent.$data.social=false"
                      style="color: #040711;cursor: pointer">去设置</span> </span>
              </template>

            </el-collapse-item>

            <br/>
            <el-collapse-item title="Efficiency" name="5" disabled>
              <template #title>
                <h3 style="margin-left: 20px;">社保管理</h3>
                <span class="span_1_zhe">【加项】针对员工社保缴纳，在自主社保模块设置数据
                  <span
                      @click="
                                               this.$parent.$data.salary_checkwage=false,
              this.$parent.$data.regular=false,
              this.$parent.$data.callbackpay=false,
              this.$parent.$data.attendanceplan=false,
              this.$parent.$data.evectionplan=false,
              this.$parent.$data.salary_insertplan=false,
              this.$parent.$data.salary_insertplanthree=false,
this.$parent.$data.social=false,
               this.$parent.$data.social=true"
                      style="color: #040711;cursor: pointer">去设置</span> </span>
              </template>

            </el-collapse-item>
<!--            <el-collapse-item title="Efficiency" name="5" disabled>-->
<!--              <template #title>-->
<!--                <h3 style="margin-left: 20px;">公积金</h3>-->
<!--                <span class="span_1_zhe">【加项】针对员工公积金缴纳，在自主社保模块设置数据-->
<!--                  <span-->
<!--                      @click="-->
<!--                        this.$parent.$data.salary_checkwage=false,-->
<!--              this.$parent.$data.regular=false,-->
<!--              this.$parent.$data.callbackpay=false,-->
<!--              this.$parent.$data.attendanceplan=false,-->
<!--              this.$parent.$data.evectionplan=true,-->
<!--              this.$parent.$data.salary_insertplan=false,-->
<!--              this.$parent.$data.salary_insertplanthree=false"-->
<!--                      style="color: #040711;cursor: pointer">去设置</span> </span>-->
<!--              </template>-->

<!--            </el-collapse-item>-->

          </el-collapse>
        </div>
      </div>
    </div>
  </div>
  &nbsp;
</template>

<script>
import {
  defineComponent,
  ref
} from 'vue'
import {ElNotification} from "element-plus";

export default defineComponent({

  data() {
    return {
      //请求的路径
      url: "http://localhost:80/",
      one:'',
      two:'',
      checkList: '',
      activeNames: '',
      ruleForm: {
        dept: '',
      },
      dept_name:[],
    }
  },
  methods:{
    //查询部门名称
    selectSect() {
      this.axios({
        method: 'post',
        url: this.url + 'selectSect',
        data: {
          //staffId:this.tableData.staffId,
        }
      }).then((response) => {
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
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
  },
  //挂载
  mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    //查询所有部门名称
    this.selectSect();
  },
  setup() {
    const checkList = ref(['selected and disabled', 'Option A'])
    const activeNames = ref(['1'])
    const handleChange = (val) => {
      console.log(val)
    }

    return {
      checkList,
      activeNames,
      handleChange,
    }

  },

})
</script>

<style scoped>
@import url("../../css/navigation.css");
@import url("../../css/Salary.css");

/deep/ .body_1 {
  background: darkcyan;
  width: 100%;
  height: 200px;
  border-radius: 4px;
  /* font-size: 14px; */
  /*position: relative;*/
  /*overflow: hidden;*/
  /*transition: all 0.3s;*/
  /*min-height: 100%;*/
  /*min-height: 720px;*/
  /*padding: 16px;*/
  /*box-sizing: border-box;*/
  /*border: 1px solid #e9e9e9;*/

  /*padding: 0 24px;*/
  /*color: rgba(0, 0, 0, 0.65);*/
}

.demo-collapse {
  width: 100%;
  /*background: #0c9076;*/
  padding-bottom: 30px;
}


/deep/ .font_size_p {
  font-size: 14px;
}

/deep/ .span_1_zhe {
  color: rgb(153, 153, 153);
  margin-left: 60px;
}

/deep/ .ant-row {
  line-height: 22px;
  padding: 12px 0 12px 40px;
}

/deep/ .el-collapse-item__header {
  display: flex;
  align-items: center;
  height: var(--el-collapse-header-height);
  line-height: var(--el-collapse-header-height);
  /*background-color: var(--el-collapse-header-bg-color);*/
  /*color: var(--el-collapse-header-text-color);*/
  cursor: pointer;
  /*border-bottom: 1px solid var(--el-collapse-border-color);*/
  font-size: var(--el-collapse-header-font-size);
  font-weight: 500;
  transition: border-bottom-color var(--el-transition-duration);
  outline: 0;
  background-color: #e8edf2;
  border: #D1DBE5 solid 1px;


}

/deep/ .el-collapse-item__content {
  border: #D1DBE5 solid 1px;
  background-color: #e8edf2;

}

</style>
