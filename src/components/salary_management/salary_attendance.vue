<!--考勤方案 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <span></span>
        <div style="margin-top: 20px">
          <router-link :to="{path:this.insertattendanceplan,query:{path: this.$route.query.path,name:'新增'}}">
            <button type="button" class="ant-btn ant-btn-primary">
              <i aria-label="图标: plus" class="anticon anticon-plus">
                <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                  <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
                </svg></i>
              <span>新增</span>
            </button>
          </router-link>
        </div>
        <div style="margin-top:-32px;">
          <!--搜索输入框-->
          <el-row style="width:140px;float:right;">
            <el-input v-model="seek" placeholder="方案名称">
              <template #suffix>
                <el-icon class="el-input__icon"><i-search/></el-icon>
              </template>
            </el-input>
          </el-row>
        </div>

        <!-- 表格内容部分 -->
        <div class="sub-Content__primary" style="margin-top: 50px">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="name" label="方案名称" width="180" />
            <el-table-column prop="name" label="核算规则" width="180" />
            <el-table-column prop="name" label="适用对象" width="180" />
            <el-table-column prop="name" label="职位" width="180" />
            <el-table-column prop="name" label="备注" width="180" />
            <el-table-column prop="name" label="状态" width="180" />
            <el-table-column fixed="right" label="操作" width="180">
              <template #default="scope">
                <router-link :to="{path:this.insertattendanceplan,query:{path: this.$route.query.path,name:'编辑'}}">
                  <el-button type="text"  size="small" @click="handleClick"
                  >编辑 </el-button
                  >
                </router-link>&nbsp;
                <el-button type="text" size="small" @click="handleClick">禁用 </el-button>
<!--                <el-button type="text" size="small">删除 </el-button>-->
                <el-popconfirm @confirm="deleteRow(scope.$index, tableData)"
                               title="确认要删除此方案吗?">
                  <template #reference>
                    <el-button type="text" size="small" style="color: orange">删除 </el-button>
                  </template>
                </el-popconfirm>

              </template>
            </el-table-column>
          </el-table>

        </div>

        <!-- 分页插件 -->
        <div class="demo-pagination-block">
          <el-pagination
              v-model:currentPage="pageInfo.currentPage"
              :page-sizes="[3, 5, 10, 50]"
              v-model:page-size="pageInfo.pagesize"
              :default-page-size="pageInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo.total"
              :pager-count="5"
              background
              @size-change="selectUsers"
              @current-change="selectUsers"
          >
          </el-pagination>
        </div>



      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  data(){
    return{
      //新增编辑考勤扣款方案
      insertattendanceplan:'/salary/insertattendanceplan',
      seek:"",
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
      ],
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },

    }
  },
  methods:{
    // 删除行
    deleteRow(index, rows) {
      rows.splice(index, 1);
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
    },
  }
}
</script>


<style scoped>
@import url("../../css/navigation.css");
/deep/.ant-btn-primary {
  color: #fff;
  background-color: #085fc3;
  border-color: #085fc3;
  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
  margin-left: 20px;
}
/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
}

/* 分页的样式 */
/deep/.demo-pagination-block {
  float: right;
  margin: 20px;
}

</style>