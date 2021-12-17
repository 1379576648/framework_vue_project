<template>
  <div class="saas-main-content">
    <!-- 菜单 -->
    <div class="saas-main-content">
      <div class="j-tabs2">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect" router
        >
            <el-menu-item style="height: 50px;" :index="{path:this.statistics_analysis1,query:{path: this.$route.query.path}}">
              员工工资
            </el-menu-item>
            <el-menu-item style="height: 50px; " :index="{path:this.statistics_analysis2,query:{path: this.$route.query.path}}"
            >保险总额</el-menu-item>

            <el-menu-item style="height: 50px; " :index="{path:this.statistics_analysis3,query:{path: this.$route.query.path}}"
            >薪酬构成</el-menu-item
            >
          <el-menu-item style="height: 50px; " :index="{path:this.statistics_analysis4,query:{path: this.$route.query.path}}"
          >部门人工成本</el-menu-item
          >

        </el-menu>

      </div>

      <section
          class="ant-layout ant-layout-has-sider"
          style="
              min-width: 988px;
              min-height: 90vh;
              background-color: rgba(232, 239, 246, 0);
              box-shadow: rgb(121, 159, 197) 0px 7px;
            "
          id="scrollLayout"
      >
        <main style="margin:10px" class="ant-layout-content">
          <router-view  ></router-view>
        </main>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      statistics_analysis1:'/statistics/remuneration_analyze/statistics_analysis1',
      statistics_analysis2:'/statistics/remuneration_analyze/statistics_analysis2',
      statistics_analysis3:'/statistics/remuneration_analyze/statistics_analysis3',
      statistics_analysis4:'/statistics/remuneration_analyze/statistics_analysis4',

    }
  },
  methods:{
    //菜单点击事件
    handleAsideSelect(index, key, keyPath) {
      //默认激活的路由
      this.$store.state.default_route = index
      //更换默认二级路由名称版本
      this.$store.state.router_versions = this.$route.query.path
      //跳转路由 通过path 以及携带参数  参数是从一级目录传过来的
      this.$router.push({
        path: index,
        query: {path: this.$route.query.path}
      })
    }
  }

}
</script>


<style scoped>
@import url("../../css/navigation.css");
@import  url("../../css/Statistics.css");
/deep/.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}


</style>
