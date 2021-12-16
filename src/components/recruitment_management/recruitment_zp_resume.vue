<!--人才库-->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <el-tabs v-model="activeName" style="margin-top: 10px;">

          <el-tab-pane name="value_a">
            <template #label>
              <router-link :to="{path:this.one,query:{path:this.$route.query.path}}"><div style="width: 120px;text-align: center">
                全部简历(99)
              </div></router-link>
            </template>
            <router-view/>
          </el-tab-pane>

          <el-tab-pane name="value_b">
            <template #label>
              <router-link :to="{path:this.two,query:{path:this.$route.query.path}}"><div style="width: 120px;text-align: center">
                新简历(99)
              </div> </router-link>
            </template>
            <router-view/>
          </el-tab-pane>

          <el-tab-pane name="value_c">
            <template #label>
              <router-link :to="{path:this.three,query:{path:this.$route.query.path}}"> <div style="width: 120px;text-align: center">
                候选人(99)
              </div> </router-link>
            </template>
            <router-view/>
          </el-tab-pane>

          <el-tab-pane name="value_d">
            <template #label>
              <router-link :to="{path:this.foue,query:{path:this.$route.query.path}}"><div style="width: 120px;text-align: center">
                淘汰库(99)
              </div> </router-link>
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
      activeName:'value_a',
      //路由地址
      one:'/recruitment/recruit/fullresume',
      two:'/recruitment/recruit/newresume',
      three:'/recruitment/recruit/candidate',
      foue:'/recruitment/recruit/eliminate'
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
  font-size: 14px;
  color: black;
}


</style>
