<template>
  <div class="demo-date-picker" style="width: 100%;height: 49px;">
    <div class="" style="width: 850px;height: 49px; float: right;">
      <span class="demonstration" style="position: relative;top: -1px;">时间范围：</span>

      <el-date-picker v-model="value1" type="daterange" range-separator="到"
                      start-placeholder="开始时间" end-placeholder="结束时间" style="position: relative;top: 0px;">
      </el-date-picker>
      <span class="demonstration" style="position: relative;top: -1px;left: 3px;">组织范围：</span>
      <el-select v-model="valuee" placeholder="请选择">
        <el-option
            v-for="item in optionss"
            :key="item.valuee"
            :label="item.labell"
            :value="item.valuee"
            style="position: relative;top: -1px;"
        >
        </el-option>
      </el-select>
      <el-button type="primary" style="position: relative;top: -2px;">搜索</el-button>
    </div>

  </div>


  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!--  人均周工时 -->
    <div id="mainy1" style="width: 980px;height:460px; margin-top: 20px; "></div>
    <div style="width: 16%;height: 320px; float: right; margin-top: -390px;">


      <span class="ziti">昨日缺勤人数</span>
      <br>
      <span class="ziti">3</span>
      <br>
      <span class="ziti">昨日缺勤率</span>
      <br>
      <span class="ziti">???</span>
    </div>
  </div>

  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <div
        style="border-left: 1px #000000 dashed; width: 50%;height: 480px;border-right: 1px #000000 dashed;">

      <!-- 上周工时分布 -->
      <div id="mainy2" style="width: 655px;height:425px; float: left;"></div>
    </div>
    <div style="  width: 50%;height: 480px; position: absolute;top: 0px;right: 2px; ">
      <!-- 	员工年代分布 -->
      <div id="mainy8" style="width: 655px;height:460px; float: right;">
        <div style="width: 100%;height: 40px;">
          <span style="font-size: 30px;">上周工时排行榜TOP9</span>&nbsp;&nbsp;&nbsp;

          <span>2021-11-29 ~ 2021-12-05</span>
        </div>
        <el-table :data="tableData" style="width: 100%" height="250">
          <el-table-column fixed prop="date" label="Date" width="150" />
          <el-table-column prop="name" label="Name" width="120" />
          <el-table-column prop="state" label="State" width="120" />
          <el-table-column prop="city" label="City" width="320" />
          <el-table-column prop="address" label="Address" width="600" />
          <el-table-column prop="zip" label="Zip" width="120" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive, ref,
  toRefs
} from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl';
export default {
  setup() {
    const state = reactive({
      shortcuts: [{
        text: 'Last week',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        },
      },
        {
          text: 'Last month',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          },
        },
        {
          text: 'Last 3 months',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          },
        },
      ],
      value1: '',
      value2: '',
    })

    return {
      ...toRefs(state),
      optionss: ref([
        {
          valuee: 'Option1',
          labell: 'Option1',
        },
        {
          valuee: 'Option2',
          labell: 'Option2',
        },
        {
          valuee: 'Option3',
          labell: 'Option3',
        },
        {
          valuee: 'Option4',
          labell: 'Option4',
        },
        {
          valuee: 'Option5',
          labell: 'Option5',
        },
      ]),
      valuee: ref(''),

    }
  },

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
    /* 人均周工时 */
    var chartDomy1 = document.getElementById('mainy1');
    var myCharty1 = echarts.init(chartDomy1);
    /* 上周工时分布 */
    var chartDomy2 = document.getElementById('mainy2');
    var myCharty2 = echarts.init(chartDomy2);


    var optiony1;
    var optiony2;


    /*  人均周工时 */
    optiony1 = {
      title: {
        text: '人均周工时'
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
            readOnly: false,
            title:'数据视图'
          },
          magicType: {
            show: true,
            type: ['line', 'bar'],
            title:{
              line:'折线图',
              bar:'柱状图'
            }
          },
          restore: {
            show: true,
            title:"还原"
          },
          saveAsImage: {
            show: true,
            title:'保存'
          }
        }
      },
      legend: {
        data: ['人均周时工', '增长率']
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
        name: '小时',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value} 时'
        }
      },
        {
          type: 'value',
          name: '增长律（%）',
          min: 0,
          max: 100,
          interval: 10,
          axisLabel: {
            formatter: '{value} %'
          }
        },

      ],
      series: [{
        name: '人均周时工',
        type: 'bar',
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2,
        ],barWidth:'25%',

      },

        {
          name: '增长率',
          type: 'line',
          yAxisIndex: 1,
          data: [10, 20, 30, 40, 50, 30, 40],
          itemStyle: {
            normal: {
              color: "#FFFF66", //折线点的颜色
              lineStyle: {
                color: "#FFFF66" //折线的颜色
              }
            }
          },

        }
      ]
    };
    /* 上周工时分布 */
    optiony2 = {
      tooltip: {
        trigger: 'item',

      },
      toolbox: {
        feature: {
          dataView: {
            show: true,
            readOnly: false
          },
          saveAsImage: {
            show: true
          }
        }
      },
      legend: {
        top: '5%',
        left: 'center',
        formatter: function(name) {
          var data = optiony2.series[0].data;
          var total = 0;
          var tarValue;
          for (var i = 0, l = data.length; i < l; i++) {
            total += data[i].value;
            if (data[i].name == name) {
              tarValue = data[i].value;
            }
          }
          var p = (tarValue / total * 100).toFixed(2);
          return name + ' ' + ' ' + '(' + p + '%)';
        },
      },
      title: {
        text: '在职员工状态分布'
      },
      series: [{
        name: '年代',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [{
          value: 1048,
          name: '正式'
        },
          {
            value: 735,
            name: '试用'
          },


        ]
      }]
    };
    /* /每月加班总时长/ */




    optiony1 && myCharty1.setOption(optiony1);
    optiony2 && myCharty2.setOption(optiony2);

  }
}
</script>


<style scoped>
@import url("../../css/Statistics.css");
</style>