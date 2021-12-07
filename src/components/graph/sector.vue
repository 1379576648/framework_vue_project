<template>
  <!--扇形统计图  -->
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
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
        toolbox: {
          show: true,//显示工具栏组件
          feature: {
            dataView: {
              show: true,//显示该工具
              title: "数据视图",
              readOnly: true//是否显示不可编辑(只读)
            },
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