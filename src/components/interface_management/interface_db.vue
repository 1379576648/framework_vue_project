<template>

  <!--打卡-->
  <div class="home_to_do_card home_public_card">

    <div class="home_bot_tit">
			<span>
				<i class="iconfont">&#xe641;</i>
				<span style="font-size: 14px; font-weight: bold; color: black;"> 待办事项</span>
			</span>
    </div>
    <section>
      <div style="height: 90%;" role="separator" class="ant-divider ant-divider-vertical">
				<span class="reality1 ">
					{{ nowDate }}
				</span>
        <el-row>
          <div v-if="message==1?true:false">
            <el-button @click="increm" round class="be_on_duty_text" type="primary"
            >
              上班
            </el-button>
          </div>
          <div v-else-if="message==2?true:false">
            <el-button @click="dedate" round class="off_duty_text" type="primary"
                       v-if="two">
              下班 </el-button>
          </div>
          <el-button @click="dedate" round class="be_shift_text" type="success"
                     v-else-if="message==3?true:false">
            加班开始 </el-button>
          <el-button @click="dedate" round class="off_shift_text" type="success"
                     v-else-if="message==4?true:false">
            加班结束 </el-button>
          <el-button @click="dedate" round class="be_go_text" type="warning" disabled>
            出差开始 </el-button>
          <el-button @click="dedate" round class="off_go_text" type="warning" disabled>
            出差结束 </el-button>
          <el-button @click="dedate" round class="be_leave_text" type="danger" disabled>
            请假开始 </el-button>
          <el-button @click="dedate" round class="off_leave_text" type="danger" disabled>
            请假结束 </el-button>
        </el-row>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  toRefs
} from "vue";
export default defineComponent({
  setup() {
    const value1 = ref();
  },
  data() {
    return {
      message: 1,
      nowDate: "", // 当前日期
      oneDate: "11:40:00",

      two:true
    }
  },
  methods: {
    dedate() {
      this.message++;
      let a=new Date("2022-12-1 "+this.nowDate);
      let b=new Date("2022-12-1 "+this.oneDate);
      this.two=a > b;
    },
    increm(){
      this.message++
    },
    currentTime() {
      setInterval(this.formatDate, 500);
    },
    formatDate() {
      let date = new Date();
      let hour = date.getHours(); // 时
      hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
      let minute = date.getMinutes(); // 分
      minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
      let second = date.getSeconds(); // 秒
      second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
      this.nowDate = ` ${hour}:${minute}:${second}`;
    }
  },
  mounted() {
    this.currentTime();
  },
  // 销毁定时器
  beforeDestroy() {
    if (this.formatDate) {
      clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
    }
  }
})
</script>

<style type="text/css" scoped>
@import url("../../css/navigation.css");


.home_new_theme .home_to_do_card>div {
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

.reality1 {
  width: 70px;
  top: -10px;
  left: 280px;
  position: absolute;
  font-size: 50px;
}

.be_on_duty_text {
  width: 70px;
  top: -10px;
  left: 30px;
  position: absolute;
}

.off_duty_text {
  width: 70px;
  top: -10px;
  left: 610px;
  position: absolute;
}

.be_shift_text {
  width: 100px;
  top: -10px;
  left: 110px;
  position: absolute;
}

.off_shift_text {
  width: 100px;
  top: -10px;
  left: 490px;
  position: absolute;
}

.be_go_text {
  width: 100px;
  top: 35px;
  left: 15px;
  position: absolute;
}

.off_go_text {
  width: 100px;
  top: 35px;
  left: 580px;
  position: absolute;
}

.be_leave_text {
  width: 100px;
  top: 35px;
  left: 135px;
  position: absolute;
}

.off_leave_text {
  width: 100px;
  top: 35px;
  left: 470px;
  position: absolute;
}
</style>
