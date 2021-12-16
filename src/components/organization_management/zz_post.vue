<template>
  <div class="w">
    <div class="head">
      <el-input size="small" v-model="input" placeholder="搜索" style="width:150px;margin-left: 25px">
          <template #suffix>
          <el-icon style="margin-top:9px;margin-right:10px"><i-search /></el-icon>
        </template>
      </el-input>

    </div>

    <div class="y">
    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="applyfor" label="职位"/> 
		<el-table-column prop="department" label="所属部门"/>
		<el-table-column prop="place" label="部门负责人" />
		<el-table-column prop="thing" label="状态" />
		<!-- <el-table-column prop="operate" label="操作" >
      <template #default>
        <el-button type="text" size="small" style="color:darkorange">删除</el-button>
      </template>
    </el-table-column> -->
    </el-table>
    </div>

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
import { ref, defineComponent } from "vue";
export default {
  data() {
    return {
        pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },
      options: ref([
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ]), 
      tableData: [
          {
              applyfor:'销售总监',
              department:'开发部',
              place:'阿贝多',
              thing:'启用'
          },
           {
              applyfor:'品牌经理',
              department:'培训部',
              place:'凯亚',
              thing:'禁用'
          },
           {
              applyfor:'商务经理',
              department:'情报部',
              place:'安伯',
              thing:'启用'
          },
           {
              applyfor:'高级软件工程师',
              department:'运营部',
              place:'丽莎',
              thing:'启用'
          },
          {
              applyfor:'高级管理',
              department:'运营部',
              place:'芭芭拉',
              thing:'启用'
          },
      ],
      value1: "", //日期
      value: ref(""), //选择
    };
  },
};
</script>

<style scoped>

table *{
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
.y{
    margin-top: 20px;
}
.head {
  margin-left: 2%;
  margin-top: 2%;
}

.demo-pagination-block{
  margin-left:630px ;
  margin-top: 20px;
  margin-bottom: 30px;
}

</style>

