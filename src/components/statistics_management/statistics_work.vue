<template>
  <div class="saas-main-content">
    <!-- 菜单 -->
    <div class="saas-main-content">
      <div class="j-tabs2">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
          <router-link :to="{path:this.statistics_work1,query:{path: this.$route.query.path}}" style="text-decoration: none">
            <el-menu-item style="height: 50px;" index="1">
              出勤分析
            </el-menu-item>
          </router-link>
          <router-link :to="{path:this.statistics_work2,query:{path: this.$route.query.path}}" style="text-decoration: none">
            <el-menu-item style="height: 50px; " index="4"
            >工时分析</el-menu-item
            >
          </router-link>
          <router-link :to="{path:this.statistics_work3,query:{path: this.$route.query.path}}" style="text-decoration: none">
            <el-menu-item style="height: 50px; " index="4"
            >加班分析</el-menu-item
            >
          </router-link>
          <router-link :to="{path:this.statistics_work4,query:{path: this.$route.query.path}}" style="text-decoration: none">
            <el-menu-item style="height: 50px; " index="4"
            >请假分析</el-menu-item
            >
          </router-link>
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
      statistics_work1:'/statistics/attendance_analyze/statistics_work1',
      statistics_work2:'/statistics/attendance_analyze/statistics_work2',
      statistics_work3:'/statistics/attendance_analyze/statistics_work3',
      statistics_work4:'/statistics/attendance_analyze/statistics_work4',
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
/deep/.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}

</style>
