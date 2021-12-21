<!--薪酬结构 -->
<template>
  <div class="demo-collapse">
    <div style="width: 95%;margin: auto">
    <div class="">
<!--      <span style="font-size: 14px;">1、选择一个部门</span>&nbsp;-->
      <!--选择部门的下拉框-->
      <el-form>
      <el-form-item label="1、选择一个部门：" prop="dept">
        <el-select v-model="ruleForm.dept" placeholder="请选择部门" style="width:240px;">
          <el-option label="11" value="dept1" style="margin-left: 20px;"></el-option>
          <el-option label="02465" value="dept2" style="margin-left: 20px;"></el-option>
          <el-option label="333" value="dept3" style="margin-left: 20px;"></el-option>
        </el-select>
      </el-form-item>
      </el-form><br>
      <p class="font_size_p">2.根据您企业薪酬制度，选择需要的薪酬类别（勾选则表示系统需核算）</p>

      <br>

      <el-checkbox-group v-model="checkList" >
        <el-tooltip class="item" effect="dark" content="固定员工核算基础数据,不可更改" placement="top-start">
          <el-icon :size="16" style="margin-left: 20px;">
            <i-question-filled />
          </el-icon>

        </el-tooltip>
        <el-checkbox label="固定工资" disabled  style=" margin-left: 20px;"/>
        <el-checkbox label="加班工资" disabled style=" margin-left: 20px;"/>
        <el-checkbox label="考勤扣款" style=" margin-left: 20px;"/>
        <el-checkbox label="社保" style=" margin-left: 20px;"/>
        <el-checkbox label="公积金" style=" margin-left: 20px;"/>
      </el-checkbox-group>
    </div>
    <br />
    <div class="">

      <span class="font_size_p">3、设置各薪酬类别下面的薪资项目（开启后在工资表中显示该项目）</span>

      <br>
      <br>
      <div class="">
        <el-collapse v-model="activeNames" @change="handleChange">

          <el-collapse-item name="2">
            <template #title >
              <h3 style="margin-left: 20px;">固定工资</h3>
              <span class="span_1_zhe" >【加项】针对员工定薪、调薪等，可设置固定工资方案 <router-link :to="{path:this.regular,query:{path: this.$route.query.path}}">去设置</router-link> </span>
            </template>
          </el-collapse-item>
          <br />

          <el-collapse-item  name="3">
            <template #title >
              <h3 style="margin-left: 20px;">加班工资</h3>
              <span class="span_1_zhe" >【加项】针对员工定薪、调薪等，可设置固定工资方案 <router-link :to="{path:this.callbackpay,query:{path: this.$route.query.path}}">去设置</router-link> </span>
            </template>

          </el-collapse-item>
          <br />


          <el-collapse-item title="Efficiency" name="4">
            <template #title >
              <h3 style="margin-left: 20px;">考勤扣款</h3>
              <span class="span_1_zhe" >【加项】针对员工定薪、调薪等，可设置固定工资方案 <router-link :to="{path:this.attendanceplan,query:{path: this.$route.query.path}}">去设置</router-link> </span>
            </template>
          </el-collapse-item>

          <br/>

          <el-collapse-item title="Efficiency" name="5">
            <template #title >
              <h3 style="margin-left: 20px;">出差工资</h3>
              <span class="span_1_zhe" >【加项】针对员工定薪、调薪等，可设置固定工资方案 <router-link :to="{path:this.evectionplan,query:{path: this.$route.query.path}}">去设置</router-link> </span>
            </template>

          </el-collapse-item>

        </el-collapse>
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

export default defineComponent({
  data() {
    return {
      //固定工资
      regular:'/salary/regular',
      //加班工资
      callbackpay:'/salary/callbackpay',
      //考勤扣款
      attendanceplan:'/salary/attendanceplan',
      //出差方案
      evectionplan:'/salary/evectionplan',

      checkList:'',
      activeNames:'',
      ruleForm:{
        dept:'',
      }

    }
  },
  setup() {
    const checkList = ref(['selected and disabled', 'Option A'])
    const activeNames = ref(['1'])
    const handleChange = (val) => {
      console.log(val)
    }

    return {
      checkList,
      activeNames,
      handleChange,
    }

  },

})
</script>

<style scoped>
@import url("../../css/navigation.css");
@import url("../../css/Salary.css");
/deep/.body_1 {
  background: darkcyan;
  width:100%;
  height: 200px;
  border-radius: 4px;
  /* font-size: 14px; */
  /*position: relative;*/
  /*overflow: hidden;*/
  /*transition: all 0.3s;*/
  /*min-height: 100%;*/
  /*min-height: 720px;*/
  /*padding: 16px;*/
  /*box-sizing: border-box;*/
  /*border: 1px solid #e9e9e9;*/

  /*padding: 0 24px;*/
  /*color: rgba(0, 0, 0, 0.65);*/
}

.demo-collapse{
  width: 100%;
  /*background: #0c9076;*/
  padding-bottom: 30px;
}


/deep/.font_size_p {
  font-size: 14px;
}

/deep/.span_1_zhe {
  color: rgb(153, 153, 153);
  margin-left: 60px;
}

/deep/.ant-row {
  line-height: 22px;
  padding: 12px 0 12px 40px;
}

/deep/.el-collapse-item__header {
  display: flex;
  align-items: center;
  height: var(--el-collapse-header-height);
  line-height: var(--el-collapse-header-height);
  /*background-color: var(--el-collapse-header-bg-color);*/
  /*color: var(--el-collapse-header-text-color);*/
  cursor: pointer;
  /*border-bottom: 1px solid var(--el-collapse-border-color);*/
  font-size: var(--el-collapse-header-font-size);
  font-weight: 500;
  transition: border-bottom-color var(--el-transition-duration);
  outline: 0;
  background-color: #e8edf2;
  border:#D1DBE5 solid 1px ;


}
/deep/.el-collapse-item__content{
  border:#D1DBE5 solid 1px ;
  background-color: #e8edf2;

}

</style>
