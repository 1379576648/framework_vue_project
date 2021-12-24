<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">

      <div class="j-card-body">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane  name="book">
            <template #label>
              <router-link :to="{path:this.regularearn,query:{path: this.$route.query.path}}"><div style="width: 100px; text-align: center;">固定工资</div></router-link>
            </template>
          </el-tab-pane>

          <el-tab-pane  name="second">
            <template #label>
              <router-link :to="{path:this.raisequery,query:{path: this.$route.query.path}}"><div style="width: 100px; text-align: center;">调薪查询</div></router-link>
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
      regularearn:'/salary/regular/regularearn',
      raisequery:'/salary/regular/raisequery',
    }
  }
}
</script>

<style scoped>
@import url(../../css/navigation.css);
</style>

