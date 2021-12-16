<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <span></span>
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

        <div class="payroll2-tabs">
          <ul style="margin-left: 85px">
            <router-link :to="{path:this.flat,query:{path: this.$route.query.path}}">
            <!--              <li class="active1">-->
              <li>
              <i class="iconfont i-iconfont">&#xe602;</i>
              <h3>
                <span>第一步</span>
              </h3>
              <p><span>设置薪酬结构</span></p>
            </li>
            </router-link>

            <router-link :to="{path:this.scheme,query:{path: this.$route.query.path}}">
            <li style="border: none"><i class="iconfont" style="margin-top: 52px">&#xe658;</i></li>
            <li class="" >
              <i class="iconfont">&#xe633;</i>
              <h3>
                <span>第二步</span>
              </h3>
              <p><span>设置核算方案</span></p>
            </li>
            </router-link>

            <li style="border: none"><i class="iconfont" style="margin-top: 52px">&#xe658;</i></li>
            <router-link :to="{path:this.paysheet,query:{path: this.$route.query.path}}">
            <li class="" >
              <i class="iconfont">&#xe624;</i>
              <h3>
                <span>第三步</span>
              </h3>
              <p><span>核算工资并<br/>生成工资表</span></p>
            </li>
            </router-link>
          </ul>
        </div>

        <router-view></router-view>
      </div>
    </div>
  </div>
  &nbsp;
</template>

<script>
export default {
  data(){
    return{
      flat:'/salary/flat',
      scheme:'/salary/scheme',
      paysheet:'/salary/paysheet',
    }
  }
}
</script>




<style scoped>
@import url("../../css/navigation.css");
@import url("../../css/Salary.css");
</style>