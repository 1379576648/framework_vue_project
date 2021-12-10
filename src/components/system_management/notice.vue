<!-- 公告页面 -->

<template>
	<div class="saas-main-content">
		<div class="j-card j-card-bordered mainContent">
			<div class="j-card-body ">

				<div class="mt-20 ml-20 mr-20">
					<!-- 搜索数据部分 -->
					<el-form style="margin-bottom: -18px;" :inline="true" class="demo-form-inline">
						<!-- 公告标题搜索 -->
						<el-form-item class="form-gg" label="公告标题">
							<el-input size="small" placeholder="请输入公告标题"></el-input>
						</el-form-item>
						<!-- 操作人员搜索 -->
						<el-form-item class="form-ry" label="操作人员">
							<el-input size="small" placeholder="请输入操作人员"></el-input>
						</el-form-item>
						<!-- 公告类型搜索 -->
						<el-form-item class="form-lx" label="类型">
							<el-select size="small" v-model="form.region" placeholder="公告类型">
								<el-option label="通知" value="shanghai"></el-option>
								<el-option label="公告" value="beijing"></el-option>
							</el-select>
						</el-form-item>

						<el-form-item class="search">
							<el-button size="mini" class="search-ss" type="primary" @click="onSubmit"><i
									class="iconfont">&#xe61b</i>搜索</el-button>
							<el-button size="mini" class="search-cz" type="primary"><i class="iconfont">&#xe6b8</i>重置</el-button>
						</el-form-item>
					</el-form>
					
					<br />
					
					<!-- 操作按钮部分 -->
					<div class="button">
						<!-- 新增按钮 -->
						<el-button size="mini" 
							 class="button-new" 
							 @click="outerVisible = true,judge='新增'">
							 + 新增
						</el-button>
						
						
						<!-- 弹出操作窗口 -->
						<el-dialog width="670px"  v-model="outerVisible" title="添加通告">
							<!-- form表单 -->
							<form class="announcement">
								<!-- 公告标题 -->
								<h2 class="headline" >公告标题</h2>
								<el-form-item class="announcement-title">
									<el-input size="small" placeholder="请输入公告标题"></el-input>
								</el-form-item>
								<!-- 公告类型-->
								<h2 class="types" >公告类型</h2>
								<el-form-item class="announcement-type">
									<el-select v-model="form.region" size="small" placeholder="公告类型">
										<el-option label="通知" value="shanghai"></el-option>
										<el-option label="公告" value="beijing"></el-option>
									</el-select>
								</el-form-item>
								<!-- 公告状态 -->
								<h2 class="state">状态</h2>
								<el-form-item>
									<div class="announcement-zt">
										<el-radio v-model="radio1" label="1">正常</el-radio>
										<el-radio v-model="radio1" label="2">关闭</el-radio>
									</div>
								</el-form-item>
								<!-- 公告内容 -->
								<h2 class="content">内容</h2>
								<el-form-item>
									<el-input class="announcement-nr" 
										v-model="textarea" 
										:rows="2" type="textarea"
										placeholder="请输入公告内容"
									/>
								</el-form-item>
								
								<el-form-item >
									<div class="announcement-cz">
										<el-button size="mini"  @click="outerVisible = false">
											取消
										</el-button>
										<!-- 修改按钮 -->
										<el-button size="mini" type="primary" @click="innerVisible = true">
											{{judge}}
										</el-button>
									</div>
								</el-form-item>
							</form>							
						</el-dialog>
						
						
						<el-button size="mini" class="button-amend" @click="outerVisible = true,judge='修改'">
							<i class="iconfont">&#xe606</i>
							修改
							</el-button>
						<el-button size="mini" class="button-delete">
							<i class="iconfont">&#xe61c</i>
							删除
						</el-button>
					</div>
				</div>



				<!-- 表格内容部分 -->
				<div class="sub-Content__primary">

					<el-table :data="tableData" style="width: 100%" :header-cell-style="{textAlign: 'center'}"
						:cell-style="{ textAlign: 'center' }">
						<!-- 全选操作按钮 -->
						<el-table-column type="selection" width="100" />
						<el-table-column prop="date" label="序号" width="150" />
						<el-table-column prop="name" label="公告标题" width="170" />
						<el-table-column prop="state" label="公告类型" width="170" />
						<el-table-column prop="city" label="公告状态" width="160" />
						<el-table-column prop="address" label="发布人" width="160" />
						<el-table-column prop="zip" label="发布时间" width="160" />
						<el-table-column align="center" label="操作" width="200">
							<template #default="scope">
								<el-button size="mini" style="color: #A3D3FF;"  @click="outerVisible = true,judge='修改'">
									<i class="iconfont">&#xe606</i>
									修改
								</el-button>
								<el-button size="mini" style="color: #A3D3FF;">
									<i class="iconfont">&#xe61c</i>
									删除
								</el-button>
							</template>
						</el-table-column>
					</el-table>

				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import {
		defineComponent,
		ref
	} from 'vue'

	export default {
		data() {
			return {
				tableData: [{
					date: "1",
					name: "2",
					state: "3",
					city: "4",
					address: "5",
					zip: "6"
				}],
				
				form: {
					region: '',
				},
				
				//显示添加还是有修改的状态
				outerVisible: ref(false),
				//单选框按钮
				radio1: ref('1'),
				
				// 判断添加还是编辑
				judge: "添加",
	
			}
		}

	}
