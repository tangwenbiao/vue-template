<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixin/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        console.log("查看传入");
        console.log(val);
        this.setOptions(graphTemplate(val));
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.initChart();
    });
  },
  //初始化
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    //初始化图标
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      if (this.chartData != null) {
        this.setOptions(graphTemplate(this.chartData));
      }
    },
    //设置图标的属性值
    setOptions(template) {
      console.log("查看模板");
      console.log(template);
      this.chart.setOption(template);
    }
  }
};

const graphTemplate = function(chartInfo) {
  let topTitleOne="活跃数";
  let topTitleTwo="流失数"

  let info = {
    //标题
    title: { text: chartInfo.title },
    //x轴
    xAxis: {
      //x轴节点信息
      data: [],
      //首位是否
      boundaryGap: false,
      axisTick: {
        //是否显示轴的刻度线
        show: true
      }
    },
    //图像的位置
    grid: {
      left: 10,
      right: 10,
      bottom: 20,
      top: 30,
      containLabel: true
    },
    //顶部标识
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross"
      },
      padding: [5, 10]
    },
    yAxis: {
      axisTick: {
        show: false
      }
    },
    //系列（与series中的name对应）
    legend: {
      data: [topTitleOne, topTitleTwo]
    },
    //系列
    series: [
      {
        name: topTitleOne,
        itemStyle: {
          //常规设置
          normal: {
            //线条颜色
            color: "#FF005A",
            //上方标识颜色
            lineStyle: {
              color: "#FF005A",
              width: 2
            }
          }
        },
        //线条是否平滑
        smooth: true,
        type: "line",
        //绑定的数据
        data: chartInfo.activeUsers,
        //图形绘制的时间
        animationDuration: 2800,
        //一种类型吧。
        animationEasing: "cubicInOut"
      },
      {
        name: topTitleTwo,
        smooth: true,
        type: "line",
        itemStyle: {
          normal: {
            color: "#3888fa",
            lineStyle: {
              color: "#3888fa",
              width: 2
            },
            //折线图下方图形的颜色
            areaStyle: {
              color: "#f3f8ff"
            }
          }
        },
        data: chartInfo.inactiveUsers,
        animationDuration: 2800,
        animationEasing: "quadraticOut"
      }
    ]
  };
  info.xAxis.data = chartInfo.xpoints;
  return info;
};
</script>
