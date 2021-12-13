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
                  <worktime/>
									<!--  body左  -->
									<div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-16">
										<!--
											待办事项
											-->
                    <workdb/>
										<!--a
											工作日历
											-->
                    <workcalendar/>
										<!--  统计分析  -->

                   <workstatistics/>

									</div>
									<!--  body右  -->
									<div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-8">
										<!--
											招聘进度
											-->
                    <workzpprogress/>
										<!--
											快捷功能入口
											-->
                    <workquick/>
										
										<!--
											公司系统公告
											-->
                    <worknotice/>
										
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
import worktime from "./work_time.vue";
import workdb from "./work_db.vue";
import workcalendar from "./work_calendar.vue";
import workstatistics from "./work_statistics.vue";
import workzpprogress from "./work_zpprogress.vue";
import workquick from "./work_quick.vue";
import worknotice from "./work_notice.vue";
export  default {
  components:{
    worktime,
    workdb,
    workcalendar,
    workstatistics,
    workzpprogress,
    workquick,
    worknotice
  }
}
</script>

<style type="text/css" scoped> 
	@import url("../../css/navigation.css");
</style>
