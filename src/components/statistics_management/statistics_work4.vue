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
    <!--  每月请假人数 -->
    <div id="mainy5" style="width: 980px;height:460px; margin-top: 20px; "></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">


      <span class="ziti">当前月请假人数：</span>
      <br>
      <span class="ziti">3</span>
      <br>
      <span class="ziti">相比上月：</span>
      <br>
      <span class="ziti">???</span>
    </div>
  </div>

  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!--  每月人均请假人数 -->
    <div id="mainy6" style="width: 980px;height:460px; margin-top: 20px; "></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">


      <span class="ziti">当前月请假人数：</span>
      <br>
      <span class="ziti">3</span>
      <br>
      <span class="ziti">相比上月：</span>
      <br>
      <span class="ziti">???</span>
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

    }
  },
  mounted() {
    //准备实例
    /* 	每月请假人数 */
    var chartDomy5 = document.getElementById('mainy5');
    var myCharty5= echarts.init(chartDomy5);
    /*  每月人均请假时长 */
    var chartDomy6 = document.getElementById('mainy6');
    var myCharty6= echarts.init(chartDomy6);

    var optiony5;
    var optiony6;

    /* 每月请假人数 */
    optiony5 = {
      title: {
        text: '每月请假人数'
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
              line:"折线图",
              bar:"柱状图",
            }
          },
          restore: {
            show: true,
            title:'还原'
          },
          saveAsImage: {
            show: true,
            title:"保存"
          }
        }
      },
      legend: {
        data: ['请假人数', '增长率']
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
        name: '请假人数',
        type: 'bar',
        data: [
          20, 49, 70, 232, 256, 135.6, 200
        ],barWidth:'25%',
      },

        {
          name: '增长率',
          type: 'line',
          yAxisIndex: 1,
          data: [30, 20, 20, 40, 50, 30, 40],
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
    optiony6 = {
      title: {
        text: '每月人均请假人数'
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
              line:"折线图",
              bar:"柱状图",
            }
          },
          restore: {
            show: true,
            title:'还原'
          },
          saveAsImage: {
            show: true,
            title:"保存"
          }
        }
      },
      legend: {
        data: ['人均请假数', '增长率']
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
        name: '人均请假数',
        type: 'bar',
        data: [
          20, 49, 70, 232, 256, 135.6, 200
        ],barWidth:'25%',
      },

        {
          name: '增长率',
          type: 'line',
          yAxisIndex: 1,
          data: [30, 20, 20, 40, 50, 30, 40],
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
    optiony5 && myCharty5.setOption(optiony5);
    optiony6 && myCharty6.setOption(optiony6);
  }
}
</script>


<style scoped>
@import url("../../css/Statistics.css");
</style>