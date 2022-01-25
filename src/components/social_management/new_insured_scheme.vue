<template>
  <!-- 新增修改方案 -->
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <!-- 标题 -->
        <div class="big-title">&nbsp;&nbsp;&nbsp;{{ this.name }}参保方案</div>
        <!-- 参保方案名称输入框 -->
        <div class="all-input">
          方案名称：&nbsp;
          <el-input v-model="schemeName" placeholder="输入方案名称" @blur="selectDefInsuredName" clearable/>
        </div>
        <!-- 标题 -->
        <div class="big-title">&nbsp;&nbsp;&nbsp;社保方案设置</div>

        <!-- 社保方案设置，表单 -->
        <div class="all-input">
          <span style="font-weight: bold">参缴社保</span><br/>
          社保基数范围：
          <el-input-number
              v-model="social.defSchemeMin"
              size="small"
              :min="0"
              @input="socialScopeInput"
              :key="social.key"
              controls-position="right"
              placeholder="基数下限"
              style="width: 120px"
          />
          &nbsp; ~ &nbsp;
          <el-input-number
              v-model="social.defSchemeMax"
              size="small"
              :min="0"
              @input="socialScopeInput"
              :key="social.key"
              controls-position="right"
              placeholder="基数上限"
              style="width: 120px"
          />
          &nbsp;
          <!-- 弹出消息 -->
          <el-popover
              placement="right-start"
              :width="200"
              trigger="hover"
              content="基数上限不小于基数下限"
          >
            <template #reference>
              <el-button type="text"
              ><i class="iconfont">&#xe600;</i></el-button
              >
            </template>
          </el-popover>
          <!-- 社保缴纳项目，表单 -->
          <el-table :data="social_tableData" max-height="464" style="width: 100%">
            <!-- 缴纳项目 -->
            <el-table-column fixed label="缴纳项目" align="center" width="150">
              <template #default="scope">
                <el-select size="small" v-model="scope.row.defSchemeType" filterable placeholder="Select">
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
            <el-table-column label="基数范围" align="center" width="300">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemeFloor"
                    size="small"
                    :min="0"
                    controls-position="right"
                    placeholder="基数下限"
                    style="width: 120px"
                />
                &nbsp; ~ &nbsp;
                <el-input-number
                    v-model="scope.row.defSchemeUpper"
                    size="small"
                    :min="0"
                    controls-position="right"
                    placeholder="基数上限"
                    style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 公司缴纳比例 -->
            <el-table-column label="公司缴纳比例" align="center" width="180">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemeFirmProp"
                    size="small"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />&nbsp;&nbsp;%
              </template>
            </el-table-column>
            <!-- 个人缴纳比例 -->
            <el-table-column label="个人缴纳比例" align="center" width="180">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemePersonProp"
                    size="small"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />&nbsp;&nbsp;%
              </template>
            </el-table-column>
            <!-- 公司固定金额 -->
            <el-table-column label="公司固定金额" align="center" width="150">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemeFirmSum"
                    size="small"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 个人固定金额 -->
            <el-table-column prop="zip" label="个人固定金额" align="center" width="150">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemePersonSum"
                    size="small"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" align="center" width="100">
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

        <!-- 社保方案设置，表单 -->
        <div class="all-input" style="padding:25px 25px 0 40px">
          <span style="font-weight: bold">参缴积金</span><br/>
          积金基数范围：
          <el-input-number
              v-model="fund.defSchemeMin"
              size="small"
              :min="0"
              @input="fundScopeInput"
              :key="fund.key"
              controls-position="right"
              placeholder="基数下限"
              style="width: 120px"
          />
          &nbsp; ~ &nbsp;
          <el-input-number
              v-model="fund.defSchemeMax"
              size="small"
              :min="0"
              controls-position="right"
              placeholder="基数上限"
              style="width: 120px"
          />
          &nbsp;&nbsp;
          <!-- 弹出消息 -->
          <el-popover
              placement="right-start"
              :width="200"
              trigger="hover"
              content="基数上限不小于基数下限"
          >
            <template #reference>
              <el-button type="text"
              ><i class="iconfont">&#xe600;</i></el-button
              >
            </template>
          </el-popover>
        </div>
        <!-- 公积金方案设置，表单 -->
        <div class="all-input" style="padding-top: 0">
          <el-table :data="accumulation_tableData" max-height="236" style="width: 100%">
            <!-- 缴纳项目 -->
            <el-table-column fixed label="缴纳项目" align="center" width="150">
              <template #default="scope">
                <span>{{ scope.row.defSchemeType }}</span>
              </template>
            </el-table-column>
            <!-- 基数范围 -->
            <el-table-column label="基数范围" align="center" width="300">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemeFloor"
                    size="small"
                    :min="0"
                    controls-position="right"
                    placeholder="基数下限"
                    style="width: 120px"
                />
                &nbsp; ~ &nbsp;
                <el-input-number
                    v-model="scope.row.defSchemeUpper"
                    size="small"
                    :min="0"
                    controls-position="right"
                    placeholder="基数上限"
                    style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 公司缴纳比例 -->
            <el-table-column label="公司缴纳比例" align="center" width="180">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemeFirmProp"
                    size="small"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />&nbsp;&nbsp;%
              </template>
            </el-table-column>
            <!-- 个人缴纳比例 -->
            <el-table-column prop="city" label="个人缴纳比例" align="center" width="180">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemePersonProp"
                    size="small"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />&nbsp;&nbsp;%
              </template>
            </el-table-column>
            <!-- 公司固定金额 -->
            <el-table-column prop="address" label="公司固定金额" align="center" width="150">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemeFirmSum"
                    size="small"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 个人固定金额 -->
            <el-table-column prop="zip" label="个人固定金额" align="center" width="150">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemePersonSum"
                    size="small"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" align="center" width="100">
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
          <span>社保基数&nbsp;&nbsp;</span>
          <el-input-number
              v-model="security_cardinal"
              size="small"
              :min="0"
              :key="security_cardinal_key"
              @input="socialInput"
              controls-position="right"
              placeholder="请输入社保基数"
              style="width: 180px"
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span>积金基数&nbsp;&nbsp;</span>
          <el-input-number
              v-model="accumulation_cardinal"
              size="small"
              :min="0"
              controls-position="right"
              @input="fundInput"
              :key="accumulation_cardinal_key"
              placeholder="请输入公积金基数"
              style="width: 180px"
          />&nbsp;&nbsp;&nbsp;
          <el-button type="primary" size="small" @click="calculate">计算</el-button>

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
          个人缴纳：<span style="color: #ff9515">{{ (money.personage).toFixed(2) }}</span>元&nbsp;&nbsp;&nbsp;
          公司缴纳：<span style="color: #ff9515">{{ (money.company).toFixed(2) }}</span>元&nbsp;&nbsp;&nbsp;
          总计：<span style="color: #ff9515">{{ (money.personage + money.company).toFixed(2) }}</span>元&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="text" @click="payment_detail=!payment_detail">缴纳明细表</el-button>

          <br/><br/>

          <!-- 缴纳明细表 -->
          <el-table v-show="payment_detail" :data="payment_details_table" style="width: 99.1%">
            <el-table-column prop="payment_name" align="center" label="缴纳项目"/>
            <el-table-column align="center" label="基数">
              <el-table-column prop="cardinal_number" align="center" label="缴纳基数"/>
              <el-table-column prop="floor_cardinal_number" align="center" label="下限"/>
              <el-table-column prop="upper_cardinal_number" align="center" label="上限"/>
            </el-table-column>

            <el-table-column label="公司缴纳" align="center">
              <el-table-column prop="company_payment_ratio" align="center" label="缴纳比例"/>
              <el-table-column prop="company_fixed_money" align="center" label="固定金额"/>
            </el-table-column>

            <el-table-column label="个人缴纳" align="center">
              <el-table-column prop="personage_payment_ratio" align="center" label="缴纳比例"/>
              <el-table-column prop="personage_fixed_money" align="center" label="固定金额"/>
            </el-table-column>
            <el-table-column prop="payment_details_sum" align="center" label="小计"/>
          </el-table>

        </div>
        <div style="text-align: center">
          <el-button size="small" @click="this.$parent.$data.new_insured_scheme=false">取消</el-button>
          &nbsp;&nbsp;
          <el-button size="small" type="primary" @click="save">保存</el-button>
        </div>
      </div>
    </div>
  </div>
  &nbsp;
