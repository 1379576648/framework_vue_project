<template>
  <input v-model="default_route">
  <div id="main" style="width: 100%;height:650px; float: left;"></div>
  {{ one }}
</template>
<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      //根据path动态获取store里面的菜单列表
      menuList: this.$store.getters.store_menuList(this.$route.query.path)[0],
      one: []
    }
  }, computed: {
    //默认激活路由
    default_route() {
      this.inquire_1();
      //返回结果
      return this.activate_router;
    },
  }, methods: {
    inquire_1() {
      //如果有数据
      if (this.menuList) {
        //迭代循环
        for (let i of this.menuList) {
          //如果菜单有叶子 并且状态为启用
          if (i.MENU_LEAF == 0 && i.MENU_STATE == 0) {
            console.log(i.MENU_NAME)
            //梯归
            this.inquire_2(i.son);
            //如果菜单没有叶子 并且状态为禁用
          } else if (i.MENU_LEAF == 1 && i.MENU_STATE == 0) {

          }
        }
      }
    }, inquire_2(value) {
      //如果有数据
      if (value) {
        //迭代器循环
        for (let i of value) {
          //如果菜单有叶子 并且状态为启用
          if (i.MENU_LEAF == 0 && i.MENU_STATE == 0) {
              this.one.push(i)
            //梯归
            this.inquire_2(i.son);
            //如果菜单没有叶子 并且状态为禁用
          } else if (i.MENU_LEAF == 1 && i.MENU_STATE == 0) {
            console.log(i.MENU_NAME)
          }
        }
      }
    }
  },
  mounted() {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;
    //点击事件
    myChart.on('click', function (params) {
      alert(params.data.name)
    });
    let src1 =
        'data:image/png;base64,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';

    let data2 = [
      {
        name: '深圳供电局',
        label: {
          width: 180,
          height: 80,
          backgroundColor: {
            image: src1,
          },
        },
        children: [
          {
            //子集
            name: '全资（2家）',
            label: {
              width: 94,
              height: 54,
              backgroundColor: {
                image: src1,
              },
            },
            children: [
              {
                //子集
                name: '深圳产投',
                percent: '1.43%',
                label: {
                  width: 94,
                  height: 54,
                  backgroundColor: {
                    image: src1,
                  },
                },
                children: [
                  {
                    //子集
                    name: '能源科技',
                    percent: '1.43%',
                    label: {
                      width: 94,
                      height: 54,
                      backgroundColor: {
                        image: src1,
                      },
                    },
                  },
                ],
              },
              {
                //子集
                name: '能源技术',
                percent: '1.43%',
                label: {
                  width: 94,
                  height: 54,
                  backgroundColor: {
                    image: src1,
                  },
                },
              },
            ],
          },
          {
            name: '控股（1家）',
            label: {
              width: 94,
              height: 54,
              backgroundColor: {
                image: src1,
              },
            },
            children: [
              {
                //子集
                name: '低碳城',
                money: '',
                label: {
                  width: 94,
                  height: 54,
                  backgroundColor: {
                    image: src1,
                  },
                },
              },
            ],
          },
          {
            name: '参股（6家）',
            label: {
              width: 94,
              height: 54,
              backgroundColor: {
                image: src1,
              },
            },
            children: [
              {
                name: '南网电动',
                percent: '1.43%',
                label: {
                  width: 94,
                  height: 54,
                  backgroundColor: {
                    image: src1,
                  },
                },
              },
              {
                name: '科技开发',
                percent: '1.43%',
                label: {
                  width: 94,
                  height: 54,
                  backgroundColor: {
                    image: src1,
                  },
                },
              },
              {
                name: '深研院',
                percent: '1.43%',
                label: {
                  width: 94,
                  height: 54,
                  backgroundColor: {
                    image: src1,
                  },
                },
              },
              {
                name: '前海供电',
                percent: '1.43%',
                label: {
                  width: 94,
                  height: 54,
                  backgroundColor: {
                    image: src1,
                  },
                },
              },
              {
                name: '南网财务',
                percent: '1.43%',
                label: {
                  width: 94,
                  height: 54,
                  backgroundColor: {
                    image: src1,
                  },
                },
              },
              {
                name: '混改基金',
                percent: '1.43%',
                label: {
                  width: 94,
                  height: 54,
                  backgroundColor: {
                    image: src1,
                  },
                },
              },
            ],
          },
        ],
      },
    ];
    option = {
      toolbox: {
        feature: {
          restore: {
            show: true,
            title: "还原"
          }
        }
      },
      series: [
        {
          type: 'tree',
          orient: 'vertical',
          name: '人力资源',
          edgeShape: 'polyline', //链接线是折现还是曲线
          data: data2,
          width: 1100, //树形图宽
          height: 547, //树形图高
          top: '20%',
          left: '10%',
          symbolSize: [60, 38], //设置自己选择区域的宽高

          symbol: 'rect', //子级选择区域的形状默认circle(圆形),rect矩形
          roam: true, //鼠标移到区块时会显示一个灰色背景的title，移动不同区域时是否开启滑动动画
          initialTreeDepth: 10,
          itemStyle: {
            //symbol的样式
            color: '#333',
            borderColor: '#333',
          },
          label: {
            normal: {
              position: [30, 15],
              verticalAlign: 'middle',
              align: 'center',
              backgroundColor: '#99d97c',
              color: '#fff',
              padding: 3,
              formatter: function (params) {
                let percent = params.data.percent ? params.data.percent : '';
                let name = params.name.substring(0, 11) + '\n' + params.name.substring(11);
                let konggu = params.value ? params.value : '';
                if (konggu) {
                  return [`{percent|${percent}}`, `{name|${name}}`].join('\n');
                } else {
                  return [
                    `{konggu|${konggu}}`,
                    `{percent|${percent}}`,
                    `{name|${name}}`,
                  ].join('\n');
                }
              },
              rich: {
                percent: {
                  color: '#FFF',
                  padding: [-40, 0],
                  height: 18,
                  distance: 10,
                  align: 'left',
                  verticalAlign: 'top',
                  fontSize: 12,
                  borderWidth: 1,
                  fontWeight: 'normal',
                },
                name: {
                  height: 18,
                  color: '#FFF',
                  padding: [2, 0],
                  align: 'center',
                  fontSize: 12,
                },
              },
            },
          },
          leaves: {
            label: {
              normal: {
                position: [30, 15],
                verticalAlign: 'middle',
                align: 'center',
                backgroundColor: '#f3857c',
                formatter: function (params) {
                  console.log(params);
                  let percent = params.data.percent;
                  let name = params.name.substring(0, 11) + '\n' + params.name.substring(11);
                  return [`{percent|${percent}}`, `{name|${name}}`].join('\n');
                },
                rich: {
                  percent: {
                    color: '#FFF',
                    padding: [-30, 0],
                    height: 18,
                    distance: 10,
                    align: 'left',
                    verticalAlign: 'top',
                    fontSize: 12,
                    borderWidth: 1,
                    fontWeight: 'normal',
                  },
                  name: {
                    height: 22,
                    color: '#FFF',
                    padding: [13, 0, 0, 0],
                    align: 'center',
                    fontSize: 12,
                  },
                },
              },
            },
          },
          lineStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#0E769D', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#939597', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    };

    option && myChart.setOption(option);
  }

}

</script>
<style>
.element.style {
  width: 100%;
  height: 100%;
}
</style>