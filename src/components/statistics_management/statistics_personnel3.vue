<template>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <div style="border-right: 1px #000000 dashed; width: 50%;height: 480px;border-left: 1px #000000 dashed;">

      <!-- //员工性别分布 -->
      <div id="mainy1" style="width: 655px;height:425px; float: left;"></div>
    </div>
    <div style="  width: 50%;height: 450px; position: absolute;top: 0px;right: 2px; ">
      <!-- //员工婚姻分布 -->
      <div id="mainy2" style="width: 655px;height:425px; float: right;"></div>
    </div>
  </div>



  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <div style="border-left: 1px #000000 dashed; width: 50%;height: 480px;border-right: 1px #000000 dashed;">

      <!--  员工司龄分布 -->
      <div id="mainy3" style="width: 655px;height:425px; float: left;"></div>
    </div>
    <div style="  width: 50%;height: 450px; position: absolute;top: 0px;right: 2px; ">
      <!-- 员工学历分布 -->
      <div id="mainy4" style="width: 655px;height:425px; float: right;"></div>
    </div>
  </div>


  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <div style="border-left: 1px #000000 dashed; width: 50%;height: 480px;border-right: 1px #000000 dashed;">

      <!-- 员工年龄段分布 -->
      <div id="mainy5" style="width: 655px;height:425px; float: left;"></div>
    </div>
    <div style="  width: 50%;height: 450px; position: absolute;top: 0px;right: 2px; ">
      <!-- 	员工年代分布 -->
      <div id="mainy6" style="width: 655px;height:425px; float: right;"></div>
    </div>


    <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
      <div style="border-left: 1px #000000 dashed; width: 50%;height: 480px;border-right: 1px #000000 dashed;">

        <!-- 员工年龄段分布 -->
        <div id="mainy7" style="width: 655px;height:425px; float: left;"></div>
      </div>
      <div style="  width: 50%;height: 450px; position: absolute;top: 0px;right: 2px; ">
        <!-- 	员工年代分布 -->
        <div id="mainy8" style="width: 655px;height:425px; float: right;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
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
    /* 员工司龄分布 */
    var chartDomy3 = document.getElementById('mainy3');
    var myCharty3 = echarts.init(chartDomy3);
    var optiony3;
    /* <!-- 员工学历分布 --> */
    var chartDomy4 = document.getElementById('mainy4');
    var myCharty4 = echarts.init(chartDomy4);
    var optiony4;
    /* <!-- 	员工年代分布 --> */
    var chartDomy6 = document.getElementById('mainy6');
    var myCharty6 = echarts.init(chartDomy6);
    var optiony6;
    /* 	<!-- 员工年龄段分布 --> */
    var chartDomy5 = document.getElementById('mainy5');
    var myCharty5 = echarts.init(chartDomy5);
    var optiony5;
    /* 	<!-- 员工年龄段分布 --> */
    var chartDomy7 = document.getElementById('mainy7');
    var myCharty7 = echarts.init(chartDomy7);
    var optiony7;
    /* 	<!-- 员工年龄段分布 --> */
    var chartDomy8 = document.getElementById('mainy8');
    var myCharty8 = echarts.init(chartDomy8);
    var optiony8;


    var option = {


      title: {
        text: '每月末在职人数'
      },
      tooltip: {},
      legend: {
        data: ['在职人数', '增长率']
      },
      xAxis: {
        data: ['2021-07', '2021-07', '2021-07', '2021-07', '2021-07', '2021-07']
      },
      yAxis: {
        type: 'value',

        min: 0,
        max: 25,
        interval: 5,
        formatter: '{value} 人'
      },
      series: [{
        name: '在职人数',
        type: 'bar',
        data: [5, 20, 25, 10, 10, 20],

      }, {
        name: '增长率',
        type: 'line',
        data: [5, 20, 25, 10, 10, 20],
      }]
    };



    /*  员工性别分布 */
    optiony1 = {
      tooltip: {
        trigger: 'item'
      },
      title: {
        text: '员工性别分布'
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
        name: '性别',
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
          value: 1048,
          name: '男'
        },
          {
            value: 735,
            name: '女'
          }

        ]
      }]
    };
    /* 员工婚姻分布 */
    optiony2 = {
      tooltip: {
        trigger: 'item'
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
        text: '员工婚姻分布'
      },
      series: [{
        name: '婚姻',
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
          name: '已婚'
        },
          {
            value: 735,
            name: '未婚'
          },
          {
            value: 580,
            name: '未知'
          },

        ]
      }]
    };
    /* 员工司龄分布 */
    optiony3 = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
        formatter: function(name) {
          var data = optiony3.series[0].data;
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
        text: '员工司龄分布'
      },
      series: [{
        name: '司龄',
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
          name: '未知'
        },
          {
            value: 735,
            name: '3个月内'
          },
          {
            value: 580,
            name: '3-6个月内'
          },
          {
            value: 180,
            name: '6个月-1年内'
          },
          {
            value: 180,
            name: '1年-3年'
          },
          {
            value: 180,
            name: '3年-5年'
          },
          {
            value: 180,
            name: '5年以上'
          },
        ]
      }]
    };
    /* 员工学历分布 */
    optiony4 = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
        formatter: function(name) {
          var data = optiony4.series[0].data;
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
        text: '员工学历分布'
      },
      series: [{
        name: '学历',
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
          name: '未知'
        },
          {
            value: 735,
            name: '博士'
          },
          {
            value: 580,
            name: '硕士'
          },
          {
            value: 380,
            name: '本科'
          },
          {
            value: 520,
            name: '专科'
          },
          {
            value: 530,
            name: '高中'
          },
          {
            value: 50,
            name: '初中'
          },
          {
            value: 510,
            name: '小学'
          },
          {
            value: 80,
            name: '中专'
          },
        ]
      }]
    };
    /* 员工年龄段分布 */
    optiony5 = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
        formatter: function(name) {
          var data = optiony5.series[0].data;
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
        text: '员工司龄分布'
      },
      series: [{
        name: '司龄',
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
          name: '18岁以下'
        },
          {
            value: 735,
            name: '19-25岁'
          },
          {
            value: 580,
            name: '26-30岁'
          },
          {
            value: 180,
            name: '31-35岁'
          },
          {
            value: 180,
            name: '36-40岁'
          },
          {
            value: 180,
            name: '41-45岁'
          },
          {
            value: 180,
            name: '46以上'
          },
        ]
      }]
    };

    /*  员工年代分布 */
    optiony6 = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
        formatter: function(name) {
          var data = optiony6.series[0].data;
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
        text: '员工年代分布'
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
          name: '未知'
        },
          {
            value: 735,
            name: '00后'
          },
          {
            value: 580,
            name: '90后'
          },
          {
            value: 380,
            name: '80后'
          },
          {
            value: 520,
            name: '70后'
          },
          {
            value: 530,
            name: '60后'
          },
          {
            value: 50,
            name: '50后'
          },
          {
            value: 510,
            name: '40后'
          },

        ]
      }]
    };

    optiony7 = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
        formatter: function(name) {
          var data = optiony7.series[0].data;
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
        text: '员工星座分布'
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
          name: '未知'
        },
          {
            value: 735,
            name: '天蝎座'
          },
          {
            value: 580,
            name: '白羊座'
          },
          {
            value: 380,
            name: '金牛座'
          },
          {
            value: 520,
            name: '双子座'
          },
          {
            value: 530,
            name: '巨蟹座'
          },
          {
            value: 50,
            name: '狮子座'
          },
          {
            value: 510,
            name: '处女座'
          },
          {
            value: 515,
            name: '天平座'
          },
          {
            value: 315,
            name: '射手座'
          },
          {
            value: 515,
            name: '魔蝎座'
          },
          {
            value: 115,
            name: '水平座'
          },
          {
            value: 215,
            name: '双鱼座'
          },
        ]
      }]
    };

    optiony8 = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
        formatter: function(name) {
          var data = optiony8.series[0].data;
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


    optiony1 && myCharty1.setOption(optiony1);
    optiony2 && myCharty2.setOption(optiony2);
    optiony3 && myCharty3.setOption(optiony3);
    optiony4 && myCharty4.setOption(optiony4);
    optiony5 && myCharty5.setOption(optiony5);
    optiony6 && myCharty6.setOption(optiony6);
    optiony7 && myCharty7.setOption(optiony7);
    optiony8 && myCharty8.setOption(optiony8);

  }
}
</script>

<style scoped>

</style>