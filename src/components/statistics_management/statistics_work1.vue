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
    <!-- 	每日员工异常人数	 -->
    <div id="main5" style="width: 952px;height:460px; margin-top: 20px; "></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">昨日迟到人数</span>
      <br>
      <span class="ziti">5</span>
      <br>
      <span class="ziti">昨日早退人数</span>
      <br>
      <span class="ziti">???</span>
      <br>
      <span class="ziti">昨日未打卡人数</span><br>
      <span class="ziti">???</span>
    </div>
  </div>


  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed">

    <!--  每日请假人数 -->
    <div id="main" style="width: 952px;height:460px;"></div>


    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">


      <span class="ziti">昨日请假人数</span>
      <br>
      <span class="ziti">0</span>
      <br>
      <span class="ziti">相比前天</span>
      <br>
      <span class="ziti">???</span>
      <br>

    </div>
  </div>

  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">

    <!-- 每日出差人数 -->
    <div id="main1" style="width: 952px;height:460px; margin-top: 20px; "></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">


      <span class="ziti">昨日出差人数</span>
      <br>
      <span class="ziti">1</span>
      <br>
      <span class="ziti">相比前台</span>
      <br>
      <span class="ziti">???</span>
      <br>

    </div>
  </div>

  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">

    <!-- 员工出勤率 -->
    <div id="main2" style="width: 952px;height:460px; margin-top: 20px; "></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">


      <span class="ziti">昨日出勤人数</span>
      <br>
      <span class="ziti">2</span>
      <br>
      <span class="ziti">昨日出勤率</span>
      <br>
      <span class="ziti">???</span>
      <br>

    </div>
  </div>


  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!--  员工缺勤率 -->
    <div id="main3" style="width: 952px;height:460px; margin-top: 20px; "></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">


      <span class="ziti">昨日缺勤人数</span>
      <br>
      <span class="ziti">3</span>
      <br>
      <span class="ziti">昨日缺勤率</span>
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
    /* <!--  每日请假人数 --> */
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    /* <!-- 每日出差人数 --> */
    var chartDom1 = document.getElementById('main1');
    var myChart1 = echarts.init(chartDom1);
    /* 	 <!-- 员工出勤率 --> */
    var chartDom2 = document.getElementById('main2');
    var myChart2 = echarts.init(chartDom2);
    /*  <!--  员工缺勤率 --> */
    var chartDom3 = document.getElementById('main3');
    var myChart3 = echarts.init(chartDom3);
    /*    <!-- 	每日员工异常人数	 --> */
    var chartDom5 = document.getElementById('main5');
    var myChart5 = echarts.init(chartDom5);

    var option;
    var option1;
    var option2;
    var option3;
    var option5;

    /* <!--  每日请假人数 --> */
    option = {
      title: {
        text: '每日请假人数'
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
            title:"数据视图"
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
            title:"还原"
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
        name: '请假人数',
        type: 'bar',
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2,
        ],
        barWidth:'25%',
      },

        {
          name: '增长率',
          type: 'line',
          yAxisIndex: 1,
          data: [10, 20, 30, 40, 50, 30, 40]
        }
      ]
    };
    /* <!-- 每日出差人数 --> */
    option1 = {
      title: {
        text: '每日出差人数'
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
            title:"数据视图"
          },
          magicType: {
            show: true,
            type: ['line', 'bar'],
            title:{
              line:"折线图",
              bar: "柱状图",
            }
          },
          restore: {
            show: true,
            title:"还原"
          },
          saveAsImage: {
            show: true,
            title:"保存"
          }
        }
      },
      legend: {
        data: ['出差人数', '增长率']
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
        name: '出差人数',
        type: 'bar',
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6,
        ],
        barWidth:'25%',
      },

        {
          name: '增长率',
          type: 'line',
          yAxisIndex: 1,
          data: [10, 20, 30, 40, 50, 30, 40]
        }
      ]
    };
    /* 	 <!-- 员工出勤率 --> */
    option2 = {
      title: {
        text: '员工出勤率'
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
            title:"数据视图"
          },
          magicType: {
            show: true,
            type: ['line', 'bar'],
            title:{
              line:"折线图",
              bar: "柱状图",
            }
          },
          restore: {
            show: true,
            title:"还原"
          },
          saveAsImage: {
            show: true,
            title:"保存"
          }
        }
      },
      legend: {
        data: ['出勤人数', '增长率']
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
        name: '出勤人数',
        type: 'bar',
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2,
        ], barWidth:'25%',
      },

        {
          name: '增长率',
          type: 'line',
          yAxisIndex: 1,
          data: [10, 20, 30, 40, 50, 30, 40]
        }
      ]
    };
    /*  <!--  员工缺勤率 --> */
    option3 = {
      title: {
        text: '员工缺勤率'
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
            title:"数据视图"
          },
          magicType: {
            show: true,
            type: ['line', 'bar'],
            title:{
              line:"折线图",
              bar: "柱状图",
            }
          },
          restore: {
            show: true,
            title:"还原"
          },
          saveAsImage: {
            show: true,
            title:"保存"
          }
        }
      },
      legend: {
        data: ['缺勤人数', '增长率']
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
        name: '缺勤人数',
        type: 'bar',
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2,
        ], barWidth:'25%',
      },

        {
          name: '增长率',
          type: 'line',
          yAxisIndex: 1,
          data: [10, 20, 30, 40, 50, 30, 40]
        }
      ]
    };

    /* <!-- 	每日员工异常人数	 --> */
    option5 = {
      title: {
        text: '每月员工异动人数'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['迟到', '早退', '未打卡(未签到或未签退)']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {

          saveAsImage: {
            show: true,
            title:"保存"
          }
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '迟到',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },


        {
          name: '早退',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '未打卡(未签到或未签退)',
          type: 'line',
          stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };


    option && myChart.setOption(option);
    option1 && myChart1.setOption(option1);
    option2 && myChart2.setOption(option2);
    option3 && myChart3.setOption(option3);
    option5 && myChart5.setOption(option5);

  }
}
</script>


<style scoped>
@import url("../../css/Statistics.css");
</style>