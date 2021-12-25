<template>
<!-- 新增修改方案 -->
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <!-- 标题 -->
        <div class="big-title">&nbsp;&nbsp;&nbsp;{{ this.$route.query.name }}参保方案</div>

        <!-- 参保方案名称输入框 -->
        <div class="all-input">
          方案名称：&nbsp;
          <el-input v-model="schemeName" placeholder="输入方案名称"/>
        </div>
        <!-- 标题 -->
        <div class="big-title">&nbsp;&nbsp;&nbsp;社保方案设置</div>

        <!-- 社保方案设置，表单 -->
        <div class="all-input">
          <span style="font-weight: bold">参缴社保</span><br/>
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

          <!-- 社保缴纳项目，表单 -->
          <el-table :data="social_tableData" max-height="464" style="width: 100%">
            <!-- 缴纳项目 -->
            <el-table-column fixed label="缴纳项目" width="150">
              <template #default="scope">
                <el-select size="small" v-model="scope.row.payment_name" filterable placeholder="Select">
                  <el-option
                      v-for="item in social_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <!-- 基数范围 -->
            <el-table-column label="基数范围" width="300">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.lower"
                    size="small"
                    :min="0"
                    controls-position="right"
                    placeholder="基数下限"
                    style="width: 120px"
                />
                &nbsp; ~ &nbsp;
                <el-input-number
                    v-model="scope.row.upper"
                    size="small"
                    :min="0"
                    controls-position="right"
                    placeholder="基数上限"
                    style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 公司缴纳比例 -->
            <el-table-column label="公司缴纳比例" width="180">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.company_payment_ratio"
                    size="small"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />&nbsp;&nbsp;%
              </template>
            </el-table-column>
            <!-- 个人缴纳比例 -->
            <el-table-column label="个人缴纳比例" width="180">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.personage_payment_ratio"
                    size="small"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />&nbsp;&nbsp;%
              </template>
            </el-table-column>
            <!-- 公司固定金额 -->
            <el-table-column label="公司固定金额" width="150">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.company_fixed_money"
                    size="small"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 个人固定金额 -->
            <el-table-column prop="zip" label="个人固定金额" width="150">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.personage_fixed_money"
                    size="small"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" width="100">
              <template #default="scope">
                <el-button @click.prevent="deleteRow(scope.$index, social_tableData)" type="text" size="small">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <br/>
          <!-- 新增社保缴纳项目 -->
          <el-button @click="add_social()" size="small" type="primary">+添加缴纳项目</el-button>
        </div>
        <!-- 标题 -->
        <div class="big-title">&nbsp;&nbsp;&nbsp;公积金方案设置</div>

        <!-- 公积金方案设置，表单 -->
        <div class="all-input">
          <el-table :data="accumulation_tableData" max-height="236" style="width: 100%">
            <!-- 缴纳项目 -->
            <el-table-column fixed label="缴纳项目" width="150">
              <template #default="scope">
                <el-select size="small" v-model="scope.row.payment_name" filterable placeholder="Select">
                  <el-option
                      v-for="item in accumulation_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <!-- 基数范围 -->
            <el-table-column label="基数范围" width="300">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.lower"
                    size="small"
                    :min="0"
                    controls-position="right"
                    placeholder="基数下限"
                    style="width: 120px"
                />
                &nbsp; ~ &nbsp;
                <el-input-number
                    v-model="scope.row.upper"
                    size="small"
                    :min="0"
                    controls-position="right"
                    placeholder="基数上限"
                    style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 公司缴纳比例 -->
            <el-table-column label="公司缴纳比例" width="180">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.company_payment_ratio"
                    size="small"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />&nbsp;&nbsp;%
              </template>
            </el-table-column>
            <!-- 个人缴纳比例 -->
            <el-table-column prop="city" label="个人缴纳比例" width="180">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.personage_payment_ratio"
                    size="small"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />&nbsp;&nbsp;%
              </template>
            </el-table-column>
            <!-- 公司固定金额 -->
            <el-table-column prop="address" label="公司固定金额" width="150">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.company_fixed_money"
                    size="small"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 个人固定金额 -->
            <el-table-column prop="zip" label="个人固定金额" width="150">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.personage_fixed_money"
                    size="small"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" width="100">
              <template #default="scope">
                <el-button @click.prevent="deleteRow(scope.$index, accumulation_tableData)" type="text" size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <br/>
          <!-- 新增公积金缴纳项目 -->
          <el-button @click="add_accumulation()" size="small" type="primary">+添加缴纳项目</el-button>
        </div>

        <!-- 标题 -->
        <div class="big-title">&nbsp;&nbsp;&nbsp;计算验证</div>

        <!-- 缴费计算表单 -->
        <div class="all-input">
          <el-input-number
              v-model="security_cardinal"
              size="small"
              :min="0"
              controls-position="right"
              placeholder="请输入社保基数"
              style="width: 180px"
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <el-input-number
              v-model="accumulation_cardinal"
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
          <br/>
          个人缴纳：<span style="color: #ff9515">0</span>元&nbsp;&nbsp;&nbsp;
          公司缴纳：<span style="color: #ff9515">0</span>元
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="text" @click="payment_detail=!payment_detail">缴纳明细表</el-button>

          <br/><br/>

          <!-- 缴纳明细表 -->
          <el-table v-show="payment_detail" :data="payment_details_table" style="width: 99.1%">
            <el-table-column prop="payment_name" label="缴纳项目"/>
            <el-table-column prop="cardinal_number" label="基数"/>

            <el-table-column label="公司缴纳">
              <el-table-column prop="company_payment_ratio" label="缴纳比例"/>
              <el-table-column prop="company_payment_money" label="缴纳金额"/>
            </el-table-column>

            <el-table-column prop="company_fixed_money" label="公司固定金额"/>

            <el-table-column label="个人缴纳">
              <el-table-column prop="personage_payment_ratio" label="缴纳比例"/>
              <el-table-column prop="personage_payment_money" label="缴纳金额"/>
            </el-table-column>

            <el-table-column prop="personage_fixed_money" label="个人固定金额"/>

            <el-table-column prop="date" label="小计"/>
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
import {ref, defineComponent} from "vue";
import {ElMessage} from "element-plus";

