<!-- 登录日志页面 -->

<template>
	<div class="saas-main-content">
		<div class="j-card j-card-bordered mainContent">
			<div class="j-card-body ">
				<div class="mt-20 ml-20 mr-20">
					<el-form :inline="true"	>
						<!-- 系统模块搜索 -->
						<el-form-item label="系统模块">
							<el-input style="border: 1px;width: 243px;" size="small" placeholder="请输入系统模块"></el-input>
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
                    margin-left: 0px;
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

          <!-- 表格内容部分 -->
          <div class="sub-Content__primary">
            <el-table :data="tableData" style="width: 100%"
                      :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                      :cell-style="{ textAlign: 'center' }"
                      :default-sort="{ prop: 'date', order: 'descending' }"
                      >
              <!-- 全选操作按钮 -->
              <el-table-column type="selection" width="50" />
              <el-table-column prop="id" label="日志编号" width="105" />
              <el-table-column prop="module" label="系统模块" width="105" />
              <el-table-column prop="type" label="操作类型" width="105" />
              <el-table-column prop="name" label="员工名称" width="105" />
              <el-table-column prop="post" label="员工职位" width="105" />
              <el-table-column prop="beg_way" label="请求方式" width="110" />
              <el-table-column prop="state" label="操作状态" width="100" />
              <el-table-column prop="beg_site" label="请求地址" width="125" />
              <el-table-column prop="ip"  label="IP地址" width="125" />
              <el-table-column prop="date" sortable label="操作日期" width="150" />
              <el-table-column align="center" label="操作" width="105">
                <template #default="scope">
                    <span style="color: deepskyblue; font-size: 14px" @click="aaaaaa()">
                      <i class="iconfont" style="margin-left: 19px;margin-top: 2px;display: block;float:left">
                        &#xe681
                      </i>
                      详细
                    </span>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <el-dialog  width="750px" style="background-color: red" v-model="particular" title="操作日志详细">
            <el-form class="el-form">
            <!-- 操作日志详情 -->
              <el-form-item style="font-weight: bold;size: 14px;margin-left: 10px" label="操作日志：">
                <el-input size="small" :disabled="true" style=" width: 245px;" v-model="value4"></el-input>
              </el-form-item>
            <!-- 请求地址详情 -->
              <el-form-item style="margin-left: 351px;margin-top: -62px;font-weight: bold;size: 14px" label="请求地址：">
                <el-input size="small" :disabled="true" style="width: 245px;font-weight: bold;size: 14px" v-model="value4"></el-input>
              </el-form-item>
            <!-- 请求方式详情 -->
              <el-form-item class="zhiti"  label="请求方式：">
                <el-input size="small" :disabled="true" style="width: 583px;font-weight: bold;size: 14px" v-model="value4"></el-input>
              </el-form-item>
            <!-- 操作方法详情 -->
              <el-form-item class="zhiti"  label="操作方法：">
                <el-input size="small" :disabled="true" style="width: 583px;font-weight: bold;size: 14px" v-model="value4"></el-input>
              </el-form-item>
            <!-- 请求参数详情 -->
              <el-form-item class="zhiti" label="请求参数：">
                <el-input :disabled="true" style="width: 583px;font-weight: bold;size: 14px" v-model="value4" type="textarea"></el-input>
              </el-form-item>
            <!-- 返回参数详情-->
              <el-form-item class="zhiti" label="返回参数：">
                <el-input :disabled="true" style="width: 583px;font-weight: bold;size: 14px" v-model="value4" type="textarea"></el-input>
              </el-form-item>
            <!-- 操作状态详情 -->
              <el-form-item class="zhiti" label="操作状态：">
                <el-input :disabled="true" size="small" style="width: 245px;font-weight: bold;size: 14px" v-model="value4"></el-input>
              </el-form-item>
            <!-- 操作时间详情 -->
              <el-form-item style="font-weight: bold;size: 14px;margin-left: 351px;margin-top: -62px;" label="操作时间：">
                <el-input :disabled="true" size="small" style="width: 245px;font-weight: bold;size: 14px" v-model="value4"></el-input>
              </el-form-item>
            <el-button style="margin-left: 624px;margin-bottom: -10px;background-color:#f5f7fa" @click="particular=false">关闭</el-button>
            </el-form>
          </el-dialog>



          <!-- 分页 -->
          <div class="demo-pagination-block">
            <el-pagination
                v-model:currentPage="currentPage4"
                :page-sizes="[1, 2, 3, 4]"
                :page-size="1"
                layout="total, sizes, prev, pager, next, jumper"
                :total="10"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                >
            </el-pagination>
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
      //分页
      const handleSizeChange = (val) => {
        console.log(`${val} items per page`)
      }
      const handleCurrentChange = (val) => {
        console.log(`current page: ${val}`)
      }

			//操作时间
			const value2 = ref('')
			return {
        //操作日志详细对话框
        particular:false,

        // 分页
        currentPage1: ref(5),
        currentPage2: ref(5),
        currentPage3: ref(5),
        currentPage4: ref(4),
        handleSizeChange,
        handleCurrentChange,

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
            //表格
            tableData: [{
              id: "1",
              module: "2",
              type: "3",
              name: "4",
              post: "5",
              beg_way: "6",
              state:"7",
              beg_site:"8",
              ip:"i9",
              date:"2002-2-02 11:12:11"
            },
              {
                id: "2",
                module: "2",
                type: "3",
                name: "4",
                post: "5",
                beg_way: "6",
                state:"7",
                beg_site:"8",
                ip:"i9",
                date:"2002-03-03 12:13:12"
              },
              {
                id: "3",
                module: "2",
                type: "3",
                name: "4",
                post: "5",
                beg_way: "6",
                state:"7",
                beg_site:"8",
                ip:"i9",
                date:"2002-2-02 11:12:11"
              },
            ],
        value4:''
		}
	  },
    methods:{
      aaaaaa(){
        this.particular=true;
        this.value4 =this.tableData[2].id

      }
    }
	}
</script>

<style type="text/css" scoped>

@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");

/deep/.el-dialog__body{
  background-color: #f5f7fa;
}

.zhiti{
  font-weight: bold;
  size: 14px;
  margin-left: 10px;
  margin-top: -10px;
}

/deep/.el-dialog__body .el-input--small .el-input__inner {
  height: 32px;
  line-height: 32px;
  border: none;
}
/deep/.el-textarea__inner{
  min-height: 32.6px;
  border: none;
  resize: none;
}



@font-face {
  font-family: 'iconfont';  /* Project id 2994452 */
  src: url('//at.alicdn.com/t/font_2994452_unxan6g2m8r.woff2?t=1639051095780') format('woff2'),
  url('//at.alicdn.com/t/font_2994452_unxan6g2m8r.woff?t=1639051095780') format('woff'),
  url('//at.alicdn.com/t/font_2994452_unxan6g2m8r.ttf?t=1639051095780') format('truetype');
}


/* 分页 */
.demo-pagination-block{
  margin-left: 600px;
  margin-bottom: 20px;
}

  /*表格样式*/
 .sub-Content__primary{
  margin-bottom: 10px;
}
	.button{
		margin-top: -6px;
		margin-bottom: 20px;

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
		
		margin-left: 0px;
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
