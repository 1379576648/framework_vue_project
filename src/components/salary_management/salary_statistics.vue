<!--薪酬统计 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">

      <div class="j-card-body">
        <div class="j-card-head">
          <div class="j-card-head-title" style="margin-left:20px;">
            <span>薪酬统计</span>
          </div>
        </div>
        <br/>


        <div class="container" >
          <div class="block" style="margin-left: 1095px">
            <span class="demonstration"></span>
            <el-date-picker v-model="months" type="year" placeholder="请选择年份">
            </el-date-picker>
          </div>
          </div>


          <br/>
        <div class="demo-collapse">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item name="1">
              <template #title>
                <span style="margin-left: 20px;font-weight: bolder">2021-12月份</span>
                <span style="margin-left: 140px">计薪人数：37</span>
                <span style="margin-left: 120px">应发工资：22</span>
                <span style="margin-left: 130px">实发工资：22</span>
                <span style="margin-left: 140px">公司缴纳：22</span>
                <span style="margin-left: 150px">员工成本：22</span>
              </template>
              <div style="background-color:  #e8edf2">
                <el-table
                    :data="tableData"
                    style="width: 1275px; margin: auto"
                    size="mini"
                    height="250">
                  <el-table-column fixed prop="dept" label="部门" width="120" />
                  <el-table-column prop="number" label="人数" width="120" />
                  <el-table-column prop="state" label="固定工资" width="120" />
                  <el-table-column prop="city" label="加班工资" width="120" />
                  <el-table-column prop="address" label="工资合计" width="120" />
                  <el-table-column prop="zip" label="考勤扣款" width="120" />
                  <el-table-column prop="state" label="应发工资" width="120" />
                  <el-table-column prop="city" label="个人缴社保" width="120" />
                  <el-table-column prop="address" label="个人缴公积金" width="120" />
                  <el-table-column prop="zip" label="实发工资" width="120" />
                  <el-table-column prop="state" label="公司缴社保" width="120" />
                  <el-table-column prop="city" label="公司缴公积金" width="120" />
                  <el-table-column prop="address" label="公司缴纳" width="120" />
<!--                  <el-table-column fixed="right" label="Operations" width="120">-->
<!--                    <template #default>-->
<!--                      <el-button type="text" size="small" @click="handleClick"-->
<!--                      >Detail</el-button-->
<!--                      >-->
<!--                      <el-button type="text" size="small">Edit</el-button>-->
<!--                    </template>-->
<!--                  </el-table-column>-->
                </el-table>

              </div>

            </el-collapse-item>

            <br>
            <el-collapse-item name="2">
              <template #title>
                <span style="margin-left: 20px;font-weight: bolder">2021-11月份</span>
                <span style="margin-left: 140px">计薪人数：37</span>
                <span style="margin-left: 120px">应发工资：22</span>
                <span style="margin-left: 130px">实发工资：22</span>
                <span style="margin-left: 140px">公司缴纳：22</span>
                <span style="margin-left: 150px">员工成本：22</span>
              </template>
              <div style="background-color:  #e8edf2">

                <el-table
                    :data="tableData"
                    style="width: 1275px; margin: auto"
                    size="mini"
                    height="250">
                  <el-table-column fixed prop="dept" label="部门" width="120" />
                  <el-table-column prop="number" label="人数" width="120" />
                  <el-table-column prop="state" label="固定工资" width="120" />
                  <el-table-column prop="city" label="加班工资" width="120" />
                  <el-table-column prop="address" label="工资合计" width="120" />
                  <el-table-column prop="zip" label="考勤扣款" width="120" />
                  <el-table-column prop="state" label="应发工资" width="120" />
                  <el-table-column prop="city" label="个人缴社保" width="120" />
                  <el-table-column prop="address" label="个人缴公积金" width="120" />
                  <el-table-column prop="zip" label="实发工资" width="120" />
                  <el-table-column prop="state" label="公司缴社保" width="120" />
                  <el-table-column prop="city" label="公司缴公积金" width="120" />
                  <el-table-column prop="address" label="公司缴纳" width="120" />
                </el-table>
              </div>

            </el-collapse-item>

          </el-collapse>
          <br/>
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      tableData: [
        {
          dept:'研发部',
          number:23,
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Home',
        },
        {
          dept:'研发部',
          number:23,
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office',
        },
        {
          dept:'研发部',
          number:23,
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Home',
        },
        {
          dept:'研发部',
          number:23,
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office',
        },
        {
          dept:'研发部',
          number:23,
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office',
        },
      ],
      months: '',
    }
  },
  methods: {
    handleClick() {
      console.log('click')
    },
  },
}
</script>


<style scoped>
@import url("../../css/navigation.css");
@import url(../../css/dimission.css);
/deep/.demo-collapse{
  margin-left: 10PX;
}

/deep/.el-collapse-item__header {
  display: flex;
  align-items: center;
  height: var(--el-collapse-header-height);
  line-height: var(--el-collapse-header-height);
  cursor: pointer;
  border-bottom: 1px solid var(--el-collapse-border-color);
  font-size: var(--el-collapse-header-font-size);
  font-weight: 500;
  transition: border-bottom-color var(--el-transition-duration);
  outline: 0;
  background-color: #e8edf2;
}
</style>