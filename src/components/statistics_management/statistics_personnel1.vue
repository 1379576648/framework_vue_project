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

  <div style="position: relative; display: block; width: 100%; border-top: 1px #000000 dashed;">

    <div :id="uuid" :style="style"></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">当前月在职人数</span>
      <br>
      <span class="ziti">1</span>
      <br>
      <span class="ziti">相比上月</span>
      <br>
      <span class="ziti">???</span>
      <br>

    </div>
  </div>

  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">

    <div id="main1" style="width: 1050px;height:460px;"></div>
    <div style="width: 16%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">当前月入职人数</span>
      <br>
      <span class="ziti">2</span>
      <br>
      <span class="ziti">相比上月</span>
      <br>
      <span class="ziti">???</span>
      <br>

    </div>
  </div>

  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">

    <div id="main2" style="width: 1050px;height:460px;"></div>
    <div style="width: 16%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">当前月离职人数</span>
      <br>
      <span class="ziti">3</span>
      <br>
      <span class="ziti">相比上月</span>
      <br>
      <span class="ziti">???</span>
      <br>

    </div>
  </div>

  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">

    <div id="main3" style="width: 1050px;height:460px;"></div>
    <div style="width: 16%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">当前月转正人数</span>
      <br>
      <span class="ziti">4</span>
      <br>

      <span class="ziti">人数</span><br>
      <span class="ziti">???</span>
    </div>
  </div>

  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">

    <div id="main4" style="width: 1050px;height:460px;"></div>
    <div style="width: 16%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">当前最多人数部门</span>
      <br>
      <span class="ziti">4</span>
      <br>

      <span class="ziti">人数</span><br>
      <span class="ziti">???</span>
    </div>
  </div>

  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">

    <div id="main5" style="width: 1050px;height:460px;"></div>
    <div style="width: 16%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">当前最多岗位人数：</span>
      <br>
      <span class="ziti">5</span>
      <br>
      <span class="ziti">人数</span>
      <br>
      <span class="ziti">???</span>
      <br>

    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
    ref
} from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl';
//多次使用图表方法
const idGen = () => {
  return new Date().getTime()
}

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
  props: {
    height: {
      type: String,
      default: '460px'
    },
    width: {
      type: String,
      default: '1050px'
    }
  },

  data() {
    return {

      uuid: null,

      myChart: null,


    }
  },
  computed: {
    style() {
      return {
        height: this.height,
        width: this.width
      }
    }
  },
  created() {
    this.uuid = idGen()

  },
  mounted() {
    //准备实例
    /* 当前月入职人数 */
    this.myChart = echarts.init(document.getElementById(this.uuid));
    var chartDom1 = document.getElementById('main1');
    var myChart1 = echarts.init(chartDom1);
    var option1;
    /*  当前月离职人数 */
    var chartDom2 = document.getElementById('main2');
    var myChart2 = echarts.init(chartDom2);
    var option2;
    /* 当前月转正人数 */
    var chartDom3 = document.getElementById('main3');
    var myChart3 = echarts.init(chartDom3);
    var option3;
    /*  当前最多人数部门 */
    var chartDom4 = document.getElementById('main4');
    var myChart4 = echarts.init(chartDom4);
    var option4;
    /*   当前最多岗位人数： */
    var chartDom5 = document.getElementById('main5');
    var myChart5 = echarts.init(chartDom5);
    var option5;

    var option = {
      title: {
        text: '每月末在职人数',
        left:50
      },
      tooltip: {},
      legend: {
        data: ['在职人数', '增长率']
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
      xAxis: {
        data: ['2021-07', '2021-07', '2021-07', '2021-07', '2021-07', '2021-07']
      },
      yAxis: {
        type: 'value',
        name: '人',

        min: 0,
        max: 25,
        interval: 5,
        formatter: '{value} 人'
      },
      series: [{
        name: '在职人数',
        type: 'bar',
        data: [5, 20, 25, 10, 10, 20],
         barWidth:'25%',
      }, {
        name: '增长率',
        type: 'line',
        data: [5, 20, 25, 10, 10, 20],
        smooth:true,

      }],

    };


    /* 当前月入职人数 */
    var option1 = {
      title: {
        text: '每月入职人数',
        left:50
      },
      tooltip: {},

      legend: {
        data: ['入职人数', '增长率']
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
      xAxis: {
        data: ['2021-07', '2021-07', '2021-07', '2021-07', '2021-07', '2021-07']
      },
      yAxis: {
        type: 'value',
        name: '人',
        min: 0,
        max: 25,
        interval: 5,
        formatter: '{value} 人'
      },
      series: [{
        name: '入职人数',
        type: 'bar',
        data: [5, 20, 25, 10, 10, 20],
        barWidth:'25%',
      }, {
        name: '增长率',
        type: 'line',
        data: [5, 20, 25, 10, 10, 20],
        smooth:true
      }]
    };

    /*  当前月离职人数 */
    var option2 = {
      title: {
        text: '每月离职人数',
        left:50
      },
      tooltip: {},
      legend: {
        data: ['离职人数', '增长率']
      },
      xAxis: {
        data: ['2021-07', '2021-07', '2021-07', '2021-07', '2021-07', '2021-07']
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
      yAxis: {
        type: 'value',
        name: '人',
        min: 0,
        max: 25,
        interval: 5,
        formatter: '{value} 人'
      },
      series: [{
        name: '离职人数',
        type: 'bar',
        data: [5, 20, 25, 10, 10, 20],
        barWidth:'25%',
      }, {
        name: '增长率',
        type: 'line',
        data: [5, 20, 25, 10, 10, 20],
        smooth:true
      }]
    };
    /* 当前月转正人数 */
    var option3 = {


      title: {
        text: '每月转正人数',
        left:50
      },
      tooltip: {},
      legend: {
        data: ['转正人数', '增长率']
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
      xAxis: {
        data: ['2021-07', '2021-07', '2021-07', '2021-07', '2021-07', '2021-07']
      },
      yAxis: {
        type: 'value',
        name: '人',
        min: 0,
        max: 25,
        interval: 5,
        formatter: '{value} 人'
      },
      series: [{
        name: '转正人数',
        type: 'bar',
        data: [5, 20, 25, 10, 10, 20],
        barWidth:'25%',
      }, {
        name: '增长率',
        type: 'line',
        data: [5, 20, 25, 10, 10, 20],
        smooth:true
      }]
    };

    /*  当前最多人数部门 */
    var option4 = {
      title: {
        text: '部门top人数',
        left:50
      },
      tooltip: {},
      legend: {
        data: ['人数',]
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
      xAxis: {
        data: ['人力资源部', '生产管理部', '市场营销部', '总经办', '人力资源中心', '林业部']
      },
      yAxis: {
        type: 'value',
        name: '人',
        min: 0,
        max: 25,
        interval: 5,
        formatter: '{value} 人'
      },
      series: [{
        name: '人数',
        type: 'bar',
        data: [5, 20, 25, 10, 10, 20],
        barWidth:'25%',
      },]
    };

    /*   当前最多岗位人数： */
    var option5 = {
      title: {
        text: '岗位Top榜',
        left:50
      },
      tooltip: {},
      legend: {
        data: ['人数']
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
      xAxis: {
        data: ['生成主管', '培训经理', '劳动关系专员', '销售经理', '总经理助理', '人事经理']
      },
      yAxis: {
        type: 'value',
        name: '人',
        min: 0,
        max: 25,
        interval: 5,
        formatter: '{value} 人'
      },
      series: [{
        name: '人数',
        type: 'bar',
        data: [5, 20, 25, 10, 10, 20],
        barWidth:'25%',
      },]
    };
    //3d地球


    option1 && myChart1.setOption(option1);
    option2 && myChart2.setOption(option2);
    option3 && myChart3.setOption(option3);
    option4 && myChart4.setOption(option4);
    option5 && myChart5.setOption(option5);


    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(option);
  }
})
</script>


<style scoped>
@import url("../../css/Statistics.css");
</style>