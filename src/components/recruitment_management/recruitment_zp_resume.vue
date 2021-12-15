<!--人才库-->
<template>

  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 10px;">

          <el-tab-pane name="">
            <template #label>
              <router-link :to="{path:this.afullresume,query:{path:this.$route.query.path}}"><div style="width: 120px;text-align: center">全部简历</div></router-link>
            </template>
            <router-view/>
          </el-tab-pane>

          <el-tab-pane name="newresume">
            <template #label>
              <router-link :to="{path:this.bnewresume,query:{path:this.$route.query.path}}"><div style="width: 120px;text-align: center">新简历</div> </router-link>
            </template>
            <router-view/>
          </el-tab-pane>

          <el-tab-pane name="candidate">
            <template #label>
              <router-link :to="{path:this.ccandidate,query:{path:this.$route.query.path}}"> <div style="width: 120px;text-align: center">候选人</div> </router-link>
            </template>
            <router-view/>
          </el-tab-pane>

          <el-tab-pane name="eliminate">
            <template #label>
              <router-link :to="{path:this.deliminate,query:{path:this.$route.query.path}}"><div style="width: 120px;text-align: center">淘汰库</div> </router-link>
            </template>
            <router-view/>
          </el-tab-pane>

        </el-tabs>

      </div>
    </div>
  </div>
</template>

<script>
export  default {
  data(){
    return{
      //路由地址
      afullresume:'/recruitment/recruit/fullresume',
      bnewresume:'/recruitment/recruit/newresume',
      ccandidate:'/recruitment/recruit/candidate',
      deliminate:'/recruitment/recruit/eliminate'
    }
  }
}
</script>


<style  type="text/css" scoped>
@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");

/deep/ .el-tabs__item {
    padding: 0px 10px;
    padding-left: 36px;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: var(--el-text-color-primary);
    position: relative;
  }
/deep/.el-tabs__nav {
  white-space: nowrap;
  position: relative;
  transition: transform var(--el-transition-duration);
  float: left;
  z-index: calc(var(--el-index-normal) + 1);
  margin-left: 0px;
}

a{
  font-size: 15px;
  color: black;
}


</style>
