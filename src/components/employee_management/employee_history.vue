<!--历史花名册页面-->
<template>
	<div class="saas-main-content">
		<div class="j-card j-card-bordered mainContent">
			<div class="j-card-body ">
				<span></span>
			     <br/>
				<!--搜索输入框-->
        <div style="margin-left: 1161px;">
				<el-row style="width:150px;">
				<el-input v-model="seek" placeholder="搜索" size="small" @input="selectQuit">
					<template #suffix>
					<el-icon class="el-input__icon"><i-search/></el-icon>
					</template>
				</el-input>
				</el-row>
        </div>

				<!-- 表格内容部分 -->
				<div class="sub-Content__primary">
					
					 <el-table :data="tableData" stripe style="width: 100%"
                     :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                        <el-table-column prop="name" label="姓名" width="120" />
                        <el-table-column prop="depart" label="部门" width="150" />
                        <el-table-column prop="post" label="职位" width="150" />
                        <el-table-column prop="phone" label="手机号" width="150" />
                        <el-table-column prop="email" label="邮箱" width="150" />
                        <el-table-column prop="leaf" label="工龄" width="150" />
                        <el-table-column prop="entrydate" label="入职日期" width="180" />
                        <el-table-column prop="dimdate" label="离职日期" width="180" />
                        <el-table-column prop="dimcause" label="离职原因" />
                    </el-table>
					
				</div>

        <!-- 分页插件 -->
        <div class="demo-pagination-block">
          <el-pagination
              v-model:currentPage="pageInfo.currentPage"
              :page-sizes="[4, 5, 10, 50]"
              v-model:page-size="pageInfo.pagesize"
              :default-page-size="pageInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo.total"
              :pager-count="5"
              prev-text="上一页"
              next-text="下一页"
              @size-change="selectQuit()"
              @current-change="selectQuit()"
              background
          >
          </el-pagination>
        </div>



      </div>
		</div>
	</div>
  {{this.tableData}}
</template>

<script>
	import {ElNotification} from "element-plus";

  export default {
    data(){
      return{
        url: "http://localhost:80/",
          seek:"",
        pageInfo: {
          // 分页参数
          currentPage: 1, //当前页
          pagesize: 3, // 页大小
          total: 0, // 总页数
        },
        tableData:[],
      }
    },
    methods:{
      //查询历史花名册
      selectQuit() {
        var _this = this
        this.axios({
          method: 'post',
          url: this.url + 'selectQuit',
          data: {
            //当前页
            'currentPage': this.pageInfo.currentPage,
            //页大小
            "pagesize": this.pageInfo.pagesize,
            //名称
            "staffName": this.seek,
          },
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          //如果服务关闭
          if (response.data.data.data) {
            ElNotification.warning({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              _this.tableData = response.data.data.info.records
              _this.pageInfo.total = response.data.data.info.total
            }
            //如果服务是雪崩的
            else {
              ElNotification.warning({
                title: '提示',
                message: "服务发生雪崩",
                offset: 100,
              })
            }
          }
        })
      },
      mounted(){
        this.selectQuit();
      }
    }
  }

</script>


<style scoped>
@import url("../../css/navigation.css");
	/deep/.mainContent .sub-Content__primary {
	    padding: 12px 24px;
	    background: #fff;
	    border-radius: 4px;
	}

  /deep/.cell {
    padding-left: 10px;
    text-align: center;
    color: black;
    font-size: 12px;
  }
  /* 分页的样式 */
 /deep/ .demo-pagination-block {
    float: right;
    margin: 20px;
  }

</style>
