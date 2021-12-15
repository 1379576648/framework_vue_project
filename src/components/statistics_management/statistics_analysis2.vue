<template>
  <div class="demo-date-picker" style="width: 100%;height: 55px;">
    <div class="" style="width: 850px;height: 55px; float: right;">
      <span class="demonstration" style="position: relative;top: 15px;">时间范围：</span>

      <el-date-picker v-model="value1" type="daterange" range-separator="To"
                      start-placeholder="Start date" end-placeholder="End date" style="position: relative;top: 15px;">
      </el-date-picker>
      <span class="demonstration" style="position: relative;top: 15px;left: 10px;">组织范围：</span>
      <el-cascader v-model="value" :options="options" :props="{ expandTrigger: 'hover' }"
                   @change="handleChange" style="position: relative;top: 15px;"></el-cascader>
      <el-button type="primary" style="position: relative;top: 15px;">搜索</el-button>
    </div>

  </div>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!--  每月参保人数 -->
    <div id="mainy1" style="width: 1122px;height:460px; margin-top: 20px; "></div>
    <div style="width: 25%;height: 320px; float: right; margin-top: -390px;">
      <span class="ziti">当前月参保人数：</span>
      <br>
      <span class="ziti">3</span>
      <br>
      <span class="ziti">相比上月：</span>
      <br>
      <span class="ziti">???</span>
    </div>
  </div>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!--  每月社保缴纳总额 -->
    <div id="mainy2" style="width: 1122px;height:460px; margin-top: 20px; "></div>
    <div style="width: 25%;height: 320px; float: right; margin-top: -390px;">
      <span class="ziti">当前月公司社保总额：</span>
      <br>
      <span class="ziti">3</span>
      <br>
      <span class="ziti">当前月个人社保总额：</span>
      <br>
      <span class="ziti">123</span><br>
      <span class="ziti">相比上月：</span><br>
      <span class="ziti">1223</span>
    </div>
  </div>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!--  每月公积金缴纳总额-->
    <div id="mainy3" style="width: 1122px;height:460px; margin-top: 20px; "></div>
    <div style="width: 25%;height: 320px; float: right; margin-top: -390px;">
      <span class="ziti">当前月公司公积金总额：</span>
      <br>
      <span class="ziti">3</span>
      <br>
      <span class="ziti">当前月个人公积金总额：</span>
      <br>
      <span class="ziti">123</span><br>
      <span class="ziti">相比上月：</span><br>
      <span class="ziti">1223</span>
    </div>
  </div>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!--  每月平均工资 -->
    <div id="mainy4" style="width: 1122px;height:460px; margin-top: 20px; "></div>
    <div style="width: 25%;height: 320px; float: right; margin-top: -390px;">
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
    /* 	<!--  每月参保人数--> */
    var chartDomy1 = document.getElementById('mainy1');
    var myCharty1 = echarts.init(chartDomy1);
    /* 	每月缴纳保险总额 */
    var chartDomy2 = document.getElementById('mainy2');
    var myCharty2 = echarts.init(chartDomy2);
    /* 每月社保缴纳总额 */
    var chartDomy3 = document.getElementById('mainy3');
    var myCharty3 = echarts.init(chartDomy3);
    /* 每月公积金缴纳总额*/
    var chartDomy4 = document.getElementById('mainy4');
    var myCharty4 = echarts.init(chartDomy4);

    var optiony4;
    var optiony1;
    var optiony2;
    var optiony3;

    /* <!-- 每月参保人数 --> */

    optiony1 = {
      title: {
        text: '每月参保人数'
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
        data: ['参保人数', '增长率']
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
        name: '参保人数',
        type: 'bar',
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
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
    /* 每月缴纳保险总额 */
    optiony2 = {
      title: {
        text: '每月缴纳保险总额'
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
        data: ['保险总额', '增长率']
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
        name: '保险总额',
        type: 'bar',
        data: [
          200, 149, 27.0, 23.2, 225.6, 276.7, 135.6
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
    /* 每月社保缴纳总额 */
    optiony3 = {
      title: {
        text: '每月社保缴纳总额'
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
        data: ['公司社保总额', '个人社保总额', '增长率']
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
        name: '公司社保总额',
        type: 'bar',
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
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
        },
        {
          name: '个人社保总额',
          type: 'bar',
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
          ]
        },
      ]
    };
    /* 每月公积金缴纳总额 */
    optiony4 = {
      title: {
        text: '每月公积金缴纳总额'
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
        data: ['企业公积金总额', '个人公积金总额', '增长率']
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
        max: 300,
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
        name: '企业公积金总额',
        type: 'bar',
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
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
        },
        {
          name: '个人公积金总额',
          type: 'bar',
          data: [
            200, 49, 70, 232, 256, 76.7, 135.6
          ]
        },
      ]
    };




    optiony1 && myCharty1.setOption(optiony1);
    optiony2 && myCharty2.setOption(optiony2);
    optiony3 && myCharty3.setOption(optiony3);
    optiony4 && myCharty4.setOption(optiony4);

  }
}
</script>


<style scoped>
@import url("../../css/Statistics.css");
</style>