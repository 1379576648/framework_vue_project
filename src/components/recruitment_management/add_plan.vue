<!-- 新增招聘计划 -->

<template>
	<div class="saas-main-content">
		<div class="j-card j-card-bordered mainContent">
			<!--标题-->
			<div class="j-card-head">
				<div class="j-card-head-title">
					<span>新增招聘计划</span>
				</div>
			</div>
			<!--内容-->
			<div class="j-card-body ">
				<span></span>
				<div class="sub-Content__primary ">

					<div style="width: 50%; margin: auto;">
						<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px"
							class="demo-ruleForm">
							<el-form-item label="招聘计划名称" prop="name" style="width:500px;">
								<el-input v-model="ruleForm.name"></el-input>
							</el-form-item>

							<el-form-item label="需求部门" prop="region">
								<el-select v-model="ruleForm.region" placeholder="Activity zone" style="width:380px;">
									<el-option label="Zone one" value="shanghai"></el-option>
									<el-option label="Zone two" value="beijing"></el-option>
								</el-select>
							</el-form-item>

							<el-form-item label="招聘职位" prop="region">
								<el-select v-model="ruleForm.region" placeholder="Activity zone" style="width:380px;">
									<el-option label="Zone one" value="shanghai"></el-option>
									<el-option label="Zone two" value="beijing"></el-option>
								</el-select>
							</el-form-item>

							<el-form-item label="最低学历" prop="region">
								<el-select v-model="ruleForm.region" placeholder="Activity zone" style="width:380px;">
									<el-option label="Zone one" value="shanghai"></el-option>
									<el-option label="Zone two" value="beijing"></el-option>
								</el-select>
							</el-form-item>
							

							<el-form-item>
								<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
								<router-link to="zpplan">
									<el-button style="margin-left: 30px;">取消</el-button>
								</router-link>
							</el-form-item>
						</el-form>
					</div>




				</div>
			</div>

		</div>
	</div>
</template>

<script lang="ts">
	export default {
		data() {
			return {
				ruleForm: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					num:''
				},
				rules: {
					name: [{
							required: true,
							message: 'Please input Activity name',
							trigger: 'blur',
						},
						{
							min: 3,
							max: 5,
							message: 'Length should be 3 to 5',
							trigger: 'blur',
						},
					],
					region: [{
						required: true,
						message: 'Please select Activity zone',
						trigger: 'change',
					}, ],
					date1: [{
						type: 'date',
						required: true,
						message: 'Please pick a date',
						trigger: 'change',
					}, ],
					date2: [{
						type: 'date',
						required: true,
						message: 'Please pick a time',
						trigger: 'change',
					}, ],
					type: [{
						type: 'array',
						required: true,
						message: 'Please select at least one activity type',
						trigger: 'change',
					}, ],
					resource: [{
						required: true,
						message: 'Please select activity resource',
						trigger: 'change',
					}, ],
					desc: [{
						required: true,
						message: 'Please input activity form',
						trigger: 'blur',
					}, ],
				},
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!')
					} else {
						console.log('error submit!!')
						return false
					}
				})
			}
		},
	}
</script>

<style type="text/css" scoped> 
@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");
	.j-card-head-title {
		float: left;
		font-size: 18px;
		display: inline-block;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		color: rgba(0, 0, 0, 0.85);
		font-weight: 500;
		letter-spacing: 0.3px;
	}

	.mainContent .sub-Content__primary {
		padding: 12px 24px;
		background: #fff;
		border-radius: 4px;
	}
</style>
