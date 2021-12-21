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
    <div style="border-right: 1px #000000 dashed; width: 50%;height: 480px;border-left: 1px #000000 dashed;">

      <!-- 固定工资分布 -->
      <div id="mainy1" style="width: 630px;height:405px; float: left;"></div>
    </div>
    <div style="  width: 50%;height: 480px; position: absolute;top: 0px;right: 2px; ">
      <!-- 薪酬结构分布 -->
      <div id="mainy2" style="width: 630px;height:405px; float: right;"></div>
    </div>
  </div>

  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!-- 	部门Top9人力成本 -->
    <div id="main4" style="width: 1050px;height:460px;"></div>
    <div style="width: 16%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">当前最多人力成本部门:</span>
      <br>
      <span class="ziti">牛逼部</span>
      <br>

      <span class="ziti">人力成本：</span><br>
      <span class="ziti">111</span>
    </div>
  </div>

  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!-- 	部门Top9平均工资 -->
    <div id="main5" style="width:1050px;height:460px;"></div>
    <div style="width: 16%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">当前部门最多平均工资：</span>
      <br>
      <span class="ziti">giao部</span>
      <br>
      <span class="ziti">平均工资：</span>
      <br>
      <span class="ziti">1234</span>
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
export default defineComponent({

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
    /*  员工性别分布 */
    var chartDomy1 = document.getElementById('mainy1');
    var myCharty1 = echarts.init(chartDomy1);
    var optiony1;
    /*   员工婚姻分布 */
    var chartDomy2 = document.getElementById('mainy2');
    var myCharty2 = echarts.init(chartDomy2);
    var optiony2;
    /*  当前最多人数部门 */
    var chartDom4 = document.getElementById('main4');
    var myChart4 = echarts.init(chartDom4);
    var option4;
    /*   当前最多岗位人数： */
    var chartDom5 = document.getElementById('main5');
    var myChart5 = echarts.init(chartDom5);
    var option5;





    /*    固定工资分布 */
    optiony1 = {
      tooltip: {
        trigger: 'item'
      },
      title: {
        text: '固定工资分布'
      },
      toolbox: {
        feature: {
          dataView:{
            show:true,
            readOnly:false,
            title:"数据视图"
          },
          saveAsImage: {
            show: true,
            title:"保存"
          },

        }
      },
      legend: {
        top: '5%',
        left: 'center',
        formatter: function(name) {
          var data = optiony1.series[0].data;
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
      series: [{
        name: '薪酬结构',
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
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [{
          value: 48,
          name: '固定工资'
        },
          {
            value: 735,
            name: '加班工资'
          }

        ]
      }]
    };
    /* 薪酬结构分布*/
    optiony2 = {
      tooltip: {
        trigger: 'item'
      },
      toolbox: {
        feature: {
           dataView:{
             show:true,
             readOnly:false,
             title:"数据视图"
           },
          saveAsImage: {
            show: true,
            title:"保存"
          }
        }
      },
      legend: {
        top: '5%',
        left: 'center',
        //获取占比为多少
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
        text: '薪酬结构分布'
      },
      series: [{
        name: '固定工资',
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
          name: '5k以下'
        },
          {
            value: 735,
            name: '5-10k'
          },
          {
            value: 580,
            name: '10-15k'
          },
          {
            value: 580,
            name: '30k以上'
          },

        ]
      }]
    };

    /*  部门Top9人力成本 */
    var option4 = {
      title: {
        text: '部门Top9人力成本'
      },
      tooltip: {

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
        data: ['人力成本']
      },
      xAxis: {
        data: ['人力资源部', '生产管理部', '市场营销部', '总经办', '人力资源中心', '林业部']
      },
      yAxis: {
        type: 'value',

        min: 0,
        max: 25,
        interval: 5,
        formatter: '{value} 人'
      },
      series: [{
        name: '人力成本',
        type: 'bar',
        data: [5, 20, 25, 10, 10, 20],
        barWidth:'25%',
      }, ]
    };

    /*   部门Top9平均工资 */
    var option5 = {
      title: {
        text: '部门Top9平均工资'
      },
      tooltip: {},
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
        data: ['平均工资']
      },
      xAxis: {
        data: ['生成主管', '培训经理', '劳动关系专员', '销售经理', '总经理助理', '人事经理']
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 25,
        interval: 5,
        formatter: '{value} 人'
      },
      series: [{
        name: '平均工资',
        type: 'bar',
        data: [5, 20, 25, 10, 10, 20],
        barWidth:'25%',
      }, ]
    };
    //3d地球

    optiony1 && myCharty1.setOption(optiony1);
    optiony2 && myCharty2.setOption(optiony2);
    option4 && myChart4.setOption(option4);
    option5 && myChart5.setOption(option5);

  }
})
</script>



<style scoped>
@import url("../../css/Statistics.css");
.el-menu[data-v-244d4530] {
  height: 57px;
  font-weight: bold;
}
</style>