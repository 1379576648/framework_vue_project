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

    <div id="main7" style="width: 952px;height:460px;"></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">当前月员工新进率</span>
      <br>
      <span class="ziti">3</span>
      <br>

    </div>
  </div>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">

    <div id="main8" style="width: 952px;height:460px;"></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">当前月离职率</span>
      <br>
      <span class="ziti">3</span>
      <br>


    </div>
  </div>

  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">

    <div id="main9" style="width: 952px;height:460px;"></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">当前月员工损失率</span>
      <br>
      <span class="ziti">9</span>
      <br>


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
//多次使用图表方法
export default ({
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



    }
  },
  computed: {

  },

  mounted() {
    //准备实例

    //3d地球
/*
    var ROOT_PATH =
        'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
*/


    /* 当前月员工新进率 */
    var chartDom7 = document.getElementById('main7');
    var myChart7 = echarts.init(chartDom7);
    var option7;
    // 当前月离职率
    var chartDom8 = document.getElementById('main8');
    var myChart8 = echarts.init(chartDom8);
    var option8;
    /* 当前月员工损失率 */
    var chartDom9 = document.getElementById('main9');
    var myChart9 = echarts.init(chartDom9);
    var option9;

    /* 当前月员工新进率 */
    option7 = {
      title: {
        text: '每月员工新进率'
      },

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['新进率']
      },
      toolbox: {
        feature: {
          saveAsImage: {
            show: true,
            title:'保存'
          }, magicType: {
            show: true,
            type: ['line', 'bar'],
            title:{
              line:"折线图",
              bar:"柱状图",
            }
          },

        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ['2021-07', '2021-08', '2021-09', '2021-10', '2021-10', '2021-11', '2021-12']
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: '新进率',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210],
        smooth:true
      }


      ]
    };

    // 当前月离职率
    option8 = {
      title: {
        text: '每月员工离职率'
      },

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: 'black'
          }
        }
      },
      legend: {
        data: ['离职率']
      },
      toolbox: {
        feature: {
          saveAsImage: {
            show:true,
            title:"保存"
          },
          magicType: {
            show: true,
            type: ['line', 'bar'],
            title:{
              line:"折线图",
              bar:"柱状图",
            }
          },

        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ['2021-07', '2021-08', '2021-09', '2021-10', '2021-10', '2021-11', '2021-12']
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: '离职率',
        type: 'line',
        stack: 'Total',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'red' // 0% 处的颜色
            }, {
              offset: 1,
              color: 'blue' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210],
        smooth:true
      }


      ]
    };
    /* 当前月员工损失率 */
    option9 = {
      title: {
        text: '每月员工损失率'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['损失率']
      },
      toolbox: {
        feature: {
          saveAsImage: {
            show:true,
            title:"保存"
          },

          magicType: {
            show: true,
            type: ['line', 'bar'],
            title:{
              line:"折线图",
              bar:"柱状图",
            }
          },
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ['2021-07', '2021-08', '2021-09', '2021-10', '2021-10', '2021-11', '2021-12']
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: '损失率',
        type: 'line',
        stack: 'Total',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#00FF00' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#FF0066' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210],
        smooth:true
      }

      ]
    };

    option7 && myChart7.setOption(option7);
    option8 && myChart8.setOption(option8);
    option9 && myChart9.setOption(option9);



  }
})
</script>


<style scoped>
@import url("../../css/Statistics.css");
</style>