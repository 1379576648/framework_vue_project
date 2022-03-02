<!--招聘过程 面试管理-->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <div class="j-tabs">

          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="daiInterview" label="待面试">
              <recruit_zp_daiInterview/>
            </el-tab-pane>
            <el-tab-pane name="daiSecondInterview" label="面试中">
              <recruit_zp_daiSecondInterview/>

            </el-tab-pane>
            <el-tab-pane name="daiSecondInterviewPass" label="复试中">
              <recruit_zp_daiSecondInterviewPass/>
            </el-tab-pane>
            <el-tab-pane name="interviewPass" label="面试通过">
              <recruit_zp_interviewPass/>
            </el-tab-pane>
            <el-tab-pane name="InterviewElimination" label="面试淘汰库">
              <recruit_zp_InterviewElimination/>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!--        <div>-->
        <!--          <router-view/>-->
        <!--        </div>-->


      </div>
    </div>
  </div>
</template>

<script>
//待面试
import recruit_zp_daiInterview from '../recruit_management/recruit_zp_daiInterview.vue';
//面试通过
import recruit_zp_interviewPass from '../recruit_management/recruit_zp_interviewPass.vue';
//复试中
import recruit_zp_daiSecondInterview from '../recruit_management/recruit_zp_daiSecondInterview.vue';
//面试通过
import recruit_zp_daiSecondInterviewPass from '../recruit_management/recruit_zp_daiSecondInterviewPass.vue';
//面试淘汰库
import recruit_zp_InterviewElimination from '../recruit_management/recruit_zp_InterviewElimination.vue';

export default {
  //注册组件
  components: {
    //待面试
    recruit_zp_daiInterview,
    //面试中
    recruit_zp_interviewPass,
    //复试中
    recruit_zp_daiSecondInterview,
    //面试通过
    recruit_zp_daiSecondInterviewPass,
    //面试淘汰库
    recruit_zp_InterviewElimination
  },
  data() {
    return {
      isActive1: true,
      isActive2: false,
      isActive3: false,
      isActive4: false,
      isActive5: false,
      activeName: 'daiInterview',

    }
  },
  methods: {
    liback(n) {
      if (n === 1) {
        this.isActive1 = true;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
      }
      if (n === 2) {
        this.isActive1 = false;
        this.isActive2 = true;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
      }
      if (n === 3) {
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = true;
        this.isActive4 = false;
        this.isActive5 = false;
      }
      if (n === 4) {
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = true;
        this.isActive5 = false;
      }
      if (n === 5) {
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = true;
      }
    }
  },mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
  }
}

</script>

<style type="text/css" scoped>
@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");

.j-tabs {
  border-bottom: 1px solid #d9d9d9;
}

.j-tabs ul {
  margin-bottom: -2px;
  padding-left: 0px;
}

.j-tabs li {
  margin: 0;
  display: inline-block;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 0;
}

.j-tabs li a {
  display: inline-block;
  height: 54px;
  line-height: 54px;
  color: #000;
  padding: 0 21px;
  font-size: 14px;
}

.active {
  border-bottom: 1px solid #085fc3;
}

.sactive {
  color: #085fc3;
}


</style>
