<template>
	<!--
		待办事项
		-->
	<div class="home_to_do_card home_public_card">
		<div class="home_bot_tit">
			<span>
				<i class="iconfont">&#xe641;</i>
				<span  style="font-size: 14px; font-weight: bold; color: rgba(0, 0, 0, 0.65);">今日打卡</span>
			</span>
		</div>
		
		
		<section>
      <div style="height: 90%;" role="separator"
           class="ant-divider ant-divider-vertical">
        <!-- 日期选择器 -->
        <div class="date">
          <el-date-picker
              v-model="value3"
              type="date"
              placeholder="Pick a date"
              :default-value="new Date(2010, 9, 1)"
              popper-class="date"
          >
          </el-date-picker>
        </div>
        <el-button round class="be_on_duty_text ">上班</el-button>
        <span class="reality1">实际上班时间：<span>00:00:00</span></span>
        <!--  打卡开关1-->
        <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949" class="switch"/>
        <el-button round class="off_duty_text ">下班</el-button>
        <span class="reality2">实际下班时间：<span>00:00:00</span></span>
        <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ff4949" class="switch2"/>
      </div>
		</section>
	</div>
</template>

<script>
export default {
  data() {
    return {
      value1: false,
      value2: false,
    }
  }
}
</script>

<style type="text/css" scoped>
	@import url("../../css/navigation.css");


	.home_new_theme .home_to_do_card > div {
	    display: flex;
	    justify-content: space-between;
	    height: 30px;
	    line-height: 46px;
	    margin: 10px 24px;
	}

  .date {
    top: -45px;
    left: 180px;
    position: absolute;
  }

  .be_on_duty_text {
    width: 55px;
    top: -10px;
    left: 30px;
    position: absolute;
  }
  .switch{
    width: 70px;
    top: 45px;
    left: 35px;
    position: absolute;
  }
  .reality1 {
    width: 160px;
    top: 5px;
    left: 130px;
    position: absolute;
    font-size: 20px;
   }

  .off_duty_text {
    width: 55px;
    top: -10px;
    left: 525px;
    position: absolute;
  }
  .switch2{
     width: 70px;
     top: 45px;
     left: 530px;
     position: absolute;
   }
  .reality2 {
    width: 160px;
    top: 5px;
    left: 370px;
    position: absolute;
    font-size: 20px;
  }

</style>
