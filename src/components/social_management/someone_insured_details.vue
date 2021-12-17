<template>
  <div class="outer-div">
    <!-- 标题 -->
    <div class="big-title">&nbsp;&nbsp;&nbsp;参保明细</div>
    <!-- 个人缴费信息 -->
    <div class="insured_details">
      <!-- 左 -->
      <div class="payment_details">
        <!-- 个人信息 -->
        <div style="float: left">
          <el-image class="picture" :src="url"></el-image>
        </div>
        <div style="margin-top: 20px">
          姓名：121321 <br />
          部门：2313213 <br />
          职位：321312321 <br /><br /><br />
          参保类型： 2312321<br />
          参保方案：31232131 <br />
          社保基数：213123213 <br />
          社保参保月份：1321321 <br />
          公积金基数：3213213 <br />
          公积金参保月份： 3213123213<br />
        </div>
        <el-button type="text">调整 </el-button>&nbsp;&nbsp;
        <el-button type="text">微调 </el-button>
      </div>

      <!-- 右 -->
      <div class="payment_project">
        <!-- 缴纳明细表 -->
        <el-table :data="tableData" size="mini">
          <el-table-column prop="date" label="缴纳项目" />
          <el-table-column prop="date" label="基数" />

          <el-table-column label="公司缴纳">
            <el-table-column prop="name" label="比例" />
            <el-table-column prop="state" label="金额" />
          </el-table-column>

          <el-table-column prop="date" label="公司固定金额" />

          <el-table-column label="个人缴纳">
            <el-table-column prop="name" label="比例" />
            <el-table-column prop="state" label="金额" />
          </el-table-column>

          <el-table-column prop="date" label="个人固定金额" />

          <el-table-column prop="date" label="小计" />
        </el-table>
      </div>
    </div>
    <!-- 标题 -->
    <div class="big-title">&nbsp;&nbsp;&nbsp;参保日志</div>

    <div class="outer-div">
      <!-- 参保日志  时间线 -->
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :hollow="activity.hollow"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
/* 时间线 */
import { defineComponent } from "vue";
// import { MoreFilled } from "@element-plus/icons-vue";

export default {
  setup() {
    return {
      /* 时间线 */
      activities: [
        {
          content: "Custom icon",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
          //   icon: MoreFilled,
        },
        {
          content: "Custom color",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87",
        },
        {
          content: "Custom size",
          timestamp: "2018-04-03 20:46",
          size: "large",
        },
        {
          content: "Custom hollow",
          timestamp: "2018-04-03 20:46",
          type: "primary",
          hollow: true,
        },
        {
          content: "Default node",
          timestamp: "2018-04-03 20:46",
        },
      ],
    };
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
/* 个人头像 */
.picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

/* 缴费项目 */
.payment_project {
  background-color: blue;
  display: inline-block;
  float: right;
  width: 73%;
}

/* 缴费信息 */
.payment_details {
  display: inline-block;
  float: left;
  width: 25%;
  margin-top: 50px;
}

/* 参保明细 */
.insured_details {
  text-align: center;
  height: 400px;
  margin: 0.5%;
}

/* 外层div */
.outer-div {
  padding: 10px 1%;
}

/* 标题 */
.big-title {
  width: 100%;
  //height: 45px;
  background-color: #f2f4fa;
  font-size: 16px;
  font-weight: bold;
  padding: 1%;
  margin-bottom: 20px;
}
</style>