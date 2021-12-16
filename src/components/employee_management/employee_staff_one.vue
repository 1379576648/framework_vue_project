<!--员工花名册页面-->
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
            <router-link :to="{path:this.book,query:{path: this.$route.query.path}}" style="text-decoration: none">
              <el-menu-item style="height: 50px;" index="1">
                花名册
              </el-menu-item>
            </router-link>
            <router-link :to="{path:this.business,query:{path: this.$route.query.path}}" style="text-decoration: none">
              <el-menu-item style="height: 50px; " index="4"
                >工作经历</el-menu-item
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
      book:'/employee/message/employee_roster/book',
      business:'/employee/message/employee_roster/business'
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
