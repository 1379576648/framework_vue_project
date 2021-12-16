<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <!-- 标题 -->
        <div class="big-title">&nbsp;&nbsp;&nbsp;新增参保方案</div>

        <!-- 参保方案名称输入框 -->
        <div class="all-input">
          方案名称：&nbsp;
          <el-input v-model="schemeName" placeholder="输入方案名称" />
        </div>
        <!-- 标题 -->
        <div class="big-title">&nbsp;&nbsp;&nbsp;社保方案设置</div>

        <!-- 社保方案设置，表单 -->
        <div class="all-input">
          <span style="font-weight: bold">参缴社保</span><br />
          社保基数范围：
          <el-input-number
            v-model="security_cardinal_lower"
            size="small"
            :min="0"
            controls-position="right"
            placeholder="基数下限"
            style="width: 120px"
          />
          &nbsp; ~ &nbsp;
          <el-input-number
            v-model="security_cardinal_upper"
            size="small"
            :min="0"
            controls-position="right"
            placeholder="基数上限"
            style="width: 120px"
          />

          <!-- 社保缴纳项目表 -->
          <el-table :data="tableData" style="width: 100%">
            <!-- 缴纳项目 -->
            <el-table-column fixed prop="date" label="缴纳项目" width="150">
            </el-table-column>
            <!-- 基数范围 -->
            <el-table-column prop="name" label="基数范围" width="300">
              <template #default>
                <el-input-number
                  size="small"
                  :min="0"
                  controls-position="right"
                  placeholder="基数下限"
                  style="width: 120px"
                />
                &nbsp; ~ &nbsp;
                <el-input-number
                  size="small"
                  :min="0"
                  controls-position="right"
                  placeholder="基数上限"
                  style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 公司缴纳比例 -->
            <el-table-column prop="province" label="公司缴纳比例" width="180">
              <template #default>
                <el-input-number
                  size="small"
                  :min="0"
                  controls-position="right"
                  style="width: 120px"
                />&nbsp;&nbsp;%
              </template>
            </el-table-column>
            <!-- 个人缴纳比例 -->
            <el-table-column prop="city" label="个人缴纳比例" width="180">
              <template #default>
                <el-input-number
                  size="small"
                  :min="0"
                  controls-position="right"
                  style="width: 120px"
                />&nbsp;&nbsp;%
              </template>
            </el-table-column>
            <!-- 公司固定金额 -->
            <el-table-column prop="address" label="公司固定金额" width="150">
              <template #default>
                <el-input-number
                  size="small"
                  :min="0"
                  controls-position="right"
                  style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 个人固定金额 -->
            <el-table-column prop="zip" label="个人固定金额" width="150">
              <template #default>
                <el-input-number
                  size="small"
                  :min="0"
                  controls-position="right"
                  style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column prop="cz" label="操作" width="100">
              <template #default>
                <el-button type="text" size="small">删除 </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 标题 -->
        <div class="big-title">&nbsp;&nbsp;&nbsp;公积金方案设置</div>

        <!-- 公积金方案设置，表单 -->
        <div class="all-input">
          <el-table :data="tableData1" style="width: 100%" height="131">
            <!-- 缴纳项目 -->
            <el-table-column fixed prop="date" label="缴纳项目" width="150">
            </el-table-column>
            <!-- 基数范围 -->
            <el-table-column prop="name" label="基数范围" width="300">
              <template #default>
                <el-input-number
                  size="small"
                  :min="0"
                  controls-position="right"
                  placeholder="基数下限"
                  style="width: 120px"
                />
                &nbsp; ~ &nbsp;
                <el-input-number
                  size="small"
                  :min="0"
                  controls-position="right"
                  placeholder="基数上限"
                  style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 公司缴纳比例 -->
            <el-table-column prop="province" label="公司缴纳比例" width="180">
              <template #default>
                <el-input-number
                  size="small"
                  :min="0"
                  controls-position="right"
                  style="width: 120px"
                />&nbsp;&nbsp;%
              </template>
            </el-table-column>
            <!-- 个人缴纳比例 -->
            <el-table-column prop="city" label="个人缴纳比例" width="180">
              <template #default>
                <el-input-number
                  size="small"
                  :min="0"
                  controls-position="right"
                  style="width: 120px"
                />&nbsp;&nbsp;%
              </template>
            </el-table-column>
            <!-- 公司固定金额 -->
            <el-table-column prop="address" label="公司固定金额" width="150">
              <template #default>
                <el-input-number
                  size="small"
                  :min="0"
                  controls-position="right"
                  style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 个人固定金额 -->
            <el-table-column prop="zip" label="个人固定金额" width="150">
              <template #default>
                <el-input-number
                  size="small"
                  :min="0"
                  controls-position="right"
                  style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column prop="cz" label="操作" width="100">
              <template #default>
                <el-button type="text" size="small">删除 </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 标题 -->
        <div class="big-title">&nbsp;&nbsp;&nbsp;计算验证</div>

        <!-- 缴费计算表单 -->
        <div class="all-input">
          <el-input-number
            size="small"
            :min="0"
            controls-position="right"
            placeholder="请输入社保基数"
            style="width: 180px"
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <el-input-number
            size="small"
            :min="0"
            controls-position="right"
            placeholder="请输入公积金基数"
            style="width: 180px"
          />&nbsp;&nbsp;&nbsp;
          <el-button type="primary" size="small">计算</el-button>

          <!-- 弹出消息 -->
          <el-popover
            placement="right-start"
            title="结果四舍五入到分"
            :width="200"
            trigger="hover"
            content="如计算结果数额不对请检查以上基数比例及取整规则是否正确"
          >
            <template #reference>
              <el-button type="text"
                ><i class="iconfont">&#xe600;</i></el-button
              >
            </template>
          </el-popover>
          <br />
          个人缴纳：<span style="color: #ff9515">0</span>元&nbsp;&nbsp;&nbsp;
          公司缴纳：<span style="color: #ff9515">0</span>元
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="text" @click="payment_detail=!payment_detail">缴纳明细表</el-button>

          <br /><br />

          <!-- 缴纳明细表 -->
          <el-table v-show="payment_detail" :data="tableData" style="width: 99.1%">
            <el-table-column prop="date" label="缴纳项目" width="100" />
            <el-table-column prop="date" label="基数" width="100" />

            <el-table-column label="公司缴纳">
              <el-table-column prop="name" label="缴纳比例" width="100" />
              <el-table-column prop="state" label="缴纳金额" width="100" />
            </el-table-column>

            <el-table-column prop="date" label="公司固定金额" width="100" />

            <el-table-column label="个人缴纳">
              <el-table-column prop="name" label="缴纳比例" width="120" />
              <el-table-column prop="state" label="缴纳金额" width="120" />
            </el-table-column>

            <el-table-column prop="date" label="个人固定金额" width="100" />

            <el-table-column prop="date" label="小计" width="100" />
          </el-table>
        </div>
        <div style="text-align: center">
          <router-link :to="{path:this.path,query:{path:this.$route.query.path}}">
            <el-button size="small">取消</el-button>
          </router-link>
          &nbsp;&nbsp;
          <el-button size="small" type="primary">保存</el-button>
        </div>
      </div>
    </div>
  </div>
  &nbsp;
