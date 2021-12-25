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
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane  name="book">
                <template #label>
                  <router-link :to="{path:this.tobehired,query:{path: this.$route.query.path}}"><div style="width: 100px; text-align: center;">待入职员工</div></router-link>
                </template>
              </el-tab-pane>

              <el-tab-pane  name="second">
                <template #label>
                  <router-link :to="{path:this.hashired,query:{path: this.$route.query.path}}"><div style="width: 100px; text-align: center;">放弃入职员工</div></router-link>
                </template>
              </el-tab-pane>
            </el-tabs>
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
              <router-view></router-view>
            </main>
          </section>
        </div>
      </div>
    </div>
  </div>
  &nbsp;
</template>

<script>
export default {
  data(){
    return{
      tobehired:'/employee/transaction/entry/tobehired',
      hashired:'/employee/transaction/entry/hashired'
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

