<template>
  <section class="ant-layout ant-layout-has-sider"
           style="min-width: 988px; min-height: 100vh; background-color: rgb(232, 239, 246); box-shadow: rgb(121, 159, 197) 0px 7px;"
           id="scrollLayout">
    <div class="sider-view-left">

    </div>
    <main class="ant-layout-content">
      <div class="saas-main-content">
        <div>
          <div class="home_new_theme">
            <div class="ant-spin-nested-loading">
              <div class="ant-spin-container">
                <div style="margin-left: -8px; margin-right: -8px;">
                  <!--                  统计公司情况-->
                  <router-view v-if="activate_menuName[0]" :name="activate_menuName[0]"/>
                  <!--  body左  -->
                  <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-16">
                    <!--
                      待办事项
                      -->
                    <router-view v-if="activate_menuName[1]" :name="activate_menuName[1]"/>
                    <!--a
                      工作日历
                      -->
                    <router-view v-if="activate_menuName[2]" :name="activate_menuName[2]"/>
                    <!--  统计分析  -->

                    <router-view v-if="activate_menuName[3]" :name="activate_menuName[3]"/>
                  </div>
                  <!--  body右  -->
                  <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-8">
                    <!--
                      招聘进度
                      -->
                    <router-view v-if="activate_menuName[4]" :name="activate_menuName[4]"/>
                    <!--
                      快捷功能入口
                      -->
                    <router-view v-if="activate_menuName[5]" :name="activate_menuName[5]"/>
                    <!--
                      公司系统公告
                      -->
                    <router-view v-if="activate_menuName[6]" :name="activate_menuName[6]"/>

                  </div>

                  <div style="clear: both;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer class="hq-footer ant-layout-footer">
          <span>版权所有</span>

          2016-2021
          <span>深圳市前海欢雀科技有限公司</span>
          <span>粤ICP备15072594号-1</span>
        </footer>
      </div>
    </main>
  </section>

</template>
<script>
export default {
  data() {
    return {
      //获取当前激活的菜单列表
      menu_List: this.$store.getters.store_menuList(this.$store.state.activate_router)[0],
      //当前页面所有的菜单列表
      menuName:[]
    }
  }, computed: {
    activate_menuName(){
      // //找出第一个没有叶子的菜单
      this.inquire_1();
      return this.menuName;
    }
  },methods:{
    inquire_1() {
      for (let i of this.menu_List) {
        //如果菜单有叶子 并且状态为启用 并且类型为菜单
        if (i.MENU_LEAF == 0 && i.MENU_STATE == 0&& i.MENU_TYPE==1) {
          //梯归
          this.inquire_2(i.son);
        } else if (i.MENU_LEAF == 1 && i.MENU_STATE == 0&& i.MENU_TYPE==1) {
          //通过,分割字符串形成数组，再取当前组件名称添加最后一个/后面的字符
          var attr =i.MENU_MODULE.split(",")
          for (let j of attr) {
            this.menuName.push(j.substring(j.lastIndexOf('/') + 1,j.length));
          }
        }
      }
    }, inquire_2(value) {
      for (let i of value) {
        //如果菜单有叶子 并且状态为启用 并且类型为菜单
        if (i.MENU_LEAF == 0 && i.MENU_STATE == 0 && i.MENU_TYPE==1) {
          //梯归
          this.inquire_2(i.son);
        } else if (i.MENU_LEAF == 1 && i.MENU_STATE == 0&& i.MENU_TYPE==1) {
          //通过,分割字符串形成数组，再取当前组件名称添加最后一个/后面的字符
          var attr =i.MENU_MODULE.split(",")
          for (let j of attr) {
            this.menuName.push(j.substring(j.lastIndexOf('/') + 1,j.length));
          }
        }
      }
    }
  }
}
</script>

<style type="text/css" scoped>
@import url("../../css/navigation.css");
</style>