</template>

<script>
// import { ref, defineComponent } from "vue";

export default {
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
  },
  data() {
    return {
      path:"/social/basic_setup/insured_scheme",
      // 方案名称
      schemeName: "",
      // 社保基数下限
      security_cardinal_lower: 0,
      // 社保基数上限
      security_cardinal_upper: 0,
      // 社保基数
      security_cardinal:0,
      // 公积金基数
      accumulation_cardinal:0,
      // 缴纳明细表 (显示/隐藏)
      payment_detail:false,

      visible: false,
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
      tableData1: [
        {
          date: "2016-05-03",
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

<style scoped>
/*.el-input {*/
/*  width: 50%;*/
/*  display: inline-block;*/
/*}*/

.all-input {
  /*  上、右、下、左  */
  padding: 25px 40px 25px 40px;
}

/* 内边距 */
.j-card-body {
  padding: 1.5%;
}

.big-title {
  width: 100%;
  /*height: 45px;*/
  background-color: #f2f4fa;
  font-size: 16px;
  font-weight: bold;
  padding: 1%;
}

/* ::v-deep .el-input-number__decrease,::v-deep .el-input-number__increase {
  display: none;
}

::v-deep:hover .el-input-number__decrease,::v-deep:hover .el-input-number__increase {
  display: block;
} */

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

@font-face {
  font-family: 'iconfont';  /* Project id 2990377 */
  src: url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.woff2?t=1639139822080') format('woff2'),
  url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.woff?t=1639139822080') format('woff'),
  url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.ttf?t=1639139822080') format('truetype');
}

</style>