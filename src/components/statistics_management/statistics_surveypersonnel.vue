<!--员工概况-->
<template>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <div style="border-right: 1px #000000 dashed; width: 50%;height: 480px;border-left: 1px #000000 dashed;">
      <!-- //员工性别分布 -->
      <div id="mainy1" style="width: 630px;height:405px; float: left;"></div>
    </div>
    <div style="width: 50%;height: 440px; position: absolute;top: 0px;right: 2px; ">
      <!-- //员工婚姻分布 -->
      <div id="mainy2" style="width: 630px;height:405px; float: right;"></div>
    </div>
  </div>

  {{this.datay}}


  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <div style="border-left: 1px #000000 dashed; width: 50%;height: 480px;border-right: 1px #000000 dashed;">

      <!--  员工司龄分布 -->
      <div id="mainy3" style="width: 630px;height:405px; float: left;"></div>
    </div>
    <div style="  width: 50%;height: 440px; position: absolute;top: 0px;right: 2px; ">
      <!-- 员工学历分布 -->
      <div id="mainy4" style="width: 630px;height:405px; float: right;"></div>
    </div>
  </div>


  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <div style="border-left: 1px #000000 dashed; width: 50%;height: 480px;border-right: 1px #000000 dashed;">

      <!-- 员工年龄段分布 -->
      <div id="mainy5" style="width: 630px;height:405px; float: left;"></div>
    </div>
    <div style="  width: 50%;height: 450px; position: absolute;top: 0px;right: 2px; ">
      <!-- 	员工年代分布 -->
      <div id="mainy6" style="width: 630px;height:405px; float: right;"></div>
    </div>


    <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
      <div style="border-left: 1px #000000 dashed; width: 50%;height: 480px;border-right: 1px #000000 dashed;">

        <!-- 员工年龄段分布 -->
        <div id="mainy7" style="width: 630px;height:405px; float: left;"></div>
      </div>
      <div style="  width: 50%;height: 440px; position: absolute;top: 0px;right: 2px; ">
        <!-- 	员工年代分布 -->
        <div id="mainy8" style="width: 630px;height:405px; float: right;"></div>
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
import {ElMessage} from "element-plus";
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
      datay: [330, 220],
      datasex: ['男', '女'],
      //访问路径
      url: "http://localhost:80/",
    }
  },
  mounted: function () {
    this.one();
  },
  computed: {

  },
watch: {
  datay: {
    //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
    handler: function () {
      this.one();
    },
    deep: true
  }
},
  methods: {
    /*  员工性别分布 */
    one() {
      // 1、基于准备好的dom，初始化echarts实例
      var chartDomy1 = document.getElementById('mainy1');
      var myCharty1 = echarts.init(chartDomy1);
      var optiony1;
      //2、构造图表数据
      optiony1 = {
        title: {
          text: "员工性别分布",
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false,
              title: "数据视图"
            },
            saveAsImage: {
              show: true,
              title: "保存"
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.datasex,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: this.datay,
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ['#FFC0CB', '#00FFFF'];
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      }
      //绘制图表
      myCharty1.setOption(optiony1);
    },


    selectStaffSex() {
      let _this=this;
      this.axios({
        method:'get',
        url: this.url+ 'selectStaffSex',
      }).then(function (response) {
        console.log("查询性别");
        console.log(response);
        if (response.data.code === 200){
          _this.datay=response.data.data[0].RS;
          _this.datasex=response.data.data.staffSex;
          console.log(_this.datay)
          console.log(_this.datasex)
        }else {
          ElMessage({
            showClose: true,
            message: '操作失败',
            type: 'error',
          })
        }
      }).catch(function (error) {
        console.log("失败")
        console.log(error);
      });
    }
  },created() {
    this.selectStaffSex();
  }

}
</script>

<style scoped>

</style>