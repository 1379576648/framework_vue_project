<!--员工花名册页面-->
<template>
  <div class="saas-main-content" v-if="employee_dimission==false&&employee_compile==false">
    <!-- 菜单 -->
    <div class="saas-main-content">
      <div class="j-tabs2">
        <!--            <el-menu
                      :default-active="activeIndex"
                      class="el-menu-demo"
                      mode="horizontal"
                      @select="handleSelect"
                    >
                    <router-link :to="{path:this.book,query:{path: this.$route.query.path}}">
                      <el-menu-item style="height: 50px;" index="1">
                        花名册
                      </el-menu-item>
                    </router-link>
                    <router-link :to="{path:this.business,query:{path: this.$route.query.path}}">
                      <el-menu-item style="height: 50px; " index="4"
                        >工作经历</el-menu-item
                      >
                    </router-link>
                    </el-menu>-->
        <div style="margin-left: 15px;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="book" label="花名册">
            <employee_staff />
          </el-tab-pane>

          <el-tab-pane name="second" label="工作经历">
            <employee_work/>
          </el-tab-pane>

          <el-tab-pane name="three" label="奖惩记录">
            <employee_punish/>
          </el-tab-pane>
        </el-tabs>
        </div>
      </div>

    </div>
  </div>
<!--  员工编辑-->
  <employee_compile v-if="employee_compile"/>
<!--  办理离职-->
  <employee_dimission v-if="employee_dimission"/>
</template>

<script>
//花名册
import employee_staff from '../employee_management/employee_staff.vue';
//工作经历
import employee_work from '../employee_management/employee_work.vue';
//奖惩记录
import employee_punish from '../employee_management/employee_punish.vue';
//办理离职
import employee_dimission from '../employee_management/employee_dimission.vue';
//员工编辑
import employee_compile from '../employee_management/employee_compile.vue';
export default {
  components: {
    //花名册
    employee_staff,
    //工作经历
    employee_work,
    //奖惩记录
    employee_punish,
    //办理离职
    employee_dimission,
    //员工编辑
    employee_compile
  },
  data() {
    return {
      //办理离职
      employee_dimission:false,
      //员工编辑
      employee_compile:false,
      activeName:'book',
      one:0,
      two:'',
    }
  },
  methods: {
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

/deep/ .mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}

</style>
