<!--组织管理导航栏-->
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

						<el-menu default-active="2" class="" background-color="#f2f6f8"  unique-opened="true">
							<el-sub-menu index="1">
								<template #title>
									<i class="iconfont">&#xe62c;</i>&nbsp;&nbsp;
									<span
										style="font-weight: normal;font-size: 15px;margin-left: -5px;margin-top: -1px;">组织管理</span>
								</template>
                <router-link to="/one">
								  <el-menu-item index="1-1">部门设置</el-menu-item>
                </router-link>
							</el-sub-menu>
							<el-sub-menu index="2">
								<template #title>
									<i class="iconfont">&#xe677;</i>&nbsp;&nbsp;
									<span
										style="font-weight: normal;font-size: 15px;margin-left: -5px;margin-top: -1px;">职位管理</span>
								</template>
								<el-menu-item index="2-1">职类管理</el-menu-item>
								<el-menu-item index="2-2">职位管理</el-menu-item>
							</el-sub-menu>
							
							<el-sub-menu index="3">
								<template #title>
									<i class="iconfont">&#xe677;</i>&nbsp;&nbsp;
									<span
										style="font-weight: normal;font-size: 15px;margin-left: -5px;margin-top: -1px;">编制管理</span>
								</template>
								<el-menu-item index="3-1">编制管理</el-menu-item>
							</el-sub-menu>
							
						</el-menu>
					</div>
				</div>
			</aside>
			
		</div>
		<main class="ant-layout-content">
			<router-view name="one"></router-view>
		</main>
	</section>



</template>

<script>

</script>
<style type="text/css" scoped> 
@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");
</style>

