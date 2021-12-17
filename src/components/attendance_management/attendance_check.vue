<!--班次管理页面-->
<template>
  <div class="w">
    <router-link :to="{path: this.one,query:{path:this.$route.query.path}}">
      <el-button color="#409eff" style="color:black;margin-left:20px;margin-top:20px;">
        <el-icon>
          <i-plus/>
        </el-icon>
        <span>新增</span>
      </el-button>
    </router-link>
    <!-- 搜索框 -->
    <el-input v-model="input" placeholder="搜索" style="width:200px;float:right;margin-top:20px;margin-right:20px;">
      <template #suffix>
        <el-icon style="margin-top:9px;margin-right:10px">
          <i-search/>
        </el-icon>
      </template>
    </el-input>
    <!--  表格-->
    <div class="y">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="班次名称"/>
        <el-table-column prop="time" label="上班时间"/>
        <el-table-column prop="times" label="下班时间"/>
        <el-table-column prop="state" label="状态">
          <template #default>
            <button style="color:#79b8e8;border: 1px solid #79b8e8;border-radius:5px;font-size:14px;">&nbsp;&nbsp;启用&nbsp;&nbsp;</button>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template #default>
            <el-button type="text" size="small" @click="redact()">编辑</el-button>
            <span style="color:#e8e8e8">|</span>
            <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                :icon="InfoFilled"
                icon-color="red"
                title="确定禁用吗?"
                @confirm="through1()"
            >
              <template #reference>
                <el-button type="text" size="small">禁用</el-button>
              </template>
            </el-popconfirm>
            <span style="color:#e8e8e8">|</span>
            <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                :icon="InfoFilled"
                icon-color="red"
                title="确定删除吗?"
                @confirm="through2()"
            >
              <template #reference>
                <el-button type="text" size="small" style="color:darkorange">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--  分页-->
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="pageInfo.currenPage"
          :page-sizes="[3, 5, 10, 50]"
          v-model:page-size="pageInfo.pagesize"
          :default-page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          :pager-count="5"
          background
          @size-change="sele"
          @current-change="sele"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      // 新增路由地址
      one: '/attendance/check/classes/addclass',
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },
      tableData: [
        {
          name: 'Tom',
          time: '8:00',
          times: '18:00',

        },
        {
          name: 'Tom',
          time: '8:00',
          times: '18:00',
          state: '启用',
        },
        {
          name: 'Tom',
          time: '8:00',
          times: '18:00',
          state: '启用',
        },
        {
          name: 'Tom',
          time: '8:00',
          times: '18:00',
          state: '启用',
        }
      ],
    }
  },
  methods: {
    // 点击编辑跳转
    redact() {
      this.$router.push({
        path: this.one,
        query: {path: this.$route.query.path}
      })
    },
    // 点击禁用确认按钮触发
    through1() {
      alert(1)
    },
    // 点击删除确认按钮触发
    through2() {
      alert(1)
    },
  }
}
</script>

<style scoped>
/*居中*/
table * {
  text-align: center;
}

.w {
  margin-top: 20px;
  border: 1px solid #e9e9e9;

}

.w:hover {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  border-color: transparent;

}

.demo-pagination-block {
  margin-left: 850px;
  margin-top: 20px;
  margin-bottom: 30px;
}

/* 调整输入框的高度 */
::v-deep .el-input__inner {
  height: 32px;
}
</style>