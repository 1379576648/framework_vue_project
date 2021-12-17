<template>
  <!--  我的申请页面-->
  <div class="body_1">
    <el-tabs type="border-card">
      <el-tab-pane label="我的申请">
        <el-button @click="resetDateFilter">重置日期过滤</el-button>
        &nbsp;
        <el-input
            v-model="input"
            placeholder="输入名称搜索"
            style="width: 130px"
        />
        &nbsp;
        <el-button type="success" plain>搜索</el-button>
        <!-- 表格   -->
        <el-table
            ref="filterTable"
            row-key="date"
            :data="tableData"
            style="width: 100%"
        >
          <el-table-column
              prop="date"
              label="日期"
              sortable
              width="140"
              column-key="date"
              :filters="[
              { text: '2016-05-01', value: '2016-05-01' },
              { text: '2016-05-02', value: '2016-05-02' },
              { text: '2016-05-03', value: '2016-05-03' },
              { text: '2016-05-04', value: '2016-05-04' },
            ]"
              :filter-method="filterHandler"
          />
          <el-table-column prop="name" label="审批编号" width="100"/>
          <el-table-column prop="name" label="流程" width="100"/>
          <el-table-column prop="name" label="申请人" width="100"/>
          <el-table-column prop="name" label="状态" width="100"/>
          <el-table-column prop="name" label="当前审批人" width="100"/>
          <el-table-column prop="name" label="最近处理" width="100"/>
          <el-table-column label="操作">
            <template #default="scope">
              <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  :icon="InfoFilled"
                  icon-color="red"
                  title="确定撤销吗?"
                  @confirm="through1()"
              >
                <template #reference>
                  <el-button type="success" plain>撤销</el-button>
                </template>
              </el-popconfirm>
              <el-button
                  type="primary"
                  style="margin-left: 16px"
                  @click="drawer = true"
              >
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>

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
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!--   弹出抽屉 -->
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <span>臭傻逼啊看什么看</span>
    </el-drawer>
  </div>
</template>

<script scoped>
import {defineComponent, ref} from "vue";

export default {
  setup() {
    return {
      drawer: ref(false),
      input: ref(""),
    };
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "关闵绿",
          address: "yes	. 189, Grove St, Los Angeles",
          tag: "Home",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
          tag: "Office",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
          tag: "Home",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
          tag: "Office",
        },
      ],
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },
    };
  },
  methods: {
    //重置过滤
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    // 筛选
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // 点击撤销确认按钮触发
    through1() {
      alert(1)
    },
  },
};
</script>

<style scoped>
@import url("../../css/Examine_2.css");
</style>
