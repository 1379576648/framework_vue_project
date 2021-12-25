<template>
	<!--
		快捷功能入口
		-->
	<div class="home_block_card">
		<div class="j-card normal j-card-bordered mainContent">

			<div class="j-card-head">
				<div class="j-card-head-title">
					<i class="iconfont">&#xe74a;</i>
					<span class="font_weight_bold">
						<span style="font-weight: bold;"> 快捷功能入口</span>
					</span>
				</div>
			</div>


			<div class="j-card-body">
				<div class="ant-row home-icon__entry">
					
					<div class="ant-col home-icon__col ant-col-xs-8 ant-col-md-8">
						<div>
							<a class="c-dropDown">
								<span style="display: block; height: 30px;width: 30px;margin: auto;">
									<i class="iconfont" style="font-size: 30px;">&#xe61d;</i>
								</span>
								<br>
								<span class="icon-span" style="font-size: 12px;">
									<span>员工审核</span>
								</span>
							</a>
						</div>
					</div>
					
					<div class="ant-col home-icon__col ant-col-xs-8 ant-col-md-8">
						<div>
							<a class="c-dropDown">
								<span style="display: block; height: 30px;width: 30px;margin: auto;">
									<i class="iconfont" style="font-size: 30px;">&#xe65b;</i>
								</span>
								<br>
								<span class="icon-span" style="font-size: 12px;">
									<span>薪酬统计</span>
								</span>
							</a>
						</div>
					</div>
					
					
					
					
				</div>
			</div>

		</div>
	</div>
</template>

<script>
</script>

<style type="text/css" scoped> 
	@import url("../../css/navigation.css");
	.ant-row::after {
		clear: both;
	}
	.ant-row::before,
	.ant-row::after {
		display: table;
		content: '';
	}

	.j-card-body .ant-row {
		position: relative;
		height: auto;
		margin-right: 0;
		margin-left: 0;
		zoom: 1;
		display: block;
		box-sizing: border-box;
	}
	.home-icon__col {
	    text-align: center;
	    margin-bottom: 32px;
	    margin-top: 16px;
	    position: relative;
	}
	.ant-col-md-8 {
	    display: block;
	    box-sizing: border-box;
	    width: 33.33333333%;
		float: left;
	}
	.c-dropDown:hover{
		color: #085FC3;
	}
</style>
