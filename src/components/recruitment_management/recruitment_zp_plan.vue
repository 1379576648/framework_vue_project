<!-- 招聘导航栏 -->

<template>
	<div class="saas-main-content">
		<div class="j-card j-card-bordered mainContent">
			<div class="j-card-body ">
				<span></span>

				<!-- 表格按钮部分 -->
				<div class="mt-20 ml-20 mr-20">
					<!-- 新增招聘计划按钮 -->
					<a style="margin-top: 4px;">
						<router-link to="/addplan">
				        <button type="button" class="ant-btn ant-btn-primary">
							<span>新增招聘计划</span>
						</button>
						</router-link>
					</a>
					<!-- 批量导入按钮 -->
					<button style="margin-top: 4px; margin-left: 10px;" type="button" class="ant-btn abt">
						<span>批量导入</span>
					</button>
					
					<!-- 下拉选择器 -->
					<div class="resume-operation">
						 <el-select v-model="value1" clearable placeholder="招聘职位">
						    <el-option
						      v-for="item in options1"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value"
						    >
						    </el-option>
						  </el-select>
						  &nbsp;&nbsp;&nbsp;
						  <el-select v-model="value2" clearable placeholder="招聘状态">
						     <el-option
						       v-for="item in options2"
						       :key="item.value"
						       :label="item.label"
						       :value="item.value"
						     >
						     </el-option>
						   </el-select>
						<!--搜索输入框-->
						 &nbsp;&nbsp;&nbsp;
						<el-input style="width: 200px;" v-model="input" placeholder="招聘计划名称" clearable />
						<!--搜索按钮-->
						 &nbsp;&nbsp;&nbsp;
						 <el-button style="background-color: #085fc3; color: white;" size="small">Custom</el-button>
					</div>
					
					
				</div>

				<!-- 表格内容部分 -->
				<div class="sub-Content__primary">
					
					 <el-table :data="tableData" style="width: 100%" size="mini">
					    <el-table-column prop="ID" label="序号" width="150"/>
					    <el-table-column prop="zpname" label="招聘计划名称" width="200" />
					    <el-table-column prop="zpzw" label="招聘职位" width="200" />
					    <el-table-column prop="zpdept" label="需求部门" width="200" />
					    <el-table-column prop="zpnum" label="招聘人数" width="200" />
					    <el-table-column prop="statetime" label="发布时间" width="200" />
             <el-table-column prop="zpzt" label="招聘状态" width="200" />
             <el-table-column fixed="right" label="操作" width="180">
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
</template>

<script>
	
	export default{
		data() {
			return{
				//下拉选择器
				options1:[
					{value:'职位',label:'职位'},
					{value:'简历',label:'简历'}
				],
				options2:[
					{value:'职位',label:'职位'},
					{value:'简历',label:'简历'}
				],
				 value1:"",
				 value2:"",
				 //输入框数据
				 input:"",
				tableData: [
          {ID: '1', zpname: 'HTR2001招聘计划', zpzw: '研发人员', zpdept: '市场部', zpnum: '10', statetime: '2016-05-03',zpzt: '招聘中'},
          {ID: '1', zpname: 'HTR2001招聘计划', zpzw: '研发人员', zpdept: '市场部', zpnum: '10', statetime: '2016-05-03',zpzt: '招聘结束'},
        ]
			}
		}
	}

</script>


<style type="text/css" scoped> 
@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");
	.mainContent .sub-Content__primary {
	    padding: 12px 24px;
	    background: #fff;
	    border-radius: 4px;
	}
	.abt:hover{
		border: 1px solid #085FC3;
		color: #085FC3;
	}


  /deep/.el-table th.el-table__cell > .cell {
    display: inline-block;
    box-sizing: border-box;
    position: relative;
    vertical-align: middle;
    width: 100%;
    font-weight: initial;
    color: black;
  }
</style>

