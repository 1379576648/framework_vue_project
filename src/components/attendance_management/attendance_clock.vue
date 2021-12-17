<!--打卡记录-->
<template>
  <div class="w">
    <div class="head">
      <el-button size="medium">
        <el-icon style="font-size: 18px"><i-upload /></el-icon>导出
      </el-button>
      <el-button size="medium">
        <el-icon style="font-size: 18px"><i-folder-opened /></el-icon>导入
      </el-button>

      <el-date-picker
        v-model="value1"
        type="daterange"
        unlink-panels
        range-separator="TO"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        wdaWD
        aW
        :shortcuts="shortcuts"
        style="margin-left: 340px"
      >
      </el-date-picker>

      <el-select size="small" v-model="value" clearable placeholder="全部部门" style="margin-left: 25px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <el-input size="small" v-model="input" placeholder="搜索" style="width:150px;margin-left: 25px">
          <template #suffix>
          <el-icon style="margin-top:9px;margin-right:10px"><i-search /></el-icon>
        </template>
      </el-input>

    </div>

    <div class="y">
    <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="staff" label="员工名称"/> 
    <el-table-column prop="department" label="部门名称"/>
    <el-table-column prop="morning" label="早上打卡时间" />
    <el-table-column prop="afternoon" label="下午打卡时间" />
    <el-table-column prop="record" label="记录时间" />
    <el-table-column prop="operate" label="操作" >
      <template #default>
        <el-button type="text" size="small" style="color:darkorange">删除</el-button>
      </template>
    </el-table-column>
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
      shortcuts: [
        {
          text: "最近一周",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          },
        },
        {
          text: "最近一个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          },
        },
        {
          text: "最近三个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          },
        },
      ],
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
              staff:'123',
              department:'23',
              morning:'9:00',
              afternoon:'18:00',
              record:'8',

          },
          {
              staff:'123',
              department:'23',
              morning:'9:00',
              afternoon:'18:00',
              record:'8',

          },
          {
              staff:'123',
              department:'23',
              morning:'9:00',
              afternoon:'18:00',
              record:'8',

          },
          {
              staff:'123',
              department:'23',
              morning:'9:00',
              afternoon:'18:00',
              record:'8',

          },
          {
              staff:'123',
              department:'23',
              morning:'9:00',
              afternoon:'18:00',
              record:'8',

          }
      ],
      value1: "", //日期
      value: ref(""), //选择
    };
  },
};
</script>

<style>

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
  margin-left:850px ;
  margin-top: 20px;
  margin-bottom: 30px;
}

</style>

