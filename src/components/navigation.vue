f<!-- 首页导航栏 -->
<template>
	<div>
		<!--  头部导航栏  -->
		<div class="header-app_s">
			<div class="ant-row header_row_s">
				<div class="ant-col hq-logo-wrapper header_1_s header_logo_s">
					<span class="hq-logo_">
						<a>
							<img src="../assets/que360_logo.png" />
						</a>
					</span>
				</div>
				<!--  导航菜单  -->
				<div class="ant-col header_row_menu">
					<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal"
						background-color="#085fc3" text-color="#ffffff" active-text-color="#ffd04b"
						@select="handleSelect">
						<transition name="nameoftransition">
							<el-menu-item style="height: 70px;font-weight:bold;" index="1">
								<router-link to="/workT">工作台</router-link>
							</el-menu-item>
						</transition>

						<el-menu-item style="height: 70px;font-weight:bold;" index="2">
							<router-link to="/zuzhi">组织管理</router-link>
						</el-menu-item>
						<el-menu-item style="height: 70px;font-weight:bold;" index="3">
							<router-link to="/empyg">员工管理</router-link>
						</el-menu-item>
						<el-menu-item style="height: 70px;font-weight:bold;" index="4">
							<router-link to="/shij">时间管理</router-link>
						</el-menu-item>
						<el-menu-item style="height: 70px;font-weight:bold;" index="5">
							<router-link to="/zpdaohang">招聘管理</router-link>
						</el-menu-item>
						<li style="height: 70px;font-weight:bold; width: 96px;" v-on:click="gend =! gend">
							<span class="dh-span iconfont" v-if="gend == true" style="font-size: 14px;">
								收起 &#xe772;
							</span>
							<span class="dh-span iconfont" v-else-if="gend == false" style="font-size: 14px;">
								更多 &#xe76e;
							</span>
							
						</li>
					</el-menu>
				</div>


				<!--  导航栏: 个人信息  -->
				<div class="ant-col header_3_s header_2_s">
					<span style="margin-left: 15px; margin-right: 15px;">
						<img style="width: 26px; height: 26px; border-radius: 50%;" alt="" src="../assets/aaa.jpg">
						&nbsp;&nbsp;
						17352763829
                <el-dropdown>
                  <span class="el-dropdown-link">
                     <i class="iconfont" style="color: white">&#xe600;</i>
                    <el-icon class="el-icon--right">
                      <arrow-down />
                    </el-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>账户信息</el-dropdown-item>
                      <el-dropdown-item>SAAS PC</el-dropdown-item>
                      <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
					</span>
				</div>

				<!--  导航栏: 消息  -->
				<div class="ant-col header_2_s header-notice__event">
					<div>
						<span class="header-badge__notice ant-badge">
							<i style="font-size: 18px; color: rgb(255, 255, 255); line-height: 70px;"
								class="iconfont">&#xe625;</i>
						</span>
            <div class="header_message header_message_show">
              <div>
                  <el-tabs  v-model="activeName" @tab-click="handleClick" stretch="" style="margin-top: 10px;color: black">
                    <el-tab-pane label="未读消息" name="first">

                      <ul class="ant-list-items">
                        <li class="ant-list-item">
                          <div>
                            <label class="ant-checkbox-wrapper ant-checkbox-wrapper-disabled">
                                <span>
                                  <span class="flex_panel">
                                    <input type="checkbox">
                                    <span class="flex_title">考核完成-被考核人通知:</span>
                                    <span class="flex_item">您石毅的考核已考核完成,快来查看哦!</span>
                                  </span>
                                </span>
                            </label>
                          </div>
                        </li>

                        <li class="ant-list-item">
                          <div>
                            <label class="ant-checkbox-wrapper ant-checkbox-wrapper-disabled">
                                <span>
                                  <span class="flex_panel">
                                    <input type="checkbox">
                                    <span class="flex_title">考核完成-被考核人通知:</span>
                                    <span class="flex_item">您石毅的考核已考核完成,快来查看哦!</span>
                                  </span>
                                </span>
                            </label>
                          </div>
                        </li>


                      </ul>

                    </el-tab-pane>
                    <el-tab-pane label="全部消息" name="second">全部消息</el-tab-pane>
                    <el-tab-pane label="已读消息" name="third">已读消息</el-tab-pane>
                  </el-tabs>
              </div>
            </div>


					</div>
				</div>
			</div>
		</div>
		<!-- 工作台 -->
		<router-view></router-view>
		<!-- 招聘 -->
		<router-view name="ym1"></router-view>

	</div>


	<!-- 更多弹出框 -->
	<div style="position: absolute; top: 0px; left: 0px;" v-show="gend">
		<div>
			<div class="ant-popover head_over_page ant-popover-placement-bottom"
				style="left: 450px; top: -972px; transform-origin: 50% -4px 0px; width:418px">
				<div class="ant-popover-content">
					<!-- 小角角 -->
					<div class="ant-popover-arrow"></div>

					<!--内容框框-->
					<div class="ant-popover-inner" role="tooltip">
						<div>
							<div class="ant-popover-inner-content">
								<div class="hea_nav_tot">
									<div>
										<ul class="hea_nav_tab">
                      <li>
                        <i style="font-size: 40px; vertical-align: middle; background-color: #E98F27;
}"
                           class="iconfont shebaofuli">
                          &#xeb65;
                        </i>
                        <p><span style="font-size: 12px;">审批管理</span></p>
                      </li>

                        <li>
                          <router-link to="xcnavigation">
                          <i style="font-size: 40px; vertical-align: middle;"
                            class="iconfont shebaofuli">
                            &#xe68d;
                          </i>
                          <p><span style="font-size: 12px;">薪酬管理</span></p>
                          </router-link>
                        </li>

											<li>
												<i style="font-size: 40px; vertical-align: middle;"
													class="iconfont shebaofuli">
                          &#xe68c;
												</i>
												<p><span style="font-size: 12px;">统计分析</span></p>
											</li>
											<li>
												<i style="font-size: 40px; vertical-align: middle;"
													class="iconfont shebaofuli">
													&#xe604;
												</i>
												<p><span style="font-size: 12px;">社保管理</span></p>
											</li>
											<li>
												<i style="font-size: 40px; vertical-align: middle;background-color: #2366A7;"
													class="iconfont shebaofuli">
                          &#xe64c;
												</i>
												<p><span style="font-size: 12px;">系统管理</span></p>
											</li>

										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import {
		ref
	} from 'vue'



	export default{
		data() {
			const activeIndex = ref('1')
			const activeIndex2 = ref('1')
			const handleSelect = (key, keyPath) => {
				console.log(key, keyPath)
			}
			return {
				gend:false,
				activeIndex,
				activeIndex2,
				handleSelect,
        activeName:'second'
			}
		},
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
    },
	}
