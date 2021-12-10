<!--员工导航栏-->
<template>
	<section class="ant-layout ant-layout-has-sider"
		style="min-width: 988px; min-height: 100vh; background-color: rgb(232, 239, 246, 0); box-shadow: rgb(121, 159, 197) 0px 7px;"
		id="scrollLayout">
		<div class="sider-view-left">

			<aside class="hq-siderbar strut-sidebar-show  ant-layout-sider ant-layout-sider-inline"
				style="flex: 0 0 160px; max-width: 160px; min-width: 160px; width: 160px; background-color: #f2f6f8;">
				<div class="ant-layout-sider-children">
					<div class="hq-logo-wrapper"></div>
					<div class="custom-menu" style="width: 160px;">

						<el-menu default-active="2" class="" background-color="#f2f6f8"  unique-opened="{true}">
							<el-sub-menu index="1">
								<template #title>
									<i class="iconfont">&#xe62c;</i>&nbsp;&nbsp;
									<span
										style="font-weight: normal;font-size: 15px;margin-left: -5px;margin-top: -1px;">员工信息</span>
								</template>
								<el-menu-item index="1-1">
									<router-link to="/emps">员工花名册</router-link>
								</el-menu-item>
								<el-menu-item index="1-2">人才统计</el-menu-item>
								<el-menu-item index="1-3">人才展示</el-menu-item>
								<el-menu-item index="1-4">员工审核</el-menu-item>
								<el-menu-item index="1-5">历史花名册</el-menu-item>
							</el-sub-menu>

							<el-sub-menu index="2">
								<template #title>
									<i class="iconfont">&#xe677;</i>&nbsp;&nbsp;
									<span
										style="font-weight: normal;font-size: 15px;margin-left: -5px;margin-top: -1px;">兼职管理</span>
								</template>
<!-- 								<el-menu-item index="2-1">职类管理</el-menu-item>
								<el-menu-item index="2-2">职位管理</el-menu-item> -->
							</el-sub-menu>

							<el-sub-menu index="3">
								<template #title>
									<i class="iconfont">&#xe677;</i>&nbsp;&nbsp;
									<span
										style="font-weight: normal;font-size: 15px;margin-left: -5px;margin-top: -1px;">档案管理</span>
								</template>
								<!-- <el-menu-item index="3-1">编制管理</el-menu-item> -->
							</el-sub-menu>

						</el-menu>
					</div>
				</div>
			</aside>

		</div>
		<main class="ant-layout-content">
			<router-view name="zp1"></router-view>
			<router-view name="emps"></router-view>
		</main>
	</section>



</template>

<script>

</script>

<style type="text/css" scoped> 
@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");
</style>
