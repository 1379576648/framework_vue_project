<template>
	<!--  统计分析  -->
	<div id="myChart" class="ant-row"
		style="margin-left: -8px; margin-right: -8px;">
		<div style="padding-left: 8px; padding-right: 8px;"
			class="ant-col ant-col-12">
			<div class="home_statistic_card">
				<div class="j-card normal j-card-bordered mainContent">
          <div class="j-card-head">


                  <i class="iconfont">&#xe7f8;</i>
                  <span style="margin-left: 10px;font-weight: bold">员工性别统计</span>
                  <i class="iconfont" style="float: right">&#xe64c;</i>



          </div>
          <div class="j-card-body ">
            <div style="width: 100%; height: 300px; text-align: center; color: rgb(153, 153, 153);">
              <div id="name" style="width: 300px;height: 300px;left: 80px;"></div>
            </div>
          </div>
				</div>
			</div>
		</div>
	
		<div style="padding-left: 8px; padding-right: 8px;"
			class="ant-col ant-col-12">
			<div class="">
				<div class="j-card normal j-card-bordered mainContent">
					<div class="j-card-head">

            <i class="iconfont">&#xe7f8;</i>
            <span style="margin-left: 10px;font-weight: bold">员工招募统计</span>
            <i class="iconfont" style="float: right">&#xe64c;</i>

          </div>
					<div class="j-card-body ">
						<div style="width: 100%; height: 300px; text-align: center; color: rgb(153, 153, 153);">
              <div id="name1" style="width: 300px;height: 300px;left: 80px;"></div>

              <br>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: '',
  name1:'',
  data() {
    return {
      one: [{value:17,name:"男"},{value:18,name:"女"}],
      two:[{value:16,name:"男"},{value:16,name:"女"}]
    };
  },
  methods: {
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [{
          name: '数量',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
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
          data: this.one,
        }],
        toolbox: {
          show: true, //显示工具栏组件
          feature: {
            dataView: {
              show: true, //显示该工具
              title: "数据视图",
              readOnly: true //是否显示不可编辑(只读)
            },
            restore: { //配置项还原
              show: true, //是否显示该工具
              title: "还原"
            },
            saveAsImage: { //保存为图片
              show: true, //是否显示该工具
              title: "保存"
            }
          }
        }
      });
    },
    drawPia(id){
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [{
          name: '数量',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
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
          data: this.two,
        }],
        toolbox: {
          show: true, //显示工具栏组件
          feature: {
            dataView: {
              show: true, //显示该工具
              title: "数据视图",
              readOnly: true //是否显示不可编辑(只读)
            },
            restore: { //配置项还原
              show: true, //是否显示该工具
              title: "还原"
            },
            saveAsImage: { //保存为图片
              show: true, //是否显示该工具
              title: "保存"
            }
          }
        }
      });
    },
  },
  mounted() {
    this.$nextTick(function() {
      this.drawPie("name");
      this.drawPia("name1");
    });

  },
};
</script>
<style type="text/css" scoped> 
	@import url("../../css/navigation.css");


  @font-face {
    font-family: 'iconfont';  /* Project id 2985811 */
    src: url('//at.alicdn.com/t/font_2985811_8ssyhglr6om.woff2?t=1639190036063') format('woff2'),
    url('//at.alicdn.com/t/font_2985811_8ssyhglr6om.woff?t=1639190036063') format('woff'),
    url('//at.alicdn.com/t/font_2985811_8ssyhglr6om.ttf?t=1639190036063') format('truetype');
  }

  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
</style>
