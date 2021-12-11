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
            <router-link to="/staff" style="text-decoration: none">
              <el-menu-item style="height: 50px;" index="1">
                花名册
              </el-menu-item>
            </router-link>
            <router-link to="/work" style="text-decoration: none">
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
              <router-view name="yg1"></router-view>
            </main>
          </section>
        </div>
  </div>
</template>




<style scoped>
/deep/.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}

</style>
