<!--核算方案 -->
<template>
  <!-- 选择部门的下拉框-->
      <div style="width: 100%;height: 22px; ">
        <el-form>
          <el-form-item label="1、选择一个部门：" prop="dept" style="margin-left: 40px">
            <el-select v-model="ruleForm.dept" placeholder="请选择部门" style="width:240px;">
              <el-option label="11" value="dept1" style="margin-left: 20px;"></el-option>
              <el-option label="02465" value="dept2" style="margin-left: 20px;"></el-option>
              <el-option label="333" value="dept3" style="margin-left: 20px;"></el-option>
            </el-select>
          </el-form-item>
        </el-form><br/>
      <span style="font-size: 14px;margin-left: 40px;margin-top: 10px">2、针对各薪资项设置核算方案</span>
      </div>

       <!-- 四个方案导航 -->
       <div style="width: 100%;">

      		<div style="width: 90%;height: 400px; margin-top: 90px;margin-left: 190px;" >

				<div  style="margin: auto;height: 200px;">

          <!--固定工资方案·-->
          <router-link :to="{path:this.regular,query:{path: this.$route.query.path}}">
				<div class="j-card j-card-bordered mainContent" style=" width: 155px;height: 195px; border: 1px solid #e8edf2; border-radius: 10px; text-align: center; display: block;float: left;margin-right: 78px;">
      			<span style="margin-top: 50px;display: block; font-size: 18px;color: black">固定工资方案
				
				</span>
				<el-skeleton :rows="5" />
				</div>
			 </router-link>

          <!--加班工资方案·-->
          <router-link :to="{path:this.callbackpay,query:{path: this.$route.query.path}}">
				<div class="j-card j-card-bordered mainContent" style=" width: 155px;height: 195px; border: 1px solid #e8edf2; border-radius: 10px; text-align: center;display: block; float: left;margin-right: 78px;">
					<span style="margin-top: 50px;display: block; font-size: 18px;">加班工资方案</span>
					<el-skeleton :rows="5" />
				</div>
         </router-link>

          <!--考勤扣款方案·-->
          <router-link :to="{path:this.attendanceplan,query:{path: this.$route.query.path}}">
				<div  class="j-card j-card-bordered mainContent" style=" width: 155px;height: 195px; border: 1px solid #e8edf2; border-radius: 10px; text-align: center;display: block; float: left;margin-right: 78px;">
					<span style="margin-top: 50px;display: block; font-size: 18px;">考勤扣款方案</span>
					<el-skeleton :rows="5" />
				</div>
          </router-link>

          <!--出差工资方案·-->
          <router-link :to="{path:this.evectionplan,query:{path: this.$route.query.path}}">
            <div  class="j-card j-card-bordered mainContent" style=" width: 155px;height: 195px; border: 1px solid #e8edf2; border-radius: 10px; text-align: center;display: block; float: left;">
              <span style="margin-top: 50px;display: block; font-size: 18px;">出差工资方案</span>
              <el-skeleton :rows="5" />
            </div>
          </router-link>

				</div>
          </div>
      		</div>
</template>

<script>
export default {
  data(){
    return{
      //固定工资
      regular:'/salary/regular',
      //加班工资
      callbackpay:'/salary/callbackpay',
      //考勤扣款
      attendanceplan:'/salary/attendanceplan',
      //出差工资
      evectionplan:'/salary/evectionplan',
      ruleForm:{
        dept:'',
      }
    }
  }
}
</script>

<style scoped>
@import url("../../css/navigation.css");
@import url("../../css/Salary.css");

</style>

