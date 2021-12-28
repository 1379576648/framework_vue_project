<template>
  <!--a
    工作日历
    -->
  <div class="home_block_card">
    <div class="j-card home_cal_t_card normal mainContent">
      <div style="width: 60%;">
        1
      </div>

      <div style="height: 90%;" role="separator"
           class="ant-divider ant-divider-vertical">
        <!-- 打卡图标 -->
        <svg t="1640400514835" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="5934" width="20" height="20">
          <path
              d="M259.498667 139.66848c13.300053 0 24.082773 10.78272 24.082773 24.082773s-10.78272 24.082773-24.082773 24.082774h-69.894827c-29.467307 0-56.108373 10.574507-75.282773 27.605333-18.433707 16.37376-29.8752 38.729387-29.8752 63.107413v572.719787c0 24.378027 11.441493 46.733653 29.8752 63.107413 19.1744 17.030827 45.815467 27.605333 75.282773 27.605334h644.79232c29.467307 0 56.108373-10.574507 75.282773-27.605334 18.433707-16.37376 29.8752-38.729387 29.8752-63.107413V278.546773c0-24.378027-11.441493-46.733653-29.8752-63.107413-19.1744-17.030827-45.815467-27.605333-75.282773-27.605333h-82.41152c-13.300053 0-24.082773-10.78272-24.082773-24.082774s10.78272-24.082773 24.082773-24.082773h82.41152c41.613653 0 79.598933 15.2576 107.26912 39.835307 28.416 25.2416 46.0544 60.288 46.0544 99.042986v572.719787c0 38.754987-17.6384 73.801387-46.0544 99.042987-27.670187 24.577707-65.655467 39.835307-107.26912 39.835306H189.60384c-41.613653 0-79.598933-15.2576-107.26912-39.835306-28.416-25.2416-46.0544-60.288-46.0544-99.042987V278.546773c0-38.754987 17.6384-73.801387 46.0544-99.042986 27.670187-24.577707 65.655467-39.835307 107.26912-39.835307h69.894827z m338.650453 0c13.300053 0 24.082773 10.78272 24.082773 24.082773s-10.78272 24.082773-24.082773 24.082774H412.59008c-13.300053 0-24.082773-10.78272-24.082773-24.082774s10.78272-24.082773 24.082773-24.082773h185.55904z"
              p-id="5935"></path>
          <path
              d="M317.6704 94.77632c0-13.300053 10.78272-24.082773 24.082773-24.082773s24.082773 10.78272 24.082774 24.082773v171.29984c0 13.300053-10.78272 24.082773-24.082774 24.082773s-24.082773-10.78272-24.082773-24.082773V94.77632zM652.125867 97.972907c0-13.300053 10.78272-24.082773 24.082773-24.082774s24.082773 10.78272 24.082773 24.082774v171.29984c0 13.300053-10.78272 24.082773-24.082773 24.082773s-24.082773-10.78272-24.082773-24.082773V97.972907zM449.119573 620.35456L703.761067 376.15104l84.865706 76.9792L449.462613 687.377067l-0.26112-0.27136-1.78176 1.706666-162.176-100.222293 68.737707-67.442347z"
              p-id="5936"></path>
        </svg>
        <h3 class="Today">今日打卡</h3>
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
        <el-button round class="be_on_duty_text ">上班:</el-button>
        <span class="reality1">实际打卡时间：<span>00:00:00</span></span>
        <!--  打卡开关1-->
        <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949" class="switch"/>
        <el-button round class="off_duty_text ">下班:</el-button>
        <span class="reality2">实际打卡时间：<span>00:00:00</span></span>
        <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ff4949" class="switch2"/>
      </div>

    </div>
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

.icon {
  top: 20px;
  left: 30px;
  position: absolute;
}

.Today {
  width: 70px;
  top: 18px;
  left: 60px;
  position: absolute;
}

.date {
  top: 70px;
  left: 30px;
  position: absolute;
}

.be_on_duty_text {
  width: 70px;
  top: 135px;
  left: 30px;
  position: absolute;
}

.off_duty_text {
  width: 75px;
  top: 250px;
  left: 30px;
  position: absolute;
}

.reality1 {
  width: 160px;
  top: 145px;
  left: 120px;
  position: absolute;
}

.reality2 {
  width: 160px;
  top: 260px;
  left: 120px;
  position: absolute;
}
.switch{
  width: 70px;
  top: 200px;
  left: 100px;
  position: absolute;
}
.switch2{
  width: 75px;
  top: 300px;
  left: 100px;
  position: absolute;
}
</style>
