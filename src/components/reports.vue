<template>
  <div class="users-container">
    <!-- 面包屑 -->
    <my-bread sectitle="商品管理" threetitle="商品分类"></my-bread>

    <!-- 准备容器 -->
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
//导入
import echarts from "echarts";
export default {
  name: "reports",
  data() {
    return {
      option: {
        title: {
          text: "用户数据来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },
  created() {},
  async mounted() {
    // 挂载完成之后,在这里可以访问template中的dom元素
    var myChart = echarts.init(document.getElementById("main"));

    // 指定图表的配置项和数据
    //调用接口
    let res = await this.$axios.get("reports/type/1");
    //合并数据
    for (const key in res.data.data) {
      this.option[key] = res.data.data[key];
    }
    //默认值就是category数据显示的x轴
    this.option.xAxis[0].type = "category";
    //x轴是否留空白默认true
    this.option.xAxis[0].boundaryGap = false;
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.option);
  }
};
</script>

<style lang="scss">
.users-container {
  background-color: #e9eef3;
}
</style>