export default {
  methods: {
    // 删除行
    deleteRow(index, rows) {
      rows.splice(index, 1);
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
    },
    // 新增社保缴纳项目
    add_social() {
      let social_row = {
        payment_name: "养老保险", // 缴费项目
        lower: null, // 基数下限、
        upper: null, // 基数上限
        company_payment_ratio: null, // 公司缴纳比例
        personage_payment_ratio: null, // 个人缴纳比例
        company_fixed_money: null, // 公司固定金额
        personage_fixed_money: null, // 个人固定金额
      }
      this.social_tableData.push(social_row)
    },
    // 新增公积金缴纳项目
    add_accumulation() {
      let accumulation_row = {
        payment_name: "公积金", // 缴费项目
        lower: null, // 基数下限、
        upper: null, // 基数上限
        company_payment_ratio: null, // 公司缴纳比例
        personage_payment_ratio: null, // 个人缴纳比例
        company_fixed_money: null, // 公司固定金额
        personage_fixed_money: null, // 个人固定金额
      }
      this.accumulation_tableData.push(accumulation_row)
    },
  },
  data() {
    return {
      path: "/social/basic_setup/insured_scheme",
      // 方案名称
      schemeName: "",
      // 社保基数下限
      security_cardinal_lower: 0,
      // 社保基数上限
      security_cardinal_upper: 0,
      // 社保基数
      security_cardinal: 0,
      // 公积金基数
      accumulation_cardinal: 0,
      // 缴纳明细表 (显示/隐藏)
      payment_detail: false,
      // 社保缴纳项目
      social_options: [
        {
          value: '养老保险',
          label: '养老保险',
        },
        {
          value: '失业保险',
          label: '失业保险',
        },
        {
          value: '工伤保险',
          label: '工伤保险',
        },
        {
          value: '生育保险',
          label: '生育保险',
        },
        {
          value: '医疗保险',
          label: '医疗保险',
        },
      ],
      // 公积金缴纳项目
      accumulation_options: [
        {
          value: '公积金',
          label: '公积金',
        },
        {
          value: '补充公积金',
          label: '补充公积金',
        },
      ],
      // 社保缴纳表数据
      social_tableData: [
        {
          payment_name: "养老保险", // 缴费项目
          lower: 1, // 基数下限
          upper: 2, // 基数上限
          company_payment_ratio: 3, // 公司缴纳比例
          personage_payment_ratio: 4, // 个人缴纳比例
          company_fixed_money: 5, // 公司固定金额
          personage_fixed_money: 6, // 个人固定金额
        },
        {
          payment_name: "养老保险", // 缴费项目
          lower: null, // 基数下限、
          upper: null, // 基数上限
          company_payment_ratio: null, // 公司缴纳比例
          personage_payment_ratio: null, // 个人缴纳比例
          company_fixed_money: null, // 公司固定金额
          personage_fixed_money: null, // 个人固定金额
        },
        {
          payment_name: "养老保险", // 缴费项目
          lower: null, // 基数下限、
          upper: null, // 基数上限
          company_payment_ratio: null, // 公司缴纳比例
          personage_payment_ratio: null, // 个人缴纳比例
          company_fixed_money: null, // 公司固定金额
          personage_fixed_money: null, // 个人固定金额
        },
        {
          payment_name: "养老保险", // 缴费项目
          lower: null, // 基数下限、
          upper: null, // 基数上限
          company_payment_ratio: null, // 公司缴纳比例
          personage_payment_ratio: null, // 个人缴纳比例
          company_fixed_money: null, // 公司固定金额
          personage_fixed_money: null, // 个人固定金额
        },
        {
          payment_name: "养老保险", // 缴费项目
          lower: null, // 基数下限、
          upper: null, // 基数上限
          company_payment_ratio: null, // 公司缴纳比例
          personage_payment_ratio: null, // 个人缴纳比例
          company_fixed_money: null, // 公司固定金额
          personage_fixed_money: null, // 个人固定金额
        },
      ],
      // 公积金缴纳表数据
      accumulation_tableData: [
        {
          payment_name: "公积金", // 缴费项目
          lower: 1, // 基数下限、
          upper: 2, // 基数上限
          company_payment_ratio: 3, // 公司缴纳比例
          personage_payment_ratio: 4, // 个人缴纳比例
          company_fixed_money: 5, // 公司固定金额
          personage_fixed_money: 6, // 个人固定金额
        },
      ],
      //缴纳明细表数据
      payment_details_table: [
        {
          payment_name: "养老保险", // 缴纳项目
          cardinal_number: 999, // 基数
          company_payment_ratio: "11%", // 公司缴纳比例
          company_payment_money: 100, // 公司缴纳金额
          company_fixed_money: 200, // 公司固定金额
          personage_payment_ratio: "6%", // 个人缴纳比例
          personage_payment_money: 66, // 个人缴纳金额
          personage_fixed_money: 50, // 个人固定金额
        },
        {
          payment_name: "a保险", // 缴纳项目
          cardinal_number: 999, // 基数
          company_payment_ratio: "11%", // 公司缴纳比例
          company_payment_money: 100, // 公司缴纳金额
          company_fixed_money: 200, // 公司固定金额
          personage_payment_ratio: "6%", // 个人缴纳比例
          personage_payment_money: 66, // 个人缴纳金额
          personage_fixed_money: 50, // 个人固定金额
        },
        {
          payment_name: "b保险", // 缴纳项目
          cardinal_number: 999, // 基数
          company_payment_ratio: "11%", // 公司缴纳比例
          company_payment_money: 100, // 公司缴纳金额
          company_fixed_money: 200, // 公司固定金额
          personage_payment_ratio: "6%", // 个人缴纳比例
          personage_payment_money: 66, // 个人缴纳金额
          personage_fixed_money: 50, // 个人固定金额
        },
      ]
    };
  },
};
</script>

<style scoped>
.el-input {
  width: 50%;
  display: inline-block;
}

.all-input {
  /*  上、右、下、左  */
  padding: 25px 40px 25px 40px;
}

/*!* 内边距 *!*/
/*.j-card-body {*/
/*  padding: 1.5%;*/
/*}*/

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

/* 外层div 内边距   */
.j-card-body {
  padding: 2% 4% 2% 2%;
}

@font-face {
  font-family: 'iconfont';  /* Project id 2990377 */
  src: url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.woff2?t=1639139822080') format('woff2'),
  url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.woff?t=1639139822080') format('woff'),
  url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.ttf?t=1639139822080') format('truetype');
}

</style>