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
    <!--  每月计薪人数 -->
    <div id="main" style="width: 1050px;height:460px; margin-top: 20px; "></div>
    <div style="width: 16%;height: 320px; float: right; margin-top: -390px;">
      <span class="ziti">当前月计薪人数：</span>
      <br>
      <span class="ziti">3</span>
      <br>
      <span class="ziti">相比上月：</span>
      <br>
      <span class="ziti">???</span>
    </div>
  </div>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!--  每月人力成本总额 -->
    <div id="main1" style="width: 1050px;height:460px; margin-top: 20px; "></div>
    <div style="width: 16%;height: 320px; float: right; margin-top: -390px;">
      <span class="ziti">当前月人力成本：</span>
      <br>
      <span class="ziti">3</span>
      <br>
      <span class="ziti">相比上月：</span>
      <br>
      <span class="ziti">???</span>
    </div>
  </div>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!--  每月实发工资总额-->
    <div id="main2" style="width: 1050px;height:460px; margin-top: 20px; "></div>
    <div style="width: 16%;height: 320px; float: right; margin-top: -390px;">
      <span class="ziti">当前月实发工资：</span>
      <br>
      <span class="ziti">3</span>
      <br>
      <span class="ziti">相比上月：</span>
      <br>
      <span class="ziti">???</span>
    </div>
  </div>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!--  每月平均工资 -->
    <div id="main3" style="width: 1050px;height:460px; margin-top: 20px; "></div>
    <div style="width: 16%;height: 320px; float: right; margin-top: -390px;">
      <span class="ziti">当前月人均工资：</span>
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
    /* 	<!--  每月计薪人数--> */
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    /* 	每月人力成本总额 */
    var chartDom1 = document.getElementById('main1');
    var myChart1 = echarts.init(chartDom1);
    /* 每月实发工资总额 */
    var chartDom2 = document.getElementById('main2');
    var myChart2 = echarts.init(chartDom2);
    /* 每月平均工资 */
    var chartDom3 = document.getElementById('main3');
    var myChart3 = echarts.init(chartDom3);

    var option;
    var option1;
    var option2;
    var option3;
    /* <!-- 每月计薪人数 --> */

    option = {
      title: {
        text: '每月计薪人数'

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
        data: ['计薪人数', 'Precipitation', '增长率']
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
        name: '人数(人)',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value} 人'
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
        name: '计薪人数',
        type: 'bar',
        data: [
          135.6, 162.2, 32.6, 20.0, 6.4, 3.3, 44
        ]
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
    /* 每月人力成本总额 */
    option1 = {
      title: {
        text: '每月人力成本总额'
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
        data: ['人力成本', '增长率']
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
        name: '人力成本',
        type: 'bar',
        data: [
          7.0, 23.2, 25.6, 135.6, 162.2, 32.6, 20.0, 6.4,
        ]
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
    //每月实发工资总额
    option2 = {
      title: {
        text: '每月实发工资总额'
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
        data: ['实发工资', '增长率']
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
        name: '实发工资',
        type: 'bar',
        data: [
          44, 23, 56, 77, 88, 44, 33, 66
        ]
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
    /* 每月平均工资 */
    option3 = {
      title: {
        text: '每月平均工资'
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
        data: ['平均工资', '增长率']
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
        name: '平均工资',
        type: 'bar',
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6,
        ]
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



    option && myChart.setOption(option);
    option1 && myChart1.setOption(option1);
    option2 && myChart2.setOption(option2);
    option3 && myChart3.setOption(option3);

  }
}
</script>


<style scoped>
@import url("../../css/Statistics.css");
</style>