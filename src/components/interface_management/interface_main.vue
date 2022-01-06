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
                  <interface_time/>
                  <!--  body左  -->
                  <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-16">
                    <!--
                      待办事项
                      -->
                    <interface_db/>
                    <!--a
                      工作日历
                      -->
                    <interface_calendar/>
                    <!--  统计分析  -->

                    <interface_statistics/>
                  </div>
                  <!--  body右  -->
                  <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-8">
                    <!--
                      招聘进度
                      -->
                    <interface_zpprogress/>
                    <!--
                      快捷功能入口
                      -->
                    <interface_quick/>
                    <!--
                      公司系统公告
                      -->
                    <interface_notice/>

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
// 统计公司情况
import interface_time from './interface_time.vue';
// 待办事项
import interface_db from './interface_db.vue';
//工作日历
import interface_calendar from './interface_calendar.vue';
//统计分析
import interface_statistics from './interface_statistics.vue';
// 招聘进度
import interface_zpprogress from './interface_zpprogress.vue';
//快捷功能入口
import interface_quick from './interface_quick.vue';
// 公司系统公告
import interface_notice from './interface_notice.vue';

export default {
  //注册组件
  components: {
// 统计公司情况
    interface_time,
// 待办事项
    interface_db,
//工作日历
    interface_calendar,
//统计分析
    interface_statistics,
// 招聘进度
    interface_zpprogress,
//快捷功能入口
    interface_quick,
// 公司系统公告
    interface_notice,
  },
}
</script>

<style type="text/css" scoped>
@import url("../../css/navigation.css");
</style>
