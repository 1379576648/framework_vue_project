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
              <div id="name" style="width: 600px;height: 400px;"></div>
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
            <span style="margin-left: 10px;font-weight: bold">员工性别统计</span>
            <i class="iconfont" style="float: right">&#xe64c;</i>

          </div>
					<div class="j-card-body ">
						<div style="width: 100%; height: 300px; text-align: center; color: rgb(153, 153, 153);">
              <div id="name" style="width: 600px;height: 400px;"></div>

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
  data() {
    return {
      one: [{value:1,name:"name"},{value:2,name:"age"}],
      two: [1, 2, -1]
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
          name: 'Access From',
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

      //{
      // 	xAxis: {
      // 		type: "category",
      // 		data: this.one
      // 	},
      // 	yAxis: {
      // 		type: "value"
      // 	},
      // 	series: [{
      // 		data: this.two,
      // 		type: "bar"
      // 	}, ],
      // 	toolbox: {
      // 		show: true, //显示工具栏组件
      // 		feature: {
      // 			dataView: {
      // 				show: true, //显示该工具
      // 				title: "数据视图",
      // 				readOnly: true //是否显示不可编辑(只读)
      // 			},
      // 			magicType: { //动态类型切换
      // 				show: true, //是否显示该工具
      // 				type: ['line', 'bar'], //启用的动态类型
      // 				title: {
      // 					line: '切换为折线图',
      // 					bar: '切换为柱状图'
      // 				}
      // 			},
      // 			restore: { //配置项还原
      // 				show: true, //是否显示该工具
      // 				title: "还原"
      // 			},
      // 			saveAsImage: { //保存为图片
      // 				show: true, //是否显示该工具
      // 				title: "保存"
      // 			}
      // 		}
      // 	}
      // });
    },
  },
  mounted() {
    this.$nextTick(function() {
      this.drawPie("name");
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
