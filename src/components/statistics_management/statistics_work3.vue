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
    <!--  每月加班总时长 -->
    <div id="mainy3" style="width: 980px;height:460px; margin-top: 20px; "></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">


      <span class="ziti">当前月加班时长：</span>
      <br>
      <span class="ziti">3</span>
      <br>
      <span class="ziti">相比上月：</span>
      <br>
      <span class="ziti">???</span>
    </div>
  </div>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!--  每月人均加班总时长 -->
    <div id="mainy4" style="width: 980px;height:460px; margin-top: 20px; "></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">


      <span class="ziti">当前月人均加班时长：</span>
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
import * as echarts from 'echarts'

export default {


  data() {
    return {

    }
  },
  mounted() {
    //准备实例
    /* 每月加班总时长 */
    var chartDomy3 = document.getElementById('mainy3');
    var myCharty3 = echarts.init(chartDomy3);
    /* 每月人均加班时长 */
    var chartDomy4 = document.getElementById('mainy4');
    var myCharty4 = echarts.init(chartDomy4);


    var optiony3;
    var optiony4;



    /* /每月加班总时长/ */
    optiony3 = {
      title: {
        text: '每月加班总时长'
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
        data: ['加班小时', '增长率']
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
        name: '加班小时',
        type: 'bar',
        data: [
          50, 49, 70, 232, 256, 135.6, 200
        ]
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
    /*  每月人均加班时长 */
    optiony4 = {
      title: {
        text: '每月人均加班时长'
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
        data: ['人均加班小时', '增长率']
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
        name: '人均加班小时',
        type: 'bar',
        data: [
          20, 49, 70, 232, 256, 135.6, 200
        ]
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

    optiony3 && myCharty3.setOption(optiony3);
    optiony4 && myCharty4.setOption(optiony4);

  }
}
</script>


<style scoped>
@import url("../../css/Statistics.css");
</style>