</script>

<style type="text/css" scoped>
@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");
	/* 图标 */
	@font-face {
		font-family: 'iconfont';
		/* Project id 2994452 */
		src: url('//at.alicdn.com/t/font_2994452_60uvtx3m6is.woff2?t=1638864192788') format('woff2'),
			url('//at.alicdn.com/t/font_2994452_60uvtx3m6is.woff?t=1638864192788') format('woff'),
			url('//at.alicdn.com/t/font_2994452_60uvtx3m6is.ttf?t=1638864192788') format('truetype');
	}
	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	}
	.tck{
			  width: 600px;
		       height: 200px;
		       background: green;
		       position: absolute;
		       left: 50%;
		       top: 50%;
		       transform: translate(-50%, -50%);
	}
	
	/* 对话公告框标题文本样式 */
	.announcement .headline{
		font-size: 14px;
		margin-left: 12px; 
		margin-top: -20px;
	}
	/* 对话框公告类型下拉框样式 */
	.announcement .types{
		font-size: 14px;
		margin-left: 347px;
		margin-top:-54px;
	}
	/* 对话框公告状态单选框样式 */
	.announcement .state{
		font-size: 14px; 
		margin-left: 37px; 
		margin-top:19px;
	}
	/* 对话框公告内容文本框样式 */
	.announcement .content{
		font-size: 14px;
		margin-left: 37px; 
		margin-top:23px;
	}

	/* 弹出窗口按钮样式 */
	.announcement .announcement-cz{
		width: 130px;
		margin-top: 51px;
		margin-left: 480px;
		margin-bottom: -23px;
	}
	/* 弹出窗口内容样式 */
	.announcement .announcement-nr {
		width: 525px;
		margin-top: -20px;
		margin-left: 80px;
		margin-bottom: -45px;

	}
	/* 弹出窗口状态样式 */
	.announcement .announcement-zt {
		margin-top: -30px;
		margin-left: 80px;
	}
	/* 弹出窗口类型样式 */
	.announcement .announcement-type {
		width: 240px;
		margin-top: -30px;
		margin-left: 415px;

	}
	/* 弹出窗口标题样式 */
	.announcement .announcement-title {
		width: 240px;
		margin-top: -30px;
		margin-left: 80px;

	}
	/* 表头新增按钮 */
	.button .button-new {
		height: 30px;
		width: 90px;
		color: #1890ff;
		background: #e8f4ff;
		border-color: #a3d3ff;
		margin: 0px 0px 0px 10px;
		border: none;
		width: 106px;
	}
	
	.button .button-new:hover {
		height: 30px;
		width: 90px;
		color: white;
		background-color: #1890FF;
		margin: 0px 0px 0px 10px;
		border: none;
		width: 106px;
	}
	/* 表头修改按钮样式 */
	 .button-amend {
		margin: 0px 0px 0px 6px;
		height: 30px;
		width: 90px;
		color: #71e2a3;
		background-color: #e7faf0;
		border-color: #d0f5e0;
		border: none;
		width: 106px;
	}
	/* 表头批量删除按钮样式 */
	 .button-delete {
		height: 30px;
		width: 90px;
		color: #ff9292;
		background-color: #ffeded;
		border-color: #ffdbdb;
		margin: 0px 0px 0px 5px;
		border: none;
		width: 106px;
	}
	
	/* 搜索 */
	.form-gg {
		margin: 0px 0px 0px 10px;
	}

	.form-lx {
		margin: 0px 0px 0px 10px;
	}

	.form-ry {
		margin: 0px 0px 0px 10px;
	}
	
	
	/* 搜索按钮 */
	.search-ss {
		background-color: #085FC3;
		color: white;
		margin: 29px 0px 0px 5px;
		width: 100px;
		
	}
	/* 重置按钮 */
	.search-cz {
		background-color: white;
		color: black;
		margin: 29px 0px 0px 5px;
		width: 100px;
	}
</style>
