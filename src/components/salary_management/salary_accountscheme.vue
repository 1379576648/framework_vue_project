<!--核算方案 -->
<template>
  <!-- 选择部门的下拉框-->
  <div style="width: 100%;height: 22px; ">
    <el-form>
      <el-form-item label="1、选择一个部门：" prop="dept" style="margin-left: 40px">
        <el-select v-model="ruleForm.dept" placeholder="请选择部门" style="width:240px;">
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
    <br/>
    <span style="font-size: 14px;margin-left: 40px;margin-top: 10px">2、针对各薪资项设置核算方案</span>
  </div>

  <!-- 四个方案导航 -->
  <div style="width: 100%;">

    <div style="width: 90%;height: 400px; margin-top: 90px;margin-left: 190px;">

      <div style="margin: auto;height: 200px;">

        <!--固定工资方案·-->
        <div class="j-card j-card-bordered mainContent"
             style=" width: 155px;height: 195px; border: 1px solid #e8edf2; border-radius: 10px; text-align: center; display: block;float: left;margin-right: 78px;" @click="this.$parent.$data.one=this.ruleForm.dept,this.$parent.$data.salary_checkwage==false,this.$parent.$data.callbackpay==false,this.$parent.$data.attendanceplan==false,this.$parent.$data.evectionplan==false,this.$parent.$data.regular=true">
      			<span style="margin-top: 50px;display: block; font-size: 18px;color: black">固定工资方案
				
				</span>
          <el-skeleton :rows="5"/>
        </div>

        <!--加班工资方案·-->
        <div class="j-card j-card-bordered mainContent"
             style=" width: 155px;height: 195px; border: 1px solid #e8edf2; border-radius: 10px; text-align: center;display: block; float: left;margin-right: 78px;" @click="this.$parent.$data.salary_checkwage==false,this.$parent.$data.callbackpay=true,this.$parent.$data.attendanceplan==false,this.$parent.$data.evectionplan==false,this.$parent.$data.regular=false">
          <span style="margin-top: 50px;display: block; font-size: 18px;">加班工资方案</span>
          <el-skeleton :rows="5"/>
        </div>

        <!--考勤扣款方案·-->
        <div class="j-card j-card-bordered mainContent"
             style=" width: 155px;height: 195px; border: 1px solid #e8edf2; border-radius: 10px; text-align: center;display: block; float: left;margin-right: 78px;"  @click="this.$parent.$data.salary_checkwage==false,this.$parent.$data.callbackpay=false,this.$parent.$data.attendanceplan=true,this.$parent.$data.evectionplan==false,this.$parent.$data.regular=false">
          <span style="margin-top: 50px;display: block; font-size: 18px;">考勤扣款方案</span>
          <el-skeleton :rows="5"/>
        </div>

        <!--出差工资方案·-->
        <div class="j-card j-card-bordered mainContent"
             style=" width: 155px;height: 195px; border: 1px solid #e8edf2; border-radius: 10px; text-align: center;display: block; float: left;" @click="this.$parent.$data.salary_checkwage==false,this.$parent.$data.callbackpay=false,this.$parent.$data.attendanceplan=false,this.$parent.$data.evectionplan=true,this.$parent.$data.regular=false  ">
          <span style="margin-top: 50px;display: block; font-size: 18px;">出差工资方案</span>
          <el-skeleton :rows="5"/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {ElNotification} from "element-plus";

export default {
  data() {
    return {
      //请求的路径
      url: "http://localhost:80/",
      dept_name:[],
      ruleForm: {
        dept: '',
      }
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
  },
  //挂载
  mounted() {
    //查询所有部门名称
    this.selectSect();
  }
}
</script>

<style scoped>
@import url("../../css/navigation.css");
@import url("../../css/Salary.css");

</style>

