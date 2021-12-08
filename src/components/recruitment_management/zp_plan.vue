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
						<router-link to="addplan">
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
					
					 <el-table :data="tableData" style="width: 100%">
					    <el-table-column prop="date" label="Date" width="150" />
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
</template>

<script>
	
	import { ref, defineComponent } from 'vue'
	
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
				         {
				           date: '2016-05-03',
				           name: 'Tom',
				           state: 'California',
				           city: 'Los Angeles',
				           address: 'No. 189, Grove St, Los Angeles',
				           zip: 'CA 90036',
				           tag: 'Home',
				         },
				         {
				           date: '2016-05-02',
				           name: 'Tom',
				           state: 'California',
				           city: 'Los Angeles',
				           address: 'No. 189, Grove St, Los Angeles',
				           zip: 'CA 90036',
				           tag: 'Office',
				         },
				         {
				           date: '2016-05-04',
				           name: 'Tom',
				           state: 'California',
				           city: 'Los Angeles',
				           address: 'No. 189, Grove St, Los Angeles',
				           zip: 'CA 90036',
				           tag: 'Home',
				         },
				         {
				           date: '2016-05-01',
				           name: 'Tom',
				           state: 'California',
				           city: 'Los Angeles',
				           address: 'No. 189, Grove St, Los Angeles',
				           zip: 'CA 90036',
				           tag: 'Office',
				         },
						 {
						   date: '2016-05-01',
						   name: 'Tom',
						   state: 'California',
						   city: 'Los Angeles',
						   address: 'No. 189, Grove St, Los Angeles',
						   zip: 'CA 90036',
						   tag: 'Office',
						 }
				       ]
			}
		}
	}

</script>


<style type="text/css" scoped> 
@import url("../../css/Navigation.css");
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
</style>

