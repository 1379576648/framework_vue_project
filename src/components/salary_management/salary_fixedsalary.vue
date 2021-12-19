<!--固定方案 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
    <div class="body_2">
      <el-tabs v-model="activeName" @tab-click="handleClick">




        <!-- body_3 隐藏的那个框 -->
        <div class="body_3" v-show="disly">
          <h3 style="margin-top:1px;">定薪</h3><br/>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <template #label>
                <div class="el-form-item__label">试用期基本工资</div>
              </template>
              <el-input v-model="input"  placeholder="请输入" />
            </el-form-item>
            <el-form-item>
              <template #label>
                <div class="el-form-item__label">正式基本工资</div>
              </template>
              <el-input v-model="input2"  placeholder="请输入" />
            </el-form-item><br>
            <el-form-item>
              <template #label>
                <div class="el-form-item__label">试用期固定工资</div>
              </template>
              <el-input v-model="input3"  placeholder="请输入" />
            </el-form-item>
            <el-form-item>
              <template #label>
                <div class="el-form-item__label">正式固定工资</div>
              </template>
              <el-input v-model="input4"  placeholder="请输入" />
            </el-form-item><br>
            <!-- 转正日期输入框 -->
            <el-form-item>

              <template #label>
                <div class="el-form-item__label">转正日期</div>
              </template>
              <div class="block" >
                <el-date-picker style="width: 210px;" v-model="input5" type="date" placeholder="">

                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item>
              <template #label>
                <div class="el-form-item__label">备注</div>
              </template>
              <el-input v-model="input6"  placeholder="请输入" />
            </el-form-item>

            <br>
            <!-- 按钮 -->
            <div style="margin-top: 30px;">
              <el-button @click="disly=!disly">取消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </div>
          </el-form>
        </div>






        <!--  第二个隐藏框      -->
        <div class="body_3" v-show="disly_1">
          <h3 style="margin-top:1px;">调薪</h3><br/>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <template #label>
                <div class="el-form-item__label">调薪后基本工资</div>
              </template>
              <el-input v-model="input7"  placeholder="请输入" />
            </el-form-item>
            <el-form-item>
              <template #label>
                <div class="el-form-item__label">调薪幅度</div>
              </template>
              <el-input v-model="input8"   disabled />
            </el-form-item><br>
            <el-form-item>
              <template #label>
                <div class="el-form-item__label">生效日期</div>
              </template>
              <div class="block" >
                <el-date-picker style="width: 210px;" v-model="input9" type="date" placeholder="">

                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="调薪原因">
              <el-select v-model="region" placeholder="请选择">
                <el-option label="1" value="shanghai"></el-option>
                <el-option label="2" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <div style="margin-left: -430px;">
            <el-form-item >
              <template #label>
                <div class="el-form-item__label">备注</div>
              </template>
              <el-input v-model="input10"  placeholder="请输入" />
            </el-form-item>
            </div>
            <br>
            <br>
            <!-- 按钮 -->
            <div style="margin-top: 30px;">
              <el-button @click="disly_1=!disly_1">取消</el-button>
              <el-button type="primary" @click="submitForm2('ruleForm')">保存</el-button>
            </div>
          </el-form>
        </div>









        <el-tab-pane label="固定工资" name="first">
          <!-- 测试下拉按钮 -->

          <div style="float: right;">
            <el-input v-model="input11" style="width: 168px;" size="small" placeholder="姓名/工号" />
          </div>
          <br />
          <br />
          <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="date" label="姓名" width="150" />
            <el-table-column prop="name" label="工号" width="120" />
            <el-table-column prop="state" label="公司/中心" width="120" />
            <el-table-column prop="city" label="部门" width="120" />
            <el-table-column prop="address" label="职位" width="150" />
            <el-table-column prop="zip" label="入职日期" width="120" />
            <el-table-column prop="zip" label="状态" width="120" />
            <el-table-column prop="zip" label="基本工资" width="120" />
            <el-table-column prop="zip" label="岗位" width="120" />
            <el-table-column prop="zip" label="基本工资" width="120" />
            <el-table-column prop="zip" label="岗位" width="120" />
            <el-table-column fixed="right" label="操作" width="120">
              <template #default>
                <el-button type="text" size="small" @click="disly=true,disly_1=false">定薪 </el-button>
                <el-button type="text" size="small" @click="disly_1=true,disly=false">调薪 </el-button>

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
              <!--  @size-change="selectUsers" @current-change="selectUsers" -->
            </el-pagination>
          </div>
        </el-tab-pane>



        <!-- 调薪查询 -->

        <el-tab-pane  name="second" >
          <template #label>
              <span @click="disly=false,disly_1=false">调薪查询</span>
          </template>
          <el-select v-model="region2" placeholder="please select your zone">
            <el-option label="什么什么部门" value="shanghai"></el-option>
            <el-option label="上山不" value="beijing"></el-option>
          </el-select>
          <div style="float: right;">
            <div class="block">
              <span class="demonstration"></span>
              <el-date-picker
                  v-model="value2"
                  type="datetimerange"
                  range-separator="To"
                  start-placeholder="Start date"
                  end-placeholder="End date"
              >
              </el-date-picker>
            </div>



          </div>

          <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="date" label="姓名" width="150" />
            <el-table-column prop="name" label="工号" width="120" />
            <el-table-column prop="state" label="公司/中心" width="120" />
            <el-table-column prop="city" label="部门" width="120" />
            <el-table-column prop="address" label="职位" width="150" />
            <el-table-column prop="zip" label="入职日期" width="120" />
            <el-table-column prop="zip" label="状态" width="120" />
            <el-table-column prop="zip" label="基本工资" width="120" />
            <el-table-column prop="zip" label="岗位" width="120" />
            <el-table-column prop="zip" label="基本工资" width="120" />
            <el-table-column prop="zip" label="岗位" width="120" />

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
              <!--  @size-change="selectUsers" @current-change="selectUsers" -->
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
      </div>
    </div>
  </div>


