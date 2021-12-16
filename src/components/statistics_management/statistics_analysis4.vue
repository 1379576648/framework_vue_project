<template>
  <div class="demo-date-picker" style="width: 100%;height: 55px;">
    <div class="" style="width: 850px;height: 55px; float: right;">
      <span class="demonstration" style="position: relative;top: 15px;">时间范围：</span>

      <el-date-picker v-model="value1" type="daterange" range-separator="To"
                      start-placeholder="开始时间" end-placeholder="结束时间" style="position: relative;top: 15px;">
      </el-date-picker>
      <span class="demonstration" style="position: relative;top: 15px;left: 10px;">组织范围：</span>
      <el-cascader v-model="value" :options="options" :props="{ expandTrigger: 'hover' }"
                   @change="handleChange" style="position: relative;top: 15px;"></el-cascader>
      <el-button type="primary" style="position: relative;top: 12px;">搜索</el-button>
    </div>
  </div>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!--  部门人工成本总额 -->
    <div id="mainy1" style="width:100%;height:460px; margin-top: 20px; "></div>



  </div>

  <el-table :data="tableData" style="width: 95%;text-align: center;" height="250">
    <el-table-column fixed prop="date" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="state" label="State" width="120" />
    <el-table-column prop="city" label="City" width="320" />
    <el-table-column prop="address" label="Address" width="600" />
    <el-table-column prop="zip" label="Zip" width="120" />
  </el-table>


  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!--  部门平均人工成本 -->
    <div id="mainy2" style="width: 100%;height:460px; margin-top: 20px; "></div>

  </div>

  <el-table :data="tableData" style="width: 95%;text-align: center;" height="250">
    <el-table-column fixed prop="date" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="state" label="State" width="120" />
    <el-table-column prop="city" label="City" width="320" />
    <el-table-column prop="address" label="Address" width="600" />
    <el-table-column prop="zip" label="Zip" width="120" />
  </el-table>
</template>


<script>
import * as echarts from 'echarts'
export default {


  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      },
        {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '2016-05-08',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '2016-05-06',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '2016-05-07',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
      ],
    }
  },
  mounted() {
    //准备实例
    /* 	<!--  部门人工成本总额--> */
    var chartDomy1 = document.getElementById('mainy1');
    var myCharty1 = echarts.init(chartDomy1);
    /*  部门平均人工成本 */
    var chartDomy2 = document.getElementById('mainy2');
    var myCharty2 = echarts.init(chartDomy2);


    var optiony2;
    var optiony1;
    /* <!--部门人工成本总额 --> */

    optiony1 = {
      title: {
        text: '部门人工成本总额 '
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: {
            show: true,
            readOnly: false
          },
          magicType: {
            show: true,
            type: ['line', 'bar']
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      legend: {
        data: ['人力成本']
      },
      xAxis: [{
        type: 'category',
        data: ['人力资源中心', '市场部', '销售服务部', '技术部', '产品部', '财务部',
          '行政部'
        ],
        axisPointer: {
          type: 'shadow'
        }
      }],
      yAxis: [{
        type: 'value',
        name: '元',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value} 元'
        }
      },


      ],
      series: [{
        name: '人力成本',
        type: 'bar',
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
        ]
      },


      ]
    };

    /*   部门平均人工成本 */
    optiony2 = {
      title: {
        text: '部门平均人工成本'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: {
            show: true,
            readOnly: false
          },
          magicType: {
            show: true,
            type: ['line', 'bar']
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      legend: {
        data: ['平均工资']
      },
      xAxis: [{
        type: 'category',
        data: ['2021-11-29', '2021-11-30', '2021-11-29', '2021-11-30', '2021-12-01', '2021-12-02',
          '2021-12-03'
        ],
        axisPointer: {
          type: 'shadow'
        }
      }],
      yAxis: [{
        type: 'value',
        name: '元',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value} 元'
        }
      },


      ],
      series: [{
        name: '部门平均人工成本',
        type: 'bar',
        data: [
          2.0, 4.9, 7.0, 23.2, 15.6, 86.7, 125.6
        ]
      },

      ]
    };


    optiony1 && myCharty1.setOption(optiony1);
    optiony2 && myCharty2.setOption(optiony2);


  }
}
</script>


<style scoped>
@import url("../../css/Statistics.css");
</style>