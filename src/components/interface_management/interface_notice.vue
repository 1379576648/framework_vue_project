<template>
	<!--
		公司系统公告
		-->
	<div class="home_public_card home_notice_card">
		<div class="home_notice_card_title">
			<a>
				<span style="font-weight: bold; font-size: 14px; color: #333333;">公司公告</span>
			</a>
		</div>

		<div class="home_notice_card_content">
			<ul class="home_notice_card_content_list">

				<!--无数据显示-->
				 <el-empty description="暂无数据" style="height: 250px;"></el-empty>

			</ul>



			<div style="text-align: center; margin-bottom: 0px">
				<button style="width: 80%; font-size: 14px; margin-bottom: 14px; overflow: hidden;" type="button"
					class="ant-btn ant-btn-primary ant-btn-background-ghost">
				    <span>期待您宝贵的意见</span>
				</button>
			</div>
			<div style="text-align: center;"></div>
		</div>
	</div>
</template>

<script>
</script>

<style type="text/css" scoped> 
	@import url("../../css/navigation.css");
	.home_notice_card_title::before,
	.home_notice_card_title::after {
		content: '';
		display: block;
	}

	.ant-result {
		padding: 48px 32px;
	}

	.ant-result-extra {
		margin-top: 32px;
		text-align: center;
	}

	::selection {
		color: #fff;
		background: #085fc3;
	}

	::selection {
		color: #fff;
		background: #366cb3;
	}

	.ant-result-icon {
		margin-bottom: 24px;
		text-align: center;
	}

	.ant-btn-background-ghost.ant-btn-primary {
    color: #366cb3;
    background-color: transparent;
    border-color: #366cb3;
    text-shadow: none;
}
</style>
