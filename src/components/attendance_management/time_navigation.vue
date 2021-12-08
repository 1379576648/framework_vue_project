<!--考勤导航栏-->
<template>
	<section class="ant-layout ant-layout-has-sider"
		style="min-width: 988px; min-height: 100vh; background-color: rgba(232, 239, 246, 0); box-shadow: rgb(121, 159, 197) 0px 7px;"
		id="scrollLayout">
		<div class="sider-view-left">
			
			<aside class="hq-siderbar strut-sidebar-show  ant-layout-sider ant-layout-sider-inline"
				style="flex: 0 0 160px; max-width: 160px; min-width: 160px; width: 160px; background-color: #f2f6f8;">
				<div class="ant-layout-sider-children">
					<div class="hq-logo-wrapper"></div>
					<div class="custom-menu" style="width: 160px;">

						<el-menu default-active="2" class="" background-color="#f2f6f8"  unique-opened="true">
							<el-sub-menu index="1">
								<template #title>
									<i class="iconfont">&#xe62c;</i>&nbsp;&nbsp;
									<span
										style="font-weight: normal;font-size: 15px;margin-left: -5px;margin-top: -1px;">基础设置</span>
								</template>
									<el-menu-item index="1-1">招聘计划</el-menu-item>
							</el-sub-menu>

							<el-sub-menu index="2">
								<template #title>
									<i class="iconfont">&#xe677;</i>&nbsp;&nbsp;
									<span
										style="font-weight: normal;font-size: 15px;margin-left: -5px;margin-top: -1px;">考勤记录</span>
								</template>
									<el-menu-item index="2-1">人才库</el-menu-item>
								<el-menu-item index="2-2">新简历</el-menu-item>
								<el-menu-item index="2-3">候选人</el-menu-item>
								<el-menu-item index="2-4">淘汰库</el-menu-item>
							</el-sub-menu>
							
							<el-sub-menu index="3">
								<template #title>
									<i class="iconfont">&#xe677;</i>&nbsp;&nbsp;
									<span
										style="font-weight: normal;font-size: 15px;margin-left: -5px;margin-top: -1px;">考勤统计</span>
								</template>
								<el-menu-item index="3-1">面试管理</el-menu-item>
								<el-menu-item index="3-2">复试管理</el-menu-item>
							</el-sub-menu>
							
						</el-menu>
					</div>
				</div>
			</aside>
			
		</div>
		<main class="ant-layout-content">
			<router-view name="zp1"></router-view>
			<router-view name="zp2"></router-view>
		</main>
	</section>


</template>

<script lang="ts">

</script>

<style type="text/css" scoped> 
@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");
</style>
