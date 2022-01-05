<!--入职管理页面-->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <span></span>
        <!-- 菜单 -->
        <div class="saas-main-content">
          <div class="j-tabs2">
            <!--            <el-menu-->
            <!--              :default-active="activeIndex"-->
            <!--              class="el-menu-demo"-->
            <!--              mode="horizontal"-->
            <!--              @select="handleSelect"-->
            <!--            >-->
            <!--              <router-link :to="{path:this.tobehired,query:{path: this.$route.query.path}}">-->
            <!--              <el-menu-item style="height: 50px; " index="1"-->
            <!--                >待入职员工</el-menu-item-->
            <!--              >-->
            <!--            </router-link>-->
            <!--              <router-link :to="{path:this.hashired,query:{path: this.$route.query.path}}">-->
            <!--              <el-menu-item style="height: 50px; " index="4"-->
            <!--                >放弃入职员工</el-menu-item-->
            <!--              >-->
            <!--            </router-link>-->
            <!--            </el-menu>-->
            <div style="margin-left: 15px;">
            <el-tabs v-model="activeName" @tab-click="handleClick">

              <el-tab-pane name="book" label="待入职员工">
                <employee_stock/>
              </el-tab-pane>

              <el-tab-pane name="second" label="放弃入职员工">
                <employee_abandon/>
              </el-tab-pane>

            </el-tabs>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  &nbsp;
</template>

<script>
//待入职员工
import employee_stock from '../employee_management/employee_stock.vue';
//放弃入职员工
import employee_abandon from '../employee_management/employee_abandon.vue';

export default {
  //注册组件
  components: {
    //待入职员工
    employee_stock,
    //放弃入职员工
    employee_abandon,
  },
  data() {
    return {
      activeName: 'book'
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

