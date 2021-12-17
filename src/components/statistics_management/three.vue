<template>
  <div id="main" style="width: 100%;height:650px; float: left;"></div>
</template>
<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
    }
  },
  computed: {

  },
  mounted() {
    //准备实例
    /*  员工性别分布 */
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;

    myChart.on('click', function(params) {
      window.location.replace('http://localhost:'+window.location.port+params.value);
    });

    var colorList = [[
      '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
      '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
      '#1e90ff', '#ff6347', '#7b68ee', '#d0648a', '#ffd700',
      '#6b8e23', '#4ea397', '#3cb371', '#b8860b', '#7bd9a5'
    ],
      [
        '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
        '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
        '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
        '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'
      ],
      [
        '#929fff', '#9de0ff', '#ffa897', '#af87fe', '#7dc3fe',
        '#bb60b2', '#433e7c', '#f47a75', '#009db2', '#024b51',
        '#0780cf', '#765005', '#e75840', '#26ccd8', '#3685fe',
        '#9977ef', '#f5616f', '#f7b13f', '#f9e264', '#50c48f'
      ]][2];

    option = {
      // 图表标题
      title: {
        show:true,//显示策略，默认值true,可选为：true（显示） | false（隐藏）
        text: '此图现为测试阶段，能力有限可能会删掉或改掉',//主标题文本，'\n'指定换行
        x: 'center',        // 水平安放位置，默认为左对齐，可选为：
        // 'center' ¦ 'left' ¦ 'right'
        // ¦ {number}（x坐标，单位px）
        y: 'bottom',             // 垂直安放位置，默认为全图顶端，可选为：
        // 'top' ¦ 'bottom' ¦ 'center'
        // ¦ {number}（y坐标，单位px）
        //textAlign: null          // 水平对齐方式，默认根据x设置自动调整
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: '#ccc',    // 标题边框颜色
        borderWidth: 0,         // 标题边框线宽，单位px，默认为0（无边框）
        padding: 5,             // 标题内边距，单位px，默认各方向内边距为5，
                                // 接受数组分别设定上右下左边距，同css
        itemGap: 10,            // 主副标题纵向间隔，单位px，默认为10，
        textStyle: {
          fontSize: 18,
          fontWeight: 'bolder',
          color: '#333'        // 主标题文字颜色
        },
        subtextStyle: {
          color: '#aaa'        // 副标题文字颜色
        }
      },
      backgroundColor: '#fff',
      tooltip: {},
      animationDurationUpdate: function(idx) {
        // 越往后的数据延迟越大
        return idx * 100;
      },
      animationEasingUpdate: 'bounceIn',
      color: ['#fff', '#fff', '#fff'],
      series: [{
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 500,
          edgeLength: 10
        },
        roam: true,
        label: {
          normal: {
            show: true
          }
        },
        data: [{
          "name": "统计分析",
          "value": "统计分析",
          "symbolSize": 200,
          "draggable": true,
          "itemStyle": {
            "normal": {
              "shadowBlur": 100,
              "shadowColor": colorList[0],
              "color": colorList[0]
            }
          }
        }, {
          "name": "人员分析",
          "value": "人员分析",
          "symbolSize": 150,
          "draggable": true,
          "itemStyle": {
            "normal": {
              "shadowBlur": 100,
              "shadowColor": colorList[1],
              "color": colorList[1]
            }
          }
        }, {
          "name": "人员数量分析",
          "value": "/statistics/staff_analyze/statistics_personnel1?path=/statistics",
          "symbolSize": 100,
          "draggable": true,
          "itemStyle": {
            "normal": {
              "shadowBlur": 100,
              "shadowColor": colorList[2],
              "color": colorList[2]
            }
          }
        }, {
          "name": "人员异动分析",
          "value": "/statistics/staff_analyze/statistics_personnel2?path=/statistics",
          "symbolSize": 100,
          "draggable": true,
          "itemStyle": {
            "normal": {
              "shadowBlur": 100,
              "shadowColor": colorList[3],
              "color": colorList[3]
            }
          }
        }, {
          "name": "员工概况",
          "value": "/statistics/staff_analyze/statistics_personnel3?path=/statistics",
          "symbolSize": 100,
          "draggable": true,
          "itemStyle": {
            "normal": {
              "shadowBlur": 100,
              "shadowColor": colorList[4],
              "color": colorList[4]
            }
          }
        }, {
          "name": "考勤分析",
          "value": "考勤分析",
          "symbolSize": 150,
          "draggable": true,
          "itemStyle": {
            "normal": {
              "shadowBlur": 100,
              "shadowColor": colorList[5],
              "color": colorList[5]
            }
          }
        }, {
          "name": "出勤分析",
          "value": "/statistics/attendance_analyze/statistics_work1?path=/statistics",
          "symbolSize": 100,
          "draggable": true,
          "itemStyle": {
            "normal": {
              "shadowBlur": 100,
              "shadowColor": colorList[6],
              "color": colorList[6]
            }
          }
        }, {
          "name": "工时分析",
          "value": "/statistics/attendance_analyze/statistics_work2?path=/statistics",
          "symbolSize": 100,
          "draggable": true,
          "itemStyle": {
            "normal": {
              "shadowBlur": 100,
              "shadowColor": colorList[7],
              "color": colorList[7]
            }
          }
        }, {
          "name": "加班分析",
          "value": "/statistics/attendance_analyze/statistics_work3?path=/statistics",
          "symbolSize": 100,
          "draggable": true,
          "itemStyle": {
            "normal": {
              "shadowBlur": 100,
              "shadowColor": colorList[8],
              "color": colorList[8]
            }
          }
        }, {
          "name": "请假分析",
          "value": "/statistics/attendance_analyze/statistics_work4?path=/statistics",
          "symbolSize": 100,
          "draggable": true,
          "itemStyle": {
            "normal": {
              "shadowBlur": 100,
              "shadowColor": colorList[9],
              "color": colorList[9]
            }
          }
        }, {
          "name": "薪酬分析",
          "value": "薪酬分析",
          "symbolSize": 150,
          "draggable": true,
          "itemStyle": {
            "normal": {
              "shadowBlur": 100,
              "shadowColor": colorList[10],
              "color": colorList[10]
            }
          }
        }, {
          "name": "工资成本分析",
          "value": "/statistics/remuneration_analyze/statistics_analysis1?path=/statistics",
          "symbolSize": 100,
          "draggable": true,
          "itemStyle": {
            "normal": {
              "shadowBlur": 100,
              "shadowColor": colorList[11],
              "color": colorList[11]
            }
          }
        }, {
          "name": "社保成本分析",
          "value": "/statistics/remuneration_analyze/statistics_analysis2?path=/statistics",
          "symbolSize": 100,
          "draggable": true,
          "itemStyle": {
            "normal": {
              "shadowBlur": 100,
              "shadowColor": colorList[12],
              "color": colorList[12]
            }
          }
        }, {
          "name": "薪酬结构分析",
          "value": "/statistics/remuneration_analyze/statistics_analysis3?path=/statistics",
          "symbolSize": 100,
          "draggable": true,
          "itemStyle": {
            "normal": {
              "shadowBlur": 100,
              "shadowColor": colorList[13],
              "color": colorList[13]
            }
          }
        }, {
          "name": "部门成本分析",
          "value": "/statistics/remuneration_analyze/statistics_analysis4?path=/statistics",
          "symbolSize": 100,
          "draggable": true,
          "itemStyle": {
            "normal": {
              "shadowBlur": 100,
              "shadowColor": colorList[14],
              "color": colorList[14]
            }
          }
        }, ]
      }]
    }

    option && myChart.setOption(option);


  }
}

</script>
<style>
.element.style{
  width: 100%;
  height: 100%;
}
</style>