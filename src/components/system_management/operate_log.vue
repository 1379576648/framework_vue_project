<!-- 登录日志页面 -->

<template>
	<div class="saas-main-content">
		<div class="j-card j-card-bordered mainContent">
			<div class="j-card-body ">
				<div class="mt-20 ml-20 mr-20">
					<el-form :inline="true"	>
						<!-- 系统模块搜索 -->
						<el-form-item class="form-module" label="系统模块">
							<el-input size="small" placeholder="请输入系统模块"></el-input>
						</el-form-item>
						
						<!-- 操作人员搜索 -->
						<el-form-item class="form-staff" label="操作人员">
							<el-input size="small" placeholder="请输入操作人员"></el-input>
						</el-form-item>
						
						<!-- 操作类型搜索 -->
						<el-form-item class="form-type" label="操作类型">
							<el-select class="form-types" size="small" v-model="value" placeholder="操作类型">
								<el-option 
								      v-for="item in type"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value"
								    >
								</el-option>
							</el-select>
						</el-form-item>
						
						<!-- 登录状态搜索 -->
						<el-form-item class="form-state" label="登录状态">
							<el-select class="form-states" size="small" v-model="value1" placeholder="登录状态">
								<el-option 
								      v-for="item in state"
								      :key="item.value1"
								      :label="item.label"
								      :value="item.value1"
								    >
								</el-option>
							</el-select>
						</el-form-item>
						
						<!-- 操作时间搜索 -->
						<el-form-item class="form-time"  label="登录时间">
							      <el-date-picker style="width: 232px;"
										size="small"
										v-model="value2"
										type="daterange"
										start-placeholder="开始日期"
										end-placeholder="结束日期"
										:default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
									  >
							      </el-date-picker>
						</el-form-item>
						
						<!-- 操作按钮 -->
						<el-form-item class="search">
							<el-button size="mini" class="search-ss" type="primary" @click="onSubmit"><i
									class="iconfont">&#xe61b</i>搜索</el-button>
							<el-button size="mini" class="search-cz" type="primary"><i class="iconfont">&#xe6b8</i>重置</el-button>
						</el-form-item>
					</el-form>
					
					<!-- 对数据的增删改按钮 -->
					<div class="button">
						<el-button class="button-delete" size="mini">删除</el-button>
						<el-button class="button-empty" size="mini">清空</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {defineComponent,ref} from 'vue'

	export default {
		data() {
			//操作时间
			const value2 = ref('')
			return {
				// 搜索登录类型下拉框
				 type: ([
						{
						  value: '新增',
						  label: '新增',
						},
						{
						  value: '删除',
						  label: '删除',
						},
						{
						  value: '授权',
						  label: '授权',
						},
						{
						  value: '导出',
						  label: '导出',
						},
						{
						  value: '导入',
						  label: '导入',
						},
						{
						  value: '强退',
						  label: '强退',
						},
						{
						  value: '生成代码',
						  label: '生成代码',
						},
						{
						  value: '清空数据',
						  label: '清空数据',
						},
					  ]),
					  value: '',
					  // 搜索登录状态下拉框
					  state: ([
					  			{
								value1: '成功',
								label: '成功',	
								},
								{
								value1: '失败',
								label: '失败',	
								}
					  		]),
					  value1: '',
					  value2,
		}
	  }
	}
</script>

<style type="text/css" scoped>
@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");
	.button{
		margin-top: -6px;
		margin-bottom: 20px;
		margin-left: 10px;
	}
	/* 删除表格数据按钮 */
	.button-delete{
		color: #ff4949;
		background: #ffeded;
		border-color: #ffb6b6;
		border: none;
		width: 90px;
	}
	.button-delete:hover{
		background: #ff4949;
		border-color: #ff4949;
		color: #fff;
		border: none;
		width: 90px;
	}
	/* 清空表格数据按钮 */
	.button-empty{
		width: 90px;
		color: #13ce66;
	    background: #e7faf0;
	    border-color: #a1ebc2;
		border: none;
	}
	.button-empty:hover{
		width: 90px;
		background: #13ce66;
		border-color: #13ce66;
		color: #fff;
		border: none;
	}
	
	
	/* 搜索按钮 */
	.search{
		margin-top: -26px;
    margin-left: -135px;
	}
	.search-ss {
		background-color: #085FC3;
		color: white;
		margin: 28px 0px 0px 150px;
		width: 80px;
	}
	/* 重置按钮 */
	.search-cz {
		background-color: white;
		color: black;
		margin: 20px 0px 0px 5px;
		width: 80px;
	}
	
	/* 操作日期 */
	.form-time{
		
		margin-left: 10px;
		}
	/* 登录状态 */
	.form-state{
		margin-left: 10px;
	}
	.form-states{
		width: 230px;
	}
	/* 登录类型 */
.form-type{
	margin-left: 10px;
	
}
.form-types{
	width: 225px;
}
	
/* 操作人员搜索样式 */
.form-staff{
	margin-left: 15px;
	width: 300px;
}
/* 系统模块搜索样式 */
.form-module{
	 margin-left: 10px;
	 width: 300px;
 }
</style>
