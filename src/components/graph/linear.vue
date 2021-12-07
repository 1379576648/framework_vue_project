<template>
  <!--线性统计图  -->
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main" style="width: 600px;height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: '',
  data () {
    return {
    }
  },
  methods:{
    drawPie(id){
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20]
          }
        ],
        toolbox: {
          show: true,//显示工具栏组件
          feature: {
            dataView: {
              show:true,//显示该工具
              title:"数据视图",
              readOnly: true//是否显示不可编辑(只读)
            },
            magicType: { //动态类型切换
              show:true,//是否显示该工具
              type: ['line', 'bar'],//启用的动态类型
              title:{
                line:'切换为折线图',
                bar:'切换为柱状图'
              }},
            restore: {//配置项还原
              show:true,//是否显示该工具
              title: "还原"
            },
            saveAsImage: {//保存为图片
              show:true, //是否显示该工具
              title:"保存"
            }
          }
        }

      })
    }
  },
  //调用
  mounted(){
    this.$nextTick(function() {
      this.drawPie('main')
    })
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>