</template>

<script>
import {
  defineComponent,
  ref
} from 'vue'
import {ElMessage} from "element-plus";



export default {
  data() {
    return {
      disly: false,
      disly_1:false,
      activeName: 'first',

        input:'',
        input2:'',
        input3:'',
        input4:'',
        input5:'',
        input6:'',
        input7:'',
        input8:'',
        input9:'',
        input10:'',
        input11:'',
        region:'',
        region2:'',
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },
      tableData: [{
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: '11111111',
        zip: 'CA 90036',
        tag: 'Home',
      },
        {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: '11111111',
          zip: 'CA 90036',
          tag: 'Office',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: '11111111',
          zip: 'CA 90036',
          tag: 'Home',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: '11111111',
          zip: 'CA 90036',
          tag: 'Office',
        },
      ]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)

    },
    submitForm() {
      if (this.input.length == 0) {
        ElMessage({
          message: '请输入试用期基本工资',
          type: 'warning',
        })
      }else if(this.input2.length==0){
        ElMessage({
          message: '请输入正式基本工资',
          type: 'warning',
        })
      }else if(this.input3.length==0){
        ElMessage({
          message: '请输入试用期固定工资',
          type: 'warning',
        })
      }else if(this.input4.length==0){
        ElMessage({
          message: '请输入正式固定工资',
          type: 'warning',
        })
      }else if(this.input5.length==0){
        ElMessage({
          message: '请输入转正日期',
          type: 'warning',
        })
      }else{
        alert(1111)
      }
    },
    submitForm2() {
      if (this.input7.length == 0) {
        ElMessage({
          message: '请输入调薪后基本工资',
          type: 'warning',
        })
      }else if(this.input9.length==0){
        ElMessage({
          message: '请输入生效日期',
          type: 'warning',
        })
      }else if(this.region.length==0){
        ElMessage({
          message: '请输入调薪原因',
          type: 'warning',
        })
      }else{
        alert(1111)
      }
    }
  },

}
</script>

<style scoped>
#tab-first {
  margin: 40px
}

/deep/.body_1 {
  background: #fff;
  border-radius: 4px;
  /* font-size: 14px; */
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  min-height: 100%;
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid #e9e9e9;
  position: relative;
  padding: 0 24px;
  color: rgba(0, 0, 0, 0.65);
}

/deep/.body_2 {
  background: #fff;
  border-radius: 4px;
  /* font-size: 14px; */
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  min-height: 100%;
  min-height: 720px;
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid #e9e9e9;
  position: relative;
  padding: 0 24px;
  color: rgba(0, 0, 0, 0.65);
  margin: 20px;

}

/deep/.body_3 {
  background: #e8edf2;
  padding: 24px 0 34px 24px;
  min-height: 100%;
  box-sizing: border-box;
  /* display: none; */
  text-align: center;
  border: 1px solid #e9e9e9;
}
/deep/.body_4{
  background: #e8edf2;
  padding: 24px 0 34px 24px;
  min-height: 100%;
  box-sizing: border-box;
  /* display: none; */

  text-align: center;
  border: 1px solid #e9e9e9;
}

/deep/.el-form--inline .el-form-item {
  margin-right: 110px;
}

/deep/.el-form-item__label {
  width: 110px;
}
/* 分页的样式 */
/deep/.demo-pagination-block {
  float: right;
  margin: 20px;
}

</style>