</script>

<style type="text/css" scoped> 
	@import url("../css/navigation.css");

  .ant-list-items {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .ant-list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 0;
  }
  .ant-checkbox-wrapper.ant-checkbox-wrapper-disabled {
    cursor: not-allowed;
  }
  .ant-checkbox-wrapper {
    color: rgba(0, 0, 0, 0.65);
  }
  .ant-checkbox-wrapper {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #333;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: 'tnum';
    display: inline-block;
    line-height: unset;
    cursor: pointer;
  }
  .header_message .flex_panel {
    display: flex;
    margin-top: -20px;
    padding-left: 24px;
    margin-bottom: -20px;
  }
  .header_message .flex_title {
    font-weight: bold;
    margin-right: 8px;
  }
  .header_message .flex_item {
    flex: 1;
  }

  .ant-checkbox {
    color: rgba(0, 0, 0, 0.65);
  }
  .ant-checkbox-disabled {
    cursor: not-allowed;
  }




  /**

   */
	.dh-span {
		height: 56px;
		width: 56px;
		display: block;
		margin: auto;
		color: white;
		cursor: pointer;
	}

	.ant-popover {
		color: rgba(0, 0, 0, 0.65);
	}

	.head_over_page {
		position: fixed !important;
		top: 48px !important;
	}

	.ant-popover-placement-bottom,
	.ant-popover-placement-bottomLeft,
	.ant-popover-placement-bottomRight {
		padding-top: 10px;
	}

	.ant-popover {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		padding-top: 0px;
		color: #333;
		font-size: 14px;
		font-variant: tabular-nums;
		line-height: 1.5;
		list-style: none;
		font-feature-settings: 'tnum';
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1030;
		font-weight: normal;
		white-space: normal;
		text-align: left;
		cursor: auto;
		user-select: text;
	}

	.ant-popover::after {
		background: rgba(255, 255, 255, 0.01);
	}

	.ant-popover::after {
		position: absolute;
		background: rgba(255, 255, 255, 0.01);
		content: '';
	}


	.ant-popover-placement-bottom>.ant-popover-content>.ant-popover-arrow {
		left: 50%;
		transform: translateX(-50%) rotate(45deg);
	}

	.ant-popover-placement-bottom>.ant-popover-content>.ant-popover-arrow,
	.ant-popover-placement-bottomLeft>.ant-popover-content>.ant-popover-arrow,
	.ant-popover-placement-bottomRight>.ant-popover-content>.ant-popover-arrow {
		top: 6px;
		border-top-color: #fff;
		border-right-color: transparent;
		border-bottom-color: transparent;
		border-left-color: #fff;
		box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);
	}

	.ant-popover-arrow {
		position: absolute;
		display: block;
		width: 8.48528137px;
		height: 8.48528137px;
		background: transparent;
		border-style: solid;
		border-width: 4.24264069px;
		transform: rotate(45deg);
	}

	.ant-popover-inner {
		background-color: #fff;
		background-clip: padding-box;
		border-radius: 4px;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
		margin-top: 10px;
	}

	/* 框框样式 */
	.ant-popover-inner-content {
		color: rgba(0, 0, 0, 0.65);
	}

	.ant-popover-inner-content {
		padding: 12px 16px;
		color: #606c82;
	}

	.hea_nav_tot {
		width: 100%;
		padding: 7px 10px;
		background-color: #fff;
	}

	/* 内容样式 */
	.hea_nav_tot .hea_nav_tab {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.hea_nav_tot ul {
		margin: 0;
	}

	ul {
		padding: 0px;
	}
	.hea_nav_tot .hea_nav_tab > li {
	    text-align: center;
	    margin: 10px 32px;
	    width: 58px;
	}
	ul li {
	    list-style: none;
	}
	.hea_nav_tot .header_navigation_over_list > p {
	    font-size: 12px;
	    color: #606c82;
	    padding-top: 5px;
	    margin: 0;
	}
	
	.shebaofuli{
		background-color: #49A782;
		color: #fff;
	}


  /* 消息样式 */
  .header_message {
    width: 450px;
    height: 0;
    visibility: hidden;
    overflow: hidden;
    opacity: 0;
    transition: all .3s;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.219);
    border-radius: 4px;
    position: fixed;
    top: 48px;
    right: 32px;
    z-index: 100;
    background-color: #fff;
    display: block;
  }
  .header_2_s:hover .header_message{
    display: block;
    height: 538px;
    visibility: visible;
    opacity: 1;
  }
  .ant-tabs::after {
    clear: both;
  }
  .ant-tabs::before, .ant-tabs::after {
    display: table;
    content: '';
  }
  ::selection {
    color: #fff;
    background: #085fc3;
  }
  .ant-tabs-nav-scroll {
    height: 54px;
    line-height: 54px;
    margin-bottom: 0;
  }
</style>
