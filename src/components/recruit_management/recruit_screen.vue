<!-- 简历赛选 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <div class="j-tabs">
          <!--          <ul>-->

          <!--            <li @click="liback(1)">-->
          <!--              <div v-bind:class="{active:isActive1}">-->
          <!--                <router-link :to="{path:this.one,query:{path:this.$route.query.path}}">-->
          <!--                  <span v-bind:class="{sactive:isActive1}">面试候选人 (99)</span>-->
          <!--                </router-link>-->
          <!--              </div>-->
          <!--            </li>-->


          <!--            <li @click="liback(2)">-->
          <!--              <div v-bind:class="{active:isActive2}">-->
          <!--                <router-link :to="{path:this.two,query:{path:this.$route.query.path}}">-->
          <!--                  <span v-bind:class="{sactive:isActive2}">已邀约 (99)</span>-->
          <!--                </router-link>-->
          <!--              </div>-->
          <!--            </li>-->

          <!--          </ul>-->
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="candidate" label="面试候选人">
              <recruit_candidate/>
            </el-tab-pane>
            <el-tab-pane name="Invited" label="已邀约">
              <recruit_Invited/>
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
//面试候选人
import recruit_candidate from '../recruit_management/recruit_candidate.vue';
//已邀约
import recruit_Invited from '../recruit_management/recruit_Invited.vue';

export default {
  //注册组件
  components: {
    //面试候选人
    recruit_candidate,
    //已邀约
    recruit_Invited,
  },
  data() {
    return {
      isActive1: true,
      isActive2: false,
      activeName: 'candidate'

    }
  },
  methods: {
    liback(n) {
      if (n === 1) {
        this.isActive1 = true;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
      }
      if (n === 2) {
        this.isActive1 = false;
        this.isActive2 = true;
        this.isActive3 = false;
        this.isActive4 = false;
      }

    }
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
