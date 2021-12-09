<template>
	<!--
		待办事项
		-->
	<div class="home_to_do_card home_public_card">
		<div class="home_bot_tit">
			<span>
				<i class="iconfont">&#xe641;</i>
				<span  style="font-size: 14px; font-weight: bold; color: rgba(0, 0, 0, 0.65);"> 待办事项</span>
			</span>
		</div>
		
		
		<section>
			<a class="c-dropDown">
				<span style="font-size: 20px; font-weight: 800; color: rgb(46, 55, 72);">
					0
				</span>
				<br>
				<span style="font-size: 12px; color:#606c82; overflow: hidden; width: 110px; height: 40px; display: inline-block;" title="入职办理">
					入职办理
				</span>
			</a>
			<a class="c-dropDown">
				<span style="font-size: 20px; font-weight: 800; color: rgb(46, 55, 72);">
					0
				</span>
				<br>
				<span style="font-size: 12px; color:#606c82; overflow: hidden; width: 110px; height: 40px; display: inline-block;" title="离职办理">
					离职办理
				</span>
			</a>
			<a class="c-dropDown">
				<span style="font-size: 20px; font-weight: 800; color: rgb(46, 55, 72);">
					0
				</span>
				<br>
				<span style="font-size: 12px; color:#606c82; overflow: hidden; width: 110px; height: 40px; display: inline-block;" title="员工加入审核">
					员工加入审核
				</span>
			</a>
		</section>
	</div>
</template>

<script>
</script>

<style type="text/css" scoped>
	@import url("../../css/navigation.css");


	.home_new_theme .home_to_do_card > div {
	    display: flex;
	    justify-content: space-between;
	    height: 30px;
	    line-height: 46px;
	    margin: 10px 24px;
	}
	.home_new_theme .home_to_do_card > section {
	    padding: 0 14px 18px;
	    margin-bottom: 0;
	    margin-top: 7px;
	}
	.home_new_theme .home_to_do_card > section > a {
	    text-align: center;
	    display: inline-block;
	    width: 14.28%;
	}
	.c-dropDown {
	    color: #606c82;
	}
</style>
