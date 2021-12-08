<!--简历：新简历-->
<template>
	
	<div class="saas-main-content">
		<div class="j-card j-card-bordered mainContent">
			<div class="j-card-body ">
				<div class="sub-Content__primary">
					<div class="ant-spin-nested-loading">
						<div class="ant-spin-container">
							<div class="mt-20 ml-20 mr-20">
								<!-- 新增招聘计划按钮 -->
								<a style="margin-top: 4px;">
									<button type="button" class="ant-btn ant-btn-primary">
										<span>+新增</span>
									</button>
								</a>
								<!-- 批量导入按钮 -->
								<button style="margin-top: 4px; margin-left: 10px;" type="button" class="ant-btn abt">
									<span>批量导入</span>
								</button>
								<!-- 批量批量删除按钮 -->
								<button style="margin-top: 4px; margin-left: 10px;" type="button" class="ant-btn abt">
									<span>批量删除</span>
								</button>
								
								<!--筛选框-->
								
				
								<div style="float: right;">
									<!--搜索输入框-->
									&nbsp;&nbsp;&nbsp;
									<el-input style="width: 200px;" v-model="input" placeholder="名称" clearable />
									<!--搜索按钮-->
									&nbsp;&nbsp;&nbsp;
									<el-button style="background-color: #085fc3; color: white;" size="small">Custom
									</el-button>
								</div>
							</div>
						</div>
					</div>
					<br />
					<!-- 表格数据 -->
					<div class="ant-table-wrapper j_statistics_layout">
						<el-table :data="tableData" style="width: 100%">
							<el-table-column fixed="left" prop="date" label="Date" width="150" />
							<el-table-column prop="name" label="Name" width="120" />
							<el-table-column prop="state" label="State" width="120" />
							<el-table-column prop="city" label="City" width="120" />
							<el-table-column prop="address" label="Address" width="600" />
							<el-table-column prop="zip" label="Zip" width="120" />
							<el-table-column fixed="right" label="Operations" width="120">
								<template #default>
									<el-button type="text" size="small" @click="">Detail</el-button>
									<el-button type="text" size="small">Edit</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
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
			const activeIndex = ref('1')
			return {
				activeIndex,
				input:"",
				tableData:[]
			}
		},

	}

</script>
<style type="text/css" scoped> 
@import url("../../css/Navigation.css");
@import url("../../css/zpdaohang.css");
	.j-tabs {
		border-bottom: 1px solid #d9d9d9;
	}

	.mainContent .sub-Content__primary {
		padding: 12px 24px;
		background: #fff;
		border-radius: 4px;
	}

	.ant-spin-nested-loading {
		position: relative;
	}

	.ant-spin-container {
		position: relative;
		transition: opacity 0.3s;
	}
	.ant-table-wrapper::after {
	    clear: both;
	}
	.ant-table-wrapper::before, .ant-table-wrapper::after {
	    display: table;
	    content: '';
	}
</style>
