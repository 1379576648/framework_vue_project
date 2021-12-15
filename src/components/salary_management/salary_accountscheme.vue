
<template>
 <!--        <div style="width: 80%;margin:auto; margin-top: 20px">-->
 <!--          <div style="width:100%;margin: auto">-->
 <!--            <div class="icon-div" style="display: inline-block;padding: 0px 80px">-->
 <!--                 <el-button plain  style="width: 145px;height: 188px;  border-radius: 10px;">-->
 <!--                    <i class="iconfont">&#xe602;</i>-->
 <!--                   <h3>第一步</h3>-->
 <!--                   <br/>-->
 <!--                    <p style="font-size: 14px;">设置薪酬结构</p>-->
 <!--                  </el-button>-->
 <!--            </div>-->
 
 
 <!--            <i class="iconfont">&#xe658;</i>-->
 <!--            <div class="icon-div" style="display: inline-block;padding: 0px 80px">-->
 <!--                <el-button plain  style="width: 145px;height: 188px;  border-radius: 10px;">-->
 <!--                  <i class="iconfont">&#xe633;</i>-->
 <!--                  <h3>第二步</h3>-->
 <!--                  <br/>-->
 <!--                  <p style="font-size: 14px;">设置核算方案</p>-->
 <!--                </el-button>-->
 <!--            </div>-->
 
 
 <!--            <i class="iconfont">&#xe658;</i>-->
 
 <!--            <div class="icon-div" style="display: inline-block;padding: 0px 80px">-->
 <!--              <router-link to="/archive">-->
 <!--              <el-button plain  style="width: 145px;height: 188px;  border-radius: 10px;">-->
 <!--                <i class="iconfont">&#xe624;</i>-->
 <!--                <h3>第三步</h3>-->
 <!--                <br/>-->
 <!--                <p style="font-size: 14px;">核算工资并生成工资表</p>-->
 <!--              </el-button>-->
 <!--              </router-link>-->
 <!--            </div>-->
 
 
 <!--            </div>-->
 <!--        </div>-->

<!--         <div class="payroll2-tabs">-->
<!--           <ul style="margin-left: 85px">-->
<!--             <router-link to="/construction">-->
<!--               <li class="">-->
<!--                 <i class="iconfont i-iconfont">&#xe602;</i>-->
<!--                 <h3>-->
<!--                   <span>第一步</span>-->
<!--                 </h3>-->
<!--                 <p><span>设置薪酬结构</span></p>-->
<!--               </li>-->
<!--             </router-link>-->

<!--             <router-link to="/salary2">-->
<!--               <li style="border: none"><i class="iconfont" style="margin-top: 52px">&#xe658;</i></li>-->
<!--               <li class="">-->
<!--                 <i class="iconfont">&#xe633;</i>-->
<!--                 <h3>-->
<!--                   <span>第二步</span>-->
<!--                 </h3>-->
<!--                 <p><span>设置核算方案</span></p>-->
<!--               </li>-->
<!--             </router-link>-->

<!--             <li style="border: none"><i class="iconfont" style="margin-top: 52px">&#xe658;</i></li>-->
<!--             <router-link to="/archive">-->
<!--               <li class="">-->
<!--                 <i class="iconfont">&#xe624;</i>-->
<!--                 <h3>-->
<!--                   <span>第三步</span>-->
<!--                 </h3>-->
<!--                 <p><span>核算工资并<br/>生成工资表</span></p>-->
<!--               </li>-->
<!--             </router-link>-->
<!--           </ul>-->
<!--         </div>-->

    
      <div style="width: 100%;height: 22px; ">
        <el-form>
          <el-form-item label="1、选择一个部门：" prop="region" style="margin-left: 40px">
            <el-select v-model="ruleForm.region" placeholder="请选择部门" style="width:240px;">
              <el-option label="11" value="shanghai1" style="margin-left: 20px;"></el-option>
              <el-option label="02465" value="beijing" style="margin-left: 20px;"></el-option>
              <el-option label="333" value="shanghai" style="margin-left: 20px;"></el-option>
            </el-select>
          </el-form-item>
        </el-form><br/>
      <span style="font-size: 14px;margin-left: 40px;margin-top: 10px">2、针对各薪资项设置核算方案</span>
      </div>
       <div style="width: 100%;">
      		<div style="width: 90%;height: 400px; margin-top: 90px;margin-left: 190px;" >
				<div  style="margin: auto;height: 200px;">
          <router-link :to="{path:this.regular,query:{path: this.$route.query.path}}">
				<div class="j-card j-card-bordered mainContent" style=" width: 155px;height: 195px; border: 1px solid #e8edf2; border-radius: 10px; text-align: center; display: block;float: left;margin-right: 78px;">
      			<span style="margin-top: 50px;display: block; font-size: 18px;color: black">固定工资方案
				
				</span>
				<el-skeleton :rows="5" />
				</div>
			 </router-link>

          <router-link :to="{path:this.callbackpay,query:{path: this.$route.query.path}}">
				<div class="j-card j-card-bordered mainContent" style=" width: 155px;height: 195px; border: 1px solid #e8edf2; border-radius: 10px; text-align: center;display: block; float: left;margin-right: 78px;">
					<span style="margin-top: 50px;display: block; font-size: 18px;">加班工资方案</span>
					<el-skeleton :rows="5" />
				</div>
         </router-link>

          <router-link :to="{path:this.attendanceplan,query:{path: this.$route.query.path}}">
				<div  class="j-card j-card-bordered mainContent" style=" width: 155px;height: 195px; border: 1px solid #e8edf2; border-radius: 10px; text-align: center;display: block; float: left;margin-right: 78px;">
					<span style="margin-top: 50px;display: block; font-size: 18px;">考勤扣款方案</span>
					<el-skeleton :rows="5" />
				</div>
          </router-link>

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
      regular:'/salary/regular',
      callbackpay:'/salary/callbackpay',
      attendanceplan:'/salary/attendanceplan',
      evectionplan:'/salary/evectionplan',
      ruleForm:{
        region:'',
      }
    }
  }
}
</script>

<style scoped>
@import url("../../css/navigation.css");
@import url("../../css/Salary.css");

</style>

