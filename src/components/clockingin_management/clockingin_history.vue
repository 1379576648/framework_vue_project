<!--历史归档-->
<template>
  <!--  员工考勤历史归档页面-->
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <!-- 单个 -->
        <div class="main_div">
          <div class="interior_left_div">
            <!-- 归档名称 -->
            <span class="social_accumulation"></span>
            <span style="font-size: 12px"> &nbsp;已归档</span>
            <br/>
            <el-button type="text">导出参保明细</el-button>
          </div>

          <div class="interior_right_div">

            <div style="display: inline-block; margin-left: 20px">
              <el-button type="text">详情></el-button>
            </div>
          </div>
          <br/>
          <!-- 分割线 -->
          <div class="cut_off"></div>
        </div>
        <div v-if="tableData===''" style="text-align: center;line-height: 30px">
          暂无归档数据
          <br/>
          <!-- 分割线 -->
          <div class="cut_off"></div>
        </div>

        <!-- 分页 -->
        <div class="demo-pagination-block">
          <el-pagination v-model:current-page="pageInfo.currenPage"
                         v-model:page-size="pageInfo.pageSize"
                         :default-page-size="pageInfo.pageSize"
                         :page-sizes="[5, 10,15,20]"
                         :pager-count="5"
                         :total="pageInfo.total"
                         background
                         layout="	total ,sizes, prev, pager, next, jumper"
                         next-text="下一页"
                         prev-text="上一页"
                         @size-change="next()"
                         @current-change="next()"
                         @prev-click="next()"
                         @next-click="next()">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      // 分页
      pageInfo: {
        /* 当前的页 */
        currenPage: 1,
        //页大小
        pageSize: 5,
        //总条数
        total: 0,
      },
      activeName: "first",
      value2: "",
      //详情页显示隐藏
      archive: false,
      // 历史归档数据
      tableData: []

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
  margin: 10px 0 10px 10px;
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

.j-card-body {
  padding: 2% 2% 0 2%;
}

</style>