</template>

<script>
import {ref, defineComponent} from "vue";
import {ElMessage, ElNotification} from "element-plus";

export default {
  props: ['name'],
  data() {
    return {
      // 方案名称
      schemeName: "",
      //方案名称判断
      nameJudge:true,
      //方案编号
      defInsuredId:0,
      //访问地址
      url: 'http://localhost:80/social/',
      //社保
      social: {
        // 社保基数下限
        defSchemeMin: 0,
        // 社保基数上限
        defSchemeMax: 0,
        //渲染
        key:0
      },
      //金额
      money: {
        personage: 0,//个人金额
        company: 0,//公司金额
      },
      //积金
      fund: {
        // 社保基数下限
        defSchemeMin: 0,
        // 社保基数上限
        defSchemeMax: 0,
        //渲染
        key:0
      },
      // 社保基数
      security_cardinal: 0,
      // 公积金基数
      accumulation_cardinal: 0,
      //社保渲染
      security_cardinal_key:0,
      //积金渲染
      accumulation_cardinal_key:0,
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
      // 社保缴纳表数据
      social_tableData: [],
      // 公积金缴纳表数据
      accumulation_tableData: [],
      //缴纳明细表数据
      payment_details_table: [],
    };
  },
  methods: {
    //查询社保方案名称
    selectDefInsuredName(){
      this.axios({
        method: 'get',
        url: this.url + 'selectDefInsuredName/'+this.schemeName,
        responseEncoding: 'utf-8',
      }).then((response) => {
        //如果服务关闭
        if (response.data.data.data) {
          ElNotification.error({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
          //如果服务没有关闭
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            if (response.data.data.info!=null){
              console.log(response.data.data.info.defInsuredId+'='+this.$parent.$data.defInsuredId)
              if (response.data.data.info.defInsuredId!=this.$parent.$data.defInsuredId && this.name=='修改'){
                this.nameJudge=false;
                ElMessage({
                  type: 'warning',
                  message: '该'+'【'+this.schemeName+'】方案名称已存在',
                })
              }else if( this.name=='新增'){
                this.nameJudge=false;
                ElMessage({
                  type: 'warning',
                  message: '该'+'【'+this.schemeName+'】方案名称已存在',
                })
              }
            }
            }
          //如果服务是雪崩的
          else {
            ElNotification.error({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        }
      })
    },
    //积金基数范围
    fundScopeInput(){
      //判断基数下限是否大于基数上限
      if (this.fund.defSchemeMin>this.fund.defSchemeMax){
        this.fund.defSchemeMin=this.fund.defSchemeMax;
      }
      //渲染键值加1
      this.fund.key=this.fund.key+1;
    },
    //社保基数范围
    socialScopeInput(){
      //判断基数下限是否大于基数上限
      if (this.social.defSchemeMin>this.social.defSchemeMax){
        this.social.defSchemeMin=this.social.defSchemeMax;
      }
      //渲染键值加1
      this.social.key=this.social.key+1;
    },
    //社保输入
    socialInput(){
      //判断基数是否小于基数下限
      if (this.security_cardinal < this.social.defSchemeMin) {
        this.security_cardinal = this.social.defSchemeMin;
        //判断基数是否大于基数上限
      } else if (this.security_cardinal > this.social.defSchemeMax) {
        this.security_cardinal = this.social.defSchemeMax;
      }
      //渲染键值加1
      this.security_cardinal_key=this.security_cardinal_key+1;
    },
    //积金输入
    fundInput() {
      //判断基数是否小于基数下限
      if (this.accumulation_cardinal < this.fund.defSchemeMin) {
        this.accumulation_cardinal = this.fund.defSchemeMin;
        //判断基数是否大于基数上限
      } else if (this.accumulation_cardinal > this.fund.defSchemeMax) {
        this.accumulation_cardinal = this.fund.defSchemeMax
      }
      //渲染键值加1
      this.accumulation_cardinal_key= this.accumulation_cardinal_key+1;
    },
    //计算操作
    calculate() {
      //判断社保基数范围
      if (this.social.defSchemeMin > this.social.defSchemeMax) {
        ElMessage({
          showClose: true,
          message: '社保基数上限不小于基数下限',
          type: 'warning',
        })
        return false;
      }
      //判断积金基数范围
      if (this.fund.defSchemeMin > this.fund.defSchemeMax) {
        ElMessage({
          showClose: true,
          message: '积金基数上限不小于基数下限',
          type: 'warning',
        })
        return false;
      }
      //判断各社保方案项目名称的基数范围
      for (let i = 0; i < this.social_tableData.length; i++) {
        if (this.social_tableData[i].defSchemeFloor > this.social_tableData[i].defSchemeUpper) {
          ElMessage({
            showClose: true,
            message: this.social_tableData[i].defSchemeType + '基数上限不小于基数下限',
            type: 'warning',
          })
          return false;
        }
      }
      //判断各积金方案项目名称的基数范围
      for (let i = 0; i < this.accumulation_tableData.length; i++) {
        if (this.accumulation_tableData[i].defSchemeFloor > this.accumulation_tableData[i].defSchemeUpper) {
          ElMessage({
            showClose: true,
            message: this.accumulation_tableData[i].defSchemeType + '基数上限不小于基数下限',
            type: 'warning',
          })
          return false;
        }
      }
      //初始化
      this.payment_details_table = [];
      this.money = {
        personage: 0,//个人金额
        company: 0,//公司金额
      }
      //循环社保方案项目
      for (let i = 0; i < this.social_tableData.length; i++) {
        this.payment_details_table.push({
          payment_name: this.social_tableData[i].defSchemeType, // 缴纳项目
          cardinal_number: this.security_cardinal, // 基数
          company_payment_ratio: this.social_tableData[i].defSchemeFirmProp, // 公司缴纳比例
          company_fixed_money: this.social_tableData[i].defSchemeFirmSum, // 公司固定金额
          personage_payment_ratio: this.social_tableData[i].defSchemePersonProp, // 个人缴纳比例
          personage_fixed_money: this.social_tableData[i].defSchemePersonSum, // 个人固定金额
          floor_cardinal_number: this.social_tableData[i].defSchemeFloor,//基数下限
          upper_cardinal_number: this.social_tableData[i].defSchemeUpper,//基数上限
          payment_details_sum: 0,//小计
        });
        let value = 0;
        //如果小于下限
        if (this.security_cardinal < this.social_tableData[i].defSchemeFloor) {
          value = this.social_tableData[i].defSchemeFloor;
          //如果大于上限
        } else if (this.security_cardinal > this.social_tableData[i].defSchemeUpper) {
          value = this.social_tableData[i].defSchemeUpper;
        } else {
          value = this.security_cardinal;
        }

        this.payment_details_table[this.payment_details_table.length - 1].payment_details_sum =
            (value * (this.social_tableData[i].defSchemeFirmProp / 100) + this.social_tableData[i].defSchemeFirmSum +
                value * (this.social_tableData[i].defSchemePersonProp / 100) + this.social_tableData[i].defSchemePersonSum).toFixed(2);//小计

      }
      //循环积金方案项目
      for (let i = 0; i < this.accumulation_tableData.length; i++) {
        this.payment_details_table.push({
          payment_name: this.accumulation_tableData[i].defSchemeType, // 缴纳项目
          cardinal_number: this.accumulation_cardinal, // 基数
          company_payment_ratio: this.accumulation_tableData[i].defSchemeFirmProp, // 公司缴纳比例
          company_fixed_money: this.accumulation_tableData[i].defSchemeFirmSum, // 公司固定金额
          personage_payment_ratio: this.accumulation_tableData[i].defSchemePersonProp, // 个人缴纳比例
          personage_fixed_money: this.accumulation_tableData[i].defSchemePersonSum, // 个人固定金额
          floor_cardinal_number: this.accumulation_tableData[i].defSchemeFloor,//基数下限
          upper_cardinal_number: this.accumulation_tableData[i].defSchemeUpper,//基数上限
          payment_details_sum: 0,//小计
        });
        let value = 0;
        //如果小于下限
        if (this.accumulation_cardinal < this.accumulation_tableData[i].defSchemeFloor) {
          value = this.accumulation_tableData[i].defSchemeFloor
          //如果大于上限
        } else if (this.accumulation_cardinal > this.accumulation_tableData[i].defSchemeUpper) {
          value = this.accumulation_tableData[i].defSchemeUpper
        } else {
          value = this.accumulation_cardinal;
        }
        this.payment_details_table[this.payment_details_table.length - 1].payment_details_sum =
            (value * (this.accumulation_tableData[i].defSchemeFirmProp / 100) + this.accumulation_tableData[i].defSchemeFirmSum +
                value * (this.accumulation_tableData[i].defSchemePersonProp / 100) + this.accumulation_tableData[i].defSchemePersonSum).toFixed(2);//小计
      }
      for (let i = 0; i < this.payment_details_table.length; i++) {
        let value = 0;
        if (this.payment_details_table[i].payment_name != '公积金') {
          //如果小于下限
          if (this.security_cardinal < this.payment_details_table[i].floor_cardinal_number) {
            value = this.payment_details_table[i].floor_cardinal_number;
            //如果大于上限
          } else if (this.security_cardinal > this.payment_details_table[i].upper_cardinal_number) {
            value = this.payment_details_table[i].upper_cardinal_number;
          } else {
            value = this.security_cardinal;
          }
        } else {
          //如果小于下限
          if (this.accumulation_cardinal < this.payment_details_table[i].floor_cardinal_number) {
            value = this.payment_details_table[i].floor_cardinal_number;
            //如果大于上限
          } else if (this.accumulation_cardinal > this.payment_details_table[i].upper_cardinal_number) {
            value = this.payment_details_table[i].upper_cardinal_number;
          } else {
            value = this.accumulation_cardinal;
          }
        }
        //个人金额
        this.money.personage =
            this.money.personage + value * (this.payment_details_table[i].personage_payment_ratio / 100) +
            this.payment_details_table[i].personage_fixed_money;
        //公司金额
        this.money.company =
            this.money.company + value * (this.payment_details_table[i].company_payment_ratio / 100) +
            this.payment_details_table[i].company_fixed_money;
      }
    },
    //修改社保方案
    updateDefInsured(){
      this.axios({
        method: 'put',
        url: this.url + 'updateDefInsured',
        data: {
          //社保方案
          defInsured:{
            //方案编号
            defInsuredId:this.defInsuredId,
            //方案名称
            defInsuredName:this.schemeName,
          },
          //社保方案项目
          defSchemeList:this.social_tableData.concat(this.accumulation_tableData),
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        //如果服务关闭
        if (response.data.data.data) {
          ElNotification.error({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
          //如果服务没有关闭
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            //如果是成功
            if (response.data.data.info == "成功") {
              this.$parent.$data.new_insured_scheme=false;
              this.$parent.next();
              ElMessage({
                type: 'success',
                message: '修改成功',
              })
            } else {
              ElMessage({
                type: 'warning',
                message: response.data.data.info,
              })
            }
          }
          //如果服务是雪崩的
          else {
            ElNotification.error({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        }
      })
    },
    //添加社保方案
    addDefInsured(){
      this.axios({
        method: 'post',
        url: this.url + 'addDefInsured',
        data: {
          //社保方案
          defInsured:{
            //方案编号
            defInsuredId:this.defInsuredId,
            //方案名称
            defInsuredName:this.schemeName,
          },
          //社保方案项目
          defSchemeList:this.social_tableData.concat(this.accumulation_tableData),
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        //如果服务关闭
        if (response.data.data.data) {
          ElNotification.error({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
          //如果服务没有关闭
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            //如果是成功
            if (response.data.data.info == "成功") {
              this.$parent.$data.new_insured_scheme=false;
              this.$parent.next();
              ElMessage({
                type: 'success',
                message: '添加成功',
              })
            } else {
              ElMessage({
                type: 'warning',
                message: response.data.data.info,
              })
            }
          }
          //如果服务是雪崩的
          else {
            ElNotification.error({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        }
      })
    },
    //保存操作
    save() {
      if (this.nameJudge==false){
        ElMessage({
          showClose: true,
          message:  '该'+'【'+this.schemeName+'】方案名称已存在',
          type: 'warning',
        })
        return  false;
      }
      //判断名称是否为空
      if (this.schemeName == '') {
        ElMessage({
          showClose: true,
          message: '方案名称不能为空',
          type: 'warning',
        })
        return false;
      }
      //判断社保方案是否大于五
      if (this.social_tableData.length > 5) {
        ElMessage({
          showClose: true,
          message: '最多只能设置五个社保方案项目',
          type: 'warning',
        })
        return false;
      }
      //判断积金方案是否大于一
      if (this.accumulation_tableData.length > 1) {
        ElMessage({
          showClose: true,
          message: '已设置积金方案项目',
          type: 'warning',
        })
        return false;
      }
      //判断是否有相同的方案
      for (let i = 0; i < this.social_tableData.length; i++) {
        //循环次数
        for (let j = 0; j < this.social_tableData.length; j++) {
          //判断是否有相同的方案名称 并且不是当前元素对象
          if (this.social_tableData[i].defSchemeType == this.social_tableData[j].defSchemeType && i != j) {
            ElMessage({
              showClose: true,
              message: '社保方案项目存在相同',
              type: 'warning',
            })
            return false;
          }
        }
      }
      //判断社保基数范围
      if (this.social.defSchemeMin > this.social.defSchemeMax) {
        ElMessage({
          showClose: true,
          message: '社保基数范围需调整一下',
          type: 'warning',
        })
        return false;
      }
      //判断积金基数范围
      if (this.fund.defSchemeMin > this.fund.defSchemeMax) {
        ElMessage({
          showClose: true,
          message: '积金基数范围需调整一下',
          type: 'warning',
        })
        return false;
      }
      //判断各社保方案项目名称的基数范围
      for (let i = 0; i < this.social_tableData.length; i++) {
        //设置最少基数
        this.social_tableData[i].defSchemeMin=this.social.defSchemeMin;
        //设置最多基数
        this.social_tableData[i].defSchemeMax=this.social.defSchemeMax;
        //遍历数据
        if (this.social_tableData[i].defSchemeFloor > this.social_tableData[i].defSchemeUpper) {
          ElMessage({
            showClose: true,
            message: this.social_tableData[i].defSchemeType + '基数范围需调整一下',
            type: 'warning',
          })
          return false;
        }
      }
      //判断各积金方案项目名称的基数范围
      for (let i = 0; i < this.accumulation_tableData.length; i++) {
        //设置最少基数
        this.accumulation_tableData[i].defSchemeMin=this.fund.defSchemeMin;
        //设置最多基数
        this.accumulation_tableData[i].defSchemeMax=this.fund.defSchemeMax;
        //遍历数据
        if (this.accumulation_tableData[i].defSchemeFloor > this.accumulation_tableData[i].defSchemeUpper) {
          ElMessage({
            showClose: true,
            message: this.accumulation_tableData[i].defSchemeType + '基数范围需调整一下',
            type: 'warning',
          })
          return false;
        }
      }
     if (this.name=='修改'){
       this.updateDefInsured();
     }else{
       this.addDefInsured();
     }

    },
    // 删除行
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    // 新增社保缴纳项目
    add_social() {
      //判断如果大于五
      if (this.social_tableData.length < 5) {
        let social_row = {
          defSchemeType: "养老保险", // 缴费项目
          defSchemeFloor: null, // 基数下限
          defSchemeUpper: null, // 基数上限
          defSchemeFirmProp: null, // 公司缴纳比例
          defSchemePersonProp: null, // 个人缴纳比例
          defSchemeFirmSum: null, // 公司固定金额
          defSchemePersonSum: null, // 个人固定金额
        }
        this.social_tableData.push(social_row)
      } else {
        ElMessage({
          showClose: true,
          message: '最多只能设置五个社保方案',
          type: 'warning',
        })
      }
    },
    // 新增公积金缴纳项目
    add_accumulation() {
      //判断如果大于一
      if (this.accumulation_tableData.length < 1) {
        let accumulation_row = {
          defSchemeType: "公积金", // 缴费项目
          defSchemeFloor: null, // 基数下限
          defSchemeUpper: null, // 基数上限
          defSchemeFirmProp: null, // 公司缴纳比例
          defSchemePersonProp: null, // 个人缴纳比例
          defSchemeFirmSum: null, // 公司固定金额
          defSchemePersonSum: null, // 个人固定金额
        }
        this.accumulation_tableData.push(accumulation_row)
      } else {
        ElMessage({
          showClose: true,
          message: '已设置积金方案',
          type: 'warning',
        })
      }
    },
    //通过编号查询社保方案数据
    selectDefInsuredId() {
      this.axios({
        method: 'get',
        url: this.url + 'selectDefInsuredId/' + this.$parent.$data.defInsuredId,
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        //如果服务关闭
        if (response.data.data.data) {
          ElNotification.error({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
          //如果服务没有关闭
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            //方案名称
            this.schemeName = response.data.data.info.defInsuredName;
            //方案编号
            this.defInsuredId= response.data.data.info.defInsuredId;
          }
          //如果服务是雪崩的
          else {
            ElNotification.error({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        }
      })
    },
    //通过外键查询方案数据
    listSelectDefScheme() {
      this.axios({
        method: 'get',
        url: this.url + 'listSelectDefScheme/' + this.$parent.$data.defInsuredId,
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        //如果服务关闭
        if (response.data.data.data) {
          ElNotification.error({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
          //如果服务没有关闭
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            for (let i = 0; i < response.data.data.info.length; i++) {
              if (response.data.data.info[i].defSchemeType == '公积金') {
                //公积金缴纳表数据
                this.accumulation_tableData.push(response.data.data.info[i]);
                this.fund.defSchemeMin = response.data.data.info[i].defSchemeMin;
                this.fund.defSchemeMax = response.data.data.info[i].defSchemeMax;
              } else {
                //社保缴纳表数据
                this.social_tableData.push(response.data.data.info[i]);
                this.social.defSchemeMin = response.data.data.info[i].defSchemeMin;
                this.social.defSchemeMax = response.data.data.info[i].defSchemeMax;
              }
            }
          }
          //如果服务是雪崩的
          else {
            ElNotification.error({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        }
      })
    }
  }, mounted() {
    if (this.$parent.$data.defInsuredId != 0) {
      this.selectDefInsuredId();
      this.listSelectDefScheme();
    }
  }
};
</script>

<style scoped>
.el-input {
  width: 50%;
  display: inline-block;
}

.all-input {
  /*  上、右、下、左  */
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 40px;
  margin-right: -23px;
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