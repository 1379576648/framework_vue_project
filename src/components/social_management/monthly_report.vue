<template>
<!--  月度报表 -->
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <!-- 单个 -->
        <div class="main_div">
          <div class="interior_left_div">
            <span class="social_accumulation">
              <span>2022-06</span> 社保公积金</span
            >
            <span style="font-size: 12px"> &nbsp;已归档</span>
            <br />
            <el-button type="text">导出参保明细</el-button>
            <el-button type="text">删除 </el-button>
          </div>

          <div class="interior_right_div">
            <div style="display: inline-block">
              <span style="margin: 35px">参保人数</span><br />
              <span style="margin: 35px">1</span>
            </div>

            <div style="display: inline-block">
              <span style="margin: 35px">个人缴费</span><br />
              <span style="margin: 35px">2</span>
            </div>

            <div style="display: inline-block">
              <span style="margin: 35px">企业缴费</span><br />
              <span style="margin: 35px">3</span>
            </div>

            <div style="display: inline-block; margin-left: 20px">
              <router-link to="sb3_2">
                <el-button type="text">详情></el-button></router-link
              >
            </div>
          </div>
          <br />
          <!-- 分割线 -->
          <div class="cut_off"></div>
        </div>

        <!-- 单个 -->
        <div class="main_div">
          <div class="interior_left_div">
            <span class="social_accumulation">
              <span>2022-06</span> 社保公积金</span
            >
            <span style="font-size: 12px"> &nbsp;已归档</span>
            <br />
            <el-button type="text">导出参保明细</el-button>
            <el-button type="text">删除 </el-button>
          </div>

          <div class="interior_right_div">
            <div style="display: inline-block">
              <span style="margin: 35px">参保人数</span><br />
              <span style="margin: 35px">1</span>
            </div>

            <div style="display: inline-block">
              <span style="margin: 35px">个人缴费</span><br />
              <span style="margin: 35px">2</span>
            </div>

            <div style="display: inline-block">
              <span style="margin: 35px">企业缴费</span><br />
              <span style="margin: 35px">3</span>
            </div>

            <div style="display: inline-block; margin-left: 20px">
              <el-button type="text">详情></el-button>
            </div>
          </div>
          <br />
          <!-- 分割线 -->
          <div class="cut_off"></div>
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
  &nbsp;
</template>

<script lang="ts">
export default {
  data() {
    return {
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
      multipleSelection: [],
    };
  },
};
</script>

<style scoped>
/* 分割线 */
.cut_off {
  width: 100%;
  border-bottom: 1px solid #ededed;
}

/* 右div */
.interior_right_div {
  display: inline-block;
  float: right;
  margin-top: 10px;
}

/* 社保公积金 */
.social_accumulation {
  font-weight: bold;
  font-size: 16px;
}

/* 左div */
.interior_left_div {
  display: inline-block;
}

/* 大div */
.main_div {
  margin-bottom: 10px;
}

/* 分页的样式 */
.demo-pagination-block {
  float: right;
  margin: 20px;
}

/* 外层div 内边距 */
.j-card-body {
  padding: 20px 25px 20px 25px;
}

/* 外层阴影 */
.saas-main-content {
  padding-top: 12px;
  min-height: 500px;
}

.j-card-bordered {
  border: 1px solid #e9e9e9;
}

.j-card {
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  margin-top: 8px;
  min-height: 100%;
}
.j-card:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: transparent;
}
.j-card-bordered {
  border: 1px solid #e9e9e9;
  border-top-color: rgb(233, 233, 233);
  border-right-color: rgb(233, 233, 233);
  border-bottom-color: rgb(233, 233, 233);
  border-left-color: rgb(233, 233, 233);
}
.j-card {
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  margin-top: 8px;
  min-height: 100%;
}

.j-card-body{
  padding:2%;
}

</style>
