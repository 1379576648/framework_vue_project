<!--历史归档-->
<template>
  <!--  员工考勤历史归档页面-->
  <div class="head">
    <div class="head-to">
      <el-tabs v-model="activeName">
        <el-tab-pane name="first">
          <template #label>
            <span style="font-size: 24px"> 员工考勤历史归档 </span>
          </template>
        </el-tab-pane>
      </el-tabs>
      <!--  选择月份-->
      <el-date-picker v-model="value2" type="month" placeholder="请选择月份！">
      </el-date-picker>
    </div>
    <div class="centre">
      <el-icon style="font-size: 16px; color: #409eff"
      >
        <i-arrow-right-bold
        />
      </el-icon>
      <span style="margin-left: 40px">2021-6月份员工报表</span>
      <span style="margin-left: 750px; color: rgb(148, 140, 140)"
      >总人数：</span
      >
      <span>14</span>
      <span style="margin-left: 100px; color: rgb(148, 140, 140)"
      >全勤人数:</span
      >
      <span>1</span>
    </div>
    <div class="amei"></div>
    <div class="tis">
      <el-alert
          title="迟到、早退和补打卡的统计单位为 “次”; 所有假期类型、出差、旷工的统计单位均为 “天” 。 "
          type="warning"
          show-icon
      >
      </el-alert>
    </div>
    <!-- 表格-->
    <div class="bottom">
      <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%"
          height="320"
      >
        <el-table-column prop="A" fixed label="名称"/>
        <el-table-column prop="B" fixed label="部门"/>
        <el-table-column prop="C" label="正常次数"/>
        <el-table-column prop="D" label="迟到次数"/>
        <el-table-column prop="D" label="早退次数"/>
        <el-table-column prop="D" label="旷工次数"/>
        <el-table-column prop="C" label="是否全勤"/>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      value2: "",
      // 历史归档数据
      tableData: [
        {
          A: '王鑫',
          B: '人事部',
          C: '1',
          D: '2',
        }, {
          A: '王鑫',
          B: '人事部',
          C: '1',
          D: '2',
        }, {
          A: '王鑫',
          B: '人事部',
          C: '1',
          D: '2',
        },

      ]

    };
  },
};
</script>

<style scoped>
.head {
  margin-top: 7px;
  border: 1px solid #e9e9e9;
  margin-left: 20px;
  margin-right: 5px;
  margin-bottom: 10px;
}

.head:hover {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  border-color: transparent;
}

.head-to {
  margin-left: 20px;
  margin-top: 15px;
}

.centre {
  margin-left: 20px;
  margin-top: 20px;
}

.amei {
  height: 2px;
  background-color: rgb(9, 152, 248);
  margin-top: 20px;
  margin-left: 20px;
}
.tis{
  margin-left: 20px;
}

.bottom {
  margin-top: 30px;
  margin-left: 20px;
}
</style>